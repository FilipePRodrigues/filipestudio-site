export type Theme = 'light' | 'dark'

export interface Service {
  id: string
  title: string
  description: string
  icon: string
  bullets: string[]
}

export interface Benefit {
  id: string
  title: string
  description: string
  icon: string
}

export interface ProcessStep {
  id: string
  step: string
  title: string
  description: string
}

export interface PortfolioItem {
  id: string
  category: string
  title: string
  description: string
  emoji: string
  gradient: string
}

export interface Testimonial {
  id: string
  quote: string
  name: string
  role: string
  initials: string
  avatarGradient: string
  rating: number
}

export interface PricingTier {
  id: string
  name: string
  description: string
  priceLabel: string
  priceNote: string
  featured: boolean
  features: string[]
  ctaLabel: string
}

export interface FaqItem {
  id: string
  question: string
  answer: string
}

export interface TechItem {
  id: string
  name: string
}

export interface ContactFormData {
  name: string
  email: string
  whatsapp: string
  projectType: string
  message: string
}

export type ProjectType =
  | ''
  | 'site-institucional'
  | 'landing-page'
  | 'redesign'
  | 'manutencao'
  | 'outro'
