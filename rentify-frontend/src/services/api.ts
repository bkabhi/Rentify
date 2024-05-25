import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
    baseURL: `${API_URL}/api`,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const registerUser = async (userData: any) => {
    try {
        const response = await api.post('/users', userData);
        return response.data;
    } catch (error: any) {
        throw error.response.data.message;
    }
};

export const loginUser = async (loginData: any) => {
    try {
        const response = await api.post('/users/login', loginData);
        return response.data;
    } catch (error: any) {
        throw error.response.data.message;
    }
};

export const getUser = async () => {
    try {
        const response = await api.get('/users/profile');
        return response.data;
    } catch (error: any) {
        throw error.response.data.message;
    }
};

export const fetchProperties = async (config?: any) => {
    try {
        const response = await api.get('/properties', config);
        return response.data;
    } catch (error: any) {
        throw error.response.data.message;
    }
};

export const fetchPropertyById = async (propertyId: string) => {
    try {
        const response = await api.get(`/properties/${propertyId}`);
        return response.data;
    } catch (error: any) {
        throw error.response.data.message;
    }
};

export const fetchPropertiesBySeller = async (sellerId: string, config?: any) => {
    try {
        const response = await api.get(`/properties/seller/${sellerId}`, config);
        return response.data;
    } catch (error: any) {
        throw error.response.data.message;
    }
};

export const postProperty = async (propertyData: any) => {
    try {
        const response = await api.post('/properties', propertyData);
        return response.data;
    } catch (error: any) {
        throw error.response.data.message;
    }
};

export const expressInterest = async (propertyId: string) => {
    try {
        const response = await api.post(`/properties/${propertyId}/interest`);
        return response.data;
    } catch (error: any) {
        throw error.response.data.message;
    }
};

export const likeProperty = async (propertyId: string) => {
    try {
        const response = await api.post(`/properties/like/${propertyId}`);
        return response.data;
    } catch (error: any) {
        throw error.response.data.message;
    }
};

export const deleteProperty = async (propertyId: string) => {
    try {
        const response = await api.delete(`/properties/${propertyId}`);
        return response.data;
    } catch (error: any) {
        throw error.response.data.message;
    }
};

export const updateProperty = async (propertyId: string, propertyData: any) => {
    try {
        const response = await api.put(`/properties/${propertyId}`, propertyData);
        return response.data;
    } catch (error: any) {
        throw error.response.data.message;
    }
};