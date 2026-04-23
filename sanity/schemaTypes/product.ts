import { defineField, defineType } from 'sanity';

/**
 * PRODUCT DOCUMENT
 *
 * Unified product schema covering all five category types:
 *   - Standard spec items     (Metals, Chemicals, Parachutes)
 *   - Material fabric items   (DualMirror II)
 *   - Surplus/sale inventory  (Sale Items)
 *
 * Soft-delete is enforced via the `isDeleted` flag — never perform hard deletes.
 */
export const product = defineType({
    name: 'product',
    title: 'Product',
    type: 'document',
    groups: [
        { name: 'identity',   title: 'Identity',             default: true },
        { name: 'specs',      title: 'Specifications'                       },
        { name: 'inventory',  title: 'Inventory & Logistics'                },
        { name: 'seo',        title: 'SEO & Search'                         },
        { name: 'system',     title: 'System'                               },
    ],
    fields: [
        // ─── IDENTITY ───────────────────────────────────────────────────────

        defineField({
            name: 'name',
            title: 'Product Name / Part Number',
            type: 'string',
            group: 'identity',
            description: 'Official product name or part number (e.g. "AMS 5536", "BM80A-300L-050F60").',
            validation: (Rule) =>
                Rule.required()
                    .min(2)
                    .max(200)
                    .error('Product name is required (2–200 characters).'),
        }),

        defineField({
            name: 'slug',
            title: 'URL Slug',
            type: 'slug',
            group: 'identity',
            description: 'Auto-generated URL-safe identifier. Used in /products/[category]/[slug] routing.',
            options: {
                source: 'name',
                maxLength: 200,
                slugify: (input: string) =>
                    input
                        .toLowerCase()
                        .replace(/\s+/g, '-')
                        .replace(/[^\w-]+/g, '')
                        .replace(/--+/g, '-')
                        .replace(/^-+|-+$/g, ''),
            },
            validation: (Rule) => Rule.required().error('Slug is required.'),
        }),

        defineField({
            name: 'category',
            title: 'Category',
            type: 'reference',
            to: [{ type: 'category' }],
            group: 'identity',
            description: 'Parent category. Must reference an existing, non-deleted category document.',
            validation: (Rule) => Rule.required().error('Every product must be linked to a category.'),
        }),

        defineField({
            name: 'subCategory',
            title: 'Sub-Category',
            type: 'string',
            group: 'identity',
            description:
                'Sub-category label within the parent category (e.g. "High Temp Alloys", "Molten Metal PPE").',
            validation: (Rule) => Rule.max(100),
        }),

        defineField({
            name: 'brand',
            title: 'Brand',
            type: 'string',
            group: 'identity',
            description: 'Brand name (e.g. "ALC Trading", "DualMirror II").',
            initialValue: 'ALC Trading',
        }),

        defineField({
            name: 'description',
            title: 'Short Description',
            type: 'text',
            rows: 4,
            group: 'identity',
            description: 'Concise product description. Shown in the hero section and used as the meta description base.',
            validation: (Rule) => Rule.max(1000),
        }),

        // ─── SPECIFICATIONS ──────────────────────────────────────────────────

        defineField({
            name: 'materialSpec',
            title: 'Material Specification',
            type: 'string',
            group: 'specs',
            description: 'Primary material composition (e.g. "Preox/Korspun Aramid"). Used by DualMirror II products.',
        }),

        defineField({
            name: 'sizeWeight',
            title: 'Size / Weight',
            type: 'string',
            group: 'specs',
            description: 'Size and weight descriptor (e.g. "19 osy / 650 gsm"). Used by DualMirror II products.',
        }),

        defineField({
            name: 'specs',
            title: 'Technical Specification Table',
            type: 'array',
            group: 'specs',
            description: 'Key-value pairs for the product specification table. Rendered row-by-row on the product page.',
            of: [
                {
                    type: 'object',
                    name: 'specRow',
                    title: 'Spec Row',
                    fields: [
                        defineField({
                            name: 'label',
                            title: 'Label',
                            type: 'string',
                            validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                            name: 'value',
                            title: 'Value',
                            type: 'string',
                            validation: (Rule) => Rule.required(),
                        }),
                    ],
                    preview: {
                        select: { title: 'label', subtitle: 'value' },
                    },
                },
            ],
        }),

        // ─── INVENTORY & LOGISTICS ───────────────────────────────────────────

        defineField({
            name: 'partNumber',
            title: 'Part Number',
            type: 'string',
            group: 'inventory',
            description: 'OEM or manufacturer part number (e.g. "BM80A-300L-050F60").',
        }),

        defineField({
            name: 'nsn',
            title: 'National Stock Number (NSN)',
            type: 'string',
            group: 'inventory',
            description: 'NATO/US military NSN in XX-XXX-XXXX format (e.g. "5998-01-604-6189").',
            validation: (Rule) =>
                Rule.regex(/^\d{4}-\d{2}-\d{3}-\d{4}$/, {
                    name: 'NSN format',
                    invert: false,
                })
                    .warning('NSN should follow the format XXXX-XX-XXX-XXXX.'),
        }),

        defineField({
            name: 'manufacturer',
            title: 'Manufacturer',
            type: 'string',
            group: 'inventory',
            description: 'Manufacturer name (e.g. "ASTEC", "HONEYWELL").',
        }),

        defineField({
            name: 'qty',
            title: 'In-Stock Quantity',
            type: 'number',
            group: 'inventory',
            description: 'Current stock quantity in units (EA). Shown on the product page.',
            validation: (Rule) => Rule.min(0).integer(),
        }),

        // ─── SEO & SEARCH ────────────────────────────────────────────────────

        defineField({
            name: 'longDescription',
            title: 'Long Description (SEO Rich Text)',
            type: 'array',
            group: 'seo',
            description:
                'Portable Text content for the extended product article. Renders an SEO-rich section below the spec table. Also triggers FAQ schema.',
            of: [
                {
                    type: 'block',
                    styles: [
                        { title: 'Normal', value: 'normal' },
                        { title: 'H2', value: 'h2' },
                        { title: 'H3', value: 'h3' },
                    ],
                    marks: {
                        decorators: [
                            { title: 'Strong', value: 'strong' },
                            { title: 'Emphasis', value: 'em' },
                            { title: 'Code', value: 'code' },
                        ],
                    },
                },
            ],
        }),

        defineField({
            name: 'searchKeywords',
            title: 'Search Keywords',
            type: 'array',
            group: 'seo',
            description:
                'Alternative search terms for this product — dashless part numbers, NSN variants, trade names, etc. Each entry is a separate keyword.',
            of: [{ type: 'string' }],
            options: { layout: 'tags' },
        }),

        // ─── SYSTEM ──────────────────────────────────────────────────────────

        defineField({
            name: 'displayOrder',
            title: 'Display Order',
            type: 'number',
            group: 'system',
            description: 'Controls sort order within the category listing (lower = first).',
            initialValue: 99,
        }),

        defineField({
            name: 'isDeleted',
            title: 'Soft Deleted',
            type: 'boolean',
            group: 'system',
            description:
                '⚠️ Soft delete flag. Set to true to hide this product. This is the ONLY permitted deletion method — no hard deletes.',
            initialValue: false,
        }),
    ],

    preview: {
        select: {
            title: 'name',
            categoryTitle: 'category.title',
            subCategory: 'subCategory',
            isDeleted: 'isDeleted',
        },
        prepare({ title, categoryTitle, subCategory, isDeleted }) {
            const label = [categoryTitle, subCategory].filter(Boolean).join(' › ');
            return {
                title: isDeleted ? `🗑 [DELETED] ${title}` : title,
                subtitle: label || 'No category assigned',
            };
        },
    },

    orderings: [
        {
            title: 'Display Order',
            name: 'displayOrderAsc',
            by: [{ field: 'displayOrder', direction: 'asc' }],
        },
        {
            title: 'Name A–Z',
            name: 'nameAsc',
            by: [{ field: 'name', direction: 'asc' }],
        },
        {
            title: 'Category',
            name: 'categoryAsc',
            by: [
                { field: 'category.title', direction: 'asc' },
                { field: 'name', direction: 'asc' },
            ],
        },
    ],
});
