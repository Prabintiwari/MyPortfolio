// src/services/contactService.ts
import api from './api';

export const contactService = {
  // Public - Submit form
  submit: async (formData: {
    name: string;
    email: string;
    phone?: string;
    subject?: string;
    message: string;
  }) => {
    const { data } = await api.post('/contacts', formData);
    return data;
  },

  // Admin only
  getAll: async (params?: { isRead?: boolean }) => {
    const { data } = await api.get('/contacts', { params });
    return data.data;
  },

  markAsRead: async (id: string) => {
    const { data } = await api.put(`/contacts/${id}`);
    return data.data;
  },

  delete: async (id: string) => {
    const { data } = await api.delete(`/contacts/${id}`);
    return data;
  },
};