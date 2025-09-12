'use client'

import { useTranslation } from '@/hooks/useTranslation'
import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function HomePage() {
  const { t } = useTranslation()
  
  // Background images carousel
  const heroImages = [
    '/images/hero-bg-1.jpg',
    '/images/hero-bg-2.jpg', 
    '/images/hero-bg-3.jpg',
    '/images/hero-bg-4.jpg'
  ]
  
  const [currentImage, setCurrentImage] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length)
    }, 6000) // 6秒切换一次
    
    return () => clearInterval(interval)
  }, [heroImages.length])

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden min-h-screen flex items-center">
        {/* Background Images Carousel */}
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-2000 ${
                index === currentImage ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={image}
                alt={`Hero background ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
                quality={90}
              />
            </div>
          ))}
          
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/60"></div>
          
          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            {/* Large floating elements */}
            <div className="absolute top-10 left-10 w-20 h-20 bg-red-500/20 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute top-32 right-20 w-32 h-32 bg-pink-500/15 rounded-full blur-xl animate-pulse delay-700"></div>
            <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-orange-500/15 rounded-full blur-xl animate-pulse delay-1000"></div>
            <div className="absolute bottom-10 right-10 w-16 h-16 bg-yellow-500/20 rounded-full blur-xl animate-pulse delay-300"></div>
            
            {/* Moving geometric shapes */}
            <div className="absolute top-1/4 right-1/3 w-2 h-2 bg-white/30 rounded-full animate-ping"></div>
            <div className="absolute top-3/4 left-1/5 w-1 h-1 bg-red-400/40 rounded-full animate-ping delay-500"></div>
            <div className="absolute top-1/2 right-1/5 w-1.5 h-1.5 bg-pink-400/40 rounded-full animate-ping delay-1000"></div>
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20"></div>
          </div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10 max-w-6xl">
          {/* Floating brand badge */}
          <div className="mb-8 animate-float">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20 shadow-2xl">
              <span className="text-2xl animate-pulse">🇨🇳</span>
              <span className="text-white font-semibold tracking-wide">中国品牌 · 全球共享</span>
              <span className="text-2xl animate-pulse delay-300">🌍</span>
            </div>
          </div>
          
          {/* Main heading with enhanced styling */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-red-200 to-pink-200 bg-clip-text text-transparent leading-tight animate-float-delayed">
            <div className="mb-2">{t.hero.title}</div>
            <div className="text-2xl sm:text-3xl md:text-4xl font-normal text-red-300 opacity-90">
              Premium Chinese Brands Worldwide
            </div>
          </h1>
          
          {/* Enhanced subtitle */}
          <p className="text-lg sm:text-xl text-gray-200 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
            {t.hero.subtitle}
          </p>
          
          {/* Enhanced feature highlights */}
          <div className="flex flex-wrap justify-center gap-3 mb-12 px-4">
            <div className="flex items-center gap-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm px-5 py-3 rounded-full border border-green-400/30 hover:border-green-400/50 transition-all duration-300 group">
              <span className="text-xl group-hover:scale-110 transition-transform duration-300">💳</span>
              <span className="text-white text-sm font-medium">加密货币支付</span>
            </div>
            <div className="flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 backdrop-blur-sm px-5 py-3 rounded-full border border-blue-400/30 hover:border-blue-400/50 transition-all duration-300 group">
              <span className="text-xl group-hover:scale-110 transition-transform duration-300">🛡️</span>
              <span className="text-white text-sm font-medium">质检保证</span>
            </div>
            <div className="flex items-center gap-2 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 backdrop-blur-sm px-5 py-3 rounded-full border border-orange-400/30 hover:border-orange-400/50 transition-all duration-300 group">
              <span className="text-xl group-hover:scale-110 transition-transform duration-300">🚚</span>
              <span className="text-white text-sm font-medium">全球配送</span>
            </div>
          </div>
          
          {/* Enhanced CTA button */}
          <div className="space-y-4">
            <button className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-12 py-4 rounded-2xl text-lg font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl border border-red-400/50 group">
              <span className="flex items-center gap-3 justify-center">
                <span className="text-xl group-hover:scale-110 transition-transform duration-300">🚀</span>
                <span>{t.hero.cta}</span>
                <span className="text-xl group-hover:translate-x-1 transition-transform duration-300">→</span>
              </span>
            </button>
            
            <div className="flex items-center justify-center gap-6 text-white/70 text-sm mb-8">
              <div className="flex items-center gap-1">
                <span>✓</span>
                <span>免费注册</span>
              </div>
              <div className="flex items-center gap-1">
                <span>✓</span>
                <span>30天退款保证</span>
              </div>
              <div className="flex items-center gap-1">
                <span>✓</span>
                <span>24/7客服支持</span>
              </div>
            </div>
            
            {/* Image carousel indicators */}
            <div className="flex justify-center gap-3">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentImage 
                      ? 'bg-white scale-125' 
                      : 'bg-white/40 hover:bg-white/60'
                  }`}
                  aria-label={`Switch to background image ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
                💳
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">{t.features.crypto.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t.features.crypto.description}
              </p>
            </div>

            <div className="text-center p-8 bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-red-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
                🛡️
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">{t.features.quality.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t.features.quality.description}
              </p>
            </div>

            <div className="text-center p-8 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
                🚚
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">{t.features.shipping.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t.features.shipping.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-slate-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              {t.products.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t.products.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Li-Ning Shoes */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="aspect-square bg-gradient-to-br from-red-100 to-pink-100 flex items-center justify-center text-6xl">
                👟
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-red-100 text-red-800 text-xs font-semibold px-3 py-1 rounded-full">
                    {t.products.categories.sports}
                  </span>
                  <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
                    -25%
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">Li-Ning Basketball Shoes</h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  High-performance basketball shoes with advanced cushioning technology
                </p>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <span className="text-2xl font-bold text-red-600">$67.49</span>
                    <span className="text-sm text-gray-500 line-through ml-2">$89.99</span>
                  </div>
                  <span className="text-sm font-semibold text-green-600">{t.products.save} $22.50</span>
                </div>
                <button className="w-full bg-gradient-to-r from-red-500 to-pink-600 text-white py-3 rounded-xl font-semibold hover:from-red-600 hover:to-pink-700 transition-all duration-300">
                  {t.products.viewDetails}
                </button>
              </div>
            </div>

            {/* ANTA Shoes */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="aspect-square bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center text-6xl">
                👟
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-orange-100 text-orange-800 text-xs font-semibold px-3 py-1 rounded-full">
                    {t.products.categories.sports}
                  </span>
                  <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
                    -25%
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">ANTA Running Shoes</h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  Lightweight running shoes designed for comfort and performance
                </p>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <span className="text-2xl font-bold text-red-600">$59.99</span>
                    <span className="text-sm text-gray-500 line-through ml-2">$79.99</span>
                  </div>
                  <span className="text-sm font-semibold text-green-600">{t.products.save} $20.00</span>
                </div>
                <button className="w-full bg-gradient-to-r from-red-500 to-pink-600 text-white py-3 rounded-xl font-semibold hover:from-red-600 hover:to-pink-700 transition-all duration-300">
                  {t.products.viewDetails}
                </button>
              </div>
            </div>

            {/* Haier TV */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="aspect-square bg-gradient-to-br from-pink-100 to-rose-100 flex items-center justify-center text-6xl">
                📺
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-pink-100 text-pink-800 text-xs font-semibold px-3 py-1 rounded-full">
                    {t.products.categories.electronics}
                  </span>
                  <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
                    -25%
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">Haier Smart TV 55"</h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  4K Ultra HD Smart TV with Android system and voice control
                </p>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <span className="text-2xl font-bold text-red-600">$374.99</span>
                    <span className="text-sm text-gray-500 line-through ml-2">$499.99</span>
                  </div>
                  <span className="text-sm font-semibold text-green-600">{t.products.save} $125.00</span>
                </div>
                <button className="w-full bg-gradient-to-r from-red-500 to-pink-600 text-white py-3 rounded-xl font-semibold hover:from-red-600 hover:to-pink-700 transition-all duration-300">
                  {t.products.viewDetails}
                </button>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <button className="bg-white text-gray-800 px-8 py-4 rounded-xl font-semibold border-2 border-gray-200 hover:bg-gray-50 transition-all duration-300 shadow-lg">
              {t.products.viewAll}
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}