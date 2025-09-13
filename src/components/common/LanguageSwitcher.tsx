'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useLocale } from 'next-intl'
import { ChevronDown } from 'lucide-react'

const locales = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
]

export function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const locale = useLocale()

  const switchLocale = async (newLocale: string) => {
    // 设置语言 cookie
    document.cookie = `locale=${newLocale}; path=/; max-age=${365 * 24 * 60 * 60}`
    
    // 提取当前路径，去除语言前缀
    const pathSegments = pathname.split('/')
    const currentLocale = pathSegments[1]
    const pathWithoutLocale = pathSegments.slice(2).join('/')
    
    // 构建新的路径
    const newPath = `/${newLocale}${pathWithoutLocale ? `/${pathWithoutLocale}` : ''}`
    
    // 导航到新的路径
    router.push(newPath)
    router.refresh()
  }

  const currentLocale = locales.find(l => l.code === locale)

  return (
    <div className="relative group">
      <button className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-accent transition-colors">
        <span className="text-sm">
          {currentLocale?.flag}
        </span>
        <span className="text-sm font-medium">
          {currentLocale?.name}
        </span>
        <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />
      </button>
      <div className="absolute right-0 top-full mt-1 bg-background border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 min-w-[120px]">
        <div className="py-1">
          {locales.map((loc) => (
            <button
              key={loc.code}
              onClick={() => switchLocale(loc.code)}
              className={`flex items-center space-x-2 w-full px-4 py-2 text-sm hover:bg-accent transition-colors ${
                loc.code === locale ? 'bg-accent/50 cursor-default' : ''
              }`}
              disabled={loc.code === locale}
            >
              <span>{loc.flag}</span>
              <span>{loc.name}</span>
              {loc.code === locale && (
                <span className="ml-auto text-xs text-muted-foreground">✓</span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}