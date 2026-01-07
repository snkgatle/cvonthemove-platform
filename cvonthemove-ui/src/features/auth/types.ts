import { z } from 'zod';

export const LoginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
});

export type LoginInput = z.infer<typeof LoginSchema>;

export interface LoginResponse {
    token: string;
    // Add other fields if returned by the backend (e.g., user details)
}

export const RegisterSchema = LoginSchema.extend({
    termsAccepted: z.boolean().refine(val => val === true, {
        message: 'You must accept the Terms and Privacy Policy',
    }),
});
export type RegisterInput = z.infer<typeof RegisterSchema>;

