import { Router } from "express";
import { AdminOnly, authenticateToken } from "../middleware/auth";
import aboutRoute from "./about.routes";
import projectsRoute from "./projects.routes";
import servicesRoute from "./service.routes";
import skillsRoute from "./skills.routes";
import experiencesRoute from "./experience.routes";
import contactMethodRoute from "./contactMethod.routes";

const router = Router();

router.use(authenticateToken, AdminOnly);

router.use("/about", aboutRoute);

router.use("/projects", projectsRoute);

router.use("/services", servicesRoute);

router.use("/skills", skillsRoute);

router.use("/experiences", experiencesRoute);

router.use("/contact-method", contactMethodRoute);

export default router;
