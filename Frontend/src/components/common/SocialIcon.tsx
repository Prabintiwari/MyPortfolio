import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SocialLinks } from "../../types/socialLinks.types";
import { socialLinksService } from "../../services/socialLinksServices";
import { Github, Linkedin } from "lucide-react";
import { getThemeColors } from "../../config/theme";
import { useSocialLink } from "../../hooks/useSocialLinks";

const socialLinksIcons: Record<string, React.ElementType> = {
  Github: Github,
  Linkedin: Linkedin,
};

const SocialIcon = () => {
  const { socialLinks, error, loading } = useSocialLink();

  return (
    <div className="flex space-x-4">
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
      {!loading &&
        !error &&
        socialLinks.map((social, index) => {
          const IconComponent = socialLinksIcons[social.icon] || Github;
          const themeColor = getThemeColors(social.variant);
          return (
            <motion.a
              key={index}
              href={social.url}
              target="blank"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className={`w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center ${themeColor.hover} transition-colors cursor-pointer backdrop-blur-sm border border-white/10`}
            >
              <IconComponent className="w-6 h-6 text-white" />
            </motion.a>
          );
        })}
    </div>
  );
};

export default SocialIcon;
