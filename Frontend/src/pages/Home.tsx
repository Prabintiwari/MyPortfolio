import React from "react";
import { image } from "../assets/assets";
import { motion } from "motion/react";
import { Download } from "lucide-react";
import SocialIcon from "../components/common/SocialIcon";

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2,
      },
    },
  };

  const textVariantsMobile = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
        delay: 0.2,
      },
    },
  };

  const textVariantsDesktop = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
        delay: 0,
      },
    },
  };

  return (
    <section
      id="home"
      className="min-h-[calc(100vh-100px)] overflow-hidden relative pt-40"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-r from-blue-200/20 to-purple-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-r from-purple-200/20 to-pink-200/20 rounded-full blur-3xl" />
      </div>

      {/* Mobile Welcome Badge */}
      <motion.div
        variants={textVariantsMobile}
        initial="hidden"
        animate="visible"
        className="mb-6 flex justify-center items-center lg:hidden"
      >
        <span className="px-4 py-2 text-center bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-4">
          👋 Welcome to my portfolio
        </span>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="h-full flex flex-col lg:flex-row justify-between items-center gap-10"
        >
          {/* Left Content - Text */}
          <div className="flex-1 text-center lg:text-left order-2 lg:order-1">
            {/* Desktop Welcome Badge */}
            <motion.div
              variants={textVariantsDesktop}
              initial="hidden"
              animate="visible"
              className="mb-6 hidden lg:block"
            >
              <span className="px-4 py-2 text-center bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-4">
                👋 Welcome to my portfolio
              </span>
            </motion.div>

            {/* Main Heading - Responsive Animation */}
            <motion.h1
              variants={{
                hidden: { y: 30, opacity: 0 },
                visible: {
                  y: 0,
                  opacity: 1,
                  transition: {
                    duration: 0.6,
                    ease: "easeOut",
                    delay: window.innerWidth >= 1024 ? 0.2 : 0.6,
                  },
                },
              }}
              initial="hidden"
              animate="visible"
              className="text-4xl md:text-5xl <xl:text-6xl></xl:text-6xl> font-bold leading-tight mb-6"
            >
              Hi, I'm{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Prabin Tiwari
              </span>
              <br />
              <span className="text-slate-300">A Web Developer (Frontend)</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={{
                hidden: { y: 30, opacity: 0 },
                visible: {
                  y: 0,
                  opacity: 1,
                  transition: {
                    duration: 0.6,
                    ease: "easeOut",
                    delay: window.innerWidth >= 1024 ? 0.4 : 0.8,
                  },
                },
              }}
              initial="hidden"
              animate="visible"
              className="text-lg text-slate-400 mb-8 max-w-2xl"
            >
              I craft beautiful, responsive websites and web applications using
              modern technologies. Let's bring your digital ideas to life with
              clean code and stunning design.
            </motion.p>

            {/* Buttons */}
            <motion.div
              variants={{
                hidden: { y: 30, opacity: 0 },
                visible: {
                  y: 0,
                  opacity: 1,
                  transition: {
                    duration: 0.6,
                    ease: "easeOut",
                    delay: window.innerWidth >= 1024 ? 0.6 : 1.0,
                  },
                },
              }}
              initial="hidden"
              animate="visible"
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
            >
              <motion.a
                href={image.MyCV}
                download
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-medium hover:shadow-lg transition-shadow flex items-center justify-center gap-2"
              >
                <Download size={20} />
                Download CV
              </motion.a>

              <motion.a
                href="#portfolio"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border border-slate-300 text-slate-500 rounded-full font-medium hover:border-blue-400 hover:text-blue-600 transition-colors flex items-center justify-center gap-2"
              >
                View My Work
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={{
                hidden: { y: 30, opacity: 0 },
                visible: {
                  y: 0,
                  opacity: 1,
                  transition: {
                    duration: 0.6,
                    ease: "easeOut",
                    delay: window.innerWidth >= 1024 ? 0.8 : 1.2,
                  },
                },
              }}
              initial="hidden"
              animate="visible"
              className="flex gap-4 justify-center lg:justify-start"
            >
              <SocialIcon />
            </motion.div>
          </div>

          {/* Right Content - Image */}
          <div className="flex-1 flex justify-center lg:justify-end order-1 lg:order-2">
            <motion.div
              variants={{
                hidden: { scale: 0.8, opacity: 0 },
                visible: {
                  scale: 1,
                  opacity: 1,
                  transition: {
                    duration: 0.5,
                    ease: "easeOut",
                    delay: window.innerWidth >= 1024 ? 1.0 : 0.4,
                  },
                },
              }}
              initial="hidden"
              animate="visible"
              className="relative"
            >
              <motion.div className="relative z-10">
                <div className="w-80 h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-8 border-white shadow-2xl bg-gradient-to-br from-blue-100 to-purple-100">
                  <img
                    src={image.HomeImg}
                    alt="Prabin Tiwari - Profile Image"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Home;
