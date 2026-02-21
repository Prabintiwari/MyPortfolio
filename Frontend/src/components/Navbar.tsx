import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, User, Briefcase, Mail, FileText } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navItems = [
    { name: "Home", href: "#home", icon: Home },
    { name: "About", href: "#about", icon: User },
    { name: "Services", href: "#services", icon: FileText },
    { name: "Portfolio", href: "#portfolio", icon: Briefcase },
    { name: "Contact", href: "#contact", icon: Mail },
  ];

  const handleNavClick = (sectionName: string) => {
    setActiveSection(sectionName.toLowerCase());
    setIsOpen(false);
  };

  const mobileMenuVariants = {
    open: {
      clipPath: "circle(1200px at calc(100%))",
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 20,
      },
    },
    closed: {
      clipPath: "circle(25px at calc(100% - 40px) 30px)",
      transition: {
        type: "spring" as const,
        stiffness: 250,
        damping: 35,
      },
    },
  };

  const iconVariants = {
    closed: { rotate: 0 },
    open: { rotate: -90 },
  };

  return (
    <>
      {/* Main Navbar */}
      <motion.nav
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
      >
        <div className=" mx-auto px-4 sm:px-6 lg:px-20">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="flex-shrink-0"
            >
              <motion.a
                href="#home"
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent cursor-pointer"
                onClick={() => handleNavClick("home")}
              >
                Prabin Tiwari
              </motion.a>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <motion.div
                className="ml-10 flex items-baseline space-x-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: 0.1 * index + 0.2,
                      duration: 0.4,
                    }}
                  >
                    <motion.a
                      href={item.href}
                      onClick={() => handleNavClick(item.name)}
                      className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 hover:text-blue-400 cursor-pointer no-underline block ${
                        activeSection === item.name.toLowerCase()
                          ? "text-blue-600"
                          : "text-gray-300"
                      }`}
                    >
                      {item.name}
                    </motion.a>
                    {activeSection === item.name.toLowerCase() && (
                      <motion.div
                        layoutId="activeTab"
                        className="h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mt-1"
                        initial={false}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden relative z-50">
              <motion.button
                animate={isOpen ? "open" : "closed"}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen((prev) => !prev)}
                className="inline-flex items-center justify-center p-3 rounded-full text-gray-700 bg-gray-100 transition-colors duration-700 relative z-50"
                aria-label="Toggle mobile menu"
              >
                <motion.div
                  variants={iconVariants}
                  transition={{ duration: 0.2 }}
                >
                  {isOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </motion.div>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="w-86 sm:w-96 h-screen md:hidden bg-gradient-to-br from-white via-blue-50 to-purple-50 backdrop-blur-md border-t border-gray-200/20 rounded overflow-hidden"
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                zIndex: 40,
              }}
            >
              <div className="px-2 pt-20 pb-6 space-y-2">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      onClick={() => handleNavClick(item.name)}
                      initial={{ x: -40, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -40, opacity: 0 }}
                      transition={{
                        delay: index * 0.1,
                        duration: 0.1,
                        ease: "easeOut",
                      }}
                      className={`flex items-center px-4 py-4 text-base font-medium rounded-xl transition-all cursor-pointer w-full text-left no-underline ${
                        activeSection === item.name.toLowerCase()
                          ? "bg-white/80 text-blue-600 shadow-lg border-l-4 border-blue-600"
                          : "text-gray-800 hover:bg-white/60 hover:text-blue-600 hover:shadow-md"
                      }`}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon className="h-5 w-5 mr-3" />
                      {item.name}
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navbar;
