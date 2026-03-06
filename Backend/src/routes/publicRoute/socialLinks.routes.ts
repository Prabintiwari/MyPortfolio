import { Router } from "express";
import {
  getAllSocialLinks,
  getSocialLinkById,
} from "../../controller/socialLinks.controller";

const router = Router();


router.get("/", getAllSocialLinks);

router.get("/:socialLinkId", getSocialLinkById);


export default router;
