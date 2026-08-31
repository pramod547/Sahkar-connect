import { z } from 'zod';

declare const UserRoleSchema: z.ZodEnum<["customer", "worker", "society_admin", "federation_admin", "platform_admin"]>;
type UserRole = z.infer<typeof UserRoleSchema>;
declare const WorkerStatusSchema: z.ZodEnum<["applicant", "documents_pending", "verified", "active", "suspended", "inactive"]>;
type WorkerStatus = z.infer<typeof WorkerStatusSchema>;
declare const CertificationLevelSchema: z.ZodEnum<["basic", "certified", "senior"]>;
type CertificationLevel = z.infer<typeof CertificationLevelSchema>;
declare const BookingStatusSchema: z.ZodEnum<["pending_match", "offered", "assigned", "in_progress", "completed", "cancelled", "disputed"]>;
type BookingStatus = z.infer<typeof BookingStatusSchema>;
declare const JobOfferStatusSchema: z.ZodEnum<["pending", "accepted", "rejected", "expired"]>;
type JobOfferStatus = z.infer<typeof JobOfferStatusSchema>;
declare const JobAssignmentStatusSchema: z.ZodEnum<["en_route", "arrived", "in_progress", "completed", "no_show"]>;
type JobAssignmentStatus = z.infer<typeof JobAssignmentStatusSchema>;
declare const PaymentStatusSchema: z.ZodEnum<["created", "captured", "failed", "refunded"]>;
type PaymentStatus = z.infer<typeof PaymentStatusSchema>;
declare const PayoutStatusSchema: z.ZodEnum<["pending", "paid"]>;
type PayoutStatus = z.infer<typeof PayoutStatusSchema>;
declare const WelfareEntryTypeSchema: z.ZodEnum<["contribution", "claim_payout"]>;
type WelfareEntryType = z.infer<typeof WelfareEntryTypeSchema>;
declare const WelfareClaimCategorySchema: z.ZodEnum<["medical", "accident", "equipment", "other"]>;
type WelfareClaimCategory = z.infer<typeof WelfareClaimCategorySchema>;
declare const WelfareClaimStatusSchema: z.ZodEnum<["filed", "approved", "rejected", "paid"]>;
type WelfareClaimStatus = z.infer<typeof WelfareClaimStatusSchema>;
declare const DisputeCategorySchema: z.ZodEnum<["quality", "no_show", "payment", "damage", "conduct", "other"]>;
type DisputeCategory = z.infer<typeof DisputeCategorySchema>;
declare const DisputeStatusSchema: z.ZodEnum<["filed", "society_review", "escalated_to_federation", "resolved", "closed"]>;
type DisputeStatus = z.infer<typeof DisputeStatusSchema>;
declare const KycDocTypeSchema: z.ZodEnum<["aadhaar", "e_shram_card", "skill_certificate", "police_verification", "other"]>;
type KycDocType = z.infer<typeof KycDocTypeSchema>;
declare const KycVerificationStatusSchema: z.ZodEnum<["pending", "verified", "rejected"]>;
type KycVerificationStatus = z.infer<typeof KycVerificationStatusSchema>;
declare const KycVerifiedViaSchema: z.ZodEnum<["manual", "e_shram_mock", "digilocker_mock"]>;
type KycVerifiedVia = z.infer<typeof KycVerifiedViaSchema>;

