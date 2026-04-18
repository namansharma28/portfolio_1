'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Github, Mail } from 'lucide-react'
import { FaLinkedin } from 'react-icons/fa';


const navItems = [
  { name: 'Contact', href: '#contact' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'About', href: '#about' },
]

const socialLinks = [
  {
    icon: Github,
    href: 'https://github.com/namansharma28',
    label: 'GitHub'
  },
  {
    icon: FaLinkedin,
    href: 'https://www.linkedin.com/in/namansharma286/',
    label: 'LinkedIn'
  },
  {
    icon: Mail,
    href: 'mailto:namansharma.web@gmail.com',
    label: 'Email'
  }
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('') // Will be set by scroll detection

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.href.substring(1))
      const scrollPosition = window.scrollY + 100
      let foundActiveSection = false

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(`#${section}`)
            foundActiveSection = true
            break
          }
        }
      }

      // If no section is active (e.g., at the very top), clear active section
      if (!foundActiveSection) {
        setActiveSection('')
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial position
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsOpen(false)
  }

  return (
    <>
      {/* Desktop Navigation - Vertical Layout inspired by inspiration3 */}
      <motion.nav
        className="fixed top-8 left-8 bottom-8 w-16 z-50 hidden lg:flex flex-col items-center justify-start"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Logo */}
        <motion.button
          className="cursor-target mb-8 p-3 rounded-xl bg-backgroundLight/80 backdrop-blur-sm border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:bg-backgroundLight"
          onClick={() => scrollToSection('#home')}
          whileHover={{ scale: 1.05, rotate: [0, -3, 3, 0] }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.4 }}
        >
          <span className="text-xl font-logo text-primary">NS</span>
        </motion.button>

        {/* Vertical Navigation Links */}
        <div className="flex flex-col items-center justify-center flex-1">
          <div 
            className="flex relative gap-6"
            style={{
              transform: 'rotate(180deg)',
              flexDirection: 'row-reverse',
              writingMode: 'vertical-lr'
            }}
          >
            {navItems.slice().reverse().map((item, index) => (
              <motion.button
                key={item.name}
                className={`cursor-target group relative px-4 py-3 text-base transition-all duration-300 inline-flex items-center ${
                  activeSection === item.href 
                    ? 'text-textTitle font-black' 
                    : 'text-textBody hover:text-textTitle font-medium'
                }`}
                onClick={() => scrollToSection(item.href)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  scale: activeSection === item.href ? 1.05 : 1
                }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
                whileHover={{ x: 5, scale: 1.05 }}
                style={{
                  lineHeight: 1
                }}
              >
                <span className="relative z-10">{item.name}</span>
                
                {/* Enhanced underline effect - positioned at the right side */}
                <motion.div
                  className="absolute bg-gradient-to-b from-primary via-primary to-primary rounded-full"
                  initial={{ scaleY: 0 }}
                  animate={{ 
                    scaleY: activeSection === item.href ? 1 : 0,
                    transition: { 
                      duration: 0.4, 
                      ease: "easeInOut"
                    }
                  }}
                  whileHover={{ 
                    scaleY: 1,
                    transition: { duration: 0.3, ease: "easeInOut" }
                  }}
                  style={{ 
                    right: '6px',
                    top: '8px',
                    bottom: '8px',
                    width: '6px',
                    transformOrigin: activeSection === item.href ? 'bottom' : 'top',
                  }}
                />
              </motion.button>
            ))}
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex flex-col items-center space-y-3 mt-8">
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-target p-2 text-textLight hover:text-primary transition-colors duration-300"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + index * 0.1, duration: 0.3 }}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-label={social.label}
            >
              <social.icon size={18} />
            </motion.a>
          ))}
        </div>
      </motion.nav>

      {/* Mobile Navigation - More Interesting Design */}
      <motion.nav
        className="lg:hidden fixed top-0 left-0 right-0 z-40"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Glassmorphism Background */}
        <div className="transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between h-16">
              {/* Mobile Logo */}
              <motion.button
                className="cursor-target text-2xl font-logo text-primary"
                onClick={() => scrollToSection('#home')}
                whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                
              </motion.button>

              <div className="flex items-center gap-4 z-50">
                {/* Animated Menu Button */}
                <motion.button
                  onClick={() => setIsOpen(!isOpen)}
                  className="cursor-target relative w-10 h-10 flex flex-col items-center justify-center space-y-1 group"
                  aria-label="Toggle menu"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <motion.span
                    className="w-6 h-0.5 bg-textBody group-hover:bg-primary transition-colors duration-300 rounded-full"
                    animate={{
                      rotate: isOpen ? 45 : 0,
                      y: isOpen ? 6 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.span
                    className="w-6 h-0.5 bg-textBody group-hover:bg-primary transition-colors duration-300 rounded-full"
                    animate={{
                      opacity: isOpen ? 0 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.span
                    className="w-6 h-0.5 bg-textBody group-hover:bg-primary transition-colors duration-300 rounded-full"
                    animate={{
                      rotate: isOpen ? -45 : 0,
                      y: isOpen ? -6 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed inset-0 bg-background/95 backdrop-blur-2xl"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.4, 0.0, 0.2, 1] }}
              onClick={() => setIsOpen(false)}
            >
              {/* Animated Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-primary rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
              </div>

              <div className="relative z-10 flex flex-col items-center justify-center h-full px-8" onClick={(e) => e.stopPropagation()}>
                {/* Navigation Items with Stagger Animation */}
                <div className="space-y-8 text-center">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.name}
                      className={`cursor-target group relative block text-3xl sm:text-4xl transition-all duration-300 ${
                        activeSection === item.href 
                          ? 'text-primary font-black' 
                          : 'text-textBody hover:text-primary font-medium'
                      }`}
                      onClick={() => scrollToSection(item.href)}
                      initial={{ opacity: 0, y: 50, rotateX: -90 }}
                      animate={{ 
                        opacity: 1, 
                        y: 0,
                        rotateX: 0,
                        scale: activeSection === item.href ? 1.05 : 1
                      }}
                      exit={{ opacity: 0, y: 50, rotateX: -90 }}
                      transition={{ 
                        delay: index * 0.1, 
                        duration: 0.6,
                        ease: [0.4, 0.0, 0.2, 1]
                      }}
                      whileHover={{ scale: 1.1, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="relative z-10 block">{item.name}</span>
                      
                      {/* Enhanced underline with glow effect */}
                      <motion.div
                        className="absolute left-1/2 bottom-0 h-1 bg-gradient-to-r from-primary via-primary to-primary rounded-full"
                        initial={{ scaleX: 0, x: '-50%' }}
                        animate={{ 
                          scaleX: activeSection === item.href ? 1 : 0,
                          transition: { duration: 0.4, ease: [0.4, 0.0, 0.2, 1] }
                        }}
                        whileHover={{ 
                          scaleX: 1,
                          transition: { duration: 0.3 }
                        }}
                        style={{ 
                          width: '80%',
                          transformOrigin: 'center'
                        }}
                      />
                      
                      {/* Hover glow effect */}
                      <motion.div
                        className="absolute inset-0 bg-primary/10 rounded-lg blur-xl"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ 
                          opacity: 1, 
                          scale: 1.2,
                          transition: { duration: 0.3 }
                        }}
                      />
                    </motion.button>
                  ))}
                </div>
                
                {/* Enhanced Social Links */}
                <motion.div
                  className="flex items-center space-x-8 mt-16"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                >
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-target relative p-4 rounded-2xl bg-backgroundLight/30 backdrop-blur-sm border border-primary/20 text-textLight hover:text-primary hover:border-primary/40 transition-all duration-300"
                      initial={{ opacity: 0, scale: 0.5, rotateY: -180 }}
                      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                      exit={{ opacity: 0, scale: 0.5, rotateY: -180 }}
                      transition={{ 
                        delay: 0.8 + index * 0.1, 
                        duration: 0.5,
                        ease: [0.4, 0.0, 0.2, 1]
                      }}
                      whileHover={{ 
                        scale: 1.2, 
                        y: -8,
                        rotateY: 15,
                        transition: { duration: 0.3 }
                      }}
                      whileTap={{ scale: 0.9 }}
                      aria-label={social.label}
                    >
                      <social.icon size={24} />
                      
                      {/* Glow effect on hover */}
                      <motion.div
                        className="absolute inset-0 bg-primary/20 rounded-2xl blur-lg"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.a>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  )
}