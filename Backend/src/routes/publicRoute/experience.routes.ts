import { Router } from "express";
import {
  getAllExperiences,
  getExperienceById,
  updateExperience,
} from "../../controller/experience.controller";

const router = Router();

router.get("/", getAllExperiences);

router.get("/:experienceId", getExperienceById);

export default router;
