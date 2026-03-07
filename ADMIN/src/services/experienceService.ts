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

  create: async (experienceData: object) => {
    const { data } = await api.post('/experiences', experienceData);
    return data.data;
  },

  update: async (id: string, experienceData: object) => {
    const { data } = await api.put(`/experiences/${id}`, experienceData);
    return data.data;
  },

  delete: async (id: string) => {
    const { data } = await api.delete(`/experiences/${id}`);
    return data;
  },
};