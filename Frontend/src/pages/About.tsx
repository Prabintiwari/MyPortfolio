import { motion } from "framer-motion";
import {
  User,
  Lightbulb,
  Coffee,
  Heart,
  TrendingUp,
  Briefcase,
  Github,
  AlertCircle,
} from "lucide-react";
import { useAbout } from "../hooks/useAbout";

const About = () => {
  const { about, aboutError, aboutLoading } = useAbout();

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
            {/* ✅ Default icon only - Avatar handled by ImageGallery component */}
            <motion.div
              className="w-32 h-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full mx-auto flex items-center justify-center backdrop-blur-sm"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              <User className="w-16 h-16 text-white" />
            </motion.div>

            {/* Online indicator */}
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

          {/* Title */}
          {aboutLoading ? (
            <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
          ) : (
            <>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
                {about?.name || "About Me"}
              </h1>
              <p className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
                {about?.subtitle ||
                  "Passionate developer crafting beautiful web experiences"}
              </p>
            </>
          )}
        </motion.div>

        {/* About Error */}
        {aboutError && (
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="text-red-500 mt-0.5" size={20} />
                <div>
                  <p className="text-red-500">{aboutError}</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="text-red-400 hover:text-red-300 text-sm mt-2 underline"
                  >
                    Retry
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

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

            {/* Bio & Description from backend */}
            <div className="space-y-6">
              {about?.bio && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-gray-300 md:text-lg leading-relaxed"
                >
                  {about.bio}
                </motion.p>
              )}

              {about?.description && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-gray-300 md:text-lg leading-relaxed whitespace-pre-line"
                >
                  {about.description}
                </motion.div>
              )}
            </div>

            {/* Stats & Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-8 pt-8 border-t border-white/10"
            >
              {/* Global Reach Text */}
              {about?.globalReachText && (
                <p className="text-gray-300 mb-6 italic">
                  "{about.globalReachText}"
                </p>
              )}

              {/* Traits */}
              <div className="flex flex-wrap gap-6">
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
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Stats Section  */}
        {about && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto mb-20"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Years of Experience */}
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20"
              >
                <div className="flex items-center mb-4">
                  <TrendingUp className="w-8 h-8 text-blue-400 mr-3" />
                  <h3 className="text-2xl font-bold text-white">
                    {about.yearsExperience}+
                  </h3>
                </div>
                <p className="text-gray-300">Years Experience</p>
              </motion.div>

              {/* Projects Completed */}
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20"
              >
                <div className="flex items-center mb-4">
                  <Briefcase className="w-8 h-8 text-purple-400 mr-3" />
                  <h3 className="text-2xl font-bold text-white">
                    {about.projectsCompleted}+
                  </h3>
                </div>
                <p className="text-gray-300">Projects Completed</p>
              </motion.div>

              {/* Open Source */}
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-green-500/10 to-teal-500/10 backdrop-blur-sm rounded-2xl p-6 border border-green-500/20"
              >
                <div className="flex items-center mb-4">
                  <Github className="w-8 h-8 text-green-400 mr-3" />
                  <h3 className="text-2xl font-bold text-white">
                    {about.openSource}+
                  </h3>
                </div>
                <p className="text-gray-300">Open Source</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default About;
