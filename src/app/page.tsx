'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function RootPage() {
  const router = useRouter()

  useEffect(() => {
    // 这个页面不应该被直接访问，middleware 应该已经重定向了
    // 如果用户到达这里，重定向到默认语言
    const detectLanguage = () => {
      const userLang = navigator.language.toLowerCase()
      
      if (userLang.startsWith('zh')) {
        return 'zh'
      } else if (userLang.startsWith('ja')) {
        return 'ja'
      } else {
        return 'en'
      }
    }

    const language = detectLanguage()
    router.replace(`/${language}`)
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Redirecting...</p>
      </div>
    </div>
  )
}