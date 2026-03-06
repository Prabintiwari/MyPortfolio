import { Router } from "express";
import {  getAllSkills, getSkillById,  } from "../../controller/skill.controller";

const router = Router()



router.get("/", getAllSkills);

router.get("/:skillId", getSkillById);


export default router