declare const RequestOtpSchema: z.ZodObject<{
    phone_number: z.ZodString;
}, "strip", z.ZodTypeAny, {
    phone_number: string;
}, {
    phone_number: string;
}>;
type RequestOtpInput = z.infer<typeof RequestOtpSchema>;
declare const VerifyOtpSchema: z.ZodObject<{
    phone_number: z.ZodString;
    otp_code: z.ZodString;
}, "strip", z.ZodTypeAny, {
    phone_number: string;
    otp_code: string;
}, {
    phone_number: string;
    otp_code: string;
}>;
type VerifyOtpInput = z.infer<typeof VerifyOtpSchema>;
declare const RegisterUserSchema: z.ZodObject<{
    phone_number: z.ZodString;
    full_name: z.ZodString;
    role: z.ZodEnum<["customer", "worker", "society_admin", "federation_admin", "platform_admin"]>;
    email: z.ZodOptional<z.ZodString>;
    preferred_language: z.ZodDefault<z.ZodString>;
    society_id: z.ZodOptional<z.ZodString>;
    trade_categories: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    phone_number: string;
    full_name: string;
    role: "customer" | "worker" | "society_admin" | "federation_admin" | "platform_admin";
    preferred_language: string;
    email?: string | undefined;
    society_id?: string | undefined;
    trade_categories?: string[] | undefined;
}, {
    phone_number: string;
    full_name: string;
    role: "customer" | "worker" | "society_admin" | "federation_admin" | "platform_admin";
    email?: string | undefined;
    preferred_language?: string | undefined;
    society_id?: string | undefined;
    trade_categories?: string[] | undefined;
}>;
type RegisterUserInput = z.infer<typeof RegisterUserSchema>;
declare const JwtPayloadSchema: z.ZodObject<{
    user_id: z.ZodString;
    phone_number: z.ZodString;
    role: z.ZodEnum<["customer", "worker", "society_admin", "federation_admin", "platform_admin"]>;
    society_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    federation_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    worker_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    customer_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    phone_number: string;
    role: "customer" | "worker" | "society_admin" | "federation_admin" | "platform_admin";
    user_id: string;
    society_id?: string | null | undefined;
    federation_id?: string | null | undefined;
    worker_id?: string | null | undefined;
    customer_id?: string | null | undefined;
}, {
    phone_number: string;
    role: "customer" | "worker" | "society_admin" | "federation_admin" | "platform_admin";
    user_id: string;
    society_id?: string | null | undefined;
    federation_id?: string | null | undefined;
    worker_id?: string | null | undefined;
    customer_id?: string | null | undefined;
}>;
type JwtPayload = z.infer<typeof JwtPayloadSchema>;
interface AuthResponse {
    access_token: string;
    refresh_token: string;
    user: {
        id: string;
        phone_number: string;
        full_name: string;
        role: string;
        preferred_language: string;
        society_id?: string | null;
        federation_id?: string | null;
        worker_id?: string | null;
        customer_id?: string | null;
    };
}

interface LocationPoint {
    latitude: number;
    longitude: number;
}
interface CandidateWorker {
    worker_id: string;
    user_id: string;
    society_id: string;
    full_name: string;
    current_location: LocationPoint;
    rolling_avg_rating: number | null;
    completed_jobs_count: number;
    jobs_this_week_count: number;
    is_probation: boolean;
    has_exact_skill: boolean;
}
interface FairMatchWeights {
    W_prox: number;
    W_rating: number;
    W_fair: number;
    W_skill: number;
}
interface ScoreBreakdown {
    proximity: number;
    rating: number;
    fairness: number;
    skill: number;
}
interface RankedCandidate {
    worker: CandidateWorker;
    final_score: number;
    score_breakdown: ScoreBreakdown;
}
declare const FairMatchWeightsSchema: z.ZodObject<{
    W_prox: z.ZodDefault<z.ZodNumber>;
    W_rating: z.ZodDefault<z.ZodNumber>;
    W_fair: z.ZodDefault<z.ZodNumber>;
    W_skill: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    W_prox: number;
    W_rating: number;
    W_fair: number;
    W_skill: number;
}, {
    W_prox?: number | undefined;
    W_rating?: number | undefined;
    W_fair?: number | undefined;
    W_skill?: number | undefined;
}>;

declare const CreateBookingSchema: z.ZodObject<{
    listing_id: z.ZodString;
    scheduled_slot_start: z.ZodString;
    service_location: z.ZodObject<{
        latitude: z.ZodNumber;
        longitude: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        latitude: number;
        longitude: number;
    }, {
        latitude: number;
        longitude: number;
    }>;
    service_address_text: z.ZodString;
}, "strip", z.ZodTypeAny, {
    listing_id: string;
    scheduled_slot_start: string;
    service_location: {
        latitude: number;
        longitude: number;
    };
    service_address_text: string;
}, {
    listing_id: string;
    scheduled_slot_start: string;
    service_location: {
        latitude: number;
        longitude: number;
    };
    service_address_text: string;
}>;
type CreateBookingInput = z.infer<typeof CreateBookingSchema>;
declare const UpdateJobAssignmentStatusSchema: z.ZodObject<{
    status: z.ZodEnum<["en_route", "arrived", "in_progress", "completed", "no_show"]>;
}, "strip", z.ZodTypeAny, {
    status: "in_progress" | "completed" | "en_route" | "arrived" | "no_show";
}, {
    status: "in_progress" | "completed" | "en_route" | "arrived" | "no_show";
}>;
type UpdateJobAssignmentStatusInput = z.infer<typeof UpdateJobAssignmentStatusSchema>;
declare const RejectOfferSchema: z.ZodObject<{
    reason: z.ZodString;
}, "strip", z.ZodTypeAny, {
    reason: string;
}, {
    reason: string;
}>;
type RejectOfferInput = z.infer<typeof RejectOfferSchema>;
interface PriceBreakdown {
    base_price: string;
    total_price: string;
    worker_payout: string;
    tech_ops_fee: string;
    welfare_contribution: string;
    federation_fee: string;
}

