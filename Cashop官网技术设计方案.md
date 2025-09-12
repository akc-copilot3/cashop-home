# Cashop官网技术设计方案 (静态内容展示版)

## 1. 技术栈总览

### 1.1 核心技术栈 (简化版)
```
Next.js 15 (React 18)
├── TypeScript               # 类型安全
├── Tailwind CSS            # 原子化CSS框架
├── Shadcn/ui               # 高质量UI组件库
├── Framer Motion           # 动画库
├── next-intl               # 国际化
├── Lucide React           # 图标库
└── React Hook Form + Zod   # 联系表单验证
```

### 1.2 内容管理
```
静态内容
├── JSON/YAML 数据文件      # 产品、品牌信息
├── Markdown 内容          # 文章、介绍页面  
├── 静态图片资源            # 产品图片、Logo
└── 多语言翻译文件          # i18n
```

### 1.3 基础设施 (轻量化)
```
Vercel                     # 部署平台 + CDN
├── Cloudinary             # 图片优化和存储
├── Resend                 # 邮件服务 (联系表单)
└── Vercel Analytics       # 网站分析
```

## 2. 项目架构设计

### 2.1 应用架构 (静态内容版)
```
┌─────────────────────┐
│   Vercel CDN        │
│  (全球边缘节点)      │
└─────────┬───────────┘
          │
┌─────────▼───────────┐
│   Next.js 15 App    │
│  (静态生成 + SSG)    │
│                     │
│  ├─ 静态页面         │
│  ├─ 产品数据(JSON)   │
│  ├─ 品牌信息        │
│  └─ 多语言内容      │
└─────────┬───────────┘
          │
┌─────────▼───────────┐    ┌─────────────────┐
│   Cloudinary        │    │   Resend        │
│   (图片CDN)         │    │   (联系表单)     │
└─────────────────────┘    └─────────────────┘
```

### 2.2 目录结构 (静态内容版)
```
cashop-website/
├── app/                          # Next.js 15 App Router
│   ├── [locale]/                 # 国际化路由
│   │   ├── page.tsx              # 首页
│   │   ├── about/                # 关于我们
│   │   ├── products/             # 产品展示
│   │   ├── brands/               # 合作品牌
│   │   ├── services/             # 服务介绍
│   │   ├── membership/           # 会员体系
│   │   ├── contact/              # 联系我们
│   │   ├── globals.css
│   │   └── layout.tsx
│   ├── api/                      # 简单API路由
│   │   └── contact/route.ts      # 联系表单提交
│   └── sitemap.ts                # 自动生成sitemap
├── components/                   # 通用组件
│   ├── ui/                       # Shadcn/ui组件
│   ├── layout/                   # 布局组件
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Navigation.tsx
│   ├── sections/                 # 页面区块组件
│   │   ├── Hero.tsx              # 首页Banner
│   │   ├── ProductShowcase.tsx   # 产品展示
│   │   ├── BrandSection.tsx      # 品牌展示
│   │   ├── ServiceFeatures.tsx   # 服务特色
│   │   └── ContactForm.tsx       # 联系表单
│   └── common/                   # 通用组件
├── data/                         # 静态数据文件
│   ├── products.json             # 产品数据
│   ├── brands.json               # 品牌信息
│   ├── services.json             # 服务信息
│   └── site-config.json          # 站点配置
├── lib/                          # 工具库
│   ├── utils.ts                  # 工具函数
│   ├── validations.ts            # Zod schemas
│   ├── email.ts                  # 邮件服务
│   └── data.ts                   # 数据获取函数
├── public/                       # 静态资源
│   ├── images/                   # 图片资源
│   │   ├── products/             # 产品图片
│   │   ├── brands/               # 品牌Logo
│   │   └── hero/                 # 首页Banner
│   ├── icons/                    # 图标
│   └── locales/                  # 国际化文件
│       ├── en/                   # 英文翻译
│       ├── zh/                   # 中文翻译
│       └── ja/                   # 日文翻译
├── types/                        # TypeScript类型定义
│   ├── global.d.ts
│   ├── products.ts
│   └── site.ts
├── middleware.ts                 # Next.js中间件 (i18n)
├── next.config.js               # Next.js配置
├── tailwind.config.ts           # Tailwind配置
├── components.json              # Shadcn/ui配置
└── package.json
```

## 3. 静态数据设计

