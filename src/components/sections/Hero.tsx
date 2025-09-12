'use client'

import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function Hero() {
  const t = useTranslations('common')

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          {t('hero.title')}
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          {t('hero.subtitle')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="text-lg px-8 py-6" asChild>
            <Link href="/products">
              {t('hero.cta')}
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="text-lg px-8 py-6" asChild>
            <Link href="/membership">
              Join Membership
            </Link>
          </Button>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
          <div className="text-center p-6 rounded-lg bg-white/50 backdrop-blur">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💳</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">
              {t('features.crypto.title')}
            </h3>
            <p className="text-gray-600">
              {t('features.crypto.description')}
            </p>
          </div>
          
          <div className="text-center p-6 rounded-lg bg-white/50 backdrop-blur">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🛡️</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">
              {t('features.quality.title')}
            </h3>
            <p className="text-gray-600">
              {t('features.quality.description')}
            </p>
          </div>
          
          <div className="text-center p-6 rounded-lg bg-white/50 backdrop-blur">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🚚</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">
              {t('features.shipping.title')}
            </h3>
            <p className="text-gray-600">
              {t('features.shipping.description')}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}