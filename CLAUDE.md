# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the Cashop official website project - a Chinese premium brand dropshipping platform targeting overseas consumers. The project is designed as a static content website to showcase products, services, and company information with multilingual support.

## Key Architecture Concepts

### Business Model
- **Platform Focus**: Chinese premium brand dropshipping with crypto payment support
- **Target Markets**: Global consumers, particularly overseas Chinese and crypto users
- **Core Services**: Quality inspection, consolidated shipping, membership system with referral rewards
- **Payment Innovation**: USDT/USDC support via AEON payment integration

### Technical Design Philosophy
This project follows a **static-first approach** as outlined in the technical design document:
- Next.js 15 with App Router for static generation
- JSON-based data management for products, brands, and services
- Multi-language support (Chinese Simplified/Traditional, English, Japanese) via next-intl
- Component-based architecture using Shadcn/ui and Tailwind CSS

### Content Structure
The website content is organized around:
1. **Products**: Chinese brand products with multi-tier pricing (retail/member/commission)
2. **Brands**: Featured Chinese brands (Li-Ning, ANTA, Haier, Midea, etc.)
3. **Services**: Quality inspection, crypto payments, membership tiers, shipping
4. **Membership**: Three-tier system (Guest, Regular Member $9.9/month, Store Member $19.9/month)

## Development Commands

Since this is currently a documentation/planning phase with no actual code implementation:

### Planned Development Commands
```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run start           # Start production server
npm run export          # Static export for deployment

# Code Quality
npm run lint            # ESLint checking
npm run lint:fix        # Fix ESLint issues
npm run type-check      # TypeScript type checking

# Testing (when implemented)
npm run test            # Unit tests with Jest
npm run test:e2e        # E2E tests with Playwright
```

## Project Structure (Planned)

```
cashop-website/
├── app/[locale]/           # Next.js App Router with i18n
│   ├── page.tsx           # Homepage
│   ├── about/             # Company information
│   ├── products/          # Product showcase
│   ├── brands/            # Brand partnerships
│   ├── services/          # Service descriptions
│   ├── membership/        # Membership tiers
│   └── contact/           # Contact form
├── components/
│   ├── ui/                # Shadcn/ui components
│   ├── layout/            # Header, Footer, Navigation
│   ├── sections/          # Page sections (Hero, ProductShowcase, etc.)
│   └── common/            # Reusable components
├── data/                  # Static JSON data
│   ├── products.json      # Product catalog
│   ├── brands.json        # Brand information
│   ├── services.json      # Service features
│   └── site-config.json   # Site configuration
├── public/
│   ├── images/            # Static images
│   └── locales/           # Translation files
└── types/                 # TypeScript definitions
```

## Important Technical Requirements

### Internationalization (i18n)
- **Primary Markets**: Chinese (Simplified/Traditional), English, Japanese
- **URL Structure**: `/[locale]/path` format
- **Translation Files**: JSON-based in `/public/locales/`
- **SEO**: Proper hreflang and metadata for each locale

### Performance Targets
- **Core Web Vitals**: LCP < 1.5s, FID < 50ms, CLS < 0.1
- **Bundle Size**: < 100kB initial load
- **Static Generation**: Full SSG for all pages
- **CDN**: Vercel Edge Network optimization

### Content Management
All content is managed via static JSON files with multilingual support:
- Products have multi-tier pricing (retail/member/commission rates)
- Brands include categorization and featured status
- Services describe membership benefits and quality inspection process
- All text content supports 4 languages with proper fallbacks

## Key Business Logic

### Membership Pricing Logic
```typescript
// Three-tier system implementation
Guest: retail_price
Regular Member ($9.9/month): retail_price - commission
Store Member ($19.9/month): retail_price - commission + earn commission on sales
```

### Quality Inspection Service
- Free 7-photo inspection (6-sided product + packaging)
- 1 promotional video included
- Premium services available (custom photography, detailed videos)

## Development Guidelines

### Component Patterns
- Use Shadcn/ui components for consistent design system
- Implement proper TypeScript interfaces for all data structures
- Follow Next.js App Router conventions
- Ensure responsive design across all breakpoints

### Data Management
- Static JSON files for all content
- Type-safe interfaces for products, brands, services
- Multilingual content structure with locale-specific data
- Image optimization via Next.js Image component

### SEO Requirements
- Generate sitemap for all locale/page combinations
- Implement structured data for products and organization
- Optimize meta tags and Open Graph data per locale
- Ensure proper canonical URLs and hreflang tags

## Current Status

This is a **planning/documentation phase**. The actual Next.js implementation has not been started yet. The technical and product requirement documents provide the complete specification for building the static website.

## Next Steps for Implementation

1. Initialize Next.js 15 project with TypeScript and Tailwind CSS
2. Set up Shadcn/ui component library
3. Configure next-intl for multilingual support
4. Create data structures and TypeScript interfaces
5. Implement core layout components (Header, Footer, Navigation)
6. Build main page sections and content components
7. Add contact form with Resend email integration
8. Optimize for performance and SEO
9. Deploy to Vercel with proper environment configuration