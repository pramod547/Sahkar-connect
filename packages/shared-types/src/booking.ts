import { z } from 'zod';
import { BookingStatusSchema, JobAssignmentStatusSchema, JobOfferStatusSchema } from './enums';

export const CreateBookingSchema = z.object({
  listing_id: z.string().uuid(),
  scheduled_slot_start: z.string().datetime(),
  service_location: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
  service_address_text: z.string().min(5),
});
export type CreateBookingInput = z.infer<typeof CreateBookingSchema>;

export const UpdateJobAssignmentStatusSchema = z.object({
  status: JobAssignmentStatusSchema,
});
export type UpdateJobAssignmentStatusInput = z.infer<typeof UpdateJobAssignmentStatusSchema>;

export const RejectOfferSchema = z.object({
  reason: z.string().min(1),
});
export type RejectOfferInput = z.infer<typeof RejectOfferSchema>;

export interface PriceBreakdown {
  base_price: string;
  total_price: string;
  worker_payout: string;        // 88%
  tech_ops_fee: string;         // 5%
  welfare_contribution: string; // 4%
  federation_fee: string;       // 3%
}
