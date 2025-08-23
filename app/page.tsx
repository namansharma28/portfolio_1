"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingIntro from '@/components/LoadingIntro';
import Navigation from '@/components/Navigation';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/Footer';
import AnimatedCursor from '@/components/AnimatedCursor';
import AnimatedBackground from '@/components/AnimatedBackground';

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const handleIntroComplete = () => {
    setShowIntro(false);
    setTimeout(() => {
      setShowContent(true);
    }, 300);
  };

  const pageVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
    },
  };

  return (
    <>
      <AnimatedCursor />
      
      <AnimatePresence mode="wait">
        {showIntro && <LoadingIntro onComplete={handleIntroComplete} />}
      </AnimatePresence>
      
      <AnimatePresence mode="wait">
        {showContent && (
          <motion.main
            className="relative min-h-screen"
            variants={pageVariants}
            initial="hidden"
            animate="visible"
          >
            <AnimatedBackground />
            <Navigation />
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Contact />
            <Footer />
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
}