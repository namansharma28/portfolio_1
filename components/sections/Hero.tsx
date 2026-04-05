'use client'

import { useState, useEffect, useRef, Suspense, lazy } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Lazy load the 3D sphere component
const DisplacementSphere = lazy(() => import('./DisplacementSphere'))

const disciplines = ['Full Stack Developer', 'ML Engineer', 'Problem Solver', 'Code Architect', 'UI/UX Designer']

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

export default function Hero() {
  const [disciplineIndex, setDisciplineIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const currentDiscipline = disciplines[disciplineIndex]

  // Cycle through disciplines every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setDisciplineIndex((prev) => (prev + 1) % disciplines.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Visibility and scroll indicator
  useEffect(() => {
    setIsVisible(true)
    
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        setScrollIndicatorHidden(rect.bottom < window.innerHeight * 0.1)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault()
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section 
      id="home" 
      ref={sectionRef}
      className="h-screen flex items-center justify-center flex-col relative overflow-hidden"
    >
      {/* 3D Displacement Sphere Background */}
      <Suspense fallback={null}>
        <DisplacementSphere />
      </Suspense>

      {/* Main Content */}
      <motion.div 
        className="relative z-10 max-w-4xl w-full px-space-outer text-center items-center"
        style={{ marginTop: 'calc(var(--spaceL) * -1)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 3, ease: [0.4, 0.0, 0.2, 1] }}
      >
        {/* Name */}
        <motion.h1 
          className="text-xl md:text-xl lg:text-2xl font-medium tracking-[0.3em] text-textLight mb-space-2xl uppercase cursor-target"
          style={{ 
            opacity: isVisible ? 1 : 0,
            transition: 'opacity var(--durationL) var(--bezierFastoutSlowin) 0.2s'
          }}
        >
          <span className='cursor-target'>
          <DecoderText text="NAMAN SHARMA" delay={500} start={isVisible} />
        </span>
        </motion.h1>

        {/* Title with Role and Disciplines */}
        <div className="space-y-4">
          {/* Role */}
          <motion.div 
            className="flex items-center justify-center gap-4 md:gap-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
            transition={{ 
              duration: 1.5, 
              delay: 0.6, 
              ease: [0.4, 0.0, 0.2, 1]
            }}
          >
            <motion.span 
              className="cursor-target text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-none tracking-tight"
              style={{
                color: isVisible ? 'var(--textTitle)' : 'transparent',
                transition: 'color 1.5s var(--bezierFastoutSlowin)',
                transitionDelay: '1s'
              }}
            >
              Developer
            </motion.span>
            
            <motion.div 
              className="h-0.5 flex-1 max-w-[120px] md:max-w-[200px]"
              style={{
                background: 'color-mix(in lab, var(--text) 30%, transparent)',
                scaleX: isVisible ? 1 : 0,
                transformOrigin: 'left',
                transition: 'transform 0.8s var(--bezierFastoutSlowin)',
                transitionDelay: '1.5s'
              }}
            />
          </motion.div>

          {/* Disciplines */}
          <motion.div 
            className="flex items-center justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
            transition={{ 
              duration: 1.5, 
              delay: 1.2, 
              ease: [0.4, 0.0, 0.2, 1]
            }}
          >
            <span className="text-textLight/40 text-2xl md:text-3xl lg:text-4xl mr-4">+</span>
            <div className="relative h-12 md:h-16 lg:h-20 flex items-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentDiscipline}
                  className="cursor-target text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold absolute whitespace-nowrap py-4"
                  style={{ 
                    background: 'var(--primary)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20, position: 'absolute' }}
                  transition={{ 
                    duration: 0.5, 
                    ease: [0.4, 0.0, 0.2, 1]
                  }}
                >
                  {currentDiscipline}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </motion.div>


    </section>
  )
}