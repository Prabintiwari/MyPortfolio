import api from "./api";

export const uploadService = {
  getAll: async () => {
    const { data } = await api.get("/");
    return data;
  },
};
