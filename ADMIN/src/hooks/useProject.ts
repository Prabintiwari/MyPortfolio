import { useEffect, useState } from "react";
import type {  Project } from "../types/project.types";
import { projectService } from "../services/projectService";

export const useProject = () => {
  const [filter, setFilter] = useState("all");

  const [categories, setCategories] = useState([
    { id: "all", label: "All Projects" },
  ]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [formData, setFormData] = useState({
      title: "",
      description: "",
      category: "",
      tags: "",
      liveDemo: "",
      github: "",
      featured: false,
      order: 0,
      date: new Date().toISOString().split("T")[0],
    });

  useEffect(() => {
    const fetchCategories = async () => {
      setError("");
      try {
        const data = await projectService.getCategories();
        setCategories(data.data);
      } catch (error: any) {
        setError(error.response?.data?.message);
        console.error(
          "Categories fetch failed:",
          error.response?.data?.message,
        );
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      setError("");
      setLoading(true);
      try {
        const data = await projectService.getAll({
          ...(filter === "all" ? {} : { category: filter }),
          isActive: true,
        });
        setProjects(data.data.projects);
      } catch (error: any) {
        const message =
          error.response?.data?.message ||
          error.message ||
          "Failed to load services";
        setError(message);
        console.error("Projects fetch failed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [filter]);

  return { projects, categories, error, loading, filter, setFilter };
};
