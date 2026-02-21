import { useEffect, useState } from "react";
import { Project } from "../types/project.types";
import { projectService } from "../services/projectService";
import { SocialLinks } from "../types/socialLinks.types";
import { socialLinksService } from "../services/socialLinksServices";

export const useSocialLink = () => {
  const [socialLinks, setSocialLinks] = useState<SocialLinks[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchsocialLinks = async () => {
      setError("");
      setLoading(true);
      try {
        const data = await socialLinksService.getAll({
          isActive: true,
        });
        setSocialLinks(data.data.socialLinks);
      } catch (error: any) {
        const message =
          error.response?.data?.message ||
          error.message ||
          "Failed to load services";
        setError(message);
        console.error("Projects fetch failed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchsocialLinks();
  }, []);

  return { socialLinks, error, loading };
};
