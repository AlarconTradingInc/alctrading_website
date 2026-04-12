import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ALL_PRODUCTS, getProductBySlug, sanityProductToDetailed } from '@/lib/data';
// getProductBySlug is used inside resolveProduct as the static fallback
import { getAllProductSlugs, getProductBySlugFromSanity } from '@/lib/sanity';

// ─── Helper: resolve a product from Sanity first, static data as fallback ────
async function resolveProduct(category: string, slug: string) {
    try {
        const sanityProduct = await getProductBySlugFromSanity(category, slug);
        if (sanityProduct) return sanityProductToDetailed(sanityProduct);
    } catch {
        // Sanity unavailable or not configured — fall through to static data
    }
    return getProductBySlug(category, slug);
}

// 1. Generate Static Params — merge Sanity slugs + static fallback
export async function generateStaticParams() {
    let sanityParams: Array<{ category: string; slug: string }> = [];
    try {
        const slugs = await getAllProductSlugs();
        sanityParams = slugs.map(({ categorySlug, slug }) => ({ category: categorySlug, slug }));
    } catch {
        // Sanity not yet configured — use static data
    }

    const staticParams = ALL_PRODUCTS.map((p) => ({ category: p.categorySlug, slug: p.id }));

    // Deduplicate by "category|slug" key
    const seen = new Set<string>();
    return [...sanityParams, ...staticParams].filter(({ category, slug }) => {
        const key = `${category}|${slug}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
    });
}

type Props = {
    params: Promise<{
        category: string;
        slug: string;
    }>
}

// 2. Generate specialized Metadata for Perfect SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { category, slug } = await params;
    const product = await resolveProduct(category, slug);

    if (!product) return {};

    // Build a rich, search-optimized title
    const titleParts: string[] = [product.name];
    if (product.subCategory && product.subCategory !== product.name) {
        titleParts.unshift(product.subCategory);
    }
    if (product.nsn) {
        titleParts.push(`NSN ${product.nsn}`);
    }
    const pageTitle = `${titleParts.join(' – ')} | ALC Trading ${product.categoryTitle}`;

    // Build comprehensive keywords including dashless variants
    const keywords: string[] = [
        product.name,
        product.categoryTitle,
        product.subCategory || '',
        product.nsn || '',
        product.nsn ? product.nsn.replace(/-/g, '') : '', // dashless NSN
        product.partNumber || '',
        product.partNumber ? product.partNumber.replace(/-/g, '') : '', // dashless part number
        product.brand,
        product.manufacturer || '',
        "Military Supplies",
        "ALC Trading",
        ...(product.searchKeywords || []),
    ].filter(Boolean);

    // Deduplicate
    const uniqueKeywords = [...new Set(keywords)];

    // Build a search-rich description
    let metaDescription = product.description;
    if (product.nsn) {
        metaDescription += ` NSN: ${product.nsn} (${product.nsn.replace(/-/g, '')}).`;
    }
    if (product.partNumber && !metaDescription.includes(product.partNumber)) {
        metaDescription += ` Part Number: ${product.partNumber}.`;
    }
    metaDescription += ' Available from ALC Trading.';

    return {
        title: pageTitle,
        description: metaDescription,
        keywords: uniqueKeywords,
        openGraph: {
            title: pageTitle,
            description: metaDescription,
            url: `/products/${product.categorySlug}/${product.id}`,
            images: [
                {
                    url: "https://alctrading.com/logomain_transparent.png",
                    width: 800,
                    height: 270,
                    alt: `${product.subCategory || product.name} - ALC Trading`
                }
            ],
            siteName: "ALC Trading",
            locale: "en_US",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: pageTitle,
            description: metaDescription,
        },
        alternates: {
            canonical: `/products/${product.categorySlug}/${product.id}`,
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

// 3. Render the Page
export default async function ProductPage({ params }: Props) {
    const { category, slug } = await params;
    const product = await resolveProduct(category, slug);

    if (!product) {
        notFound();
    }

    // Build enhanced Product structured data
    const structuredData: Record<string, unknown> = {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": product.subCategory ? `${product.subCategory} ${product.name}` : product.name,
        "image": "https://alctrading.com/logomain_transparent.png",
        "description": product.longDescription || product.description,
        "sku": product.partNumber || product.id,
        "mpn": product.partNumber || product.id,
        "brand": {
            "@type": "Brand",
            "name": product.brand || 'ALC Trading'
        },
        "manufacturer": {
            "@type": "Organization",
            "name": product.manufacturer || product.brand || 'ALC Trading'
        },
        "category": product.categoryTitle,
        "offers": {
            "@type": "Offer",
            "url": `https://alctrading.com/products/${product.categorySlug}/${product.id}`,
            "priceCurrency": "USD",
            "price": "0.00",
            "availability": "https://schema.org/InStock",
            "itemCondition": "https://schema.org/NewCondition",
            "seller": {
                "@type": "Organization",
                "name": "Alarcon Trading Inc."
            },
            ...(product.qty && {
                "eligibleQuantity": {
                    "@type": "QuantitativeValue",
                    "value": product.qty
                }
            })
        }
    };

    // Add identifier properties for NSN and part number variants
    const identifiers: Record<string, string>[] = [];
    if (product.nsn) {
        identifiers.push({
            "@type": "PropertyValue",
            "propertyID": "NSN",
            "name": "National Stock Number",
            "value": product.nsn
        });
        identifiers.push({
            "@type": "PropertyValue",
            "propertyID": "NSN_NODASH",
            "name": "National Stock Number (no dashes)",
            "value": product.nsn.replace(/-/g, '')
        });
    }
    if (product.partNumber) {
        identifiers.push({
            "@type": "PropertyValue",
            "propertyID": "PartNumber",
            "name": "Part Number",
            "value": product.partNumber
        });
        if (product.partNumber.includes('-')) {
            identifiers.push({
                "@type": "PropertyValue",
                "propertyID": "PartNumber_NODASH",
                "name": "Part Number (no dashes)",
                "value": product.partNumber.replace(/-/g, '')
            });
        }
    }
    if (identifiers.length > 0) {
        structuredData["identifier"] = identifiers;
        structuredData["additionalProperty"] = identifiers;
    }

    // Add search keywords as Schema.org keywords
    if (product.searchKeywords && product.searchKeywords.length > 0) {
        structuredData["keywords"] = product.searchKeywords.join(', ');
    }

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://alctrading.com/"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": product.categoryTitle,
                "item": `https://alctrading.com/products/${product.categorySlug}`
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": product.subCategory ? `${product.subCategory} ${product.name}` : product.name,
                "item": `https://alctrading.com/products/${product.categorySlug}/${product.id}`
            }
        ]
    };

    // Build FAQ schema for enhanced rich results (only for enriched products)
    const schemas: unknown[] = [structuredData, breadcrumbSchema];
    if (product.longDescription) {
        const faqSchema = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": `What is ${product.partNumber || product.name}?`,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": product.longDescription
                    }
                },
                ...(product.nsn ? [{
                    "@type": "Question",
                    "name": `What is the NSN for ${product.partNumber || product.name}?`,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": `The National Stock Number (NSN) for ${product.partNumber || product.name} is ${product.nsn} (also written as ${product.nsn.replace(/-/g, '')} without dashes). This NSN falls under Federal Supply Class ${product.nsn.substring(0, 4)}.`
                    }
                }] : []),
                ...(product.qty !== undefined ? [{
                    "@type": "Question",
                    "name": `Where can I buy ${product.partNumber || product.name}?`,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": `${product.partNumber || product.name} is available for purchase from ALC Trading (Alarcon Trading Inc.), a U.S.-based military and aerospace supplier. Currently ${product.qty} units are in stock and available for immediate delivery.`
                    }
                }] : [])
            ]
        };
        schemas.push(faqSchema);
    }

    return (
        <div className="bg-white text-slate-900 min-h-screen overflow-x-hidden w-full">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
            />

            {/* Breadcrumbs Banner */}
            <div className="bg-slate-50 border-b border-slate-200 py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav aria-label="Breadcrumb" className="text-sm font-medium text-slate-500 flex items-center gap-2">
                        <Link href="/" className="hover:text-brand-primary transition-colors">Home</Link>
                        <span aria-hidden="true">/</span>
                        <Link href={`/products/${product.categorySlug}`} className="hover:text-brand-primary transition-colors">{product.categoryTitle}</Link>
                        <span aria-hidden="true">/</span>
                        <span className="text-slate-900 font-bold max-w-[200px] sm:max-w-none truncate">{product.subCategory || product.name}</span>
                    </nav>
                </div>
            </div>

            {/* Hero / Header */}
            <header className="bg-gradient-to-b from-brand-light to-brand-primary text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-2 mb-4">
                        <span className="text-brand-light font-bold tracking-widest uppercase text-sm">{product.subCategory || product.categoryTitle}</span>
                        <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tight break-words">
                            {product.subCategory ? `${product.subCategory} – ${product.name}` : product.name}
                        </h1>
                        {product.partNumber && (
                            <p className="text-lg text-slate-200 font-mono mt-1 break-all">
                                Part Number: {product.partNumber}
                                {/* Hidden text for search crawlers matching dashless searches */}
                                {product.partNumber.includes('-') && (
                                    <span className="sr-only"> {product.partNumber.replace(/-/g, '')}</span>
                                )}
                            </p>
                        )}
                        {product.nsn && (
                            <p className="text-lg text-slate-200 font-mono break-all">
                                NSN: {product.nsn}
                                <span className="sr-only"> {product.nsn.replace(/-/g, '')}</span>
                            </p>
                        )}
                    </div>
                    <div className="w-16 h-1 bg-white/50 mb-6"></div>
                    <p className="text-xl text-slate-200 max-w-3xl font-light leading-relaxed">
                        {product.description}
                    </p>
                </div>
            </header>

            {/* Main Content Area */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    
                    {/* Placeholder Visual / Logo Matrix */}
                    <div className="bg-slate-50 border border-slate-100 p-8 sm:p-12 flex items-center justify-center min-h-[200px] sm:h-64 lg:min-h-[400px] w-full relative group overflow-hidden">
                        <div className="absolute inset-0 bg-brand-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <Image 
                            src="/logomain_transparent.png" 
                            alt={`${product.subCategory || product.name} - ${product.partNumber || product.id} - ALC Trading`}
                            width={300} 
                            height={100}
                            className="object-contain opacity-60 mix-blend-multiply group-hover:scale-105 transition-transform duration-500 max-w-full h-auto"
                        />
                    </div>

                    {/* Data Specs */}
                    <div className="flex flex-col">
                        <h2 className="text-2xl font-bold uppercase tracking-wide text-brand-primary border-b-2 border-slate-200 pb-4 mb-8">
                            Product Specifications
                        </h2>
                        
                        <div className="space-y-0 border-t border-slate-200">
                            {/* Generic Attributes */}
                            <div className="flex flex-col sm:flex-row py-4 border-b border-slate-200">
                                <span className="sm:w-2/3 font-bold font-mono text-slate-900 text-lg">Specification / P.N.</span>
                                <span className="sm:w-2/3 font-bold font-mono text-slate-900 text-lg">
                                    {product.name}
                                    {/* Provide dashless variant for search indexing */}
                                    {product.partNumber && product.partNumber.includes('-') && (
                                        <span className="sr-only"> ({product.partNumber.replace(/-/g, '')})</span>
                                    )}
                                </span>
                            </div>
                            
                            <div className="flex flex-col sm:flex-row py-4 border-b border-slate-200">
                                <span className="sm:w-2/3 font-bold font-mono text-slate-900 text-lg">Category</span>
                                <span className="sm:w-2/3 font-bold font-mono text-slate-900 text-lg">{product.categoryTitle}</span>
                            </div>

                            <div className="flex flex-col sm:flex-row py-4 border-b border-slate-200">
                                <span className="sm:w-2/3 font-bold font-mono text-slate-900 text-lg">Brand / Mfg</span>
                                <span className="sm:w-2/3 font-bold font-mono text-slate-900 text-lg">{product.manufacturer || product.brand}</span>
                            </div>

                            {/* Specific Attributes */}
                            {product.nsn && (
                                <div className="flex flex-col sm:flex-row py-4 border-b border-slate-200">
                                    <span className="sm:w-2/3 font-bold font-mono text-slate-900 text-lg">NSN Number</span>
                                    <span className="sm:w-2/3 font-bold font-mono text-slate-900 text-lg">
                                        {product.nsn}
                                        <span className="sr-only"> ({product.nsn.replace(/-/g, '')})</span>
                                    </span>
                                </div>
                            )}

                            {product.materialSpec && (
                                <div className="flex flex-col sm:flex-row py-4 border-b border-slate-200">
                                    <span className="sm:w-2/3 font-bold font-mono text-slate-900 text-lg">Material Specs</span>
                                    <span className="sm:w-2/3 font-bold font-mono text-slate-900 text-lg">{product.materialSpec}</span>
                                </div>
                            )}

                            {product.sizeWeight && (
                                <div className="flex flex-col sm:flex-row py-4 border-b border-slate-200">
                                    <span className="sm:w-2/3 font-bold font-mono text-slate-900 text-lg">Size / Weight</span>
                                    <span className="sm:w-2/3 font-bold font-mono text-slate-900 text-lg">{product.sizeWeight}</span>
                                </div>
                            )}

                            {product.qty !== undefined && (
                                <div className="flex flex-col sm:flex-row py-4 border-b border-slate-200">
                                    <span className="sm:w-2/3 font-bold font-mono text-slate-900 text-lg">In Stock Qty</span>
                                    <span className="sm:w-2/3 font-bold font-mono text-slate-900 text-lg">{product.qty} <span className="sm:w-2/3 font-bold font-mono text-slate-900 text-lg">EA</span></span>
                                </div>
                            )}
                        </div>

                        {/* CTA */}
                        <div className="mt-12 bg-slate-50 p-8 border border-slate-200 flex flex-col items-start gap-6">
                            <p className="font-bold text-slate-700 uppercase tracking-wider text-sm">Ready to place an order or need a quote?</p>
                            <Link href="/#contact" className="inline-block bg-gradient-to-b from-brand-light to-brand-primary text-white font-bold px-8 py-4 uppercase tracking-widest text-sm hover:from-white hover:to-white hover:text-brand-primary transition-colors shadow-lg w-full text-center">
                                Request a Quote
                            </Link>
                        </div>
                    </div>

                </div>

                {/* SEO-Rich Content Section — only renders for products with longDescription */}
                {product.longDescription && (
                    <article className="mt-20 max-w-4xl">
                        <h2 className="text-2xl font-bold uppercase tracking-wide text-brand-primary border-b-2 border-slate-200 pb-4 mb-8">
                            About {product.subCategory || product.name} {product.partNumber && `p/n:${product.partNumber}`}
                        </h2>
                        <div className="prose prose-lg prose-slate max-w-none">
                            <p className="text-slate-700 leading-relaxed text-lg">
                                {product.longDescription}
                            </p>
                            {product.nsn && (
                                <div className="mt-8 p-6 bg-slate-50 border border-slate-200">
                                    <p className="text-slate-700 font-bold">
                                        NSN Information
                                    </p>
                                    <p className="text-slate-700">
                                        <strong>National Stock Number (NSN):</strong>{' '}
                                        <strong>{product.nsn}</strong>                                        
                                    </p>
                                    <p className="text-slate-700">
                                        <strong>Also referenced as:</strong>{' '}<strong className="font-mono">{product.nsn.replace(/-/g, '')}</strong>
                                    </p>
                                    <p className="text-slate-700">
                                        <strong>Federal Supply Class:</strong>{' '}<strong className="font-mono font-bold">{product.nsn.substring(0, 4)} — Electronic Component Assemblies</strong>
                                    </p>
                                </div>
                            )}
                            {product.partNumber && (
                                <div className="mt-8 p-6 bg-slate-50 border border-slate-200">
                                    <p className="text-slate-700 font-bold">
                                        Part Number Details
                                    </p>
                                    <p className="text-slate-700">
                                        <strong>Part Number:</strong>{' '}
                                        <strong>{product.partNumber}</strong>
                                    </p>
                                    {product.partNumber.includes('-') && (
                                        <p className="text-slate-700">
                                            <strong>Also referenced as:</strong>{' '}<strong className="font-mono">{product.partNumber.replace(/-/g, '')}</strong>
                                        </p>
                                    )}
                                    <p className="text-slate-700">
                                        <strong>Manufacturer:</strong>{' '}<strong className="font-mono">{product.manufacturer || product.brand}</strong>
                                    </p>
                                </div>
                            )}
                        </div>
                    </article>
                )}

                {/* Hidden keyword block for search engines (accessible, screen-reader text) */}
                {product.searchKeywords && product.searchKeywords.length > 0 && (
                    <div className="sr-only" aria-hidden="true">
                        <p>Related search terms: {product.searchKeywords.join(', ')}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
