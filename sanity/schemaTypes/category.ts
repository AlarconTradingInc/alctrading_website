import { defineField, defineType } from 'sanity';

/**
 * CATEGORY DOCUMENT
 *
 * Represents a top-level product category (e.g. Metals, Chemicals, Parachutes).
 * Soft-delete is enforced via the `isDeleted` flag — never perform hard deletes.
 *
 * Current categories:
 *   - metals          → Metals
 *   - chemicals       → Chemicals
 *   - parachutes      → Parachutes
 *   - dual-mirror-ii  → DualMirror II Fabrics
 *   - sale-items      → Sale Items
 */
export const category = defineType({
    name: 'category',
    title: 'Category',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            description: 'Display name of the category (e.g. "Metals").',
            validation: (Rule) =>
                Rule.required()
                    .min(2)
                    .max(100)
                    .error('Title is required and must be between 2–100 characters.'),
        }),

        defineField({
            name: 'slug',
            title: 'URL Slug',
            type: 'slug',
            description: 'Auto-generated URL-safe identifier. Used in /products/[category] routing.',
            options: {
                source: 'title',
                maxLength: 96,
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
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 3,
            description: 'Short summary shown on the category listing page.',
            validation: (Rule) => Rule.max(300),
        }),

        defineField({
            name: 'displayOrder',
            title: 'Display Order',
            type: 'number',
            description: 'Controls the order categories appear in navigation (lower = first).',
            initialValue: 99,
        }),

        defineField({
            name: 'isDeleted',
            title: 'Soft Deleted',
            type: 'boolean',
            description:
                '⚠️ Soft delete flag. Set to true to hide this category without permanently removing it.',
            initialValue: false,
            readOnly: false,
        }),
    ],

    preview: {
        select: {
            title: 'title',
            subtitle: 'slug.current',
            isDeleted: 'isDeleted',
        },
        prepare({ title, subtitle, isDeleted }) {
            return {
                title: isDeleted ? `🗑 [DELETED] ${title}` : title,
                subtitle: `/products/${subtitle}`,
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
            title: 'Title A–Z',
            name: 'titleAsc',
            by: [{ field: 'title', direction: 'asc' }],
        },
    ],
});
