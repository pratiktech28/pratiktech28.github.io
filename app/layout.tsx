import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Prateek Sharma | Infrastructure Cloud Architect & GSoC Contributor',
  description: 'Official portfolio of Prateek Sharma (pratiktech28). Core Contributor at Keploy, gprMax simulation expert, and Infrastructure Cloud Architect.',
  keywords: ['Prateek Sharma', 'pratiktech28', 'Keploy Core Contributor', 'gprMax', 'Google Summer of Code', 'Infrastructure Cloud Architect', 'Indore Developer'],
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
  other: {
    'application/ld+json': JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Prateek Sharma",
      "alternateName": "pratiktech28",
      "url": "https://pratiktech28.github.io",
      "image": "https://pratiktech28.github.io/profile-pic.jpg",
      "jobTitle": "Infrastructure Cloud Architect & AI Engineer",
      "description": "Official Contributor at Keploy and Google Summer of Code (GSoC) 2026 participant. Specialist in Cloud Infrastructure, Kubernetes scaling, and AI-driven backend automation.",
      "gender": "Male",
      "nationality": {
        "@type": "Country",
        "name": "India"
      },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Indore",
        "addressRegion": "Madhya Pradesh",
        "addressCountry": "India"
      },
      "sameAs": [
        "https://www.linkedin.com/in/prateeksharma2807",
        "https://github.com/pratiktech28",
        "https://www.kaggle.com/pratiktech28",
        "https://discordapp.com/users/pratiktech28",
        "https://www.instagram.com/pratiktech28",
        "https://leetcode.com/pratiktech28"
      ],
      "knowsAbout": [
        "Google Summer of Code",
        "Keploy Open Source Organization",
        "Kubernetes Infrastructure",
        "Cloud Architecture",
        "Backend Engineering",
        "gprMax Simulations",
        "Redis & RabbitMQ Scaling"
      ],
      "memberOf": [
        {
          "@type": "Organization",
          "name": "Keploy",
          "roleName": "Core Contributor",
          "url": "https://keploy.io"
        },
        {
          "@type": "Organization",
          "name": "Google Summer of Code",
          "description": "Selected Contributor for gprMax Project (2026)"
        }
      ],
      "alumniOf": {
        "@type": "CollegeOrUniversity",
        "name": "Indore Institute of Science and Technology",
        "sameAs": "https://www.iist.com"
      },
      "hasCredential": [
        {
          "@type": "EducationalOccupationalCredential",
          "name": "Verified Infrastructure Cloud Architect by Google",
          "credentialCategory": "Professional Certification"
        }
      ],
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://pratiktech28.github.io"
      }
    })
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark bg-background">
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
