import { MetadataRoute } from 'next'
import { getAllPages } from '@/lib/store'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://label4security.com'

  let verificationUrls: MetadataRoute.Sitemap = []

  try {
    const authPages = await getAllPages();
    verificationUrls = authPages.map((page) => ({
      url: `${baseUrl}/verify/${page.uuid}`,
      lastModified: new Date(page.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
  } catch (error) {
    console.warn('Sitemap dynamic page fetch skipped during build:', error)
  }

  const productCategories = [
    'security-holograms',
    'security-labels',
    'product-labels',
    'shrink-sleeves',
    'dome-labels',
    'industrial-labels',
    'pvc-vinyl-stickers',
  ]

  const productCategoryUrls: MetadataRoute.Sitemap = productCategories.map((category) => ({
    url: `${baseUrl}/products/${category}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))

  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ]

  return [...staticUrls, ...productCategoryUrls, ...verificationUrls]
}
