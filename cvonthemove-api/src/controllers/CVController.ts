import { Request, Response, NextFunction } from 'express';
import { CVService } from '../services/CVService';

export class CVController {

    /**
     * GET /cv/:id
     * Fetch CV data for the "Edit" journey.
     */
    static async getCV(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({ success: false, message: "CV ID is required" });
            }

            const cv = await CVService.getCVById(id);

            if (!cv) {
                return res.status(404).json({ success: false, message: "CV not found" });
            }

            // Return the data tailored for the frontend state
            return res.status(200).json({
                success: true,
                data: cv,
            });

        } catch (error) {
            // Pass to global error handler
            next(error);
        }
    }
}
