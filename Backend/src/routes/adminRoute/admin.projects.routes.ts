import { Router } from "express";
import {
  createProject,
  deleteProject,
  toggleIsActive,
  updateProject,
} from "../../controller/project.controller";
import { uploadProjectImage } from "../../middleware/uploadFile";

import { AdminOnly, authenticateToken } from "../../middleware/auth";

const router = Router();

router.use(authenticateToken, AdminOnly);

router.post("/", uploadProjectImage.single("image"), createProject);

router.put("/:projectId", uploadProjectImage.single("image"), updateProject);

router.put("/:projectId/toggle", toggleIsActive);

router.delete("/:projectId", deleteProject);

export default router;
