import api from '../../../services/api';
import type { CreateCVInput } from '../types';

export const cvService = {
    createCV: async (data: CreateCVInput) => {
        const response = await api.post('/cv-builder', data);
        return response.data;
    },

    getMyCV: async () => {
        const response = await api.get('/cv-builder/my-cv');
        return response.data;
    },

    getCV: async (id: string) => {
        const response = await api.get(`/cv-builder/${id}`);
        // Transform backend response (keys might differ slightly, e.g. education vs educations)
        // Backend controller returns: { personalDetails, addresses, education, workExperience, skills, references, ... }
        // Frontend CreateCVInput expects: { personalDetails, addresses, educations, workExperiences, skills, references }
        const backendData = response.data;
        return {
            ...backendData,
            educations: backendData.education || backendData.educations,
            workExperiences: backendData.workExperience || backendData.workExperiences,
        };
    },

    updateCV: async (id: string, data: CreateCVInput) => {
        const response = await api.put(`/cv-builder/${id}`, data);
        return response.data;
    },

    downloadCV: async (id: string) => {
        const response = await api.get(`/cv-builder/${id}/download`, {
            responseType: 'blob',
        });
        return response.data;
    },

    generatePDF: async (data: CreateCVInput, templateId: string) => {
        const response = await api.post('/generate-pdf', { data, templateId }, {
            responseType: 'blob',
        });
        return response.data;
    }
};
