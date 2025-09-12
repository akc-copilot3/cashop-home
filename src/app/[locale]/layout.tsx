import { Inter } from 'next/font/google'
import Link from 'next/link'
import '../globals.css'

const inter = Inter({ subsets: ['latin'] })

// Import messages
import enMessages from '@/messages/en.json'
import zhMessages from '@/messages/zh.json' 
import jaMessages from '@/messages/ja.json'

const messages: Record<string, any> = {
  en: enMessages,
  zh: zhMessages,
  ja: jaMessages,
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = messages[locale] || messages.en
  
  const languages = [
    { code: 'en', name: 'EN', flag: '🇺🇸' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
  ]

  return (
    <html lang={locale}>
      <head>
        <title>Cashop - Chinese Premium Brands Worldwide</title>
        <meta name="description" content="Premium Chinese brands dropshipping platform with crypto payment support" />
      </head>
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          {/* Header */}
          <header className="bg-white border-b shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center space-x-8">
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">
                    Cashop
                  </h1>
                  <nav className="hidden md:flex space-x-8">
                    <a href="#" className="text-gray-700 hover:text-red-600 transition-colors font-medium">{t.navigation?.products || 'Products'}</a>
                    <a href="#" className="text-gray-700 hover:text-red-600 transition-colors font-medium">{t.navigation?.brands || 'Brands'}</a>
                    <a href="#" className="text-gray-700 hover:text-red-600 transition-colors font-medium">{t.navigation?.services || 'Services'}</a>
                    <a href="#" className="text-gray-700 hover:text-red-600 transition-colors font-medium">{t.navigation?.about || 'About'}</a>
                  </nav>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="hidden sm:flex space-x-2">
                    {languages.map((lang) => (
                      <Link
                        key={lang.code}
                        href={`/${lang.code}`}
                        className={`px-3 py-1 rounded-full text-sm font-medium cursor-pointer transition-colors ${
                          locale === lang.code 
                            ? 'bg-red-100 text-red-700' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {lang.flag} {lang.name}
                      </Link>
                    ))}
                  </div>
                  <button className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-red-600 hover:to-pink-700 transition-all duration-300">
                    {'Sign Up'}
                  </button>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1">
            {children}
          </main>

          {/* Footer */}
          <footer className="bg-gray-900 text-white">
            <div className="container mx-auto px-4 py-12">
              <div className="grid md:grid-cols-4 gap-8 mb-8">
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent mb-4">
                    Cashop
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    Premium Chinese brands dropshipping platform with crypto payment support
                  </p>
                  <div className="flex space-x-4 mt-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                      <span className="text-sm">📧</span>
                    </div>
                    <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                      <span className="text-sm">🐦</span>
                    </div>
                    <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                      <span className="text-sm">📱</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold mb-4">Products</h4>
                  <ul className="space-y-2 text-gray-400">
                    <li><a href="#" className="hover:text-white transition-colors">Sports & Fitness</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Electronics</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Fashion & Beauty</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Home & Garden</a></li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-4">Services</h4>
                  <ul className="space-y-2 text-gray-400">
                    <li><a href="#" className="hover:text-white transition-colors">Quality Inspection</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Global Shipping</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Crypto Payment</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">24/7 Support</a></li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-4">Company</h4>
                  <ul className="space-y-2 text-gray-400">
                    <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
                <p>© {new Date().getFullYear()} Cashop. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}