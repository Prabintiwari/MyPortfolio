import { Project, ProjectQuery } from "../types/project.types";
import api from "./api";

export const projectService = {
  getAll: async (params?: ProjectQuery) => {
    const { data } = await api.get("/projects", { params });
    return data;
  },

  getById: async (id: string) => {
    const { data } = await api.get(`/projects/${id}`);
    return data;
  },

  getCategories: async () => {
    const { data } = await api.get("/projects/categories");
    return data;
  },
};
