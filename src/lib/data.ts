export type ProductBase = {
    id: string; // Used for URL slug
    name: string;
    categoryTitle: string;
    categorySlug: string; 
    subCategory?: string; // e.g., 'High Temp Alloys', 'Lubricants', 'Molten Metal PPE'
    description: string;
    brand: string;
};

// Extending for special properties
export type ProductDetailed = ProductBase & {
    materialSpec?: string;
    sizeWeight?: string;
    qty?: number;
    partNumber?: string;
    nsn?: string;
    manufacturer?: string;
    searchKeywords?: string[]; // Alternative search terms (dashless part numbers, NSN variants, etc.)
    longDescription?: string; // SEO-rich expanded description for dedicated product pages
};

// Helper function to generate clean slugs from names or part numbers (lowercase, spaces to dashes, remove slashes)
export function slugify(text: string): string {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars (except -)
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
}

export const METALS = [
    // High Temp Alloys
    ...['AMS 5536', 'AMS 5537', 'AMS 5545', 'AMS 5916', 'AMS 5608', 'AMS 5878', 'AMS 5872', 'AMS 5874', 'AMS 5951', 'AMS 5888', 'AMS 5889', 'AMS 5599', 'AMS 5969', 'AMS 5879', 'AMS 5596', 'AMS 5597', 'AMS 5542', 'AMS 5598', 'AMS 5544', 'AMS 5532'].map(name => ({
        id: slugify(name),
        name,
        categoryTitle: 'Metals',
        categorySlug: 'metals',
        subCategory: 'High Temp Alloys',
        description: `Military/Aerospace grade High Temp Alloy specification ${name}.`,
        brand: 'ALC Trading'
    })),
    // Aluminums
    ...['2026', '7055-T74511/T76511', '7055-T77511 EXTRUSION', 'C460 (AA2099)', '2024', '2090-T83', '2124', '2324-T39', '6061-T6517050', '7055', '7075', '7150-T7751', '7150-T77511', '7475'].map(name => ({
        id: slugify(name),
        name,
        categoryTitle: 'Metals',
        categorySlug: 'metals',
        subCategory: 'Aluminums',
        description: `Military/Aerospace grade aluminum specification ${name}.`,
        brand: 'ALC Trading'
    }))
];

export const CHEMICALS = [
    ...['MIL-PRF-3150', 'MIL-PRF-5606', 'MIL-PRF-6081', 'MIL-PRF-6085', 'MIL-PRF-6086', 'MIL-PRF-7808',
        'MIL-PRF-7870', 'MIL-PRF-8188', 'MIL-PRF-23699', 'MIL-PRF-21260', 'MIL-PRF-32033', 'MIL-PRF-46000',
        'MIL-PRF-46167', 'MIL-PRF-46170', 'MIL-PRF-63480', 'MIL-PRF-83282', 'MIL-PRF-87252', 'MIL-PRF-9000H',
        'MIL-P-11414', 'MIL-L-11195', 'MIL-L-10287', 'MIL-L-8937', 'MIL-C-8514', 'MIL-P-7962',
        'DAPCO 2200', 'DAPCO 2100', 'DAPCO 18-4F', 'DAPCO 1-100'].map(name => ({
            id: slugify(name),
            name,
            categoryTitle: 'Chemicals',
            categorySlug: 'chemicals',
            subCategory: 'Specifications & Products',
            description: `NATO approved military chemical specification ${name} available via ALC Trading.`,
            brand: 'ALC Trading'
    }))
];

export const PARACHUTES = [
    // Webbing
    ...['MIL-W-4088K', 'MIL-T-5038', 'MIL-W-5625K', 'MIL-W-17337F', 'MIL-T-87130'].map(name => ({
        id: slugify(name),
        name,
        categoryTitle: 'Parachutes',
        categorySlug: 'parachutes',
        subCategory: 'Webbing Textiles',
        description: `Military specification parachute webbing textile ${name}.`,
        brand: 'ALC Trading'
    })),
    // Fabrics
    ...['MIL-C-44378', 'MIL-C-3395', 'MIL-43805', 'MIL-C-7350', 'MIL-C-7020', 'MIL-C-8020', 'MIL-C-498', 'MIL-C-43375', 'MIL-C-43734', 'MIL-C-7219', 'MIL-C-508', 'MIL-C-10296', 'MIL-C-3953'].map(name => ({
        id: slugify(name),
        name,
        categoryTitle: 'Parachutes',
        categorySlug: 'parachutes',
        subCategory: 'Parachute Fabrics',
        description: `Military specification parachute fabric textile ${name}.`,
        brand: 'ALC Trading'
    }))
];

