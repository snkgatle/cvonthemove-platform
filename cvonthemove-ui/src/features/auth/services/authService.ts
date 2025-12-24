import api from '../../../services/api';

export const authService = {
    login: async (email: string) => {
        // Determine if this is a full login or just initiating an OTP flow
        // For now, assuming email login initiates a session or OTP
        const response = await api.post('/auth/login', { email });
        return response.data;
    },

    verifyOtp: async (email: string, otp: string) => {
        const response = await api.post('/auth/verify-otp', { email, otp });
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('token');
    }
};
