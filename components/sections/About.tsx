"use client";

import { motion } from 'framer-motion';
import { Code2, Palette, Rocket, Users, Award, Clock, Users2, Coffee } from 'lucide-react';

const features = [
  {
    icon: Code2,
    title: 'Clean Code',
    description: 'Writing maintainable, scalable, and efficient code that stands the test of time.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Palette,
    title: 'Design Thinking',
    description: 'Creating intuitive user experiences with beautiful, functional designs.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Rocket,
    title: 'Performance',
    description: 'Optimizing applications for speed, accessibility, and user satisfaction.',
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'Working seamlessly with teams to deliver exceptional results.',
    color: 'from-green-500 to-emerald-500',
  },
];

const stats = [
  { icon: Award, label: 'Experience', value: '5+ Years', color: 'text-blue-400' },
  { icon: Clock, label: 'Projects Completed', value: '50+', color: 'text-purple-400' },
  { icon: Users2, label: 'Happy Clients', value: '30+', color: 'text-green-400' },
  { icon: Coffee, label: 'Coffee Cups', value: '∞', color: 'text-orange-400' },
];

export default function About() {
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
    <section id="about" className="section-padding relative">
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
            About Me
          </motion.h2>
          <motion.p
            className="text-body max-w-4xl mx-auto"
            variants={itemVariants}
          >
            I&apos;m Naman Sharma, a full-stack developer and machine learning enthusiast passionate about building impactful digital experiences. From creating SaaS platforms and community apps to developing intelligent ML models, I strive to bring innovation, scalability, and usability together in every project.
          </motion.p>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Column - Text Content */}
          <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div variants={itemVariants}>
              <h3 className="heading-medium mb-6 text-foreground">My Journey</h3>
              <div className="space-y-4 text-body">
                <p>
                  My journey started with curiosity about how technology shapes the world. Over time, I&apos;ve evolved into a full-stack developer specializing in React, Next.js, Node.js, MongoDB, and TypeScript, while also exploring machine learning and AI through hands-on projects like stock prediction systems and generative models.
                </p>
                <p>
                  Beyond coding, I enjoy contributing to communities, sharing knowledge, and constantly learning new technologies.
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h3 className="heading-medium mb-6 text-foreground">What Drives Me</h3>
              <div className="space-y-4 text-body">
                <p>
                  I believe in creating technology that not only solves problems but also delights users. Every line of code I write is crafted with purpose, performance, and user experience in mind.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Stats Card */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="gradient-border p-8 rounded-2xl"
          >
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: Award, label: 'Experience', value: '2+ Years', color: 'text-blue-400' },
                { icon: Clock, label: 'Projects Completed', value: '10+', color: 'text-purple-400' },
                { icon: Users2, label: 'Community Contributions', value: 'Hackathons & Open Source', color: 'text-green-400' },
                { icon: Coffee, label: 'Coffee Cups', value: '∞', color: 'text-orange-400' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center p-4 glass rounded-xl hover:glass-hover transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <stat.icon size={32} className={`mx-auto mb-3 ${stat.color}`} />
                  <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group"
              variants={cardVariants}
              whileHover={{ scale: 1.05, y: -10 }}
            >
              <div className="glass p-8 rounded-2xl h-full hover:glass-hover transition-all duration-500">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}