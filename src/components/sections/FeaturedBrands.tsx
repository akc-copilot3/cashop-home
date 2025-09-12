import { Brand, Locale } from '@/types'
import { getFeaturedBrands, getLocalizedText } from '@/lib/data'
import Image from 'next/image'
import Link from 'next/link'

interface FeaturedBrandsProps {
  locale: Locale
}

export async function FeaturedBrands({ locale }: FeaturedBrandsProps) {
  const brands = await getFeaturedBrands(locale)

  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {locale === 'zh' ? '合作品牌' : locale === 'ja' ? 'パートナーブランド' : 'Partner Brands'}
          </h2>
          <p className="text-muted-foreground text-lg">
            {locale === 'zh' 
              ? '我们与中国顶级品牌紧密合作，为您带来高品质产品' 
              : locale === 'ja' 
                ? '中国のトップブランドと密接に協力し、高品質な商品をお届け' 
                : 'We work closely with top Chinese brands to bring you quality products'
            }
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {brands.map((brand) => (
            <Link
              key={brand.id}
              href={`/brands/${brand.id}`}
              className="group bg-background rounded-lg p-6 hover:shadow-lg transition-all duration-300 border"
            >
              <div className="aspect-square relative mb-4">
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  fill
                  className="object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h3 className="font-semibold text-center text-sm">
                {brand.name}
              </h3>
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <div className="inline-flex items-center justify-center space-x-2 text-muted-foreground">
            <span className="text-lg font-semibold">50+</span>
            <span>
              {locale === 'zh' ? '合作品牌' : locale === 'ja' ? 'パートナーブランド' : 'Partner Brands'}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}