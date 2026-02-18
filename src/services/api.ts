import axios, { type InternalAxiosRequestConfig } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
    baseURL: API_BASE_URL,
});

// Add auth header if token exists
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('fb_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const fileService = {
    upload: async (formData: FormData) => {
        const response = await api.post('/files/', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    },

    getFiles: async (params = {}) => {
        const response = await api.get('/files/', { params });
        return response.data;
    },

    deleteFile: async (id: number) => {
        const response = await api.delete(`/files/${id}`);
        return response.data;
    }
};

export const labelService = {
    getAll: async () => {
        const response = await api.get('/labels/');
        return response.data;
    }
};

export default api;
