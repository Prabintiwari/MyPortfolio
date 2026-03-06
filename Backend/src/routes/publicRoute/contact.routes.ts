import { Router } from "express";
import { getAllContacts } from "../../controller/contact.controller";

const router = Router();

router.get("/", getAllContacts);

export default router;
