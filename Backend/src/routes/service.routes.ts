import { Router } from "express";
import {
  createService,
  deleteService,
  getAllServices,
  getServiceById,
  updateService,
} from "../controller/service.controller";

const router = Router();


router.post("/", createService);

router.post("/:serviceId", updateService);

router.get("/", getAllServices);

router.get("/:serviceId", getServiceById);

router.delete("/:serviceId", deleteService);

export default router;
