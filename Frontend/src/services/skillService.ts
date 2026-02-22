import { SkillQuery } from "../types/skill.types";
import api from "./api";

export const skillService = {
  getAll: async (params?: SkillQuery) => {
    const { data } = await api.get("/social-links", { params });
    return data;
  },

  getById: async (id: string) => {
    const { data } = await api.get(`/social-links/${id}`);
    return data;
  },
};
