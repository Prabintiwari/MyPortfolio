import { Router } from "express";
import aboutRoute from "./publicRoute/about.routes";
import portfolioFileRoute from "./portfolioFile.routes";
import projectsRoute from "./projects.routes";
import servicesRoute from "./service.routes";
import skillsRoute from "./skills.routes";
import experiencesRoute from "./experience.routes";
import contactMethodRoute from "./contactMethod.routes";
import contactsRoute from "./contact.routes";
import socialLinksRoute from "./socialLinks.routes";

const router = Router();

router.use("/about", aboutRoute);

router.use("/projects", projectsRoute);

router.use("/portfolio-files", portfolioFileRoute);

router.use("/services", servicesRoute);

router.use("/skills", skillsRoute);

router.use("/experiences", experiencesRoute);

router.use("/contact-method", contactMethodRoute);

router.use("/contacts", contactsRoute);

router.use("/social-links", socialLinksRoute);

export default router;
