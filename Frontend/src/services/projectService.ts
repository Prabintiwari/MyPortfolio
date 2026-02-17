import { Project, ProjectQuery } from "../types/project.types";
import api from "./api";

export const projectService = {
  getAll: async (params?: ProjectQuery) => {
    const { data } = await api.get("/projects", { params });
    return data.data;
  },

  getById: async (id: string) => {
    const { data } = await api.get(`/projects/${id}`);
    return data.data;
  },

  getCategories: async () => {
    const { data } = await api.get("/projects/categories");
    return data.data;
  },

  create: async (projectData: Project) => {
    const { data } = await api.post("/projects", projectData);
    return data.data;
  },

  update: async (id: string, projectData: Partial<Project>) => {
    const { data } = await api.put(`/projects/${id}`, projectData);
    return data.data;
  },

  delete: async (id: string) => {
    const { data } = await api.delete(`/projects/${id}`);
    return data;
  },
};
