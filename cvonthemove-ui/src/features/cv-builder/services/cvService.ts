import api from '../../../services/api';

export const cvService = {
    createCV: async (data: any) => {
        const response = await api.post('/cvs', data);
        return response.data;
    },

    getCV: async (id: string) => {
        const response = await api.get(`/cvs/${id}`);
        return response.data;
    },

    updateCV: async (id: string, data: any) => {
        const response = await api.put(`/cvs/${id}`, data);
        return response.data;
    },

    downloadCV: async (id: string) => {
        const response = await api.get(`/cvs/${id}/download`, {
            responseType: 'blob', // Important for file downloads
        });
        return response.data;
    }
};
