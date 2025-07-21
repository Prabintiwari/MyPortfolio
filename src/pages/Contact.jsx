import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Zap, Star, MessageCircle } from "lucide-react";
import { contactMethods } from "../assets/assets";
import SocialIcon from "../components/SocialIcon";

const Contact = () => {
  const initialFormData = {
    name: "",
    email: "",
    subject: "",
    message: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setIsSubmitted(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setTimeout(() => setIsSubmitted(false), 1500);
    setFormData(initialFormData);
    setIsLoading(false);
    
  };

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

  const inputClassName =
    "w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-[#8b5cf6] transition-all backdrop-blur-sm";

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      <div className="px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block p-4 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full mb-6 backdrop-blur-sm"
          >
            <MessageCircle size={48} className="text-purple-400" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-6">
            Get In Touch
          </h1>
          <p className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Ready to bring your ideas to life? Let's create something amazing
            together. I'm always open to discussing new opportunities and
            exciting projects.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto"
        >
          {/* Contact Info */}
          <motion.div className="space-y-8">
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-3xl font-bold mb-6 flex items-center text-white"
              >
                <Zap className="w-8 h-8 mr-3 text-yellow-400" />
                Let's Connect
              </motion.h2>

              <div className="space-y-6">
                {contactMethods.map((method, index) => (
                  <motion.div
                    key={method.title}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: method.delay }}
                    whileHover={{
                      x: 8,
                      transition: {
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                      },
                    }}
                    className="flex items-center group cursor-pointer"
                  >
                    <motion.div
                      className={`w-12 h-12 bg-gradient-to-r ${method.gradient} rounded-lg flex items-center justify-center mr-4`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                      }}
                    >
                      <method.icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <div>
                      <p className="text-sm text-gray-400">{method.title}</p>
                      <p className="text-lg font-medium text-white group-hover:text-purple-400 transition-colors">
                        {method.value}
                      </p>
                      <p className="text-xs text-gray-500">
                        {method.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-8 pt-8 border-t border-white/10"
              >
                <p className="text-sm text-gray-400 mb-4">Follow me on</p>
                <SocialIcon />
              </motion.div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <motion.h2
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-3xl font-bold mb-6 flex items-center text-white"
            >
              <Send className="w-8 h-8 mr-3 text-green-400" />
              Send Message
            </motion.h2>

            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {["name", "email"].map((field, index) => (
                  <motion.div
                    key={field}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  >
                    <motion.input
                      type={field === "email" ? "email" : "text"}
                      name={field}
                      value={formData[field]}
                      onChange={handleInputChange}
                      placeholder={`Your ${
                        field.charAt(0).toUpperCase() + field.slice(1)
                      }`}
                      className={`${inputClassName}`}
                      whileFocus={{ scale: 1.02 }}
                    />
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <motion.input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Subject"
                  className={`${inputClassName}`}
                  whileFocus={{ scale: 1.02 }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <motion.textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Your Message"
                  rows="5"
                  className={`${inputClassName}`}
                  whileFocus={{ scale: 1.02 }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSubmit}
                mailto="prabintiwari964@gmail.com"
                disabled={isSubmitted}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 shadow-lg shadow-purple-500/25"
              >
                <AnimatePresence mode="wait">
                  {isLoading ? (
                    <div className="flex justify-center items-center gap-2">
                      sending
                      <div
                        className={`w-7 h-7 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin`}
                      ></div>
                    </div>
                  ) : isSubmitted ? (
                    <motion.button
                      key="success"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-center space-x-2"
                    >
                      <Star className="w-5 h-5 animate-pulse" />
                      <span>Message Sent!</span>
                    </motion.button>
                  ) : (
                    <motion.button
                      key="send"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-center space-x-2"
                    >
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </motion.button>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
