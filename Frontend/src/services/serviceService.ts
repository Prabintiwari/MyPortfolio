import { Service, ServiceQuery } from "../types/services.types";
import api from "./api";

export const serviceService = {
  getAll: async (params?: ServiceQuery) => {
    const { data } = await api.get("/services", { params });
    return data;
  },

  getById: async (id: string) => {
    const { data } = await api.get(`/services/${id}`);
    return data;
  },
};
