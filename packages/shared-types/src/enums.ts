import { z } from 'zod';

export const UserRoleSchema = z.enum([
  'customer',
  'worker',
  'society_admin',
  'federation_admin',
  'platform_admin',
]);
export type UserRole = z.infer<typeof UserRoleSchema>;

export const WorkerStatusSchema = z.enum([
  'applicant',
  'documents_pending',
  'verified',
  'active',
  'suspended',
  'inactive',
]);
export type WorkerStatus = z.infer<typeof WorkerStatusSchema>;

export const CertificationLevelSchema = z.enum(['basic', 'certified', 'senior']);
export type CertificationLevel = z.infer<typeof CertificationLevelSchema>;

export const BookingStatusSchema = z.enum([
  'pending_match',
  'offered',
  'assigned',
  'in_progress',
  'completed',
  'cancelled',
  'disputed',
]);
export type BookingStatus = z.infer<typeof BookingStatusSchema>;

export const JobOfferStatusSchema = z.enum(['pending', 'accepted', 'rejected', 'expired']);
export type JobOfferStatus = z.infer<typeof JobOfferStatusSchema>;

export const JobAssignmentStatusSchema = z.enum([
  'en_route',
  'arrived',
  'in_progress',
  'completed',
  'no_show',
]);
export type JobAssignmentStatus = z.infer<typeof JobAssignmentStatusSchema>;

export const PaymentStatusSchema = z.enum(['created', 'captured', 'failed', 'refunded']);
export type PaymentStatus = z.infer<typeof PaymentStatusSchema>;

export const PayoutStatusSchema = z.enum(['pending', 'paid']);
export type PayoutStatus = z.infer<typeof PayoutStatusSchema>;

export const WelfareEntryTypeSchema = z.enum(['contribution', 'claim_payout']);
export type WelfareEntryType = z.infer<typeof WelfareEntryTypeSchema>;

export const WelfareClaimCategorySchema = z.enum(['medical', 'accident', 'equipment', 'other']);
export type WelfareClaimCategory = z.infer<typeof WelfareClaimCategorySchema>;

export const WelfareClaimStatusSchema = z.enum(['filed', 'approved', 'rejected', 'paid']);
export type WelfareClaimStatus = z.infer<typeof WelfareClaimStatusSchema>;

export const DisputeCategorySchema = z.enum([
  'quality',
  'no_show',
  'payment',
  'damage',
  'conduct',
  'other',
]);
export type DisputeCategory = z.infer<typeof DisputeCategorySchema>;

export const DisputeStatusSchema = z.enum([
  'filed',
  'society_review',
  'escalated_to_federation',
  'resolved',
  'closed',
]);
export type DisputeStatus = z.infer<typeof DisputeStatusSchema>;

export const KycDocTypeSchema = z.enum([
  'aadhaar',
  'e_shram_card',
  'skill_certificate',
  'police_verification',
  'other',
]);
export type KycDocType = z.infer<typeof KycDocTypeSchema>;

export const KycVerificationStatusSchema = z.enum(['pending', 'verified', 'rejected']);
export type KycVerificationStatus = z.infer<typeof KycVerificationStatusSchema>;

export const KycVerifiedViaSchema = z.enum(['manual', 'e_shram_mock', 'digilocker_mock']);
export type KycVerifiedVia = z.infer<typeof KycVerifiedViaSchema>;
