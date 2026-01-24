import { Request, Response } from "express";
import { AISuggestionService } from "../services/AISuggestionService";

export class AISuggestionController {
    static async suggestSummary(req: Request, res: Response) {
        try {
            const { fullName, skills, experiences } = req.body;
            if (!fullName) {
                return res.status(400).json({ message: "Full name is required" });
            }
            const summary = await AISuggestionService.suggestSummary(fullName, skills, experiences);
            res.json({ summary });
        } catch (error: any) {
            console.error("AI Summary Error:", error);
            res.status(500).json({ message: "Failed to generate summary", error: error.message });
        }
    }

    static async suggestWorkDescription(req: Request, res: Response) {
        try {
            const { position, company } = req.body;
            if (!position || !company) {
                return res.status(400).json({ message: "Position and Company are required" });
            }
            const description = await AISuggestionService.suggestWorkDescription(position, company);
            res.json({ description });
        } catch (error: any) {
            console.error("AI Work Description Error:", error);
            res.status(500).json({ message: "Failed to generate work description", error: error.message });
        }
    }
}
