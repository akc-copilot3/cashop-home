'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

// 生成所有品牌数据 - 使用public/images/brands/目录中的所有图片
const brandNames = [
  '李宁', '安踏', '海尔', '美的', '格力', '华为', '小米', '比亚迪',
  'OPPO', 'vivo', '海信', 'TCL', '创维', '康佳', '长虹', '联想',
  '华硕', '荣耀', '一加', '魅族', '努比亚', '中兴', '京东', '天猫',
  '苏宁', '国美', '唯品会', '蒙牛', '伊利', '光明', '三元', '君乐宝',
  '飞鹤', '完达山', '青岛啤酒', '燕京啤酒', '雪花啤酒', '哈尔滨啤酒',
  '茅台', '五粮液', '泸州老窖', '洋河', '剑南春', '汾酒', '古井贡酒',
  '西凤酒', '董酒', '水井坊',
  // 新增品牌名称
  '添可', '奥克斯', '婷美', '意尔康', '内外', '千百度', '回力',
  '棉竹屋', '稻草人', '艾美特', '蕉下', '金利来', '奥康', '百丽', 'JM中脉'
]

// 精确的文件扩展名映射（基于实际文件列表）
const imageFileMap: Record<number, string> = {
  2: 'jpg', 3: 'jpeg', 4: 'jpg', 5: 'png', 6: 'jpeg', 7: 'jpeg', 8: 'jpeg', 9: 'jpeg',
  10: 'png', 11: 'png', 12: 'jpg', 13: 'jpeg', 14: 'jpg', 15: 'jpg', 16: 'jpg', 17: 'gif',
  18: 'png', 19: 'png', 20: 'png', 21: 'png', 22: 'png', 23: 'png', 24: 'jpg', 25: 'jpeg',
  26: 'png', 27: 'png', 28: 'png', 29: 'jpg', 30: 'jpg', 31: 'jpg', 32: 'jpg', 33: 'jpg',
  34: 'jpg', 35: 'jpg', 36: 'jpg', 37: 'jpg', 38: 'jpg', 39: 'jpg', 40: 'jpeg', 41: 'png',
  42: 'jpg', 43: 'jpg', 44: 'png', 45: 'jpg', 46: 'png', 47: 'png', 48: 'jpg', 49: 'png',
  // 新增文件映射
  50: 'jpeg', 51: 'jpg', 52: 'jpg', 53: 'jpg', 54: 'png', 55: 'png', 56: 'png', 57: 'png',
  58: 'png', 59: 'png', 60: 'png', 61: 'png', 62: 'png', 63: 'png', 64: 'jpg'
}

const brands = Array.from({ length: 63 }, (_, index) => {
  const imageNumber = index + 2 // 从image2开始
  const extension = imageFileMap[imageNumber] || 'jpg'

  return {
    id: index + 1,
    logo: `/images/brands/image${imageNumber}.${extension}`,
    name: brandNames[index] || `品牌${index + 1}`
  }
})

interface BrandWallProps {
  onSlideChange?: (currentSlide: number) => void
}

