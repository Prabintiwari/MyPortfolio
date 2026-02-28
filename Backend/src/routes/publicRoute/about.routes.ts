import { Router } from "express";
import { getAbout } from "../../controller/about.controller";

const router = Router();

router.get("/", getAbout);

export default router;
