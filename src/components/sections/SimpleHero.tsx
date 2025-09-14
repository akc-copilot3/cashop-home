'use client'

import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function SimpleHero() {
  const t = useTranslations('common')

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          China Top Brands Worldwide
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Discover authentic Chinese brands with crypto payment support
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="text-lg px-8 py-6">
            Start Shopping
          </Button>
          <Button size="lg" variant="outline" className="text-lg px-8 py-6">
            Join Membership
          </Button>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
          <div className="text-center p-6 rounded-lg bg-white/50 backdrop-blur">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💳</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">
              Crypto Payment
            </h3>
            <p className="text-gray-600">
              Support USDT, USDC and other cryptocurrencies
            </p>
          </div>
          
          <div className="text-center p-6 rounded-lg bg-white/50 backdrop-blur">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🛡️</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">
              Quality Inspection
            </h3>
            <p className="text-gray-600">
              Free 7-photo quality inspection with video
            </p>
          </div>
          
          <div className="text-center p-6 rounded-lg bg-white/50 backdrop-blur">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🚚</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">
              Global Shipping
            </h3>
            <p className="text-gray-600">
              Consolidated shipping to reduce costs
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}