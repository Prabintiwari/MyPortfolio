import { useEffect, useState } from "react";
import api from "../services/api";

interface Contact {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export const useContact = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [filter, setFilter] = useState<"all" | "read" | "unread">("all");

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/admin/contacts");
      setContacts(data.data?.contacts || data.data || []);
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to fetch contacts");
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      await api.put(`/admin/contacts/${id}`, { isRead: true });
      fetchContacts();
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to mark as read");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;

    try {
      await api.delete(`/contacts/${id}`);
      fetchContacts();
      setSelectedContact(null);
    } catch (error: any) {
      setError(error.response?.data?.message || "Delete failed");
    }
  };

  const handleView = (contact: Contact) => {
    setSelectedContact(contact);
    if (!contact.isRead) {
      markAsRead(contact.id);
    }
  };

  const filteredContacts = contacts.filter((contact) => {
    if (filter === "read") return contact.isRead;
    if (filter === "unread") return !contact.isRead;
    return true;
  });

  const unreadCount = contacts.filter((c) => !c.isRead).length;

  return {
    contacts,
    loading,
    error,
    selectedContact,
    filter,
    setFilter,
    markAsRead,
    handleDelete,
    handleView,
    filteredContacts,
    unreadCount,
  };
};
