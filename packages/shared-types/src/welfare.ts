import { z } from 'zod';
import { WelfareClaimCategorySchema, WelfareClaimStatusSchema } from './enums';

export const CreateWelfareClaimSchema = z.object({
  category: WelfareClaimCategorySchema,
  description: z.string().min(10),
  document_url: z.string().url().optional(),
});
export type CreateWelfareClaimInput = z.infer<typeof CreateWelfareClaimSchema>;

export const ReviewWelfareClaimSchema = z.object({
  status: z.enum(['approved', 'rejected']),
  review_note: z.string().optional(),
});
export type ReviewWelfareClaimInput = z.infer<typeof ReviewWelfareClaimSchema>;
