import { Router } from "express";
import {
  createService,
  deleteService,
  toggleIsActive,
  updateService,
} from "../../controller/service.controller";

import { AdminOnly, authenticateToken } from "../../middleware/auth";

const router = Router();

router.use(authenticateToken, AdminOnly);

router.post("/", createService);

router.put("/:serviceId", updateService);

router.put("/:serviceId/toggle", toggleIsActive);

router.delete("/:serviceId", deleteService);

export default router;
