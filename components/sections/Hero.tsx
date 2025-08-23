"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Github, Linkedin, Mail, ArrowRight } from 'lucide-react';

export default function Hero() {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const roles = ['Full Stack Developer', 'UI/UX Designer', 'Problem Solver', 'Code Architect'];

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % roles.length;
      const fullText = roles[i];

      setText(isDeleting 
        ? fullText.substring(0, text.length - 1)
        : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 50 : 150);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed, roles]);

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

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
    },
  };

  return (
    <section id="home" className="section-padding relative min-h-screen flex items-center justify-center overflow-hidden">
      
      {/* Floating geometric shapes */}
      <motion.div
        className="absolute top-20 left-20 w-32 h-32 border border-white/20 rounded-lg opacity-20"
        animate={{
          y: [-20, 20, -20],
          rotate: [0, 180, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute top-40 right-32 w-24 h-24 border border-white/20 rounded-full opacity-20"
        animate={{
          y: [20, -20, 20],
          x: [0, 20, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute bottom-40 left-1/3 w-20 h-20 border border-white/20 transform rotate-45 opacity-20"
        animate={{
          y: [-15, 15, -15],
          rotate: [45, 225, 405],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating particles - reduced count for performance */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/30 rounded-full"
          style={{
            left: `${20 + (i * 8)}%`,
            top: `${30 + (i * 5)}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 0.4, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 4 + i * 0.3,
            delay: i * 0.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <motion.div
        className="text-center z-10 max-w-5xl mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Greeting */}
        <motion.div
          className="mb-6"
          variants={itemVariants}
        >
          <span className="text-lg md:text-xl text-primary font-medium tracking-wide">
            Hello, I'm
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          className="heading-large mb-8 gradient-text"
          variants={itemVariants}
        >
          Naman Sharma
        </motion.h1>

        {/* Role */}
        <motion.div
          className="text-2xl md:text-4xl lg:text-5xl text-foreground mb-8 h-16 md:h-20 flex items-center justify-center"
          variants={itemVariants}
        >
          <span className="mr-2">{text}</span>
          <motion.span
            className="text-primary"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          >
            |
          </motion.span>
        </motion.div>

        {/* Description */}
        <motion.p
          className="text-body max-w-3xl mx-auto mb-12"
          variants={itemVariants}
        >
          Building scalable applications and intelligent systems that inspire and empower.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16"
          variants={itemVariants}
        >
          <button className="btn-primary group">
            <span className="flex items-center gap-2">
              View My Work
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
          <button className="btn-secondary">
            Download Resume
          </button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="flex justify-center space-x-6 mb-12"
          variants={itemVariants}
        >
          {[
            { icon: Github, href: "https://github.com", label: "GitHub" },
            { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
            { icon: Mail, href: "mailto:your.email@example.com", label: "Email" }
          ].map((social, index) => (
            <motion.a
              key={index}
              href={social.href}
            target="_blank"
            rel="noopener noreferrer"
              className="group p-4 glass rounded-2xl hover:glass-hover transition-all duration-500 transform hover:scale-110 hover:-translate-y-1"
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <social.icon size={24} className="text-muted-foreground group-hover:text-primary transition-colors" />
            </motion.a>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.button
          onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
          className="group"
          variants={itemVariants}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1 h-3 bg-primary rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
          <span className="text-xs text-muted-foreground mt-2 block group-hover:text-primary transition-colors">
            Scroll Down
          </span>
        </motion.button>
      </motion.div>
    </section>
  );
}