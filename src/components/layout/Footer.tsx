import { useTranslations } from 'next-intl'
import Link from 'next/link'

export function Footer() {
  const t = useTranslations('common')

  return (
    <footer className="bg-muted border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Cashop</h3>
            <p className="text-muted-foreground text-sm mb-4">
              {t('footer.tagline')}
            </p>
            <p className="text-muted-foreground text-sm">
              {t('footer.description')}
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">{t('footer.products_section.title')}</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-muted-foreground hover:text-foreground text-sm">
                  {t('footer.products_section.all_products')}
                </Link>
              </li>
              <li>
                <Link href="/products?category=sports" className="text-muted-foreground hover:text-foreground text-sm">
                  {t('footer.products_section.sports_fitness')}
                </Link>
              </li>
              <li>
                <Link href="/products?category=electronics" className="text-muted-foreground hover:text-foreground text-sm">
                  {t('footer.products_section.electronics')}
                </Link>
              </li>
              <li>
                <Link href="/products?category=fashion" className="text-muted-foreground hover:text-foreground text-sm">
                  {t('footer.products_section.fashion_beauty')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t('footer.services_section.title')}</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/services" className="text-muted-foreground hover:text-foreground text-sm">
                  {t('footer.services_section.quality_inspection')}
                </Link>
              </li>
              <li>
                <Link href="/membership" className="text-muted-foreground hover:text-foreground text-sm">
                  {t('footer.services_section.membership')}
                </Link>
              </li>
              <li>
                <Link href="/services#shipping" className="text-muted-foreground hover:text-foreground text-sm">
                  {t('footer.services_section.global_shipping')}
                </Link>
              </li>
              <li>
                <Link href="/services#crypto" className="text-muted-foreground hover:text-foreground text-sm">
                  {t('footer.services_section.crypto_payment')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t('footer.company_section.title')}</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground text-sm">
                  {t('navigation.about')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground text-sm">
                  {t('navigation.contact')}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground text-sm">
                  {t('footer.company_section.privacy_policy')}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground text-sm">
                  {t('footer.company_section.terms_of_service')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 text-center text-muted-foreground text-sm">
          <p>{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  )
}