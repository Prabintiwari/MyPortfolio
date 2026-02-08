import { Router } from "express";
import {
  createProject,
  deleteProject,
  getAllProjects,
  getProjectById,
  updateProject,
} from "../controller/project.controller";
import { AdminOnly, authenticateToken } from "../middleware/auth";

const router = Router();

router.use(authenticateToken);
router.use(AdminOnly);

router.post("/", createProject);

router.post("/:projectId", updateProject);

router.get("/", getAllProjects);

router.get("/:projectId", getProjectById);

router.delete("/:projectId",deleteProject)

export default router;
