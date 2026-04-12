/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ALARCON TRADING — Sanity CMS Data Migration Script
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * Seeds all static product data (5 categories, ~98 products) into Sanity.
 * SAFE TO RUN MULTIPLE TIMES — uses createOrReplace with deterministic _id.
 *
 * Usage:
 *   npm run migrate
 *
 * Requirements:
 *   .env.local must have NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_READ_TOKEN
 *   The token must have WRITE permissions (not read-only) for migration.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { createClient, type SanityClient } from '@sanity/client';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// ─── 1. Load .env.local ───────────────────────────────────────────────────────

function loadEnvLocal(): void {
    const envPath = resolve(process.cwd(), '.env.local');
    let content: string;
    try {
        content = readFileSync(envPath, 'utf-8');
    } catch {
        console.error('❌  .env.local not found. Aborting.');
        process.exit(1);
    }
    for (const line of content.split('\n')) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;
        const eqIndex = trimmed.indexOf('=');
        if (eqIndex === -1) continue;
        const key   = trimmed.slice(0, eqIndex).trim();
        const value = trimmed.slice(eqIndex + 1).trim();
        if (key) process.env[key] = value;
    }
}

loadEnvLocal();

// ─── 2. Validate environment ──────────────────────────────────────────────────

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '';
const DATASET    = process.env.NEXT_PUBLIC_SANITY_DATASET    ?? 'production';
const API_VER    = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2024-01-01';
const TOKEN      = process.env.SANITY_API_READ_TOKEN          ?? '';

if (!/^[a-z0-9-]+$/.test(PROJECT_ID)) {
    console.error('❌  NEXT_PUBLIC_SANITY_PROJECT_ID is missing or invalid in .env.local');
    process.exit(1);
}
if (!TOKEN) {
    console.error('❌  SANITY_API_READ_TOKEN is missing in .env.local');
    process.exit(1);
}

const client: SanityClient = createClient({
    projectId:  PROJECT_ID,
    dataset:    DATASET,
    apiVersion: API_VER,
    token:      TOKEN,
    useCdn:     false,
});

// ─── 3. Helpers ───────────────────────────────────────────────────────────────

let keyCounter = 0;
function key(): string {
    return `k${(++keyCounter).toString(36)}`;
}

function slugify(text: string): string {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
}

/** Converts a plain string into a minimal Portable Text block array. */
function toPortableText(text: string) {
    return [
        {
            _type:    'block',
            _key:     key(),
            style:    'normal',
            markDefs: [],
            children: [{ _type: 'span', _key: key(), text, marks: [] }],
        },
    ];
}

// ─── 4. Raw Data (mirrors src/lib/data.ts) ────────────────────────────────────

const CATEGORIES = [
    { slug: 'metals',        title: 'Metals',               description: 'Military and Aerospace grade metal supplies.',       displayOrder: 1 },
    { slug: 'chemicals',     title: 'Chemicals',             description: 'Military specification chemicals and compounds.',    displayOrder: 2 },
    { slug: 'parachutes',    title: 'Parachutes',            description: 'Military-grade parachute spare parts.',              displayOrder: 3 },
    { slug: 'dual-mirror-ii',title: 'DualMirror II Fabrics', description: 'High performance fabrics for extreme conditions.',   displayOrder: 4 },
    { slug: 'sale-items',    title: 'Sale Items',            description: 'Discounted surplus and legacy inventory.',           displayOrder: 5 },
];

interface RawProduct {
    name:          string;
    categorySlug:  string;
    subCategory?:  string;
    description:   string;
    brand:         string;
    manufacturer?: string;
    partNumber?:   string;
    nsn?:          string;
    materialSpec?: string;
    sizeWeight?:   string;
    qty?:          number;
    searchKeywords?: string[];
    longDescription?: string;
    displayOrder?: number;
}

