import { Router } from "express";
import { createExperience, deleteExperience, getAllExperiences, getExperienceById, updateExperience } from "../controller/experience.controller";

const router = Router()

router.post("/", createExperience);

router.post("/:experienceId", updateExperience);

router.get("/", getAllExperiences);

router.get("/:experienceId", getExperienceById);

router.delete("/:experienceId",deleteExperience)

export default router