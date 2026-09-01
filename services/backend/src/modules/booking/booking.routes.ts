import { FastifyPluginAsync } from 'fastify';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';

const bookingRoutes: FastifyPluginAsync = async (server) => {
  const bookingService = new BookingService(server.prisma, (server as any).io);
  const bookingController = new BookingController(bookingService);

  // Public Catalog Routes
  server.get('/services/categories', (req, reply) => bookingController.getServiceCategories(req, reply));
  server.get('/services/listings/:id', (req: any, reply: any) => bookingController.getServiceListing(req, reply));

  // Customer Routes
  server.post('/bookings', { preHandler: [server.authenticate, server.authorize(['customer'])] }, (req, reply) =>
    bookingController.createBooking(req, reply)
  );
  server.get('/bookings/:id/track', { preHandler: [server.authenticate] }, (req: any, reply: any) =>
    bookingController.getBookingTrack(req, reply)
  );
  server.get('/customers/me/bookings', { preHandler: [server.authenticate, server.authorize(['customer'])] }, (req, reply) =>
    bookingController.getCustomerBookings(req, reply)
  );

  // Worker Routes
  server.get('/workers/me/offers', { preHandler: [server.authenticate, server.authorize(['worker'])] }, (req, reply) =>
    bookingController.getWorkerOffers(req, reply)
  );
  server.post(
    '/workers/me/offers/:offerId/respond',
    { preHandler: [server.authenticate, server.authorize(['worker'])] },
    (req: any, reply: any) => bookingController.respondJobOffer(req, reply)
  );
  server.patch(
    '/workers/me/assignments/:id/status',
    { preHandler: [server.authenticate, server.authorize(['worker'])] },
    (req: any, reply: any) => bookingController.updateJobAssignmentStatus(req, reply)
  );
};

export default bookingRoutes;
