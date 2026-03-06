import { Router } from "express";
import {
  getAllServices,
  getServiceById,
} from "../../controller/service.controller";

const router = Router();



router.get("/", getAllServices);

router.get("/:serviceId", getServiceById);


export default router;
