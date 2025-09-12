import { NextRequest, NextResponse } from 'next/server'

const locales = ['en', 'zh', 'ja']
const defaultLocale = 'zh'

function getLocale(request: NextRequest): string {
  // 检查是否已经在路径中包含了语言
  const pathname = request.nextUrl.pathname
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return pathname.split('/')[1]

  // 从 Accept-Language 头部获取用户首选语言
  const acceptLanguage = request.headers.get('accept-language')
  
  if (acceptLanguage) {
    // 解析 Accept-Language 头部
    const languages = acceptLanguage
      .split(',')
      .map(lang => lang.split(';')[0].trim().toLowerCase())
    
    // 检查是否匹配支持的语言
    for (const lang of languages) {
      // 完全匹配
      if (locales.includes(lang)) {
        return lang
      }
      
      // 匹配语言代码的前两位（例如 zh-CN -> zh）
      const langCode = lang.split('-')[0]
      if (locales.includes(langCode)) {
        return langCode
      }
    }
  }

  return defaultLocale
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // 检查路径是否已经包含支持的语言
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  // 如果路径已经包含语言，直接通过
  if (pathnameHasLocale) return

  // 如果是根路径，重定向到检测到的语言
  const locale = getLocale(request)
  return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url))
}

export const config = {
  matcher: [
    // 匹配所有路径，除了：
    // - api 路径
    // - _next/static (静态文件)
    // - _next/image (图片优化文件)  
    // - favicon.ico (网站图标)
    // - 以点开头的文件 (如 .well-known)
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)'
  ]
}