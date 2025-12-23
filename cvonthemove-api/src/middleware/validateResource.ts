import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export const validate = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
        const parsed = schema.parse(req.body);
        // Optionally replace body with parsed data to strip unknown fields if schema is strict
        // req.body = parsed; 
        next();
    } catch (e: any) {
        return res.status(400).send(e.errors);
    }
};
