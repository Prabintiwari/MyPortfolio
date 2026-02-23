import { useEffect, useState } from "react";
import { uploadService } from "../services/uploadService";

export const useUpload = () => {
  const [profileImage, setProfileImage] = useState<string>("");
  const [resumeUrl, setResumeUrl] = useState<string>("");
  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const files = await uploadService.getAll();

        const avatar = files.find(
          (img: any) =>
            img.filename.toLowerCase().includes("profile") ||
            img.filename.toLowerCase().includes("avatar") ||
            img.filename.toLowerCase().includes("home"),
        );
        if (avatar) setProfileImage(avatar.url);

        const resume = files.find(
          (img: any) =>
            img.filename.toLowerCase().includes("resume") ||
            img.filename.toLowerCase().includes("cv"),
        );
        if (resume) setResumeUrl(resume.url);
      } catch (error) {
        console.error("Failed to fetch assets:", error);
      }
    };

    fetchAssets();
  }, []);

  return { profileImage, resumeUrl };
};
