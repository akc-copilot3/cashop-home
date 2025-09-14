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
    <div className="bg-gradient-to-b from-white to-[#c8dbfd] relative w-full min-w-[1440px]">
      <div className="w-[1440px] mx-auto relative">
      {/* Header Section */}
      <div className="relative bg-[#f9f9f9] h-[800px] overflow-hidden">
        <div className="absolute bg-neutral-50 h-[863px] left-0 right-0 top-0" />
        
        {/* Background Filter */}
        <div 
          className="absolute bg-[#f9f9f9] inset-0 overflow-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="absolute bg-cover bg-center bg-white inset-0 transition-all duration-500" style={{ backgroundImage: `url('${currentHero.background}')` }} />
          <div className="absolute bg-black bg-opacity-50 bottom-0 h-[800px] left-1/2 -translate-x-1/2 w-[1440px]" />
          
          {/* Main Hero Content */}
          <div className="absolute flex flex-col gap-[30px] h-[156px] items-start justify-start left-[194px] top-[332px] w-[928px]">
            <div className="flex gap-4 items-center justify-start relative">
              <div className="font-bold text-[60px] text-white tracking-[2px] leading-[80px] whitespace-pre transition-all duration-500" style={{ fontFamily: "'Alimama_FangYuanTi_VF:Bold-Square', sans-serif" }}>
                <p className="leading-[80px] whitespace-pre">
                  <span style={{ color: currentHero.title.color }}>{currentHero.title.highlight}</span>
                  <span className="text-white">{currentHero.title.main}</span>
                </p>
              </div>
              <div className="relative w-[46px] h-[46px]">
                <Image alt="" width={46} height={46} className="w-full h-full object-contain transition-all duration-500" src={currentHero.icon} />
              </div>
            </div>
            <div className="font-normal text-[32px] text-white leading-[46px] min-w-full transition-all duration-500" style={{ fontFamily: "'PingFang SC:Regular', sans-serif", width: "min-content" }}>
              <p className="leading-[46px]">{currentHero.description}</p>
            </div>
          </div>
        </div>

        {/* Navigation Bar */}
        <div className="absolute flex h-[104px] items-center justify-between left-1/2 overflow-hidden px-10 py-6 top-0 -translate-x-1/2 w-[1440px] z-20">
          {/* Background Layer with Blur Effect */}
          <div className="absolute backdrop-blur-[20px] backdrop-filter bg-[rgba(255,255,255,0.7)] h-[104px] left-0 top-0 w-[1440px] -z-10" style={{ backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }} />
          
          {/* Logo Section */}
          <div className="flex gap-2 items-start justify-start overflow-hidden relative z-10" data-name="logo">
            {/* Logo Icon */}
            <div className="h-[45.729px] relative w-[49.386px]" data-name="logo">
              <Image alt="Cashop Logo Icon" width={49.386} height={45.729} className="w-full h-full object-contain" src={cashopLogoMain} />
            </div>
            {/* Logo Text and Tagline */}
            <div className="flex flex-col gap-0 items-start justify-start relative">
              {/* Main Logo Vector */}
              <div className="h-[35.567px] relative w-[121.22px]" data-name="Vector">
                <Image alt="Cashop Logo Vector" width={121.22} height={35.567} className="w-full h-full object-contain" src={cashopLogoMainText} />
              </div>
              {/* Tagline Text */}
              <div
                className={`font-medium h-3.5 leading-[0] not-italic relative text-[8px] text-[#222222]${locale === 'zh' ? ' tracking-[4.5px]' : ''}`}
                style={{ fontFamily: "'PingFang SC:Medium', sans-serif" }}
              >
                <p className="leading-[14px]">{t('nav.tagline')}</p>
              </div>
            </div>
          </div>

          {/* Right Navigation */}
          <div className="flex gap-[58px] items-center justify-start relative z-10">
            {/* Language Switcher */}
            <LanguageSwitcher />
            
            {/* Download Icon */}
            <div 
              className="relative w-[26px] h-[26px] cursor-pointer" 
              data-name="icon下载"
              onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
            >
              <Image alt="Download" width={26} height={26} className="w-full h-full object-contain" src={downloadIcon} />
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="absolute backdrop-blur-[10px] backdrop-filter bg-[rgba(255,255,255,0.2)] flex h-14 items-center justify-start left-[195px] top-[684px] w-[1050px]">
          {heroData.map((item, index) => (
            <div key={item.id} className="flex flex-col gap-2.5 h-14 items-center justify-center px-[42px] py-4 relative w-[262px] cursor-pointer transition-all duration-300 hover:bg-[rgba(255,255,255,0.1)]" onClick={() => handleTabClick(index)}>
              <div className={`${activeTab === index ? 'font-medium' : 'font-normal'} text-[16px] text-center text-white leading-[22px] whitespace-pre transition-all duration-300`} style={{ fontFamily: activeTab === index ? "'San Francisco Display:Medium', 'Noto Sans JP:Regular', 'Noto Sans SC:Regular', sans-serif" : "'San Francisco Display:Regular', 'Noto Sans SC:Regular', 'Noto Sans JP:Regular', sans-serif", fontVariationSettings: "'wght' 400" }}>
                <p className="leading-[22px] whitespace-pre">{item.tab}</p>
              </div>
              {/* Divider - only show for items 1, 2, 3 (not the last one) */}
              {index < heroData.length - 1 && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-6 bg-[rgba(255,255,255,0.1)]" />
              )}
            </div>
          ))}
          {/* Active Indicator */}
          <div className="absolute backdrop-blur-[10px] backdrop-filter bg-[#ff2d7f] h-1 top-[52px] w-[262px] transition-all duration-500 ease-in-out" style={{ left: `${activeTab * 262}px` }} />
        </div>
      </div>

      {/* Partner Brands Section */}
      <div className="mt-[90px] text-center">
        <h2 className="font-semibold text-[40px] text-[#222222] leading-[60px] mb-[50px]">
          {t('brands.title')}
        </h2>
        
        {/* Brand Wall Carousel */}
        <BrandWall />
        </div>
      </div>

      {/* Quality Assurance Section */}
      <div className="mt-[90px]">
        <h2 className="font-semibold text-[40px] text-[#222222] text-center leading-[60px] mb-[58px]">
          {t('quality_service.title')}
        </h2>
        
        <div className="flex gap-4 justify-center">
          {/* Service Card 1 */}
          <div className="content-stretch flex flex-col items-center justify-start overflow-clip relative rounded-[4px] h-[316px] w-[339px]">
            <div className="bg-center bg-cover bg-no-repeat h-[230px] shrink-0 w-full" style={{ backgroundImage: `url('${serviceQualityInspection}')` }} />
            <div className="absolute bg-gradient-to-t from-[#576c78] from-[27.057%] to-[rgba(122,138,153,0)] to-[56.013%] h-[316px] left-0 top-0 w-[339px]" />
            <div className="box-border content-stretch flex flex-col gap-2.5 h-[86px] items-start justify-center px-5 py-0 relative shrink-0 w-full">
              <div className="font-['PingFang_SC:Bold',_sans-serif] leading-[24px] not-italic relative shrink-0 text-[18px] text-nowrap text-white whitespace-pre">
                <p className="mb-0">{t('quality_service.inspection.title')}</p>
                <p>{t('quality_service.inspection.subtitle')}</p>
              </div>
            </div>
          </div>

          {/* Service Card 2 */}
          <div className="content-stretch flex flex-col items-center justify-start overflow-clip relative rounded-[4px] h-[316px] w-[339px]">
            <div className="bg-center bg-cover bg-no-repeat h-[230px] shrink-0 w-full" style={{ backgroundImage: `url('${serviceReturns}')` }} />
            <div className="absolute bg-gradient-to-t from-[#736653] from-[27.057%] to-[rgba(122,138,153,0)] to-[56.013%] h-[316px] left-0 top-0 w-[339px]" />
            <div className="box-border content-stretch flex flex-col gap-2.5 h-[86px] items-start justify-center px-5 py-0 relative shrink-0 w-full">
              <div className="font-['PingFang_SC:Bold',_sans-serif] leading-[24px] not-italic relative shrink-0 text-[18px] text-nowrap text-white whitespace-pre">
                <p className="mb-0">{t('quality_service.returns.title')}</p>
                <p>{t('quality_service.returns.subtitle')}</p>
              </div>
            </div>
          </div>

          {/* Service Card 3 */}
          <div className="content-stretch flex flex-col items-center justify-start overflow-clip relative rounded-[4px] h-[316px] w-[339px]">
            <div className="bg-center bg-cover bg-no-repeat h-[230px] shrink-0 w-full" style={{ backgroundImage: `url('${serviceShipping}')` }} />
            <div className="absolute bg-gradient-to-t from-[#394b69] from-[27.057%] to-[rgba(122,138,153,0)] to-[56.013%] h-[316px] left-0 top-0 w-[339px]" />
            <div className="box-border content-stretch flex flex-col gap-2.5 h-[86px] items-start justify-center px-5 py-0 relative shrink-0 w-full">
              <div className="font-['PingFang_SC:Bold',_sans-serif] leading-[24px] not-italic relative shrink-0 text-[18px] text-nowrap text-white whitespace-pre">
                <p className="mb-0">{t('quality_service.shipping.title')}</p>
                <p>{t('quality_service.shipping.subtitle')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Membership Benefits Section */}
      <div className="content-stretch flex flex-col gap-[37px] items-center justify-start relative size-full mt-[120px]" data-node-id="5703:57">
        <div className="font-['PingFang_SC:Semibold',_sans-serif] leading-[0] min-w-full not-italic relative shrink-0 text-[#222222] text-[40px] text-center" data-node-id="5641:344" style={{ width: "min-content" }}>
          <p className="leading-[60px]">{t('membership_page.title')}</p>
        </div>
        <div className="content-stretch flex gap-[94px] items-center justify-start relative shrink-0" data-node-id="6033:2049">
          <div className="h-[454px] relative shrink-0 w-[590px]" data-node-id="6033:2047">
            <div className="absolute bg-cover bg-center bg-white h-[227px] left-0 rounded-[8px] top-0 w-[302px]" data-node-id="5703:17" style={{ backgroundImage: `url('${imgRectangle10}')` }}>
              <div aria-hidden="true" className="absolute border-[#dce8fd] border-[6px] border-solid inset-[-6px] pointer-events-none rounded-[14px]" />
            </div>
            <div className="absolute bg-cover bg-center bg-white h-[227px] left-[141px] rounded-[8px] top-[113px] w-[302px]" data-node-id="5703:18" style={{ backgroundImage: `url('${imgRectangle11}')` }}>
              <div aria-hidden="true" className="absolute border-[#dce8fd] border-[6px] border-solid inset-[-6px] pointer-events-none rounded-[14px]" />
            </div>
            <div className="absolute bg-cover bg-center bg-white h-[227px] left-72 rounded-[8px] top-[227px] w-[302px]" data-node-id="5703:19" style={{ backgroundImage: `url('${imgRectangle10}')` }}>
              <div aria-hidden="true" className="absolute border-[#dce8fd] border-[6px] border-solid inset-[-6px] pointer-events-none rounded-[14px]" />
            </div>
          </div>
          <div className="content-stretch flex flex-col gap-[88px] items-start justify-start relative shrink-0" data-node-id="6033:2048">
            <div className="content-stretch flex gap-[25px] items-start justify-start relative shrink-0" data-node-id="5703:32">
              <div className="h-[42.295px] relative shrink-0 w-[23.551px]" data-node-id="5703:29">
                <div className="absolute bottom-0 left-[-9.9%] right-[-3.17%] top-0">
                  <Image alt="" width={23.551} height={42.295} className="block max-w-none size-full" src={membershipIcon1} />
                </div>
              </div>
              <div className="font-['PingFang_SC:Semibold',_sans-serif] leading-[42px] not-italic relative shrink-0 text-[#222222] text-[24px] text-nowrap whitespace-pre" data-node-id="5703:20">
                <p className="mb-0">
                  <span className="text-[#ff2d7f]">{t('membership_page.member_price.highlight')}</span>
                  <span>{t('membership_page.member_price.benefits')}</span>
                </p>
                <p>{t('membership_page.member_price.description')}</p>
              </div>
            </div>
            <div className="content-stretch flex gap-[25px] items-start justify-start relative shrink-0" data-node-id="5703:33">
              <div className="h-[43.03px] relative shrink-0 w-[24.096px]" data-node-id="5703:28">
                <div className="absolute bottom-0 left-[-9.68%] right-[-3.07%] top-0">
                  <Image alt="" width={24.096} height={43.03} className="block max-w-none size-full" src={membershipIcon2} />
                </div>
              </div>
              <div className="font-['PingFang_SC:Semibold',_sans-serif] leading-[42px] not-italic relative shrink-0 text-[#222222] text-[24px] text-nowrap whitespace-pre" data-node-id="5703:21">
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
      <div className="mt-[120px]">
        <h2 className="font-semibold text-[40px] text-[#222222] text-center leading-[60px] mb-[58px]">
          {t('crypto_payment.title')}
        </h2>
        
        <div className="flex gap-4 justify-center">
          {/* Payment Card 1 */}
          <div className="content-stretch flex flex-col items-center justify-start overflow-clip relative rounded-[4px] h-[316px] w-[339px]">
            <div className="bg-center bg-cover bg-no-repeat h-[230px] shrink-0 w-full" style={{ backgroundImage: `url('${cryptoPayment1}')` }} />
            <div className="absolute bg-gradient-to-t from-[#17323a] from-[27.057%] to-[rgba(122,138,153,0)] to-[56.013%] h-[316px] left-0 top-0 w-[339px]" />
            <div className="box-border content-stretch flex flex-col gap-2.5 h-[86px] items-start justify-center px-5 py-0 relative shrink-0 w-full">
              <div className="font-['PingFang_SC:Bold',_sans-serif] leading-[24px] not-italic relative shrink-0 text-[18px] text-nowrap text-white whitespace-pre">
                <p className="mb-0 whitespace-normal">{t('crypto_payment.lower_fees.description')}</p>
              </div>
            </div>
          </div>

          {/* Payment Card 2 */}
          <div className="content-stretch flex flex-col items-center justify-start overflow-clip relative rounded-[4px] h-[316px] w-[339px]">
            <div className="bg-center bg-cover bg-no-repeat h-[230px] shrink-0 w-full" style={{ backgroundImage: `url('${cryptoPayment2}')` }} />
            <div className="absolute bg-gradient-to-t from-[#576c78] from-[27.057%] to-[rgba(122,138,153,0)] to-[56.013%] h-[316px] left-0 top-0 w-[339px]" />
            <div className="box-border content-stretch flex flex-col gap-2.5 h-[86px] items-start justify-center px-5 py-0 relative shrink-0 w-full">
              <div className="font-['PingFang_SC:Bold',_sans-serif] leading-[24px] not-italic relative shrink-0 text-[18px] text-nowrap text-white whitespace-pre">
                <p className="mb-0 whitespace-normal">{t('crypto_payment.global_support.description')}</p>
              </div>
            </div>
          </div>

          {/* Payment Card 3 */}
          <div className="content-stretch flex flex-col items-center justify-start overflow-clip relative rounded-[4px] h-[316px] w-[339px]">
            <div className="bg-center bg-cover bg-no-repeat h-[230px] shrink-0 w-full" style={{ backgroundImage: `url('${cryptoPayment3}')` }} />
            <div className="absolute bg-gradient-to-t from-[#576c78] from-[27.057%] to-[rgba(122,138,153,0)] to-[56.013%] h-[316px] left-0 top-0 w-[339px]" />
            <div className="box-border content-stretch flex flex-col gap-2.5 h-[86px] items-start justify-center px-5 py-0 relative shrink-0 w-full">
              <div className="font-['PingFang_SC:Bold',_sans-serif] leading-[24px] not-italic relative shrink-0 text-[18px] text-nowrap text-white whitespace-pre">
                <p className="mb-0 whitespace-normal">{t('crypto_payment.privacy.description')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="bg-gradient-to-r from-[#8B1538] via-[#5C2D91] to-[#1B365D] box-border content-stretch flex items-center justify-between px-[193px] py-[37px] relative w-[1440px] h-auto mx-auto mt-[120px]" data-name="div" data-node-id="5641:293">
        <div className="content-stretch flex flex-col gap-[25px] items-start justify-start overflow-clip relative shrink-0 w-[733px]" data-name="col-md-3" data-node-id="5641:294">
          <div className="font-['Montserrat:Bold',_'Noto_Sans_SC:Bold',_'Noto_Sans_JP:Bold',_sans-serif] font-bold leading-[0] relative shrink-0 text-[24px] text-nowrap text-white" data-node-id="5641:295">
            <p className="leading-[32px] whitespace-pre">{t('footer.contact_us')}</p>
          </div>
          <div className="font-['PingFang_SC:Medium',_sans-serif] leading-[20px] min-w-full not-italic relative shrink-0 text-[14px] text-white" data-node-id="5641:296" style={{ width: "min-content" }}>
            <p className="mb-0">{t('footer.description')}</p>
          </div>
          <div className="content-stretch flex gap-5 h-6 items-center justify-start overflow-clip relative shrink-0 w-[156px]" data-name="social media" data-node-id="5641:297">
            <div className="relative shrink-0 size-6" data-name="ant-design:facebook-filled" data-node-id="5641:299">
              <Image alt="" width={24} height={24} className="block max-w-none size-full" src={facebookIcon} />
            </div>
            <div className="relative shrink-0 size-6" data-name="ant-design:instagram-outlined" data-node-id="5641:305">
              <Image alt="" width={24} height={24} className="block max-w-none size-full" src={instagramIcon} />
            </div>
            <div className="relative shrink-0 size-6" data-name="ant-design:twitter-outlined" data-node-id="5641:312">
              <Image alt="" width={24} height={24} className="block max-w-none size-full" src={twitterIcon} />
            </div>
            <div className="relative shrink-0 size-6" data-name="carbon:logo-youtube" data-node-id="5641:314">
              <Image alt="" width={24} height={24} className="block max-w-none size-full" src={youtubeIcon} />
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col gap-4 items-center justify-start relative shrink-0" data-node-id="5641:318">
          <div className="relative shrink-0 size-[205px]" data-node-id="5641:320">
            <Image alt="" width={205} height={205} className="block max-w-none size-full" src={qrCodeGroup} />
            <div className="absolute bg-cover bg-center bg-white left-2.5 size-[185px] top-2.5" data-node-id="5641:325" style={{ backgroundImage: `url('${qrCodeBg}')` }} />
          </div>
          <div className="font-['PingFang_SC:Bold',_sans-serif] leading-[0] min-w-full not-italic relative shrink-0 text-[18px] text-center text-white" data-node-id="5641:319">
            <p className="leading-[24px]">{t('footer.scan_download')}</p>
          </div>
        </div>
      </div>

      {/* Copyright Footer */}
      <div className="bg-[#f9f9f9] h-[76px] w-[1440px] left-0 overflow-hidden right-0 relative mx-auto">
        <div className="bg-cover bg-center bg-no-repeat h-[76px] left-0 right-0 absolute top-0" style={{ backgroundImage: `url('${footerBackground}')` }} />
        <div className="h-[74px] left-1/2 overflow-hidden top-0 -translate-x-1/2 w-[1050px] absolute">
          <div className="h-6 left-1/2 overflow-hidden top-[25px] -translate-x-1/2 w-[100%] absolute">
            <div className="font-normal text-[14px] text-white leading-[24px] text-center">
              {t('footer.copyright')} © {new Date().getFullYear()} www.cashop.com. {t('footer.copyright')}. {t('footer.terms')} | {t('footer.privacy')}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}