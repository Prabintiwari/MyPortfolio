import { useState } from "react";
import { motion } from "framer-motion";
import {
  Award,
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

const Skill = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const { skills, skillLoading, skillError } = useSkill();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
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
    <section id="skill" className="py-20 relative overflow-hidden">
      <div className="px-6 relative z-10">
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

          {/* Skills Loading */}
          {skillLoading && (
            <div className="flex justify-center items-center py-20">
              <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {/* Skills Error */}
          {skillError && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 mb-8">
              <div className="flex items-start gap-3">
                <AlertCircle className="text-red-500 mt-0.5" size={20} />
                <div>
                  <p className="text-red-500">{skillError}</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="text-red-400 hover:text-red-300 text-sm mt-2 underline"
                  >
                    Retry
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Skills Grid */}
          {!skillLoading && !skillError && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {skills.length === 0 ? (
                <div className="col-span-3 text-center py-10">
                  <p className="text-gray-400">No skills to display</p>
                </div>
              ) : (
                skills.map((skill) => {
                  const IconComponent = skillsIcons[skill.icon] ?? Code;
                  const themeColor = getThemeColors(skill.variant);
                  return (
                    <motion.div
                      key={skill.id}
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
                          <IconComponent className="text-white" size={24} />
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
                })
              )}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Skill;
