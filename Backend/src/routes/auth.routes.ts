import { Router } from "express";
import { authenticateToken } from "../middleware/auth";
import { getCurrentUser, login } from "../controller/auth.controller";

const router = Router();

router.post("/login", login);

router.get("/me", authenticateToken, getCurrentUser);

export default router;
