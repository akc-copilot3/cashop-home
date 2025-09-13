import createMiddleware from 'next-intl/middleware'
import { locales } from './i18n'
import { NextRequest } from 'next/server'

const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: locales,
  
  // Used when no locale matches
  defaultLocale: 'zh',
  
  // Detect user's preferred language from Accept-Language header
  localeDetection: true
})

export default function middleware(request: NextRequest) {
  // Get the Accept-Language header to detect user's preferred language
  const acceptLanguage = request.headers.get('accept-language') || ''
  
  // Simple language detection logic
  const getUserPreferredLocale = (acceptLanguage: string): string => {
    // Parse Accept-Language header
    const languages = acceptLanguage
      .split(',')
      .map(lang => lang.split(';')[0].trim().toLowerCase())
    
    // Check for exact matches first
    for (const lang of languages) {
      if (locales.includes(lang as any)) {
        return lang
      }
    }
    
    // Check for language family matches (e.g., zh-CN -> zh)
    for (const lang of languages) {
      const languageFamily = lang.split('-')[0]
      if (locales.includes(languageFamily as any)) {
        return languageFamily
      }
    }
    
    // Default fallback
    return 'zh'
  }
  
  // Only apply custom locale detection for root path
  if (request.nextUrl.pathname === '/') {
    const preferredLocale = getUserPreferredLocale(acceptLanguage)
    const url = request.nextUrl.clone()
    url.pathname = `/${preferredLocale}`
    return Response.redirect(url)
  }
  
  // Use next-intl middleware for all other paths
  return intlMiddleware(request)
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(zh|en|ja)/:path*']
}