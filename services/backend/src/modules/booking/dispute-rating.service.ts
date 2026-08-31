import { PrismaClient, DisputeStatus } from '@prisma/client';
import { CreateDisputeInput, ResolveDisputeInput } from '@sahakar/shared-types';

export class DisputeRatingService {
  constructor(private prisma: PrismaClient) {}

  async submitRating(bookingId: string, stars: number, comment?: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
      include: { job_assignment: true },
    });

    if (!booking || !booking.job_assignment) {
      throw new Error('BOOKING_OR_ASSIGNMENT_NOT_FOUND');
    }

    const workerId = booking.job_assignment.worker_id;
    const isLowRating = stars < 2;

    // COOP_BUSINESS_LOGIC.md §3: Rating below 2 stars triggers mandatory dispute review
    const rating = await this.prisma.rating.create({
      data: {
        booking_id: bookingId,
        worker_id: workerId,
        stars,
        comment: comment || null,
        flagged_for_review: isLowRating,
      },
    });

    // Recompute worker's rolling average rating across all ratings
    const allRatings = await this.prisma.rating.findMany({
      where: { worker_id: workerId },
    });

    const totalStars = allRatings.reduce((sum, r) => sum + r.stars, 0);
    const newAvg = Number((totalStars / allRatings.length).toFixed(2));

    await this.prisma.workerProfile.update({
      where: { id: workerId },
      data: {
        rolling_avg_rating: newAvg,
      },
    });

    return rating;
  }

  async createDispute(filedByUserId: string, input: CreateDisputeInput) {
    const slaDeadline = new Date(Date.now() + 48 * 60 * 60 * 1000); // 48h SLA

    const dispute = await this.prisma.dispute.create({
      data: {
        booking_id: input.booking_id,
        filed_by_user_id: filedByUserId,
        category: input.category as any,
        description: input.description,
        evidence_urls: input.evidence_urls || [],
        status: DisputeStatus.filed,
        sla_deadline: slaDeadline,
      },
    });

    await this.prisma.booking.update({
      where: { id: input.booking_id },
      data: { status: 'disputed' },
    });

    return dispute;
  }

  async resolveDispute(disputeId: string, input: ResolveDisputeInput) {
    return this.prisma.dispute.update({
      where: { id: disputeId },
      data: {
        status: input.status as any,
      },
    });
  }

  async getDisputes(societyId?: string) {
    return this.prisma.dispute.findMany({
      include: {
        booking: {
          include: {
            listing: true,
            customer: { include: { user: true } },
          },
        },
        filed_by: true,
      },
      orderBy: { created_at: 'desc' },
    });
  }
}
