'use client'

import { useParams } from 'next/navigation'

export default function LawPage() {
  const params = useParams()
  const locale = params.locale as string

  // 根据语言环境选择对应的条款文件
  const getTermsFile = () => {
    switch (locale) {
      case 'ja':
        return '/term-jp.html'
      case 'zh':
        return '/term-zh.html'
      case 'en':
        return '/term-en.html'
      default:
        return '/term-zh.html'
    }
  }

  return (
    <div className="w-full h-screen">
      <iframe
        src={getTermsFile()}
        className="w-full h-full border-0"
        title="服务条款"
      />
    </div>
  )
}
