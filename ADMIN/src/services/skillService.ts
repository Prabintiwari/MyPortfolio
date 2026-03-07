import api from "./api";

export const skillService = {
  getAll: async (params?: { category?: string; isActive?: boolean }) => {
    const { data } = await api.get("/skills", { params });
    return data;
  },

  getById: async (id: string) => {
    const { data } = await api.get(`/skills/${id}`);
    return data;
  },

  create: async (skillData: object) => {
    const { data } = await api.post("/admin/skills", skillData);
    return data;
  },

  update: async (id: string, skillData: object) => {
    const { data } = await api.put(`/admin/skills/${id}`, skillData);
    return data;
  },

  toggle: async (id: string) => {
    const { data } = await api.put(`/admin/skills/${id}/toggle`);
    return data;
  },

  delete: async (id: string) => {
    const { data } = await api.delete(`/admin/skills/${id}`);
    return data;
  },
};
