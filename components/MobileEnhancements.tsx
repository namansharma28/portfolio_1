'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Mobile-specific floating action button
export function MobileFloatingButton() {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrollY(currentScrollY)
      setIsVisible(currentScrollY > 300)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center cursor-target lg:hidden"
          initial={{ opacity: 0, scale: 0, y: 100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 100 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          style={{
            background: `linear-gradient(135deg, var(--primary) 0%, color-mix(in lab, var(--primary) 80%, transparent) 100%)`
          }}
        >
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="white"
            strokeWidth="2"
            className="text-white"
          >
            <path d="m18 15-6-6-6 6"/>
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  )
}

// Mobile pull-to-refresh indicator (visual only)
export function MobilePullIndicator() {
  const [pullDistance, setPullDistance] = useState(0)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    let startY = 0
    let currentY = 0

    const handleTouchStart = (e: TouchEvent) => {
      if (window.scrollY === 0) {
        startY = e.touches[0].clientY
        setIsActive(true)
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!isActive || window.scrollY > 0) return
      
      currentY = e.touches[0].clientY
      const distance = Math.max(0, currentY - startY)
      setPullDistance(Math.min(distance, 100))
    }

    const handleTouchEnd = () => {
      setIsActive(false)
      setPullDistance(0)
    }

    document.addEventListener('touchstart', handleTouchStart, { passive: true })
    document.addEventListener('touchmove', handleTouchMove, { passive: true })
    document.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
    }
  }, [isActive])

  return (
    <motion.div
      className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50 lg:hidden"
      initial={{ opacity: 0, y: -50 }}
      animate={{ 
        opacity: pullDistance > 20 ? 1 : 0, 
        y: pullDistance > 20 ? 0 : -50 
      }}
      transition={{ duration: 0.2 }}
    >
      <div className="bg-background/90 backdrop-blur-sm border border-primary/20 rounded-full px-4 py-2 shadow-lg">
        <motion.div
          className="flex items-center gap-2 text-primary"
          animate={{ rotate: pullDistance > 60 ? 180 : 0 }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12l7-7 7 7"/>
          </svg>
          <span className="text-sm font-medium">
            {pullDistance > 60 ? 'Release to refresh' : 'Pull to refresh'}
          </span>
        </motion.div>
      </div>
    </motion.div>
  )
}

// Mobile swipe indicators for sections - Line style with better visibility
export function MobileSwipeIndicator() {
  const [currentSection, setCurrentSection] = useState(0)
  const sections = ['home', 'about', 'projects', 'skills', 'contact']

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2
      
      sections.forEach((section, index) => {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setCurrentSection(index)
          }
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial check
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-40 lg:hidden">
      <div className="flex flex-col gap-2">
        {sections.map((section, index) => (
          <motion.button
            key={section}
            className={`w-1 rounded-full transition-all duration-300 ${
              currentSection === index 
                ? 'bg-primary shadow-lg shadow-primary/30' 
                : 'bg-textLight/50 hover:bg-textLight/70'
            }`}
            onClick={() => {
              document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' })
            }}
            whileHover={{ scale: 1.2, width: 6 }}
            whileTap={{ scale: 0.9 }}
            animate={{ 
              height: currentSection === index ? 40 : 20,
              width: currentSection === index ? 4 : 2,
              opacity: 1
            }}
            transition={{ duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }}
          />
        ))}
      </div>
    </div>
  )
}

// Mobile haptic feedback simulation
export function useMobileHaptics() {
  const triggerHaptic = (type: 'light' | 'medium' | 'heavy' = 'light') => {
    if ('vibrate' in navigator) {
      const patterns = {
        light: [10],
        medium: [20],
        heavy: [30]
      }
      navigator.vibrate(patterns[type])
    }
  }

  return { triggerHaptic }
}