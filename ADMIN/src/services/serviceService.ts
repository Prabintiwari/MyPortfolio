import api from "./api";

export const serviceService = {
  getAll: async () => {
    const { data } = await api.get("/services");
    return data;
  },

  getById: async (id: string) => {
    const { data } = await api.get(`/services/${id}`);
    return data;
  },

  create: async (serviceData: FormData) => {
    const { data } = await api.post("/admin/services", serviceData);
    return data;
  },

  toggle: async (id: string) => {
    const { data } = await api.put(`/admin/services/${id}/toggle`);
    return data;
  },

  update: async (id: string, serviceData: FormData) => {
    const { data } = await api.put(`/admin/services/${id}`, serviceData);
    return data;
  },

  delete: async (id: string) => {
    const { data } = await api.delete(`/admin/services/${id}`);
    return data;
  },
};
