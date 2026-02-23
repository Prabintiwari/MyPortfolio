import { useEffect, useState } from "react";
import { Skill } from "../types/skill.types";
import { skillService } from "../services/skillService";

export const useAbout = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [aboutLoading, setAboutLoading] = useState(true);
  const [aboutError, setAboutError] = useState("");

  useEffect(() => {
    const fetchskills = async () => {
      setAboutError("");
      setAboutLoading(true);
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
        setAboutError(message);
        console.error("Skills fetch failed:", error);
      } finally {
        setAboutLoading(false);
      }
    };

    fetchskills();
  }, []);

  return { skills, aboutLoading, aboutError };
};
