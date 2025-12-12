'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { createPortal } from 'react-dom'
import Image from 'next/image'

const languages = [
  { code: 'zh', label: '简体中文', flag: '🇨🇳' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' }
]

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const buttonRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const pathname = usePathname()
  
  // Extract locale from pathname instead of useLocale() to avoid hydration issues
  const locale = pathname.split('/')[1] || 'zh'
  const currentLanguage = languages.find(lang => lang.code === locale)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleLanguageChange = (languageCode: string) => {
    setIsOpen(false)

    // 如果切换到日语，检查当前域名
    if (languageCode === 'ja') {
      const currentHost = window.location.hostname
      // 如果不是日本域名，则跨域重定向
      if (currentHost !== 'www.cashop.co.jp') {
        // 获取当前路径（去除语言前缀）
        const segments = pathname.split('/')
        const pathWithoutLocale = segments.slice(2).join('/')
        const targetPath = pathWithoutLocale ? `/ja/${pathWithoutLocale}` : '/ja'
        window.location.href = `https://www.cashop.co.jp${targetPath}`
        return
      }
    }

    // 正常的路由切换逻辑
    const segments = pathname.split('/')
    segments[1] = languageCode
    const newPath = segments.join('/')

    router.push(newPath)
  }

  const DropdownMenu = () => {
    if (!isOpen || !buttonRef.current) return null
    
    const rect = buttonRef.current.getBoundingClientRect()
    const dropdownStyle = {
      position: 'fixed' as const,
      top: rect.bottom + window.scrollY + 8,
      left: rect.left + window.scrollX,
      zIndex: 9999,
    }

    return (
      <div 
        ref={dropdownRef}
        className="bg-white shadow-xl border border-gray-200 rounded-lg overflow-hidden min-w-[160px]"
        style={dropdownStyle}
      >
        {languages.map((language) => (
          <div
            key={language.code}
            className={`flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors whitespace-nowrap ${
              language.code === locale ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
            }`}
            onClick={() => handleLanguageChange(language.code)}
          >
            <span className="text-lg">{language.flag}</span>
            <span className="text-sm font-medium flex-1">{language.label}</span>
            {language.code === locale && (
              <span className="text-blue-600 text-lg">✓</span>
            )}
          </div>
        ))}
      </div>
    )
  }

  return (
    <>
      {/* Language Switcher Button */}
      <div 
        ref={buttonRef}
        className="flex gap-2 items-center justify-start overflow-hidden cursor-pointer hover:bg-[rgba(255,255,255,0.1)] px-2 py-1 rounded transition-colors" 
        data-name="语言切换"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="relative w-[26px] h-[26px]" data-name="icon">
          <Image alt="Language" width={26} height={26} className="w-full h-full object-contain" src="/images/language-icon.svg" />
        </div>
        <div className="flex gap-1 items-center justify-start overflow-hidden" data-name="容器 7">
          <div className="font-normal leading-[0] not-italic relative text-[14px] text-[#222222] text-center text-nowrap" style={{ fontFamily: "'PingFang SC:Regular', sans-serif" }}>
            <p className="leading-[20px] whitespace-pre">{currentLanguage?.label || '简体中文'}</p>
          </div>
          <div className={`relative w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} data-name="箭头收起">
            <Image alt="Chevron Down" width={12} height={12} className="w-full h-full object-contain" src="/images/chevron-down.svg" />
          </div>
        </div>
      </div>

      {/* Render dropdown via portal to document.body to avoid clipping */}
      {mounted && isOpen && createPortal(<DropdownMenu />, document.body)}
    </>
  )
}
