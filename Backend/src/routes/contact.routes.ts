import { Router } from "express";
import {
  createContact,
  deleteContact,
  getAllContacts,
  markAsRead,
} from "../controller/contact.controller";

const router = Router();

router.post("/", createContact);

router.put("/:contactId", markAsRead);

router.get("/", getAllContacts);

router.delete("/:contactId", deleteContact);

export default router;
