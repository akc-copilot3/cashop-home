import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'

// 支持的语言列表
export const locales = ['en', 'zh', 'ja'] as const
export type Locale = (typeof locales)[number]

export default getRequestConfig(async ({ locale }) => {
  // 如果 locale 不在支持的列表中，使用默认语言的消息
  const validatedLocale = locales.includes(locale as Locale) ? locale : 'zh'
  
  return {
    locale: validatedLocale,
    messages: (await import(`./messages/${validatedLocale}.json`)).default
  }
})