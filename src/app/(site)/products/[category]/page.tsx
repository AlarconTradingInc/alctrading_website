import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllCategories, getProductsByCategory } from '@/lib/sanity';

// Slugs that have their own dedicated static page — this dynamic route must not conflict with them
const STATIC_SLUGS = new Set(['metals', 'chemicals', 'parachutes', 'dual-mirror-ii', 'sale-items']);

type Props = { params: Promise<{ category: string }> };

export async function generateStaticParams() {
    try {
        const categories = await getAllCategories();
        return categories
            .filter((c) => !STATIC_SLUGS.has(c.slug))
            .map((c) => ({ category: c.slug }));
    } catch {
        return [];
    }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { category: categorySlug } = await params;
    if (STATIC_SLUGS.has(categorySlug)) return {};

    try {
        const categories = await getAllCategories();
        const cat = categories.find((c) => c.slug === categorySlug);
        if (!cat) return {};

        const title = `${cat.title} | ALC Trading Military & Aerospace Supplies`;
        const description = cat.description || `${cat.title} products available from ALC Trading.`;

        return {
            title,
            description,
            openGraph: {
                title,
                description,
                url: `/products/${cat.slug}`,
                siteName: 'ALC Trading',
                locale: 'en_US',
                type: 'website',
                images: [{
                    url: 'https://alctrading.com/logomain_transparent.png',
                    width: 800,
                    height: 270,
                    alt: `ALC Trading ${cat.title}`,
                }],
            },
            twitter: { card: 'summary_large_image', title, description },
            alternates: { canonical: `/products/${cat.slug}` },
            robots: {
                index: true,
                follow: true,
                googleBot: {
                    index: true,
                    follow: true,
                    'max-video-preview': -1,
                    'max-image-preview': 'large' as const,
                    'max-snippet': -1,
                },
            },
        };
    } catch {
        return {};
    }
}

export default async function DynamicCategoryPage({ params }: Props) {
    const { category: categorySlug } = await params;

    // Let static pages handle their own routes
    if (STATIC_SLUGS.has(categorySlug)) notFound();

    let category: { title: string; slug: string; description: string } | undefined;
    let products: Array<{
        _id: string; name: string; slug: string; subCategory?: string;
        description: string; partNumber?: string; nsn?: string; qty?: number;
    }> = [];

    try {
        const [categories, prods] = await Promise.all([
            getAllCategories(),
            getProductsByCategory(categorySlug),
        ]);
        category = categories.find((c) => c.slug === categorySlug);
        products = prods;
    } catch {
        notFound();
    }

    if (!category) notFound();

    // Group products by subCategory
    const groups = products.reduce<Record<string, typeof products>>((acc, p) => {
        const key = p.subCategory || 'Products';
        if (!acc[key]) acc[key] = [];
        acc[key].push(p);
        return acc;
    }, {});

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://alctrading.com/' },
            { '@type': 'ListItem', position: 2, name: category.title, item: `https://alctrading.com/products/${category.slug}` },
        ],
    };

    return (
        <div className="bg-white text-slate-900 pb-24 overflow-x-hidden w-full">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />

            {/* Breadcrumbs */}
            <div className="bg-slate-50 border-b border-slate-200 py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav aria-label="Breadcrumb" className="text-sm font-medium text-slate-500 flex items-center gap-2">
                        <Link href="/" className="hover:text-brand-primary transition-colors">Home</Link>
                        <span aria-hidden="true">/</span>
                        <span className="text-slate-900 font-bold">{category.title}</span>
                    </nav>
                </div>
            </div>

            {/* Hero */}
            <header className="bg-gradient-to-b from-brand-light to-brand-primary text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold uppercase tracking-tight mb-4">{category.title}</h1>
                    <div className="w-16 h-1 bg-brand-light mb-6"></div>
                    {category.description && (
                        <p className="text-xl text-slate-300 max-w-3xl font-light">{category.description}</p>
                    )}
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {products.length === 0 ? (
                    <p className="text-slate-500 text-lg">No products found in this category yet.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        {Object.entries(groups).map(([subCat, items]) => (
                            <div key={subCat}>
                                <h2 className="text-2xl font-bold uppercase tracking-wide text-brand-primary border-b-2 border-slate-200 pb-4 mb-8">
                                    {subCat}
                                </h2>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-6">
                                    {items.map((item) => (
                                        <Link
                                            key={item._id}
                                            href={`/products/${category!.slug}/${item.slug}`}
                                            className="flex items-start gap-2 group hover:bg-slate-50 p-1 -ml-1 rounded transition-colors"
                                        >
                                            <span className="w-1.5 h-1.5 bg-brand-light block flex-shrink-0 mt-2 group-hover:bg-brand-primary transition-colors"></span>
                                            <span className="break-words font-bold text-base text-slate-700 group-hover:text-brand-primary transition-colors">
                                                {item.name}
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="mt-20 p-12 bg-slate-50 border border-slate-200 text-center flex flex-col items-center justify-center">
                    <p className="text-2xl font-bold uppercase tracking-widest text-brand-primary mb-6 max-w-2xl mx-auto leading-relaxed">
                        Need more information about {category.title}?
                    </p>
                    <a
                        href="/#contact"
                        className="inline-block bg-gradient-to-b from-brand-light to-brand-primary text-white font-bold px-10 py-5 uppercase tracking-widest text-sm hover:from-white hover:to-white hover:text-brand-primary transition-colors shadow-lg"
                    >
                        Contact Us For More Information
                    </a>
                </div>
            </div>
        </div>
    );
}
