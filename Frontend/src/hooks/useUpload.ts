import { useEffect, useState } from "react";
import { uploadService } from "../services/uploadService";

export const useUpload = () => {
  const [profileImage, setProfileImage] = useState<string>("");
  const [resumeUrl, setResumeUrl] = useState<string>("");
  const [logoUrl, setLogoUrl] = useState<string>("");

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const res = await uploadService.getAll();
        const files = res.data;
        console.log(files);

        if (files.avatar) setProfileImage(files.avatar);
        if (files.resume) setResumeUrl(files.resume);
        if(files.logo) setLogoUrl(files.logo)
      } catch (error) {
        console.error("Failed to fetch assets:", error);
      }
    };

    fetchAssets();
  }, []);

  return { profileImage, resumeUrl,logoUrl };
};
