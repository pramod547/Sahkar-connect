import { z } from 'zod';
import { DisputeCategorySchema, DisputeStatusSchema } from './enums';

export const CreateDisputeSchema = z.object({
  booking_id: z.string().uuid(),
  category: DisputeCategorySchema,
  description: z.string().min(10),
  evidence_urls: z.array(z.string()).default([]),
});
export type CreateDisputeInput = z.infer<typeof CreateDisputeSchema>;

export const ResolveDisputeSchema = z.object({
  status: z.enum(['resolved', 'closed', 'escalated_to_federation']),
  resolution_note: z.string().min(5),
});
export type ResolveDisputeInput = z.infer<typeof ResolveDisputeSchema>;
