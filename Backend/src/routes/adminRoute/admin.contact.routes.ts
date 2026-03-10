import { Router } from "express";
import {
  deleteContact,
  getAllContacts,
  markAsRead,
} from "../../controller/contact.controller";

import { AdminOnly, authenticateToken } from "../../middleware/auth";

const router = Router();

router.use(authenticateToken, AdminOnly);

router.get("/", getAllContacts);

router.put("/:contactId", markAsRead);

router.delete("/:contactId", deleteContact);

export default router;
