import { useEffect, useState } from "react";
import type { Contact } from "../types/contact.types";
import { contactService } from "../services/contactService";

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
      const { data } = await contactService.getAll();
      setContacts(data.data?.contacts);
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to mark as read";
      setError(message);
      console.error("Failed to mark as read:", error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (contactId: string) => {
    try {
        await contactService.markAsRead(contactId)
      fetchContacts();
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to mark as read";
      setError(message);
      console.error("Failed to mark as read:", error);
    }
  };

  const handleDelete = async (contactId: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;

    try {
        await contactService.delete(contactId)
      fetchContacts();
      setSelectedContact(null);
    } catch (error: any) {
      const message =
        error.response?.data?.message || error.message || "Delete failed";
      setError(message);
      console.error("Delete failed:", error);
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
