import { Router } from "express";
import {
  createAbout,
  deleteAbout,
  getAbout,
  updateAbout,
} from "../../controller/about.controller";
import { AdminOnly, authenticateToken } from "../../middleware/auth";

const router = Router();

router.use(authenticateToken, AdminOnly);

router.post("/", createAbout);

router.put("/", updateAbout);

router.delete("/", deleteAbout);

export default router;
