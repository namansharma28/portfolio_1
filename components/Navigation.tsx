'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'

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
    icon: Linkedin,
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
      {/* Theme Toggle */}
      <ThemeToggle />
      
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
                    ? 'text-textTitle font-bold' 
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
                
                {/* Underline effect - positioned at the right side */}
                <motion.div
                  className="absolute bg-primary rounded-full"
                  initial={{ scaleY: 0 }}
                  animate={{ 
                    scaleY: activeSection === item.href ? 1 : 0,
                    transition: { 
                      duration: 0.3, 
                      ease: "easeInOut",
                      // Active state comes from top, hover from bottom
                      ...(activeSection === item.href ? {} : {})
                    }
                  }}
                  whileHover={{ 
                    scaleY: 1,
                    transition: { duration: 0.3, ease: "easeInOut" }
                  }}
                  style={{ 
                    right: '8px',
                    top: '12px',
                    bottom: '12px',
                    width: '4px',
                    transformOrigin: activeSection === item.href ? 'bottom' : 'top'
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

      {/* Mobile Navigation */}
      <motion.nav
        className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-primary/10"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
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
              NS
            </motion.button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="cursor-target p-2 text-textBody hover:text-primary transition-colors duration-300"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed inset-0 bg-background/95 backdrop-blur-lg flex flex-col items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col items-center space-y-8">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.name}
                    className={`cursor-target group relative text-2xl transition-all duration-300 ${
                      activeSection === item.href 
                        ? 'text-primary font-bold' 
                        : 'text-textBody hover:text-primary font-medium'
                    }`}
                    onClick={() => scrollToSection(item.href)}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      scale: activeSection === item.href ? 1.02 : 1
                    }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="relative z-10">{item.name}</span>
                    
                    {/* Mobile underline effect */}
                    <motion.div
                      className="absolute left-0 right-0 bottom-0 h-1 bg-primary rounded-full"
                      initial={{ scaleX: 0 }}
                      animate={{ 
                        scaleX: activeSection === item.href ? 1 : 0,
                        transition: { duration: 0.3 }
                      }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                ))}
                
                {/* Mobile Social Links */}
                <div className="flex items-center space-x-6 mt-12">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-target p-3 rounded-full bg-backgroundLight/50 text-textLight hover:text-primary hover:bg-backgroundLight transition-all duration-300"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ delay: 0.4 + index * 0.1, duration: 0.3 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={social.label}
                    >
                      <social.icon size={20} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  )
}