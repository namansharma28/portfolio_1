import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Naman Sharma - Designer & Developer',
    short_name: 'Naman Sharma',
    description: 'Full Stack Developer and Machine Learning enthusiast passionate about building impactful digital experiences.',
    start_url: '/',
    display: 'standalone',
    background_color: '#1a202c',
    theme_color: '#4fd1c7',
    icons: [
      {
        src: '/favicon-simple.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  }
}