import React from "react";
import { social } from "../assets/assets";
import { motion } from "framer-motion";

const SocialIcon = () => {
  return (
    <div className="flex space-x-4">
      {social.map((social, index) => (
        <motion.a
          key={index}
          href={social.href}
          target="blank"
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className={`w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center ${social.color} transition-colors cursor-pointer backdrop-blur-sm border border-white/10`}
        >
          <social.icon className="w-6 h-6 text-white" />
        </motion.a>
      ))}
    </div>
  );
};

export default SocialIcon;
