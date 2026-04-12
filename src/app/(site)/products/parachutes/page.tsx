import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Military Parachute Spares & Fabrics | Alarcon Trading - Aerospace & Military Supplies",
        description: "High-quality webbing, textiles, and fabrics (MIL-W-4088K, MIL-C-44378) for military parachutes and industrial equipment from ALC Trading.",
        keywords: [
            "Military Parachute Webbing", "Parachute Fabrics", "Military Parachutes", "Webbing Textiles", "ALC Trading Parachutes",
            'MIL-W-4088K', 'MIL-T-5038', 'MIL-W-5625K', 'MIL-W-17337F', 'MIL-T-87130',
            'MIL-C-44378', 'MIL-C-3395', 'MIL-43805', 'MIL-C-7350', 'MIL-C-7020', 'MIL-C-8020', 'MIL-C-498', 'MIL-C-43375', 'MIL-C-43734', 'MIL-C-7219', 'MIL-C-508', 'MIL-C-10296', 'MIL-C-3953'
        ],
        openGraph: {
            title: "Military Parachute Spares & Fabrics | ALC Trading",
            description: "Providing high-quality webbing, textiles, and fabrics for military parachutes.",
            url: "/products/parachutes",
            siteName: "ALC Trading",
            locale: "en_US",
            images: [
                {
                    url: "https://alctrading.com/logomain_transparent.png",
                    width: 800,
                    height: 270,
                    alt: "ALC Trading Parachute Spares"
                }
            ],
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: "Military Parachute Spares & Fabrics | ALC Trading",
            description: "High-quality webbing, textiles, and fabrics for military parachutes from ALC Trading.",
        },
        alternates: {
            canonical: "/products/parachutes",
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

import Link from "next/link";
import { getProductsByCategory } from "@/lib/sanity";

export default async function ParachutesPage() {
    const raw = await getProductsByCategory('parachutes').catch(() => []);
    const source = raw.map(p => ({ slug: p.slug, name: p.name, subCategory: p.subCategory, description: p.description }));

    const webbing = source.filter(p => p.subCategory === 'Webbing Textiles');
    const fabrics = source.filter(p => p.subCategory === 'Parachute Fabrics');
    const extra   = source.filter(p => p.subCategory !== 'Webbing Textiles' && p.subCategory !== 'Parachute Fabrics');

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Military Parachute Webbing and Fabrics",
        "description": "High-quality textiles and hardware for parachute spares.",
        "itemListElement": [...webbing, ...fabrics].map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
                "@type": "Product",
                "name": item.name,
                "description": item.description,
                "image": "https://alctrading.com/logomain_transparent.png",
                "brand": {
                    "@type": "Brand",
                    "name": "ALC Trading"
                },
                "offers": {
                    "@type": "Offer",
                    "url": `https://alctrading.com/products/parachutes/${item.slug}`,
                    "priceCurrency": "USD",
                    "price": "0.00",
                    "availability": "https://schema.org/InStock",
                    "itemCondition": "https://schema.org/NewCondition"
                }
            }
        }))
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://alctrading.com/" },
            { "@type": "ListItem", "position": 2, "name": "Parachutes", "item": "https://alctrading.com/products/parachutes" }
        ]
    };

    return (
        <div className="bg-white text-slate-900 pb-24 overflow-x-hidden w-full">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify([structuredData, breadcrumbSchema]) }}
            />

            {/* Breadcrumbs */}
            <div className="bg-slate-50 border-b border-slate-200 py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav aria-label="Breadcrumb" className="text-sm font-medium text-slate-500 flex items-center gap-2">
                        <Link href="/" className="hover:text-brand-primary transition-colors">Home</Link>
                        <span aria-hidden="true">/</span>
                        <span className="text-slate-900 font-bold">Parachutes</span>
                    </nav>
                </div>
            </div>

            <header className="bg-gradient-to-b from-brand-light to-brand-primary text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold uppercase tracking-tight mb-4">Parachute Spares</h1>
                    <div className="w-16 h-1 bg-brand-light mb-6"></div>
                    <p className="text-xl text-slate-300 max-w-3xl font-light">
                        Providing high-quality webbing, textiles, and fabrics for military parachutes.
                    </p>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
                    {/* Webbing Textiles */}
                    <div>
                        <h2 className="text-2xl font-bold uppercase tracking-wide text-brand-primary border-b-2 border-slate-200 pb-4 mb-8">
                            Webbing Textiles
                        </h2>
                        <div className="flex flex-col gap-4 font-bold text-lg text-slate-700">
                            {webbing.map((item, i) => (
                                <Link href={`/products/parachutes/${item.slug}`} key={i} className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-100 w-full md:w-3/4 hover:border-brand-primary group transition-all rounded">
                                    <div className="w-2 h-2 bg-brand-light rounded-full group-hover:bg-brand-primary transition-colors"></div>
                                    <span className="group-hover:text-brand-primary transition-colors">{item.name}</span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Parachute Fabrics */}
                    <div>
                        <h2 className="text-2xl font-bold uppercase tracking-wide text-brand-primary border-b-2 border-slate-200 pb-4 mb-8">
                            Parachute Fabrics
                        </h2>
                        <div className="grid grid-cols-2 gap-4 font-bold text-lg text-slate-700">
                            {fabrics.map((item, i) => (
                                <Link href={`/products/parachutes/${item.slug}`} key={i} className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-100 hover:border-brand-primary group transition-all rounded text-sm sm:text-lg">
                                    <div className="w-2 h-2 bg-brand-light rounded-full group-hover:bg-brand-primary transition-colors flex-shrink-0"></div>
                                    <span className="truncate group-hover:text-brand-primary transition-colors">{item.name}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {extra.length > 0 && (
                    <div className="mb-16">
                        {Object.entries(extra.reduce<Record<string, typeof extra>>((acc, p) => {
                            const k = p.subCategory || 'Other'; if (!acc[k]) acc[k] = []; acc[k].push(p); return acc;
                        }, {})).map(([subCat, items]) => (
                            <div key={subCat} className="mb-12">
                                <h2 className="text-2xl font-bold uppercase tracking-wide text-brand-primary border-b-2 border-slate-200 pb-4 mb-8">{subCat}</h2>
                                <div className="grid grid-cols-2 gap-4 font-bold text-lg text-slate-700">
                                    {items.map((item, i) => (
                                        <Link href={`/products/parachutes/${item.slug}`} key={i} className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-100 hover:border-brand-primary group transition-all rounded">
                                            <div className="w-2 h-2 bg-brand-light rounded-full group-hover:bg-brand-primary transition-colors flex-shrink-0"></div>
                                            <span className="truncate group-hover:text-brand-primary transition-colors">{item.name}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="p-10 bg-gradient-to-b from-brand-light to-brand-primary text-white text-center shadow-xl">
                    <p className="text-xl font-bold uppercase tracking-widest leading-relaxed mb-6">
                        We can also supply industrial and commercial types of webbings, textiles and hardware.
                    </p>
                    <a href="/#contact" className="inline-block bg-white text-brand-primary font-bold px-8 py-4 uppercase tracking-widest text-sm hover:text-brand-light hover:bg-slate-50 transition-colors">
                        Please call for more info
                    </a>
                </div>
            </div>
        </div>
    );
}
