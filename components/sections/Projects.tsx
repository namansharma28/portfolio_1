"use client";

import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';

const projects = [
  {
    title: 'TeamLane (Collaboration Platform)',
    description: 'Built with Next.js, TypeScript, Tailwind, MongoDB, WebSockets. Supports real-time team collaboration, Kanban boards, and role-based access.',
    image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
    tech: ['Next.js', 'TypeScript', 'MongoDB', 'WebSocket', 'NextAuth'],
    github: 'https://github.com',
    demo: 'https://demo.com',
    category: 'Full Stack',
    featured: true,
  },
  {
    title: 'Gravitas (Community & Event Management)',
    description: 'App for community-driven events, discussions, and networking. Focus on seamless UX and scalable backend.',
    image: 'https://images.pexels.com/photos/7376/startup-photos.jpg?auto=compress&cs=tinysrgb&w=800',
    tech: ['React', 'Node.js', 'MongoDB'],
    github: 'https://github.com',
    demo: 'https://demo.com',
    category: 'Web App',
    featured: true,
  },
  {
    title: 'E-commerce Platform (SaaS for Creators)',
    description: 'Shopify alternative — affordable, beginner-friendly platform with custom websites, backend, and payment integration.',
    image: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=800',
    tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    github: 'https://github.com',
    demo: 'https://demo.com',
    category: 'SaaS',
    featured: false,
  },
  {
    title: 'Stock Market Predictor (ML Project)',
    description: 'Streamlit app using Linear Regression & LSTM models for predicting stock prices. Includes moving averages, forecasts, and visualization.',
    image: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpg?auto=compress&cs=tinysrgb&w=800',
    tech: ['Python', 'TensorFlow', 'Streamlit', 'LSTM'],
    github: 'https://github.com',
    demo: 'https://demo.com',
    category: 'Machine Learning',
    featured: false,
  },
  {
    title: 'Sketch2Real (Pix2Pix GAN)',
    description: 'Converts rough sketches into realistic images using a Pix2Pix GAN trained in TensorFlow.',
    image: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpg?auto=compress&cs=tinysrgb&w=800',
    tech: ['TensorFlow', 'Python', 'Colab', 'JavaScript'],
    github: 'https://github.com',
    demo: 'https://demo.com',
    category: 'AI/ML',
    featured: false,
  },
];

export default function Projects() {
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

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
    },
  };

  return (
    <section id="projects" className="section-padding relative">
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
            Featured Projects
          </motion.h2>
          <motion.p
            className="text-body max-w-3xl mx-auto"
            variants={itemVariants}
          >
            A showcase of my recent work and personal projects that demonstrate my skills and passion for creating exceptional digital experiences.
          </motion.p>
        </motion.div>

        {/* Featured Projects Grid */}
        <motion.div
          className="grid lg:grid-cols-2 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {projects.filter(p => p.featured).map((project, index) => (
            <motion.div
              key={index}
              className="group"
              variants={cardVariants}
              whileHover={{ scale: 1.02, y: -10 }}
            >
              <div className="glass rounded-2xl overflow-hidden h-full hover:glass-hover transition-all duration-500">
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 text-sm bg-primary/20 text-primary rounded-full backdrop-blur-sm">
                      {project.category}
                    </span>
                  </div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="flex space-x-4">
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Github size={20} className="text-white" />
                      </motion.a>
                      <motion.a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-primary rounded-full hover:bg-primary/90 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <ArrowUpRight size={20} className="text-white" />
                      </motion.a>
                    </div>
                  </div>
                </div>
                
                <div className="p-8">
                  <h3 className="text-2xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Other Projects Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {projects.filter(p => !p.featured).map((project, index) => (
            <motion.div
              key={index}
              className="group"
              variants={cardVariants}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="glass rounded-xl overflow-hidden h-full hover:glass-hover transition-all duration-500">
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 text-xs bg-primary/20 text-primary rounded-full backdrop-blur-sm">
                      {project.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.slice(0, 3).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex space-x-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      <Github size={16} />
                      <span>Code</span>
                    </a>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      <ExternalLink size={16} />
                      <span>Demo</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-16"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.button
            className="btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Projects
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}