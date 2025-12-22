import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export class CVController {
    // --- Entity Details ---
    static async upsertEntityDetails(req: Request, res: Response) {
        try {
            const { cvId, ...data } = req.body;

            let targetCvId = cvId;
            if (!targetCvId) {
                // Create a new CV if not provided
                const newCv = await prisma.cV.create({ data: {} });
                targetCvId = newCv.id;
            }

            const entityDetails = await prisma.entityDetails.upsert({
                where: { cvId: targetCvId },
                update: data,
                create: { ...data, cvId: targetCvId },
            });

            res.status(200).json({ ...entityDetails, cvId: targetCvId });
        } catch (error) {
            res.status(500).json({ error: 'Failed to save entity details', initialError: error });
        }
    }

    static async getEntityDetails(req: Request, res: Response) {
        try {
            const { cvId } = req.query;
            if (!cvId || typeof cvId !== 'string') {
                return res.status(400).json({ error: 'cvId is required' });
            }
            const details = await prisma.entityDetails.findUnique({ where: { cvId } });
            res.json(details);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch entity details' });
        }
    }

    // --- Address ---
    static async getAddresses(req: Request, res: Response) {
        const { cvId } = req.query;
        if (!cvId || typeof cvId !== 'string') return res.status(400).json({ error: 'cvId required' });
        const data = await prisma.address.findMany({ where: { cvId } });
        res.json(data);
    }

    static async addAddress(req: Request, res: Response) {
        const { cvId, ...data } = req.body;
        if (!cvId) return res.status(400).json({ error: 'cvId required' });
        const result = await prisma.address.create({ data: { ...data, cvId } });
        res.json(result);
    }

    static async updateAddress(req: Request, res: Response) {
        const { id, ...data } = req.body;
        const result = await prisma.address.update({ where: { id }, data });
        res.json(result);
    }

    static async deleteAddress(req: Request, res: Response) {
        const { id } = req.query;
        if (!id || typeof id !== 'string') return res.status(400).json({ error: 'id required' });
        await prisma.address.delete({ where: { id } });
        res.status(204).send();
    }


    // --- Education ---
    static async getEducations(req: Request, res: Response) {
        const { cvId } = req.query;
        if (!cvId || typeof cvId !== 'string') return res.status(400).json({ error: 'cvId required' });
        const data = await prisma.education.findMany({ where: { cvId } });
        res.json(data);
    }

    static async addEducation(req: Request, res: Response) {
        const { cvId, ...data } = req.body;
        if (!cvId) return res.status(400).json({ error: 'cvId required' });
        // Convert dates if strings
        if (data.startDate) data.startDate = new Date(data.startDate);
        if (data.endDate) data.endDate = new Date(data.endDate);

        const result = await prisma.education.create({ data: { ...data, cvId } });
        res.json(result);
    }

    static async updateEducation(req: Request, res: Response) {
        const { id, ...data } = req.body;
        // Convert dates if strings
        if (data.startDate) data.startDate = new Date(data.startDate);
        if (data.endDate) data.endDate = new Date(data.endDate);

        const result = await prisma.education.update({ where: { id }, data });
        res.json(result);
    }

    static async deleteEducation(req: Request, res: Response) {
        const { id } = req.query;
        if (!id || typeof id !== 'string') return res.status(400).json({ error: 'id required' });
        await prisma.education.delete({ where: { id } });
        res.status(204).send();
    }

    // --- Work Experience ---
    static async getWorkExperiences(req: Request, res: Response) {
        const { cvId } = req.query;
        if (!cvId || typeof cvId !== 'string') return res.status(400).json({ error: 'cvId required' });
        const data = await prisma.workExperience.findMany({ where: { cvId } });
        res.json(data);
    }

    static async addWorkExperience(req: Request, res: Response) {
        const { cvId, ...data } = req.body;
        if (!cvId) return res.status(400).json({ error: 'cvId required' });
        if (data.startDate) data.startDate = new Date(data.startDate);
        if (data.endDate) data.endDate = new Date(data.endDate);
        const result = await prisma.workExperience.create({ data: { ...data, cvId } });
        res.json(result);
    }

    static async updateWorkExperience(req: Request, res: Response) {
        const { id, ...data } = req.body;
        if (data.startDate) data.startDate = new Date(data.startDate);
        if (data.endDate) data.endDate = new Date(data.endDate);
        const result = await prisma.workExperience.update({ where: { id }, data });
        res.json(result);
    }

    static async deleteWorkExperience(req: Request, res: Response) {
        const { id } = req.query;
        if (!id || typeof id !== 'string') return res.status(400).json({ error: 'id required' });
        await prisma.workExperience.delete({ where: { id } });
        res.status(204).send();
    }

    // --- Skills ---
    static async getSkills(req: Request, res: Response) {
        const { cvId } = req.query;
        if (!cvId || typeof cvId !== 'string') return res.status(400).json({ error: 'cvId required' });
        const data = await prisma.skill.findMany({ where: { cvId } });
        res.json(data);
    }

    static async addSkill(req: Request, res: Response) {
        const { cvId, ...data } = req.body;
        if (!cvId) return res.status(400).json({ error: 'cvId required' });
        const result = await prisma.skill.create({ data: { ...data, cvId } });
        res.json(result);
    }

    static async updateSkill(req: Request, res: Response) {
        const { id, ...data } = req.body;
        const result = await prisma.skill.update({ where: { id }, data });
        res.json(result);
    }

    static async deleteSkill(req: Request, res: Response) {
        const { id } = req.query;
        if (!id || typeof id !== 'string') return res.status(400).json({ error: 'id required' });
        await prisma.skill.delete({ where: { id } });
        res.status(204).send();
    }

    // --- References ---
    static async getReferences(req: Request, res: Response) {
        const { cvId } = req.query;
        if (!cvId || typeof cvId !== 'string') return res.status(400).json({ error: 'cvId required' });
        const data = await prisma.reference.findMany({ where: { cvId } });
        res.json(data);
    }

    static async addReference(req: Request, res: Response) {
        const { cvId, ...data } = req.body;
        if (!cvId) return res.status(400).json({ error: 'cvId required' });
        const result = await prisma.reference.create({ data: { ...data, cvId } });
        res.json(result);
    }

    static async updateReference(req: Request, res: Response) {
        const { id, ...data } = req.body;
        const result = await prisma.reference.update({ where: { id }, data });
        res.json(result);
    }

    static async deleteReference(req: Request, res: Response) {
        const { id } = req.query;
        if (!id || typeof id !== 'string') return res.status(400).json({ error: 'id required' });
        await prisma.reference.delete({ where: { id } });
        res.status(204).send();
    }

    // --- CV Builder Aggregator ---
    static async getCVBuilder(req: Request, res: Response) {
        const { cvId } = req.query;
        if (!cvId || typeof cvId !== 'string') return res.status(400).json({ error: 'cvId required' });

        try {
            const cv = await prisma.cV.findUnique({
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

            if (!cv) {
                return res.status(404).json({ error: 'CV not found' });
            }

            // Format response according to requirement
            const response = {
                personalDetails: cv.personalDetails || {},
                addresses: cv.addresses, // Added this even though not in main example, logical to include
                education: cv.educations,
                workExperience: cv.workExperiences,
                skills: cv.skills,
                references: cv.references,
                createdAt: cv.createdAt,
                updatedAt: cv.updatedAt,
            };

            res.json(response);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to fetch CV data' });
        }
    }
}
