import { Router } from "express";
import {
  uploadPortfolioFiles,
} from "../../middleware/uploadFile";
import { deletePortfolioFile,  upsertPortfolio } from "../../controller/portfolioFiles.controller";
import { AdminOnly, authenticateToken } from "../../middleware/auth";

const router = Router();

router.use(authenticateToken, AdminOnly);

router.post(
  "/",
  uploadPortfolioFiles.fields([
    { name: "avatar", maxCount: 1 },
    { name: "logo", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  upsertPortfolio,
);


router.delete(
  '/:fileType',
  deletePortfolioFile
);


export default router;
