'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'
import { BrandWall } from '@/components/sections/BrandWall'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { usePathname } from 'next/navigation'

// Image constants for local assets
const heroBackground = "/images/hero-background.png"
const heroBackground2 = "/images/hero-background-2.png"
const heroBackground3 = "/images/hero-background-3.png"
const heroBackground4 = "/images/hero-background-4.png"
const footerBackground = "/images/footer-background.png"
const serviceQualityInspection = "/images/service-quality-inspection.png"
const serviceReturns = "/images/service-returns.png"
const serviceShipping = "/images/service-shipping.png"
const cryptoPayment1 = "/images/crypto-payment-1.png"
const cryptoPayment2 = "/images/crypto-payment-2.png"
const cryptoPayment3 = "/images/crypto-payment-3.png"
const starDecoration = "/images/star-decoration.svg"
const cashopLogoMain = "/images/cashop-logo-main.svg"
const cashopLogoMainText = "/images/cashop-logo-main-text.svg"
const downloadIcon = "/images/download-icon.svg"
const facebookIcon = "/images/facebook-icon.svg"
const instagramIcon = "/images/instagram-icon.svg"
const twitterIcon = "/images/twitter-icon.svg"
const youtubeIcon = "/images/youtube-icon.svg"
const qrCodeBg = "/images/qr-code-bg.png"
const qrCodeGroup = "/images/qr-code-group.svg"
const membershipIcon1 = "/images/membership-icon-1.svg"
const membershipIcon2 = "/images/membership-icon-2.svg"
const imgRectangle10 = "/images/membership-showcase-1.png"
const imgRectangle11 = "/images/membership-showcase-2.png"
const moneyIcon = "/images/money-icon.svg"
const cryptoIcon = "/images/crypto-icon.svg"
const qualityIcon = "/images/quality-icon.svg"

