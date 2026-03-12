import { useState, useEffect } from "react";
import type { ContactMethod } from "../types/contactMethod.types";
import { contactMethodService } from "../services/contactMethodService";
import { ColorVariant } from "../types/theme.types";

export const useContactMethods = () => {
  const [contactMethods, setContactMethods] = useState<ContactMethod[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingMethod, setEditingMethod] = useState<ContactMethod | null>(
    null,
  );
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    value: "",
    icon: "Phone",
    order: 0,
    variant: ColorVariant.PRIMARY,
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
        await contactMethodService.update(editingMethod.id,formData)
      } else {
        await contactMethodService.create(formData)
      }
      fetchContactMethods();
      resetForm();
      setShowModal(false);
    } catch (error: any) {
      const message =
        error.response?.data?.message || error.message || "Operation failed";
      setError(message);
      console.error("Operation failed:", error);
    }
  };

  const handleEdit = (method: ContactMethod) => {
    setEditingMethod(method);
    setFormData({
      title: method.title,
      description: method.description,
      value: method.value,
      icon: method.icon || "Phone",
      variant: method.variant || ColorVariant.PRIMARY,
      order: method.order,
    });
    setShowModal(true);
  };

  const handleDelete = async (methodId: string) => {
    if (!confirm("Are you sure you want to delete this contact method?"))
      return;

    try {
      await contactMethodService.delete(methodId)
      fetchContactMethods();
    } catch (error: any) {
      const message =
        error.response?.data?.message || error.message || "Delete failed";
      setError(message);
      console.error("Delete failed:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      value: "",
      icon: "Phone",
      order: 0,
      variant: ColorVariant.PRIMARY,
    });
    setEditingMethod(null);
  };

  return {
    contactMethods,
    loading,
    error,
    formData,
    setFormData,
    showModal,
    setShowModal,
    editingMethod,
    handleSubmit,
    handleEdit,
    handleDelete,
    resetForm,
  };
};
