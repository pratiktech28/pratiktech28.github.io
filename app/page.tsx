'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Menu, X, ChevronDown, Github, Linkedin, Mail, Phone, MapPin, ExternalLink, Download, Code2, Zap, Twitter, Instagram, Send, AlertCircle } from 'lucide-react'

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

  const observe = (id: string) => {
    return (el: HTMLElement | null) => {
      if (el) {
        el.id = id
        observerRef.current?.observe(el)
      }
    }
  }

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

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <div className="fixed top-0 left-0 h-1 bg-gradient-to-r from-primary to-accent z-50 transition-all duration-300" style={{ width: `${scrollProgress}%` }} />

      <nav className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-border pt-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Prateek Sharma</h1>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {['Home', 'Projects', 'Contact'].map((item) => (
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
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mx-auto">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span className="text-sm text-primary font-medium">GSoC '26 Contributor</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                Hi, I'm <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Prateek Sharma</span>
              </h1>
              <p className="text-xl md:text-2xl font-semibold text-primary max-w-3xl mx-auto">
                MLOps Engineer | LLM Deployment & Kubernetes Orchestration | Project's Showcase Portfolio
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground max-w-2xl mx-auto">
                Specializing in high-scale infrastructure, container orchestration, and automated simulation testing.
              </p>
              <div className="flex justify-center gap-4 pt-4">
                <button onClick={() => scrollToSection('projects')} className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:scale-105 transition-all">
                  View Projects
                </button>
                <button onClick={() => scrollToSection('contact')} className="px-8 py-3 border border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors">
                  Contact
                </button>
              </div>
            </div>
        </div>
      </section>

      <section id="projects" className="py-20 bg-muted/30" ref={observe('projects-section')}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-4xl font-bold">GSoC & Infrastructure Repositories</h2>
            <div className="h-1 w-16 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gsocProjects.map((project, idx) => (
              <a key={idx} href={project.link} target="_blank" rel="noopener noreferrer" className="group relative p-6 rounded-lg border border-border bg-card/50 backdrop-blur hover:border-primary transition-all duration-300 hover:-translate-y-2 block">
                <div className="absolute top-0 left-0 w-0 h-1 bg-gradient-to-r from-primary to-accent rounded-t-lg group-hover:w-full transition-all duration-500"></div>
                <Github size={24} className="text-primary mb-4" />
                <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 h-20 overflow-hidden">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="px-2 py-1 rounded-md bg-primary/10 text-[10px] font-bold text-primary uppercase">{tag}</span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20" ref={observe('contact-section')}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-8">Let's Connect</h2>
          <div className="flex justify-center gap-8 flex-wrap">
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
        <p>© 2026 - Prateek Sharma | MLOps Showcase</p>
      </footer>
    </div>
  )
}
