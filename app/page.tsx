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

      if (response.ok) {
        setFormMessage('✓ Your enquiry has been sent successfully!')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setFormMessage('✗ Failed to send enquiry. Please try again.')
      }
    } catch (error) {
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
      title: 'Infrastructure & DevOps',
      description: 'Container orchestration and cloud platforms',
      items: ['Docker', 'Kubernetes', 'CI/CD', 'GitHub Actions', 'MLOps']
    },
    {
      title: 'Programming & LLM',
      description: 'Core development and AI deployment',
      items: ['Python', 'Golang', 'LLM Deployment', 'REST APIs']
    },
    {
      title: 'Database & Simulation',
      description: 'Data management and physics testing',
      items: ['MySQL', 'MongoDB', 'Physics Simulation', 'Regression Testing']
    }
  ]

  // Bhai, tere saare links yahan properly tags ke sath add kar diye hain
  const gsocProjects = [
    {
      title: 'gprMax Containerized Infrastructure',
      description: 'End-to-end Dockerization of physics-driven simulation engines for cloud-native deployment.',
      tags: ['Docker', 'Infrastructure', 'Simulation'],
      link: 'https://github.com/pratiktech28/gprmax_Containerized.git'
    },
    {
      title: 'GSoC Worker Automation',
      description: 'Automated task distribution and worker management system for high-scale GSoC project tasks.',
      tags: ['CI/CD', 'Automation', 'Workflow'],
      link: 'https://github.com/pratiktech28/gsoc_worke.git'
    },
    {
      title: 'KubeSim: Kubernetes Physics Simulations',
      description: 'Large-scale simulation orchestration using Kubernetes clusters (GKE/EKS) for massive parallel processing.',
      tags: ['Kubernetes', 'Scalability', 'K8s'],
      link: 'https://github.com/pratiktech28/gprmax_kuber_simulations.git'
    },
    {
      title: 'A-Scan Signal Processing',
      description: 'Real-time data visualization and processing unit for GPR simulation output.',
      tags: ['Data Viz', 'Python', 'Signal Processing'],
      link: 'https://github.com/pratiktech28/gprmax_Ascan.git'
    },
    {
      title: 'Integration Testing Framework',
      description: 'Automated regression and integration testing suite ensuring 99% accuracy in simulation updates.',
      tags: ['Testing', 'QA', 'Python'],
      link: 'https://github.com/pratiktech28/gprmax_integration_test.git'
    },
    {
      title: 'Material Property Validation',
      description: 'System for checking and validating physical material properties within containerized environments.',
      tags: ['Validation', 'Physics', 'Backend'],
      link: 'https://github.com/pratiktech28/gprmax_material_property_check.git'
    },
    {
      title: 'Geometry Validation Suite',
      description: 'Automated geometry checks for complex GPR models before simulation execution.',
      tags: ['Geometry', 'Automation', 'Infrastructure'],
      link: 'https://github.com/pratiktech28/gprmax_geometry_check.git'
    }
  ]

  const stats = [
    { label: 'Critical Errors Fixed', value: '30+', icon: '🔧' },
    { label: 'Open Source Orgs', value: '3', icon: '⭐' },
    { label: 'GSoC Projects', value: '7', icon: '🎯' }
  ]

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <div className="fixed top-0 left-0 h-1 bg-gradient-to-r from-primary to-accent z-50 transition-all duration-300" style={{ width: `${scrollProgress}%` }} />

      <nav className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-border pt-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Prateek Sharma</h1>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {['Home', 'About', 'Skills', 'Experience', 'Projects', 'Contact'].map((item) => (
                  <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeSection === item.toLowerCase() ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-muted'}`}>
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <section id="home" className="min-h-screen pt-24 pb-12 flex items-center justify-center relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span className="text-sm text-primary font-medium">GSoC '26 Contributor</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Hi, I'm <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Prateek Sharma</span>
              </h1>
              {/* Bhai, headline yahan change kar di h jo tune mangi thi */}
              <p className="text-xl font-semibold text-primary">
                MLOps Engineer | LLM Deployment & Kubernetes Orchestration | Project's Showcase Portfolio
              </p>
              <p className="text-base leading-relaxed text-muted-foreground">
                Architecting high-availability distributed systems. Expert in Kubernetes orchestration, LLM deployment strategies, and automated regression testing via Keploy.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button onClick={() => scrollToSection('projects')} className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:scale-105 transition-all">
                  View GSoC Repos
                </button>
                <button onClick={() => scrollToSection('contact')} className="px-8 py-3 border border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors">
                  Contact Me
                </button>
              </div>
            </div>
            <div className="relative flex justify-center items-center">
              <div className="relative w-64 h-64 md:w-80 md:h-80">
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-full opacity-20 blur-2xl animate-pulse"></div>
                <div className="absolute inset-0 rounded-full overflow-hidden flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
                  <Image src="/profile.jpg" alt="Prateek Sharma" width={288} height={288} className="w-56 h-56 md:w-72 md:h-72 rounded-full object-cover" priority />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section - GSoC Specific */}
      <section id="projects" className="py-20 bg-muted/30" ref={observe('projects-section')}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-4xl font-bold">GSoC & Infrastructure Repositories</h2>
            <div className="h-1 w-16 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
            <p className="text-muted-foreground max-w-2xl mx-auto">Verified engineering contributions to global open-source infrastructure and MLOps automation.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gsocProjects.map((project, idx) => (
              <a 
                key={idx} 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative p-6 rounded-lg border border-border bg-card/50 backdrop-blur hover:border-primary transition-all duration-300 hover:-translate-y-2 hover:shadow-xl block"
              >
                <div className="absolute top-0 left-0 w-0 h-1 bg-gradient-to-r from-primary to-accent rounded-t-lg group-hover:w-full transition-all duration-500"></div>
                <div className="flex justify-between items-start mb-4">
                  <Github size={24} className="text-primary" />
                  <ExternalLink size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 h-20 overflow-hidden">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="px-2 py-1 rounded-md bg-primary/10 text-[10px] font-bold text-primary uppercase tracking-wider">{tag}</span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Simplified Contact */}
      <section id="contact" className="py-20" ref={observe('contact-section')}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-8">Let's Build Something Scalable</h2>
          <div className="flex flex-wrap justify-center gap-6">
             <a href="https://github.com/pratiktech28" className="flex items-center gap-2 p-4 bg-muted rounded-lg hover:bg-primary hover:text-primary-foreground transition-all">
               <Github size={24} /> <span>GitHub</span>
             </a>
             <a href="https://www.linkedin.com/in/prateeksharma2807/" className="flex items-center gap-2 p-4 bg-muted rounded-lg hover:bg-primary hover:text-primary-foreground transition-all">
               <Linkedin size={24} /> <span>LinkedIn</span>
             </a>
             <a href="mailto:pratiktech28@gmail.com" className="flex items-center gap-2 p-4 bg-muted rounded-lg hover:bg-primary hover:text-primary-foreground transition-all">
               <Mail size={24} /> <span>Email</span>
             </a>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-border text-center text-muted-foreground text-sm">
        <p>© 2026 - Prateek Sharma | Built with Next.js & Tailwind</p>
      </footer>
    </div>
  )
}