const RAW_PRODUCTS: RawProduct[] = [
    // ── Metals / High Temp Alloys ─────────────────────────────────────────────
    ...['AMS 5536','AMS 5537','AMS 5545','AMS 5916','AMS 5608','AMS 5878',
        'AMS 5872','AMS 5874','AMS 5951','AMS 5888','AMS 5889','AMS 5599',
        'AMS 5969','AMS 5879','AMS 5596','AMS 5597','AMS 5542','AMS 5598',
        'AMS 5544','AMS 5532',
    ].map((name, i) => ({
        name,
        categorySlug: 'metals',
        subCategory:  'High Temp Alloys',
        description:  `Military/Aerospace grade High Temp Alloy specification ${name}.`,
        brand:        'ALC Trading',
        displayOrder: i + 1,
    })),

    // ── Metals / Aluminums ────────────────────────────────────────────────────
    ...['2026','7055-T74511/T76511','7055-T77511 EXTRUSION','C460 (AA2099)',
        '2024','2090-T83','2124','2324-T39','6061-T6517050','7055','7075',
        '7150-T7751','7150-T77511','7475',
    ].map((name, i) => ({
        name,
        categorySlug: 'metals',
        subCategory:  'Aluminums',
        description:  `Military/Aerospace grade aluminum specification ${name}.`,
        brand:        'ALC Trading',
        displayOrder: i + 1,
    })),

    // ── Chemicals / Specifications & Products ─────────────────────────────────
    ...['MIL-PRF-3150','MIL-PRF-5606','MIL-PRF-6081','MIL-PRF-6085',
        'MIL-PRF-6086','MIL-PRF-7808','MIL-PRF-7870','MIL-PRF-8188',
        'MIL-PRF-23699','MIL-PRF-21260','MIL-PRF-32033','MIL-PRF-46000',
        'MIL-PRF-46167','MIL-PRF-46170','MIL-PRF-63480','MIL-PRF-83282',
        'MIL-PRF-87252','MIL-PRF-9000H','MIL-P-11414','MIL-L-11195',
        'MIL-L-10287','MIL-L-8937','MIL-C-8514','MIL-P-7962',
        'DAPCO 2200','DAPCO 2100','DAPCO 18-4F','DAPCO 1-100',
        'ETC-PLANE NAKED PAINT REMOVER',
    ].map((name, i) => ({
        name,
        categorySlug: 'chemicals',
        subCategory:  'Specifications & Products',
        description:  `NATO approved military chemical specification ${name} available via ALC Trading.`,
        brand:        'ALC Trading',
        displayOrder: i + 1,
    })),

    // ── Parachutes / Webbing Textiles ─────────────────────────────────────────
    ...['MIL-W-4088K','MIL-T-5038','MIL-W-5625K','MIL-W-17337F','MIL-T-87130',
    ].map((name, i) => ({
        name,
        categorySlug: 'parachutes',
        subCategory:  'Webbing Textiles',
        description:  `Military specification parachute webbing textile ${name}.`,
        brand:        'ALC Trading',
        displayOrder: i + 1,
    })),

    // ── Parachutes / Parachute Fabrics ────────────────────────────────────────
    ...['MIL-C-44378','MIL-C-3395','MIL-43805','MIL-C-7350','MIL-C-7020',
        'MIL-C-8020','MIL-C-498','MIL-C-43375','MIL-C-43734','MIL-C-7219',
        'MIL-C-508','MIL-C-10296','MIL-C-3953',
    ].map((name, i) => ({
        name,
        categorySlug: 'parachutes',
        subCategory:  'Parachute Fabrics',
        description:  `Military specification parachute fabric textile ${name}.`,
        brand:        'ALC Trading',
        displayOrder: i + 1,
    })),

    // ── DualMirror II / Molten Metal PPE ─────────────────────────────────────
    {   name: 'DualMirror II 1086', categorySlug: 'dual-mirror-ii', subCategory: 'Molten Metal PPE',
        description: 'DualMirror II high performance fabric made of Preox/Korspun Aramid, size 19 osy / 650 gsm.',
        brand: 'DualMirror II', materialSpec: 'Preox/Korspun Aramid', sizeWeight: '19 osy / 650 gsm', displayOrder: 1 },
    {   name: 'DualMirror II 1081', categorySlug: 'dual-mirror-ii', subCategory: 'Molten Metal PPE',
        description: 'DualMirror II high performance fabric made of Korspun Aramid, size 19 osy / 650 gsm.',
        brand: 'DualMirror II', materialSpec: 'Korspun Aramid', sizeWeight: '19 osy / 650 gsm', displayOrder: 2 },
    {   name: 'DualMirror II 1017', categorySlug: 'dual-mirror-ii', subCategory: 'Molten Metal PPE',
        description: 'DualMirror II high performance fabric made of FR Rayon, size 17 osy / 570 gsm.',
        brand: 'DualMirror II', materialSpec: 'FR Rayon', sizeWeight: '17 osy / 570 gsm', displayOrder: 3 },
    {   name: 'DualMirror II 1006', categorySlug: 'dual-mirror-ii', subCategory: 'Molten Metal PPE',
        description: 'DualMirror II high performance fabric made of FR Rayon, size 15 osy / 500 gsm.',
        brand: 'DualMirror II', materialSpec: 'FR Rayon', sizeWeight: '15 osy / 500 gsm', displayOrder: 4 },
    {   name: 'DualMirror II 1100-4', categorySlug: 'dual-mirror-ii', subCategory: 'Molten Metal PPE',
        description: 'DualMirror II high performance fabric made of Preox, size 15 osy / 500 gsm.',
        brand: 'DualMirror II', materialSpec: 'Preox', sizeWeight: '15 osy / 500 gsm', displayOrder: 5 },

    // ── DualMirror II / Proximity Firefighting ────────────────────────────────
    {   name: 'DualMirror II P-202', categorySlug: 'dual-mirror-ii', subCategory: 'Proximity Firefighting',
        description: 'DualMirror II high performance fabric made of PBI/Aramid, size 7 osy / 650 gsm.',
        brand: 'DualMirror II', materialSpec: 'PBI/Aramid', sizeWeight: '7 osy / 650 gsm', displayOrder: 6 },
    {   name: 'DualMirror II K-252', categorySlug: 'dual-mirror-ii', subCategory: 'Proximity Firefighting',
        description: 'DualMirror II high performance fabric made of Aramid, size 10 osy / 650 gsm.',
        brand: 'DualMirror II', materialSpec: 'Aramid', sizeWeight: '10 osy / 650 gsm', displayOrder: 7 },
    {   name: 'DualMirror II 1018', categorySlug: 'dual-mirror-ii', subCategory: 'Proximity Firefighting',
        description: 'DualMirror II high performance fabric made of Beta Glass, size 15 osy / 500 gsm.',
        brand: 'DualMirror II', materialSpec: 'Beta Glass', sizeWeight: '15 osy / 500 gsm', displayOrder: 8 },
    {   name: 'DualMirror II 1100-4 Proximity', categorySlug: 'dual-mirror-ii', subCategory: 'Proximity Firefighting',
        description: 'DualMirror II high performance fabric made of Preox, size 15 osy / 500 gsm — Proximity grade.',
        brand: 'DualMirror II', materialSpec: 'Preox', sizeWeight: '15 osy / 500 gsm', displayOrder: 9 },

    // ── Sale Items / Current Inventory ────────────────────────────────────────
    {   name: 'BM80A-300L-050F60', categorySlug: 'sale-items', subCategory: 'Power Supply',
        description: 'Power Supply, ASTEC Manufacturer, Part Number BM80A-300L-050F60. Discounted military surplus available at ALC Trading.',
        brand: 'ASTEC', manufacturer: 'ASTEC', partNumber: 'BM80A-300L-050F60', qty: 10, displayOrder: 1 },
    {   name: 'BM80A-300L-022F85', categorySlug: 'sale-items', subCategory: 'Power Supply',
        description: 'Power Supply, ASTEC Manufacturer, Part Number BM80A-300L-022F85. Discounted military surplus available at ALC Trading.',
        brand: 'ASTEC', manufacturer: 'ASTEC', partNumber: 'BM80A-300L-022F85', qty: 10, displayOrder: 2 },
    {   name: '73-317-0124', categorySlug: 'sale-items', subCategory: 'DC-DC Converter',
        description: 'DC-DC Converter, ASTEC Manufacturer, Part Number 73-317-0124. Discounted military surplus available at ALC Trading.',
        brand: 'ASTEC', manufacturer: 'ASTEC', partNumber: '73-317-0124', qty: 4, displayOrder: 3 },
    {   name: '10080389-101', categorySlug: 'sale-items', subCategory: 'Flex Board',
        description: 'AERO FLEX BOARD – Part Number 10080389-101 (10080389101), NSN 5998-01-604-6189 (5998016046189). Military-grade flexible printed circuit board assembly used in aerospace and defense electronics systems. In stock and available for immediate purchase from ALC Trading.',
        brand: 'AERO', manufacturer: 'AERO', partNumber: '10080389-101', nsn: '5998-01-604-6189', qty: 40,
        searchKeywords: [
            '10080389-101','10080389101','5998-01-604-6189','5998016046189',
            'FLEX BOARD','FLEX BOARD 10080389-101','FLEX BOARD 10080389101',
            'AERO FLEX BOARD','AERO 10080389-101','AERO 10080389101',
            'flexible circuit board military','NSN 5998-01-604-6189','NSN 5998016046189',
            'flex board nsn 5998016046189','flex board 10080389101',
            'military flex board assembly','aerospace flexible circuit board',
            'printed circuit board 10080389-101','PCB 10080389-101',
            'buy 10080389-101','buy 10080389101',
            '10080389-101 in stock','10080389101 in stock',
            'Flex Board 10080389-101 ALC Trading',
        ],
        longDescription: 'AERO Flex Board – Part Number 10080389-101 (also known as 10080389101 without dashes), NSN 5998-01-604-6189 (5998016046189). This military-grade flexible printed circuit board assembly is manufactured by AERO and used in aerospace and defense electronics systems. The Flex Board 10080389-101 meets military specifications for reliability in demanding environments. When searching for 10080389101, this is the correct product – available for immediate purchase from ALC Trading with 40 units currently in stock.',
        displayOrder: 4,
    },
    {   name: 'SF0987-6000-08', categorySlug: 'sale-items', subCategory: 'SMA Male to Female Att',
        description: 'SMA Male to Female Att, SV MICROWAVE Manufacturer, Part Number SF0987-6000-08. Discounted military surplus available at ALC Trading.',
        brand: 'SV MICROWAVE', manufacturer: 'SV MICROWAVE', partNumber: 'SF0987-6000-08', qty: 20, displayOrder: 5 },
    {   name: 'SF1122-6036', categorySlug: 'sale-items', subCategory: 'Connector Adapt',
        description: 'Connector Adapt, SV MICROWAVE Manufacturer, Part Number SF1122-6036. Discounted military surplus available at ALC Trading.',
        brand: 'SV MICROWAVE', manufacturer: 'SV MICROWAVE', partNumber: 'SF1122-6036', qty: 19, displayOrder: 6 },
    {   name: 'LS-9522M', categorySlug: 'sale-items', subCategory: 'DPDT Latching Relay',
        description: 'DPDT Latching Relay, TE CONNECTIVITY Manufacturer, Part Number LS-9522M. Discounted military surplus available at ALC Trading.',
        brand: 'TE CONNECTIVITY', manufacturer: 'TE CONNECTIVITY', partNumber: 'LS-9522M', qty: 3, displayOrder: 7 },
    {   name: '1874870-1', categorySlug: 'sale-items', subCategory: 'Bearing Ball',
        description: 'Bearing Ball, HONEYWELL Manufacturer, Part Number 1874870-1. Discounted military surplus available at ALC Trading.',
        brand: 'HONEYWELL', manufacturer: 'HONEYWELL', partNumber: '1874870-1', qty: 117, displayOrder: 8 },

    // ── Sale Items added 2026-04-12 ───────────────────────────────────────────
    {   name: 'NAS1152E4P', categorySlug: 'sale-items', subCategory: 'Screw Close Tolerance',
        description: 'Close Tolerance Screw – Part Number NAS1152E4P, NSN 5305-01-582-2226 (5305015822226). Manufactured by Heartland Precision Fastener Inc. National Aerospace Standard (NAS) close tolerance screw available from ALC Trading.',
        brand: 'Heartland Precision Fastener Inc.', manufacturer: 'Heartland Precision Fastener Inc.',
        partNumber: 'NAS1152E4P', nsn: '5305-01-582-2226', qty: 3400,
        searchKeywords: [
            'NAS1152E4P','NAS 1152 E4P',
            '5305-01-582-2226','5305015822226',
            'close tolerance screw','NAS1152','NAS screw',
            'NSN 5305-01-582-2226','NSN 5305015822226',
            'aerospace fastener NAS1152E4P','military screw NAS1152E4P',
            'Heartland Precision Fastener','NAS1152E4P in stock',
        ],
        longDescription: 'NAS1152E4P Close Tolerance Screw manufactured by Heartland Precision Fastener Inc. NSN 5305-01-582-2226 (also referenced as 5305015822226 without dashes). National Aerospace Standard (NAS) close tolerance fastener – Part Number NAS1152E4P. Available from ALC Trading with 3400 units in stock.',
        displayOrder: 9 },

    {   name: 'SSR2280LLRA5P58LY217', categorySlug: 'sale-items', subCategory: 'Ball Bearing',
        description: 'Ball Bearing – Part Number SSR2280LLRA5P58LY217, manufactured by NHBB (New Hampshire Ball Bearings). Precision aerospace and defense ball bearing available from ALC Trading.',
        brand: 'NHBB', manufacturer: 'NHBB',
        partNumber: 'SSR2280LLRA5P58LY217', qty: 100,
        searchKeywords: [
            'SSR2280LLRA5P58LY217','SSR2280','SSR2280LLRA',
            'NHBB','New Hampshire Ball Bearings',
            'NHBB ball bearing','NHBB SSR2280',
            'aerospace ball bearing SSR2280','SSR2280LLRA5P58LY217 in stock',
        ],
        longDescription: 'NHBB Ball Bearing – Part Number SSR2280LLRA5P58LY217. Manufactured by New Hampshire Ball Bearings (NHBB), a leading precision ball bearing manufacturer for aerospace and defense applications. Available from ALC Trading with 100 units in stock.',
        displayOrder: 10 },

    {   name: 'HRP/OX-1/4-4.5 0.25T', categorySlug: 'sale-items', subCategory: 'Honeycomb',
        description: 'Hexcel HONEYCOMP HRP/OX-1/4-4.5 Honeycomb Panel – Thickness 0.25", Ribbon 22", Width 96". Phenolic fiberglass honeycomb structural material for aerospace applications. Available from ALC Trading.',
        brand: 'Hexcel', manufacturer: 'Hexcel',
        partNumber: 'HRP/OX-1/4-4.5', sizeWeight: 'Thickness 0.25", Ribbon 22", Width 96"', qty: 20,
        searchKeywords: [
            'HRP/OX-1/4-4.5','HRPOX1445','HRP OX 1/4 4.5',
            'Hexcel honeycomb','HONEYCOMP HRP','HONEYCOMP HRP/OX-1/4-4.5',
            'phenolic fiberglass honeycomb','aerospace honeycomb panel',
            'Hexcel HRPOX','0.25 inch honeycomb','quarter inch honeycomb panel',
            'HRP/OX-1/4-4.5 0.25','Hexcel HRP honeycomb',
        ],
        longDescription: 'Hexcel HONEYCOMP HRP/OX-1/4-4.5 Honeycomb Panel. Thickness 0.25 inches, Ribbon 22 inches, Width 96 inches. Part Number HRP/OX-1/4-4.5 (also referenced as HRPOX1445). Phenolic fiberglass honeycomb structural core material manufactured by Hexcel – widely used in aerospace and defense sandwich panel structures. Available from ALC Trading with 20 units in stock.',
        displayOrder: 11 },

    {   name: 'HRP/OX-1/4-4.5 0.50T', categorySlug: 'sale-items', subCategory: 'Honeycomb',
        description: 'Hexcel HONEYCOMP HRP/OX-1/4-4.5 Honeycomb Panel – Thickness 0.50", Ribbon 22", Width 96". Phenolic fiberglass honeycomb structural material for aerospace applications. Available from ALC Trading.',
        brand: 'Hexcel', manufacturer: 'Hexcel',
        partNumber: 'HRP/OX-1/4-4.5', sizeWeight: 'Thickness 0.50", Ribbon 22", Width 96"', qty: 11,
        searchKeywords: [
            'HRP/OX-1/4-4.5','HRPOX1445','HRP OX 1/4 4.5',
            'Hexcel honeycomb','HONEYCOMP HRP','HONEYCOMP HRP/OX-1/4-4.5',
            'phenolic fiberglass honeycomb','aerospace honeycomb panel',
            'Hexcel HRPOX','0.50 inch honeycomb','half inch honeycomb panel',
            'HRP/OX-1/4-4.5 0.50','Hexcel HRP honeycomb',
        ],
        longDescription: 'Hexcel HONEYCOMP HRP/OX-1/4-4.5 Honeycomb Panel. Thickness 0.50 inches, Ribbon 22 inches, Width 96 inches. Part Number HRP/OX-1/4-4.5 (also referenced as HRPOX1445). Phenolic fiberglass honeycomb structural core material manufactured by Hexcel – widely used in aerospace and defense sandwich panel structures. Available from ALC Trading with 11 units in stock.',
        displayOrder: 12 },
];

