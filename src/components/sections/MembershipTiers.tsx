import { Service, Locale } from '@/types'
import { getServices, getLocalizedText } from '@/lib/data'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import Link from 'next/link'

interface MembershipTiersProps {
  locale: Locale
}

export async function MembershipTiers({ locale }: MembershipTiersProps) {
  const services = await getServices(locale)

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {locale === 'zh' ? '会员体系' : locale === 'ja' ? 'メンバーシップ' : 'Membership Tiers'}
          </h2>
          <p className="text-muted-foreground text-lg">
            {locale === 'zh' 
              ? '选择适合您的会员等级，享受更多优惠和权益' 
              : locale === 'ja' 
                ? 'あなたに最適なメンバーシップレベルを選択し、より多くの特典を享受' 
                : 'Choose the membership tier that suits you and enjoy more benefits'
            }
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
                    {locale === 'zh' ? '推荐' : locale === 'ja' ? 'おすすめ' : 'Recommended'}
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
                        {locale === 'zh' ? '免费' : locale === 'ja' ? '無料' : 'Free'}
                      </span>
                    ) : (
                      <span>${tier.price}</span>
                    )
                  ) : (
                    <div className="space-y-1">
                      <div className="text-lg text-muted-foreground">
                        ${tier.price.monthly}/
                        {locale === 'zh' ? '月' : locale === 'ja' ? '月' : 'month'}
                      </div>
                      <div>
                        ${tier.price.annual}/
                        {locale === 'zh' ? '年' : locale === 'ja' ? '年' : 'year'}
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
                    ? (locale === 'zh' ? '立即浏览' : locale === 'ja' ? '今すぐ閲覧' : 'Start Browsing')
                    : (locale === 'zh' ? '立即加入' : locale === 'ja' ? '今すぐ参加' : 'Join Now')
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