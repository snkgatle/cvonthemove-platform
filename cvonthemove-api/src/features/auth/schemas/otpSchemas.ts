import { z } from 'zod';

export const RequestOtpSchema = z.object({
  body: z.object({
    email: z.email("Invalid email address"),
  }),
});

export const VerifyOtpSchema = z.object({
  body: z.object({
    email: z.email("Invalid email address"),
    otp: z.string().length(6, "OTP must be 6 digits"),
  }),
});
