import api from '../../../services/api';
import type { LoginInput, LoginResponse } from '../types';

export const authService = {
    login: async (data: LoginInput): Promise<LoginResponse> => {
        const response = await api.post('/auth/login', data);
        return response.data;
    },
};