### 3.1 产品数据结构
```typescript
// data/products.json
{
  "categories": [
    {
      "id": "electronics",
      "name": {
        "en": "Electronics",
        "zh": "电子产品",
        "ja": "電子製品"
      }
    }
  ],
  "products": [
    {
      "id": "product-001",
      "name": {
        "en": "Li-Ning Basketball Shoes",
        "zh": "李宁篮球鞋",
        "ja": "リーニンバスケットボールシューズ"
      },
      "description": {
        "en": "High-performance basketball shoes with advanced cushioning",
        "zh": "具有先进缓震技术的高性能篮球鞋",
        "ja": "先進的なクッション技術を搭載した高性能バスケットボールシューズ"
      },
      "price": {
        "retail": 89.99,
        "member": 67.49,
        "commission": 22.50
      },
      "brand": "li-ning",
      "category": "sports",
      "images": [
        "/images/products/li-ning-shoes-1.jpg",
        "/images/products/li-ning-shoes-2.jpg"
      ],
      "featured": true
    }
  ]
}
```

### 3.2 品牌数据结构
```typescript
// data/brands.json
{
  "brands": [
    {
      "id": "li-ning",
      "name": "李宁 LI-NING",
      "logo": "/images/brands/li-ning.png",
      "description": {
        "en": "Leading Chinese sports brand",
        "zh": "中国领先的体育用品品牌",
        "ja": "中国を代表するスポーツブランド"
      },
      "category": "sports",
      "featured": true,
      "website": "https://www.li-ning.com"
    },
    {
      "id": "anta",
      "name": "安踏 ANTA",
      "logo": "/images/brands/anta.png",
      "description": {
        "en": "Professional sports equipment manufacturer",
        "zh": "专业运动装备制造商",
        "ja": "プロフェッショナルスポーツ機器メーカー"
      },
      "category": "sports",
      "featured": true
    }
  ]
}
```

### 3.3 服务信息数据
```typescript
// data/services.json
{
  "membership": {
    "tiers": [
      {
        "id": "guest",
        "name": {
          "en": "Guest User",
          "zh": "普通用户",
          "ja": "一般ユーザー"
        },
        "price": 0,
        "benefits": [
          {
            "en": "Browse all products",
            "zh": "浏览所有商品",
            "ja": "全商品閲覧"
          }
        ]
      },
      {
        "id": "regular",
        "name": {
          "en": "Regular Member",
          "zh": "普通会员",
          "ja": "通常会員"
        },
        "price": {
          "monthly": 9.9,
          "annual": 99.9
        },
        "benefits": [
          {
            "en": "Member discount prices",
            "zh": "享受会员价格",
            "ja": "会員割引価格"
          },
          {
            "en": "Referral rewards",
            "zh": "推荐奖励",
            "ja": "紹介報酬"
          }
        ]
      }
    ]
  },
  "features": [
    {
      "id": "quality-check",
      "name": {
        "en": "Quality Inspection",
        "zh": "质检服务",
        "ja": "品質検査"
      },
      "description": {
        "en": "Free 7-photo quality inspection with video",
        "zh": "免费7张图片质检服务及视频",
        "ja": "無料7枚写真品質検査とビデオ"
      },
      "icon": "shield-check"
    },
    {
      "id": "crypto-payment",
      "name": {
        "en": "Crypto Payment",
        "zh": "加密货币支付",
        "ja": "暗号通貨決済"
      },
      "description": {
        "en": "Support USDT, USDC and other cryptocurrencies",
        "zh": "支持USDT、USDC等加密货币",
        "ja": "USDT、USDCなどの暗号通貨をサポート"
      },
      "icon": "coins"
    }
  ]
}
```

## 4. 简单API设计 (联系表单)

