'use client'

import { motion } from 'framer-motion'
import { Mail, MapPin, Clock, ArrowUpRight, Send } from 'lucide-react'
import { FaLinkedin, FaGithub, FaXTwitter } from 'react-icons/fa6';
import { useState } from 'react'

const contactMethods = [
  {
    icon: Mail,
    title: 'Email',
    value: 'namansharma.web@gmail.com',
    description: 'Drop me a line anytime',
    href: 'mailto:namansharma.web@gmail.com',
    color: 'from-primary/20 to-primary/10',
    hoverColor: 'hover:from-primary/30 hover:to-primary/20'
  },
  {
    icon: MapPin,
    title: 'Location',
    value: 'Available Worldwide',
    description: 'Remote work & collaboration',
    color: 'from-primary/15 to-primary/5',
    hoverColor: 'hover:from-primary/25 hover:to-primary/15'
  },
  {
    icon: Clock,
    title: 'Response Time',
    value: '< 24 hours',
    description: 'Quick turnaround guaranteed',
    color: 'from-primary/10 to-primary/5',
    hoverColor: 'hover:from-primary/20 hover:to-primary/10'
  }
]

const socialLinks = [
  {
    icon: FaGithub,
    name: 'GitHub',
    href: 'https://github.com/namansharma28',
    username: '@namansharma28'
  },
  {
    icon: FaLinkedin,
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/namansharma286/',
    username: 'namansharma286'
  },
  {
    icon: FaXTwitter,
    name: 'X',
    href: 'https://x.com/NamanSharma_in',
    username: '@NamanSharma_in'
  }
]

// Animated contact method card
function ContactCard({ method, index }: { method: typeof contactMethods[0]; index: number }) {
  return (
    <motion.div
      className="group cursor-target"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -5 }}
    >
      <div className={`
        relative p-4 sm:p-6 lg:p-8 rounded-2xl bg-gradient-to-br ${method.color} ${method.hoverColor}
        backdrop-blur-sm border border-primary/10 hover:border-primary/20
        transition-all duration-300 overflow-hidden
      `}>
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-2 sm:top-4 right-2 sm:right-4 w-12 sm:w-16 lg:w-20 h-12 sm:h-16 lg:h-20 border border-primary/20 rounded-full" />
          <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 w-8 sm:w-10 lg:w-12 h-8 sm:h-10 lg:h-12 border border-primary/20 rounded-full" />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4 sm:mb-6">
            <div className="w-10 sm:w-12 lg:w-14 h-10 sm:h-12 lg:h-14 rounded-xl bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors duration-300">
              <method.icon size={20} className="sm:w-6 sm:h-6 text-primary" />
            </div>
            {method.href && (
              <ArrowUpRight size={16} className="sm:w-5 sm:h-5 text-primary/60 group-hover:text-primary transition-colors duration-300" />
            )}
          </div>
          
          <h3 className="text-base sm:text-lg font-bold text-textTitle mb-2">{method.title}</h3>
          
          {method.href ? (
            <a 
              href={method.href}
              className="cursor-target text-primary font-semibold mb-2 block hover:text-primary/80 transition-colors text-sm sm:text-base"
            >
              {method.value}
            </a>
          ) : (
            <p className="text-primary font-semibold mb-2 text-sm sm:text-base">{method.value}</p>
          )}
          
          <p className="text-textBody text-xs sm:text-sm">{method.description}</p>
        </div>
      </div>
    </motion.div>
  )
}

// Social link component
function SocialLink({ social, index }: { social: typeof socialLinks[0]; index: number }) {
  return (
    <motion.a
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      className="cursor-target group flex items-center gap-4 p-4 rounded-xl bg-backgroundLight/30 hover:bg-backgroundLight/50 border border-primary/10 hover:border-primary/20 transition-all duration-300"
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
      whileHover={{ x: 5, scale: 1.02 }}
    >
      <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors duration-300">
        <social.icon size={20} className="text-primary" />
      </div>
      <div className="flex-1">
        <div className="font-semibold text-textTitle group-hover:text-primary transition-colors duration-300">
          {social.name}
        </div>
        <div className="text-sm text-textBody">{social.username}</div>
      </div>
      <ArrowUpRight size={16} className="text-primary/60 group-hover:text-primary transition-colors duration-300" />
    </motion.a>
  )
}

