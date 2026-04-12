import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "10080389-101 FLEX BOARD (NSN 5998-01-604-6189) & Military Surplus | ALC Trading Sale Items",
        description: "Buy AERO FLEX BOARD Part Number 10080389-101 (10080389101), NSN 5998-01-604-6189 (5998016046189). Military-grade flexible circuit board assembly – 40 units in stock. Plus power supplies, converters, connectors, relays, and bearings from ALC Trading.",
        keywords: [
            "10080389-101",
            "10080389101",
            "5998-01-604-6189",
            "5998016046189",
            "nsn 5998-01-604-6189",
            "nsn 5998016046189",
            "10080389-101 flex board",
            "flex board 10080389101",
            "FLEX BOARD",
            "FLEX BOARD AERO",
            "AERO 10080389-101",
            "AERO flex board",
            "flexible circuit board military",
            "flex board nsn",
            "military surplus electronics",
            "Military Surplus Sale Items",
            "ALC Trading Sale Items",
            "Surplus Military Parts",
            "military electronic component assemblies",
            "BM80A-300L-050F60",
            "BM80A-300L-022F85",
            "73-317-0124",
            "SF0987-6000-08",
            "SF1122-6036",
            "LS-9522M",
            "1874870-1",
        ],
        openGraph: {
            title: "10080389-101 FLEX BOARD (NSN 5998-01-604-6189) | ALC Trading Sale Items",
            description: "Buy AERO FLEX BOARD Part Number 10080389-101 (10080389101), NSN 5998-01-604-6189 (5998016046189). 40 units in stock. Military surplus electronics available from ALC Trading.",
            url: "/products/sale-items",
            images: [
                {
                    url: "https://alctrading.com/logomain_transparent.png",
                    width: 800,
                    height: 270,
                    alt: "ALC Trading Sale Items – FLEX BOARD 10080389-101"
                }
            ],
            siteName: "ALC Trading",
            locale: "en_US",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: "10080389-101 FLEX BOARD (NSN 5998-01-604-6189) | ALC Trading",
            description: "Military surplus AERO FLEX BOARD PN 10080389-101 / 10080389101, NSN 5998-01-604-6189 / 5998016046189. Immediate availability from ALC Trading.",
        },
        alternates: {
            canonical: "/products/sale-items",
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
    };
}

import Link from "next/link";
import { getProductsByCategory } from "@/lib/sanity";

