import { Router } from "express";
import {
  createContactMethod,
  deleteContactMethod,
  getAllContactMethods,
  getContactMethodById,
  updateContactMethod,
} from "../controller/contactMethod.controller";

const router = Router();

router.post("/", createContactMethod);

router.put("/:contactMethodId", updateContactMethod);

router.get("/", getAllContactMethods);

router.get("/:contactMethodId", getContactMethodById);

router.delete("/:contactMethodId", deleteContactMethod);

export default router;
