import { Request, Response } from 'express';
import { ReferenceService } from '../services/ReferenceService';

export class ReferenceController {
    static async list(req: Request, res: Response) {
        try {
            const { cvId } = req.query;
            if (typeof cvId !== 'string') return res.status(400).json({ error: 'cvId required' });
            const data = await ReferenceService.list(cvId);
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: 'Failed to list references' });
        }
    }

    static async add(req: Request, res: Response) {
        try {
            const { cvId, ...data } = req.body;
            if (!cvId) return res.status(400).json({ error: 'cvId required' });
            const result = await ReferenceService.add(cvId, data);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: 'Failed to add reference' });
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = req.body;
            const targetId = id || data.id;
            if (!targetId) return res.status(400).json({ error: 'id required' });

            const result = await ReferenceService.update(targetId, data);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: 'Failed to update reference' });
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const targetId = id || req.query.id as string;
            if (!targetId) return res.status(400).json({ error: 'id required' });
            await ReferenceService.delete(targetId);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete reference' });
        }
    }
}