declare const CreateWelfareClaimSchema: z.ZodObject<{
    category: z.ZodEnum<["medical", "accident", "equipment", "other"]>;
    description: z.ZodString;
    document_url: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    category: "medical" | "accident" | "equipment" | "other";
    description: string;
    document_url?: string | undefined;
}, {
    category: "medical" | "accident" | "equipment" | "other";
    description: string;
    document_url?: string | undefined;
}>;
type CreateWelfareClaimInput = z.infer<typeof CreateWelfareClaimSchema>;
declare const ReviewWelfareClaimSchema: z.ZodObject<{
    status: z.ZodEnum<["approved", "rejected"]>;
    review_note: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    status: "rejected" | "approved";
    review_note?: string | undefined;
}, {
    status: "rejected" | "approved";
    review_note?: string | undefined;
}>;
type ReviewWelfareClaimInput = z.infer<typeof ReviewWelfareClaimSchema>;

declare const CreateDisputeSchema: z.ZodObject<{
    booking_id: z.ZodString;
    category: z.ZodEnum<["quality", "no_show", "payment", "damage", "conduct", "other"]>;
    description: z.ZodString;
    evidence_urls: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    category: "no_show" | "other" | "quality" | "payment" | "damage" | "conduct";
    description: string;
    booking_id: string;
    evidence_urls: string[];
}, {
    category: "no_show" | "other" | "quality" | "payment" | "damage" | "conduct";
    description: string;
    booking_id: string;
    evidence_urls?: string[] | undefined;
}>;
type CreateDisputeInput = z.infer<typeof CreateDisputeSchema>;
declare const ResolveDisputeSchema: z.ZodObject<{
    status: z.ZodEnum<["resolved", "closed", "escalated_to_federation"]>;
    resolution_note: z.ZodString;
}, "strip", z.ZodTypeAny, {
    status: "escalated_to_federation" | "resolved" | "closed";
    resolution_note: string;
}, {
    status: "escalated_to_federation" | "resolved" | "closed";
    resolution_note: string;
}>;
type ResolveDisputeInput = z.infer<typeof ResolveDisputeSchema>;

export { type AuthResponse, type BookingStatus, BookingStatusSchema, type CandidateWorker, type CertificationLevel, CertificationLevelSchema, type CreateBookingInput, CreateBookingSchema, type CreateDisputeInput, CreateDisputeSchema, type CreateWelfareClaimInput, CreateWelfareClaimSchema, type DisputeCategory, DisputeCategorySchema, type DisputeStatus, DisputeStatusSchema, type FairMatchWeights, FairMatchWeightsSchema, type JobAssignmentStatus, JobAssignmentStatusSchema, type JobOfferStatus, JobOfferStatusSchema, type JwtPayload, JwtPayloadSchema, type KycDocType, KycDocTypeSchema, type KycVerificationStatus, KycVerificationStatusSchema, type KycVerifiedVia, KycVerifiedViaSchema, type LocationPoint, type PaymentStatus, PaymentStatusSchema, type PayoutStatus, PayoutStatusSchema, type PriceBreakdown, type RankedCandidate, type RegisterUserInput, RegisterUserSchema, type RejectOfferInput, RejectOfferSchema, type RequestOtpInput, RequestOtpSchema, type ResolveDisputeInput, ResolveDisputeSchema, type ReviewWelfareClaimInput, ReviewWelfareClaimSchema, type ScoreBreakdown, type UpdateJobAssignmentStatusInput, UpdateJobAssignmentStatusSchema, type UserRole, UserRoleSchema, type VerifyOtpInput, VerifyOtpSchema, type WelfareClaimCategory, WelfareClaimCategorySchema, type WelfareClaimStatus, WelfareClaimStatusSchema, type WelfareEntryType, WelfareEntryTypeSchema, type WorkerStatus, WorkerStatusSchema };
