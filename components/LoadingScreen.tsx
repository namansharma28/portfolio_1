'use client'

import { motion } from 'framer-motion'
import { Code2 } from 'lucide-react'

export default function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 bg-background flex items-center justify-center z-50"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center">
        <motion.div
          className="mb-8"
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            rotate: { duration: 2, repeat: Infinity, ease: "linear" },
            scale: { duration: 1, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <Code2 size={64} className="text-primary mx-auto" />
        </motion.div>
        
        <motion.h1
          className="text-2xl md:text-3xl font-logo text-primary mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Naman Sharma
        </motion.h1>
        
        <motion.p
          className="text-textBody"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Loading Portfolio<span className="loading-dots"></span>
        </motion.p>
      </div>
    </motion.div>
  )
}