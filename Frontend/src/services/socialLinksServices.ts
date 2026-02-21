import { SocialLinks, SocialLinksQuery } from "../types/socialLinks.types";
import api from "./api";

export const socialLinksService = {
  getAll: async (params?: SocialLinksQuery) => {
    const { data } = await api.get("/social-links", { params });
    return data;
  },

  getById: async (id: string) => {
    const { data } = await api.get(`/social-links/${id}`);
    return data;
  },
};
