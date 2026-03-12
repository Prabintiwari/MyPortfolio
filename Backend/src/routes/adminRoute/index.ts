import { Router } from "express";
import aboutRoute from "./admin.about.routes";
import portfolioFileRoute from "./admin.portfolioFile.routes";
import projectsRoute from "./admin.projects.routes";
import servicesRoute from "./admin.service.routes";
import skillsRoute from "./admin.skills.routes";
import experiencesRoute from "./admin.experience.routes";
import contactMethodRoute from "./admin.contactMethod.routes";
import contactsRoute from "./admin.contact.routes";
import socialLinksRoute from "./admin.socialLinks.routes";

const router = Router();

router.use("/about", aboutRoute);

router.use("/projects", projectsRoute);

router.use("/portfolio-files", portfolioFileRoute);

router.use("/services", servicesRoute);

router.use("/skills", skillsRoute);

router.use("/experiences", experiencesRoute);

router.use("/contact-methods", contactMethodRoute);

router.use("/contacts", contactsRoute);

router.use("/social-links", socialLinksRoute);

export default router;
