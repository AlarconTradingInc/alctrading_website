export type ProductDetailContent = {
    title: string;
    subtitle: string;
    militarySpec: string;
    overview: string;
    composition: string;
    advantages: string[];
    application: string;
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
};

export function hasDetailPage(slug: string): boolean {
    return slug in PRODUCT_DETAIL_PAGES;
}
