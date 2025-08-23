"use client";

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Heart, Code2, ArrowUp } from 'lucide-react';

const socialLinks = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Mail, href: "mailto:your.email@example.com", label: "Email" },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        // ease: "easeOut",
      },
    },
  };

  return (
    <footer className="py-16 border-t border-border/20 bg-gradient-to-t from-background to-background/50">
      <div className="container-width">
        <motion.div
          className="text-center mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            className="flex items-center justify-center space-x-2 mb-6"
            variants={itemVariants}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/60 rounded-xl flex items-center justify-center">
              <Code2 size={24} className="text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text">Naman Sharma</span>
          </motion.div>
          
          <motion.p
            className="text-body max-w-2xl mx-auto mb-8"
            variants={itemVariants}
          >
            Crafting digital experiences that inspire and innovate. Let&apos;s build something amazing together.
          </motion.p>

          {/* Social Links */}
          <motion.div
            className="flex justify-center space-x-6 mb-8"
            variants={itemVariants}
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 glass rounded-xl hover:glass-hover transition-all duration-300"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                aria-label={social.label}
              >
                <social.icon size={24} className="text-muted-foreground group-hover:text-primary transition-colors" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 pt-8 border-t border-border/20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            className="flex items-center text-muted-foreground"
            variants={itemVariants}
          >
            <p className="flex items-center">
              Made with <Heart size={16} className="mx-2 text-primary animate-pulse" /> by Your Name
            </p>
          </motion.div>
          
          <motion.div
            className="text-muted-foreground text-sm"
            variants={itemVariants}
          >
            <p>&copy; 2025 Your Name. All rights reserved.</p>
          </motion.div>

          {/* Scroll to Top Button */}
          <motion.button
            onClick={scrollToTop}
            className="p-3 glass rounded-xl hover:glass-hover transition-all duration-300 group"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            variants={itemVariants}
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} className="text-muted-foreground group-hover:text-primary transition-colors" />
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
}