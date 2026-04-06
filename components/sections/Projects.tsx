'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import MagicBento from '../ui/MagicBento'

export default function Projects() {
  return (
    <section id="projects" className="relative py-16 sm:py-24 lg:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-48 sm:w-72 lg:w-96 h-48 sm:h-72 lg:h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 sm:w-72 lg:w-96 h-48 sm:h-72 lg:h-96 bg-primary/3 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-space-outer relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1 }}
        >
          <motion.h2
            className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold mb-4 sm:mb-6 lg:mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
              Featured
            </span>
            <br />
            <span className="text-textTitle">Projects</span>
          </motion.h2>

          <motion.p
            className="text-base sm:text-lg lg:text-xl text-textBody max-w-3xl mx-auto leading-relaxed px-4 sm:px-0"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            A showcase of my recent work and personal projects that demonstrate technical excellence, 
            innovation, and passion for creating exceptional digital experiences.
          </motion.p>
        </motion.div>

        {/* MagicBento Projects Grid */}
        <motion.div
          className="flex justify-center px-2 sm:px-0"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <MagicBento 
            textAutoHide={true}
            enableStars={false}
            enableSpotlight={false}
            enableBorderGlow={true}
            enableTilt={false}
            enableMagnetism={false}
            clickEffect={true}
            spotlightRadius={0}
            particleCount={12}
            glowColor="59, 130, 246"
            disableAnimations={false}
          />
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16 sm:mt-24 lg:mt-32 px-4 sm:px-0"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <motion.p
            className="text-textBody mb-6 sm:mb-8 text-base sm:text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Interested in collaborating on something amazing?
          </motion.p>
          
          <motion.a
            href="#contact"
            className="cursor-target inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-primary text-background rounded-full font-medium hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25 text-sm sm:text-base"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Let's build something together</span>
            <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}