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
              Chinese Premium Brands Worldwide
            </p>
            <p className="text-muted-foreground text-sm">
              Crypto payment • Quality inspection • Global shipping
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Products</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-muted-foreground hover:text-foreground text-sm">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/products?category=sports" className="text-muted-foreground hover:text-foreground text-sm">
                  Sports & Fitness
                </Link>
              </li>
              <li>
                <Link href="/products?category=electronics" className="text-muted-foreground hover:text-foreground text-sm">
                  Electronics
                </Link>
              </li>
              <li>
                <Link href="/products?category=fashion" className="text-muted-foreground hover:text-foreground text-sm">
                  Fashion & Beauty
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/services" className="text-muted-foreground hover:text-foreground text-sm">
                  Quality Inspection
                </Link>
              </li>
              <li>
                <Link href="/membership" className="text-muted-foreground hover:text-foreground text-sm">
                  Membership
                </Link>
              </li>
              <li>
                <Link href="/services#shipping" className="text-muted-foreground hover:text-foreground text-sm">
                  Global Shipping
                </Link>
              </li>
              <li>
                <Link href="/services#crypto" className="text-muted-foreground hover:text-foreground text-sm">
                  Crypto Payment
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
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
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground text-sm">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 text-center text-muted-foreground text-sm">
          <p>&copy; 2024 Cashop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}