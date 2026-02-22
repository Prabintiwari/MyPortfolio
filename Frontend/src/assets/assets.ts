import {
  Code,
  Smartphone,
  Globe,
  Zap,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Target,
  Heart,
  BookOpen,
  Palette,
} from "lucide-react";
import HomeImg from "./HomeImg.png";
import MyCV from "./MyCV.pdf";

export const image = {
  HomeImg,
  MyCV,
};
export const skills = [
  {
    name: "CSS/TailwindCSS",
    level: 65,
    icon: Palette,
    color: "from-pink-500 to-purple-500",
  },
  {
    name: "JavaScript",
    level: 70,
    icon: Zap,
    color: "from-yellow-500 to-orange-500",
  },
  {
    name: "React",
    level: 60,
    icon: Code,
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "Node.js",
    level: 20,
    icon: BookOpen,
    color: "from-green-500 to-teal-500",
  },
  {
    name: "TypeScript",
    level: 50,
    icon: Target,
    color: "from-indigo-500 to-blue-500",
  },
];
export const experiences = [
  {
    title: "Frontend Developer (Self Projects)",
    company: "Personal Practice",
    period: "2024 - Present",
    description:
      "Built multiple frontend projects using React, Tailwind CSS, and JavaScript, focusing on responsive design and user experience.",
  },
  {
    title: "Frontend Development Trainee",
    company: "Skill Shikshya (Diploma Program)",
    period: "2025 - Present",
    description:
      "Currently enrolled in a diploma course focused on frontend development, learning HTML, CSS, JavaScript, and React through hands-on projects.",
  },

  {
    title: "Open Source Contributor (Beginner Level)",
    company: "GitHub",
    period: "2024",
    description:
      "Contributed to small fixes in frontend projects on GitHub, improving UI bugs and adding small features. Focused on learning collaborative workflows using Git and GitHub.",
  },
];
