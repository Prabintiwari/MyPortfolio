import React from "react";
import { motion } from "framer-motion";

const Input = ({ type = "text", name, value, onChange, placeholder, rows }) => {
  const baseClass =
    "w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-[#8b5cf6] transition-all backdrop-blur-sm";

  if (name === "message") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <motion.textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          whileFocus={{ scale: 1.02 }}
          className={`${baseClass}`}
          required
        />
      </motion.div>
    );
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.6 }}
    >
      <motion.input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        whileFocus={{ scale: 1.02 }}
        className={`${baseClass}`}
      />
    </motion.div>
  );
};

export default Input;
