import { Router } from "express";
import {
  createSocialLinks,
  deletesocialLink,
  getAllSocialLinks,
  getSocialLinkById,
  updateSocialLinks,
} from "../controller/socialLinks.controller";

const router = Router();

router.post("/", createSocialLinks);

router.put("/:socialLinkId", updateSocialLinks);

router.get("/", getAllSocialLinks);

router.get("/:socialLinkId", getSocialLinkById);

router.delete("/:socialLinkId", deletesocialLink);

export default router;
