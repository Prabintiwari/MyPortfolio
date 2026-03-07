// src/services/contactMethodService.ts
import api from './api';

export const contactMethodService = {
  getAll: async () => {
    const { data } = await api.get('/contact-methods');
    return data.data;
  },

  create: async (methodData: object) => {
    const { data } = await api.post('/contact-methods', methodData);
    return data.data;
  },

  update: async (id: string, methodData: object) => {
    const { data } = await api.put(`/contact-methods/${id}`, methodData);
    return data.data;
  },

  delete: async (id: string) => {
    const { data } = await api.delete(`/contact-methods/${id}`);
    return data;
  },
};