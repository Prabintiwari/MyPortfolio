import { useEffect, useState } from "react";
import { serviceService } from "../services/serviceService";
import type { Service } from "../types/service.types";

export const useService = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    features: "",
    icon: "",
    order: 0,
    isActive: true,
  });

  const fetchServices = async () => {
    setError("");
    setLoading(true);
    try {
      const data = await serviceService.getAll();

      setServices(data.data.services);
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to load services";
      setError(message);
      console.error("Services fetch failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const dataToSend = {
        title: formData.title,
        description: formData.description,
        icon: formData.icon,
        features: formData.features
          .split(",")
          .map((f) => f.trim())
          .filter((f) => f),
        order: formData.order,
        isActive: formData.isActive,
      };

      if (editingService) {
        await serviceService.update(editingService.id, dataToSend);
      } else {
        await serviceService.create(dataToSend);
      }
      fetchServices();
      resetForm();
      setShowModal(false);
    } catch (error: any) {
      setError(error.response?.data?.message || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      description: service.description,
      features: service.features.join(", "),
      icon: service.icon || "",
      order: service.order,
      isActive: service.isActive ?? true,
    });
    setShowModal(true);
  };

  const toggleStatus = async (serviceId: string) => {
    try {
      await serviceService.toggle(serviceId);
      setServices((prev) =>
        prev.map((s) =>
          s.id === serviceId ? { ...s, isActive: !s.isActive } : s,
        ),
      );
    } catch (error: any) {
      setError(error.response?.data?.message || "toggle status failed");
    }
  };

  const handleDelete = async (serviceId: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;

    try {
      await serviceService.delete(serviceId);
      fetchServices();
    } catch (error: any) {
      setError(error.response?.data?.message || "Delete failed");
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      features: "",
      icon: "",
      order: 0,
      isActive: true,
    });
    setEditingService(null);
  };

  return {
    services,
    error,
    loading,
    showModal,
    setShowModal,
    formData,
    setFormData,
    editingService,
    setEditingService,
    handleSubmit,
    handleEdit,
    toggleStatus,
    handleDelete,
    resetForm,
  };
};
