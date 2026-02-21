import {  ContactMethodQuery } from "../types/contactMethod.types";
import api from "./api";

export const contactMethodService = {
  getAll: async (params?: ContactMethodQuery) => {
    const { data } = await api.get("/contact-method", { params });
    return data;
  },

  getById: async (id: string) => {
    const { data } = await api.get(`/contact-method/${id}`);
    return data;
  },

  
};
