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
  const [uploading, setUploading] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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

  const handleUpload = async (
    fileType: "avatar" | "logo" | "resume",
    file: File,
  ) => {
    setError("");
    setSuccess("");
    setUploading(fileType);

    try {
      const formData = new FormData();
      formData.append(fileType, file);

      await uploadService.upsert(formData);

      setSuccess(
        `${fileType.charAt(0).toUpperCase() + fileType.slice(1)} uploaded successfully`,
      );
      setTimeout(() => {
        setSuccess("");
      }, 5000);
      fetchFiles();
    } catch (error: any) {
      const message =
        error.response?.data?.message || error.message || "Upload failed";
      setError(message);
      console.error("Upload failed:", error);
    } finally {
      setUploading(null);
    }
  };

  const handleDelete = async (fileType: "avatar" | "logo" | "resume") => {
    if (!confirm(`Are you sure you want to delete the ${fileType}?`)) return;

    try {
        await uploadService.delete(fileType)
      setSuccess(
        `${fileType.charAt(0).toUpperCase() + fileType.slice(1)} deleted successfully`,
      );
      setTimeout(() => {
        setSuccess("");
      }, 5000);
      fetchFiles();
    } catch (error: any) {
      setError(error.response?.data?.message || "Delete failed");
    }
  };

  return {
    files,
    loading,
    success,
    setSuccess,
    error,
    handleUpload,
    handleDelete,
    uploading,
  };
};
