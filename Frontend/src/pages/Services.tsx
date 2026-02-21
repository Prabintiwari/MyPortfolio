import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { serviceService } from "../services/serviceService";
import { Service } from "../types/services.types";
import { Code, Globe, Smartphone, Zap, Lightbulb } from "lucide-react";

const servicesIcons: Record<string, React.ElementType> = {
  Code: Code,
  Smartphone: Smartphone,
  Zap: Zap,
  Globe: Globe,
};

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      setError("");
      setLoading(true);
      try {
        const data = await serviceService.getAll({
          isActive: true,
        });
        setServices(data.data.services);
      } catch (error: any) {
        setError(error.response?.data?.message);
        console.error("Services fetch failed:", error.response?.data?.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

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

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
        duration: 1,
      },
    },
  };

  return (
    <section id="services" className="py-40 relative overflow-hidden">
      <div className="px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent mb-6">
            Services I Offer
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            From concept to deployment, I provide comprehensive solutions to
            bring your digital vision to life
          </p>
        </motion.div>

        {/* Loading state */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-red-500 flex justify-center items-center py-20">
            {error}
          </div>
        )}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {!loading &&
            services.map((service, index) => {
              const IconComponent = servicesIcons[service.icon] ?? Lightbulb;
              return (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover={{
                    y: -10,
                    transition: { type: "spring", stiffness: 300, damping: 20 },
                  }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition-opacity duration-300"></div>
                  <div className="relative bg-slate-800/90 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 h-full hover:border-purple-500/50 transition-all duration-300">
                    <motion.div whileHover="hover" className="mb-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:shadow-purple-500/25 transition-all duration-300">
                        <IconComponent size={18} />
                      </div>
                    </motion.div>

                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-200 transition-colors duration-300">
                      {service.title}
                    </h3>

                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <motion.li
                          key={featureIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            delay: 0.1 * featureIndex,
                            duration: 0.3,
                          }}
                          className="flex items-center text-gray-400 text-sm"
                        >
                          <div className="w-1.5 h-1.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full mr-3"></div>
                          {feature}
                        </motion.li>
                      ))}
                    </ul>

                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5, duration: 1 }}
                      className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-b-2xl origin-left"
                    ></motion.div>
                  </div>
                </motion.div>
              );
            })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-16"
        >
          <motion.a
            href="#contact"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(168, 85, 247, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-purple-700 hover:to-cyan-700 transition-all duration-300 shadow-lg"
          >
            Get Started Today
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
