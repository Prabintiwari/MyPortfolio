import { Router } from "express";
import {
  uploadPortfolioFiles,
} from "../../middleware/uploadFile";
import { deletePortfolioFile, getPortfolio, getPortfolioFiles, upsertPortfolio } from "../../controller/portfolioFiles.controller";

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

router.get("/",getPortfolio)

router.get('/files', getPortfolioFiles);

router.delete(
  '/:fileType',
  deletePortfolioFile
);


export default router;
