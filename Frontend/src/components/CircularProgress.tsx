import  { useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";

const CircularProgress = () => {
  const { scrollYProgress } = useScroll();
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const ScrollY = scrollYProgress.onChange((latest) => {
      setPercentage(Math.round(latest * 100));
    });
    return ScrollY;
  }, [scrollYProgress]);

  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.div
      className="fixed bottom-8 right-8 z-50 cursor-pointer"
      onClick={scrollToTop}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.5 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="w-full h-full rounded-full flex flex-col items-center justify-center relative">
        <svg className="absolute w-16 h-16 transform -rotate-90">      
          <circle
            cx="32"
            cy="32"
            r={radius}
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="2"
            fill="transparent"
          />
          {/* Progress circle */}
          <motion.circle
            cx="32"
            cy="32"
            r={radius}
            stroke="#3B82F6"
            strokeWidth="2"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </svg>
        {/* Percentage text */}
        <span className="text-xs font-bold text-blue-400">{percentage}%</span>
      </div>
      {/* Tooltip */}
      {percentage >= 100 && (
        <motion.div
          className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
        >
          Click to go top!
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default CircularProgress;
