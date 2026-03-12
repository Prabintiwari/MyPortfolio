import { useState, useEffect } from "react";
import type { ContactMethod } from "../types/contactMethod.types";
import { contactMethodService } from "../services/contactMethodService";
import api from "../services/api";

export const useContactMethods = () => {
  const [contactMethods, setContactMethods] = useState<ContactMethod[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingMethod, setEditingMethod] = useState<ContactMethod | null>(
    null,
  );
  const [formData, setFormData] = useState({
    type: "",
    value: "",
    icon: "Phone",
    order: 0,
  });

  const fetchContactMethods = async () => {
    setError("");
    setLoading(true);
    try {
      const data = await contactMethodService.getAll();
      setContactMethods(data.data.contactMethods);
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to load contact methods";
      setError(message);
      console.error("Contact methods fetch failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContactMethods();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      if (editingMethod) {
        await api.put(`/contact-methods/${editingMethod.id}`, formData);
      } else {
        await api.post("/contact-methods", formData);
      }
      fetchContactMethods();
      resetForm();
      setShowModal(false);
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Operation failed";
      setError(message);
      console.error("Operation failed:", error);
    }
  };

  const handleEdit = (method: ContactMethod) => {
    setEditingMethod(method);
    setFormData({
      type: method.type,
      value: method.value,
      icon: method.icon || "Phone",
      order: method.order,
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this contact method?"))
      return;

    try {
      await api.delete(`/contact-methods/${id}`);
      fetchContactMethods();
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Delete failed";
      setError(message);
      console.error("Delete failed:", error);
    }
  };

  const resetForm = () => {
    setFormData({ type: "", value: "", icon: "Phone", order: 0 });
    setEditingMethod(null);
  };

  const refetch = () => {
    setLoading(true);
    setError("");
  };

  return {
    contactMethods,
    loading,
    error,
    refetch,
    showModal,
    setShowModal,
    handleSubmit,
    handleEdit,
    handleDelete,
    resetForm,
  };
};
