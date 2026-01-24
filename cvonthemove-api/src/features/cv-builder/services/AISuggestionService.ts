import { geminiModel } from "../../../lib/gemini";

export class AISuggestionService {
    static async suggestSummary(fullName: string, skills: string[] = [], experiences: any[] = []) {
        const skillsContext = skills.length > 0 ? `Skills: ${skills.join(", ")}.` : "";
        const experiencesContext = experiences.length > 0
            ? `Experiences: ${experiences.map(e => `${e.position} at ${e.company}${e.description ? ` (${e.description})` : ""}`).join("; ")}.`
            : "";

        const prompt = `
            Act as a professional CV writer. Generate a concise, high-impact 3-line professional summary for a person named ${fullName}.
            ${skillsContext}
            ${experiencesContext}
            The summary should be professional, engaging, and tailored to their profile.
            Return ONLY the summary text, no conversational filler.
        `;

        const result = await geminiModel.generateContent(prompt);
        const response = await result.response;
        return response.text().trim();
    }

    static async suggestWorkDescription(position: string, company: string) {
        const prompt = `
            Act as a professional CV writer. Generate 3-4 high-impact professional bullet points for a ${position} at ${company}.
            Focus on achievements and responsibilities typical for this role.
            Use action verbs and professional language.
            Return ONLY the bullet points, each on a new line starting with a bullet character (•).
            No conversational filler.
        `;

        const result = await geminiModel.generateContent(prompt);
        const response = await result.response;
        return response.text().trim();
    }
}
