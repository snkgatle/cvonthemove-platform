import { Request, Response } from 'express';
import { SkillService } from '../services/SkillService';

export class SkillController {
    static async list(req: Request, res: Response) {
        try {
            const { cvId } = req.query;
            if (typeof cvId !== 'string') return res.status(400).json({ error: 'cvId required' });
            const data = await SkillService.list(cvId);
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: 'Failed to list skills' });
        }
    }

    static async add(req: Request, res: Response) {
        try {
            const { cvId, ...data } = req.body;
            if (!cvId) return res.status(400).json({ error: 'cvId required' });
            const result = await SkillService.add(cvId, data);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: 'Failed to add skill' });
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = req.body;
            const targetId = id || data.id;
            if (!targetId) return res.status(400).json({ error: 'id required' });

            const result = await SkillService.update(targetId, data);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: 'Failed to update skill' });
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const targetId = id || req.query.id as string;
            if (!targetId) return res.status(400).json({ error: 'id required' });
            await SkillService.delete(targetId);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete skill' });
        }
    }
}
