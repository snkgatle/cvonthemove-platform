import prisma from '../../../lib/prisma';
import { CreateCVData, PatchCVData } from '../schemas/cvSchemas';
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

        let ownerId = userId;

        // If no userId provided (or even if it is, depending on policy, but let's stick to session if present),
        // try to find user by email to link.
        // User request: "link ... based on email".
        // Use case: Unauthenticated creation or ensuring link to correct account?
        // If I am logged in, I want it linked to ME (userId).
        // If I am NOT logged in (public builder), I want it linked to my account if it exists.
        if (!ownerId && personalDetails?.email) {
            const user = await prisma.user.findUnique({
                where: { email: personalDetails.email },
            });
            if (user) {
                ownerId = user.id;
            }
        }

        return prisma.cV.create({
            data: {
                user: ownerId ? { connect: { id: ownerId } } : undefined,
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
    static async patchCV(cvId: string, data: PatchCVData) {
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

            if (addresses) {
                await tx.address.deleteMany({ where: { cvId } });
                if (addresses.length > 0) {
                    await tx.address.createMany({
                        data: addresses.map(a => ({ ...a, cvId })),
                    });
                }
            }

            if (educations) {
                await tx.education.deleteMany({ where: { cvId } });
                if (educations.length > 0) {
                    await tx.education.createMany({
                        data: educations.map(e => ({ ...e, cvId })),
                    });
                }
            }

            if (workExperiences) {
                await tx.workExperience.deleteMany({ where: { cvId } });
                if (workExperiences.length > 0) {
                    await tx.workExperience.createMany({
                        data: workExperiences.map(w => ({ ...w, cvId })),
                    });
                }
            }

            if (skills) {
                await tx.skill.deleteMany({ where: { cvId } });
                if (skills.length > 0) {
                    await tx.skill.createMany({
                        data: skills.map(s => ({ ...s, cvId })),
                    });
                }
            }

            if (references) {
                await tx.reference.deleteMany({ where: { cvId } });
                if (references.length > 0) {
                    await tx.reference.createMany({
                        data: references.map(r => ({ ...r, cvId })),
                    });
                }
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
