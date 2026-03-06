import { Router } from "express";
import {
  getPortfolio,
  getPortfolioFiles,
} from "../../controller/portfolioFiles.controller";

const router = Router();

router.get("/", getPortfolio);

router.get("/files", getPortfolioFiles);

export default router;
