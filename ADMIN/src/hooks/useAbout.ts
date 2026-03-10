import { useEffect, useState } from "react";
import type { About } from "../types/about.types";
import { aboutService } from "../services/aboutSevice";

export const useAbout = () => {
  const [about, setAbout] = useState<About | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [viewMode, setViewMode] = useState<"view" | "edit" | "create">("view");
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    subtitle: "",
    bio: "",
    description: "",
    yearsExperience: 0,
    projectsCompleted: 0,
    openSource: 0,
    globalReachText: "",
  });

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    try {
      setLoading(true);
      const data = await aboutService.get()

      if (data.data.about) {
        setAbout(data.data.about);
        setViewMode("view");
      } else {
        setViewMode("create");
      }
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "About not found, showing create form";
      setError(message);
      console.log("About not found, showing create form");
      setViewMode("create");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    if (about) {
      setFormData({
        name: about.name,
        title: about.title,
        subtitle: about.subtitle || "",
        bio: about.bio,
        description: about.description || "",
        yearsExperience: about.yearsExperience,
        projectsCompleted: about.projectsCompleted,
        openSource: about.openSource,
        globalReachText: about.globalReachText || "",
      });
      setViewMode("edit");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);

    try {
      if (viewMode === "create") {
        await aboutService.create(formData);
        setSuccess("About section created successfully");
        setTimeout(() => {
          setSuccess("");
        }, 5000);
      } else {
        await aboutService.update(formData);
        setSuccess("About section updated successfully");
        setTimeout(() => {
          setSuccess("");
        }, 5000);
      }

      fetchAbout();
      setViewMode("view");
    } catch (error: any) {
      const message =
        error.response?.data?.message || error.message || "Operation failed";
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (
      !confirm(
        "Are you sure you want to delete the about section? This action cannot be undone.",
      )
    ) {
      return;
    }

    try {
      await aboutService.delete()
      setSuccess("About section deleted successfully");
      setAbout(null);
      setViewMode("create");
    } catch (error: any) {
      const message =
        error.response?.data?.message || error.message || "Delete failed";
      setError(message);
    }
  };

  const cancelEdit = () => {
    setViewMode("view");
    setFormData({
      name: "",
      title: "",
      subtitle: "",
      bio: "",
      description: "",
      yearsExperience: 0,
      projectsCompleted: 0,
      openSource: 0,
      globalReachText: "",
    });
  };

  return {
    about,
    loading,
    error,
    saving,
    success,
    viewMode,
    setViewMode,
    formData,
    setFormData,
    handleSubmit,
    handleEdit,
    handleDelete,
    cancelEdit,
  };
};
