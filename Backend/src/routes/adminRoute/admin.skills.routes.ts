import { Router } from "express";
import { createSkill, deleteSkill,  updateSkill } from "../../controller/skill.controller";

import { AdminOnly, authenticateToken } from "../../middleware/auth";

const router = Router();

router.use(authenticateToken, AdminOnly);

router.post("/", createSkill);

router.put("/:skillId", updateSkill);

router.delete("/:skillId",deleteSkill)

export default router