import { z } from 'zod';
import { UserRoleSchema } from './enums';

export const RequestOtpSchema = z.object({
  phone_number: z.string().min(10).max(15),
});
export type RequestOtpInput = z.infer<typeof RequestOtpSchema>;

export const VerifyOtpSchema = z.object({
  phone_number: z.string().min(10).max(15),
  otp_code: z.string().length(6),
});
export type VerifyOtpInput = z.infer<typeof VerifyOtpSchema>;

export const RegisterUserSchema = z.object({
  phone_number: z.string().min(10).max(15),
  full_name: z.string().min(2),
  role: UserRoleSchema,
  email: z.string().email().optional(),
  preferred_language: z.string().default('hi'),
  society_id: z.string().uuid().optional(), // for workers
  trade_categories: z.array(z.string().uuid()).optional(), // for workers
});
export type RegisterUserInput = z.infer<typeof RegisterUserSchema>;

export const JwtPayloadSchema = z.object({
  user_id: z.string().uuid(),
  phone_number: z.string(),
  role: UserRoleSchema,
  society_id: z.string().uuid().nullable().optional(),
  federation_id: z.string().uuid().nullable().optional(),
  worker_id: z.string().uuid().nullable().optional(),
  customer_id: z.string().uuid().nullable().optional(),
});
export type JwtPayload = z.infer<typeof JwtPayloadSchema>;

export interface AuthResponse {
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
