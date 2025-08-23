"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Sparkles } from 'lucide-react';

interface LoadingIntroProps {
  onComplete: () => void;
}

export default function LoadingIntro({ onComplete }: LoadingIntroProps) {
  const [progress, setProgress] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [showContent, setShowContent] = useState(false);

  const loadingTexts = [
    'Initializing development environment...',
    'Loading portfolio components...',
    'Calibrating design systems...',
    'Preparing interactive elements...',
    'Almost ready to launch...',
  ];

  useEffect(() => {
    const duration = 4000; // 4 seconds
    const interval = 50;
    const increment = 100 / (duration / interval);
    let currentProgress = 0;
    let textIndex = 0;

    setShowContent(true);

    const timer = setInterval(() => {
      currentProgress += increment;
      setProgress(Math.min(currentProgress, 100));

      // Update text based on progress
      const newTextIndex = Math.floor((currentProgress / 100) * loadingTexts.length);
      if (newTextIndex !== textIndex && newTextIndex < loadingTexts.length) {
        textIndex = newTextIndex;
        setCurrentText(loadingTexts[textIndex]);
      }

      if (currentProgress >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          onComplete();
        }, 800);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

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

  const progressVariants = {
    hidden: { width: 0 },
    visible: (level: number) => ({
      width: `${level}%`,
    }),
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        // ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden" // removed bg-cosmic-black
      variants={containerVariants}
      initial="hidden"
      animate={showContent ? "visible" : "hidden"}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-900 to-black opacity-20" />
      
      {/* Floating Particles */}
      <motion.div
        className="absolute top-20 left-20 w-2 h-2 bg-primary/30 rounded-full"
        variants={floatingVariants}
        animate="animate"
      />
      <motion.div
        className="absolute top-40 right-32 w-3 h-3 bg-primary/20 rounded-full"
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: '1s' }}
      />
      <motion.div
        className="absolute bottom-32 left-1/4 w-1 h-1 bg-primary/40 rounded-full"
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: '2s' }}
      />

      <div className="text-center space-y-12 relative z-10">
        {/* Logo and Title */}
        <motion.div
          className="space-y-6"
          variants={itemVariants}
        >
          <motion.div
            className="w-24 h-24 bg-gradient-to-br from-primary to-primary/60 rounded-3xl flex items-center justify-center mx-auto mb-6"
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Code2 size={48} className="text-white" />
          </motion.div>
          
          <motion.h1
            className="text-5xl md:text-7xl font-bold gradient-text"
            // animate={{ 
            //   textShadow: [
            //     "0 0 20px rgba(59, 130, 246, 0.6)",
            //     "0 0 40px rgba(59, 130, 246, 0.8)",
            //     "0 0 20px rgba(59, 130, 246, 0.6)"
            //   ]
            // }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Naman
          </motion.h1>
        </motion.div>

        {/* Loading Text */}
        <motion.div
          className="space-y-4"
          variants={itemVariants}
        >
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground font-medium"
            key={currentText}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {currentText}
          </motion.p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          className="w-96 mx-auto space-y-3"
          variants={itemVariants}
        >
          <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
            <motion.div
              className="h-2 bg-gradient-to-r from-primary via-primary/80 to-primary/60 rounded-full"
              variants={progressVariants}
              initial="hidden"
              animate="visible"
            />
          </div>
          <motion.p
            className="text-muted-foreground text-sm font-medium"
            key={Math.round(progress)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {Math.round(progress)}% Complete
          </motion.p>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          className="flex justify-center space-x-4"
          variants={itemVariants}
        >
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-primary rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>

        {/* Sparkles */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles size={200} className="text-primary/10" />
        </motion.div>
      </div>
    </motion.div>
  );
}