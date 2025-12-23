import { Request, Response } from 'express';
import { WorkExperienceService } from '../services/WorkExperienceService';

export class WorkExperienceController {
    static async list(req: Request, res: Response) {
        try {
            const { cvId } = req.query;
            if (typeof cvId !== 'string') return res.status(400).json({ error: 'cvId required' });
            const data = await WorkExperienceService.list(cvId);
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: 'Failed to list work experience' });
        }
    }

    static async add(req: Request, res: Response) {
        try {
            const { cvId, ...data } = req.body;
            if (!cvId) return res.status(400).json({ error: 'cvId required' });
            const result = await WorkExperienceService.add(cvId, data);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to add work experience' });
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = req.body;
            const targetId = id || data.id;
            if (!targetId) return res.status(400).json({ error: 'id required' });

            const result = await WorkExperienceService.update(targetId, data);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: 'Failed to update work experience' });
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const targetId = id || req.query.id as string;
            if (!targetId) return res.status(400).json({ error: 'id required' });
            await WorkExperienceService.delete(targetId);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete work experience' });
        }
    }
}
