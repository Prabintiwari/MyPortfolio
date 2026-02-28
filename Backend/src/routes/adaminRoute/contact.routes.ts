import { Router } from "express";
import {
  createContact,
  deleteContact,
  getAllContacts,
  markAsRead,
} from "../../controller/contact.controller";

import { AdminOnly, authenticateToken } from "../../middleware/auth";

const router = Router();

router.use(authenticateToken, AdminOnly);

router.post("/", createContact);

router.put("/:contactId", markAsRead);

router.delete("/:contactId", deleteContact);

export default router;
