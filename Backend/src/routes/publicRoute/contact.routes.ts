import { Router } from "express";
import { createContact,  } from "../../controller/contact.controller";

const router = Router();

router.post("/", createContact);

export default router;
