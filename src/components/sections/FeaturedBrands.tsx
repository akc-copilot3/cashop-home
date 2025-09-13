import { Brand, Locale } from '@/types'
import { getFeaturedBrands, getLocalizedText } from '@/lib/data'
import Image from 'next/image'
import Link from 'next/link'
import { Carousel } from '@/components/ui/carousel'

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
        
        {/* Brand Carousel */}
        <div className="relative">
          <Carousel
            autoplay={true}
            autoplayDelay={4000}
            showArrows={true}
            showDots={false}
            slidesToShow={2}
            slidesToScroll={1}
            className="mb-8"
            responsive={{
              640: { slidesToShow: 3, slidesToScroll: 1 },
              768: { slidesToShow: 4, slidesToScroll: 2 },
              1024: { slidesToShow: 5, slidesToScroll: 2 },
              1280: { slidesToShow: 6, slidesToScroll: 2 }
            }}
          >
            {brands.map((brand) => (
              <div key={brand.id} className="px-2">
                <Link
                  href={`/brands/${brand.id}`}
                  className="group bg-background rounded-lg p-3 hover:shadow-lg transition-all duration-300 border block h-full"
                >
                  <div className="aspect-square relative mb-2">
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      fill
                      className="object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-medium text-center text-xs leading-tight truncate">
                    {brand.name}
                  </h3>
                </Link>
              </div>
            ))}
          </Carousel>
        </div>
        
        <div className="text-center mt-8">
          <div className="inline-flex items-center justify-center space-x-2 text-muted-foreground">
            <span className="text-2xl font-bold text-primary">{brands.length}+</span>
            <span className="text-lg">
              {locale === 'zh' ? '合作品牌' : locale === 'ja' ? 'パートナーブランド' : 'Partner Brands'}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            {locale === 'zh' 
              ? '涵盖运动、电子、时尚、汽车等多个领域' 
              : locale === 'ja' 
                ? 'スポーツ、電子機器、ファッション、自動車など幅広い分野をカバー'
                : 'Covering sports, electronics, fashion, automotive and more'
            }
          </p>
        </div>
      </div>
    </section>
  )
}