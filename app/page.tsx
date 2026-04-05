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
import { ThemeToggle } from '@/components/ThemeToggle'

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
      <Hero />
      <ThemeToggle />
      <div className="px-8">
      <About />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
      </div>
    </main>
  )
}