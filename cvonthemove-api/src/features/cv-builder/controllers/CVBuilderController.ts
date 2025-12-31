import { CreateCVSchema } from '../schemas/cvSchemas';
import { Request, Response } from 'express';
import { CVBuilderService } from '../services/CVBuilderService';

export class CVBuilderController {
    static async getAllCVs(req: any, res: Response) {
        try {
            const userId = (req as any).user?.userId;
            if (!userId) {
                return res.status(401).json({ error: 'Unauthorized' });
            }

            const cvs = await CVBuilderService.getAllCVs(userId);
            res.json(cvs);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static async getCV(req: Request, res: Response) {
        try {
            const { cvId } = req.params;
            if (!cvId) return res.status(400).json({ error: 'cvId is required' });

            const cv = await CVBuilderService.getFullCV(cvId);
            if (!cv) return res.status(404).json({ error: 'CV not found' });

            // Transform to expected format if necessary, or return as is
            // Requirement: "get data... and present it in the following format"
            // The service returns the relations, which matches the requirement structure closely.
            const response = {
                personalDetails: cv.personalDetails || {},
                addresses: cv.addresses,
                education: cv.educations,
                workExperience: cv.workExperiences,
                skills: cv.skills,
                references: cv.references,
                createdAt: cv.createdAt,
                updatedAt: cv.updatedAt,
                id: cv.id // include ID usually
            };

            res.json(response);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static async createCV(req: Request, res: Response) {
        try {
            const userId = req.user?.userId;
            if (!userId) return res.status(401).json({ error: 'Unauthorized' });

            // Validate and transform input
            const parsedData = CreateCVSchema.parse(req.body);
            const cv = await CVBuilderService.createCV(parsedData, userId);
            res.status(201).json(cv);
        } catch (error) {
            console.error(error);
            // Handle Zod or other errors better
            if ((error as any).name === 'ZodError') {
                return res.status(400).json({ error: 'Validation Error', details: (error as any).errors });
            }
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static async updateCV(req: Request, res: Response) {
        try {
            const { cvId } = req.params;
            if (!cvId) return res.status(400).json({ error: 'cvId is required' });

            // Validate and transform input
            const parsedData = CreateCVSchema.parse(req.body);

            const cv = await CVBuilderService.updateCV(cvId, parsedData);
            res.status(200).json(cv);
        } catch (error) {
            console.error(error);
            if ((error as any).name === 'ZodError') {
                return res.status(400).json({ error: 'Validation Error', details: (error as any).errors });
            }
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}
