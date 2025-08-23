"use client";

import { motion } from 'framer-motion';
import { Code2, Database, Settings, Palette } from 'lucide-react';

const skillCategories = [
  {
    title: 'Frontend Development',
    icon: Code2,
    color: 'from-blue-500 to-cyan-500',
    skills: [
      { name: 'React', level: 95, color: 'bg-blue-500' },
      { name: 'Next.js', level: 92, color: 'bg-blue-600' },
      { name: 'TypeScript', level: 90, color: 'bg-blue-700' },
      { name: 'JavaScript', level: 90, color: 'bg-yellow-500' },
      { name: 'Tailwind CSS', level: 92, color: 'bg-cyan-500' },
    ],
  },
  {
    title: 'Backend & Database',
    icon: Database,
    color: 'from-purple-500 to-pink-500',
    skills: [
      { name: 'Node.js', level: 88, color: 'bg-green-600' },
      { name: 'MongoDB', level: 85, color: 'bg-green-500' },
      { name: 'Express.js', level: 85, color: 'bg-green-700' },
      { name: 'PostgreSQL', level: 78, color: 'bg-blue-700' },
      { name: 'WebSocket', level: 80, color: 'bg-purple-500' },
    ],
  },
  {
    title: 'DevOps & Tools',
    icon: Settings,
    color: 'from-orange-500 to-red-500',
    skills: [
      { name: 'Git/GitHub', level: 90, color: 'bg-orange-600' },
      { name: 'Docker', level: 70, color: 'bg-blue-500' },
      { name: 'Render', level: 75, color: 'bg-blue-600' },
      { name: 'CI/CD', level: 72, color: 'bg-purple-500' },
      { name: 'VS Code', level: 85, color: 'bg-blue-500' },
    ],
  },
  {
    title: 'Machine Learning & Design',
    icon: Palette,
    color: 'from-green-500 to-emerald-500',
    skills: [
      { name: 'Machine Learning', level: 80, color: 'bg-green-500' },
      { name: 'Data Visualization', level: 78, color: 'bg-indigo-500' },
      { name: 'Figma', level: 75, color: 'bg-purple-500' },
      { name: 'Python', level: 82, color: 'bg-blue-600' },
      { name: 'TensorFlow', level: 75, color: 'bg-orange-500' },
    ],
  },
];

export default function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const progressVariants = {
    hidden: { width: 0 },
    visible: (level: number) => ({
      width: `${level}%`,
    }),
  };

  return (
    <section id="skills" className="section-padding relative">
      <div className="container-width">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2
            className="heading-medium mb-6 gradient-text"
            variants={itemVariants}
          >
            Skills & Expertise
          </motion.h2>
          <motion.p
            className="text-body max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Technologies and tools I use to bring ideas to life. Continuously learning and adapting to new challenges.
          </motion.p>
        </motion.div>



        {/* Skills Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              className="group"
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -10 }}
            >
              <div className="glass p-8 rounded-2xl h-full hover:glass-hover transition-all duration-500">
                {/* Category Header */}
                <div className="text-center mb-8">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <category.icon size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {category.title}
                  </h3>
                </div>

                {/* Skills List */}
                <div className="space-y-6">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-foreground">{skill.name}</span>
                        <span className="text-xs text-muted-foreground">{skill.level}%</span>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                        <motion.div
                          className={`h-2 rounded-full ${skill.color}`}
                          variants={progressVariants}
                          custom={skill.level}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Skills */}
        <motion.div
          className="mt-20 text-center"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h3 className="heading-medium mb-8 text-foreground">Always Learning</h3>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {[
              'Machine Learning', 'Blockchain', 'Web3', 'Mobile Development', 
              'Cloud Architecture', 'Microservices', 'GraphQL', 'Testing'
            ].map((skill, index) => (
              <motion.span
                key={index}
                className="px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm hover:bg-primary hover:text-primary-foreground transition-all duration-300 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}