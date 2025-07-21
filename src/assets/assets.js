import { Code, Palette, Smartphone, Globe, Zap } from "lucide-react";
import HomeImg from "./HomeImg.png";
import MyCV from "./MyCV.pdf";
import movieFinder from "./MovieFinder1.png";
import SkillShikshya from "./SkillShikshya.png"

export const image = {
  HomeImg,
  MyCV,
};
export const services = [
  {
    icon: Code,
    title: "Frontend Development",
    description:
      "Responsive and accessible websites built using modern frontend technologies.",
    features: ["HTML & CSS", "Tailwind CSS", "JavaScript", "React.js"],
  },
  {
    icon: Smartphone,
    title: "Responsive Design",
    description:
      "Web interfaces that look great on all screen sizes and devices.",
    features: ["Mobile-First Approach", "Media Queries", "Flexbox & Grid"],
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description:
      "Improve frontend speed and performance for better user experience.",
    features: ["Lazy Loading", "Code Splitting", "Optimized Assets"],
  },
  {
    icon: Globe,
    title: "Basic SEO (Frontend)",
    description:
      "Implement semantic HTML and meta tags to improve search visibility.",
    features: ["Semantic HTML", "Meta Tags", "Accessibility"],
  },
];
export const projects = [
  {
    id: 1,
    title: "React MovieFinder",
    description:
      "A responsive React movie search app with user authentication, custom hooks, and real-time search capabilities. Built with Tailwind CSS and optimized for performance.",
    image: movieFinder,
    category: "react",
    tags: ["React", "Tailwind CSS", "Custon Hooks"],
    liveDemo: "https://moviefinder2025.netlify.app/",
    github: "https://github.com/Prabintiwari/MovieFinder",
    date: "2025",
  },
  {
    id: 2,
    title: "Skill Shikshya Landing Page",
    description:
      "A clean and responsive landing page for Skill Shikshya, built using only HTML, Tailwind CSS, and Vanilla JS. It showcases smooth scrolling, modern layout, and component-based structure without any framework.",
    image:SkillShikshya,
    category: "vanilla",
    tags: ["html", "tailwind css", "js"],
    liveDemo: "https://assignmentskillshikshya.netlify.app/",
    github: "https://github.com/Prabintiwari/Assignment_02",
    date: "2025",
  },
  {
    id: 3,
    title: "Blog Platform",
    description:
      "SEO-optimized blog platform with markdown support, dynamic routing, and server-side rendering. Includes search functionality and category filtering.",
    image:
      "https://images.unsplash.com/photo-1486312338219-ce68e2c6f44d?w=600&h=400&fit=crop&crop=entropy&auto=format",
    category: "react",
    tags: ["Next.js", "TypeScript", "Markdown", "Vercel"],
    liveDemo: "https://nextjs-blog-platform.vercel.app",
    github: "https://github.com/yourusername/nextjs-blog",
    date: "2024",
  },
];
