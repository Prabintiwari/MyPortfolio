import { useEffect, useState } from "react";
import type { Project } from "../types/project.types";
import { projectService } from "../services/projectService";
import api from "../services/api";

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
    isFeatured: false,
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

  useEffect(() => {
    fetchProjects();
  }, [filter]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("category", formData.category);
      formDataToSend.append(
        "tags",
        JSON.stringify(
          formData.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag),
        ),
      );
      formDataToSend.append("liveDemo", formData.liveDemo);
      formDataToSend.append("github", formData.github);
      formDataToSend.append("featured", String(formData.isFeatured));
      formDataToSend.append("order", String(formData.order));
      formDataToSend.append("date", formData.date);

      if (imageFile) {
        formDataToSend.append("image", imageFile);
      }

      if (editingProject) {
        await api.put(`/projects/${editingProject.id}`, formDataToSend);
      } else {
        await api.post("/projects", formDataToSend);
      }

      fetchProjects();
      resetForm();
      setShowModal(false);
    } catch (error: any) {
      setError(error.response?.data?.message || "Operation failed");
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project?.title,
      description: project.description,
      category: project.category,
      tags: project.tags.join(", "),
      liveDemo: project.liveDemo || "",
      github: project.github || "",
      isFeatured: project.isFeatured,
      order: project.order,
      date: project.date,
    });
    setShowModal(true);
  };

  useEffect(() => {
    console.log("formData updated:", formData);
  }, [formData]);

  const handleDelete = async (projectId: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      await api.delete(`/projects/${projectId}`);
       fetchProjects();
    } catch (error: any) {
      setError(error.response?.data?.message || "Delete failed");
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "",
      tags: "",
      liveDemo: "",
      github: "",
      isFeatured: false,
      order: 0,
      date: new Date().toISOString().split("T")[0],
    });
    setEditingProject(null);
    setImageFile(null);
  };

  return {
    projects,
    categories,
    error,
    loading,
    filter,
    setFilter,
    handleSubmit,
    handleDelete,
    handleEdit,
    resetForm,
    showModal,
    editingProject,
    imageFile,
    setImageFile,
    formData,
    setFormData,
    setShowModal,
  };
};
