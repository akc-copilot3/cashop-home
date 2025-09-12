'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useLocale } from 'next-intl'

const locales = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
]

export function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const locale = useLocale()

  const switchLocale = (newLocale: string) => {
    const path = pathname.split('/').slice(2).join('/')
    router.push(`/${newLocale}${path ? `/${path}` : ''}`)
  }

  return (
    <div className="relative group">
      <button className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-accent">
        <span className="text-sm">
          {locales.find(l => l.code === locale)?.flag}
        </span>
        <span className="text-sm font-medium">
          {locales.find(l => l.code === locale)?.name}
        </span>
      </button>
      <div className="absolute right-0 top-full mt-1 bg-background border rounded-md shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="py-1">
          {locales.map((loc) => (
            <button
              key={loc.code}
              onClick={() => switchLocale(loc.code)}
              className="flex items-center space-x-2 w-full px-4 py-2 text-sm hover:bg-accent"
              disabled={loc.code === locale}
            >
              <span>{loc.flag}</span>
              <span>{loc.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}