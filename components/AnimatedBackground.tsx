"use client";

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function AnimatedBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  // Generate random particles - reduced for performance
  const particles = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 15 + 8,
    delay: Math.random() * 3,
  }));

  // Generate floating orbs - reduced for performance
  const orbs = Array.from({ length: 4 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 150 + 100,
    duration: Math.random() * 12 + 8,
    delay: Math.random() * 2,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[-1]">
      {/* Animated gradient background - mostly black with a hint of blue */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-900 to-black" />
      
      {/* Dynamic gradient overlay that follows mouse */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.08) 0%, transparent 50%)`,
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />

      {/* Floating particles - white */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-white/40 rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 0.6, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Floating orbs with glow effects - white accents */}
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className="absolute rounded-full blur-3xl"
          style={{
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            width: orb.size,
            height: orb.size,
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, 20, 0],
            opacity: [0.05, 0.15, 0.05],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-white/10 via-white/5 to-white/10 rounded-full" />
        </motion.div>
      ))}

      {/* Animated grid pattern - white */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      {/* Glowing arc similar to bolt.new - white */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-96 opacity-15"
        animate={{
          opacity: [0.05, 0.2, 0.05],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg
          viewBox="0 0 1200 400"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M0 400 Q300 200 600 300 T1200 400"
            stroke="url(#gradient)"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            animate={{
              d: [
                "M0 400 Q300 200 600 300 T1200 400",
                "M0 400 Q300 150 600 250 T1200 400",
                "M0 400 Q300 200 600 300 T1200 400",
              ],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="#e5e7eb" />
              <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Floating geometric shapes - white borders */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-32 h-32 border border-white/20 rounded-lg"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
          opacity: [0.05, 0.2, 0.05],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        className="absolute bottom-1/3 left-1/4 w-24 h-24 border border-white/20 rounded-full"
        animate={{
          rotate: [360, 0],
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.25, 0.05],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Energy waves - white */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.03) 0%, transparent 70%)",
            "radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.03) 0%, transparent 70%)",
            "radial-gradient(circle at 40% 80%, rgba(255, 255, 255, 0.03) 0%, transparent 70%)",
            "radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.03) 0%, transparent 70%)",
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}