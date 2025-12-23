import { Request, Response } from 'express';
import { EntityDetailsService } from '../services/EntityDetailsService';
import prisma from '../../../lib/prisma'; // Need access to prisma for checking CV existence if strictly required, but passing to service is better.
// Actually, EntityDetailsService logic: upsert requires cvId.

export class EntityDetailsController {
    static async get(req: Request, res: Response) {
        try {
            const { cvId } = req.query;
            if (typeof cvId !== 'string') return res.status(400).json({ error: 'cvId required' });

            const data = await EntityDetailsService.get(cvId);
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch entity details' });
        }
    }

    static async upsert(req: Request, res: Response) {
        try {
            const { cvId, ...data } = req.body;

            // Logic to Ensure CV exists or create one?
            // User requirement: "/entity–details get,post,delete, update"
            // If post/update, we need a cvId.
            // If cvId is missing, should we create a CV?
            // The original logic did that.

            let targetCvId = cvId;
            if (!targetCvId) {
                const newCv = await prisma.cV.create({ data: {} });
                targetCvId = newCv.id;
            }

            const result = await EntityDetailsService.upsert(targetCvId, data);
            res.json({ ...result, cvId: targetCvId });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to save entity details' });
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const { cvId } = req.query;
            if (typeof cvId !== 'string') return res.status(400).json({ error: 'cvId required' });
            await EntityDetailsService.delete(cvId);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete entity details' });
        }
    }
}
