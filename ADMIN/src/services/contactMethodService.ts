
import api from './api';

export const contactMethodService = {
  getAll: async () => {
    const { data } = await api.get('/contact-methods');
    return data;
  },

  create: async (methodData: object) => {
    const { data } = await api.post('/admin/contact-methods', methodData);
    return data;
  },

  update: async (id: string, methodData: object) => {
    const { data } = await api.put(`/admin/contact-methods/${id}`, methodData);
    return data;
  },

  delete: async (id: string) => {
    const { data } = await api.delete(`/admin/contact-methods/${id}`);
    return data;
  },
};