'use client'

export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Naman Sharma",
    "jobTitle": "Full Stack Developer & Machine Learning Engineer",
    "description": "Full Stack Developer and Machine Learning enthusiast passionate about building impactful digital experiences.",
    "url": "https://namansharma.in",
    "sameAs": [
      "https://github.com/namansharma28",
      "https://www.linkedin.com/in/namansharma286/",
      "mailto:namansharma.web@gmail.com"
    ],
    "knowsAbout": [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Python",
      "Machine Learning",
      "MongoDB",
      "PostgreSQL",
      "Full Stack Development",
      "Web Development",
      "Software Engineering"
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "Freelance"
    },
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "University"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN"
    },
    "image": "https://namansharma.in/myphoto.jpg",
    "email": "namansharma.web@gmail.com"
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}