
export interface PersonalDetails {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
    linkedinUrl?: string;
    websiteUrl?: string;
    idNumber?: string;
    languages?: string[];
    criminalRecord?: string; // e.g. "Clean", or details
    maritalStatus?: string;
}

export interface Education {
    id: string;
    institution: string;
    degree: string;
    fieldOfStudy: string;
    startDate: string; // ISO Date string
    endDate?: string; // ISO Date string
    current: boolean;
    description?: string;
}

export interface WorkExperience {
    id: string;
    company: string;
    position: string;
    location?: string;
    startDate: string;
    endDate?: string;
    current: boolean;
    description: string;
}

export interface Skill {
    id: string;
    name: string;
    level?: "Beginner" | "Intermediate" | "Advanced" | "Expert";
}

export interface CVSchema {
    id?: string;
    templateId: string;
    personalDetails: PersonalDetails;
    education: Education[];
    workExperience: WorkExperience[];
    skills: Skill[];
    createdAt?: string;
    updatedAt?: string;
}

// Initial state constants
export const INITIAL_PERSONAL_DETAILS: PersonalDetails = {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    summary: "",
    languages: [],
};

export const INITIAL_CV_STATE: CVSchema = {
    templateId: "default",
    personalDetails: INITIAL_PERSONAL_DETAILS,
    education: [],
    workExperience: [],
    skills: [],
};
