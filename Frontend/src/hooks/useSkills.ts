import { useEffect, useState } from "react";
import { Skill } from "../types/skill.types";
import { skillService } from "../services/skillService";

export const useSkill = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchskills = async () => {
      setError("");
      setLoading(true);
      try {
        const data = await skillService.getAll({
          isActive: true,
        });
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

    fetchskills();
  }, []);

  return { skills, error, loading };
};
