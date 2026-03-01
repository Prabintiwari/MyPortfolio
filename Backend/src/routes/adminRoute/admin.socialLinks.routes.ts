import { Router } from "express";
import {
  createSocialLinks,
  deletesocialLink,
  updateSocialLinks,
} from "../../controller/socialLinks.controller";

import { AdminOnly, authenticateToken } from "../../middleware/auth";

const router = Router();

router.use(authenticateToken, AdminOnly);

router.post("/", createSocialLinks);

router.put("/:socialLinkId", updateSocialLinks);

router.delete("/:socialLinkId", deletesocialLink);

export default router;
