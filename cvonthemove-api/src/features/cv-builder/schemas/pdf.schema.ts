import { z } from 'zod';
import { CreateCVSchema } from './cvSchemas';

export const GeneratePdfSchema = z.object({
    templateId: z.enum(['modern', 'classic', 'minimalist', 'creative', 'professional']),
    data: CreateCVSchema,
});

export type GeneratePdfInput = z.infer<typeof GeneratePdfSchema>;
