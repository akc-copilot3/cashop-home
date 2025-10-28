'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { BrandDetailModal } from '@/components/BrandDetailModal'

interface Brand {
  brandId: string
  brandName: string
  brandNameChs?: string
  brandNameEn?: string
  logoUrl: string
}

interface BrandWallProps {
  onSlideChange?: (currentSlide: number) => void
}

export function BrandWall({ onSlideChange }: BrandWallProps) {
  const pathname = usePathname()
  const locale = pathname.split('/')[1] || 'zh'

  const [currentSlide, setCurrentSlide] = useState(1) // 从1开始，因为0是克隆的最后一页
  const [isHovered, setIsHovered] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [brands, setBrands] = useState<Brand[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedBrandId, setSelectedBrandId] = useState<string | null>(null)

  const brandsPerSlide = 21 // 7x3 grid
  const totalSlides = Math.ceil(brands.length / brandsPerSlide)

  const handleBrandClick = (brandId: string) => {
    setSelectedBrandId(brandId)
  }

  const handleCloseModal = () => {
    setSelectedBrandId(null)
  }

  // Fetch brands from API
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`https://api.cashop.com/operation-support/cashop-merchant-core/open/brand-info/list/${locale}`)
        const data = await response.json()

        if (data.success && data.data) {
          setBrands(data.data)
        }
      } catch (error) {
        console.error('Failed to fetch brands:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBrands()
  }, [locale])

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

  // Show loading state
  if (isLoading) {
    return (
      <div className="w-full max-w-[1200px] mx-auto h-[560px] relative flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff2d7f] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading brands...</p>
        </div>
      </div>
    )
  }

  // Show empty state if no brands
  if (brands.length === 0) {
    return (
      <div className="w-full max-w-[1200px] mx-auto h-[560px] relative flex items-center justify-center">
        <p className="text-gray-600">No brands available</p>
      </div>
    )
  }

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
                          <div
                            key={brand.brandId}
                            className="bg-white/50 flex items-center justify-center overflow-hidden rounded-2xl w-[136px] h-[136px] hover:shadow-lg transition-all duration-300 hover:scale-105 border border-white/60 cursor-pointer"
                            onClick={() => handleBrandClick(brand.brandId)}
                          >
                            <div className="relative w-full h-full p-3">
                              <Image
                                src={brand.logoUrl}
                                alt={brand.brandName || brand.brandNameChs || ''}
                                fill
                                className="object-contain"
                                unoptimized
                              />
                            </div>
                          </div>
                        )
                      } else {
                        return (
                          <div key={`empty-${slide.index}-${brandIndex}`} className="bg-gray-50 flex items-center justify-center overflow-hidden rounded-2xl w-[136px] h-[136px] opacity-20">
                            <div className="w-[80px] h-[80px] bg-gray-200 rounded" />
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

      {/* Brand Detail Modal */}
      <BrandDetailModal
        brandId={selectedBrandId}
        locale={locale}
        onClose={handleCloseModal}
      />
    </div>
  )
}