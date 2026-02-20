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


  create: async (servicesData: Service) => {
    const { data } = await api.post("/services", servicesData);
    return data;
  },

  update: async (id: string, servicesData: Partial<Service>) => {
    const { data } = await api.put(`/services/${id}`, servicesData);
    return data;
  },

  delete: async (id: string) => {
    const { data } = await api.delete(`/services/${id}`);
    return data;
  },
};