export default function HomePage() {
  const t = useTranslations()
  const pathname = usePathname()
  const locale = pathname.split('/')[1] || 'zh'

  const [activeTab, setActiveTab] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Hero carousel data with translations
  const heroData = [
    {
      id: 0,
      title: {
        highlight: t('hero.slides.brands.highlight'),
        main: t('hero.slides.brands.title'),
        color: "#ff2d7f"
      },
      description: t('hero.slides.brands.description'),
      background: heroBackground,
      icon: starDecoration,
      tab: t('hero.tabs.brands')
    },
    {
      id: 1,
      title: {
        highlight: t('hero.slides.quality.highlight'),
        main: t('hero.slides.quality.title'),
        color: "#ff2d7f"
      },
      description: t('hero.slides.quality.description'),
      background: heroBackground4,
      icon: qualityIcon,
      tab: t('hero.tabs.quality')
    },
    {
      id: 2,
      title: {
        highlight: t('hero.slides.save_earn.highlight'),
        main: t('hero.slides.save_earn.title'),
        color: "#ff2d7f"
      },
      description: t('hero.slides.save_earn.description'),
      background: heroBackground2,
      icon: moneyIcon,
      tab: t('hero.tabs.save_earn')
    },
    {
      id: 3,
      title: {
        highlight: t('hero.slides.payment.highlight'),
        main: t('hero.slides.payment.title'),
        color: "#ff2d7f"
      },
      description: t('hero.slides.payment.description'),
      background: heroBackground3,
      icon: cryptoIcon,
      tab: t('hero.tabs.payment')
    }
  ];

  const currentHero = heroData[activeTab];

  // Auto-carousel functionality
  useEffect(() => {
    const startAutoCarousel = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      intervalRef.current = setInterval(() => {
        if (!isPaused) {
          setActiveTab((prev) => (prev + 1) % heroData.length);
        }
      }, 5000); // 5 seconds per slide
    };

    startAutoCarousel();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused, heroData.length]);

  // Handle manual tab click
  const handleTabClick = (index: number) => {
    setActiveTab(index);
    // Restart auto-carousel after manual selection
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      if (!isPaused) {
        setActiveTab((prev) => (prev + 1) % heroData.length);
      }
    }, 5000);
  };

  // Pause/resume on hover
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  return (
    <div className="bg-gradient-to-b from-white to-[#c8dbfd] relative w-full" style={{ minWidth: '80rem' }}>
      <div className="mx-auto relative" style={{ width: '90rem', maxWidth: '100%' }}>
      {/* Header Section */}
      <div className="relative bg-[#f9f9f9] overflow-hidden w-full" style={{ height: '50rem' }}>
        <div className="absolute bg-neutral-50 left-0 right-0 top-0 w-full" style={{ height: '53.9375rem' }} />
        
        {/* Background Filter */}
        <div
          className="absolute bg-[#f9f9f9] inset-0 overflow-hidden w-full"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="absolute bg-cover bg-center bg-white inset-0 transition-all duration-500" style={{ backgroundImage: `url('${currentHero.background}')` }} />
          <div className="absolute bg-black bg-opacity-50 bottom-0 left-0 right-0 w-full" style={{ height: '50rem' }} />
          
          {/* Main Hero Content */}
          <div className="absolute flex flex-col items-start justify-start left-1/2 -translate-x-1/2" style={{ gap: '1.875rem', height: '9.75rem', top: '20.75rem', width: '58rem' }}>
            <div className="flex items-center justify-start relative" style={{ gap: '1rem' }}>
              <div className="font-bold text-white whitespace-pre transition-all duration-500" style={{ fontFamily: "'Alimama_FangYuanTi_VF:Bold-Square', sans-serif", fontSize: '3.75rem', letterSpacing: '0.125rem', lineHeight: '5rem' }}>
                <p className="leading-[80px] whitespace-pre">
                  <span style={{ color: currentHero.title.color }}>{currentHero.title.highlight}</span>
                  <span className="text-white">{currentHero.title.main}</span>
                </p>
              </div>
              <div className="relative" style={{ width: '2.875rem', height: '2.875rem' }}>
                <Image alt="" width={46} height={46} className="w-full h-full object-contain transition-all duration-500" src={currentHero.icon} />
              </div>
            </div>
            <div className="font-normal text-white min-w-full transition-all duration-500" style={{ fontFamily: "'PingFang SC:Regular', sans-serif", width: "min-content", fontSize: '2rem', lineHeight: '2.875rem' }}>
              <p style={{ lineHeight: '2.875rem' }}>{currentHero.description}</p>
            </div>
          </div>
        </div>

        {/* Navigation Bar */}
        <div className="absolute flex items-center justify-between left-1/2 -translate-x-1/2 overflow-hidden top-0 z-20" style={{ height: '6.5rem', padding: '1.5rem 2.5rem', width: '90rem', maxWidth: '100%' }}>
          {/* Background Layer with Blur Effect */}
          <div className="absolute backdrop-filter bg-[rgba(255,255,255,0.7)] left-0 top-0 -z-10 w-full" style={{ backdropFilter: 'blur(1.25rem)', WebkitBackdropFilter: 'blur(1.25rem)', height: '6.5rem' }} />
          
          {/* Logo Section */}
          <div className="flex items-start justify-start overflow-hidden relative z-10" style={{ gap: '0.5rem' }} data-name="logo">
            {/* Logo Icon */}
            <div className="relative" style={{ height: '2.858rem', width: '3.087rem' }} data-name="logo">
              <Image alt="Cashop Logo Icon" width={49.386} height={45.729} className="w-full h-full object-contain" src={cashopLogoMain} />
            </div>
            {/* Logo Text and Tagline */}
            <div className="flex flex-col gap-0 items-start justify-start relative">
              {/* Main Logo Vector */}
              <div className="relative" style={{ height: '2.223rem', width: '7.576rem' }} data-name="Vector">
                <Image alt="Cashop Logo Vector" width={121.22} height={35.567} className="w-full h-full object-contain" src={cashopLogoMainText} />
              </div>
              {/* Tagline Text */}
              <div
                className={`font-medium leading-[0] not-italic relative text-[#222222]`}
                style={{ fontFamily: "'PingFang SC:Medium', sans-serif", fontSize: '0.5rem', height: '0.875rem', letterSpacing: locale === 'zh' ? '0.281rem' : '0' }}
              >
                <p className="leading-[14px]">{t('nav.tagline')}</p>
              </div>
            </div>
          </div>

          {/* Right Navigation */}
          <div className="flex items-center justify-start relative z-10" style={{ gap: '3.625rem' }}>
            {/* Language Switcher */}
            <LanguageSwitcher />
            
            {/* Download Icon */}
            <div
              className="relative cursor-pointer"
              style={{ width: '1.625rem', height: '1.625rem' }}
              data-name="icon下载"
              onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
            >
              <Image alt="Download" width={26} height={26} className="w-full h-full object-contain" src={downloadIcon} />
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="absolute backdrop-filter bg-[rgba(255,255,255,0.2)] flex items-center justify-start left-1/2 -translate-x-1/2" style={{ backdropFilter: 'blur(0.625rem)', height: '3.5rem', top: '42.75rem', width: '65.625rem' }}>
          {heroData.map((item, index) => (
            <div key={item.id} className="flex flex-col items-center justify-center relative cursor-pointer transition-all duration-300 hover:bg-[rgba(255,255,255,0.1)]" style={{ gap: '0.625rem', height: '3.5rem', padding: '1rem 2.625rem', width: '16.375rem' }} onClick={() => handleTabClick(index)}>
              <div className={`${activeTab === index ? 'font-medium' : 'font-normal'} text-center text-white whitespace-pre transition-all duration-300`} style={{ fontFamily: activeTab === index ? "'San Francisco Display:Medium', 'Noto Sans JP:Regular', 'Noto Sans SC:Regular', sans-serif" : "'San Francisco Display:Regular', 'Noto Sans SC:Regular', 'Noto Sans JP:Regular', sans-serif", fontVariationSettings: "'wght' 400", fontSize: '1rem', lineHeight: '1.375rem' }}>
                <p className="leading-[22px] whitespace-pre">{item.tab}</p>
              </div>
              {/* Divider - only show for items 1, 2, 3 (not the last one) */}
              {index < heroData.length - 1 && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px bg-[rgba(255,255,255,0.1)]" style={{ height: '1.5rem' }} />
              )}
            </div>
          ))}
          {/* Active Indicator */}
          <div className="absolute backdrop-filter bg-[#ff2d7f] transition-all duration-500 ease-in-out" style={{ backdropFilter: 'blur(0.625rem)', height: '0.25rem', top: '3.25rem', width: '16.375rem', left: `${activeTab * 16.375}rem` }} />
        </div>
      </div>

      {/* Partner Brands Section */}
      <div className="text-center" style={{ marginTop: '5.625rem' }}>
        <h2 className="font-semibold text-[#222222]" style={{ fontSize: '2.5rem', lineHeight: '3.75rem', marginBottom: '3.125rem' }}>
          {t('brands.title')}
        </h2>
        
        {/* Brand Wall Carousel */}
        <BrandWall />
        </div>
      </div>

      {/* Quality Assurance Section */}
      <div style={{ marginTop: '5.625rem' }}>
        <h2 className="font-semibold text-[#222222] text-center" style={{ fontSize: '2.5rem', lineHeight: '3.75rem', marginBottom: '3.625rem' }}>
          {t('quality_service.title')}
        </h2>
        
        <div className="flex justify-center" style={{ gap: '1rem' }}>
          {/* Service Card 1 */}
          <div className="content-stretch flex flex-col items-center justify-start overflow-clip relative" style={{ borderRadius: '0.25rem', height: '19.75rem', width: '21.188rem' }}>
            <div className="bg-center bg-cover bg-no-repeat shrink-0 w-full" style={{ height: '14.375rem', backgroundImage: `url('${serviceQualityInspection}')` }} />
            <div className="absolute bg-gradient-to-t from-[#576c78] from-[27.057%] to-[rgba(122,138,153,0)] to-[56.013%] left-0 top-0" style={{ height: '19.75rem', width: '21.188rem' }} />
            <div className="box-border content-stretch flex flex-col items-start justify-center relative shrink-0 w-full" style={{ gap: '0.625rem', height: '5.375rem', padding: '0 1.25rem' }}>
              <div className="font-['PingFang_SC:Bold',_sans-serif] not-italic relative shrink-0 text-nowrap text-white whitespace-pre" style={{ fontSize: '1.125rem', lineHeight: '1.5rem' }}>
                <p className="mb-0">{t('quality_service.inspection.title')}</p>
                <p>{t('quality_service.inspection.subtitle')}</p>
              </div>
            </div>
          </div>

          {/* Service Card 2 */}
          <div className="content-stretch flex flex-col items-center justify-start overflow-clip relative" style={{ borderRadius: '0.25rem', height: '19.75rem', width: '21.188rem' }}>
            <div className="bg-center bg-cover bg-no-repeat shrink-0 w-full" style={{ height: '14.375rem', backgroundImage: `url('${serviceReturns}')` }} />
            <div className="absolute bg-gradient-to-t from-[#736653] from-[27.057%] to-[rgba(122,138,153,0)] to-[56.013%] left-0 top-0" style={{ height: '19.75rem', width: '21.188rem' }} />
            <div className="box-border content-stretch flex flex-col items-start justify-center relative shrink-0 w-full" style={{ gap: '0.625rem', height: '5.375rem', padding: '0 1.25rem' }}>
              <div className="font-['PingFang_SC:Bold',_sans-serif] not-italic relative shrink-0 text-nowrap text-white whitespace-pre" style={{ fontSize: '1.125rem', lineHeight: '1.5rem' }}>
                <p className="mb-0">{t('quality_service.returns.title')}</p>
                <p>{t('quality_service.returns.subtitle')}</p>
              </div>
            </div>
          </div>

          {/* Service Card 3 */}
          <div className="content-stretch flex flex-col items-center justify-start overflow-clip relative" style={{ borderRadius: '0.25rem', height: '19.75rem', width: '21.188rem' }}>
            <div className="bg-center bg-cover bg-no-repeat shrink-0 w-full" style={{ height: '14.375rem', backgroundImage: `url('${serviceShipping}')` }} />
            <div className="absolute bg-gradient-to-t from-[#394b69] from-[27.057%] to-[rgba(122,138,153,0)] to-[56.013%] left-0 top-0" style={{ height: '19.75rem', width: '21.188rem' }} />
            <div className="box-border content-stretch flex flex-col items-start justify-center relative shrink-0 w-full" style={{ gap: '0.625rem', height: '5.375rem', padding: '0 1.25rem' }}>
              <div className="font-['PingFang_SC:Bold',_sans-serif] not-italic relative shrink-0 text-nowrap text-white whitespace-pre" style={{ fontSize: '1.125rem', lineHeight: '1.5rem' }}>
                <p className="mb-0">{t('quality_service.shipping.title')}</p>
                <p>{t('quality_service.shipping.subtitle')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Membership Benefits Section */}
      <div className="content-stretch flex flex-col items-center justify-start relative size-full" style={{ gap: '2.313rem', marginTop: '7.5rem' }} data-node-id="5703:57">
        <div className="font-['PingFang_SC:Semibold',_sans-serif] leading-[0] min-w-full not-italic relative shrink-0 text-[#222222] text-center" data-node-id="5641:344" style={{ width: "min-content", fontSize: '2.5rem' }}>
          <p style={{ lineHeight: '3.75rem' }}>{t('membership_page.title')}</p>
        </div>
        <div className="content-stretch flex items-center justify-start relative shrink-0" style={{ gap: '5.875rem' }} data-node-id="6033:2049">
          <div className="relative shrink-0" style={{ height: '28.375rem', width: '36.875rem' }} data-node-id="6033:2047">
            <div className="absolute bg-cover bg-center bg-white left-0 top-0" data-node-id="5703:17" style={{ backgroundImage: `url('${imgRectangle10}')`, height: '14.188rem', width: '18.875rem', borderRadius: '0.5rem' }}>
              <div aria-hidden="true" className="absolute border-[#dce8fd] border-solid pointer-events-none" style={{ borderWidth: '0.375rem', inset: '-0.375rem', borderRadius: '0.875rem' }} />
            </div>
            <div className="absolute bg-cover bg-center bg-white" data-node-id="5703:18" style={{ backgroundImage: `url('${imgRectangle11}')`, height: '14.188rem', left: '8.813rem', top: '7.063rem', width: '18.875rem', borderRadius: '0.5rem' }}>
              <div aria-hidden="true" className="absolute border-[#dce8fd] border-solid pointer-events-none" style={{ borderWidth: '0.375rem', inset: '-0.375rem', borderRadius: '0.875rem' }} />
            </div>
            <div className="absolute bg-cover bg-center bg-white" data-node-id="5703:19" style={{ backgroundImage: `url('${imgRectangle10}')`, height: '14.188rem', left: '18rem', top: '14.188rem', width: '18.875rem', borderRadius: '0.5rem' }}>
              <div aria-hidden="true" className="absolute border-[#dce8fd] border-solid pointer-events-none" style={{ borderWidth: '0.375rem', inset: '-0.375rem', borderRadius: '0.875rem' }} />
            </div>
          </div>
          <div className="content-stretch flex flex-col items-start justify-start relative shrink-0" style={{ gap: '5.5rem' }} data-node-id="6033:2048">
            <div className="content-stretch flex items-start justify-start relative shrink-0" style={{ gap: '1.563rem' }} data-node-id="5703:32">
              <div className="relative shrink-0" style={{ height: '2.643rem', width: '1.472rem' }} data-node-id="5703:29">
                <div className="absolute bottom-0 left-[-9.9%] right-[-3.17%] top-0">
                  <Image alt="" width={23.551} height={42.295} className="block max-w-none size-full" src={membershipIcon1} />
                </div>
              </div>
              <div className="font-['PingFang_SC:Semibold',_sans-serif] not-italic relative shrink-0 text-[#222222] text-nowrap whitespace-pre" data-node-id="5703:20" style={{ fontSize: '1.5rem', lineHeight: '2.625rem' }}>
                <p className="mb-0">
                  <span className="text-[#ff2d7f]">{t('membership_page.member_price.highlight')}</span>
                  <span>{t('membership_page.member_price.benefits')}</span>
                </p>
                <p>{t('membership_page.member_price.description')}</p>
              </div>
            </div>
            <div className="content-stretch flex items-start justify-start relative shrink-0" style={{ gap: '1.563rem' }} data-node-id="5703:33">
              <div className="relative shrink-0" style={{ height: '2.689rem', width: '1.506rem' }} data-node-id="5703:28">
                <div className="absolute bottom-0 left-[-9.68%] right-[-3.07%] top-0">
                  <Image alt="" width={24.096} height={43.03} className="block max-w-none size-full" src={membershipIcon2} />
                </div>
              </div>
              <div className="font-['PingFang_SC:Semibold',_sans-serif] not-italic relative shrink-0 text-[#222222] text-nowrap whitespace-pre" data-node-id="5703:21" style={{ fontSize: '1.5rem', lineHeight: '2.625rem' }}>
                <p className="mb-0">
                  <span>{t('membership_page.commission.prefix')}</span>
                  <span className="text-[#ff2d7f]">{t('membership_page.commission.highlight')}</span>
                </p>
                <p>{t('membership_page.commission.description')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cryptocurrency Payment Section */}
      <div style={{ marginTop: '7.5rem' }}>
        <h2 className="font-semibold text-[#222222] text-center" style={{ fontSize: '2.5rem', lineHeight: '3.75rem', marginBottom: '3.625rem' }}>
          {t('crypto_payment.title')}
        </h2>
        
        <div className="flex justify-center" style={{ gap: '1rem' }}>
          {/* Payment Card 1 */}
          <div className="content-stretch flex flex-col items-center justify-start overflow-clip relative" style={{ borderRadius: '0.25rem', height: '19.75rem', width: '21.188rem' }}>
            <div className="bg-center bg-cover bg-no-repeat shrink-0 w-full" style={{ height: '14.375rem', backgroundImage: `url('${cryptoPayment1}')` }} />
            <div className="absolute bg-gradient-to-t from-[#17323a] from-[27.057%] to-[rgba(122,138,153,0)] to-[56.013%] left-0 top-0" style={{ height: '19.75rem', width: '21.188rem' }} />
            <div className="box-border content-stretch flex flex-col items-start justify-center relative shrink-0 w-full" style={{ gap: '0.625rem', height: '5.375rem', padding: '0 1.25rem' }}>
              <div className="font-['PingFang_SC:Bold',_sans-serif] not-italic relative shrink-0 text-nowrap text-white whitespace-pre" style={{ fontSize: '1.125rem', lineHeight: '1.5rem' }}>
                <p className="mb-0 whitespace-normal">{t('crypto_payment.lower_fees.description')}</p>
              </div>
            </div>
          </div>

          {/* Payment Card 2 */}
          <div className="content-stretch flex flex-col items-center justify-start overflow-clip relative" style={{ borderRadius: '0.25rem', height: '19.75rem', width: '21.188rem' }}>
            <div className="bg-center bg-cover bg-no-repeat shrink-0 w-full" style={{ height: '14.375rem', backgroundImage: `url('${cryptoPayment2}')` }} />
            <div className="absolute bg-gradient-to-t from-[#576c78] from-[27.057%] to-[rgba(122,138,153,0)] to-[56.013%] left-0 top-0" style={{ height: '19.75rem', width: '21.188rem' }} />
            <div className="box-border content-stretch flex flex-col items-start justify-center relative shrink-0 w-full" style={{ gap: '0.625rem', height: '5.375rem', padding: '0 1.25rem' }}>
              <div className="font-['PingFang_SC:Bold',_sans-serif] not-italic relative shrink-0 text-nowrap text-white whitespace-pre" style={{ fontSize: '1.125rem', lineHeight: '1.5rem' }}>
                <p className="mb-0 whitespace-normal">{t('crypto_payment.global_support.description')}</p>
              </div>
            </div>
          </div>

          {/* Payment Card 3 */}
          <div className="content-stretch flex flex-col items-center justify-start overflow-clip relative" style={{ borderRadius: '0.25rem', height: '19.75rem', width: '21.188rem' }}>
            <div className="bg-center bg-cover bg-no-repeat shrink-0 w-full" style={{ height: '14.375rem', backgroundImage: `url('${cryptoPayment3}')` }} />
            <div className="absolute bg-gradient-to-t from-[#576c78] from-[27.057%] to-[rgba(122,138,153,0)] to-[56.013%] left-0 top-0" style={{ height: '19.75rem', width: '21.188rem' }} />
            <div className="box-border content-stretch flex flex-col items-start justify-center relative shrink-0 w-full" style={{ gap: '0.625rem', height: '5.375rem', padding: '0 1.25rem' }}>
              <div className="font-['PingFang_SC:Bold',_sans-serif] not-italic relative shrink-0 text-nowrap text-white whitespace-pre" style={{ fontSize: '1.125rem', lineHeight: '1.5rem' }}>
                <p className="mb-0 whitespace-normal">{t('crypto_payment.privacy.description')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="bg-gradient-to-r from-[#8B1538] via-[#5C2D91] to-[#1B365D] box-border content-stretch flex items-center justify-between relative h-auto w-full mx-auto" style={{ padding: '2.313rem 12.063rem', maxWidth: '90rem', marginTop: '7.5rem' }} data-name="div" data-node-id="5641:293">
        <div className="content-stretch flex flex-col items-start justify-start overflow-clip relative shrink-0" style={{ gap: '1.563rem', width: '45.813rem' }} data-name="col-md-3" data-node-id="5641:294">
          <div className="font-['Montserrat:Bold',_'Noto_Sans_SC:Bold',_'Noto_Sans_JP:Bold',_sans-serif] font-bold leading-[0] relative shrink-0 text-nowrap text-white" data-node-id="5641:295" style={{ fontSize: '1.5rem' }}>
            <p className="whitespace-pre" style={{ lineHeight: '2rem' }}>{t('footer.contact_us')}</p>
          </div>
          <div className="font-['PingFang_SC:Medium',_sans-serif] min-w-full not-italic relative shrink-0 text-white" data-node-id="5641:296" style={{ width: "min-content", fontSize: '0.875rem', lineHeight: '1.25rem' }}>
            <p className="mb-0">{t('footer.description')}</p>
          </div>
          <div className="content-stretch flex items-center justify-start overflow-clip relative shrink-0" style={{ gap: '1.25rem', height: '1.5rem', width: '9.75rem' }} data-name="social media" data-node-id="5641:297">
            <div className="relative shrink-0" style={{ width: '1.5rem', height: '1.5rem' }} data-name="ant-design:facebook-filled" data-node-id="5641:299">
              <Image alt="" width={24} height={24} className="block max-w-none size-full" src={facebookIcon} />
            </div>
            <div className="relative shrink-0" style={{ width: '1.5rem', height: '1.5rem' }} data-name="ant-design:instagram-outlined" data-node-id="5641:305">
              <Image alt="" width={24} height={24} className="block max-w-none size-full" src={instagramIcon} />
            </div>
            <div className="relative shrink-0" style={{ width: '1.5rem', height: '1.5rem' }} data-name="ant-design:twitter-outlined" data-node-id="5641:312">
              <Image alt="" width={24} height={24} className="block max-w-none size-full" src={twitterIcon} />
            </div>
            <div className="relative shrink-0" style={{ width: '1.5rem', height: '1.5rem' }} data-name="carbon:logo-youtube" data-node-id="5641:314">
              <Image alt="" width={24} height={24} className="block max-w-none size-full" src={youtubeIcon} />
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col items-center justify-start relative shrink-0" style={{ gap: '1rem' }} data-node-id="5641:318">
          <div className="relative shrink-0" style={{ width: '12.813rem', height: '12.813rem' }} data-node-id="5641:320">
            <Image alt="" width={205} height={205} className="block max-w-none size-full" src={qrCodeGroup} />
            <div className="absolute bg-cover bg-center bg-white" data-node-id="5641:325" style={{ backgroundImage: `url('${qrCodeBg}')`, width: '11.563rem', height: '11.563rem', left: '0.625rem', top: '0.625rem' }} />
          </div>
          <div className="font-['PingFang_SC:Bold',_sans-serif] leading-[0] min-w-full not-italic relative shrink-0 text-center text-white" data-node-id="5641:319" style={{ fontSize: '1.125rem' }}>
            <p style={{ lineHeight: '1.5rem' }}>{t('footer.scan_download')}</p>
          </div>
        </div>
      </div>

      {/* Copyright Footer */}
      <div className="bg-[#f9f9f9] left-0 overflow-hidden right-0 relative w-full mx-auto" style={{ height: '4.75rem', maxWidth: '90rem' }}>
        <div className="bg-cover bg-center bg-no-repeat left-0 right-0 absolute top-0 w-full" style={{ backgroundImage: `url('${footerBackground}')`, height: '4.75rem' }} />
        <div className="left-1/2 overflow-hidden top-0 -translate-x-1/2 absolute" style={{ height: '4.625rem', width: '65.625rem' }}>
          <div className="left-1/2 overflow-hidden -translate-x-1/2 w-[100%] absolute" style={{ height: '1.5rem', top: '1.563rem' }}>
            <div className="font-normal text-white text-center" style={{ fontSize: '0.875rem', lineHeight: '1.5rem' }}>
              {t('footer.copyright')} © {new Date().getFullYear()} www.cashop.com. {t('footer.copyright')}. {t('footer.terms')} | {t('footer.privacy')}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}