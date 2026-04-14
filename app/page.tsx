'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Menu, X, ChevronDown, Github, Linkedin, Mail, Phone, MapPin, ExternalLink, Download, Code2, Zap, Twitter, Instagram, Send, AlertCircle } from 'lucide-react'
import ResumeViewer from '@/components/ResumeViewer'
import ProposalViewer from '@/components/ProposalViewer'

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeSection, setActiveSection] = useState('home')
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set())
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [formSubmitting, setFormSubmitting] = useState(false)
  const [formMessage, setFormMessage] = useState('')
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = (window.scrollY / scrollHeight) * 100
      setScrollProgress(scrolled)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements((prev) => new Set(prev).add(entry.target.id))
          }
        })
      },
      { threshold: 0.1 }
    )
    return () => observerRef.current?.disconnect()
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(sectionId)
      setIsMenuOpen(false)
    }
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormSubmitting(true)
    setFormMessage('')

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()
      if (response.ok) {
        setFormMessage('✓ Your enquiry has been sent successfully!')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setFormMessage('✗ Failed to send enquiry. Please try again.')
      }
    } catch (error) {
      console.error('[v0] Form submission error:', error)
      setFormMessage('✗ Error sending enquiry. Please try again.')
    } finally {
      setFormSubmitting(false)
    }
  }

  const observe = (id: string) => {
    return (el: HTMLElement | null) => {
      if (el) {
        el.id = id
        observerRef.current?.observe(el)
      }
    }
  }

  const skills = [
    {
      title: 'Programming Languages',
      description: 'Core languages for development',
      items: ['Python', 'Golang', 'C++', 'JavaScript']
    },
    {
      title: 'Infrastructure & DevOps',
      description: 'Container orchestration and cloud platforms',
      items: ['Docker', 'Kubernetes', 'CI/CD', 'GitHub Actions']
    },
    {
      title: 'Backend & Frameworks',
      description: 'Server-side technologies and APIs',
      items: ['Node.js', 'Express.js', 'REST APIs', 'Microservices']
    },
    {
      title: 'Database & Data Storage',
      description: 'Database management and distributed storage',
      items: ['MySQL', 'MongoDB', 'PV/PVC Storage', 'Data Pipelines']
    },
    {
      title: 'AI & Computational Physics',
      description: 'Machine Learning and Physics simulation',
      items: ['Machine Learning', 'Agentic AI', 'Physics Simulation', 'Data Analysis']
    },
    {
      title: 'Tools & Testing',
      description: 'Development and testing tools',
      items: ['Git', 'Github', 'API Mocking', 'Regression Testing']
    }
  ]

  const projects = [
    {
      title: 'Bike Driving 3D',
      description: 'An immersive 3D bike driving simulation game built with web technologies. Features realistic physics, multiple environments, and engaging gameplay.',
      tags: ['JavaScript', 'Three.js', 'WebGL', '3D Graphics'],
      link: '#'
    },
    {
      title: 'AI Restaurant Web Architect',
      description: 'An AI-powered restaurant website builder that uses intelligent algorithms to create and customize restaurant websites with menu management.',
      tags: ['Python', 'AI/ML', 'Web Development', 'NLP']
    },
    {
      title: 'Vocal ComputeAI',
      description: 'A voice-controlled AI computing assistant that processes natural language commands to perform computational tasks hands-free.',
      tags: ['Python', 'Speech Recognition', 'AI', 'NLP']
    },
    {
      title: 'Car Racing Game',
      description: 'An exciting car racing game featuring multiple tracks, realistic controls, and competitive gameplay built with modern game dev techniques.',
      tags: ['JavaScript', 'Game Dev', 'Canvas', 'Physics']
    }
  ]

  const experience = [
    {
      title: 'Infrastructure & DevOps Engineer | GSoC \'26 Contributor',
      company: '@gprMax',
      role: 'Systems Engineer & Global Open Source Contributor',
      duration: 'Ongoing',
      location: 'Indore, Madhya Pradesh, India',
      highlights: [
        'Engineered containerized CI/CD infrastructure (The Trident Pipeline) for gprMax',
        'Automated physics-based regression testing using GitHub Actions and Docker',
        'Implemented NRMSE validation for simulation accuracy',
        'Designed system for global scalability using Kubernetes (GKE/EKS)'
      ]
    },
    {
      title: 'Lead Systems Optimizer & Global Open Source Contributor',
      company: '@gprMax & Keploy',
      role: 'No-Quit Architecture Mindset',
      duration: 'Ongoing',
      location: 'Indore, Madhya Pradesh, India',
      highlights: [
        'Navigated high-pressure environments, solving 30+ critical system-breaking errors',
        'Neutralized 70+ performance inhibitors and identified deep-seated CI/CD pipeline failures',
        'Stabilized and optimized computational physics simulations for global user base',
        'Engineered System Resilience across Keploy and gprMax ecosystems'
      ]
    },
    {
      title: 'Open Source Developer',
      company: '@GitHub Open Source',
      role: 'Backend & Testing',
      duration: '11 months',
      location: 'Indore, Madhya Pradesh, India',
      highlights: [
        'Contributed to multiple open source projects and repositories',
        'Developed frontend and backend features for community projects',
        'Resolved 30+ critical production-level errors',
        'Mentored and collaborated with community developers'
      ]
    }
  ]

  const stats = [
    { label: 'Critical Errors Fixed', value: '30+', icon: '🔧' },
    { label: 'Open Source Orgs', value: '3', icon: '⭐' },
    { label: 'GSoC Contribution', value: '2026', icon: '🎯' }
  ]

  const education = [
    {
      degree: 'Bachelor of Technology',
      specialization: 'CSE with AI/ML Specialization',
      institution: 'Chameli Devi Group of Institutions',
      affiliation: 'Affiliated with RGPV',
      duration: '2025 - 2029',
      location: 'Indore, Madhya Pradesh, India',
      highlights: [
        'Specializing in Artificial Intelligence and Machine Learning',
        'Building strong foundation in Data Structures & Algorithms',
        'Focus on Python, C++, Java programming languages'
      ]
    },
    {
      degree: 'Bachelor of Technology',
      specialization: 'CSE with AI/ML',
      institution: 'Rajiv Gandhi Prodyogiki Vishwavidyalaya (RGPV)',
      duration: 'July 2025 - December 2029',
      location: 'Madhya Pradesh, India',
      highlights: [
        'State Technical University of Madhya Pradesh',
        'Recognized degree program in Computer Science Engineering',
        'Comprehensive curriculum in modern technology stack'
      ]
    }
  ]

  const achievements = [
    {
      title: 'Galaxy Brain (x3)',
      badge: '🧠',
      description: 'My technical journey is validated through active mentorship and solving 16+ high-level architectural discussions that steer project roadmaps. A testament to my expertise in distributed systems design, cloud-native infrastructure, and my role in shaping the future of physics-driven computational frameworks.',
      color: 'from-purple-500 to-pink-500',
      icon: '⚙️'
    },
    {
      title: 'Pull Shark',
      badge: '🦈',
      description: 'Represents a consistent stream of merged pull requests across global projects like gprMax and GSoC \'26 simulations. My architectural contributions are solidified through rigorous code reviews and contributions that maintain the integrity of mission-critical systems at scale.',
      color: 'from-blue-500 to-cyan-500',
      icon: '🔀'
    },
    {
      title: 'Quickdraw',
      badge: '⚡',
      description: 'Closed complex issues within minutes of their opening, demonstrating surgical execution within the Keploy core repository. This reflects my continuous monitoring mindset and ability to identify system bottlenecks with sub-millisecond precision.',
      color: 'from-orange-500 to-yellow-500',
      icon: '⚡'
    },
    {
      title: 'Pair Extraordinaire',
      badge: '🤝',
      description: 'Seamless integration with modern AI-driven development workflows, including co-authored contributions with Vercel\'s v0. Proves my ability to leverage cutting-edge automation and maintain a high-velocity, cloud-native development cycle while delivering production-grade infrastructure.',
      color: 'from-green-500 to-emerald-500',
      icon: '🔗'
    }
  ]

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-primary to-accent z-50 transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-border pt-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Prateek Sharma
            </h1>

            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {['Home', 'About', 'Skills', 'Experience', 'Projects', 'Education', 'Contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeSection === item.toLowerCase()
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md hover:bg-muted"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['Home', 'About', 'Skills', 'Experience', 'Projects', 'Education', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-muted transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen pt-24 pb-12 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6" style={{
              transform: `translateY(${Math.min(scrollY * 0.5, 100)}px)`,
              opacity: Math.max(1 - scrollY / 500, 0.7)
            }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span className="text-sm text-primary font-medium">Available for Global Opportunities</span>
              </div>

              {/* Updated Headline */}
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Architecting the Future with{' '}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Prateek Sharma
                </span>
              </h1>

              {/* Updated Sub-headline */}
              <p className="text-lg text-muted-foreground font-semibold">
                Infrastructure Cloud Architect | GSoC &apos;26 Contributor @gprMax | Verified by @google | Official Core Contributor @keploy
              </p>

              <p className="text-base leading-relaxed text-muted-foreground">
                Engineering high-availability distributed systems and automated CI/CD pipelines. Currently optimizing computational physics simulations for global scalability while driving shift-left testing methodologies.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={() => scrollToSection('about')}
                  className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all hover:scale-105 flex items-center justify-center gap-2 group"
                >
                  Learn More
                  <ChevronDown size={20} className="group-hover:translate-y-1 transition-transform" />
                </button>
                <button
                  onClick={() => scrollToSection('projects')}
                  className="px-8 py-3 border border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors"
                >
                  View Projects
                </button>
              </div>

              <div className="flex gap-4 pt-4">
                <a href="#" className="p-3 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors">
                  <Github size={20} />
                </a>
                <a href="#" className="p-3 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors">
                  <Linkedin size={20} />
                </a>
                <a href="#" className="p-3 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors">
                  <Mail size={20} />
                </a>
              </div>
            </div>

            <div className="relative flex justify-center items-center" style={{
              transform: `translateY(${Math.max(scrollY * -0.3, -100)}px)`,
            }}>
              <div className="relative w-64 h-64 md:w-80 md:h-80">
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-full opacity-20 blur-2xl animate-pulse"></div>
                <div className="absolute inset-0 border-2 border-primary rounded-full animate-spin" style={{animationDuration: '20s'}}></div>
                <div className="absolute inset-4 border border-accent rounded-full animate-spin" style={{animationDuration: '15s', animationDirection: 'reverse'}}></div>
                <div className="absolute inset-0 rounded-full overflow-hidden flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
                  <Image
                    src="/profile.jpg"
                    alt="Prateek Sharma"
                    width={288}
                    height={288}
                    className="w-56 h-56 md:w-72 md:h-72 rounded-full object-cover"
                    priority
                  />
                </div>
                <div className="absolute bottom-8 right-8 px-4 py-2 bg-primary rounded-full shadow-lg animate-bounce">
                  <span className="text-sm font-semibold text-primary-foreground">AI/ML Specialist</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="text-muted-foreground" size={28} />
        </div>
      </section>

      {/* ... (Rest of the code remains the same as in your page.tsx) */}
