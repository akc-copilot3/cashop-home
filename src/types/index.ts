export interface Product {
  id: string
  name: {
    en: string
    zh: string
    ja: string
  }
  description: {
    en: string
    zh: string
    ja: string
  }
  price: {
    retail: number
    member: number
    commission: number
  }
  brand: string
  category: string
  images: string[]
  featured: boolean
}

export interface Brand {
  id: string
  name: string
  logo: string
  description: {
    en: string
    zh: string
    ja: string
  }
  category: string
  featured: boolean
  website?: string
}

export interface MembershipTier {
  id: string
  name: {
    en: string
    zh: string
    ja: string
  }
  price: number | { monthly: number; annual: number }
  benefits: Array<{
    en: string
    zh: string
    ja: string
  }>
}

export interface ServiceFeature {
  id: string
  name: {
    en: string
    zh: string
    ja: string
  }
  description: {
    en: string
    zh: string
    ja: string
  }
  icon: string
}

export interface Service {
  membership: {
    tiers: MembershipTier[]
  }
  features: ServiceFeature[]
}

export interface SiteConfig {
  name: string
  description: string
  url: string
  ogImage: string
  links: {
    twitter: string
    github: string
  }
}

export type Locale = 'en' | 'zh' | 'ja'