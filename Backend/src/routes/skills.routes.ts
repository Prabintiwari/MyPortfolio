import { Router } from "express";
import { createSkill, deleteSkill, getAllSkills, getSkillById, updateSkill } from "../controller/skill.controller";

const router = Router()

router.post("/", createSkill);

router.post("/:skillId", updateSkill);

router.get("/", getAllSkills);

router.get("/:skillId", getSkillById);

router.delete("/:skillId",deleteSkill)

export default router