export const DUAL_MIRROR = [
    ...[
        { name: "DualMirror II 1086", specs: "Preox/Korspun Aramid", size: "19 osy / 650 gsm", subCat: "Molten Metal PPE" },
        { name: "DualMirror II 1081", specs: "Korspun Aramid", size: "19 osy / 650 gsm", subCat: "Molten Metal PPE" },
        { name: "DualMirror II 1017", specs: "FR Rayon", size: "17 osy / 570 gsm", subCat: "Molten Metal PPE" },
        { name: "DualMirror II 1006", specs: "FR Rayon", size: "15 osy / 500 gsm", subCat: "Molten Metal PPE" },
        { name: "DualMirror II 1100-4", specs: "Preox", size: "15 osy / 500 gsm", subCat: "Molten Metal PPE" },
        { name: "DualMirror II P-202", specs: "PBI/Aramid", size: "7 osy / 650 gsm", subCat: "Proximity Firefighting" },
        { name: "DualMirror II K-252", specs: "Aramid", size: "10 osy / 650 gsm", subCat: "Proximity Firefighting" },
        { name: "DualMirror II 1018", specs: "Beta Glass", size: "15 osy / 500 gsm", subCat: "Proximity Firefighting" },
        { name: "DualMirror II 1100-4 (Proximity)", specs: "Preox", size: "15 osy / 500 gsm", subCat: "Proximity Firefighting" } // Note: 1100-4 listed twice in original, differentiated slug for Proximity
    ].map(item => ({
        id: slugify(item.name),
        name: item.name.replace(' (Proximity)', ''),
        categoryTitle: 'DualMirror II',
        categorySlug: 'dual-mirror-ii',
        subCategory: item.subCat,
        description: `DualMirror II high performance fabric made of ${item.specs}, size ${item.size}.`,
        materialSpec: item.specs,
        sizeWeight: item.size,
        brand: 'DualMirror II'
    }))
];

