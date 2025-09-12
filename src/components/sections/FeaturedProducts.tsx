import { Product, Locale } from '@/types'
import { getFeaturedProducts, getLocalizedText } from '@/lib/data'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

interface FeaturedProductsProps {
  locale: Locale
}

export async function FeaturedProducts({ locale }: FeaturedProductsProps) {
  const products = await getFeaturedProducts(locale)

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {locale === 'zh' ? '精选产品' : locale === 'ja' ? '注目商品' : 'Featured Products'}
          </h2>
          <p className="text-muted-foreground text-lg">
            {locale === 'zh' 
              ? '发现来自中国顶级品牌的优质产品' 
              : locale === 'ja' 
                ? '中国トップブランドの高品質商品を発見' 
                : 'Discover quality products from top Chinese brands'
            }
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
                      {locale === 'zh' ? '佣金' : locale === 'ja' ? '手数料' : 'Commission'}
                    </p>
                    <p className="text-sm font-semibold text-green-600">
                      ${product.price.commission}
                    </p>
                  </div>
                </div>
                <Button className="w-full" asChild>
                  <Link href={`/products/${product.id}`}>
                    {locale === 'zh' ? '查看详情' : locale === 'ja' ? '詳細を見る' : 'View Details'}
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Button variant="outline" size="lg" asChild>
            <Link href="/products">
              {locale === 'zh' ? '查看所有产品' : locale === 'ja' ? 'すべての商品を見る' : 'View All Products'}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}