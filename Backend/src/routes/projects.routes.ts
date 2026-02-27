import { Router } from "express";
import {
  createProject,
  deleteProject,
  getAllProjects,
  getProjectById,
  getProjectCategories,
  updateProject,
} from "../controller/project.controller";
import { uploadProjectImage } from "../middleware/uploadFile";

const router = Router();

router.post("/", uploadProjectImage.single("image"), createProject);

router.get("/categories", getProjectCategories);

router.get("/", getAllProjects);

router.get("/:projectId", getProjectById);

router.put("/:projectId", updateProject);

router.delete("/:projectId", deleteProject);

export default router;
