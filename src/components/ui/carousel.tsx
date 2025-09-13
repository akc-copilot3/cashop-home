'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CarouselProps {
  children: React.ReactNode[]
  autoplay?: boolean
  autoplayDelay?: number
  showArrows?: boolean
  showDots?: boolean
  slidesToShow?: number
  slidesToScroll?: number
  className?: string
  responsive?: {
    [breakpoint: number]: {
      slidesToShow: number
      slidesToScroll: number
    }
  }
}

export function Carousel({
  children,
  autoplay = false,
  autoplayDelay = 3000,
  showArrows = true,
  showDots = true,
  slidesToShow = 1,
  slidesToScroll = 1,
  className,
  responsive
}: CarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [currentSlidesToShow, setCurrentSlidesToShow] = useState(slidesToShow)
  const [currentSlidesToScroll, setCurrentSlidesToScroll] = useState(slidesToScroll)
  const autoplayRef = useRef<NodeJS.Timeout | null>(null)

  const totalSlides = children.length
  const maxSlide = Math.ceil(totalSlides / currentSlidesToShow) - 1

  // Handle responsive breakpoints
  useEffect(() => {
    if (!responsive) return

    const handleResize = () => {
      const width = window.innerWidth
      let newSlidesToShow = slidesToShow
      let newSlidesToScroll = slidesToScroll

      // Sort breakpoints in descending order and find the first match
      const breakpoints = Object.keys(responsive).map(Number).sort((a, b) => b - a)
      
      for (const breakpoint of breakpoints) {
        if (width >= breakpoint) {
          newSlidesToShow = responsive[breakpoint].slidesToShow
          newSlidesToScroll = responsive[breakpoint].slidesToScroll
          break
        }
      }

      setCurrentSlidesToShow(newSlidesToShow)
      setCurrentSlidesToScroll(newSlidesToScroll)
      
      // Reset to first slide if current slide is out of bounds
      const newMaxSlide = Math.ceil(totalSlides / newSlidesToShow) - 1
      if (currentSlide > newMaxSlide) {
        setCurrentSlide(0)
      }
    }

    handleResize() // Initial check
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [responsive, slidesToShow, slidesToScroll, totalSlides, currentSlide])

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + currentSlidesToScroll))
  }, [maxSlide, currentSlidesToScroll])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev <= 0 ? maxSlide : prev - currentSlidesToScroll))
  }, [maxSlide, currentSlidesToScroll])

  const goToSlide = (slide: number) => {
    setCurrentSlide(slide)
  }

  useEffect(() => {
    if (autoplay && !isHovered) {
      autoplayRef.current = setInterval(nextSlide, autoplayDelay)
    } else if (autoplayRef.current) {
      clearInterval(autoplayRef.current)
    }

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current)
      }
    }
  }, [autoplay, autoplayDelay, isHovered, maxSlide, nextSlide])

  return (
    <div
      className={cn('relative overflow-hidden', className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Slides container */}
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${(currentSlide * 100) / (totalSlides / currentSlidesToShow)}%)`
          }}
        >
          {children.map((child, index) => (
            <div
              key={index}
              className="flex-shrink-0"
              style={{ width: `${100 / currentSlidesToShow}%` }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation arrows */}
      {showArrows && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white/90 text-gray-800 rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white/90 text-gray-800 rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Dots indicator */}
      {showDots && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {Array.from({ length: maxSlide + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                'w-2 h-2 rounded-full transition-all duration-200',
                currentSlide === index
                  ? 'bg-primary w-6'
                  : 'bg-white/50 hover:bg-white/70'
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}