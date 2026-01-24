import api from '../../../services/api';

export const aiService = {
    suggestSummary: async (fullName: string, skills: string[], experiences: any[]) => {
        const response = await api.post('/ai/suggest-summary', { fullName, skills, experiences });
        return response.data.summary;
    },
    suggestWorkDescription: async (position: string, company: string) => {
        const response = await api.post('/ai/suggest-work-description', { position, company });
        return response.data.description;
    }
};
