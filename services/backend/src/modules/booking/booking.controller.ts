import { FastifyRequest, FastifyReply } from 'fastify';
import { BookingService } from './booking.service';
import { CreateBookingSchema, RejectOfferSchema, UpdateJobAssignmentStatusSchema } from '@sahakar/shared-types';

export class BookingController {
  constructor(private bookingService: BookingService) {}

  async getServiceCategories(request: FastifyRequest, reply: FastifyReply) {
    const categories = await this.bookingService.getServiceCategories();
    return reply.send(categories);
  }

  async getServiceListing(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    const listing = await this.bookingService.getServiceListing(request.params.id);
    if (!listing) {
      return reply.status(404).send({ error: 'Not Found', message: 'Service listing not found' });
    }
    const breakdown = this.bookingService.calculatePriceBreakdown(Number(listing.base_price));
    return reply.send({ listing, price_breakdown: breakdown });
  }

  async createBooking(request: FastifyRequest, reply: FastifyReply) {
    const userPayload = request.user;
    const customerId = userPayload.customer_id;

    if (!customerId) {
      return reply.status(403).send({ error: 'Forbidden', message: 'User is not registered as a customer' });
    }

    const parseResult = CreateBookingSchema.safeParse(request.body);
    if (!parseResult.success) {
      return reply.status(400).send({ error: 'Validation Error', details: parseResult.error.format() });
    }

    try {
      const booking = await this.bookingService.createBooking(customerId, parseResult.data);
      return reply.status(201).send(booking);
    } catch (err: any) {
      return reply.status(400).send({ error: 'Booking Creation Failed', message: err.message });
    }
  }

  async getBookingTrack(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const booking = await this.bookingService.getBookingTrackStatus(request.params.id);
      return reply.send(booking);
    } catch (err: any) {
      return reply.status(404).send({ error: 'Not Found', message: 'Booking not found' });
    }
  }

  async getWorkerOffers(request: FastifyRequest, reply: FastifyReply) {
    const workerId = request.user.worker_id;
    if (!workerId) {
      return reply.status(403).send({ error: 'Forbidden', message: 'User is not a worker' });
    }
    const offers = await this.bookingService.getWorkerOffers(workerId);
    return reply.send(offers);
  }

  async respondJobOffer(
    request: FastifyRequest<{ Params: { offerId: string }; Body: { action: 'accept' | 'reject'; reason?: string } }>,
    reply: FastifyReply
  ) {
    const workerId = request.user.worker_id;
    if (!workerId) {
      return reply.status(403).send({ error: 'Forbidden', message: 'User is not a worker' });
    }

    const { action, reason } = request.body;
    try {
      const result = await this.bookingService.respondJobOffer(request.params.offerId, workerId, action, reason);
      return reply.send(result);
    } catch (err: any) {
      return reply.status(400).send({ error: 'Offer Response Failed', message: err.message });
    }
  }

  async updateJobAssignmentStatus(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {
    const workerId = request.user.worker_id;
    if (!workerId) {
      return reply.status(403).send({ error: 'Forbidden', message: 'User is not a worker' });
    }

    const parseResult = UpdateJobAssignmentStatusSchema.safeParse(request.body);
    if (!parseResult.success) {
      return reply.status(400).send({ error: 'Validation Error', details: parseResult.error.format() });
    }

    try {
      const assignment = await this.bookingService.updateJobAssignmentStatus(
        request.params.id,
        workerId,
        parseResult.data.status as any
      );
      return reply.send(assignment);
    } catch (err: any) {
      return reply.status(400).send({ error: 'Status Update Failed', message: err.message });
    }
  }

  async getCustomerBookings(request: FastifyRequest, reply: FastifyReply) {
    const customerId = request.user.customer_id;
    if (!customerId) {
      return reply.status(403).send({ error: 'Forbidden', message: 'User is not a customer' });
    }
    const bookings = await this.bookingService.getCustomerBookings(customerId);
    return reply.send(bookings);
  }
}
