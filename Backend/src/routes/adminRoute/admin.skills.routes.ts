import { Router } from "express";
import { createSkill, deleteSkill,  toggleIsActive,  updateSkill } from "../../controller/skill.controller";

import { AdminOnly, authenticateToken } from "../../middleware/auth";

const router = Router();

router.use(authenticateToken, AdminOnly);

router.post("/", createSkill);

router.put("/:skillId", updateSkill);

router.put("/:skillId/toggle", toggleIsActive);

router.delete("/:skillId",deleteSkill)

export default router