import { Router } from "express";
import { createAbout, deleteAbout, getAbout, updateAbout } from "../controller/about.controller";

const router = Router()

router.post("/", createAbout);

router.put("/", updateAbout);

router.get("/", getAbout);

router.delete("/",deleteAbout)

export default router