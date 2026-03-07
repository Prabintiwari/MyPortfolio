// src/services/aboutService.ts
import api from './api';

export const aboutService = {
  get: async () => {
    const { data } = await api.get('/about');
    return data.data;
  },

  create: async (aboutData: object) => {
    const { data } = await api.post('/about', aboutData);
    return data.data;
  },

  update: async (aboutData: object) => {
    const { data } = await api.put('/about', aboutData);
    return data.data;
  },
};