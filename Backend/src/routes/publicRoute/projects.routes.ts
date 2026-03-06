import { Router } from "express";
import {
  getAllProjects,
  getProjectById,
  getProjectCategories,
} from "../../controller/project.controller";

const router = Router();

router.get("/categories", getProjectCategories);

router.get("/", getAllProjects);

router.get("/:projectId", getProjectById);


export default router;
