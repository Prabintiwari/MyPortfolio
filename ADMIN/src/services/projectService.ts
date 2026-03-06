import type { CreateProject, ProjectQuery, UpdateProject } from '../types/project.types';
import api from './api';

export const projectService = {
  getAll: async (params?: ProjectQuery) => {
    const { data } = await api.get('/projects', { params });
    return data;
  },

  getCategories: async () => {
    const { data } = await api.get('/projects/categories');
    return data;
  },

  getById: async (id: string) => {
    const { data } = await api.get(`/projects/${id}`);
    return data;
  },

  create: async (projectData: CreateProject) => {
    const { data } = await api.post('/projects', projectData);
    return data;
  },

  update: async (id: string, projectData: UpdateProject) => {
    const { data } = await api.put(`/projects/${id}`, projectData);
    return data;
  },

  delete: async (id: string) => {
    const { data } = await api.delete(`/projects/${id}`);
    return data;
  },
};