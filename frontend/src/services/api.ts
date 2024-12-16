import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('@HotelApp:token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const reservationService = {
  create: async (reservationData: any) => {
    const response = await api.post('/reservations', reservationData);
    return response.data;
  },
  
  list: async () => {
    const response = await api.get('/reservations');
    return response.data;
  },
  
  getById: async (id: string) => {
    const response = await api.get(`/reservations/${id}`);
    return response.data;
  },
  
  update: async (id: string, data: any) => {
    const response = await api.put(`/reservations/${id}`, data);
    return response.data;
  },
  
  delete: async (id: string) => {
    const response = await api.delete(`/reservations/${id}`);
    return response.data;
  }
};

export default api;