### 4.1 联系表单API
```typescript
// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  locale: z.enum(['en', 'zh', 'ja']).default('en')
})

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const validatedData = contactSchema.parse(data)
    
    const resend = new Resend(process.env.RESEND_API_KEY)
    
    await resend.emails.send({
      from: 'contact@cashop.com',
      to: 'support@cashop.com',
      subject: `Contact Form: ${validatedData.subject}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${validatedData.name}</p>
        <p><strong>Email:</strong> ${validatedData.email}</p>
        <p><strong>Language:</strong> ${validatedData.locale}</p>
        <p><strong>Subject:</strong> ${validatedData.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${validatedData.message}</p>
      `
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}
```

## 5. 静态内容管理

### 5.1 数据获取函数
```typescript
// lib/data.ts
import { Product, Brand, Service } from '@/types'

export async function getProducts(locale: string = 'en'): Promise<Product[]> {
  const products = await import('@/data/products.json')
  return products.products || []
}

export async function getFeaturedProducts(locale: string = 'en'): Promise<Product[]> {
  const products = await getProducts(locale)
  return products.filter(product => product.featured)
}

export async function getBrands(locale: string = 'en'): Promise<Brand[]> {
  const brands = await import('@/data/brands.json')
  return brands.brands || []
}

export async function getFeaturedBrands(locale: string = 'en'): Promise<Brand[]> {
  const brands = await getBrands(locale)
  return brands.filter(brand => brand.featured)
}

export async function getServices(locale: string = 'en'): Promise<Service> {
  const services = await import('@/data/services.json')
  return services.default || {}
}

export async function getSiteConfig() {
  const config = await import('@/data/site-config.json')
  return config.default
}
```

### 5.2 TypeScript 类型定义
```typescript
// types/products.ts
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

export interface Service {
  membership: {
    tiers: MembershipTier[]
  }
  features: ServiceFeature[]
}

export interface MembershipTier {
  id: string
  name: {
    en: string
    zh: string
    ja: string
  }
  price: number | { monthly: number; annual: number }
  benefits: {
    en: string
    zh: string
    ja: string
  }[]
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
```

## 6. 国际化方案

### 6.1 next-intl 配置
```typescript
// middleware.ts
import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  locales: ['en', 'zh', 'ja'],
  defaultLocale: 'en',
  localePrefix: 'always'
})

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
}
```

### 6.2 消息文件结构
```
public/locales/
├── en/
│   ├── common.json          # 通用翻译
│   ├── navigation.json      # 导航翻译
│   ├── products.json        # 产品页面
│   └── membership.json      # 会员页面
├── zh/
│   └── ... (同上)
└── ja/
    └── ... (同上)
```

## 7. 性能优化策略

### 7.1 Next.js 性能优化
```typescript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',                 // 静态导出
  trailingSlash: true,             // 兼容静态托管
  images: {
    unoptimized: true,             // 静态导出兼容
  },
  experimental: {
    ppr: true,                     // Partial Prerendering
    reactCompiler: true,           // React编译器
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  }
}
```

### 7.2 静态生成策略
```typescript
// 所有页面使用静态生成 (SSG)
export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'zh' }, 
    { locale: 'ja' }
  ]
}

// 构建时生成所有静态内容
export async function generateMetadata({ params }) {
  const { locale } = params
  // 从静态数据生成元数据
}
```

### 7.3 图片优化
```typescript
// components/OptimizedImage.tsx
import { Image } from 'next/image'
import { cn } from '@/lib/utils'

export function OptimizedImage({
  src,
  alt,
  className,
  ...props
}: {
  src: string
  alt: string
  className?: string
  [key: string]: any
}) {
  return (
    <Image
      src={src}
      alt={alt}
      className={cn('transition-opacity duration-300', className)}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ..."
      loading="lazy"
      unoptimized // 静态导出兼容
      {...props}
    />
  )
}
```

## 8. SEO 优化方案

### 8.1 元数据管理
```typescript
// app/[locale]/layout.tsx
import { Metadata } from 'next'

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta' })
  
  return {
    title: {
      template: '%s | Cashop',
      default: t('title')
    },
    description: t('description'),
    keywords: t('keywords').split(','),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: 'https://cashop.com',
      siteName: 'Cashop',
      type: 'website',
      locale,
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}
```

### 8.2 结构化数据
```typescript
// lib/structured-data.ts
export function generateProductLD(product: Product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    brand: {
      '@type': 'Brand',
      name: product.brand
    },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock'
    }
  }
}
```

## 9. 简单安全措施

### 9.1 表单验证安全
```typescript
// lib/validations.ts
import { z } from 'zod'

export const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(1, 'Subject is required').max(200, 'Subject too long'),
  message: z.string().min(10, 'Message too short').max(1000, 'Message too long'),
  locale: z.enum(['en', 'zh', 'ja']).default('en')
})

// 简单的反垃圾邮件检查
export function isSpam(message: string): boolean {
  const spamKeywords = ['viagra', 'casino', 'lottery', 'winner']
  return spamKeywords.some(keyword => 
    message.toLowerCase().includes(keyword)
  )
}
```

### 9.2 环境变量保护
```typescript
// lib/env.ts
import { z } from 'zod'

const envSchema = z.object({
  RESEND_API_KEY: z.string().min(1, 'Resend API key is required'),
  CONTACT_EMAIL: z.string().email('Valid contact email required'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development')
})

export const env = envSchema.parse(process.env)
```

## 10. 测试策略

### 10.1 单元测试 (Jest + Testing Library)
```typescript
// __tests__/components/ProductCard.test.tsx
import { render, screen } from '@testing-library/react'
import { ProductCard } from '@/components/ProductCard'

describe('ProductCard', () => {
  const mockProduct = {
    id: '1',
    name: 'Test Product',
    price: 99.99,
    image: '/test-image.jpg'
  }

  it('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} />)
    
    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('$99.99')).toBeInTheDocument()
  })
})
```

### 10.2 E2E 测试 (Playwright)
```typescript
// tests/e2e/purchase-flow.spec.ts
import { test, expect } from '@playwright/test'

test('complete purchase flow', async ({ page }) => {
  await page.goto('/products/1')
  await page.click('[data-testid="add-to-cart"]')
  await page.goto('/checkout')
  
  // 填写支付信息
  await page.fill('[name="email"]', 'test@example.com')
  
  // 验证支付页面
  await expect(page.locator('[data-testid="payment-form"]')).toBeVisible()
})
```

## 11. 部署配置 (静态网站)

### 11.1 Vercel 部署配置
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ],
  "env": {
    "RESEND_API_KEY": "@resend-api-key",
    "CONTACT_EMAIL": "@contact-email"
  },
  "regions": ["sfo1", "hnd1", "fra1"],
  "functions": {
    "app/api/contact/route.ts": {
      "maxDuration": 10
    }
  }
}
```

### 11.2 环境变量 (简化版)
```bash
# .env.local (开发环境)
RESEND_API_KEY="re_xxxxxxxxx"
CONTACT_EMAIL="support@cashop.com"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# .env.production (生产环境)
RESEND_API_KEY="re_xxxxxxxxx"
CONTACT_EMAIL="support@cashop.com"
NEXT_PUBLIC_APP_URL="https://cashop.com"
```

### 11.3 构建脚本
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "export": "next build && next export",
    "lint": "next lint",
    "type-check": "tsc --noEmit"
  }
}
```

