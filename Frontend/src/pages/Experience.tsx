import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { useExperience } from "../hooks/useExperience";

const Experience = () => {
  const { experiences, error, loading } = useExperience();

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
    <section id="experience" className="py-20 relative overflow-hidden">
      <div className="px-6 relative z-10">
        {/* Experience Section */}
        <div className="max-w-4xl mx-auto">
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
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <motion.h3
                        className="text-xl md:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors"
                        layoutId={`title-${index}`}
                      >
                        {exp.position}
                      </motion.h3>
                      <p className="text-lg text-blue-400 font-medium">
                        {exp.company}
                      </p>
                      {exp.location && (
                        <p className="text-gray-400 text-sm">{exp.location}</p>
                      )}
                    </div>
                    <div className="flex items-center text-gray-400">
                      <Calendar className="w-5 h-5 mr-2" />
                      <span>{exp.period}</span>
                      <p className="text-gray-400 text-sm">
                        {exp.current && (
                          <span className="ml-2 px-2 py-1 bg-green-500/20 text-green-500 text-xs rounded">
                            Current
                          </span>
                        )}
                      </p>
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

export default Experience;
