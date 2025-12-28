import { z } from 'zod';

export const LoginSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export const RegisterSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginInput = z.input<typeof LoginSchema>;
export type RegisterInput = z.input<typeof RegisterSchema>;
