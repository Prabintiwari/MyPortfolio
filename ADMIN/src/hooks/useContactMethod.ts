
import { useState, useEffect } from "react";
import type { ContactMethod } from "../types/contactMethod.types";
import { contactMethodService } from "../services/contactMethodService";

export const useContactMethods = () => {
  const [contactMethods, setContactMethods] = useState<ContactMethod[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
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

    fetchContactMethods();
  }, []);

  const refetch = () => {
    setLoading(true);
    setError("");
  };

  return {
    contactMethods,
    loading,
    error,
    refetch,
  };
};
