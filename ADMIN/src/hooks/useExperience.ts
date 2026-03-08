import { useEffect, useState } from "react";
import type { Experience } from "../types/experience.types";
import { experienceService } from "../services/experienceService";

export const useExperience = () => {
  const [experiences, setExperience] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(
    null,
  );
  const [formData, setFormData] = useState({
    company: "",
    position: "",
    description: "",
    startDate: "",
    endDate: "",
    current: false,
    location: "",
  });

  const fetchExperience = async () => {
    setError("");
    setLoading(true);
    try {
      const data = await experienceService.getAll();
      setExperience(data.data.experiences);
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to load services";
      setError(message);
      console.error("Experience fetch failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperience();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const payload = {
        ...formData,
        endDate: formData.current ? null : formData.endDate,
      };

      if (editingExperience) {
        await experienceService.update(editingExperience.id, payload);
      } else {
        await experienceService.create(payload);
      }
      fetchExperience();
      resetForm();
      setShowModal(false);
    } catch (error: any) {
      setError(error.response?.data?.message || "Operation failed");
    }
  };

  const handleEdit = (experience: Experience) => {
    setEditingExperience(experience);
    setFormData({
      company: experience.company,
      position: experience.position,
      description: experience.description,
      startDate: experience.startDate,
      endDate: experience.endDate || "",
      current: experience.current,
      location: experience.location || "",
    });
    setShowModal(true);
  };

  const toggleStatus = async (experienceId: string) => {
    try {
      await experienceService.toggle(experienceId);
      fetchExperience();
    } catch (error: any) {
      setError(error.response?.data?.message || "toggle status failed");
    }
  };

  const handleDelete = async (experienceId: string) => {
    if (!confirm("Are you sure you want to delete this experience?")) return;

    try {
      await experienceService.delete(experienceId);
      fetchExperience();
    } catch (error: any) {
      setError(error.response?.data?.message || "Delete failed");
    }
  };

  const resetForm = () => {
    setFormData({
      company: "",
      position: "",
      description: "",
      startDate: "",
      endDate: "",
      current: false,
      location: "",
    });
    setEditingExperience(null);
  };

  return {
    experiences,
    error,
    loading,
    showModal,
    setShowModal,
    formData,
    setFormData,
    editingExperience,
    setEditingExperience,
    handleSubmit,
    toggleStatus,
    handleEdit,
    handleDelete,
    resetForm,
  };
};
