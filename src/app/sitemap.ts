import { MetadataRoute } from 'next';
import { getAllProductSlugs } from '@/lib/sanity';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://alctrading.com';
  const currentDate = new Date().toISOString();

  const mainRoutes = [
    '',
    '/products/metals',
    '/products/chemicals',
    '/products/parachutes',
    '/products/dual-mirror-ii',
    '/products/sale-items',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: route === '' || route === '/products/sale-items' ? 1.0 : 0.8,
  }));

  let productRoutes: MetadataRoute.Sitemap = [];
  try {
    const slugs = await getAllProductSlugs();
    productRoutes = slugs.map(({ categorySlug, slug, nsn, searchKeywords }) => {
      let priority = 0.6;
      if (searchKeywords && searchKeywords.length > 0) priority = 0.9;
      else if (nsn) priority = 0.8;
      return {
        url: `${baseUrl}/products/${categorySlug}/${slug}`,
        lastModified: currentDate,
        changeFrequency: (categorySlug === 'sale-items' ? 'weekly' : 'monthly') as 'weekly' | 'monthly',
        priority,
      };
    });
  } catch {
    // Sanity unavailable — products omitted from sitemap
  }

  return [...mainRoutes, ...productRoutes];
}
