// src/enums.ts
import { z } from "zod";
var UserRoleSchema = z.enum([
  "customer",
  "worker",
  "society_admin",
  "federation_admin",
  "platform_admin"
]);
var WorkerStatusSchema = z.enum([
  "applicant",
  "documents_pending",
  "verified",
  "active",
  "suspended",
  "inactive"
]);
var CertificationLevelSchema = z.enum(["basic", "certified", "senior"]);
var BookingStatusSchema = z.enum([
  "pending_match",
  "offered",
  "assigned",
  "in_progress",
  "completed",
  "cancelled",
  "disputed"
]);
var JobOfferStatusSchema = z.enum(["pending", "accepted", "rejected", "expired"]);
var JobAssignmentStatusSchema = z.enum([
  "en_route",
  "arrived",
  "in_progress",
  "completed",
  "no_show"
]);
var PaymentStatusSchema = z.enum(["created", "captured", "failed", "refunded"]);
var PayoutStatusSchema = z.enum(["pending", "paid"]);
var WelfareEntryTypeSchema = z.enum(["contribution", "claim_payout"]);
var WelfareClaimCategorySchema = z.enum(["medical", "accident", "equipment", "other"]);
var WelfareClaimStatusSchema = z.enum(["filed", "approved", "rejected", "paid"]);
var DisputeCategorySchema = z.enum([
  "quality",
  "no_show",
  "payment",
  "damage",
  "conduct",
  "other"
]);
var DisputeStatusSchema = z.enum([
  "filed",
  "society_review",
  "escalated_to_federation",
  "resolved",
  "closed"
]);
var KycDocTypeSchema = z.enum([
  "aadhaar",
  "e_shram_card",
  "skill_certificate",
  "police_verification",
  "other"
]);
var KycVerificationStatusSchema = z.enum(["pending", "verified", "rejected"]);
var KycVerifiedViaSchema = z.enum(["manual", "e_shram_mock", "digilocker_mock"]);

// src/auth.ts
import { z as z2 } from "zod";
var RequestOtpSchema = z2.object({
  phone_number: z2.string().min(10).max(15)
});
var VerifyOtpSchema = z2.object({
  phone_number: z2.string().min(10).max(15),
  otp_code: z2.string().length(6)
});
var RegisterUserSchema = z2.object({
  phone_number: z2.string().min(10).max(15),
  full_name: z2.string().min(2),
  role: UserRoleSchema,
  email: z2.string().email().optional(),
  preferred_language: z2.string().default("hi"),
  society_id: z2.string().uuid().optional(),
  // for workers
  trade_categories: z2.array(z2.string().uuid()).optional()
  // for workers
});
var JwtPayloadSchema = z2.object({
  user_id: z2.string().uuid(),
  phone_number: z2.string(),
  role: UserRoleSchema,
  society_id: z2.string().uuid().nullable().optional(),
  federation_id: z2.string().uuid().nullable().optional(),
  worker_id: z2.string().uuid().nullable().optional(),
  customer_id: z2.string().uuid().nullable().optional()
});

// src/fair-match.ts
import { z as z3 } from "zod";
var FairMatchWeightsSchema = z3.object({
  W_prox: z3.number().default(0.3),
  W_rating: z3.number().default(0.2),
  W_fair: z3.number().default(0.35),
  W_skill: z3.number().default(0.15)
});

// src/booking.ts
import { z as z4 } from "zod";
var CreateBookingSchema = z4.object({
  listing_id: z4.string().uuid(),
  scheduled_slot_start: z4.string().datetime(),
  service_location: z4.object({
    latitude: z4.number(),
    longitude: z4.number()
  }),
  service_address_text: z4.string().min(5)
});
var UpdateJobAssignmentStatusSchema = z4.object({
  status: JobAssignmentStatusSchema
});
var RejectOfferSchema = z4.object({
  reason: z4.string().min(1)
});

// src/welfare.ts
import { z as z5 } from "zod";
var CreateWelfareClaimSchema = z5.object({
  category: WelfareClaimCategorySchema,
  description: z5.string().min(10),
  document_url: z5.string().url().optional()
});
var ReviewWelfareClaimSchema = z5.object({
  status: z5.enum(["approved", "rejected"]),
  review_note: z5.string().optional()
});

// src/dispute.ts
import { z as z6 } from "zod";
var CreateDisputeSchema = z6.object({
  booking_id: z6.string().uuid(),
  category: DisputeCategorySchema,
  description: z6.string().min(10),
  evidence_urls: z6.array(z6.string()).default([])
});
var ResolveDisputeSchema = z6.object({
  status: z6.enum(["resolved", "closed", "escalated_to_federation"]),
  resolution_note: z6.string().min(5)
});
export {
  BookingStatusSchema,
  CertificationLevelSchema,
  CreateBookingSchema,
  CreateDisputeSchema,
  CreateWelfareClaimSchema,
  DisputeCategorySchema,
  DisputeStatusSchema,
  FairMatchWeightsSchema,
  JobAssignmentStatusSchema,
  JobOfferStatusSchema,
  JwtPayloadSchema,
  KycDocTypeSchema,
  KycVerificationStatusSchema,
  KycVerifiedViaSchema,
  PaymentStatusSchema,
  PayoutStatusSchema,
  RegisterUserSchema,
  RejectOfferSchema,
  RequestOtpSchema,
  ResolveDisputeSchema,
  ReviewWelfareClaimSchema,
  UpdateJobAssignmentStatusSchema,
  UserRoleSchema,
  VerifyOtpSchema,
  WelfareClaimCategorySchema,
  WelfareClaimStatusSchema,
  WelfareEntryTypeSchema,
  WorkerStatusSchema
};
