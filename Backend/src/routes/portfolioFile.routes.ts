import { Router } from "express";
import {
  uploadPortfolioFiles,
} from "../middleware/uploadFile";
import { upsertPortfolio } from "../controller/upload.controller";

const router = Router();

router.post(
  "/",
  uploadPortfolioFiles.fields([
    { name: "avatar", maxCount: 1 },
    { name: "logo", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  upsertPortfolio,
);


export default router;