## 12. 分析与监控 (静态网站)

### 12.1 网站分析
```typescript
// lib/analytics.ts (Google Analytics 4)
import Script from 'next/script'

export function GoogleAnalytics() {
  return (
    <>
      <Script 
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
        `}
      </Script>
    </>
  )
}
```

### 12.2 轻量化监控工具
- **Vercel Analytics**: 页面性能监控 
- **Google Analytics 4**: 用户行为分析
- **Google Search Console**: SEO监控
- **PageSpeed Insights**: 页面速度分析

## 13. 开发流程

### 13.1 Git 工作流
```
main (生产环境)
├── develop (开发环境)
└── feature/* (功能分支)
```

### 13.2 代码质量检查
```json
// package.json scripts
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "type-check": "tsc --noEmit",
    "test": "jest",
    "test:e2e": "playwright test",
    "db:push": "prisma db push",
    "db:migrate": "prisma migrate dev",
    "db:seed": "tsx prisma/seed.ts"
  }
}
```

### 13.3 CI/CD Pipeline (GitHub Actions)
```yaml
# .github/workflows/ci.yml
name: CI/CD
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm run test
      - run: npm run build
```

## 14. 性能目标 (静态网站优化)

### 14.1 Core Web Vitals 目标
- **LCP** (Largest Contentful Paint): < 1.5s (静态网站优势)
- **FID** (First Input Delay): < 50ms
- **CLS** (Cumulative Layout Shift): < 0.1
- **TTFB** (Time to First Byte): < 300ms (CDN加速)

### 14.2 静态网站优化目标
- **总包大小**: < 100kB (首次加载)
- **图片优化**: WebP/AVIF格式，响应式尺寸
- **字体优化**: 系统字体优先，按需加载
- **代码分割**: 路由级别自动分割

## 15. 项目里程碑

### 15.1 开发阶段 (3-4周)
**第1周**:
- 项目初始化和基础架构搭建
- 设计系统和UI组件库
- 国际化配置

**第2周**:
- 静态数据结构设计
- 主要页面组件开发
- 响应式布局实现

**第3周**:
- 内容填充和图片优化
- SEO优化和元数据配置
- 联系表单功能

**第4周**:
- 测试和性能优化
- 多语言内容完善
- 部署和域名配置

### 15.2 预计工作量
- **前端开发**: 2-3周
- **内容整理**: 1周
- **测试优化**: 1周
- **总计**: 4周 (比原方案减少50%工作量)

---

**文档版本**: V2.0 (静态内容版)  
**创建日期**: 2025年8月26日  
**更新日期**: 2025年8月26日  
**技术负责人**: 开发团队  
**预计开发周期**: 3-4周  

此简化技术方案专注于静态内容展示，去除了复杂的后端功能，大幅缩短开发周期，确保快速上线。