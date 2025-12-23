import prisma from '../../../lib/prisma';
import { AddressInput } from '../schemas/cvSchemas';

export class AddressService {
    static async add(cvId: string, data: AddressInput) {
        return prisma.address.create({
            data: { ...data, cvId },
        });
    }

    static async update(id: string, data: Partial<AddressInput>) {
        return prisma.address.update({
            where: { id },
            data,
        });
    }

    static async delete(id: string) {
        return prisma.address.delete({
            where: { id },
        });
    }

    static async list(cvId: string) {
        return prisma.address.findMany({
            where: { cvId },
        });
    }
}
