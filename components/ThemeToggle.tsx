'use client'

import { useId } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from './ThemeProvider'

interface ThemeToggleProps {
  isMobile?: boolean
}

export function ThemeToggle({ isMobile = false }: ThemeToggleProps) {
  const id = useId()
  const { toggleTheme } = useTheme()
  const maskId = `${id}theme-toggle-mask`

  return (
    <motion.button
      className="cursor-target fixed z-50 p-3 rounded-full bg-backgroundLight/80 backdrop-blur-sm border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:bg-backgroundLight"
      style={{
        top: isMobile ? 'unset' : 'var(--spaceOuter)',
        right: isMobile ? 'unset' : 'var(--spaceOuter)',
        bottom: isMobile ? 'var(--spaceOuter)' : 'unset',
        left: isMobile ? 'var(--spaceOuter)' : 'unset'
      }}
      data-mobile={isMobile}
      aria-label="Toggle theme"
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <svg aria-hidden width="24" height="24" viewBox="0 0 38 38" className="w-6 h-6">
        <defs>
          <mask id={maskId}>
            <circle 
              className="theme-toggle-circle-mask" 
              data-mask="true" 
              cx="19" 
              cy="19" 
              r="13" 
              fill="white"
            />
            <circle 
              className="theme-toggle-mask-circle" 
              cx="25" 
              cy="14" 
              r="9" 
              fill="black"
            />
          </mask>
        </defs>
        <path
          className="theme-toggle-sun-rays"
          d="M19 3v7M19 35v-7M32.856 11l-6.062 3.5M5.144 27l6.062-3.5M5.144 11l6.062 3.5M32.856 27l-6.062-3.5"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeWidth="3"
          strokeDasharray="7 7"
        />
        <circle
          className="theme-toggle-sun-moon"
          mask={`url(#${maskId})`}
          cx="19"
          cy="19"
          r="12"
          fill="currentColor"
        />
      </svg>
    </motion.button>
  )
}