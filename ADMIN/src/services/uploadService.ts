import api from "./api";

export const uploadService = {
  getAll: async () => {
    const { data } = await api.get("/portfolio-files");
    return data;
  },
  upsert: async (portfolioData:object) => {
    const { data } = await api.post("/admin/portfolio-files",portfolioData);
    return data;
  },
  delete: async (params?: "avatar" | "logo" | "resume") => {
    const { data } = await api.delete(`/admin/portfolio-files/${params}`);
    return data;
  },
};
