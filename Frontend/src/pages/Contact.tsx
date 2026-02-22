import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Zap,
  Star,
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import SocialIcon from "../components/common/SocialIcon";
import Input from "../components/common/Input";
import { getThemeColors } from "../config/theme";
import { useContactForm } from "../hooks/useContactForm";
import { useContactMethods } from "../hooks/useContactMethods";

const contactMethodIcon: Record<string, React.ElementType> = {
  Mail: Mail,
  Phone: Phone,
  MapPin: MapPin,
};

const Contact = () => {
  const {
    formData,
    loading: formLoading,
    error: formError,
    isSubmitted,
    handleInputChange,
    handleSubmit,
  } = useContactForm();

  const {
    contactMethods,
    loading: fetchLoading,
    error: fetchError,
  } = useContactMethods();

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

              {/* Loading State */}
              {fetchLoading && (
                <div className="flex justify-center items-center py-20">
                  <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
                </div>
              )}

              {/* Error State */}
              {fetchError && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 mb-8">
                  <p className="text-red-500 text-center">{fetchError}</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="mt-4 mx-auto block px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                  >
                    Retry
                  </button>
                </div>
              )}

              {/* Contact Methods */}
              {!fetchLoading && !fetchError && (
                <div className="space-y-6">
                  {contactMethods.length === 0 ? (
                    <p className="text-gray-400 text-center py-4">
                      No contact methods available
                    </p>
                  ) : (
                    contactMethods.map((method, index) => {
                      const themeColor = getThemeColors(method.variant);
                      const IconComponent =
                        contactMethodIcon[method.icon] ?? Send;
                      return (
                        <motion.div
                          key={method.id}
                          initial={{ opacity: 0, x: -50 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
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
                            className={`w-12 h-12 bg-gradient-to-r ${themeColor.gradient} rounded-lg flex items-center justify-center mr-4`}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 17,
                            }}
                          >
                            <IconComponent className="text-white" size={20} />
                          </motion.div>
                          <div>
                            <p className="text-sm text-gray-400">
                              {method.title}
                            </p>
                            <p className="text-lg font-medium text-white group-hover:text-purple-400 transition-colors">
                              {method.value}
                            </p>
                            <p className="text-xs text-gray-500">
                              {method.description}
                            </p>
                          </div>
                        </motion.div>
                      );
                    })
                  )}
                </div>
              )}

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

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={formLoading || isSubmitted}
                />
                <Input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={formLoading || isSubmitted}
                />
              </div>

              <Input
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleInputChange}
                disabled={formLoading || isSubmitted}
              />

              <Input
                name="message"
                placeholder="Your Message"
                rows={5}
                value={formData.message}
                onChange={handleInputChange}
                disabled={formLoading || isSubmitted}
              />

              {/* Error */}
              <AnimatePresence>
                {formError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 flex items-start gap-2"
                  >
                    <AlertCircle
                      className="text-red-500 mt-0.5 flex-shrink-0"
                      size={18}
                    />
                    <p className="text-red-500 text-sm">{formError}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Success */}
              <AnimatePresence>
                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 flex items-start gap-2"
                  >
                    <CheckCircle
                      className="text-green-500 mt-0.5 flex-shrink-0"
                      size={18}
                    />
                    <div>
                      <p className="text-green-500 text-sm font-medium">
                        Message sent successfully!
                      </p>
                      <p className="text-green-400 text-xs mt-1">
                        I'll get back to you as soon as possible.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={formLoading || isSubmitted}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
                whileHover={{ scale: formLoading || isSubmitted ? 1 : 1.05 }}
                whileTap={{ scale: formLoading || isSubmitted ? 1 : 0.95 }}
                className={`w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg shadow-purple-500/25 ${
                  formLoading || isSubmitted
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                <AnimatePresence mode="wait">
                  {formLoading ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex justify-center items-center gap-2"
                    >
                      <span>Sending</span>
                      <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
                    </motion.div>
                  ) : isSubmitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-center space-x-2"
                    >
                      <Star className="w-5 h-5" />
                      <span>Message Sent!</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="send"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-center space-x-2"
                    >
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
