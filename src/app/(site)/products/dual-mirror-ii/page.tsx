import Link from "next/link";
import { Metadata } from "next";
import { getProductsByCategory } from "@/lib/sanity";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "DualMirror II Fabrics & PPE | Alarcon Trading - Aerospace & Military Supplies",
        description: "High performance DualMirror II fabrics for extreme conditions, molten metal PPE (1086, 1081), and proximity firefighting (P-202, K-252) from ALC Trading.",
        keywords: [
            "DualMirror II Fabrics", "Molten Metal PPE", "Proximity Firefighting", "High Temperature Fabrics", "ALC Trading DualMirror",
            "DualMirror II 1086", "DualMirror II 1081", "DualMirror II 1017", "DualMirror II 1006", "DualMirror II 1100-4",
            "DualMirror II P-202", "DualMirror II K-252", "DualMirror II 1018",
            "Preox", "Korspun Aramid", "PBI/Aramid", "Beta Glass"
        ],
        openGraph: {
            title: "DualMirror II Fabrics & PPE | ALC Trading",
            description: "High performance DualMirror II fabrics for extreme conditions, molten metal PPE, and proximity firefighting.",
            url: "/products/dual-mirror-ii",
            siteName: "ALC Trading",
            locale: "en_US",
            images: [
                {
                    url: "https://alctrading.com/logomain_transparent.png",
                    width: 800,
                    height: 270,
                    alt: "ALC Trading DualMirror II Fabrics"
                }
            ],
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: "DualMirror II Fabrics & PPE | ALC Trading",
            description: "High performance DualMirror II fabrics for extreme conditions, molten metal PPE, and proximity firefighting.",
        },
        alternates: {
            canonical: "/products/dual-mirror-ii",
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

export default async function DualMirrorPage() {
    const raw = await getProductsByCategory('dual-mirror-ii').catch(() => []);
    const source = raw.map(p => ({ slug: p.slug, name: p.name, subCategory: p.subCategory, materialSpec: p.materialSpec, sizeWeight: p.sizeWeight, description: p.description }));

    const moltenMetal   = source.filter(i => i.subCategory === "Molten Metal PPE");
    const proximityFire = source.filter(i => i.subCategory === "Proximity Firefighting");
    const extra         = source.filter(i => i.subCategory !== "Molten Metal PPE" && i.subCategory !== "Proximity Firefighting");

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "DualMirror II Fabrics and PPE",
        "description": "High performance fabrics and PPE available at ALC Trading.",
        "itemListElement": [...moltenMetal, ...proximityFire].map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
                "@type": "Product",
                "name": item.name,
                "description": item.description,
                "image": "https://alctrading.com/logomain_transparent.png",
                "brand": {
                    "@type": "Brand",
                    "name": "DualMirror II"
                },
                "offers": {
                    "@type": "Offer",
                    "url": `https://alctrading.com/products/dual-mirror-ii/${item.slug}`,
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
            { "@type": "ListItem", "position": 2, "name": "DualMirror II", "item": "https://alctrading.com/products/dual-mirror-ii" }
        ]
    };

    return (
        <div className="bg-white text-slate-900 pb-24 min-h-[calc(100vh-80px)] overflow-x-hidden w-full">
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
                        <span className="text-slate-900 font-bold">DualMirror II</span>
                    </nav>
                </div>
            </div>

            <header className="bg-gradient-to-b from-brand-light to-brand-primary text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold uppercase tracking-tight mb-4">DualMirror II Fabrics</h1>
                    <div className="w-16 h-1 bg-brand-light mb-6"></div>
                    <p className="text-xl text-slate-300 max-w-3xl font-light">
                        High performance fabrics for extreme conditions.
                    </p>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="flex flex-col gap-20 mb-20 max-w-4xl mx-auto">
                    {/* Molten Metal PPE */}
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-8 border-b border-slate-300 pb-4">
                            Top Selling DualMirror II Fabrics for Molten Metal PPE
                        </h2>
                        <div className="flex flex-col gap-3 font-bold text-slate-800 text-lg md:text-xl">
                            {moltenMetal.map((item, i) => (
                                <Link href={`/products/dual-mirror-ii/${item.slug}`} key={i} className="flex flex-col md:flex-row md:items-center justify-between pb-2 group hover:bg-slate-50 transition-colors p-2 rounded -mx-2">
                                    <div className="flex flex-col md:flex-row md:gap-4 md:items-center w-full md:w-2/3">
                                        <span className="group-hover:text-brand-primary transition-colors">{item.name}</span>
                                        <span className="text-slate-700 font-bold">{item.materialSpec}</span>
                                    </div>
                                    <span className="text-slate-700 font-bold mt-1 md:mt-0 break-words">{item.sizeWeight}</span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Proximity Firefighting */}
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-8 border-b border-slate-300 pb-4">
                            Top Selling DualMirror II Fabrics for Proximity Firefighting
                        </h2>
                        <div className="flex flex-col gap-3 font-bold text-slate-800 text-lg md:text-xl">
                            {proximityFire.map((item, i) => (
                                <Link href={`/products/dual-mirror-ii/${item.slug}`} key={i} className="flex flex-col md:flex-row md:items-center justify-between pb-2 group hover:bg-slate-50 transition-colors p-2 rounded -mx-2">
                                    <div className="flex flex-col md:flex-row md:gap-4 md:items-center w-full md:w-2/3">
                                        <span className="group-hover:text-brand-primary transition-colors">{item.name}</span>
                                        <span className="text-slate-700 font-bold">{item.materialSpec}</span>
                                    </div>
                                    <span className="text-slate-700 font-bold mt-1 md:mt-0 break-words">{item.sizeWeight}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {extra.length > 0 && (
                    <div className="mb-12 max-w-4xl mx-auto">
                        {Object.entries(extra.reduce<Record<string, typeof extra>>((acc, p) => {
                            const k = p.subCategory || 'Other'; if (!acc[k]) acc[k] = []; acc[k].push(p); return acc;
                        }, {})).map(([subCat, items]) => (
                            <div key={subCat} className="mb-8">
                                <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-8 border-b border-slate-300 pb-4">{subCat}</h2>
                                <div className="flex flex-col gap-3 font-bold text-slate-800 text-lg md:text-xl">
                                    {items.map((item, i) => (
                                        <Link href={`/products/dual-mirror-ii/${item.slug}`} key={i} className="flex flex-col md:flex-row md:items-center justify-between pb-2 group hover:bg-slate-50 transition-colors p-2 rounded -mx-2">
                                            <div className="flex flex-col md:flex-row md:gap-4 md:items-center w-full md:w-2/3">
                                                <span className="group-hover:text-brand-primary transition-colors">{item.name}</span>
                                                {item.materialSpec && <span className="text-slate-700 font-bold">{item.materialSpec}</span>}
                                            </div>
                                            {item.sizeWeight && <span className="text-slate-700 font-bold mt-1 md:mt-0">{item.sizeWeight}</span>}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="mt-12 text-center">
                    <Link href="/#contact" className="inline-block bg-gradient-to-b from-brand-light to-brand-primary text-white font-bold px-10 py-5 uppercase tracking-widest text-sm hover:from-white hover:to-white hover:text-brand-primary transition-colors shadow-lg">
                        Please Contact Us For More Information
                    </Link>
                </div>
            </div>
        </div>
    );
}
