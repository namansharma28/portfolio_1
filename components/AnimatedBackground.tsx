"use client";

import { motion } from 'framer-motion';
import { useEffect, useState } from "react";

export default function AnimatedBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, [isMobile]);

  // Fewer or no particles/orbs on mobile
  const particles = isMobile
    ? []
    : Array.from({ length: 25 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 15 + 8,
        delay: Math.random() * 3,
      }));

  const orbs = isMobile
    ? []
    : Array.from({ length: 4 }, (_, i) => ({
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
      <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-950 to-black" />
      
      {/* Dynamic gradient overlay that follows mouse */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          // Reduced the radius and opacity for subtler effect
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.04) 0%, transparent 30%)`,
        }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      />

      {/* Floating particles - white */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1.5 h-1.5 bg-white/70 rounded-full shadow-lg"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -120, 0],
            opacity: [0, 0.9, 0],
            scale: [0.7, 1.3, 0.7],
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
          className="absolute rounded-full blur-2xl"
          style={{
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            width: orb.size,
            height: orb.size,
          }}
          animate={{
            y: [0, -70, 0],
            x: [0, 30, 0],
            opacity: [0.12, 0.32, 0.12],
            scale: [0.9, 1.3, 0.9],
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-white/30 via-white/10 to-white/30 rounded-full shadow-2xl" />
        </motion.div>
      ))}

      {/* Animated grid pattern - white */}
      <div className="absolute inset-0 opacity-30">
        <div className="w-full h-full bg-[linear-gradient(rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.18)_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      {/* Glowing arc similar to bolt.new - white */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-96 opacity-40"
        animate={{
          opacity: [0.15, 0.5, 0.15],
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
          {/* Main animated arc */}
          <motion.path
            d="M0 400 Q300 200 600 300 T1200 400"
            stroke="url(#gradient)"
            strokeWidth="8"
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
          {/* New pure white arc with more radius, closer to the main arc */}
          <path
            d="M0 390 Q300 170 600 270 T1200 390"
            stroke="#fff"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            opacity="1"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="#f1f1f1" />
              <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Floating geometric shapes - white borders */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-32 h-32 border-2 border-white/50 rounded-lg shadow-lg"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.5, 0.15],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        className="absolute bottom-1/3 left-1/4 w-24 h-24 border-2 border-white/50 rounded-full shadow-lg"
        animate={{
          rotate: [360, 0],
          scale: [1, 1.25, 1],
          opacity: [0.15, 0.6, 0.15],
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
            "radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.08) 0%, transparent 70%)",
            "radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.08) 0%, transparent 70%)",
            "radial-gradient(circle at 40% 80%, rgba(255, 255, 255, 0.08) 0%, transparent 70%)",
            "radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.08) 0%, transparent 70%)",
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