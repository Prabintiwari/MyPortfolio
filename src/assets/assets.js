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
import movieFinder from "./MovieFinder1.png";
import SkillShikshya from "./SkillShikshya.png";
import WeatherApp from "./WeatherApp.png";

export const image = {
  HomeImg,
  MyCV,
};
export const social = [
  {
    icon: Github,
    href: "https://github.com/Prabintiwari",
    label: "GitHub",
    color: "hover:bg-purple-500",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/prabin-tiwari-61a95a2a2/",
    label: "LinkedIn",
    color: "hover:bg-blue-500",
  },
];
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
    image: SkillShikshya,
    category: "vanilla",
    tags: ["html", "tailwind css", "Javascript"],
    liveDemo: "https://assignmentskillshikshya.netlify.app/",
    github: "https://github.com/Prabintiwari/Assignment_02",
    date: "2025",
  },
  {
    id: 3,
    title: "Weather App",
    description:
      "A sleek weather forecasting app built using React and OpenWeather API. It provides real-time weather updates with features like location-based search, temperature unit toggle, and responsive UI with Tailwind CSS.",
    image: WeatherApp, 
    category: "react",
    tags: ["React", "Tailwind CSS", "OpenWeather API"],
    liveDemo: "https://weatherapp255.netlify.app/", 
    github: "https://github.com/Prabintiwari/WeatherApp", 
    date: "2025",
  },
];
export const contactMethods = [
  {
    icon: Mail,
    title: "Email",
    value: "prabintiwari964@gmail.com",
    description: "Send me an email anytime",
    gradient: "from-blue-500 to-cyan-500",
    delay: 0.1,
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+977 9815027619",
    description: "Call me for urgent matters",
    gradient: "from-green-500 to-teal-500",
    delay: 0.2,
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Kathmandu, Nepal",
    description: "Available for local meetups",
    gradient: "from-red-500 to-pink-500",
    delay: 0.3,
  },
];
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
    level: 10,
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
