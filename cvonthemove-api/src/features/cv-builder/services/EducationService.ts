import prisma from '../../../lib/prisma';
import { EducationInput } from '../schemas/cvSchemas';

export class EducationService {
    static async add(cvId: string, data: EducationInput) {
        return prisma.education.create({
            data: { ...data, cvId },
        });
    }

    static async update(id: string, data: Partial<EducationInput>) {
        return prisma.education.update({
            where: { id },
            data,
        });
    }

    static async delete(id: string) {
        return prisma.education.delete({
            where: { id },
        });
    }

    static async list(cvId: string) {
        return prisma.education.findMany({
            where: { cvId },
        });
    }
}
