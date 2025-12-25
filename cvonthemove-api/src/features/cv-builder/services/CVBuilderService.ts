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

    static async updateCV(cvId: string, data: CreateCVInput) {
        const {
            personalDetails,
            addresses,
            educations,
            workExperiences,
            skills,
            references,
        } = data;

        // Transactional update: Delete existing relations and recreate them
        // This ensures the current state exactly matches the input data
        return prisma.$transaction(async (tx) => {
            // 1. Update Personal Details (Upsert or Update)
            if (personalDetails) {
                 // Check if personal details exist, if so update, else create.
                 // Actually, simpler is to use update on CV with upsert on relation if possible,
                 // or just delete/create for consistency with others if we don't care about ID preservation of sub-entities.
                 // For PersonalDetails (1-to-1), upsert is better.
                 await tx.personalDetails.upsert({
                     where: { cvId },
                     create: { ...personalDetails, cvId },
                     update: personalDetails,
                 });
            }

            // 2. Relations (1-to-Many): Delete all and Re-create
            await tx.address.deleteMany({ where: { cvId } });
            if (addresses && addresses.length > 0) {
                await tx.address.createMany({
                    data: addresses.map(a => ({ ...a, cvId })),
                });
            }

            await tx.education.deleteMany({ where: { cvId } });
            if (educations && educations.length > 0) {
                await tx.education.createMany({
                    data: educations.map(e => ({ ...e, cvId })),
                });
            }

            await tx.workExperience.deleteMany({ where: { cvId } });
            if (workExperiences && workExperiences.length > 0) {
                await tx.workExperience.createMany({
                    data: workExperiences.map(w => ({ ...w, cvId })),
                });
            }

            await tx.skill.deleteMany({ where: { cvId } });
            if (skills && skills.length > 0) {
                await tx.skill.createMany({
                    data: skills.map(s => ({ ...s, cvId })),
                });
            }

            await tx.reference.deleteMany({ where: { cvId } });
            if (references && references.length > 0) {
                await tx.reference.createMany({
                    data: references.map(r => ({ ...r, cvId })),
                });
            }

            // Return the updated full CV
            return tx.cV.findUnique({
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
        });
    }
}
