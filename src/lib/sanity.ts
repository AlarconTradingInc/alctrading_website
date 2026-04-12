import { createClient, SanityClient } from '@sanity/client';
import { cache } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// CLIENT — lazy singleton, only created when credentials are present & valid
// ─────────────────────────────────────────────────────────────────────────────

const VALID_PROJECT_ID = /^[a-z0-9-]+$/;

function isSanityConfigured(): boolean {
    const id = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '';
    return VALID_PROJECT_ID.test(id);
}

let _client: SanityClient | null = null;

function getClient(): SanityClient | null {
    if (!isSanityConfigured()) return null;
    if (!_client) {
        _client = createClient({
            projectId:  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
            dataset:    process.env.NEXT_PUBLIC_SANITY_DATASET!,
            apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2024-01-01',
            useCdn:     process.env.NODE_ENV === 'production',
            token:      process.env.SANITY_API_READ_TOKEN,
            perspective: 'published',
        });
    }
    return _client;
}

// ─────────────────────────────────────────────────────────────────────────────
// TYPES  (mirrors ProductDetailed from src/lib/data.ts)
// ─────────────────────────────────────────────────────────────────────────────

export type SanityCategory = {
    _id: string;
    title: string;
    slug: string;
    description: string;
    displayOrder: number;
};

export type SanityProduct = {
    _id: string;
    name: string;
    slug: string;
    categoryTitle: string;
    categorySlug: string;
    subCategory?: string;
    description: string;
    brand: string;
    manufacturer?: string;
    partNumber?: string;
    nsn?: string;
    materialSpec?: string;
    sizeWeight?: string;
    qty?: number;
    searchKeywords?: string[];
    longDescription?: unknown[]; // Portable Text blocks
    specs?: Array<{ label: string; value: string }>;
    displayOrder: number;
};

// ─────────────────────────────────────────────────────────────────────────────
// GROQ QUERIES
// ─────────────────────────────────────────────────────────────────────────────

/** All active (non-deleted) categories, ordered by displayOrder. */
const ALL_CATEGORIES_QUERY = `
    *[_type == "category" && isDeleted != true] | order(displayOrder asc) {
        _id,
        title,
        "slug": slug.current,
        description,
        displayOrder
    }
`;

/** All active products in a category, ordered by displayOrder then name. */
const PRODUCTS_BY_CATEGORY_QUERY = `
    *[_type == "product" && isDeleted != true && category->slug.current == $categorySlug]
    | order(displayOrder asc, name asc) {
        _id,
        name,
        "slug": slug.current,
        "categoryTitle": category->title,
        "categorySlug": category->slug.current,
        subCategory,
        description,
        brand,
        manufacturer,
        partNumber,
        nsn,
        materialSpec,
        sizeWeight,
        qty,
        searchKeywords,
        longDescription,
        specs,
        displayOrder
    }
`;

/** Single product by category slug + product slug. */
const PRODUCT_BY_SLUG_QUERY = `
    *[_type == "product" && isDeleted != true
      && category->slug.current == $categorySlug
      && slug.current == $slug
    ][0] {
        _id,
        name,
        "slug": slug.current,
        "categoryTitle": category->title,
        "categorySlug": category->slug.current,
        subCategory,
        description,
        brand,
        manufacturer,
        partNumber,
        nsn,
        materialSpec,
        sizeWeight,
        qty,
        searchKeywords,
        longDescription,
        specs,
        displayOrder
    }
`;

/** All active products (used for generateStaticParams). */
const ALL_PRODUCTS_SLUGS_QUERY = `
    *[_type == "product" && isDeleted != true] {
        "slug": slug.current,
        "categorySlug": category->slug.current
    }
`;

// ─────────────────────────────────────────────────────────────────────────────
// FETCHERS  (React cache() for per-request deduplication in Next.js)
// ─────────────────────────────────────────────────────────────────────────────

export const getAllCategories = cache(async (): Promise<SanityCategory[]> => {
    const client = getClient();
    if (!client) return [];
    return client.fetch<SanityCategory[]>(ALL_CATEGORIES_QUERY, {}, { next: { revalidate: 60 } });
});

export const getProductsByCategory = cache(
    async (categorySlug: string): Promise<SanityProduct[]> => {
        const client = getClient();
        if (!client) return [];
        return client.fetch<SanityProduct[]>(
            PRODUCTS_BY_CATEGORY_QUERY,
            { categorySlug },
            { next: { revalidate: 60 } },
        );
    },
);

export const getProductBySlugFromSanity = cache(
    async (categorySlug: string, slug: string): Promise<SanityProduct | null> => {
        const client = getClient();
        if (!client) return null;
        return client.fetch<SanityProduct | null>(
            PRODUCT_BY_SLUG_QUERY,
            { categorySlug, slug },
            { next: { revalidate: 60 } },
        );
    },
);

export const getAllProductSlugs = cache(
    async (): Promise<Array<{ slug: string; categorySlug: string }>> => {
        const client = getClient();
        if (!client) return [];
        return client.fetch(ALL_PRODUCTS_SLUGS_QUERY, {}, { next: { revalidate: 60 } });
    },
);
