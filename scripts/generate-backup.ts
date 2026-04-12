/**
 * Generates scripts/backup/products-backup.json from the static TypeScript data.
 * Run with: npm run generate-backup
 * Keep this file up to date as a fallback when Sanity is unreachable.
 */

import { writeFileSync, mkdirSync } from 'fs';
import { resolve } from 'path';
import { ALL_PRODUCTS } from '../src/lib/data';
import { productData } from '../src/data/products';

const backup = {
    generatedAt: new Date().toISOString(),
    categories: productData.map((cat) => ({
        slug:        cat.slug,
        title:       cat.name,
        description: cat.description,
        subCategories: cat.subCategories.map((sub) => sub.name),
    })),
    products: ALL_PRODUCTS.map((p) => ({
        id:            p.id,
        name:          p.name,
        categoryTitle: p.categoryTitle,
        categorySlug:  p.categorySlug,
        subCategory:   p.subCategory ?? null,
        description:   p.description,
        brand:         p.brand,
        manufacturer:  p.manufacturer  ?? null,
        partNumber:    p.partNumber    ?? null,
        nsn:           p.nsn           ?? null,
        materialSpec:  p.materialSpec  ?? null,
        sizeWeight:    p.sizeWeight    ?? null,
        qty:           p.qty           ?? null,
        searchKeywords:  p.searchKeywords  ?? null,
        longDescription: p.longDescription ?? null,
    })),
};

const outDir  = resolve(process.cwd(), 'scripts/backup');
const outFile = resolve(outDir, 'products-backup.json');

mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, JSON.stringify(backup, null, 2), 'utf-8');

console.log(`✅  Backup written → ${outFile}`);
console.log(`   Categories : ${backup.categories.length}`);
console.log(`   Products   : ${backup.products.length}`);
