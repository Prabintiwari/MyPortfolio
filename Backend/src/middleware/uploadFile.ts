import multer from "multer";
import { Request } from "express";
import { validateFileType } from "../config/upload";

const storage = multer.memoryStorage();

export const uploadProjectImage = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req: Request, file, cb) => {
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only images allowed."));
    }
  },
}).single("projectImage");

export const uploadPortfolioFiles = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
  fileFilter: (req: Request, file: Express.Multer.File, cb: any) => {
    const imageTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
      "image/svg+xml",
    ];
    const pdfTypes = ["application/pdf"];

    // Avatar & Logo: Images only
    if (file.fieldname === "avatar" || file.fieldname === "logo") {
      if (validateFileType(file, imageTypes)) {
        cb(null, true);
      } else {
        cb(new Error("Invalid file type. Only images allowed."), false);
      }
    }
    // Resume: PDF only
    else if (file.fieldname === "resume") {
      if (validateFileType(file, pdfTypes)) {
        cb(null, true);
      } else {
        cb(new Error("Invalid file type. Only PDF allowed for resume."), false);
      }
    } else {
      cb(null, true);
    }
  },
});
