import { ExperienceQuery } from "../types/experience.types";
import api from "./api";

export const experienceService = {
  getAll: async (params?: ExperienceQuery) => {
    const { data } = await api.get("/experiences", { params });
    return data;
  },

  getById: async (id: string) => {
    const { data } = await api.get(`/experiences/${id}`);
    return data;
  },
};
