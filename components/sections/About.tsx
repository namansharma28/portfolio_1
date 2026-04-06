'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Button } from '../ui/button';

// DecoderText component - exact replica from inspiration3
function DecoderText({ text, delay = 0, start = true }: { text: string; delay?: number; start?: boolean }) {
  const [displayText, setDisplayText] = useState('')
  const containerRef = useRef<HTMLSpanElement>(null)
  
  const glyphs = [
    'ア', 'イ', 'ウ', 'エ', 'オ',
    'カ', 'キ', 'ク', 'ケ', 'コ',
    'サ', 'シ', 'ス', 'セ', 'ソ',
    'タ', 'チ', 'ツ', 'テ', 'ト',
    'ナ', 'ニ', 'ヌ', 'ネ', 'ノ',
    'ハ', 'ヒ', 'フ', 'ヘ', 'ホ',
    'マ', 'ミ', 'ム', 'メ', 'モ',
    'ヤ', 'ユ', 'ヨ', 'ー',
    'ラ', 'リ', 'ル', 'レ', 'ロ',
    'ワ', 'ヰ', 'ヱ', 'ヲ', 'ン',
  ]
  
  useEffect(() => {
    if (!start) return
    
    let timeoutId: NodeJS.Timeout
    
    const startDecoding = async () => {
      await new Promise(resolve => setTimeout(resolve, delay))
      
      const content = text.split('')
      let currentIndex = 0
      
      const decode = () => {
        if (currentIndex <= content.length) {
          const output = content.map((char, index) => {
            if (index < currentIndex) {
              return { type: 'value', value: char }
            }
            
            if (currentIndex % 1 < 0.5) {
              const rand = Math.floor(Math.random() * glyphs.length)
              return { type: 'glyph', value: glyphs[rand] }
            }
            
            return { type: 'glyph', value: glyphs[Math.floor(Math.random() * glyphs.length)] }
          })
          
          if (containerRef.current) {
            containerRef.current.innerHTML = output.map(item => 
              `<span class="decoder-${item.type}">${item.value}</span>`
            ).join('')
          }
          
          currentIndex += 0.1
          
          if (currentIndex <= content.length) {
            timeoutId = setTimeout(decode, 50)
          }
        }
      }
      
      decode()
    }
    
    startDecoding()
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [text, delay, start])
  
  return (
    <>
      <span className="sr-only">{text}</span>
      <span 
        ref={containerRef} 
        aria-hidden 
        className="font-mono tracking-wider"
      />
    </>
  )
}

// Divider component with notch animation
function Divider({ collapsed = false, collapseDelay = 0 }: { collapsed?: boolean; collapseDelay?: number }) {
  return (
    <div className="relative h-0.5 bg-gradient-to-r from-primary/60 to-transparent overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-primary/60"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: collapsed ? 0 : 1 }}
        transition={{ 
          duration: 0.8, 
          delay: collapseDelay / 1000,
          ease: [0.4, 0.0, 0.2, 1]
        }}
        style={{ transformOrigin: 'left' }}
      />
      <div 
        className="absolute left-0 top-0 w-16 h-2 bg-primary/60 -translate-y-1/2"
        style={{
          clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 50%, calc(100% - 8px) 100%, 0 100%)'
        }}
      />
    </div>
  )
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })
  const [focused, setFocused] = useState(false)
  const visible = isInView || focused

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-space-outer"
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      tabIndex={-1}
    >
      <div className="max-w-7xl w-full">
        <motion.div 
          className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-space-2xl items-start"
          initial={{ opacity: 0 }}
          animate={{ opacity: visible ? 1 : 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Left Column - Text Content */}
          <div className="flex flex-col space-y-6 sm:space-y-8 order-2 lg:order-1">
            {/* Title with Decoder Animation */}
            <motion.h3 
              className="text-xl sm:text-2xl md:text-3xl font-medium text-textLight mb-4 sm:mb-space-l"
              style={{
                opacity: visible ? 1 : 0,
                transition: 'opacity 1.2s cubic-bezier(0.4, 0.0, 0.2, 1) 0.6s'
              }}
            >
              <DecoderText text="Hi there" delay={500} start={visible} />
            </motion.h3>

            {/* Bio Text */}
            <motion.div 
              className="space-y-4 sm:space-y-6 text-base sm:text-lg text-textLight/90 leading-relaxed"
              style={{
                opacity: visible ? 1 : 0,
                transition: 'opacity 1.2s cubic-bezier(0.4, 0.0, 0.2, 1) 1s'
              }}
            >
              <p>
                I'm <strong className="text-primary">Naman Sharma</strong>, a full stack developer and machine learning enthusiast who enjoys turning ideas into real, usable products. I focus on building applications that are smooth, scalable, and intuitive, with equal attention to both how they work and how they feel.
              </p>
              
              <p>
                My journey started with curiosity about how technology works and gradually evolved into building complete products from scratch. I work across frontend and backend development, system design, and data driven applications, while also exploring artificial intelligence and machine learning.
              </p>

              <p className="hidden sm:block">
                Beyond coding, I enjoy contributing to communities, sharing knowledge, listening to music, 
                and constantly learning new technologies. I believe in creating technology that not only solves 
                problems but also delights users.
              </p>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              style={{
                opacity: visible ? 1 : 0,
                transition: 'opacity 1.2s cubic-bezier(0.4, 0.0, 0.2, 1) 1.2s'
              }}
            >
              <Button 
                variant="outline" 
                size="lg"
                className="cursor-target group hover:bg-primary hover:text-background transition-all duration-300 w-full sm:w-auto"
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span className="mr-2">Send me a message</span>
                <svg 
                  className="w-4 h-4 transition-transform group-hover:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </Button>
            </motion.div>
          </div>

          {/* Right Column - Image and Decorative Elements */}
          <div className="flex flex-col items-center lg:items-end order-1 lg:order-2">
            {/* Tag with Divider - Hidden on mobile */}
            <motion.div 
              className="hidden lg:flex items-center gap-3 mb-10 w-full"
              style={{
                marginTop: '220px'
              }}
            >
              <div className="w-16">
                <Divider collapsed={!visible} collapseDelay={1000} />
              </div>
              <motion.div
                className="text-sm font-medium text-primary tracking-wider uppercase"
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: visible ? 1 : 0,
                  x: visible ? 0 : -20
                }}
                transition={{ 
                  duration: 0.6, 
                  delay: 1.3,
                  ease: [0.4, 0.0, 0.2, 1]
                }}
              >
                About me
              </motion.div>
            </motion.div>

            {/* Mobile Title */}
            <motion.div 
              className="lg:hidden text-center mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: visible ? 1 : 0,
                y: visible ? 0 : 20
              }}
              transition={{ 
                duration: 0.6, 
                delay: 0.3,
                ease: [0.4, 0.0, 0.2, 1]
              }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-textTitle mb-2">About Me</h2>
              <div className="w-16 h-0.5 bg-primary mx-auto"></div>
            </motion.div>

            {/* Profile Image Container */}
            <motion.div 
              className="relative w-full max-w-xs sm:max-w-sm lg:max-w-md"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: visible ? 1 : 0,
                scale: visible ? 1 : 0.8
              }}
              transition={{ 
                duration: 1,
                delay: 0.1,
                ease: [0.4, 0.0, 0.2, 1]
              }}
            >
              {/* Profile Image */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 aspect-[3/4]">
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent z-10" />
                
                {/* Placeholder for now - you can replace with actual image */}
                <div className="w-full h-full flex items-center justify-center">
                  <img 
                    src="/myphoto.jpg" 
                    alt="Naman Sharma" 
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
                
                {/* Decorative Grid Overlay */}
                <div className="absolute inset-0 opacity-20">
                  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                      <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                      </pattern>
                    </defs>
                    <rect width="100" height="100" fill="url(#grid)" />
                  </svg>
                </div>
              </div>

              {/* Decorative SVG - Hidden on small mobile */}
              <motion.div
                className="hidden sm:block absolute -right-4 lg:-right-8 -bottom-4 text-textTitle/30 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: visible ? 1 : 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 1.2,
                  ease: [0.4, 0.0, 0.2, 1]
                }}
              >
                <svg width="80" height="100" className="sm:w-[120px] sm:h-[160px]" viewBox="0 0 120 160" fill="currentColor">
                  <path d="M20 20 L100 20 M20 40 L80 40 M20 60 L90 60 M20 80 L70 80 M20 100 L85 100 M20 120 L75 120 M20 140 L95 140" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        fill="none" 
                        opacity="0.6"
                  />
                  <circle cx="90" cy="30" r="3" opacity="0.8" />
                  <circle cx="70" cy="70" r="2" opacity="0.6" />
                  <circle cx="85" cy="110" r="2.5" opacity="0.7" />
                </svg>
              </motion.div>

              {/* Floating Stats - Repositioned for mobile */}
              <motion.div
                className="absolute -left-2 sm:-left-6 top-1/4 sm:top-1/3 bg-background/90 backdrop-blur-sm border border-border rounded-xl p-3 sm:p-4 shadow-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: visible ? 1 : 0,
                  x: visible ? 0 : -20
                }}
                transition={{ 
                  duration: 0.8, 
                  delay: 1.5,
                  ease: [0.4, 0.0, 0.2, 1]
                }}
              >
                <div className="text-xl sm:text-2xl font-bold text-primary">2+</div>
                <div className="text-xs text-textLight/70 uppercase tracking-wider">Years Experience</div>
              </motion.div>

              <motion.div
                className="absolute -right-2 sm:-right-4 top-2/3 bg-background/90 backdrop-blur-sm border border-border rounded-xl p-3 sm:p-4 shadow-lg"
                initial={{ opacity: 0, x: 20 }}
                animate={{ 
                  opacity: visible ? 1 : 0,
                  x: visible ? 0 : 20
                }}
                transition={{ 
                  duration: 0.8, 
                  delay: 1.7,
                  ease: [0.4, 0.0, 0.2, 1]
                }}
              >
                <div className="text-xl sm:text-2xl font-bold text-primary">10+</div>
                <div className="text-xs text-textLight/70 uppercase tracking-wider">Projects Built</div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}