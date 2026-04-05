import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/ThemeProvider'
import TargetCursor from '@/components/TargetCursor'
import './globals.css'

export const metadata: Metadata = {
  title: 'Naman Sharma - Designer & Developer',
  description: 'Full Stack Developer and Machine Learning enthusiast passionate about building impactful digital experiences. Specializing in React, Next.js, Node.js, and AI/ML technologies.',
  keywords: 'Naman Sharma, Designer, Developer, Full Stack Developer, ML Engineer, React, Next.js, TypeScript, MongoDB, Machine Learning',
  authors: [{ name: 'Naman Sharma' }],
  openGraph: {
    title: 'Naman Sharma - Designer & Developer',
    description: 'Building scalable applications and intelligent systems that inspire and empower.',
    url: 'https://namansharma.dev',
    siteName: 'Naman Sharma Portfolio',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Naman Sharma - Designer & Developer',
    description: 'Building scalable applications and intelligent systems that inspire and empower.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body data-theme="dark">
        <ThemeProvider>
          {children}
          <TargetCursor />
        </ThemeProvider>
      </body>
    </html>
  )
}