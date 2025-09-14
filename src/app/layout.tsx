import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Cashop - China Top Brands Shopping-Agent Platform',
  description: 'China top brands shopping-agent platform with crypto payment support',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  )
}