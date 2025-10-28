'use client'

import { useEffect } from 'react'

export default function DownloadPage() {
  useEffect(() => {
    // 检测设备类型
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera

    // iOS 设备检测
    const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream

    // Android 设备检测
    const isAndroid = /android/i.test(userAgent)

    // 根据设备类型进行跳转
    if (isIOS) {
      // iOS 跳转到 App Store
      window.location.href = 'https://apps.apple.com/jp/app/cashop/id6751757308'
    } else if (isAndroid) {
      // Android 跳转到 Google Play
      window.location.href = 'https://play.google.com/store/apps/details?id=com.cashop.mobile'
    } else {
      // 其他设备默认跳转到 Android（也可以改为跳转到首页或显示下载选项）
      window.location.href = 'https://play.google.com/store/apps/details?id=com.cashop.mobile'
    }
  }, [])

  // 显示加载中的界面（用户通常不会看到，因为会立即跳转）
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-white to-[#c8dbfd]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff2d7f] mx-auto mb-4"></div>
        <p className="text-lg text-gray-600">正在跳转...</p>
      </div>
    </div>
  )
}
