export type ProductDetailContent = {
    title: string;
    subtitle: string;
    militarySpec: string;
    overview: string;
    composition: string;
    advantages: string[];
    application: string;
    natoCode?: string;
    compatibleSystems?: string[];
    additionalSections?: Array<{
        heading: string;
        content: string;
    }>;
};

// Map of product slug → extended detail page content
// Key = product slug (same as used in URL)
export const PRODUCT_DETAIL_PAGES: Record<string, ProductDetailContent> = {
    'mil-prf-46000': {
        title: 'MIL-PRF-46000 NATO CODE:O-158',
        subtitle: 'Semi-Fluid Lubricating Grease — Automatic Weapons',
        militarySpec: 'MIL-PRF-46000',
        overview:
            'MIL-PRF-46000 is a light tan, synthetic-based, semi-fluid grease with a lithium stearate thickener. It is fortified with a blend of high-performance additives that provide antioxidation, anticorrosion, antirust, and antiwear properties, making it the preferred lubricant for automatic weapons operating in severe environments.',
        composition:
            'Synthetic base oil combined with a lithium stearate thickener. Enhanced with a proprietary additive package delivering antioxidation, anticorrosion, antirust, and antiwear performance across extreme temperature cycles.',
        advantages: [
            'Outstanding antirust and antioxidant properties',
            'Excellent antiwear protection from metal-to-metal contact',
            'Lithium stearate thickener for structural stability under high cyclic loads',
            'Synthetic base oil for consistent viscosity across extreme conditions',
            'Compatible with multi-environment military field operations',
        ],
        application:
            'MIL-PRF-46000 is intended for automatic weapons systems and accessory equipment operating in severe environments. It is recommended for the lubrication of weapons such as M16, M39, M61, and other weapon systems where high cyclic rates of fire are encountered.',
        natoCode: 'O-158',
        compatibleSystems: ['M16', 'M39', 'M61'],
        additionalSections: [
            {
                heading: 'Qualification & Testing',
                content:
                    'Products supplied under MIL-PRF-46000 are qualified against the full performance requirements of the specification, including corrosion resistance, oxidation stability, anti-wear performance, and low-temperature pumpability. COA(Certıfıcate of analysis) and Certificate of Conformance (CofC) are available upon request.',
            },
            {
                heading: 'Storage & Handling',
                content:
                    'Store in a cool, dry location away from direct sunlight and ignition sources. Keep containers tightly sealed when not in use. Shelf life is typically 5 years from manufacture date when stored under recommended conditions. Consult the Safety Data Sheet (SDS) before handling.',
            },
            {
                heading: 'Ordering Information',
                content:
                    'ALC Trading (Alarcon Trading Inc.) supplies MIL-PRF-46000 to U.S. government agencies, prime contractors, and allied defense programs. Contact us for current lead times.\n\nAvailable packing sizes:\nNSN: 9150-00-935-6597  —  2 oz Bottle\nNSN: 9150-00-889-3522  —  4 oz Bottle\nNSN: 9150-00-687-4241  —  QT\nNSN: 9150-00-753-4686  —  GL',
            },
        ],
    },
    'mil-prf-46170': {
        title: 'MIL-PRF-46170 TYPE I  NATO Code: H-544',
        subtitle: 'Hydraulic Fluid, Rust Inhibited, Fire Resistant, Synthetic Hydrocarbon Base',
        militarySpec: 'MIL-PRF-46170',
        overview:
            'MIL-PRF-46170 is a synthetic hydraulic fluid developed to meet the severe duty demands of today\'s military and industrial equipment. Rust inhibitors are utilized to provide protection to ferrous components and modern additive technology is employed for oxidative stability, corrosion inhibition, and antiwear protection. MIL-PRF-46170 is designated as a P-15 protectant according to the MIL-P-116G standard.\n\nNote: Not to be used for aviation applications.',
        composition:
            'Synthetic hydrocarbon base fluid fortified with rust inhibitors for ferrous component protection and a modern additive package delivering oxidative stability, corrosion inhibition, and antiwear performance under severe duty conditions.',
        advantages: [
            'Rust inhibitors provide reliable protection to ferrous components',
            'Modern additive technology for outstanding oxidative stability',
            'Effective corrosion inhibition across severe environmental conditions',
            'Antiwear protection for extended equipment service life',
            'High flash point for an extra margin of safety and fire protection',
            'Designated P-15 protectant per MIL-P-116G standard',
            'Suitable for extended intervals between operation',
        ],
        application:
            'MIL-PRF-46170 is intended for use in severe duty applications requiring extremes in environment and/or extended intervals between operation such as armoured vehicle and artillery recoil mechanisms and hydraulic systems, snow removal, earth moving and heavy duty construction equipment, as well as industrial robotic hydraulic systems. MIL-PRF-46170 is especially recommended in applications where rust protection together with a high flash point can afford an extra margin of safety and fire protection.',
        natoCode: 'H-544',
        compatibleSystems: ['Armoured Vehicles', 'Artillery Recoil', 'Snow Removal', 'Earth Moving', 'Construction Equipment', 'Industrial Robotics'],
        additionalSections: [
            {
                heading: 'Qualification & Testing',
                content:
                    'Products supplied under MIL-PRF-46170 are qualified against the full performance requirements of the specification, including rust inhibition, oxidation stability, corrosion inhibition, and antiwear performance. COA (Certificate of Analysis) and Certificate of Conformance (CofC) are available upon request.',
            },
            {
                heading: 'Storage & Handling',
                content:
                    'Store in a cool, dry location away from direct sunlight and ignition sources. Keep containers tightly sealed when not in use. Shelf life is typically 5 years from manufacture date when stored under recommended conditions. Consult the Safety Data Sheet (SDS) before handling.',
            },
            {
                heading: 'Packaging & Labeling Options',
                content:
                    'ALC Trading (Alarcon Trading Inc.) supplies MIL-PRF-46170 to U.S. government agencies, prime contractors, and allied defense programs. Contact us for current lead times.\n\nCustomized language labeling available. Custom/customized sizes and options are available.\n\nAvailable packing sizes:\nNSN: 9150-01-332-7819    Type I  - 1 pt can\nNSN: 9150-00-111-6256    Type I  - 1 qt can\nNSN: 9150-00-111-6254    Type I  - 1 gal can\nNSN: 9150-00-111-6255    Type I  - 5 gal can\nNSN: 9150-01-158-0462    Type I  - 55 gal drum',
            },
        ],
    },
};

// Used by sitemap.ts to register detail page URLs
export const PRODUCT_DETAIL_SLUGS: Array<{ categorySlug: string; slug: string }> = [
    { categorySlug: 'chemicals', slug: 'mil-prf-46000' },
    { categorySlug: 'chemicals', slug: 'mil-prf-46170' },
];

export function hasDetailPage(slug: string): boolean {
    return slug in PRODUCT_DETAIL_PAGES;
}
