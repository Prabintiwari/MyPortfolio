import "dotenv/config";
import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminName = process.env.ADMIN_NAME || "Prabin Tiwari";

  if (!adminEmail || !adminPassword) {
    throw new Error(
      "ADMIN_EMAIL and ADMIN_PASSWORD must be set in environment variables",
    );
  }

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    const user = await prisma.user.create({
      data: {
        email: adminEmail,
        name: adminName,
        password: hashedPassword,
        role: UserRole.ADMIN,
      },
    });

    console.log("Admin created");
  } else {
    console.log("Admin already exists");
  }

  // Create About/Profile
   const about = await prisma.about.upsert({
    where: { id: '1' },
    update: {},
    create: {
      name: 'Prabin Tiwari',
      title: 'MERN Stack Developer',
      subtitle: 'Passionate MERN Stack Developer crafting digital experiences with cutting-edge technologies',
      bio: 'I\'m a passionate MERN Stack Developer with expertise in building modern, scalable web applications. With a strong foundation in JavaScript and its ecosystems, I specialize in creating efficient, user-friendly solutions that solve real-world problems.',
      description: `My journey in web development started 1 year ago, and since then I've been constantly learning and adapting to new technologies. I enjoy the process of turning ideas into reality through elegant code and intuitive interfaces.

        When I'm not coding, you can find me exploring new technologies, contributing to open source, or sharing my knowledge through tech blogs and communities.`,
      yearsExperience: 1,
      projectsCompleted: 5,
      openSource: 1,
      globalReachText: 'Creating solutions that connect people worldwide',
    },
  });
  console.log('✅ About section created');

  // Create Social Links
  const socialLinks = await prisma.socialLink.createMany({
    data: [
      {
        icon: "Github",
        label: "GitHub",
        href: "https://github.com/Prabintiwari",
        color: "hover:bg-purple-500",
        order: 1,
      },
      {
        icon: "Linkedin",
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/prabin-tiwari-61a95a2a2/",
        color: "hover:bg-blue-500",
        order: 2,
      },
    ],
  });
  console.log("✅ Social links created");

  // Create Services
  const services = await prisma.service.createMany({
    data: [
      {
        icon: "Code",
        title: "Frontend Development",
        description:
          "Responsive and accessible websites built using modern frontend technologies.",
        features: ["HTML & CSS", "Tailwind CSS", "JavaScript", "React.js"],
        order: 1,
      },
      {
        icon: "Smartphone",
        title: "Responsive Design",
        description:
          "Web interfaces that look great on all screen sizes and devices.",
        features: ["Mobile-First Approach", "Media Queries", "Flexbox & Grid"],
        order: 2,
      },
      {
        icon: "Zap",
        title: "Performance Optimization",
        description:
          "Improve frontend speed and performance for better user experience.",
        features: ["Lazy Loading", "Code Splitting", "Optimized Assets"],
        order: 3,
      },
      {
        icon: "Globe",
        title: "Basic SEO (Frontend)",
        description:
          "Implement semantic HTML and meta tags to improve search visibility.",
        features: ["Semantic HTML", "Meta Tags", "Accessibility"],
        order: 4,
      },
    ],
  });
  console.log("✅ Services created");

  // Create Projects
  const projects = await prisma.project.createMany({
    data: [
      {
        title: "React MovieFinder",
        description:
          "A responsive React movie search app with user authentication, custom hooks, and real-time search capabilities. Built with Tailwind CSS and optimized for performance.",
        image: "/images/moviefinder.png",
        category: "react",
        tags: ["React", "Tailwind CSS", "Custom Hooks"],
        liveDemo: "https://moviefinder2025.netlify.app/",
        github: "https://github.com/Prabintiwari/MovieFinder",
        date: "2025",
        isFeatured: true,
        order: 1,
      },
      {
        title: "Skill Shikshya Landing Page",
        description:
          "A clean and responsive landing page for Skill Shikshya, built using only HTML, Tailwind CSS, and Vanilla JS. It showcases smooth scrolling, modern layout, and component-based structure without any framework.",
        image: "/images/skillshikshya.png",
        category: "vanilla",
        tags: ["HTML", "Tailwind CSS", "Javascript"],
        liveDemo: "https://assignmentskillshikshya.netlify.app/",
        github: "https://github.com/Prabintiwari/Assignment_02",
        date: "2025",
        order: 2,
      },
      {
        title: "Weather App",
        description:
          "A sleek weather forecasting app built using React and OpenWeather API. It provides real-time weather updates with features like location-based search, temperature unit toggle, and responsive UI with Tailwind CSS.",
        image: "/images/weatherapp.png",
        category: "react",
        tags: ["React", "Tailwind CSS", "OpenWeather API"],
        liveDemo: "https://weatherapp255.netlify.app/",
        github: "https://github.com/Prabintiwari/WeatherApp",
        date: "2025",
        order: 3,
      },
      {
        title: "NepalShop E-Commerce Platform",
        description:
          "A modern e-commerce platform built with React, TypeScript, and Vite. Features include product catalog, shopping cart, user authentication, and a fully responsive UI styled with Tailwind CSS.",
        image: "/images/nepalshop.png",
        category: "react",
        tags: ["React", "Tailwind CSS", "Typescript"],
        liveDemo: "https://nepalshop.netlify.app/",
        github: "https://github.com/Prabintiwari/NepalShop",
        date: "2025",
        isFeatured: true,
        order: 4,
      },
    ],
  });
  console.log("✅ Projects created");

  // Create Skills
  const skills = await prisma.skill.createMany({
    data: [
      {
        name: "CSS/TailwindCSS",
        level: 65,
        icon: "Palette",
        color: "from-pink-500 to-purple-500",
        category: "technical",
        order: 1,
      },
      {
        name: "JavaScript",
        level: 70,
        icon: "Zap",
        color: "from-yellow-500 to-orange-500",
        category: "technical",
        order: 2,
      },
      {
        name: "React",
        level: 60,
        icon: "Code",
        color: "from-blue-500 to-cyan-500",
        category: "technical",
        order: 3,
      },
      {
        name: "Node.js",
        level: 20,
        icon: "BookOpen",
        color: "from-green-500 to-teal-500",
        category: "technical",
        order: 4,
      },
      {
        name: "TypeScript",
        level: 50,
        icon: "Target",
        color: "from-indigo-500 to-blue-500",
        category: "technical",
        order: 5,
      },
    ],
  });
  console.log("✅ Skills created");

  // Create Experiences
  const experiences = await prisma.experience.createMany({
    data: [
      {
        title: "Frontend Developer (Self Projects)",
        company: "Personal Practice",
        period: "2024 - Present",
        description:
          "Built multiple frontend projects using React, Tailwind CSS, and JavaScript, focusing on responsive design and user experience.",
        order: 1,
      },
      {
        title: "Frontend Development Trainee",
        company: "Skill Shikshya (Diploma Program)",
        period: "2025 - Present",
        description:
          "Currently enrolled in a diploma course focused on frontend development, learning HTML, CSS, JavaScript, and React through hands-on projects.",
        order: 2,
      },
      {
        title: "Open Source Contributor (Beginner Level)",
        company: "GitHub",
        period: "2024",
        description:
          "Contributed to small fixes in frontend projects on GitHub, improving UI bugs and adding small features. Focused on learning collaborative workflows using Git and GitHub.",
        order: 3,
      },
    ],
  });
  console.log("✅ Experiences created");

  // Create Contact Methods
  const contactMethods = await prisma.contactMethod.createMany({
    data: [
      {
        icon: "Mail",
        title: "Email",
        value: "prabintiwari964@gmail.com",
        description: "Send me an email anytime",
        gradient: "from-blue-500 to-cyan-500",
        order: 1,
      },
      {
        icon: "Phone",
        title: "Phone",
        value: "+977 9815027619",
        description: "Call me for urgent matters",
        gradient: "from-green-500 to-teal-500",
        order: 2,
      },
      {
        icon: "MapPin",
        title: "Location",
        value: "Kathmandu, Nepal",
        description: "Available for local meetups",
        gradient: "from-red-500 to-pink-500",
        order: 3,
      },
    ],
  });
  console.log("✅ Contact methods created");

  console.log("🎉 Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error during seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
