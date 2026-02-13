import { Router } from "express";
import { AdminOnly, authenticateToken } from "../middleware/auth";
import projectsRoute from "./projects.routes";
import servicesRoute from "./service.routes";
import skillsRoute from "./skills.routes";
import experiencesRoute from "./experience.routes";

const router = Router();

router.use(authenticateToken, AdminOnly);

router.use("/projects", projectsRoute);

router.use("/services", servicesRoute);

router.use("/skills", skillsRoute);

router.use("/experiences", experiencesRoute);

export default router;
