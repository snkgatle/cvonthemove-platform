import { Request, Response } from 'express';
import { EducationService } from '../services/EducationService';

export class EducationController {
    static async list(req: Request, res: Response) {
        try {
            const { cvId } = req.query;
            if (typeof cvId !== 'string') return res.status(400).json({ error: 'cvId required' });
            const data = await EducationService.list(cvId);
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: 'Failed to list education' });
        }
    }

    static async add(req: Request, res: Response) {
        try {
            const { cvId, ...data } = req.body;
            if (!cvId) return res.status(400).json({ error: 'cvId required' });

            // Date conversion is handled in Zod schema transformation or here if manual
            // Assuming Zod middleware handles transformation, otherwise we might need to parse strings to Dates.
            // But strict standard: JSON has strings. Service *might* expect Dates if schema.prisma defines DateTime.
            // The Service calls prisma.create using `data`. Prisma needs Date objects or ISO strings (depending on config).
            // Safest to rely on ISO strings being parsed by Prisma or explicit conversion.
            // Let's rely on explicit conversion in Service or here. 
            // In my previous `CVController` I did manual conversion.
            // `EducationService` passes `data` directly. 
            // Primsma Client usually accepts ISO strings for DateTime.

            const result = await EducationService.add(cvId, data);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to add education' });
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = req.body;
            const targetId = id || data.id;
            if (!targetId) return res.status(400).json({ error: 'id required' });

            const result = await EducationService.update(targetId, data);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: 'Failed to update education' });
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const targetId = id || req.query.id as string;
            if (!targetId) return res.status(400).json({ error: 'id required' });
            await EducationService.delete(targetId);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete education' });
        }
    }
}
