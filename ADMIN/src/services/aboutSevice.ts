// src/services/aboutService.ts
import api from './api';

export const aboutService = {
  get: async () => {
    const { data } = await api.get('/about');
    return data;
  },

  create: async (aboutData: object) => {
    const { data } = await api.post('/admin/about', aboutData);
    return data;
  },

  update: async (aboutData: object) => {
    const { data } = await api.put('/admin/about', aboutData);
    return data;
  },

  delete: async () => {
    const { data } = await api.delete('/admin/about');
    return data;
  },
};