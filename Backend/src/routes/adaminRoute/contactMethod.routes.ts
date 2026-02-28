import { Router } from "express";
import {
  createContactMethod,
  deleteContactMethod,
  updateContactMethod,
} from "../../controller/contactMethod.controller";
import { AdminOnly, authenticateToken } from "../../middleware/auth";

const router = Router();

router.use(authenticateToken, AdminOnly);

router.post("/", createContactMethod);

router.put("/:contactMethodId", updateContactMethod);

router.delete("/:contactMethodId", deleteContactMethod);

export default router;