// Animated marquee text
function MarqueeText() {
  return (
    <div className="relative overflow-hidden py-8 mb-12">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: [0, -1000] }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <span className="text-6xl md:text-8xl font-bold text-primary/10 mr-8">
          LET'S COLLABORATE — LET'S BUILD — LET'S CREATE — 
        </span>
        <span className="text-6xl md:text-8xl font-bold text-primary/10 mr-8">
          LET'S COLLABORATE — LET'S BUILD — LET'S CREATE — 
        </span>
      </motion.div>
    </div>
  )
}

export default function Contact() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <section id="contact" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-space-outer overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold mb-4 sm:mb-6 lg:mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
              Let's
            </span>
            <br />
            <span className="text-textTitle">Work Together</span>
          </motion.h2>

          <motion.p
            className="text-base sm:text-lg lg:text-xl text-textBody max-w-3xl mx-auto leading-relaxed px-4 sm:px-0"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Ready to bring your ideas to life? Let's discuss your project and create something 
            extraordinary together.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 mb-12 sm:mb-16 lg:mb-20">
          {/* Left Column - Contact Methods */}
          <div className="space-y-4 sm:space-y-6">
            <motion.h3
              className="text-2xl sm:text-3xl font-bold text-textTitle mb-6 sm:mb-8"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Get In Touch
            </motion.h3>

            {contactMethods.map((method, index) => (
              <ContactCard key={method.title} method={method} index={index} />
            ))}
          </div>

          {/* Right Column - CTA & Social */}
          <div className="space-y-6 sm:space-y-8">
            {/* Main CTA Card */}
            <motion.div
              className="relative p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 overflow-hidden"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Animated background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/10"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: isHovered ? 1 : 0, 
                  opacity: isHovered ? 1 : 0 
                }}
                transition={{ duration: 0.3 }}
              />
              
              <div className="relative z-10 text-center">
                <motion.div
                  className="w-16 sm:w-20 h-16 sm:h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6"
                  animate={{ 
                    rotate: isHovered ? 360 : 0,
                    scale: isHovered ? 1.1 : 1
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <Send size={24} className="sm:w-8 sm:h-8 text-background" />
                </motion.div>
                
                <h3 className="text-xl sm:text-2xl font-bold text-textTitle mb-3 sm:mb-4">Ready to Start?</h3>
                <p className="text-textBody mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
                  Let's discuss your project requirements and explore how we can work together 
                  to achieve your goals.
                </p>
                
                <motion.a
                  href="mailto:namansharma.web@gmail.com?subject=Project Collaboration&body=Hi Naman, I'd like to discuss a project with you."
                  className="cursor-target inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-primary text-background rounded-full font-semibold hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25 text-sm sm:text-base"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Send Message</span>
                  <ArrowUpRight size={16} className="sm:w-5 sm:h-5" />
                </motion.a>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h4 className="text-base sm:text-lg font-semibold text-textTitle mb-4 sm:mb-6">Connect With Me</h4>
              <div className="space-y-3 sm:space-y-4">
                {socialLinks.map((social, index) => (
                  <SocialLink key={social.name} social={social} index={index} />
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Animated Marquee */}
        <MarqueeText />

        {/* Bottom Section */}
        <motion.div
          className="text-center bg-gradient-to-r from-backgroundLight/20 to-background/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 border border-primary/10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.h3
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-textTitle mb-4 sm:mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Let's Build Something Amazing
          </motion.h3>
          
          <motion.p
            className="text-base sm:text-lg text-textBody max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            Whether you're a startup looking to make your mark or an established company seeking innovation, 
            I'm here to help transform your vision into reality.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}