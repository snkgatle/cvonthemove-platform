import prisma from '../../../lib/prisma';
import { CreateCVInput } from '../schemas/cvSchemas';

export class CVBuilderService {
    static async getFullCV(cvId: string) {
        return prisma.cV.findUnique({
            where: { id: cvId },
            include: {
                personalDetails: true,
                addresses: true,
                educations: true,
                workExperiences: true,
                skills: true,
                references: true,
            },
        });
    }

    static async createCV(data: CreateCVInput) {
        if (!data) return prisma.cV.create({ data: {} })

        const {
            personalDetails,
            addresses,
            educations,
            workExperiences,
            skills,
            references,
        } = data;

        return prisma.cV.create({
            data: {
                personalDetails: personalDetails ? { create: personalDetails } : undefined,
                addresses: addresses ? { create: addresses } : undefined,
                educations: educations ? { create: educations } : undefined,
                workExperiences: workExperiences ? { create: workExperiences } : undefined,
                skills: skills ? { create: skills } : undefined,
                references: references ? { create: references } : undefined,
            },
            include: {
                personalDetails: true,
                addresses: true,
                educations: true,
                workExperiences: true,
                skills: true,
                references: true,
            },
        });
    }
}
