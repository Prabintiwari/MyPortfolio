import { Router } from "express";
import {
  createProject,
  deleteProject,
  getAllProjects,
  getProjectById,
  updateProject,
} from "../controller/project.controller";

const router = Router();

router.post("/", createProject);

router.put("/:projectId", updateProject);

router.get("/", getAllProjects);

router.get("/:projectId", getProjectById);

router.delete("/:projectId",deleteProject)

export default router;
