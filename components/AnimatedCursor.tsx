"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AnimatedCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorTrails, setCursorTrails] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const [trailId, setTrailId] = useState(0);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Add trail point
      setCursorTrails(prev => {
        const newTrail = { x: e.clientX, y: e.clientY, id: trailId };
        setTrailId(prev => prev + 1);
        return [...prev.slice(-4), newTrail]; // Keep last 4 points for performance
      });
      
      // Check if hovering over clickable elements
      const target = e.target as HTMLElement;
      const isClickable = Boolean(target.tagName === 'BUTTON' || 
                         target.tagName === 'A' || 
                         target.closest('button') || 
                         target.closest('a') ||
                         target.style.cursor === 'pointer');
      
      setIsPointer(isClickable);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [trailId]);

  return (
    <>
      {/* Cursor Trails */}
      <AnimatePresence>
        {cursorTrails.map((trail, index) => (
          <motion.div
            key={trail.id}
            className="fixed top-0 left-0 w-2 h-2 pointer-events-none z-[9990] bg-primary/40 rounded-full"
            initial={{ 
              x: trail.x - 4, 
              y: trail.y - 4, 
              scale: 1,
              opacity: 0.8 
            }}
            animate={{ 
              x: trail.x - 4, 
              y: trail.y - 4, 
              scale: 0,
              opacity: 0 
            }}
            transition={{ 
              duration: 0.8,
              ease: "easeOut",
              delay: index * 0.05
            }}
          />
        ))}
      </AnimatePresence>

      {/* Main Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
          scale: isPointer ? 1.5 : 1,
          opacity: 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      >
        <div className="w-full h-full bg-white rounded-full shadow-lg" />
      </motion.div>

      {/* Cursor Ring */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 pointer-events-none z-[9998] border-2 border-primary/50 rounded-full"
        animate={{
          x: mousePosition.x - 24,
          y: mousePosition.y - 24,
          scale: isPointer ? 1.8 : 1,
          opacity: isPointer ? 0.8 : 0.3,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
          mass: 0.8,
        }}
      />

      {/* Enhanced Cursor Trail */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 pointer-events-none z-[9997] bg-gradient-to-r from-primary to-cyan-400 rounded-full"
        animate={{
          x: mousePosition.x - 6,
          y: mousePosition.y - 6,
          scale: isClicking ? 2.5 : 1,
          opacity: [0.8, 0.4, 0],
        }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
        }}
      />

      {/* Click Effect */}
      {isClicking && (
        <>
          <motion.div
            className="fixed top-0 left-0 w-24 h-24 pointer-events-none z-[9996] border border-primary/40 rounded-full"
            initial={{ 
              x: mousePosition.x - 48, 
              y: mousePosition.y - 48, 
              scale: 0, 
              opacity: 1 
            }}
            animate={{ 
              scale: 1.5, 
              opacity: 0 
            }}
            transition={{ 
              duration: 0.4, 
              ease: "easeOut" 
            }}
          />
          
          {/* Click particles */}
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="fixed top-0 left-0 w-2 h-2 pointer-events-none z-[9995] bg-primary rounded-full"
              initial={{ 
                x: mousePosition.x - 4, 
                y: mousePosition.y - 4, 
                scale: 0,
                opacity: 1 
              }}
              animate={{ 
                x: mousePosition.x - 4 + (Math.cos(i * Math.PI / 4) * 40), 
                y: mousePosition.y - 4 + (Math.sin(i * Math.PI / 4) * 40), 
                scale: 0,
                opacity: 0 
              }}
              transition={{ 
                duration: 0.6, 
                delay: i * 0.05,
                ease: "easeOut" 
              }}
            />
          ))}
        </>
      )}

      {/* Hover Effect */}
      {isPointer && (
        <>
          <motion.div
            className="fixed top-0 left-0 w-20 h-20 pointer-events-none z-[9994] bg-primary/10 rounded-full"
            initial={{ 
              x: mousePosition.x - 40, 
              y: mousePosition.y - 40, 
              scale: 0, 
              opacity: 0 
            }}
            animate={{ 
              scale: 1, 
              opacity: 1 
            }}
            exit={{ 
              scale: 0, 
              opacity: 0 
            }}
            transition={{ 
              duration: 0.3, 
              ease: "easeOut" 
            }}
          />
          
          {/* Hover particles */}
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              className="fixed top-0 left-0 w-1 h-1 pointer-events-none z-[9993] bg-primary/60 rounded-full"
              initial={{ 
                x: mousePosition.x - 2, 
                y: mousePosition.y - 2, 
                scale: 0,
                opacity: 0 
              }}
              animate={{ 
                x: mousePosition.x - 2 + (Math.cos(i * Math.PI / 3) * 30), 
                y: mousePosition.y - 2 + (Math.sin(i * Math.PI / 3) * 30), 
                scale: 1,
                opacity: [0, 1, 0] 
              }}
              transition={{ 
                duration: 1.2, 
                delay: i * 0.1,
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            />
          ))}
        </>
      )}

      {/* Magnetic effect for clickable elements */}
      {isPointer && (
        <motion.div
          className="fixed top-0 left-0 w-32 h-32 pointer-events-none z-[9992] border border-primary/20 rounded-full"
          animate={{
            x: mousePosition.x - 64,
            y: mousePosition.y - 64,
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}
    </>
  );
} 