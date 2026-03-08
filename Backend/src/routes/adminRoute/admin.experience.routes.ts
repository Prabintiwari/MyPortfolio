import { Router } from "express";
import {
  createExperience,
  deleteExperience,
  toggleIsActive,
  updateExperience,
} from "../../controller/experience.controller";

import { AdminOnly, authenticateToken } from "../../middleware/auth";

const router = Router();

router.use(authenticateToken, AdminOnly);

router.post("/", createExperience);

router.put("/:experienceId", updateExperience);

router.put("/:experienceId/toggle", toggleIsActive);

router.delete("/:experienceId", deleteExperience);

export default router;
