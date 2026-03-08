import { useEffect, useState } from "react";
import type { Experience } from "../types/experience.types";
import { experienceService } from "../services/experienceService";

export const useExperience = () => {

  const [experiences, setExperience] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
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

    fetchExperience();
  }, []);

  return { experiences, error, loading };
};
