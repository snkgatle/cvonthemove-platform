// Similar to frontend types, but strictly for API responses/requests
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
    criminalRecord?: string;
    maritalStatus?: string;
}

export interface Education {
    id: string;
    institution: string;
    degree: string;
    fieldOfStudy: string;
    startDate: string;
    endDate?: string;
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
    level?: string;
}

export interface CVDTO {
    id: string;
    userId: string;
    templateId: string;
    personalDetails: PersonalDetails;
    education: Education[];
    workExperience: WorkExperience[];
    skills: Skill[];
    createdAt: Date;
    updatedAt: Date;
}
