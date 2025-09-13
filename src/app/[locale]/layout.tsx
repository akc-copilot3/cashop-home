import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { Inter } from 'next/font/google'
import '../globals.css'

const inter = Inter({ subsets: ['latin'] })

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages({ locale })
  
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <title>Cashop - 中国头部品牌代购平台</title>
        <meta name="description" content="聚焦中国头部品牌商品，整合优质货源与物流，提供质检、商品拍摄、集运等服务，为消费者分别提供可靠的赚钱与购物渠道" />
      </head>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}