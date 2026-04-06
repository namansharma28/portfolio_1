'use client'

import { motion } from 'framer-motion'
import { ThemeToggle } from './ThemeToggle'

export function MobileThemeToggle() {
  return (
    <motion.div
      className="lg:hidden fixed z-50"
      style={{
        top: '9px', // Much lower to avoid any overlap with 64px header
        right: '60px' // Clear separation from edge
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.5 }}
    >
      <ThemeToggle isMobile={true} />
    </motion.div>
  )
}

export function DesktopThemeToggle() {
  return (
    <div className="hidden lg:block">
      <ThemeToggle />
    </div>
  )
}