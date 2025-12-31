import prisma from '../../../lib/prisma';
import { CreateCVData } from '../schemas/cvSchemas';
import { sendEmail } from '../../../lib/email';
import { cvDownloadedTemplate } from '../../../templates/cvDownloaded';

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
                user: true,
            },
        });
    }

    static async getCVByUserId(userId: string) {
        return prisma.cV.findFirst({
            where: { userId },
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

    static async sendCVDoc(cvId: string, userId: string) {
        const fullCV = await this.getFullCV(cvId);

        if (fullCV?.user) {
            await sendEmail({
                to: fullCV.user.email,
                ...cvDownloadedTemplate(fullCV.user.email.split('@')[0]),
            });
        }
    }

    static async createCV(data: CreateCVData, userId: string) {
        const existingCV = await prisma.cV.findFirst({
            where: { userId },
        });

        if (existingCV) {
            throw new Error('User already has a CV. Only one CV is allowed per user.');
        }

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
                user: { connect: { id: userId } },
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

    static async updateCV(cvId: string, data: CreateCVData) {
        const {
            personalDetails,
            addresses,
            educations,
            workExperiences,
            skills,
            references,
        } = data;

        return prisma.$transaction(async (tx) => {
            if (personalDetails) {
                await tx.entityDetails.upsert({
                    where: { cvId },
                    create: { ...personalDetails, cvId },
                    update: personalDetails,
                });
            }

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
