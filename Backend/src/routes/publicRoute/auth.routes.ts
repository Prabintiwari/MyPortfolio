import { Router } from "express";
import { authenticateToken } from "../../middleware/auth";
import { changePassword, getCurrentUser, login } from "../../controller/auth.controller";

const router = Router();

router.post("/login", login);

router.get("/me", authenticateToken, getCurrentUser);

router.put("/password", authenticateToken, changePassword);

export default router;
