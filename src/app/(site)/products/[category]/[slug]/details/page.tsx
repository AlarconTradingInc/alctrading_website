import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { sanityProductToDetailed } from '@/lib/data';
import { getProductBySlugFromSanity } from '@/lib/sanity';
import { PRODUCT_DETAIL_PAGES, PRODUCT_DETAIL_SLUGS } from '@/lib/product-details';

type Props = {
    params: Promise<{ category: string; slug: string }>;
};

async function resolveProduct(category: string, slug: string) {
    const sanityProduct = await getProductBySlugFromSanity(category, slug);
    if (sanityProduct) return sanityProductToDetailed(sanityProduct);
    return undefined;
}

export async function generateStaticParams() {
    return PRODUCT_DETAIL_SLUGS.map(({ categorySlug, slug }) => ({
        category: categorySlug,
        slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { category, slug } = await params;
    const detail = PRODUCT_DETAIL_PAGES[slug];
    if (!detail) return {};

    const cleanOverview = detail.overview.replace(/\n+/g, ' ');
    const description = `${cleanOverview} Available from ALC Trading (Alarcon Trading Inc.).`.slice(0, 160);

    const keywords: string[] = [
        detail.militarySpec,
        detail.militarySpec.replace(/-/g, ''),          // dashless: MILPRF46000
        detail.title,
        detail.subtitle,
        ...(detail.natoCode ? [
            detail.natoCode,                            // e.g. O-158
            `NATO ${detail.natoCode}`,                  // e.g. NATO O-158
            `NATO Code ${detail.natoCode}`,
            detail.natoCode.replace(/-/g, ''),          // dashless: O158
        ] : []),
        'Military Specification',
        'Military Lubricant',
        'Military Hydraulic Fluid',
        'ALC Trading',
        'Alarcon Trading Inc.',
        'Military Supplies',
        'Defense Supplies',
        ...(detail.compatibleSystems ?? []),
    ].filter(Boolean);

    const pageTitle = `${detail.title} – ${detail.subtitle} | ALC Trading`;
    const pageUrl = `/products/${category}/${slug}/details`;

    return {
        title: pageTitle,
        description,
        keywords: [...new Set(keywords)],
        openGraph: {
            title: pageTitle,
            description,
            url: pageUrl,
            images: [{
                url: 'https://alctrading.com/logomain_transparent.png',
                width: 800,
                height: 270,
                alt: `${detail.title} - ALC Trading`,
            }],
            siteName: 'ALC Trading',
            locale: 'en_US',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: pageTitle,
            description,
        },
        alternates: {
            canonical: pageUrl,
        },
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
}

export default async function ProductDetailsPage({ params }: Props) {
    const { category, slug } = await params;

    const detail = PRODUCT_DETAIL_PAGES[slug];
    if (!detail) notFound();

    const product = await resolveProduct(category, slug);
    const productName = product?.name ?? detail.title;
    const categoryTitle = product?.categoryTitle ?? category;

    // ── Structured Data ────────────────────────────────────────────────────────

    const productSchema = {
        '@context': 'https://schema.org/',
        '@type': 'Product',
        name: detail.title,
        description: detail.overview.replace(/\n+/g, ' '),
        image: 'https://alctrading.com/logomain_transparent.png',
        sku: detail.militarySpec,
        mpn: detail.militarySpec,
        brand: { '@type': 'Brand', name: 'ALC Trading' },
        manufacturer: { '@type': 'Organization', name: 'Alarcon Trading Inc.' },
        category: categoryTitle,
        keywords: [detail.militarySpec, ...(detail.compatibleSystems ?? [])].join(', '),
        additionalProperty: [
            {
                '@type': 'PropertyValue',
                propertyID: 'MilitarySpec',
                name: 'Military Specification',
                value: detail.militarySpec,
            },
            {
                '@type': 'PropertyValue',
                propertyID: 'MilitarySpec_NODASH',
                name: 'Military Specification (no dashes)',
                value: detail.militarySpec.replace(/-/g, ''),
            },
            ...(detail.natoCode ? [
                {
                    '@type': 'PropertyValue',
                    propertyID: 'NATOCode',
                    name: 'NATO Code',
                    value: detail.natoCode,
                },
                {
                    '@type': 'PropertyValue',
                    propertyID: 'NATOCode_NODASH',
                    name: 'NATO Code (no dashes)',
                    value: detail.natoCode.replace(/-/g, ''),
                },
            ] : []),
        ],
        offers: {
            '@type': 'Offer',
            url: `https://alctrading.com/products/${category}/${slug}/details`,
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
            itemCondition: 'https://schema.org/NewCondition',
            seller: { '@type': 'Organization', name: 'Alarcon Trading Inc.' },
        },
    };

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://alctrading.com/' },
            { '@type': 'ListItem', position: 2, name: categoryTitle, item: `https://alctrading.com/products/${category}` },
            { '@type': 'ListItem', position: 3, name: productName, item: `https://alctrading.com/products/${category}/${slug}` },
            { '@type': 'ListItem', position: 4, name: 'Product Details', item: `https://alctrading.com/products/${category}/${slug}/details` },
        ],
    };

    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
            {
                '@type': 'Question',
                name: `What is ${detail.militarySpec}?`,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: detail.overview.replace(/\n+/g, ' '),
                },
            },
            {
                '@type': 'Question',
                name: `What are the advantages of ${detail.militarySpec}?`,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: detail.advantages.join('. ') + '.',
                },
            },
            {
                '@type': 'Question',
                name: `What is ${detail.militarySpec} used for?`,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: detail.application,
                },
            },
            ...(detail.compatibleSystems && detail.compatibleSystems.length > 0 ? [{
                '@type': 'Question',
                name: `What equipment is ${detail.militarySpec} compatible with?`,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: `${detail.militarySpec} is compatible with the following systems: ${detail.compatibleSystems.join(', ')}.`,
                },
            }] : []),
            {
                '@type': 'Question',
                name: `Where can I buy ${detail.militarySpec}?`,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: `${detail.militarySpec} is available from ALC Trading (Alarcon Trading Inc.), a U.S.-based military and defense supplier. Contact us for current pricing, availability, and documentation.`,
                },
            },
        ],
    };

    const schemas = [productSchema, breadcrumbSchema, faqSchema];

    // ── Render ─────────────────────────────────────────────────────────────────

    return (
        <div className="bg-white text-slate-900 min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }} />

            {/* Breadcrumb */}
            <div className="bg-slate-50 border-b border-slate-200 py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav aria-label="Breadcrumb" className="text-sm font-medium text-slate-500 flex items-center gap-2 flex-wrap">
                        <Link href="/" className="hover:text-brand-primary transition-colors">Home</Link>
                        <span aria-hidden="true">/</span>
                        <Link href={`/products/${category}`} className="hover:text-brand-primary transition-colors">{categoryTitle}</Link>
                        <span aria-hidden="true">/</span>
                        <Link href={`/products/${category}/${slug}`} className="hover:text-brand-primary transition-colors">{productName}</Link>
                        <span aria-hidden="true">/</span>
                        <span className="text-slate-900 font-bold">Product Details</span>
                    </nav>
                </div>
            </div>

            {/* Hero */}
            <header className="bg-gradient-to-b from-brand-light to-brand-primary text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-2 mb-4">
                        <span className="text-brand-light font-bold tracking-widest uppercase text-sm">{categoryTitle} — Full Technical Details</span>
                        <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tight">
                            {detail.title}
                        </h1>
                        <p className="text-xl text-slate-200 font-light mt-1">{detail.subtitle}</p>
                    </div>
                    <div className="w-16 h-1 bg-white/50 mb-6" />
                    <p className="text-lg text-slate-200 max-w-3xl font-light leading-relaxed whitespace-pre-line">
                        {detail.overview}
                    </p>
                    <div className="mt-8">
                        <Link
                            href={`/products/${category}/${slug}`}
                            className="inline-block border border-white/40 text-white font-bold px-6 py-3 uppercase tracking-widest text-sm hover:bg-white hover:text-brand-primary transition-colors"
                        >
                            ← Back to Product Page
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 space-y-16">

                {/* Spec / Composition */}
                <section>
                    <h2 className="text-2xl font-bold uppercase tracking-wide text-brand-primary border-b-2 border-slate-200 pb-4 mb-8">
                        Military Specification
                    </h2>
                    <div className="border-t border-slate-200">
                        <div className="flex flex-col sm:flex-row py-4 border-b border-slate-200">
                            <span className="sm:w-1/4 font-bold font-mono text-slate-900 text-sm">Specification</span>
                            <span className="sm:w-3/4 font-bold font-mono text-slate-900 text-sm">{detail.militarySpec}</span>
                        </div>
                        {detail.natoCode && (
                            <div className="flex flex-col sm:flex-row py-4 border-b border-slate-200">
                                <span className="sm:w-1/4 font-bold font-mono text-slate-900 text-sm">NATO Code</span>
                                <span className="sm:w-3/4 font-bold font-mono text-slate-900 text-sm">
                                    {detail.natoCode}
                                    <span className="sr-only"> NATO {detail.natoCode} {detail.natoCode.replace(/-/g, '')}</span>
                                </span>
                            </div>
                        )}
                    </div>
                    <div className="mt-8">
                        <h3 className="text-lg font-bold uppercase tracking-wide text-slate-800 mb-3">Composition</h3>
                        <p className="text-slate-700 leading-relaxed text-lg">{detail.composition}</p>
                    </div>
                </section>

                {/* Advantages */}
                <section>
                    <h2 className="text-2xl font-bold uppercase tracking-wide text-brand-primary border-b-2 border-slate-200 pb-4 mb-8">
                        Advantages
                    </h2>
                    <ul className="space-y-4">
                        {detail.advantages.map((adv, i) => (
                            <li key={i} className="flex items-start gap-4">
                                <span className="mt-1 flex-shrink-0 w-6 h-6 bg-brand-primary text-white flex items-center justify-center font-bold text-sm">{i + 1}</span>
                                <span className="text-slate-700 text-lg leading-relaxed">{adv}</span>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Application */}
                <section>
                    <h2 className="text-2xl font-bold uppercase tracking-wide text-brand-primary border-b-2 border-slate-200 pb-4 mb-8">
                        Application
                    </h2>
                    <p className="text-slate-700 leading-relaxed text-lg mb-8">{detail.application}</p>

                    {detail.compatibleSystems && detail.compatibleSystems.length > 0 && (
                        <div>
                            <h3 className="text-lg font-bold uppercase tracking-wide text-slate-800 mb-4">Compatible Systems</h3>
                            <div className="flex flex-wrap gap-3">
                                {detail.compatibleSystems.map((sys) => (
                                    <span key={sys} className="bg-slate-100 border border-slate-200 px-4 py-2 font-mono font-bold text-slate-800 text-sm uppercase tracking-wider">
                                        {sys}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </section>

                {/* Additional Sections */}
                {detail.additionalSections && detail.additionalSections.length > 0 && (
                    <section>
                        <h2 className="text-2xl font-bold uppercase tracking-wide text-brand-primary border-b-2 border-slate-200 pb-4 mb-8">
                            Additional Information
                        </h2>
                        <div className="space-y-8">
                            {detail.additionalSections.map((sec, i) => (
                                <div key={i} className="bg-slate-50 border border-slate-200 p-8">
                                    <h3 className="text-lg font-bold uppercase tracking-wide text-slate-800 mb-4">{sec.heading}</h3>
                                    <p className="text-slate-700 leading-relaxed whitespace-pre-line">{sec.content}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Hidden keyword block for search engines */}
                <div className="sr-only">
                    <p>{detail.militarySpec} {detail.militarySpec.replace(/-/g, '')} {detail.title} {detail.subtitle} military specification defense supplier ALC Trading Alarcon Trading</p>
                    {detail.natoCode && (
                        <p>NATO Code {detail.natoCode} NATO {detail.natoCode} {detail.natoCode.replace(/-/g, '')}</p>
                    )}
                    {detail.compatibleSystems && <p>Compatible with: {detail.compatibleSystems.join(', ')}</p>}
                </div>

                {/* CTA */}
                <section className="bg-slate-50 border border-slate-200 p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                    <div>
                        <p className="font-bold text-slate-800 uppercase tracking-wider text-sm mb-1">Ready to place an order or need a quote?</p>
                        <p className="text-slate-600 text-sm">Contact ALC Trading for pricing, availability, and documentation.</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 sm:ml-auto flex-shrink-0">
                        <Link
                            href="/#contact"
                            className="inline-block bg-gradient-to-b from-brand-light to-brand-primary text-white font-bold px-8 py-4 uppercase tracking-widest text-sm hover:from-white hover:to-white hover:text-brand-primary transition-colors shadow-lg text-center"
                        >
                            Request a Quote
                        </Link>
                        <Link
                            href={`/products/${category}/${slug}`}
                            className="inline-block border-2 border-brand-primary text-brand-primary font-bold px-8 py-4 uppercase tracking-widest text-sm hover:bg-brand-primary hover:text-white transition-colors text-center"
                        >
                            Back to Product
                        </Link>
                    </div>
                </section>

            </div>
        </div>
    );
}
