'use client'

import { motion } from 'framer-motion'
import { Heart, Code2 } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Logo/Name */}
          <motion.div
            className="mb-4 sm:mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-xl sm:text-2xl font-logo">Naman Sharma</h3>
            <p className="text-textBody mt-1 sm:mt-2 text-sm sm:text-base">Full Stack Developer & ML Engineer</p>
          </motion.div>

          {/* Divider */}
          <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-4 sm:mb-6"></div>

          {/* Copyright */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-textBody text-xs sm:text-sm">
            <span>© {currentYear} Naman Sharma. All rights reserved.</span>
            <span className="hidden sm:inline">•</span>
            <div className="flex items-center gap-1">
              <span>Made with</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
              >
                <Heart size={14} className="sm:w-4 sm:h-4 text-red-400 fill-current" />
              </motion.div>
              <span>and</span>
              <Code2 size={14} className="sm:w-4 sm:h-4 text-primary" />
            </div>
          </div>

          {/* Tech Stack */}
          <motion.p
            className="text-xs text-textLight mt-3 sm:mt-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Built with Next.js, TypeScript, Tailwind CSS & Framer Motion
          </motion.p>
        </motion.div>
      </div>
    </footer>
  )
}