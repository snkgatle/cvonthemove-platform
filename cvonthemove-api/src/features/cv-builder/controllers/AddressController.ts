import { Request, Response } from 'express';
import { AddressService } from '../services/AddressService';

export class AddressController {
    static async list(req: Request, res: Response) {
        try {
            const { cvId } = req.query;
            if (typeof cvId !== 'string') return res.status(400).json({ error: 'cvId required' });
            const data = await AddressService.list(cvId);
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: 'Failed to list addresses' });
        }
    }

    static async add(req: Request, res: Response) {
        try {
            const { cvId, ...data } = req.body;
            if (!cvId) return res.status(400).json({ error: 'cvId required' });
            const result = await AddressService.add(cvId, data);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to add address' });
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const { id } = req.params; // or body, strictly RESTful uses params for ID
            const data = req.body;

            // If ID is in body, use it too or check consistency
            // Requirement says: "update *address details array" - implies updating an item?
            // Assuming standard ID based update.
            const targetId = id || data.id;
            if (!targetId) return res.status(400).json({ error: 'id required' });

            const result = await AddressService.update(targetId, data);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: 'Failed to update address' });
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            // Allow query param too for flexibility if params not set
            const targetId = id || req.query.id as string;

            if (!targetId) return res.status(400).json({ error: 'id required' });
            await AddressService.delete(targetId);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete address' });
        }
    }
}
