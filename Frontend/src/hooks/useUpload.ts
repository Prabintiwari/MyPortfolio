import { useEffect, useState } from "react";
import { uploadService } from "../services/uploadService";

interface PortfolioFiles {
  avatar: string | null;
  logo: string | null;
  resume: string | null;
}

export const useUpload = () => {
  const [files, setFiles] = useState<PortfolioFiles>({
    avatar: null,
    logo: null,
    resume: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      setLoading(true);
      const data = await uploadService.getAll();
      setFiles(data.data);
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch files";
      setError(message);
      console.error("Failed to fetch files:", error);
    } finally {
      setLoading(false);
    }
  };

  return { files, loading, error };
};
