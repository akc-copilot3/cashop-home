'use client'

import React, { useState, useEffect } from 'react'
import { Product, Locale } from '@/types'
import { getFeaturedProducts, getLocalizedText } from '@/lib/data'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'

interface FeaturedProductsProps {
  locale: Locale
}

export function FeaturedProducts({ locale }: FeaturedProductsProps) {
  const t = useTranslations('common')
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    getFeaturedProducts(locale).then(setProducts)
  }, [locale])

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('products.title')}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t('products.subtitle')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {products.map((product) => (
            <div key={product.id} className="group bg-card rounded-lg overflow-hidden border hover:shadow-lg transition-all duration-300">
              <div className="aspect-square relative overflow-hidden">
                <Image
                  src={product.images[0]}
                  alt={getLocalizedText(product.name, locale)}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-lg mb-2">
                  {getLocalizedText(product.name, locale)}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {getLocalizedText(product.description, locale)}
                </p>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground line-through">
                      ${product.price.retail}
                    </p>
                    <p className="text-lg font-bold text-primary">
                      ${product.price.member}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">
                      {t('products.commission')}
                    </p>
                    <p className="text-sm font-semibold text-green-600">
                      ${product.price.commission}
                    </p>
                  </div>
                </div>
                <Button className="w-full" asChild>
                  <Link href={`/products/${product.id}`}>
                    {t('products.view_details')}
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Button variant="outline" size="lg" asChild>
            <Link href="/products">
              {t('products.view_all')}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}