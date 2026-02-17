import { Router } from "express";
import {
  createProject,
  deleteProject,
  getAllProjects,
  getProjectById,
  getProjectCategories,
  updateProject,
} from "../controller/project.controller";

const router = Router();

router.post("/", createProject);

router.get('/categories', getProjectCategories);

router.get("/", getAllProjects);

router.get("/:projectId", getProjectById);

router.put("/:projectId", updateProject);

router.delete("/:projectId",deleteProject)

export default router;
