import { PrismaClient, BookingStatus, JobOfferStatus, JobAssignmentStatus } from '@prisma/client';
import { Server as SocketIOServer } from 'socket.io';
import { CreateBookingInput, PriceBreakdown, RejectOfferInput, UpdateJobAssignmentStatusInput } from '@sahakar/shared-types';
import { rankCandidates, DEFAULT_FAIR_MATCH_WEIGHTS } from '../fair-match/fair-match.engine';

export class BookingService {
  constructor(
    private prisma: PrismaClient,
    private io?: SocketIOServer
  ) {}

  async getServiceCategories() {
    return this.prisma.serviceCategory.findMany({
      include: {
        service_listings: true,
      },
    });
  }

  async getServiceListing(listingId: string) {
    return this.prisma.serviceListing.findUnique({
      where: { id: listingId },
      include: {
        category: true,
      },
    });
  }

  calculatePriceBreakdown(basePrice: number): PriceBreakdown {
    const total = basePrice;
    const workerPayout = Number((total * 0.88).toFixed(2));
    const techOpsFee = Number((total * 0.05).toFixed(2));
    const welfareContrib = Number((total * 0.04).toFixed(2));
    const federationFee = Number((total * 0.03).toFixed(2));

    return {
      base_price: total.toFixed(2),
      total_price: total.toFixed(2),
      worker_payout: workerPayout.toFixed(2),
      tech_ops_fee: techOpsFee.toFixed(2),
      welfare_contribution: welfareContrib.toFixed(2),
      federation_fee: federationFee.toFixed(2),
    };
  }

  async createBooking(customerId: string, input: CreateBookingInput) {
    const listing = await this.prisma.serviceListing.findUnique({
      where: { id: input.listing_id },
    });

    if (!listing) {
      throw new Error('LISTING_NOT_FOUND');
    }

    // Resolve customer society or pick default Mumbai society for demo
    const defaultSociety = await this.prisma.cooperativeSociety.findFirst();
    if (!defaultSociety) {
      throw new Error('SOCIETY_NOT_FOUND');
    }

    const basePriceNum = Number(listing.base_price);
    const booking = await this.prisma.booking.create({
      data: {
        customer_id: customerId,
        listing_id: listing.id,
        society_id: defaultSociety.id,
        status: BookingStatus.pending_match,
        scheduled_slot_start: new Date(input.scheduled_slot_start),
        service_lat: input.service_location.latitude,
        service_lng: input.service_location.longitude,
        service_address_text: input.service_address_text,
        total_price: basePriceNum,
      },
      include: {
        listing: {
          include: { category: true },
        },
        customer: {
          include: { user: true },
        },
      },
    });

    // Asynchronously trigger Fair-Match Dispatch
    this.dispatchFairMatchOffer(booking.id).catch((err) => {
      console.error(`Fair-Match dispatch error for booking ${booking.id}:`, err);
    });

    return booking;
  }

