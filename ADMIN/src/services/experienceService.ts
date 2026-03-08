// src/services/experienceService.ts
import api from './api';

export const experienceService = {
  getAll: async () => {
    const { data } = await api.get('/experiences');
    return data.data;
  },

  getById: async (id: string) => {
    const { data } = await api.get(`/experiences/${id}`);
    return data.data;
  },

  toggle: async (id:string) => {
    const { data } = await api.post(`/admin/experiences/${id}/toggle`,);
    return data.data;
  },

  create: async (experienceData: object) => {
    const { data } = await api.post('/admin/experiences', experienceData);
    return data.data;
  },

  update: async (id: string, experienceData: object) => {
    const { data } = await api.put(`/admin/experiences/${id}`, experienceData);
    return data.data;
  },

  delete: async (id: string) => {
    const { data } = await api.delete(`/admin/experiences/${id}`);
    return data;
  },
};