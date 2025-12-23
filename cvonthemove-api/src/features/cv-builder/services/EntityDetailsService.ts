import prisma from '../../../lib/prisma';
import { EntityDetailsInput } from '../schemas/cvSchemas';

export class EntityDetailsService {
    static async upsert(cvId: string, data: EntityDetailsInput) {
        return prisma.entityDetails.upsert({
            where: { cvId },
            update: data,
            create: { ...data, cvId },
        });
    }

    static async get(cvId: string) {
        return prisma.entityDetails.findUnique({
            where: { cvId },
        });
    }

    static async delete(cvId: string) {
        return prisma.entityDetails.delete({
            where: { cvId },
        });
    }
}
