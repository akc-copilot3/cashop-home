'use client'

import React, { useState, useEffect } from 'react'
import { Service, Locale } from '@/types'
import { getServices, getLocalizedText } from '@/lib/data'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'
import { Check } from 'lucide-react'
import Link from 'next/link'

interface MembershipTiersProps {
  locale: Locale
}

export function MembershipTiers({ locale }: MembershipTiersProps) {
  const t = useTranslations('common')
  const [services, setServices] = useState<Service | null>(null)

  useEffect(() => {
    getServices(locale).then(setServices)
  }, [locale])

  if (!services) return null

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('membership.title')}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t('membership.subtitle')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {services.membership.tiers.map((tier, index) => (
            <div 
              key={tier.id} 
              className={`relative rounded-lg border p-8 ${
                index === 1 ? 'border-primary shadow-lg scale-105' : 'border-border'
              }`}
            >
              {index === 1 && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                    {t('membership.recommended')}
                  </span>
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2">
                  {getLocalizedText(tier.name, locale)}
                </h3>
                <div className="text-3xl font-bold">
                  {typeof tier.price === 'number' ? (
                    tier.price === 0 ? (
                      <span>
                        {t('membership.free')}
                      </span>
                    ) : (
                      <span>${tier.price}</span>
                    )
                  ) : (
                    <div className="space-y-1">
                      <div className="text-lg text-muted-foreground">
                        ${tier.price.monthly}/
                        {t('membership.month')}
                      </div>
                      <div>
                        ${tier.price.annual}/
                        {t('membership.year')}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <ul className="space-y-3 mb-8">
                {tier.benefits.map((benefit, benefitIndex) => (
                  <li key={benefitIndex} className="flex items-start space-x-2">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">
                      {getLocalizedText(benefit, locale)}
                    </span>
                  </li>
                ))}
              </ul>
              
              <Button 
                className="w-full" 
                variant={index === 1 ? 'default' : 'outline'}
                asChild
              >
                <Link href="/membership">
                  {tier.id === 'guest' 
                    ? t('membership.start_browsing')
                    : t('membership.join_now')
                  }
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}