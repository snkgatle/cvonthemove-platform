import { z } from 'zod';

// --- Atomic Schemas ---

export const EntityDetailsSchema = z.object({
    fullName: z.string().min(1, "Full name is required"),
    email: z.email("Invalid email address"),
    phone: z.string().min(1, "Phone number is required"),
    location: z.string().min(1, "Location is required"),
    summary: z.string().min(1, "Summary is required"),
    linkedinUrl: z.string().url("Invalid URL").optional().or(z.literal('')),
    idNumber: z.string().optional(),
    languages: z.array(z.string()).default([]),
    criminalRecord: z.string().optional(),
    maritalStatus: z.string().optional(),
});

export const AddressSchema = z.object({
    line1: z.string().min(1, "Line 1 is required"),
    line2: z.string().optional(),
    city: z.string().min(1, "City is required"),
    postalCode: z.string().min(1, "Postal code is required"),
    country: z.string().min(1, "Country is required"),
});

export const EducationSchema = z.object({
    institution: z.string().min(1, "Institution is required"),
    degree: z.string().min(1, "Degree is required"),
    fieldOfStudy: z.string().min(1, "Field of study is required"),
    startDate: z.string().or(z.date()).transform((val) => new Date(val)),
    endDate: z.string().or(z.date()).optional().nullable().transform((val) => val ? new Date(val) : null),
    current: z.boolean().default(false),
});

export const WorkExperienceSchema = z.object({
    company: z.string().min(1, "Company is required"),
    position: z.string().min(1, "Position is required"),
    description: z.string().min(1, "Description is required"),
    startDate: z.string().or(z.date()).transform((val) => new Date(val)),
    endDate: z.string().or(z.date()).optional().nullable().transform((val) => val ? new Date(val) : null),
    current: z.boolean().default(false),
});

export const SkillSchema = z.object({
    name: z.string().min(1, "Skill name is required"),
    level: z.string().min(1, "Skill level is required"),
});

export const ReferenceSchema = z.object({
    name: z.string().min(1, "Reference name is required"),
    relationship: z.string().min(1, "Relationship is required"),
    company: z.string().optional(),
    email: z.string().email("Invalid email").optional().or(z.literal('')),
    phone: z.string().optional(),
});

// --- Composite Schema (for full CV update/create) ---

export const CreateCVSchema = z.object({
    personalDetails: EntityDetailsSchema.optional(),
    addresses: z.array(AddressSchema).optional(),
    educations: z.array(EducationSchema).optional(),
    workExperiences: z.array(WorkExperienceSchema).optional(),
    skills: z.array(SkillSchema).optional(),
    references: z.array(ReferenceSchema).optional(),
});

export type EntityDetailsInput = z.input<typeof EntityDetailsSchema>;
export type AddressInput = z.input<typeof AddressSchema>;
export type EducationInput = z.input<typeof EducationSchema>;
export type WorkExperienceInput = z.input<typeof WorkExperienceSchema>;
export type SkillInput = z.input<typeof SkillSchema>;
export type ReferenceInput = z.input<typeof ReferenceSchema>;
export type CreateCVInput = z.input<typeof CreateCVSchema>;
export type CreateCVData = z.infer<typeof CreateCVSchema>;
