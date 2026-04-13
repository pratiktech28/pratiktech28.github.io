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
                <span className="text-sm text-primary font-medium">Available for Opportunities</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Hi, I&apos;m{' '}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Prateek Sharma
                </span>
              </h1>

              <p className="text-lg text-muted-foreground">
                Infrastructure Engineer at Google | GSoC &apos;26 Contributor @gprMax | Verified by @google
              </p>

              <p className="text-base leading-relaxed text-muted-foreground">
                Architecting high-availability distributed systems with 99.99% reliability. Expert in Kubernetes orchestration, CI/CD pipelines, and automated regression testing via Keploy. Driving Shift-Left observability and sub-millisecond latency through Go-based backend engineering.
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
                  <span className="text-sm font-semibold text-primary-foreground">AI/ML Enthusiast</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="text-muted-foreground" size={28} />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-muted/30" ref={observe('about-section')}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            <div className="text-center space-y-4" style={{
              opacity: visibleElements.has('about-section') ? 1 : 0,
              transform: visibleElements.has('about-section') ? 'translateY(0)' : 'translateY(40px)',
              transition: 'all 0.6s ease-out'
            }}>
              <h2 className="text-4xl font-bold">Who I Am</h2>
              <div className="h-1 w-16 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="group relative"
                  style={{
                    opacity: visibleElements.has('about-section') ? 1 : 0,
                    transform: visibleElements.has('about-section') ? 'translateY(0)' : 'translateY(60px)',
                    transition: `all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) ${idx * 0.12}s`
                  }}
                >
                  <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl bg-gradient-to-r from-primary/20 to-accent/20"></div>
                  
                  <div className="relative p-6 rounded-lg border border-border bg-card/50 backdrop-blur hover:border-primary transition-all duration-300 hover:scale-110 text-center h-full">
                    <div className="text-5xl mb-3 group-hover:scale-125 transition-transform duration-300 inline-block">{stat.icon}</div>
                    <div className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">{stat.value}</div>
                    <div className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="p-6 rounded-lg border border-border bg-card/50 backdrop-blur hover:border-primary/50 transition-all hover:scale-105">
                <h3 className="text-xl font-bold mb-3 text-primary">Passion & Purpose</h3>
                <p className="text-muted-foreground">
                  I am a Full-Stack Developer and Open Source Enthusiast with a passion for transforming complex engineering challenges into automated solutions. Currently focused on building CI/CD Pipelines and Automated Testing frameworks for advanced physics engines.
                </p>
              </div>

              <div className="p-6 rounded-lg border border-border bg-card/50 backdrop-blur hover:border-primary/50 transition-all hover:scale-105">
                <h3 className="text-xl font-bold mb-3 text-primary">Vision</h3>
                <p className="text-muted-foreground">
                  My vision is to bridge the gap between software engineering and physical simulations by creating scalable, high-performance digital infrastructure. I specialize in containerization technologies, infrastructure automation, and designing robust testing frameworks.
                </p>
              </div>

              <div className="p-6 rounded-lg border border-border bg-card/50 backdrop-blur hover:border-primary/50 transition-all hover:scale-105">
                <h3 className="text-xl font-bold mb-3 text-primary">Experience</h3>
                <p className="text-muted-foreground">
                  With hands-on experience in microservices architecture, DevOps practices, and computational physics, I&apos;m committed to open source contributions that advance the engineering community and solve complex infrastructure challenges.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20" ref={observe('skills-section')}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12" style={{
            opacity: visibleElements.has('skills-section') ? 1 : 0,
            transform: visibleElements.has('skills-section') ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.6s ease-out'
          }}>
            <h2 className="text-4xl font-bold">Technical Expertise</h2>
            <div className="h-1 w-16 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, idx) => (
              <div
                key={idx}
                className="group relative"
                style={{
                  opacity: visibleElements.has('skills-section') ? 1 : 0,
                  transform: visibleElements.has('skills-section') ? 'translateY(0)' : 'translateY(60px)',
                  transition: `all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) ${idx * 0.1}s`
                }}
              >
                {/* Animated glow background */}
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl bg-gradient-to-br from-primary/20 to-accent/20"></div>

                <div className="relative p-6 rounded-lg border border-border bg-card/50 backdrop-blur hover:border-primary transition-all duration-300 hover:scale-110 hover:shadow-xl">
                  {/* Left border accent */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-accent to-primary rounded-l-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="flex items-start gap-3 mb-3">
                    <Code2 className="text-primary mt-1 group-hover:text-accent group-hover:rotate-12 transition-all duration-300" size={24} />
                    <div>
                      <h3 className="text-lg font-bold group-hover:text-primary transition-colors">{skill.title}</h3>
                      <p className="text-xs text-muted-foreground group-hover:text-foreground/70 transition-colors">{skill.description}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {skill.items.map((item, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-xs font-semibold text-primary hover:bg-primary hover:text-primary-foreground transition-all transform hover:scale-110"
                        style={{
                          transitionDelay: `${i * 40}ms`
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-muted/30" ref={observe('experience-section')}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12" style={{
            opacity: visibleElements.has('experience-section') ? 1 : 0,
            transform: visibleElements.has('experience-section') ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.6s ease-out'
          }}>
            <h2 className="text-4xl font-bold">My Journey</h2>
            <div className="h-1 w-16 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
          </div>

          <div className="space-y-8 relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-accent to-primary opacity-20"></div>

            {experience.map((exp, idx) => (
              <div
                key={idx}
                className="group relative"
                style={{
                  opacity: visibleElements.has('experience-section') ? 1 : 0,
                  transform: visibleElements.has('experience-section') ? 'translateY(0)' : 'translateY(60px)',
                  transition: `all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) ${idx * 0.15}s`
                }}
              >
                {/* Timeline dot */}
                <div className="hidden md:block absolute left-0 top-6 w-16 h-16 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-primary border-4 border-background absolute left-6 group-hover:scale-150 transition-transform duration-300 shadow-lg shadow-primary/50"></div>
                </div>

                <div className="md:ml-24 p-6 rounded-lg border border-border bg-card/50 backdrop-blur hover:border-primary transition-all duration-300 hover:shadow-xl group-hover:shadow-primary/20 group-hover:scale-102">
                  {/* Animated top accent */}
                  <div className="absolute top-0 left-0 h-1 w-0 bg-gradient-to-r from-primary to-accent rounded-t-lg group-hover:w-full transition-all duration-500"></div>

                  <div className="flex items-start justify-between mb-4 gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{exp.title}</h3>
                      <p className="text-primary text-sm font-semibold">{exp.company}</p>
                    </div>
                    <span className="text-xs px-4 py-2 rounded-full bg-primary/20 border border-primary/50 text-primary font-bold whitespace-nowrap group-hover:bg-primary/40 transition-all">{exp.duration}</span>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4 flex items-center gap-2 group-hover:text-foreground transition-colors">
                    <MapPin size={16} className="text-accent flex-shrink-0" /> {exp.location}
                  </p>

                  <ul className="space-y-3">
                    {exp.highlights.map((highlight, i) => (
                      <li key={i} className="text-sm text-muted-foreground group-hover:text-foreground transition-colors flex gap-3">
                        <Zap size={16} className="text-primary flex-shrink-0 mt-0.5 group-hover:animate-pulse" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20" ref={observe('projects-section')}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12" style={{
            opacity: visibleElements.has('projects-section') ? 1 : 0,
            transform: visibleElements.has('projects-section') ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.6s ease-out'
          }}>
            <h2 className="text-4xl font-bold">Featured Projects</h2>
            <div className="h-1 w-16 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, idx) => (
              <div
                key={idx}
                className="group relative"
                style={{
                  opacity: visibleElements.has('projects-section') ? 1 : 0,
                  transform: visibleElements.has('projects-section') ? 'translateY(0)' : 'translateY(60px)',
                  transition: `all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) ${idx * 0.1}s`
                }}
              >
                {/* Animated glow background */}
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl bg-gradient-to-r from-primary/30 to-accent/30"></div>

                <div className="relative p-6 rounded-lg border border-border bg-card/50 backdrop-blur hover:border-primary transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer h-full">
                  {/* Animated top border */}
                  <div className="absolute top-0 left-0 w-0 h-1 bg-gradient-to-r from-primary to-accent rounded-t-lg group-hover:w-full transition-all duration-500"></div>

                  <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent group-hover:to-accent transition-all">{project.title}</h3>
                  <p className="text-muted-foreground mb-4 group-hover:text-foreground transition-colors">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-xs font-semibold text-primary hover:bg-primary hover:text-primary-foreground transition-all transform hover:scale-110"
                        style={{
                          transitionDelay: `${i * 50}ms`
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Floating effect on hover */}
                  <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-primary/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GSoC Proposal Section */}
      <section id="proposal" className="py-20 bg-muted/30" ref={observe('proposal-section')}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12" style={{
            opacity: visibleElements.has('proposal-section') ? 1 : 0,
            transform: visibleElements.has('proposal-section') ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.6s ease-out'
          }}>
            <p className="text-primary text-sm font-semibold">GSoC&apos;26 Initiative</p>
            <h2 className="text-4xl font-bold">GSoC&apos;26 Proposal Research</h2>
            <p className="text-muted-foreground">The Trident Pipeline: Cloud-Native CI/CD for Physics-Driven Simulation Testing</p>
            <div className="h-1 w-16 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
          </div>

          <div style={{
            opacity: visibleElements.has('proposal-section') ? 1 : 0,
            transform: visibleElements.has('proposal-section') ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.6s ease-out 0.1s'
          }}>
            <ProposalViewer />
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20" ref={observe('education-section')}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12" style={{
            opacity: visibleElements.has('education-section') ? 1 : 0,
            transform: visibleElements.has('education-section') ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.6s ease-out'
          }}>
            <h2 className="text-4xl font-bold">Academic Background</h2>
            <div className="h-1 w-16 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {education.map((edu, idx) => (
              <div
                key={idx}
                className="p-6 rounded-lg border border-border bg-card/50 backdrop-blur hover:border-primary transition-all hover:scale-105"
                style={{
                  opacity: visibleElements.has('education-section') ? 1 : 0,
                  transform: visibleElements.has('education-section') ? 'translateY(0)' : 'translateY(40px)',
                  transition: `all 0.6s ease-out ${idx * 0.1}s`
                }}
              >
                <h3 className="text-lg font-bold mb-2">{edu.degree}</h3>
                <p className="text-primary text-sm font-semibold mb-1">{edu.specialization}</p>
                <p className="text-sm text-muted-foreground mb-3">{edu.institution}</p>
                <p className="text-xs text-muted-foreground mb-3">{edu.duration}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-2 mb-4">
                  <MapPin size={14} /> {edu.location}
                </p>
                <ul className="space-y-1">
                  {edu.highlights.map((highlight, i) => (
                    <li key={i} className="text-xs text-muted-foreground flex gap-2">
                      <span className="text-primary">•</span> {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="py-20 bg-muted/30" ref={observe('achievements-section')}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12" style={{
            opacity: visibleElements.has('achievements-section') ? 1 : 0,
            transform: visibleElements.has('achievements-section') ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.6s ease-out'
          }}>
            <p className="text-primary text-sm font-semibold">Community Recognition</p>
            <h2 className="text-4xl font-bold">Infrastructure & Global Milestones</h2>
            <div className="h-1 w-16 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((achievement, idx) => (
              <div
                key={idx}
                className="group relative"
                style={{
                  opacity: visibleElements.has('achievements-section') ? 1 : 0,
                  transform: visibleElements.has('achievements-section') ? 'translateY(0)' : 'translateY(60px)',
                  transition: `all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) ${idx * 0.15}s`
                }}
              >
                {/* Animated background glow */}
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" 
                     style={{background: `linear-gradient(to right, ${achievement.color === 'from-purple-500 to-pink-500' ? 'rgba(168, 85, 247, 0.3)' : achievement.color === 'from-blue-500 to-cyan-500' ? 'rgba(59, 130, 246, 0.3)' : achievement.color === 'from-orange-500 to-yellow-500' ? 'rgba(249, 115, 22, 0.3)' : 'rgba(34, 197, 94, 0.3)'})`}}>
                </div>

                <div className="relative p-8 rounded-lg border border-border bg-card/50 backdrop-blur hover:border-primary transition-all duration-300 hover:shadow-2xl hover:scale-105 h-full">
                  {/* Badge with animation */}
                  <div className="relative mb-4 inline-block">
                    <div className="absolute inset-0 rounded-full blur-lg opacity-75 animate-pulse"
                         style={{background: achievement.color.replace('from-', 'linear-gradient(to right, ').replace(' to-', ', ') + ')'}}>
                    </div>
                    <div className="relative text-5xl group-hover:scale-125 transition-transform duration-300">{achievement.badge}</div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent group-hover:scale-105 transition-transform origin-left">{achievement.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed group-hover:text-foreground transition-colors">{achievement.description}</p>

                  {/* Decorative icon at bottom */}
                  <div className="mt-6 flex items-center justify-between">
                    <div className="w-1 h-8 bg-gradient-to-b from-primary to-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <span className="text-3xl opacity-20 group-hover:opacity-100 transition-opacity animate-bounce">{achievement.icon}</span>
                  </div>

                  {/* Border animation */}
                  <div className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-primary transition-colors duration-300 opacity-0 group-hover:opacity-100 pointer-events-none" 
                       style={{borderImage: 'linear-gradient(45deg, var(--color-primary), var(--color-accent), var(--color-primary)) 1'}}></div>
                </div>
              </div>
            ))}
          </div>

          {/* Journey Summary */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="p-8 rounded-lg border border-border bg-gradient-to-r from-primary/10 to-accent/10 backdrop-blur"
                 style={{
                   opacity: visibleElements.has('achievements-section') ? 1 : 0,
                   transform: visibleElements.has('achievements-section') ? 'translateY(0)' : 'translateY(60px)',
                   transition: 'all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) 0.6s'
                 }}>
              <h3 className="text-2xl font-bold mb-4 text-center">My Technical Journey</h3>
              <p className="text-muted-foreground leading-relaxed text-center">
                These badges aren&apos;t just icons—they are the metrics of my 8.2 average Google Search position and my status as an Infrastructure Cloud Architect. They represent a continuous validation of my expertise in architecting resilient, hyperscale systems that power global computational workflows. From surgical issue resolution to mentoring architects on the world stage, my journey reflects a commitment to excellence in cloud-native infrastructure and open-source innovation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Resume Section */}
      <section id="resume" className="py-20" ref={observe('resume-section')}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12" style={{
            opacity: visibleElements.has('resume-section') ? 1 : 0,
            transform: visibleElements.has('resume-section') ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.6s ease-out'
          }}>
            <h2 className="text-4xl font-bold">My Professional Documents</h2>
            <p className="text-muted-foreground">Check out my resume and project proposals</p>
            <div className="h-1 w-16 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
          </div>

          <div style={{
            opacity: visibleElements.has('resume-section') ? 1 : 0,
            transform: visibleElements.has('resume-section') ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.6s ease-out 0.1s'
          }}>
            <ResumeViewer />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-muted/30" ref={observe('contact-section')}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12" style={{
            opacity: visibleElements.has('contact-section') ? 1 : 0,
            transform: visibleElements.has('contact-section') ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.6s ease-out'
          }}>
            <h2 className="text-4xl font-bold">Get In Touch</h2>
            <p className="text-muted-foreground">Have a question or enquiry? I&apos;d love to hear from you!</p>
            <div className="h-1 w-16 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            {/* Contact Info */}
            <div className="space-y-6">
              <div
                className="p-6 rounded-lg border border-border bg-card/50 backdrop-blur hover:border-primary transition-all hover:scale-105 group"
                style={{
                  opacity: visibleElements.has('contact-section') ? 1 : 0,
                  transform: visibleElements.has('contact-section') ? 'translateY(0)' : 'translateY(40px)',
                  transition: 'all 0.6s ease-out'
                }}
              >
                <Mail className="w-8 h-8 text-primary mb-3 group-hover:animate-pulse" />
                <h3 className="font-bold mb-2">Email</h3>
                <a href="mailto:pratiktech28@gmail.com" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  pratiktech28@gmail.com
                </a>
              </div>

              <div
                className="p-6 rounded-lg border border-border bg-card/50 backdrop-blur hover:border-primary transition-all hover:scale-105 group"
                style={{
                  opacity: visibleElements.has('contact-section') ? 1 : 0,
                  transform: visibleElements.has('contact-section') ? 'translateY(0)' : 'translateY(40px)',
                  transition: 'all 0.6s ease-out 0.1s'
                }}
              >
                <Phone className="w-8 h-8 text-primary mb-3 group-hover:animate-pulse" />
                <h3 className="font-bold mb-2">Phone</h3>
                <a href="tel:+918273723090" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  +91 8273723090
                </a>
              </div>

              <div
                className="p-6 rounded-lg border border-border bg-card/50 backdrop-blur hover:border-primary transition-all hover:scale-105 group"
                style={{
                  opacity: visibleElements.has('contact-section') ? 1 : 0,
                  transform: visibleElements.has('contact-section') ? 'translateY(0)' : 'translateY(40px)',
                  transition: 'all 0.6s ease-out 0.2s'
                }}
              >
                <MapPin className="w-8 h-8 text-primary mb-3 group-hover:animate-pulse" />
                <h3 className="font-bold mb-2">Location</h3>
                <p className="text-muted-foreground text-sm">Indore, Madhya Pradesh, India</p>
              </div>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleFormSubmit} className="space-y-4" style={{
              opacity: visibleElements.has('contact-section') ? 1 : 0,
              transform: visibleElements.has('contact-section') ? 'translateY(0)' : 'translateY(40px)',
              transition: 'all 0.6s ease-out 0.2s'
            }}>
              <div>
                <label className="block text-sm font-medium mb-2">Your Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  placeholder="John Doe"
                  required
                  className="w-full px-4 py-2 rounded-lg bg-card border border-border focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Your Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  placeholder="john@example.com"
                  required
                  className="w-full px-4 py-2 rounded-lg bg-card border border-border focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Subject *</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleFormChange}
                  placeholder="Project Inquiry"
                  required
                  className="w-full px-4 py-2 rounded-lg bg-card border border-border focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleFormChange}
                  placeholder="I'd like to discuss..."
                  required
                  rows={5}
                  className="w-full px-4 py-2 rounded-lg bg-card border border-border focus:border-primary focus:outline-none transition-colors resize-none"
                />
              </div>

              {formMessage && (
                <div className={`p-3 rounded-lg flex items-center gap-2 ${formMessage.includes('✓') ? 'bg-green-500/10 text-green-400 border border-green-500/30' : 'bg-red-500/10 text-red-400 border border-red-500/30'}`}>
                  <AlertCircle size={18} />
                  <span className="text-sm">{formMessage}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={formSubmitting}
                className="w-full px-6 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                {formSubmitting ? 'Sending...' : 'Send Enquiry'}
              </button>
            </form>
          </div>

          {/* Social Links */}
          <div className="border-t border-border pt-12">
            <div className="text-center mb-8">
              <p className="text-muted-foreground mb-4 text-lg">Connect with me on social platforms</p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4 max-w-6xl mx-auto">
              {/* Twitter */}
              <a
                href="https://x.com/ipratik_sharma"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-lg bg-muted hover:bg-blue-500/20 hover:border-blue-500 border border-border transition-all hover:scale-110 group text-center"
                title="Twitter"
              >
                <Twitter size={24} className="mx-auto mb-2 group-hover:text-blue-400" />
                <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">Twitter</span>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/pratiktech28/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-lg bg-muted hover:bg-pink-500/20 hover:border-pink-500 border border-border transition-all hover:scale-110 group text-center"
                title="Instagram"
              >
                <Instagram size={24} className="mx-auto mb-2 group-hover:text-pink-400" />
                <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">Instagram</span>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/pratiktech28"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-lg bg-muted hover:bg-orange-500/20 hover:border-orange-500 border border-border transition-all hover:scale-110 group text-center"
                title="GitHub"
              >
                <Github size={24} className="mx-auto mb-2 group-hover:text-orange-400" />
                <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">GitHub</span>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/prateeksharma2807/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-lg bg-muted hover:bg-blue-600/20 hover:border-blue-600 border border-border transition-all hover:scale-110 group text-center"
                title="LinkedIn"
              >
                <Linkedin size={24} className="mx-auto mb-2 group-hover:text-blue-500" />
                <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">LinkedIn</span>
              </a>

              {/* Kaggle */}
              <a
                href="https://www.kaggle.com/pratiktech28"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-lg bg-muted hover:bg-blue-400/20 hover:border-blue-400 border border-border transition-all hover:scale-110 group text-center"
                title="Kaggle"
              >
                <Code2 size={24} className="mx-auto mb-2 group-hover:text-blue-300" />
                <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">Kaggle</span>
              </a>

              {/* Discord */}
              <a
                href="https://discord.com/users/pratiktech28"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-lg bg-muted hover:bg-indigo-500/20 hover:border-indigo-500 border border-border transition-all hover:scale-110 group text-center"
                title="Discord"
              >
                <Zap size={24} className="mx-auto mb-2 group-hover:text-indigo-400" />
                <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">Discord</span>
              </a>

              {/* Email */}
              <a
                href="mailto:pratiktech28@gmail.com"
                className="p-4 rounded-lg bg-muted hover:bg-red-500/20 hover:border-red-500 border border-border transition-all hover:scale-110 group text-center"
                title="Email"
              >
                <Mail size={24} className="mx-auto mb-2 group-hover:text-red-400" />
                <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">Email</span>
              </a>

              {/* Phone */}
              <a
                href="tel:+918273723090"
                className="p-4 rounded-lg bg-muted hover:bg-green-500/20 hover:border-green-500 border border-border transition-all hover:scale-110 group text-center"
                title="Phone"
              >
                <Phone size={24} className="mx-auto mb-2 group-hover:text-green-400" />
                <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">Phone</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 bg-gradient-to-b from-muted/50 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* About */}
            <div>
              <h4 className="font-bold mb-3">About</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Infrastructure Cloud Architect & GSoC 2026 Contributor. Building scalable systems with passion for open source.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold mb-3">Quick Links</h4>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li><a href="#about" className="hover:text-primary transition-colors">About</a></li>
                <li><a href="#projects" className="hover:text-primary transition-colors">Projects</a></li>
                <li><a href="#experience" className="hover:text-primary transition-colors">Experience</a></li>
                <li><a href="#contact" className="hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold mb-3">Contact</h4>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li><a href="mailto:pratiktech28@gmail.com" className="hover:text-primary transition-colors">Email</a></li>
                <li><a href="tel:+918273723090" className="hover:text-primary transition-colors">+91 8273723090</a></li>
                <li><p>Indore, Madhya Pradesh, India</p></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8 text-center text-muted-foreground">
            <p className="mb-4">Made with <span className="text-red-500 animate-pulse">❤️</span> © 2026 - Prateek Sharma</p>
            <p className="text-xs">All rights reserved. Built with Next.js & Tailwind CSS</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
