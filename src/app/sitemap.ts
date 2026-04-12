import { MetadataRoute } from 'next';
import { ALL_PRODUCTS } from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://alctrading.com';
  const currentDate = new Date().toISOString();

  const mainRoutes = [
    '',
    '/products/metals',
    '/products/chemicals',
    '/products/parachutes',
    '/products/dual-mirror-ii',
    '/products/sale-items',
  ].map((route) => {
    let priority = 0.8;
    if (route === '') priority = 1.0;
    if (route === '/products/sale-items') priority = 1.0;

    return {
      url: `${baseUrl}${route}`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority,
    };
  });

  const productRoutes = ALL_PRODUCTS.map((product) => {
    // Boost priority for high-value products with NSN or searchKeywords
    let priority = 0.6;
    if (product.searchKeywords && product.searchKeywords.length > 0) {
      priority = 0.9; // High-value SEO target products
    } else if (product.nsn) {
      priority = 0.8;
    }

    return {
      url: `${baseUrl}/products/${product.categorySlug}/${product.id}`,
      lastModified: currentDate,
      changeFrequency: (product.categorySlug === 'sale-items' ? 'weekly' : 'monthly') as 'weekly' | 'monthly',
      priority,
    };
  });

  return [...mainRoutes, ...productRoutes];
}
