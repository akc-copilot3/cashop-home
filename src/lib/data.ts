import { Product, Brand, Service, Locale } from '@/types'
import productsData from '@/data/products.json'
import brandsData from '@/data/brands.json'
import servicesData from '@/data/services.json'

export async function getProducts(locale: Locale = 'en'): Promise<Product[]> {
  return productsData.products as Product[]
}

export async function getFeaturedProducts(locale: Locale = 'en'): Promise<Product[]> {
  const products = await getProducts(locale)
  return products.filter(product => product.featured)
}

export async function getProductsByCategory(category: string, locale: Locale = 'en'): Promise<Product[]> {
  const products = await getProducts(locale)
  return products.filter(product => product.category === category)
}

export async function getProductById(id: string, locale: Locale = 'en'): Promise<Product | null> {
  const products = await getProducts(locale)
  return products.find(product => product.id === id) || null
}

export async function getBrands(locale: Locale = 'en'): Promise<Brand[]> {
  return brandsData.brands as Brand[]
}

export async function getFeaturedBrands(locale: Locale = 'en'): Promise<Brand[]> {
  const brands = await getBrands(locale)
  return brands.filter(brand => brand.featured)
}

export async function getBrandsByCategory(category: string, locale: Locale = 'en'): Promise<Brand[]> {
  const brands = await getBrands(locale)
  return brands.filter(brand => brand.category === category)
}

export async function getBrandById(id: string, locale: Locale = 'en'): Promise<Brand | null> {
  const brands = await getBrands(locale)
  return brands.find(brand => brand.id === id) || null
}

export async function getServices(locale: Locale = 'en'): Promise<Service> {
  return servicesData as Service
}

export async function getProductCategories(locale: Locale = 'en') {
  return productsData.categories
}

export function getLocalizedText(
  textObj: { en: string; zh: string; ja: string },
  locale: Locale
): string {
  return textObj[locale] || textObj.en
}