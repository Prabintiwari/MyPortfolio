// src/services/serviceService.ts
import api from './api';

export const serviceService = {
  getAll: async () => {
    const { data } = await api.get('/services');
    return data.data;
  },

  getById: async (id: string) => {
    const { data } = await api.get(`/services/${id}`);
    return data.data;
  },

  create: async (serviceData: object) => {
    const { data } = await api.post('/services', serviceData);
    return data.data;
  },

  update: async (id: string, serviceData: object) => {
    const { data } = await api.put(`/services/${id}`, serviceData);
    return data.data;
  },

  delete: async (id: string) => {
    const { data } = await api.delete(`/services/${id}`);
    return data;
  },
};