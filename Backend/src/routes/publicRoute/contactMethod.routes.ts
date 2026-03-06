import { Router } from "express";
import {
  getAllContactMethods,
  getContactMethodById,
} from "../../controller/contactMethod.controller";

const router = Router();

router.get("/", getAllContactMethods);

router.get("/:contactMethodId", getContactMethodById);

export default router;
