'use client'

import { motion } from 'framer-motion'
import { useRef } from 'react'

// Professional skills data organized by categories
const skillsData = {
  'Frontend Development': [
    'React & Next.js',
    'TypeScript & JavaScript',
    'HTML5 & CSS3',
    'Tailwind CSS',
    'React Native',
    'Three.js & WebGL'
  ],
  'Backend Development': [
    'Node.js & Express',
    'Python & Go',
    'MongoDB & PostgreSQL',
    'REST & GraphQL APIs',
    'Microservices Architecture',
    'Database Design'
  ],
  'DevOps & Tools': [
    'Docker & Kubernetes',
    'AWS & Cloud Services',
    'Git & CI/CD',
    'Linux Administration',
    'Performance Optimization',
    'Testing & Quality Assurance'
  ],
  'Design & Collaboration': [
    'UI/UX Design Principles',
    'Figma & Design Systems',
    'Responsive Design',
    'Accessibility Standards',
    'Agile Methodologies',
    'Technical Leadership'
  ]
}

// Individual skill category component
function SkillCategory({ category, skills, index }: { category: string; skills: string[]; index: number }) {
  return (
    <motion.div
      className="group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className="p-8 rounded-2xl bg-backgroundLight/30 backdrop-blur-sm border border-primary/10 hover:border-primary/20 transition-all duration-300 hover:bg-backgroundLight/40 group-hover:scale-[1.02]">
        <motion.h3 
          className="text-xl font-bold text-textTitle mb-6 pb-3 border-b border-primary/20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + 0.2, duration: 0.4 }}
        >
          {category}
        </motion.h3>
        
        <div className="space-y-3">
          {skills.map((skill, skillIndex) => (
            <motion.div
              key={skill}
              className="flex items-center gap-3 text-textBody hover:text-textTitle transition-colors duration-200 cursor-target"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + skillIndex * 0.05 + 0.3, duration: 0.3 }}
              whileHover={{ x: 5 }}
            >
              <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
              <span className="font-medium">{skill}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}


export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null)
  
  return (
    <section id="skills" ref={sectionRef} className="py-32 px-space-outer">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-6xl md:text-8xl font-bold mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
              Skills
            </span>
            <br />
            <span className="text-textTitle">& Expertise</span>
          </motion.h2>

          <motion.p
            className="text-xl text-textBody max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            A comprehensive skill set built through years of hands-on experience in modern web development, 
            from frontend interfaces to scalable backend systems.
          </motion.p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {Object.entries(skillsData).map(([category, skills], index) => (
            <SkillCategory 
              key={category} 
              category={category} 
              skills={skills} 
              index={index} 
            />
          ))}
        </div>

        {/* Professional Philosophy */}
        <motion.div
          className="text-center bg-gradient-to-br from-backgroundLight/20 to-background/10 rounded-3xl p-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.h3
            className="text-3xl md:text-4xl font-bold text-textTitle mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Continuous Learning & Innovation
          </motion.h3>
          
          <motion.p
            className="text-lg text-textBody max-w-4xl mx-auto leading-relaxed mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            Technology evolves rapidly, and so do I. I'm passionate about staying at the forefront of web development, 
            constantly exploring new frameworks, tools, and methodologies to deliver cutting-edge solutions that 
            exceed expectations and drive business growth.
          </motion.p>

          <motion.a
            href="#contact"
            className="cursor-target inline-flex items-center gap-3 px-8 py-4 bg-primary text-background rounded-full font-medium hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 1.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Let's discuss your project</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}