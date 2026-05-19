import { MetadataRoute } from 'next';
import { getAllProductSlugs } from '@/lib/sanity';
import { PRODUCT_DETAIL_SLUGS, hasDetailPage } from '@/lib/product-details';

// Actual last-modified dates for static routes — update when content changes
const STATIC_ROUTE_DATES: Record<string, string> = {
  '':                        '2025-05-01',
  '/products/metals':        '2025-05-01',
  '/products/chemicals':     '2025-05-01',
  '/products/parachutes':    '2025-05-01',
  '/products/dual-mirror-ii':'2025-05-01',
  '/products/sale-items':    '2025-05-01',
};

// Actual last-modified dates for detail pages — update whenever content in product-details.ts changes
const DETAIL_PAGE_DATES: Record<string, string> = {
  'mil-prf-46000': '2025-05-19',
  'mil-prf-46170': '2025-05-19',
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://alctrading.com';

  const mainRoutes = [
    '',
    '/products/metals',
    '/products/chemicals',
    '/products/parachutes',
    '/products/dual-mirror-ii',
    '/products/sale-items',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: STATIC_ROUTE_DATES[route],
    changeFrequency: 'weekly' as const,
    priority: route === '' || route === '/products/sale-items' ? 1.0 : 0.8,
  }));

  let productRoutes: MetadataRoute.Sitemap = [];
  try {
    const slugs = await getAllProductSlugs();
    productRoutes = slugs.map(({ categorySlug, slug, nsn, searchKeywords, _updatedAt }) => {
      let priority = 0.6;
      if (searchKeywords && searchKeywords.length > 0) priority = 0.9;
      else if (nsn) priority = 0.8;
      else if (hasDetailPage(slug)) priority = 0.85;
      return {
        url: `${baseUrl}/products/${categorySlug}/${slug}`,
        lastModified: _updatedAt ?? '2025-05-01',
        changeFrequency: (categorySlug === 'sale-items' ? 'weekly' : 'monthly') as 'weekly' | 'monthly',
        priority,
      };
    });
  } catch {
    // Sanity unavailable — products omitted from sitemap
  }

  const detailRoutes: MetadataRoute.Sitemap = PRODUCT_DETAIL_SLUGS.map(({ categorySlug, slug }) => ({
    url: `${baseUrl}/products/${categorySlug}/${slug}/details`,
    lastModified: DETAIL_PAGE_DATES[slug] ?? '2025-05-19',
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }));

  return [...mainRoutes, ...productRoutes, ...detailRoutes];
}
