import { useEffect, useState } from "react";
import type { About } from "../types/about.types";
import { aboutService } from "../services/aboutSevice";

export const useAbout = () => {
  const [about, setAbout] = useState<About>();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [viewMode, setViewMode] = useState<"view" | "edit" | "create">("view");

  useEffect(() => {
    const fetchAbout = async () => {
      setError("");
      setLoading(true);
      try {
        const data = await aboutService.get();
        setAbout(data.data.about);
      } catch (error: any) {
        const message =
          error.response?.data?.message ||
          error.message ||
          "Failed to load services";
        setError(message);
        console.error("About data fetch failed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
  }, []);

  return { about, loading, error,saving,setSaving,success,setSuccess,viewMode,setViewMode };
};
