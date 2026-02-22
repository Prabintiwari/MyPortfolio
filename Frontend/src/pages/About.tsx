import { useState } from "react";
import { motion } from "framer-motion";
import { experiences } from "../assets/assets";
import {
  User,
  Lightbulb,
  Coffee,
  Heart,
  Award,
  Calendar,
  Zap,
  Palette,
  Code,
  BookOpen,
  Target,
  AlertCircle,
} from "lucide-react";
import { useSkill } from "../hooks/useSkills";
import { getThemeColors } from "../config/theme";

const skillsIcons: Record<string, React.ElementType> = {
  Palette: Palette,
  Zap: Zap,
  BookOpen: BookOpen,
  Code: Code,
  Target: Target,
};

const About = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const { skills, error, loading } = useSkill();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
        duration: 1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 120,
        damping: 20,
      },
    },
  };

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      <div className="px-6 relative z-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative mb-8"
          >
            <motion.div
              className="w-32 h-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full mx-auto flex items-center justify-center backdrop-blur-sm"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              <User className="w-16 h-16 text-white" />
            </motion.div>
            <motion.div
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-green-400 rounded-full flex items-center justify-center"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                className="w-3 h-3 bg-white rounded-full"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
            About Me
          </h1>
          <p className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Passionate frontend developer crafting beautiful, interactive web
            experiences that users love. With a keen eye for detail and modern
            design principles.
          </p>
        </motion.div>

        {/* Story Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-20"
        >
          <motion.div
            variants={itemVariants}
            className="bg-gray-800/30 backdrop-blur-sm rounded-3xl p-10 border border-white/10"
          >
            <div className="flex items-center mb-8">
              <motion.div
                className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg flex items-center justify-center mr-4"
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{
                  type: "spring" as const,
                  stiffness: 400,
                  damping: 17,
                }}
              >
                <Lightbulb className="w-6 h-6 text-white" />
              </motion.div>
              <h2 className="text-4xl font-bold text-white">My Journey</h2>
            </div>

            <div className="space-y-3">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-gray-300 md:text-lg leading-relaxed"
              >
                I'm an aspiring frontend developer with a strong passion for
                creating clean, user-friendly web interfaces. My journey began
                with a curiosity about how websites are built, which has grown
                into a deep interest in building responsive and accessible web
                applications.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-gray-300 md:text-lg leading-relaxed"
              >
                I've been learning and practicing React, JavaScript, and modern
                CSS frameworks through online courses and personal projects.
                While I'm just starting out professionally, I enjoy exploring
                new technologies, building side projects, and continuously
                improving my skills.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-gray-300 md:text-lg leading-relaxed"
              >
                I'm currently seeking a frontend development internship where I
                can contribute, learn from experienced developers, and grow in a
                real-world team environment.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex items-center  mt-8 pt-8 border-t border-white/10 space-x-6"
            >
              <div className="flex items-center">
                <Coffee className="w-6 h-6 text-yellow-400 mr-3" />
                <span className="text-gray-300">
                  Fueled by coffee and creativity
                </span>
              </div>
              <div className="flex items-center">
                <Heart className="w-6 h-6 text-red-400 mr-3" />
                <span className="text-gray-300">Building with passion</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Skills Section */}
        <div className="max-w-6xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <motion.h2
              className="text-4xl font-bold mb-4 flex items-center justify-center text-white"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Award className="w-10 h-10 mr-4 text-yellow-400" />
              Skills & Expertise
            </motion.h2>
            <p className="text-gray-300 text-lg">
              Technologies I love working with
            </p>
          </motion.div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 mb-8">
              <p className="text-red-500 text-center">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 mx-auto block px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
              >
                Retry
              </button>
            </div>
          )}

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 items-center mx-auto w-full gap-6 px-6"
          >
            {skills.map((skill) => {
              const IconComponent = skillsIcons[skill.icon] ?? Code;
              const themeColor = getThemeColors(skill.variant);
              return (
                <motion.div
                  key={skill.name}
                  variants={itemVariants}
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                    transition: {
                      type: "spring" as const,
                      stiffness: 400,
                      damping: 25,
                    },
                  }}
                  className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer"
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  <div className="flex items-center mb-4">
                    <motion.div
                      className={`w-12 h-12 bg-gradient-to-r ${themeColor.gradient} rounded-lg flex items-center justify-center mr-4`}
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      transition={{
                        type: "spring" as const,
                        stiffness: 400,
                        damping: 17,
                      }}
                    >
                      <IconComponent size={18} />
                    </motion.div>
                    <h3 className="text-xl font-semibold text-white">
                      {skill.name}
                    </h3>
                  </div>

                  <div className="mb-2">
                    <div className="flex justify-between text-sm text-gray-400 mb-1">
                      <span>Proficiency</span>
                      <span>{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                      <motion.div
                        className={`h-2 rounded-full bg-gradient-to-r ${themeColor.gradient}`}
                        initial={{ width: 0 }}
                        animate={{
                          width:
                            hoveredSkill === skill.name
                              ? `${skill.level}%`
                              : "0%",
                        }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Experience Section */}
        <div className="max-w-4xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <motion.h2
              className="text-4xl font-bold mb-4 flex items-center justify-center text-white"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Calendar className="w-10 h-10 mr-4 text-blue-400" />
              Experience
            </motion.h2>
            <p className="text-gray-300 text-lg">My professional journey</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  y: -10,
                  transition: {
                    type: "spring" as const,
                    stiffness: 300,
                    damping: 20,
                  },
                }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition-opacity duration-300"></div>
                <div className="bg-slate-800/90 backdrop-blur-sm p-10 rounded-2xl border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <motion.h3
                        className="text-xl md:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors"
                        layoutId={`title-${index}`}
                      >
                        {exp.title}
                      </motion.h3>
                      <p className="text-lg text-blue-400 font-medium">
                        {exp.company}
                      </p>
                    </div>
                    <div className="flex items-center text-gray-400">
                      <Calendar className="w-5 h-5 mr-2" />
                      <span>{exp.period}</span>
                    </div>
                  </div>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    {exp.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
