'use client'

import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { LanguageSwitcher } from '@/components/common/LanguageSwitcher'

export function Header() {
  const t = useTranslations('common')

  return (
    <header className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-2xl font-bold text-primary">
              Cashop
            </Link>
            <nav className="hidden md:flex space-x-6">
              <Link 
                href="/" 
                className="text-foreground hover:text-primary transition-colors"
              >
                {t('navigation.home')}
              </Link>
              <Link 
                href="/products" 
                className="text-foreground hover:text-primary transition-colors"
              >
                {t('navigation.products')}
              </Link>
              <Link 
                href="/brands" 
                className="text-foreground hover:text-primary transition-colors"
              >
                {t('navigation.brands')}
              </Link>
              <Link 
                href="/services" 
                className="text-foreground hover:text-primary transition-colors"
              >
                {t('navigation.services')}
              </Link>
              <Link 
                href="/membership" 
                className="text-foreground hover:text-primary transition-colors"
              >
                {t('navigation.membership')}
              </Link>
              <Link 
                href="/about" 
                className="text-foreground hover:text-primary transition-colors"
              >
                {t('navigation.about')}
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            <Button asChild>
              <Link href="/contact">
                {t('navigation.contact')}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}