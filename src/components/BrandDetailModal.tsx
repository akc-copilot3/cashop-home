'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'
import { useTranslations } from 'next-intl'

interface Award {
  awardName: string
  awardOrg: string
  awardYear: string
  awardRegion?: string
}

interface BrandDetail {
  brandId: string
  brandName: string
  brandNameChs?: string
  brandNameEn?: string
  logoUrl: string
  establishYear?: string
  headquarters?: string
  annualRevenue?: string
  mainCategories?: string
  mainProducts?: string
  coreConcept?: string
  brandSlogan?: string
  brandPosition?: string
  coreMarket?: string
  milestones?: string
  brandIntro?: string
  brandImageUrl?: string
  brandVideoUrl?: string
  awards?: Award[]
}

interface BrandDetailModalProps {
  brandId: string | null
  locale: string
  onClose: () => void
}

export function BrandDetailModal({ brandId, locale, onClose }: BrandDetailModalProps) {
  const t = useTranslations('brand_modal')
  const [brandDetail, setBrandDetail] = useState<BrandDetail | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (brandId) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [brandId])

  useEffect(() => {
    if (!brandId) {
      setBrandDetail(null)
      return
    }

    const fetchBrandDetail = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`https://api.cashop.com/operation-support/cashop-merchant-core/open/brand-info/detail/${brandId}/${locale}`)
        const data = await response.json()

        if (data.success && data.data) {
          setBrandDetail(data.data)
        }
      } catch (error) {
        console.error('Failed to fetch brand detail:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBrandDetail()
  }, [brandId, locale])

  if (!brandId) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white relative max-h-[90vh] overflow-y-auto w-full max-w-[902px] rounded-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 bg-white/80 hover:bg-white rounded-full p-2 text-gray-600 hover:text-gray-900 transition-colors shadow-md"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>

        {isLoading ? (
          <div className="flex items-center justify-center h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff2d7f] mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading brand details...</p>
            </div>
          </div>
        ) : brandDetail ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Header Section with Brand Logo */}
            <div className="relative h-[240px] w-full overflow-hidden">
              {/* Background with blur effect */}
              <div className="absolute inset-0">
                {brandDetail.brandImageUrl ? (
                  <Image
                    src={brandDetail.brandImageUrl}
                    alt={brandDetail.brandName}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-pink-800 to-blue-900" />
                )}
                <div className="absolute inset-0 backdrop-blur-[23px] bg-black/75" />
              </div>

              {/* Top Pink Bar */}
              <div className="absolute left-0 top-0 h-[5px] w-full bg-[#ff2d7f]" />

              {/* Logo and Brand Name */}
              <div className="absolute left-1/2 top-[40px] flex w-[120px] -translate-x-1/2 flex-col items-center gap-6">
                <div className="relative aspect-square w-full overflow-hidden rounded-[20px] border border-[rgba(34,34,34,0.08)] bg-white">
                  <Image
                    src={brandDetail.logoUrl}
                    alt={brandDetail.brandName}
                    fill
                    className="object-contain p-2"
                    unoptimized
                  />
                </div>
                <p className="text-center text-2xl font-bold leading-6 text-white opacity-90">
                  {brandDetail.brandName}
                </p>
              </div>
            </div>

            {/* Brand Archive Section */}
            <div className="px-[50px] py-[60px]">
              <div className="relative mb-[76px]">
                <div className="absolute left-1/2 top-0 -translate-x-1/2">
                  <p className="text-center text-2xl font-bold leading-8 text-[#222222] whitespace-nowrap">
                    {t('archive_title')}
                  </p>
                  <div className="mx-auto mt-3 h-[2px] w-[150px] bg-[#ff2d7f]" />
                </div>
              </div>

              {/* Brand Information Grid */}
              <div className="space-y-4 text-base leading-6 text-left">
                {brandDetail.establishYear && (
                  <div className="flex">
                    <span className="w-[220px] font-semibold text-[#222222] opacity-90 text-left">{t('founded_year')}</span>
                    <span className="flex-1 font-normal text-[#222222] opacity-90 text-left">{brandDetail.establishYear}</span>
                  </div>
                )}
                {brandDetail.headquarters && (
                  <div className="flex">
                    <span className="w-[220px] font-semibold text-[#222222] opacity-90 text-left">{t('headquarters')}</span>
                    <span className="flex-1 font-normal text-[#222222] opacity-90 text-left">{brandDetail.headquarters}</span>
                  </div>
                )}
                {brandDetail.annualRevenue && (
                  <div className="flex">
                    <span className="w-[220px] font-semibold text-[#222222] opacity-90 text-left">{t('revenue')}</span>
                    <span className="flex-1 font-normal text-[#222222] opacity-90 text-left">{brandDetail.annualRevenue}</span>
                  </div>
                )}
                {brandDetail.mainCategories && (
                  <div className="flex">
                    <span className="w-[220px] font-semibold text-[#222222] opacity-90 text-left">{t('main_categories')}</span>
                    <span className="flex-1 font-normal text-[#222222] opacity-90 text-left">{brandDetail.mainCategories}</span>
                  </div>
                )}
                {brandDetail.mainProducts && (
                  <div className="flex">
                    <span className="w-[220px] font-semibold text-[#222222] opacity-90 text-left">{t('representative_products')}</span>
                    <span className="flex-1 font-normal text-[#222222] opacity-90 text-left">{brandDetail.mainProducts}</span>
                  </div>
                )}
                {brandDetail.coreConcept && (
                  <div className="flex">
                    <span className="w-[220px] font-semibold text-[#222222] opacity-90 text-left">{t('mission')}</span>
                    <span className="flex-1 font-normal text-[#222222] opacity-90 text-left">{brandDetail.coreConcept}</span>
                  </div>
                )}
                {brandDetail.brandSlogan && (
                  <div className="flex">
                    <span className="w-[220px] font-semibold text-[#222222] opacity-90 text-left">{t('slogan')}</span>
                    <span className="flex-1 font-normal text-[#222222] opacity-90 text-left">{brandDetail.brandSlogan}</span>
                  </div>
                )}
                {brandDetail.brandPosition && (
                  <div className="flex">
                    <span className="w-[220px] font-semibold text-[#222222] opacity-90 text-left">{t('positioning')}</span>
                    <span className="flex-1 font-normal text-[#222222] opacity-90 text-left">{brandDetail.brandPosition}</span>
                  </div>
                )}
                {brandDetail.coreMarket && (
                  <div className="flex">
                    <span className="w-[220px] font-semibold text-[#222222] opacity-90 text-left">{t('core_markets')}</span>
                    <span className="flex-1 font-normal text-[#222222] opacity-90 text-left">{brandDetail.coreMarket}</span>
                  </div>
                )}
                {brandDetail.milestones && (
                  <div className="flex">
                    <span className="w-[220px] font-semibold text-[#222222] opacity-90 text-left">{t('milestones')}</span>
                    <span className="flex-1 font-normal text-[#222222] opacity-90 text-left">{brandDetail.milestones}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Brand Story Section */}
            {brandDetail.brandIntro && (
              <div className="px-[50px] pb-[60px]">
                <div className="relative mb-[76px]">
                  <div className="absolute left-1/2 top-0 -translate-x-1/2">
                    <p className="text-center text-2xl font-bold leading-8 text-[#222222] whitespace-nowrap">
                      {t('story_title')}
                    </p>
                    <div className="mx-auto mt-3 h-[2px] w-[150px] bg-[#ff2d7f]" />
                  </div>
                </div>

                <div className="text-base font-normal leading-6 text-[#222222] opacity-90 whitespace-pre-line text-left">
                  {brandDetail.brandIntro}
                </div>
              </div>
            )}

          </div>
        ) : (
          <div className="flex items-center justify-center h-[400px]">
            <p className="text-gray-600">No brand details available</p>
          </div>
        )}
      </div>
    </div>
  )
}
