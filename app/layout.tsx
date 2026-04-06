import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/ThemeProvider'
import TargetCursor from '@/components/TargetCursor'
import StructuredData from '@/components/StructuredData'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Naman Sharma - Developer & Product Designer',
    template: '%s | Naman Sharma'
  },
  description: 'Full Stack Developer and Machine Learning enthusiast passionate about building impactful digital experiences. Specializing in React, Next.js, Node.js, Python, and AI/ML technologies.',
  keywords: [
    'Naman Sharma',
    'Full Stack Developer',
    'Machine Learning Engineer',
    'React Developer',
    'Next.js Developer',
    'TypeScript',
    'Node.js',
    'Python',
    'MongoDB',
    'PostgreSQL',
    'AI/ML',
    'Web Development',
    'Software Engineer',
    'Frontend Developer',
    'Backend Developer',
    'Portfolio',
    'Designer',
    'Developer',
    'Product Designer'
  ],
  authors: [{ name: 'Naman Sharma', url: 'https://namansharma.in' }],
  creator: 'Naman Sharma',
  publisher: 'Naman Sharma',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://namansharma.in',
    siteName: 'Naman Sharma Portfolio',
    title: 'Naman Sharma - Developer & Product Designer',
    description: 'Full Stack Developer and Machine Learning enthusiast passionate about building impactful digital experiences. Specializing in React, Next.js, Node.js, and AI/ML technologies.',
    images: [
      {
        url: 'https://namansharma.in/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Naman Sharma - Developer & Product Designer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Naman Sharma - Developer & Product Designer',
    description: 'Full Stack Developer and Machine Learning enthusiast passionate about building impactful digital experiences.',
    images: ['https://namansharma.in/og-image.jpg'],
    creator: '@namansharma286',
  },
  alternates: {
    canonical: 'https://namansharma.in',
  },
  category: 'technology',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <StructuredData />
      </head>
      <body data-theme="dark">
        <ThemeProvider>
          {children}
          <TargetCursor />
        </ThemeProvider>
      </body>
    </html>
  )
}