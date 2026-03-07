// src/services/socialLinkService.ts
import api from './api';

export const socialLinkService = {
  getAll: async () => {
    const { data } = await api.get('/social-links');
    return data.data;
  },

  create: async (linkData: object) => {
    const { data } = await api.post('/social-links', linkData);
    return data.data;
  },

  update: async (id: string, linkData: object) => {
    const { data } = await api.put(`/social-links/${id}`, linkData);
    return data.data;
  },

  delete: async (id: string) => {
    const { data } = await api.delete(`/social-links/${id}`);
    return data;
  },
};