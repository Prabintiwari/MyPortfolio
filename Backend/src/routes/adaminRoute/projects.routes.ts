import { Router } from "express";
import {
  createProject,
  deleteProject,
  getAllProjects,
  getProjectById,
  getProjectCategories,
  updateProject,
} from "../../controller/project.controller";
import { uploadProjectImage } from "../../middleware/uploadFile";

import { AdminOnly, authenticateToken } from "../../middleware/auth";

const router = Router();

router.use(authenticateToken, AdminOnly);

router.post("/", uploadProjectImage.single("image"), createProject);

router.put("/:projectId", updateProject);

router.delete("/:projectId", deleteProject);

export default router;
