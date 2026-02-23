import { useEffect, useState } from "react";
import { About } from "../types/about.types";
import { aboutService } from "../services/aboutSevice";

export const useAbout = () => {
  const [about, setAbout] = useState<About>();
  const [aboutLoading, setAboutLoading] = useState(true);
  const [aboutError, setAboutError] = useState("");

  useEffect(() => {
    const fetchAbout = async () => {
      setAboutError("");
      setAboutLoading(true);
      try {
        const data = await aboutService.getAbout();
        setAbout(data.data.about);
      } catch (error: any) {
        const message =
          error.response?.data?.message ||
          error.message ||
          "Failed to load services";
        setAboutError(message);
        console.error("About data fetch failed:", error);
      } finally {
        setAboutLoading(false);
      }
    };

    fetchAbout();
  }, []);

  return { about, aboutLoading, aboutError };
};