export const SALE_ITEMS: ProductDetailed[] = [
    ...[
        { part: "BM80A-300L-050F60", desc: "Power Supply", mfg: "ASTEC", qty: 10 },
        { part: "BM80A-300L-022F85", desc: "Power Supply", mfg: "ASTEC", qty: 10 },
        { part: "73-317-0124", desc: "DC-DC Converter", mfg: "ASTEC", qty: 4 },
        { part: "10080389-101", desc: "Flex Board", mfg: "AERO", qty: 40, nsn: "5998-01-604-6189" },
        { part: "SF0987-6000-08", desc: "SMA Male to Female Att", mfg: "SV MICROWAVE", qty: 20 },
        { part: "SF1122-6036", desc: "Connector Adapt", mfg: "SV MICROWAVE", qty: 19 },
        { part: "LS-9522M", desc: "DPDT Latching Relay", mfg: "TE CONNECTIVITY", qty: 3 },
        { part: "1874870-1", desc: "Bearing Ball", mfg: "HONEYWELL", qty: 117 },
        { part: "NAS1152E4P", desc: "Screw Close Tolerance", mfg: "Heartland Precision Fastener Inc.", qty: 3400, nsn: "5305-01-582-2226" },
        { part: "SSR2280LLRA5P58LY217", desc: "Ball Bearing", mfg: "NHBB", qty: 100 },
        { part: "HRP/OX-1/4-4.5 0.25T", desc: "Honeycomb", mfg: "Hexcel", qty: 20 },
        { part: "HRP/OX-1/4-4.5 0.50T", desc: "Honeycomb", mfg: "Hexcel", qty: 11 },
    ].map(item => {
        const base: ProductDetailed = {
            id: slugify(item.part),
            name: item.part,
            categoryTitle: 'Sale Items',
            categorySlug: 'sale-items',
            description: `${item.desc}, ${item.mfg} Manufacturer, Part Number ${item.part}. Discounted military surplus available at ALC Trading.`,
            partNumber: item.part,
            nsn: item.nsn,
            qty: item.qty,
            manufacturer: item.mfg,
            subCategory: item.desc,
            brand: item.mfg
        };

        // Enrich specific high-value products with SEO content
        if (item.part === '10080389-101') {
            base.description = 'AERO FLEX BOARD – Part Number 10080389-101 (10080389101), NSN 5998-01-604-6189 (5998016046189). Military-grade flexible printed circuit board assembly used in aerospace and defense electronics systems. In stock and available for immediate purchase from ALC Trading.';
            base.searchKeywords = [
                '10080389-101', '10080389101',
                '5998-01-604-6189', '5998016046189',
                'FLEX BOARD', 'FLEX BOARD 10080389-101',
                'FLEX BOARD 10080389101',
                'AERO FLEX BOARD', 'AERO 10080389-101', 'AERO 10080389101',
                'flexible circuit board military',
                'NSN 5998-01-604-6189', 'NSN 5998016046189',
                'flex board nsn 5998016046189',
                'flex board 10080389101',
                'military flex board assembly',
                'aerospace flexible circuit board',
                'printed circuit board 10080389-101',
                'PCB 10080389-101',
                'buy 10080389-101', 'buy 10080389101',
                '10080389-101 in stock', '10080389101 in stock',
                'Flex Board 10080389-101 ALC Trading',
            ];
            base.longDescription = 'AERO Flex Board – Part Number 10080389-101 (also known as 10080389101 without dashes), NSN 5998-01-604-6189 (5998016046189). This military-grade flexible printed circuit board assembly is manufactured by AERO and used in aerospace and defense electronics systems. The Flex Board 10080389-101 meets military specifications for reliability in demanding environments. When searching for 10080389101, this is the correct product – available for immediate purchase from ALC Trading with 40 units currently in stock.';
        }

        if (item.part === 'NAS1152E4P') {
            base.description = 'Close Tolerance Screw – Part Number NAS1152E4P, NSN 5305-01-582-2226 (5305015822226). Manufactured by Heartland Precision Fastener Inc. National Aerospace Standard (NAS) close tolerance screw available from ALC Trading.';
            base.searchKeywords = [
                'NAS1152E4P', 'NAS 1152 E4P',
                '5305-01-582-2226', '5305015822226',
                'close tolerance screw', 'NAS1152', 'NAS screw',
                'NSN 5305-01-582-2226', 'NSN 5305015822226',
                'aerospace fastener NAS1152E4P', 'military screw NAS1152E4P',
                'Heartland Precision Fastener', 'NAS1152E4P in stock',
            ];
            base.longDescription = 'NAS1152E4P Close Tolerance Screw manufactured by Heartland Precision Fastener Inc. NSN 5305-01-582-2226 (also referenced as 5305015822226 without dashes). National Aerospace Standard (NAS) close tolerance fastener – Part Number NAS1152E4P. Available from ALC Trading with 3400 units in stock.';
        }

        if (item.part === 'SSR2280LLRA5P58LY217') {
            base.description = 'Ball Bearing – Part Number SSR2280LLRA5P58LY217, manufactured by NHBB (New Hampshire Ball Bearings). Precision aerospace and defense ball bearing available from ALC Trading.';
            base.searchKeywords = [
                'SSR2280LLRA5P58LY217', 'SSR2280', 'SSR2280LLRA',
                'NHBB', 'New Hampshire Ball Bearings',
                'NHBB ball bearing', 'NHBB SSR2280',
                'aerospace ball bearing SSR2280', 'SSR2280LLRA5P58LY217 in stock',
            ];
            base.longDescription = 'NHBB Ball Bearing – Part Number SSR2280LLRA5P58LY217. Manufactured by New Hampshire Ball Bearings (NHBB), a leading precision ball bearing manufacturer for aerospace and defense applications. Available from ALC Trading with 100 units in stock.';
        }

        if (item.part === 'HRP/OX-1/4-4.5 0.25T') {
            base.partNumber = 'HRP/OX-1/4-4.5';
            base.sizeWeight = 'Thickness 0.25", Ribbon 22", Width 96"';
            base.description = 'Hexcel HONEYCOMP HRP/OX-1/4-4.5 Honeycomb Panel – Thickness 0.25", Ribbon 22", Width 96". Phenolic fiberglass honeycomb structural material for aerospace applications. Available from ALC Trading.';
            base.searchKeywords = [
                'HRP/OX-1/4-4.5', 'HRPOX1445', 'HRP OX 1/4 4.5',
                'Hexcel honeycomb', 'HONEYCOMP HRP', 'HONEYCOMP HRP/OX-1/4-4.5',
                'phenolic fiberglass honeycomb', 'aerospace honeycomb panel',
                'Hexcel HRPOX', '0.25 inch honeycomb', 'quarter inch honeycomb panel',
                'HRP/OX-1/4-4.5 0.25', 'Hexcel HRP honeycomb',
            ];
            base.longDescription = 'Hexcel HONEYCOMP HRP/OX-1/4-4.5 Honeycomb Panel. Thickness 0.25 inches, Ribbon 22 inches, Width 96 inches. Part Number HRP/OX-1/4-4.5 (also referenced as HRPOX1445). Phenolic fiberglass honeycomb structural core material manufactured by Hexcel – widely used in aerospace and defense sandwich panel structures. Available from ALC Trading with 20 units in stock.';
        }

        if (item.part === 'HRP/OX-1/4-4.5 0.50T') {
            base.partNumber = 'HRP/OX-1/4-4.5';
            base.sizeWeight = 'Thickness 0.50", Ribbon 22", Width 96"';
            base.description = 'Hexcel HONEYCOMP HRP/OX-1/4-4.5 Honeycomb Panel – Thickness 0.50", Ribbon 22", Width 96". Phenolic fiberglass honeycomb structural material for aerospace applications. Available from ALC Trading.';
            base.searchKeywords = [
                'HRP/OX-1/4-4.5', 'HRPOX1445', 'HRP OX 1/4 4.5',
                'Hexcel honeycomb', 'HONEYCOMP HRP', 'HONEYCOMP HRP/OX-1/4-4.5',
                'phenolic fiberglass honeycomb', 'aerospace honeycomb panel',
                'Hexcel HRPOX', '0.50 inch honeycomb', 'half inch honeycomb panel',
                'HRP/OX-1/4-4.5 0.50', 'Hexcel HRP honeycomb',
            ];
            base.longDescription = 'Hexcel HONEYCOMP HRP/OX-1/4-4.5 Honeycomb Panel. Thickness 0.50 inches, Ribbon 22 inches, Width 96 inches. Part Number HRP/OX-1/4-4.5 (also referenced as HRPOX1445). Phenolic fiberglass honeycomb structural core material manufactured by Hexcel – widely used in aerospace and defense sandwich panel structures. Available from ALC Trading with 11 units in stock.';
        }

        return base;
    })
];

