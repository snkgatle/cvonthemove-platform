import { z } from 'zod';

// --- Frontend Schemas (Adapted from Backend) ---

export const EntityDetailsSchema = z.object({
    fullName: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(1, "Phone number is required"),
    location: z.string().min(1, "Location is required"),
    summary: z.string().min(1, "Summary is required"),
    linkedinUrl: z.string().url("Invalid URL").optional().or(z.literal('')),
    idNumber: z.string().optional(),
    // For the UI, languages might be a comma-separated string or an array.
    // The backend expects an array. We'll handle it as array in the form state for now
    // or as a comma separated string that gets split.
    // Let's stick to array of strings for structure, but UI might need a specific input.
    languages: z.array(z.string()),
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
    // In UI, date inputs usually return strings 'YYYY-MM-DD'.
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().optional().nullable(),
    current: z.boolean(), // No default here, must be provided
});

export const WorkExperienceSchema = z.object({
    company: z.string().min(1, "Company is required"),
    position: z.string().min(1, "Position is required"),
    description: z.string().min(1, "Description is required"),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().optional().nullable(),
    current: z.boolean(), // No default here, must be provided
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

// --- Composite Schema ---

export const CreateCVSchema = z.object({
    personalDetails: EntityDetailsSchema.optional(),
    addresses: z.array(AddressSchema).optional(),
    educations: z.array(EducationSchema).optional(),
    workExperiences: z.array(WorkExperienceSchema).optional(),
    skills: z.array(SkillSchema).optional(),
    references: z.array(ReferenceSchema).optional(),
});

// --- Form Specific Schema (with object wrappers for primitive arrays) ---

export const PersonalDetailsFormSchema = EntityDetailsSchema.extend({
    languages: z.array(z.object({ value: z.string() })),
});

export const CreateCVFormSchema = z.object({
    personalDetails: PersonalDetailsFormSchema.optional(),
    addresses: z.array(AddressSchema).optional(),
    educations: z.array(EducationSchema).optional(),
    workExperiences: z.array(WorkExperienceSchema).optional(),
    skills: z.array(SkillSchema).optional(),
    references: z.array(ReferenceSchema).optional(),
});


export type EntityDetailsInput = z.infer<typeof EntityDetailsSchema>;
export type AddressInput = z.infer<typeof AddressSchema>;
export type EducationInput = z.infer<typeof EducationSchema>;
export type WorkExperienceInput = z.infer<typeof WorkExperienceSchema>;
export type SkillInput = z.infer<typeof SkillSchema>;
export type ReferenceInput = z.infer<typeof ReferenceSchema>;
export type CreateCVInput = z.infer<typeof CreateCVSchema>;
export type CreateCVFormInput = z.infer<typeof CreateCVFormSchema>;

export interface CV extends CreateCVInput {
    id: string;
    createdAt: string;
    updatedAt: string;
}
