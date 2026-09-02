"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  BookingStatusSchema: () => BookingStatusSchema,
  CertificationLevelSchema: () => CertificationLevelSchema,
  CreateBookingSchema: () => CreateBookingSchema,
  CreateDisputeSchema: () => CreateDisputeSchema,
  CreateWelfareClaimSchema: () => CreateWelfareClaimSchema,
  DisputeCategorySchema: () => DisputeCategorySchema,
  DisputeStatusSchema: () => DisputeStatusSchema,
  FairMatchWeightsSchema: () => FairMatchWeightsSchema,
  JobAssignmentStatusSchema: () => JobAssignmentStatusSchema,
  JobOfferStatusSchema: () => JobOfferStatusSchema,
  JwtPayloadSchema: () => JwtPayloadSchema,
  KycDocTypeSchema: () => KycDocTypeSchema,
  KycVerificationStatusSchema: () => KycVerificationStatusSchema,
  KycVerifiedViaSchema: () => KycVerifiedViaSchema,
  PaymentStatusSchema: () => PaymentStatusSchema,
  PayoutStatusSchema: () => PayoutStatusSchema,
  RegisterUserSchema: () => RegisterUserSchema,
  RejectOfferSchema: () => RejectOfferSchema,
  RequestOtpSchema: () => RequestOtpSchema,
  ResolveDisputeSchema: () => ResolveDisputeSchema,
  ReviewWelfareClaimSchema: () => ReviewWelfareClaimSchema,
  UpdateJobAssignmentStatusSchema: () => UpdateJobAssignmentStatusSchema,
  UserRoleSchema: () => UserRoleSchema,
  VerifyOtpSchema: () => VerifyOtpSchema,
  WelfareClaimCategorySchema: () => WelfareClaimCategorySchema,
  WelfareClaimStatusSchema: () => WelfareClaimStatusSchema,
  WelfareEntryTypeSchema: () => WelfareEntryTypeSchema,
  WorkerStatusSchema: () => WorkerStatusSchema
});
module.exports = __toCommonJS(src_exports);

// src/enums.ts
var import_zod = require("zod");
var UserRoleSchema = import_zod.z.enum([
  "customer",
  "worker",
  "society_admin",
  "federation_admin",
  "platform_admin"
]);
var WorkerStatusSchema = import_zod.z.enum([
  "applicant",
  "documents_pending",
  "verified",
  "active",
  "suspended",
  "inactive"
]);
var CertificationLevelSchema = import_zod.z.enum(["basic", "certified", "senior"]);
var BookingStatusSchema = import_zod.z.enum([
  "pending_match",
  "offered",
  "assigned",
  "in_progress",
  "completed",
  "cancelled",
  "disputed"
]);
var JobOfferStatusSchema = import_zod.z.enum(["pending", "accepted", "rejected", "expired"]);
var JobAssignmentStatusSchema = import_zod.z.enum([
  "en_route",
  "arrived",
  "in_progress",
  "completed",
  "no_show"
]);
var PaymentStatusSchema = import_zod.z.enum(["created", "captured", "failed", "refunded"]);
var PayoutStatusSchema = import_zod.z.enum(["pending", "paid"]);
var WelfareEntryTypeSchema = import_zod.z.enum(["contribution", "claim_payout"]);
var WelfareClaimCategorySchema = import_zod.z.enum(["medical", "accident", "equipment", "other"]);
var WelfareClaimStatusSchema = import_zod.z.enum(["filed", "approved", "rejected", "paid"]);
var DisputeCategorySchema = import_zod.z.enum([
  "quality",
  "no_show",
  "payment",
  "damage",
  "conduct",
  "other"
]);
var DisputeStatusSchema = import_zod.z.enum([
  "filed",
  "society_review",
  "escalated_to_federation",
  "resolved",
  "closed"
]);
var KycDocTypeSchema = import_zod.z.enum([
  "aadhaar",
  "e_shram_card",
  "skill_certificate",
  "police_verification",
  "other"
]);
var KycVerificationStatusSchema = import_zod.z.enum(["pending", "verified", "rejected"]);
var KycVerifiedViaSchema = import_zod.z.enum(["manual", "e_shram_mock", "digilocker_mock"]);

// src/auth.ts
var import_zod2 = require("zod");
var RequestOtpSchema = import_zod2.z.object({
  phone_number: import_zod2.z.string().min(10).max(15)
});
var VerifyOtpSchema = import_zod2.z.object({
  phone_number: import_zod2.z.string().min(10).max(15),
  otp_code: import_zod2.z.string().length(6)
});
var RegisterUserSchema = import_zod2.z.object({
  phone_number: import_zod2.z.string().min(10).max(15),
  full_name: import_zod2.z.string().min(2),
  role: UserRoleSchema,
  email: import_zod2.z.string().email().optional(),
  preferred_language: import_zod2.z.string().default("hi"),
  society_id: import_zod2.z.string().uuid().optional(),
  // for workers
  trade_categories: import_zod2.z.array(import_zod2.z.string().uuid()).optional()
  // for workers
});
var JwtPayloadSchema = import_zod2.z.object({
  user_id: import_zod2.z.string().uuid(),
  phone_number: import_zod2.z.string(),
  role: UserRoleSchema,
  society_id: import_zod2.z.string().uuid().nullable().optional(),
  federation_id: import_zod2.z.string().uuid().nullable().optional(),
  worker_id: import_zod2.z.string().uuid().nullable().optional(),
  customer_id: import_zod2.z.string().uuid().nullable().optional()
});

// src/fair-match.ts
var import_zod3 = require("zod");
var FairMatchWeightsSchema = import_zod3.z.object({
  W_prox: import_zod3.z.number().default(0.3),
  W_rating: import_zod3.z.number().default(0.2),
  W_fair: import_zod3.z.number().default(0.35),
  W_skill: import_zod3.z.number().default(0.15)
});

// src/booking.ts
var import_zod4 = require("zod");
var CreateBookingSchema = import_zod4.z.object({
  listing_id: import_zod4.z.string().uuid(),
  scheduled_slot_start: import_zod4.z.string().datetime(),
  service_location: import_zod4.z.object({
    latitude: import_zod4.z.number(),
    longitude: import_zod4.z.number()
  }),
  service_address_text: import_zod4.z.string().min(5)
});
var UpdateJobAssignmentStatusSchema = import_zod4.z.object({
  status: JobAssignmentStatusSchema
});
var RejectOfferSchema = import_zod4.z.object({
  reason: import_zod4.z.string().min(1)
});

// src/welfare.ts
var import_zod5 = require("zod");
var CreateWelfareClaimSchema = import_zod5.z.object({
  category: WelfareClaimCategorySchema,
  description: import_zod5.z.string().min(10),
  document_url: import_zod5.z.string().url().optional()
});
var ReviewWelfareClaimSchema = import_zod5.z.object({
  status: import_zod5.z.enum(["approved", "rejected"]),
  review_note: import_zod5.z.string().optional()
});

// src/dispute.ts
var import_zod6 = require("zod");
var CreateDisputeSchema = import_zod6.z.object({
  booking_id: import_zod6.z.string().uuid(),
  category: DisputeCategorySchema,
  description: import_zod6.z.string().min(10),
  evidence_urls: import_zod6.z.array(import_zod6.z.string()).default([])
});
var ResolveDisputeSchema = import_zod6.z.object({
  status: import_zod6.z.enum(["resolved", "closed", "escalated_to_federation"]),
  resolution_note: import_zod6.z.string().min(5)
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
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
});
