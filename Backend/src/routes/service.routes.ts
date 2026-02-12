import { Router } from "express";
import { AdminOnly, authenticateToken } from "../middleware/auth";
import {
  createService,
  deleteService,
  getAllServices,
  getServiceById,
  updateService,
} from "../controller/service.controller";

const router = Router();

router.use(authenticateToken);
router.use(AdminOnly);

router.post("/", createService);

router.post("/:serviceId", updateService);

router.get("/", getAllServices);

router.get("/:serviceId", getServiceById);

router.delete("/:serviceId", deleteService);

export default router;