export function BrandWall({ onSlideChange }: BrandWallProps) {
  const [currentSlide, setCurrentSlide] = useState(1) // 从1开始，因为0是克隆的最后一页
  const [isHovered, setIsHovered] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const brandsPerSlide = 21 // 7x3 grid
  const totalSlides = Math.ceil(brands.length / brandsPerSlide) // Now handles 65 brands

  const nextSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentSlide(prev => prev + 1)
  }

  const prevSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentSlide(prev => prev - 1)
  }

  const goToSlide = (slideIndex: number) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentSlide(slideIndex + 1) // 加1因为有克隆页
    onSlideChange?.(slideIndex)
  }

  // Handle infinite loop transitions
  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false)
        if (currentSlide === 0) {
          setCurrentSlide(totalSlides)
        } else if (currentSlide === totalSlides + 1) {
          setCurrentSlide(1)
        }
      }, 500) // 与CSS transition时间匹配
      return () => clearTimeout(timer)
    }
  }, [currentSlide, isTransitioning, totalSlides])

  // Auto-play functionality
  useEffect(() => {
    if (!isHovered && !isTransitioning) {
      const interval = setInterval(() => {
        nextSlide()
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [isHovered, isTransitioning])

  // Generate slides with clones for infinite loop
  const slides = []
  
  // 克隆最后一页作为第一个
  const lastSlideStart = (totalSlides - 1) * brandsPerSlide
  const lastSlideEnd = lastSlideStart + brandsPerSlide
  const lastSlideBrands = brands.slice(lastSlideStart, lastSlideEnd)
  slides.push({
    index: -1,
    brands: lastSlideBrands,
    isClone: true
  })
  
  // 原始页面
  for (let i = 0; i < totalSlides; i++) {
    const slideStart = i * brandsPerSlide
    const slideEnd = slideStart + brandsPerSlide
    const slideBrands = brands.slice(slideStart, slideEnd)
    slides.push({
      index: i,
      brands: slideBrands,
      isClone: false
    })
  }
  
  // 克隆第一页作为最后一个
  const firstSlideBrands = brands.slice(0, brandsPerSlide)
  slides.push({
    index: totalSlides,
    brands: firstSlideBrands,
    isClone: true
  })

  return (
    <div className="w-full max-w-[1200px] mx-auto h-[560px] relative">
      <div 
        className="relative h-[504px] mx-16"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ overflowX: 'hidden', overflowY: 'visible' }}
      >
        {/* Slides container */}
        <div
          className={`flex h-full ${isTransitioning ? 'transition-transform duration-500 ease-in-out' : ''}`}
          style={{
            transform: `translateX(-${currentSlide * 100}%)`
          }}
        >
          {slides.map((slide) => (
            <div key={slide.index} className="w-full flex-shrink-0 flex justify-center">
              <div className="flex flex-col justify-between h-[504px] w-[1300px] px-4">
                {/* Split brands into 3 rows of 7 each */}
                {Array.from({ length: 3 }, (_, rowIndex) => (
                  <div key={rowIndex} className={`flex justify-between items-center ${rowIndex === 2 ? 'py-2 pb-6' : 'py-2'}`}>
                    {Array.from({ length: 7 }, (_, colIndex) => {
                      const brandIndex = rowIndex * 7 + colIndex
                      const brand = slide.brands[brandIndex]
                      
                      if (brand) {
                        return (
                          <div key={brand.id} className="bg-white/50 flex items-center justify-center overflow-hidden rounded-2xl w-[136px] h-[136px] hover:shadow-lg transition-all duration-300 hover:scale-105 border border-white/60">
                            <div className="relative w-full h-full">
                              <Image
                                src={brand.logo}
                                alt={brand.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                          </div>
                        )
                      } else {
                        return (
                          <div key={`empty-${slide.index}-${brandIndex}`} className="bg-gray-50 flex items-center justify-center overflow-hidden rounded-full w-[136px] h-[136px] opacity-20">
                            <div className="w-[80px] h-[80px] bg-gray-200 rounded-full" />
                          </div>
                        )
                      }
                    })}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* Navigation arrows - positioned outside the brand wall but vertically centered */}
      <button
        onClick={prevSlide}
        className="absolute -left-4 top-[252px] -translate-y-1/2 z-20 bg-white/60 hover:bg-white/80 text-gray-500 hover:text-gray-700 rounded-full p-2 shadow-sm transition-all duration-200 hover:scale-105 border border-gray-100"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute -right-4 top-[252px] -translate-y-1/2 z-20 bg-white/60 hover:bg-white/80 text-gray-500 hover:text-gray-700 rounded-full p-2 shadow-sm transition-all duration-200 hover:scale-105 border border-gray-100"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
      
      {/* Custom Pagination Indicators */}
      <div className="flex gap-1.5 items-center justify-center mt-[56px]">
        {Array.from({ length: totalSlides }, (_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`rounded w-1.5 h-1.5 transition-all duration-300 ${
              (currentSlide === index + 1) || 
              (currentSlide === 0 && index === totalSlides - 1) || 
              (currentSlide === totalSlides + 1 && index === 0)
                ? 'bg-[#ff2d7f]' : 'bg-[rgba(255,45,127,0.3)]'
            }`}
          />
        ))}
      </div>
    </div>
  )
}