import api from "./api";

export const contactService = {
  submit: async (formData: {
    name: string;
    email: string;
    phone?: string;
    subject?: string;
    message: string;
  }) => {
    const { data } = await api.post("/contacts", formData);
    return data;
  },

  // Admin only
  getAll: async (params?: { isRead?: boolean }) => {
    const { data } = await api.get("/admin/contacts", { params });
    return data;
  },

  markAsRead: async (id: string) => {
    const { data } = await api.put(`/admin/contacts/${id}`);
    return data;
  },

  delete: async (id: string) => {
    const { data } = await api.delete(`/admin/contacts/${id}`);
    return data;
  },
};
