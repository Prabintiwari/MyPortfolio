import fs from "fs";
import path from "path";

// Upload file to specified directory
export const fileUpload = (
  file: Express.Multer.File,
  subDirectory?: string,
): string => {
  try {
    const uploadFolder = `uploads/${subDirectory ? subDirectory + "/" : ""}`;

    // Create directory if not exists
    if (!fs.existsSync(uploadFolder)) {
      fs.mkdirSync(uploadFolder, { recursive: true });
    }

    const timestamp = Date.now();
    const random = Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const nameWithoutExt = path.basename(file.originalname, ext);
    const fileName = `${nameWithoutExt}-${timestamp}-${random}${ext}`;

    const filePath = path.join(uploadFolder, fileName);

    fs.writeFileSync(filePath, file.buffer);

    const finalPath = `/${uploadFolder}${fileName}`;
    console.log("File uploaded:", finalPath);

    return finalPath;
  } catch (error) {
    console.error("File upload error:", error);
    throw new Error("File upload failed!");
  }
};

// Delete file from disk
export const deleteFile = (filePath: string): void => {
  try {
    const cleanPath = filePath.startsWith("/")
      ? filePath.substring(1)
      : filePath;

    if (fs.existsSync(cleanPath)) {
      fs.unlinkSync(cleanPath);
      console.log("File deleted:", cleanPath);
    } else {
      console.log("File not found:", cleanPath);
    }
  } catch (error) {
    console.error("Delete file error:", error);
    throw new Error("File deletion failed!");
  }
};

// Validate file type
export const validateFileType = (
  file: Express.Multer.File,
  allowedTypes: string[],
): boolean => {
  return allowedTypes.includes(file.mimetype);
};

// Validate file size
export const validateFileSize = (
  file: Express.Multer.File,
  maxSizeMB: number,
): boolean => {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxSizeBytes;
};