  async dispatchFairMatchOffer(bookingId: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
      include: { listing: true },
    });

    if (!booking) return;

    // Fetch active workers in society
    const activeWorkers = await this.prisma.workerProfile.findMany({
      where: {
        society_id: booking.society_id,
        status: 'active',
        is_available: true,
      },
      include: {
        user: true,
        skills: true,
      },
    });

    const candidatePool = activeWorkers.map((w) => ({
      worker_id: w.id,
      user_id: w.user_id,
      society_id: w.society_id,
      full_name: w.user.full_name,
      current_location: { latitude: w.current_lat, longitude: w.current_lng },
      rolling_avg_rating: w.rolling_avg_rating ? Number(w.rolling_avg_rating) : null,
      completed_jobs_count: w.completed_jobs_count,
      jobs_this_week_count: w.jobs_this_week_count,
      is_probation: w.is_probation,
      has_exact_skill: w.skills.some((s) => s.category_id === booking.listing.category_id),
    }));

    if (candidatePool.length === 0) {
      console.warn(`No active candidates found for booking ${bookingId}`);
      return;
    }

    const jobLocation = { latitude: booking.service_lat, longitude: booking.service_lng };
    const ranked = rankCandidates(jobLocation, candidatePool, 8.0, 4.5, DEFAULT_FAIR_MATCH_WEIGHTS, false);

    if (ranked.length === 0) return;

    const topCandidate = ranked[0];

    // Create job offer row in DB
    const offer = await this.prisma.jobOffer.create({
      data: {
        booking_id: booking.id,
        worker_id: topCandidate.worker.worker_id,
        fair_match_score: topCandidate.final_score,
        score_breakdown: topCandidate.score_breakdown as any,
        status: JobOfferStatus.pending,
      },
      include: {
        booking: {
          include: {
            listing: { include: { category: true } },
            customer: { include: { user: true } },
          },
        },
      },
    });

    // Update booking status to 'offered'
    await this.prisma.booking.update({
      where: { id: booking.id },
      data: { status: BookingStatus.offered },
    });

    // Push socket event to offered worker
    if (this.io) {
      this.io.to(`worker:${topCandidate.worker.worker_id}`).emit('job_offer', offer);
      this.io.to(`booking:${booking.id}`).emit('booking_status_update', {
        status: 'offered',
        offered_worker_name: topCandidate.worker.full_name,
      });
    }

    return offer;
  }

  async respondJobOffer(offerId: string, workerId: string, action: 'accept' | 'reject', reason?: string) {
    const offer = await this.prisma.jobOffer.findUnique({
      where: { id: offerId },
      include: { booking: true },
    });

    if (!offer) {
      throw new Error('OFFER_NOT_FOUND');
    }

    if (offer.worker_id !== workerId) {
      throw new Error('UNAUTHORIZED_OFFER_RESPONSE');
    }

    if (action === 'accept') {
      await this.prisma.jobOffer.update({
        where: { id: offerId },
        data: {
          status: JobOfferStatus.accepted,
          responded_at: new Date(),
        },
      });

      const assignment = await this.prisma.jobAssignment.create({
        data: {
          booking_id: offer.booking_id,
          worker_id: workerId,
          status: JobAssignmentStatus.en_route,
        },
        include: {
          worker: { include: { user: true } },
          booking: { include: { listing: true } },
        },
      });

      await this.prisma.booking.update({
        where: { id: offer.booking_id },
        data: { status: BookingStatus.assigned },
      });

      if (this.io) {
        this.io.to(`booking:${offer.booking_id}`).emit('booking_status_update', {
          status: 'assigned',
          assignment,
          worker_name: assignment.worker.user.full_name,
          worker_phone: assignment.worker.user.phone_number,
        });
      }

      return { action: 'accepted', assignment };
    } else {
      await this.prisma.jobOffer.update({
        where: { id: offerId },
        data: {
          status: JobOfferStatus.rejected,
          responded_at: new Date(),
        },
      });

      // Dispatch to next eligible worker in candidate pool
      this.dispatchFairMatchOffer(offer.booking_id).catch(console.error);

      return { action: 'rejected', reason };
    }
  }

  async updateJobAssignmentStatus(assignmentId: string, workerId: string, status: JobAssignmentStatus) {
    const assignment = await this.prisma.jobAssignment.findUnique({
      where: { id: assignmentId },
      include: { booking: true },
    });

    if (!assignment) {
      throw new Error('ASSIGNMENT_NOT_FOUND');
    }

    if (assignment.worker_id !== workerId) {
      throw new Error('UNAUTHORIZED_ASSIGNMENT_UPDATE');
    }

    const isCompleted = status === JobAssignmentStatus.completed;
    const now = new Date();

    const updatedAssignment = await this.prisma.jobAssignment.update({
      where: { id: assignmentId },
      data: {
        status,
        started_at: status === JobAssignmentStatus.in_progress ? now : undefined,
        completed_at: isCompleted ? now : undefined,
      },
      include: {
        worker: { include: { user: true } },
      },
    });

    let bookingStatus: BookingStatus = BookingStatus.assigned;
    if (status === JobAssignmentStatus.in_progress) {
      bookingStatus = BookingStatus.in_progress;
    } else if (isCompleted) {
      bookingStatus = BookingStatus.completed;

      // Increment worker completed & weekly job counters
      await this.prisma.workerProfile.update({
        where: { id: workerId },
        data: {
          completed_jobs_count: { increment: 1 },
          jobs_this_week_count: { increment: 1 },
        },
      });
    }

    await this.prisma.booking.update({
      where: { id: assignment.booking_id },
      data: { status: bookingStatus },
    });

    if (this.io) {
      this.io.to(`booking:${assignment.booking_id}`).emit('booking_status_update', {
        status: bookingStatus,
        assignment: updatedAssignment,
      });
    }

    return updatedAssignment;
  }

  async getBookingTrackStatus(bookingId: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        listing: { include: { category: true } },
        customer: { include: { user: true } },
        job_assignment: {
          include: {
            worker: {
              include: {
                user: true,
                society: true,
              },
            },
          },
        },
        job_offers: {
          where: { status: JobOfferStatus.pending },
          include: {
            worker: { include: { user: true } },
          },
        },
      },
    });

    if (!booking) {
      throw new Error('BOOKING_NOT_FOUND');
    }

    return booking;
  }

  async getWorkerOffers(workerId: string) {
    return this.prisma.jobOffer.findMany({
      where: {
        worker_id: workerId,
        status: JobOfferStatus.pending,
      },
      include: {
        booking: {
          include: {
            listing: { include: { category: true } },
            customer: { include: { user: true } },
          },
        },
      },
      orderBy: { offered_at: 'desc' },
    });
  }

  async getCustomerBookings(customerId: string) {
    return this.prisma.booking.findMany({
      where: { customer_id: customerId },
      include: {
        listing: { include: { category: true } },
        job_assignment: {
          include: {
            worker: { include: { user: true } },
          },
        },
      },
      orderBy: { created_at: 'desc' },
    });
  }
}
