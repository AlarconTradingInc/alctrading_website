import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Military Chemicals & Lubricants | Alarcon Trading - Aerospace & Military Supplies",
        description: "NATO approved chemical products including MIL-PRF lubricants, oils, adhesives, hydraulic fluids, and corrosion preventives (e.g., MIL-PRF-5606, DAPCO, MIL-PRF-23699) from ALC Trading.",
        keywords: [
            "NATO Approved Chemicals", "Military Lubricants", "ALC Trading Chemicals", "Weapon Maintenance Products", "Aviation Oils",
            'MIL-PRF-3150', 'MIL-PRF-5606', 'MIL-PRF-6081', 'MIL-PRF-6085', 'MIL-PRF-6086', 'MIL-PRF-7808',
            'MIL-PRF-7870', 'MIL-PRF-8188', 'MIL-PRF-23699', 'MIL-PRF-21260', 'MIL-PRF-32033', 'MIL-PRF-46000',
            'MIL-PRF-46167', 'MIL-PRF-46170', 'MIL-PRF-63480', 'MIL-PRF-83282', 'MIL-PRF-87252', 'MIL-PRF-9000H',
            'MIL-P-11414', 'MIL-L-11195', 'MIL-L-10287', 'MIL-L-8937', 'MIL-C-8514', 'MIL-P-7962',
            'DAPCO 2200', 'DAPCO 2100', 'DAPCO 18-4F', 'DAPCO 1-100'
        ],
        openGraph: {
            title: "Military Chemicals & Lubricants | ALC Trading",
            description: "NATO approved chemical products including MIL-PRF lubricants, oils, adhesives, and hydraulic fluids.",
            url: "/products/chemicals",
            siteName: "ALC Trading",
            locale: "en_US",
            images: [
                {
                    url: "https://alctrading.com/logomain_transparent.png",
                    width: 800,
                    height: 270,
                    alt: "ALC Trading Chemicals"
                }
            ],
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: "Military Chemicals & Lubricants | ALC Trading",
            description: "NATO approved military chemical products including MIL-PRF lubricants, oils, adhesives, and hydraulic fluids.",
        },
        alternates: {
            canonical: "/products/chemicals",
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

export default async function ChemicalsPage() {
    const raw = await getProductsByCategory('chemicals').catch(() => []);
    const specs = raw.map(p => ({ slug: p.slug, name: p.name, description: p.description }));

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Military Chemicals and Specifications",
        "description": "A comprehensive list of NATO approved chemical specifications supplied by ALC Trading.",
        "itemListElement": specs.map((spec, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
                "@type": "Product",
                "name": spec.name,
                "description": spec.description,
                "image": "https://alctrading.com/logomain_transparent.png",
                "brand": {
                    "@type": "Brand",
                    "name": "ALC Trading"
                },
                "offers": {
                    "@type": "Offer",
                    "url": `https://alctrading.com/products/chemicals/${spec.slug}`,
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
            { "@type": "ListItem", "position": 2, "name": "Chemicals", "item": "https://alctrading.com/products/chemicals" }
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
                        <span className="text-slate-900 font-bold">Chemicals</span>
                    </nav>
                </div>
            </div>

            <header className="bg-gradient-to-b from-brand-light to-brand-primary text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold uppercase tracking-tight mb-4">Chemicals</h1>
                    <div className="w-16 h-1 bg-brand-light mb-6"></div>
                    <p className="text-xl text-slate-300 max-w-3xl font-light">
                        We carry a wide range of NATO approved products.
                    </p>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-16 text-xs sm:text-sm font-bold tracking-wider uppercase text-slate-600 text-center break-words lg:whitespace-nowrap">
                    <div className="p-3 sm:p-4 bg-slate-50 border border-slate-200 flex items-center justify-center">Lubricants</div>
                    <div className="p-3 sm:p-4 bg-slate-50 border border-slate-200 flex items-center justify-center">Oils</div>
                    <div className="p-3 sm:p-4 bg-slate-50 border border-slate-200 flex items-center justify-center">Adhesive</div>
                    <div className="p-3 sm:p-4 bg-slate-50 border border-slate-200 flex items-center justify-center">Greases</div>
                    <div className="p-3 sm:p-4 bg-slate-50 border border-slate-200 flex items-center justify-center">Hydraulic Fluids</div>
                    <div className="p-3 sm:p-4 bg-slate-50 border border-slate-200 lg:col-span-2 flex items-center justify-center">Weapon Maintenance Products</div>
                    <div className="p-3 sm:p-4 bg-slate-50 border border-slate-200 flex items-center justify-center">Deicing Chemicals</div>
                    <div className="p-3 sm:p-4 bg-slate-50 border border-slate-200 lg:col-span-2 flex items-center justify-center">Corrosion Preventive Products</div>
                    <div className="p-3 sm:p-4 bg-slate-50 border border-slate-200 flex items-center justify-center">Sealants</div>
                    <div className="p-3 sm:p-4 bg-slate-50 border border-slate-200 flex items-center justify-center">Paint Remover</div>
                </div>

                <div className="p-6 bg-slate-100 border-l-4 border-brand-primary mb-16">
                    <p className="font-bold text-brand-primary uppercase tracking-widest">
                        We may have some products repacked for your needs.
                    </p>
                </div>

                <div>
                    <h2 className="text-2xl font-bold uppercase tracking-wide text-brand-primary border-b-2 border-slate-200 pb-4 mb-8">
                        Specifications & Products
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-4 gap-x-6 font-bold text-slate-700 text-lg">
                        {specs.map((spec, i) => (
                            <Link href={`/products/chemicals/${spec.slug}`} key={i} className="flex items-center gap-2 p-2 group hover:bg-slate-50 transition-colors rounded">
                                <span className="w-1.5 h-1.5 bg-brand-light block flex-shrink-0 group-hover:bg-brand-primary transition-colors"></span>
                                <span className="break-words group-hover:text-brand-primary transition-colors">{spec.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="mt-20 flex justify-center">
                    <a href="/#contact" className="inline-block bg-gradient-to-b from-brand-light to-brand-primary text-white font-bold px-8 py-4 uppercase tracking-widest text-sm hover:from-white hover:to-white hover:text-brand-primary transition-colors shadow-lg">
                        Contact Us For More Information
                    </a>
                </div>
            </div>
        </div>
    );
}