// ─── 5. Migration ─────────────────────────────────────────────────────────────

async function migrate(): Promise<void> {
    console.log('\n╔══════════════════════════════════════════════════════════════╗');
    console.log('║  ALARCON TRADING — Sanity Migration                         ║');
    console.log(`║  Project: ${PROJECT_ID.padEnd(50)}║`);
    console.log(`║  Dataset: ${DATASET.padEnd(50)}║`);
    console.log('╚══════════════════════════════════════════════════════════════╝\n');

    // ── Step 1: Upsert Categories ────────────────────────────────────────────
    console.log('▶  Step 1/2 — Upserting categories...\n');
    const categoryIdMap: Record<string, string> = {};

    for (const cat of CATEGORIES) {
        const docId = `category-${cat.slug}`;
        const doc = {
            _id:          docId,
            _type:        'category',
            title:        cat.title,
            slug:         { _type: 'slug', current: cat.slug },
            description:  cat.description,
            displayOrder: cat.displayOrder,
            isDeleted:    false,
        };

        await client.createOrReplace(doc);
        categoryIdMap[cat.slug] = docId;
        console.log(`   ✔  ${cat.title.padEnd(25)} → ${docId}`);
    }

    // ── Step 2: Upsert Products ──────────────────────────────────────────────
    console.log(`\n▶  Step 2/2 — Upserting ${RAW_PRODUCTS.length} products...\n`);
    let success = 0;
    let failed  = 0;

    for (const p of RAW_PRODUCTS) {
        const productSlug = slugify(p.name);
        const docId       = `product-${productSlug}`;
        const categoryRef = categoryIdMap[p.categorySlug];

        if (!categoryRef) {
            console.warn(`   ⚠  Skipped "${p.name}" — unknown categorySlug "${p.categorySlug}"`);
            failed++;
            continue;
        }

        const doc: Record<string, unknown> = {
            _id:         docId,
            _type:       'product',
            name:        p.name,
            slug:        { _type: 'slug', current: productSlug },
            category:    { _type: 'reference', _ref: categoryRef },
            subCategory: p.subCategory,
            description: p.description,
            brand:       p.brand,
            isDeleted:   false,
            displayOrder: p.displayOrder ?? 99,
        };

        if (p.manufacturer)    doc.manufacturer    = p.manufacturer;
        if (p.partNumber)      doc.partNumber      = p.partNumber;
        if (p.nsn)             doc.nsn             = p.nsn;
        if (p.materialSpec)    doc.materialSpec    = p.materialSpec;
        if (p.sizeWeight)      doc.sizeWeight      = p.sizeWeight;
        if (p.qty !== undefined) doc.qty           = p.qty;
        if (p.searchKeywords?.length) doc.searchKeywords = p.searchKeywords;
        if (p.longDescription) doc.longDescription = toPortableText(p.longDescription);

        try {
            await client.createOrReplace(doc as { _id: string; _type: string; [key: string]: unknown });
            console.log(`   ✔  [${p.categorySlug}] ${p.name}`);
            success++;
        } catch (err) {
            console.error(`   ✘  [${p.categorySlug}] ${p.name} — ${(err as Error).message}`);
            failed++;
        }
    }

    // ── Summary ──────────────────────────────────────────────────────────────
    console.log('\n──────────────────────────────────────────────────────────────');
    console.log(`  Categories : ${CATEGORIES.length} upserted`);
    console.log(`  Products   : ${success} upserted${failed > 0 ? `, ${failed} failed` : ''}`);
    console.log('──────────────────────────────────────────────────────────────');

    if (failed > 0) {
        console.log('\n⚠  Some records failed. Review errors above and re-run to retry.');
        process.exit(1);
    } else {
        console.log('\n✅  Migration complete. All records are live in Sanity.\n');
    }
}

migrate().catch((err) => {
    console.error('\n❌  Fatal error:', err.message);
    process.exit(1);
});
