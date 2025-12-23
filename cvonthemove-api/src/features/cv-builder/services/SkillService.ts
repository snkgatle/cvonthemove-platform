import prisma from '../../../lib/prisma';
import { SkillInput } from '../schemas/cvSchemas';

export class SkillService {
    static async add(cvId: string, data: SkillInput) {
        return prisma.skill.create({
            data: { ...data, cvId },
        });
    }

    static async update(id: string, data: Partial<SkillInput>) {
        return prisma.skill.update({
            where: { id },
            data,
        });
    }

    static async delete(id: string) {
        return prisma.skill.delete({
            where: { id },
        });
    }

    static async list(cvId: string) {
        return prisma.skill.findMany({
            where: { cvId },
        });
    }
}
