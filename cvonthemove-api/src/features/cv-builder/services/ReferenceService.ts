import prisma from '../../../lib/prisma';
import { ReferenceInput } from '../schemas/cvSchemas';

export class ReferenceService {
    static async add(cvId: string, data: ReferenceInput) {
        return prisma.reference.create({
            data: { ...data, cvId },
        });
    }

    static async update(id: string, data: Partial<ReferenceInput>) {
        return prisma.reference.update({
            where: { id },
            data,
        });
    }

    static async delete(id: string) {
        return prisma.reference.delete({
            where: { id },
        });
    }

    static async list(cvId: string) {
        return prisma.reference.findMany({
            where: { cvId },
        });
    }
}
