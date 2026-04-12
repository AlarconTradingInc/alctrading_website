import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Military Metals & High Temp Alloys | Alarcon Trading - Aerospace & Military Supplies",
        description: "Mill-spec metals including High Temp Alloys (AMS 5536, AMS 5608) and Aerospace Aluminums (7055, 2024, 7075) sourced for military applications by ALC Trading.",
        keywords: [
            "Mill-spec metals", "High Temp Alloys", "Aerospace Aluminums", "Military Metals", "US Steel Companies", "ALC Trading Metals",
            'AMS 5536', 'AMS 5537', 'AMS 5545', 'AMS 5916', 'AMS 5608', 'AMS 5878', 'AMS 5872', 'AMS 5874', 'AMS 5951', 'AMS 5888', 'AMS 5889', 'AMS 5599', 'AMS 5969', 'AMS 5879', 'AMS 5596', 'AMS 5597', 'AMS 5542', 'AMS 5598', 'AMS 5544', 'AMS 5532',
            '2026', '7055-T74511/T76511', '7055-T77511 EXTRUSION', 'C460 (AA2099)', '2024', '2090-T83', '2124', '2324-T39', '6061-T6517050', '7055', '7075', '7150-T7751', '7150-T77511', '7475'
        ],
        openGraph: {
            title: "Military Metals & High Temp Alloys | ALC Trading",
            description: "Mill-spec metals including High Temp Alloys and Aerospace Aluminums sourced for military applications.",
            url: "/products/metals",
            siteName: "ALC Trading",
            locale: "en_US",
            images: [
                {
                    url: "https://alctrading.com/logomain_transparent.png",
                    width: 800,
                    height: 270,
                    alt: "ALC Trading Metals"
                }
            ],
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: "Military Metals & High Temp Alloys | ALC Trading",
            description: "Mill-spec metals including High Temp Alloys and Aerospace Aluminums sourced for military applications.",
        },
        alternates: {
            canonical: "/products/metals",
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

export default async function MetalsPage() {
    const raw = await getProductsByCategory('metals').catch(() => []);
    const source = raw.map(p => ({ slug: p.slug, name: p.name, subCategory: p.subCategory, description: p.description }));

    const alloys    = source.filter(m => m.subCategory === 'High Temp Alloys');
    const aluminums = source.filter(m => m.subCategory === 'Aluminums');
    const extra     = source.filter(m => m.subCategory !== 'High Temp Alloys' && m.subCategory !== 'Aluminums');

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Military High Temp Alloys and Aluminums",
        "description": "Mill-spec metals supplied by ALC Trading.",
        "itemListElement": [...alloys, ...aluminums, ...extra].map((metal, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
                "@type": "Product",
                "name": metal.name,
                "description": metal.description,
                "image": "https://alctrading.com/logomain_transparent.png",
                "brand": {
                    "@type": "Brand",
                    "name": "ALC Trading"
                },
                "offers": {
                    "@type": "Offer",
                    "url": `https://alctrading.com/products/metals/${metal.slug}`,
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
            { "@type": "ListItem", "position": 2, "name": "Metals", "item": "https://alctrading.com/products/metals" }
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
                        <span className="text-slate-900 font-bold">Metals</span>
                    </nav>
                </div>
            </div>

            <header className="bg-gradient-to-b from-brand-light to-brand-primary text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold uppercase tracking-tight mb-4">Metals</h1>
                    <div className="w-16 h-1 bg-brand-light mb-6"></div>
                    <p className="text-xl text-slate-300 max-w-3xl font-light">
                        We supply a diverse line of mill-spec metals and we are working with many US Steel Companies to meet your exact needs.
                    </p>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <p className="text-lg text-slate-700 mb-12">
                    Please see below for some of the specifications we can supply.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    {/* High Temp Alloys */}
                    <div>
                        <h2 className="text-2xl font-bold uppercase tracking-wide text-brand-primary border-b-2 border-slate-200 pb-4 mb-8">
                            High Temp Alloys
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-6 font-bold text-lg text-slate-700">
                            {alloys.map((alloy, i) => (
                                <Link href={`/products/metals/${alloy.slug}`} key={i} className="flex items-center gap-2 group hover:bg-slate-50 p-1 -ml-1 rounded transition-colors">
                                    <span className="w-1.5 h-1.5 bg-brand-light block group-hover:bg-brand-primary transition-colors"></span>
                                    <span className="group-hover:text-brand-primary transition-colors">{alloy.name}</span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Aluminums */}
                    <div>
                        <h2 className="text-2xl font-bold uppercase tracking-wide text-brand-primary border-b-2 border-slate-200 pb-4 mb-8">
                            Aluminums
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-6 font-bold text-lg text-slate-700">
                            {aluminums.map((alum, i) => (
                                <Link href={`/products/metals/${alum.slug}`} key={i} className="flex items-start gap-2 group hover:bg-slate-50 p-1 -ml-1 rounded transition-colors">
                                    <span className="w-1.5 h-1.5 bg-brand-light block flex-shrink-0 mt-2 group-hover:bg-brand-primary transition-colors"></span>
                                    <span className="break-words max-w-[90%] font-bold text-base group-hover:text-brand-primary transition-colors">{alum.name}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {extra.length > 0 && (
                    <div className="mt-16">
                        {Object.entries(extra.reduce<Record<string, typeof extra>>((acc, p) => {
                            const k = p.subCategory || 'Other'; if (!acc[k]) acc[k] = []; acc[k].push(p); return acc;
                        }, {})).map(([subCat, items]) => (
                            <div key={subCat} className="mb-12">
                                <h2 className="text-2xl font-bold uppercase tracking-wide text-brand-primary border-b-2 border-slate-200 pb-4 mb-8">{subCat}</h2>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-6 font-bold text-lg text-slate-700">
                                    {items.map((item, i) => (
                                        <Link href={`/products/metals/${item.slug}`} key={i} className="flex items-center gap-2 group hover:bg-slate-50 p-1 -ml-1 rounded transition-colors">
                                            <span className="w-1.5 h-1.5 bg-brand-light block group-hover:bg-brand-primary transition-colors"></span>
                                            <span className="group-hover:text-brand-primary transition-colors">{item.name}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="mt-20 p-12 bg-slate-50 border border-slate-200 text-center flex flex-col items-center justify-center">
                    <p className="text-2xl font-bold uppercase tracking-widest text-brand-primary mb-6 max-w-2xl mx-auto leading-relaxed">
                        Please ask us about Copper and Titanium needs
                    </p>
                    <a href="/#contact" className="inline-block bg-gradient-to-b from-brand-light to-brand-primary text-white font-bold px-10 py-5 uppercase tracking-widest text-sm hover:from-white hover:to-white hover:text-brand-primary transition-colors shadow-lg">
                        Contact Us For More Information
                    </a>
                </div>
            </div>
        </div>
    );
}
