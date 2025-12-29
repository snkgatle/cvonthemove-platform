import { z } from 'zod';

// --- Atomic Schemas ---

export const EntityDetailsSchema = z.object({
    fullName: z.string().min(1, "Full name is required"),
    email: z.email("Invalid email address").min(1, "Email is required"),
    phone: z.string().min(1, "Phone number is required"),
    location: z.string().min(1, "Location is required"),
    summary: z.string().min(1, "Summary is required"),
    linkedinUrl: z.string().url("Invalid URL").optional().or(z.literal('')),
    idNumber: z.string().min(1, "ID number is required"),
    languages: z.array(z.string()).default(['English']),
    criminalRecord: z.string().optional(),
    maritalStatus: z.string().min(1, "Marital status is required"),
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
    personalDetails: EntityDetailsSchema.required(),
    addresses: z.array(AddressSchema).min(1, "Address is required"),
    educations: z.array(EducationSchema).min(1, "Education is required"),
    workExperiences: z.array(WorkExperienceSchema).optional(),
    skills: z.array(SkillSchema).min(1, "Skills are required"),
    references: z.array(ReferenceSchema).min(1, "References are required"),
});

export type EntityDetailsInput = z.input<typeof EntityDetailsSchema>;
export type AddressInput = z.input<typeof AddressSchema>;
export type EducationInput = z.input<typeof EducationSchema>;
export type WorkExperienceInput = z.input<typeof WorkExperienceSchema>;
export type SkillInput = z.input<typeof SkillSchema>;
export type ReferenceInput = z.input<typeof ReferenceSchema>;
export type CreateCVInput = z.input<typeof CreateCVSchema>;
export type CreateCVData = z.infer<typeof CreateCVSchema>;
