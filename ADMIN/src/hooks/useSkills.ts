import { useEffect, useState } from "react";
import type { Skill } from "../types/skills.types";
import { skillService } from "../services/skillService";
import { ColorVariant } from "../types/theme.types";

export const useSkill = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    level: 50,
    category: "",
    icon: "",
    order: 0,
    variant: ColorVariant.PRIMARY,
  });

  const fetchskills = async () => {
    setError("");
    setLoading(true);
    try {
      const data = await skillService.getAll();
      setSkills(data.data.skills);
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to load services";
      setError(message);
      console.error("Skills fetch failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchskills();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      if (editingSkill) {
        await skillService.update(editingSkill.id, formData);
      } else {
        await skillService.create(formData);
      }
      fetchskills();
      resetForm();
      setShowModal(false);
    } catch (error: any) {
      setError(error.response?.data?.message || "Operation failed");
    }
  };

  const toggleStatus = async (id: string) => {
    try {
      await skillService.toggle(id);
      fetchskills();
    } catch (error: any) {
      setError(error.response?.data?.message || "Operation failed");
    }
  };

  const handleEdit = (skill: Skill) => {
    setEditingSkill(skill);
    setFormData({
      name: skill.name,
      level: skill.level,
      category: skill.category,
      icon: skill.icon || "",
      order: skill.order || 0,
      variant: skill.variant || ColorVariant.PRIMARY,
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this skill?")) return;

    try {
      await skillService.delete(id);
      fetchskills();
    } catch (error: any) {
      setError(error.response?.data?.message || "Delete failed");
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      level: 50,
      category: "",
      icon: "",
      order: 0,
      variant: "" as ColorVariant,
    });
    setEditingSkill(null);
  };

  return {
    skills,
    fetchskills,
    loading,
    error,
    formData,
    setFormData,
    showModal,
    setShowModal,
    editingSkill,
    setEditingSkill,
    handleSubmit,
    handleEdit,
    toggleStatus,
    handleDelete,
    resetForm,
  };
};