export default async function SaleItemsPage() {
    const raw = await getProductsByCategory('sale-items').catch(() => []);
    const inventory = raw.map(p => ({ slug: p.slug, id: p.slug, partNumber: p.partNumber ?? p.name, subCategory: p.subCategory, description: p.description, manufacturer: p.manufacturer ?? p.brand, qty: p.qty, nsn: p.nsn, sizeWeight: p.sizeWeight }));

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Military Surplus Sale Items – ALC Trading",
        "description": "Discounted military surplus and legacy inventory including FLEX BOARD 10080389-101 (NSN 5998-01-604-6189), power supplies, DC-DC converters, connectors, relays, and bearings.",
        "itemListElement": inventory.map((item, index) => {
            const productSchema: Record<string, unknown> = {
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                    "@type": "Product",
                    "name": `${item.subCategory} ${item.partNumber}`,
                    "image": "https://alctrading.com/logomain_transparent.png",
                    "description": item.description,
                    "sku": item.partNumber,
                    "mpn": item.partNumber,
                    "brand": {
                        "@type": "Brand",
                        "name": item.manufacturer
                    },
                    "offers": {
                        "@type": "Offer",
                        "url": `https://alctrading.com/products/sale-items/${item.slug}`,
                        "priceCurrency": "USD",
                        "price": "0.00",
                        "availability": "https://schema.org/InStock",
                        "itemCondition": "https://schema.org/NewCondition",
                        "seller": {
                            "@type": "Organization",
                            "name": "Alarcon Trading Inc."
                        },
                        "eligibleQuantity": {
                            "@type": "QuantitativeValue",
                            "value": item.qty
                        }
                    },
                    ...(item.nsn ? {
                        "identifier": [
                            {
                                "@type": "PropertyValue",
                                "propertyID": "NSN",
                                "name": "National Stock Number",
                                "value": item.nsn
                            },
                            {
                                "@type": "PropertyValue",
                                "propertyID": "NSN_NODASH",
                                "name": "National Stock Number (no dashes)",
                                "value": item.nsn.replace(/-/g, '')
                            }
                        ]
                    } : {}),
                    ...(item.partNumber ? {
                        "additionalProperty": [
                            {
                                "@type": "PropertyValue",
                                "propertyID": "PartNumber",
                                "name": "Part Number",
                                "value": item.partNumber
                            },
                            ...(item.partNumber.includes('-') ? [{
                                "@type": "PropertyValue",
                                "propertyID": "PartNumber_NODASH",
                                "name": "Part Number (no dashes)",
                                "value": item.partNumber.replace(/-/g, '')
                            }] : [])
                        ]
                    } : {})
                }
            };
            return productSchema;
        })
    };

    // Breadcrumb schema
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
                "name": "Sale Items",
                "item": "https://alctrading.com/products/sale-items"
            }
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
                        <span className="text-slate-900 font-bold">Sale Items</span>
                    </nav>
                </div>
            </div>

            <header className="bg-gradient-to-b from-brand-light to-brand-primary text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold uppercase tracking-tight mb-4">Sale Items</h1>
                    <div className="w-16 h-1 bg-brand-light mb-6"></div>
                    <p className="text-xl text-slate-300 max-w-3xl font-light">
                        Discounted surplus and legacy inventory. Immediate availability.
                    </p>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="overflow-x-auto border border-slate-200 shadow-sm mb-16">
                    <table className="w-full text-left font-medium text-base whitespace-nowrap">
                        <thead className="bg-slate-100 text-brand-primary uppercase tracking-wider text-xs border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 font-bold">Part Number</th>
                                <th className="px-6 py-4 font-bold">Description</th>
                                <th className="px-6 py-4 font-bold">Manufacturer</th>
                                <th className="px-6 py-4 font-bold text-right">Qty</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100/50">
                            {inventory.map((item, idx) => (
                                <tr key={idx} className="hover:bg-slate-50 transition-colors group">
                                    <td className="px-6 py-4 font-bold text-slate-800">
                                        <div className="flex flex-col">
                                            <Link href={`/products/sale-items/${item.slug}`} className="group-hover:text-brand-primary transition-colors underline-offset-4 decoration-2 hover:underline">{item.partNumber}</Link>
                                            {/* Dashless part number for search crawlers */}
                                            {item.partNumber && item.partNumber.includes('-') && (
                                                <span className="sr-only">{item.partNumber.replace(/-/g, '')}</span>
                                            )}
                                            {item.nsn && (
                                                <Link href={`/products/sale-items/${item.slug}`} className="hover:text-brand-primary transition-colors">NSN: {item.nsn}</Link>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-bold text-slate-600">
                                        <div className="flex flex-col gap-0.5">
                                            <span>{item.subCategory}</span>
                                            {item.sizeWeight && (
                                                <span >{item.sizeWeight}</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-bold text-slate-600">{item.manufacturer}</td>
                                    <td className="px-6 py-4 font-bold text-slate-900 text-right">{item.qty} <span className="font-bold font-mono text-slate-900">EA</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="mt-12 text-center">
                    <a href="/#contact" className="inline-block bg-gradient-to-b from-brand-light to-brand-primary text-white font-bold px-10 py-5 uppercase tracking-widest text-sm hover:from-white hover:to-white hover:text-brand-primary transition-colors shadow-lg">
                        Please Contact Us For More Information
                    </a>
                </div>
            </div>
        </div>
    );
}
