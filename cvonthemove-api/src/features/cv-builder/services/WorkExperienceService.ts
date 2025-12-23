import prisma from '../../../lib/prisma';
import { WorkExperienceInput } from '../schemas/cvSchemas';

export class WorkExperienceService {
    static async add(cvId: string, data: WorkExperienceInput) {
        return prisma.workExperience.create({
            data: { ...data, cvId },
        });
    }

    static async update(id: string, data: Partial<WorkExperienceInput>) {
        return prisma.workExperience.update({
            where: { id },
            data,
        });
    }

    static async delete(id: string) {
        return prisma.workExperience.delete({
            where: { id },
        });
    }

    static async list(cvId: string) {
        return prisma.workExperience.findMany({
            where: { cvId },
        });
    }
}