export const ALL_PRODUCTS: ProductDetailed[] = [
    ...METALS,
    ...CHEMICALS,
    ...PARACHUTES,
    ...DUAL_MIRROR,
    ...SALE_ITEMS
];

// Helper to find a specific product (static fallback — used when Sanity is unavailable)
export function getProductBySlug(categorySlug: string, slug: string): ProductDetailed | undefined {
    return ALL_PRODUCTS.find(p => p.categorySlug === categorySlug && p.id === slug);
}

// ─────────────────────────────────────────────────────────────────────────────
// SANITY INTEGRATION LAYER
// Maps a SanityProduct → ProductDetailed so existing page components work
// without modification during the migration period.
// ─────────────────────────────────────────────────────────────────────────────
import type { SanityProduct } from './sanity';

export function sanityProductToDetailed(p: SanityProduct): ProductDetailed {
    return {
        id:            p.slug,
        name:          p.name,
        categoryTitle: p.categoryTitle,
        categorySlug:  p.categorySlug,
        subCategory:   p.subCategory,
        description:   p.description,
        brand:         p.brand,
        manufacturer:  p.manufacturer,
        partNumber:    p.partNumber,
        nsn:           p.nsn,
        materialSpec:  p.materialSpec,
        sizeWeight:    p.sizeWeight,
        qty:           p.qty,
        searchKeywords: p.searchKeywords,
        // longDescription from Sanity is Portable Text; serialize to plain string for legacy pages
        longDescription: Array.isArray(p.longDescription)
            ? p.longDescription
                  .filter((b: unknown) => (b as { _type: string })._type === 'block')
                  .flatMap((b: unknown) => ((b as { children?: Array<{ text?: string }> }).children ?? []).map((s) => s.text ?? ''))
                  .join(' ')
            : undefined,
    };
}
