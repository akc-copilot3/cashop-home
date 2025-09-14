export const translations = {
  en: {
    nav: {
      products: "Products",
      brands: "Brands", 
      services: "Services",
      about: "About",
      signup: "Sign Up"
    },
    hero: {
      title: "China Top Brands Worldwide",
      subtitle: "Discover authentic Chinese brands with crypto payment support. Quality products, competitive prices, global shipping.",
      cta: "🚀 Start Shopping"
    },
    features: {
      crypto: {
        title: "Crypto Payment",
        description: "Support USDT, USDC and other major cryptocurrencies. Secure, fast, and global payments."
      },
      quality: {
        title: "Quality Inspection", 
        description: "Free 7-photo quality inspection with detailed video documentation for every product."
      },
      shipping: {
        title: "Global Shipping",
        description: "Consolidated shipping to reduce costs. Professional packaging and global delivery."
      }
    },
    products: {
      title: "Featured Products",
      subtitle: "Premium Chinese brands at unbeatable prices",
      viewAll: "View All Products →",
      viewDetails: "View Details",
      save: "Save",
      categories: {
        sports: "Sports",
        electronics: "Electronics"
      }
    },
    footer: {
      description: "China Top Brands Worldwide. Crypto payment, quality inspection, global shipping.",
      products: "Products",
      services: "Services", 
      company: "Company",
      copyright: "© 2024 Cashop. All rights reserved. Made with ❤️ for global customers.",
      productLinks: {
        sportsAndFitness: "Sports & Fitness",
        electronics: "Electronics",
        fashionAndBeauty: "Fashion & Beauty",
        homeAndGarden: "Home & Garden"
      },
      serviceLinks: {
        qualityInspection: "Quality Inspection",
        globalShipping: "Global Shipping",
        cryptoPayment: "Crypto Payment",
        support247: "24/7 Support"
      },
      companyLinks: {
        aboutUs: "About Us",
        contact: "Contact",
        privacyPolicy: "Privacy Policy",
        termsOfService: "Terms of Service"
      }
    }
  },
  zh: {
    nav: {
      products: "商品",
      brands: "品牌",
      services: "服务", 
      about: "关于我们",
      signup: "注册"
    },
    hero: {
      title: "中国优质品牌，全球共享",
      subtitle: "发现正宗中国品牌，支持加密货币支付。优质产品，竞争价格，全球配送。",
      cta: "🚀 立即购买"
    },
    features: {
      crypto: {
        title: "加密货币支付",
        description: "支持USDT、USDC等主流加密货币。安全、快速、全球支付。"
      },
      quality: {
        title: "质检服务",
        description: "免费7张图片质检服务，每件商品都配备详细视频记录。"
      },
      shipping: {
        title: "全球配送", 
        description: "集运合并降低成本。专业包装，全球配送服务。"
      }
    },
    products: {
      title: "精选产品",
      subtitle: "中国优质品牌，超值价格",
      viewAll: "查看所有商品 →",
      viewDetails: "查看详情",
      save: "节省",
      categories: {
        sports: "运动",
        electronics: "电子产品"
      }
    },
    footer: {
      description: "中国优质品牌，全球共享。加密货币支付，质检服务，全球配送。",
      products: "商品",
      services: "服务",
      company: "公司",
      copyright: "© 2024 Cashop. 保留所有权利。用❤️为全球客户制作。",
      productLinks: {
        sportsAndFitness: "运动健身",
        electronics: "电子产品",
        fashionAndBeauty: "时尚美妆",
        homeAndGarden: "家居园艺"
      },
      serviceLinks: {
        qualityInspection: "质量检测",
        globalShipping: "全球配送",
        cryptoPayment: "加密支付",
        support247: "24/7客服"
      },
      companyLinks: {
        aboutUs: "关于我们",
        contact: "联系我们",
        privacyPolicy: "隐私政策",
        termsOfService: "服务条款"
      }
    }
  },
  ja: {
    nav: {
      products: "商品",
      brands: "ブランド",
      services: "サービス",
      about: "会社について", 
      signup: "サインアップ"
    },
    hero: {
      title: "中国プレミアムブランドを世界へ",
      subtitle: "本格的な中国ブランドを発見。暗号通貨決済対応。高品質商品、競争力のある価格、グローバル配送。",
      cta: "🚀 ショッピング開始"
    },
    features: {
      crypto: {
        title: "暗号通貨決済",
        description: "USDT、USDCなどの主要暗号通貨をサポート。安全、高速、グローバル決済。"
      },
      quality: {
        title: "品質検査",
        description: "無料7枚写真品質検査、すべての商品に詳細なビデオ記録付き。"
      },
      shipping: {
        title: "グローバル配送",
        description: "統合配送でコスト削減。プロの梱包とグローバル配送。"
      }
    },
    products: {
      title: "注目商品", 
      subtitle: "中国プレミアムブランドをお得な価格で",
      viewAll: "すべての商品を見る →",
      viewDetails: "詳細を見る",
      save: "節約",
      categories: {
        sports: "スポーツ",
        electronics: "電子機器"
      }
    },
    footer: {
      description: "中国プレミアムブランドを世界へ。暗号通貨決済、品質検査、グローバル配送。",
      products: "商品",
      services: "サービス",
      company: "会社",
      copyright: "© 2024 Cashop. All rights reserved. 世界のお客様のために❤️で制作。",
      productLinks: {
        sportsAndFitness: "スポーツ・フィットネス",
        electronics: "電子機器",
        fashionAndBeauty: "ファッション・美容",
        homeAndGarden: "ホーム・ガーデン"
      },
      serviceLinks: {
        qualityInspection: "品質検査",
        globalShipping: "グローバル配送",
        cryptoPayment: "暗号通貨決済",
        support247: "24時間サポート"
      },
      companyLinks: {
        aboutUs: "会社について",
        contact: "お問い合わせ",
        privacyPolicy: "プライバシーポリシー",
        termsOfService: "利用規約"
      }
    }
  }
} as const

export type Locale = 'en' | 'zh' | 'ja'
export type TranslationKey = keyof typeof translations.en