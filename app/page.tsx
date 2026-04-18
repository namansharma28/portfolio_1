'use client'

import { useEffect, useState } from 'react'
import Navigation from '@/components/Navigation'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Projects from '@/components/sections/Projects'
import Skills from '@/components/sections/Skills'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/Footer'
import LoadingScreen from '@/components/LoadingScreen'
import { MobileFloatingButton, MobilePullIndicator, MobileSwipeIndicator } from '@/components/MobileEnhancements'
import { MobileThemeToggle, DesktopThemeToggle } from '@/components/MobileThemeToggle'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <main className="min-h-screen">
      <Navigation />
      <section id="home">
        <Hero />
      </section>
      
      {/* Theme Toggles - Separate for Desktop and Mobile */}
      <DesktopThemeToggle />
      <MobileThemeToggle />
      
      {/* Mobile Enhancements */}
      <MobileFloatingButton />
      <MobilePullIndicator />
      <MobileSwipeIndicator />
      
      <div className="px-4 sm:px-6 lg:px-8">
        <section id="about">
          <About />
        </section>
        <section id="projects">
          <Projects />
        </section>
        <section id="skills">
          <Skills />
        </section>/
        <section id="contact">
          <Contact />
        </section>
        <Footer />
      </div>
    </main>
  )
}