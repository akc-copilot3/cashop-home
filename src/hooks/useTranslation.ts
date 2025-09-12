'use client'

import { usePathname } from 'next/navigation'
import { translations, type Locale } from '@/lib/translations'

export function useTranslation() {
  const pathname = usePathname()
  
  // Extract locale from pathname (e.g., /zh/some-path -> zh)
  const locale = (pathname.split('/')[1] as Locale) || 'en'
  
  // Ensure we have a valid locale
  const currentLocale: Locale = ['en', 'zh', 'ja'].includes(locale) ? locale : 'en'
  
  const t = translations[currentLocale]
  
  return { t, locale: currentLocale }
}