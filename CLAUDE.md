# ALC Trading Website — Claude Code Context

## Stack
Next.js 16 (App Router, Turbopack) · TailwindCSS 4 · TypeScript · Sanity CMS

## Sanity
- Project ID: `ym5e7i3k` · Dataset: `production`
- Studio: `http://localhost:3000/studio`
- Migration token must have **Editor** (write) permission

## Mandatory Rules

### Soft-delete (MANDATORY)
Only `isDeleted: true` is permitted — no hard deletes, ever. All GROQ queries must filter `&& isDeleted != true`.

### Confirmation rule
Every Sanity Create / Update / Delete requires explicit user confirmation before execution.

## Route groups
- `src/app/(site)/` — all public pages (Navbar + Footer applied)
- `src/app/studio/` — Sanity Studio, NO Navbar/Footer (intentional, never change)
- `src/app/layout.tsx` — HTML shell only, no UI chrome

## Static category pages (DO NOT DELETE)
`metals`, `chemicals`, `parachutes`, `dual-mirror-ii`, `sale-items` each have their own page under `(site)/products/`. These are preserved as fallbacks. The dynamic `[category]/page.tsx` only handles slugs NOT in this list.

## npm scripts
| Command | Purpose |
|---|---|
| `npm run dev` | Start dev server |
| `npm run migrate` | Seed static data → Sanity (idempotent) |
| `npm run generate-backup` | Write `scripts/backup/products-backup.json` |

---

## File Map — Where Everything Lives

### Adding / Editing Products
| Task | File |
|---|---|
| Product types (`ProductBase`, `ProductDetailed`) | `src/lib/data.ts` lines 1–21 |
| Static product arrays (`SALE_ITEMS`, `METALS`, etc.) | `src/lib/data.ts` |
| Sanity seed data (`RAW_PRODUCTS`) | `scripts/migrate-to-sanity.ts` |
| Sanity product schema | `sanity/schemaTypes/product.ts` |
| Sanity category schema | `sanity/schemaTypes/category.ts` |

> **Pattern to add a new sale item:**
> 1. Append entry to `SALE_ITEMS` in `src/lib/data.ts`
> 2. Append matching entry to `RAW_PRODUCTS` in `scripts/migrate-to-sanity.ts`
> 3. Run `npm run migrate`

### SEO & Metadata
| Task | File |
|---|---|
| Product page SEO — title, keywords, description, structured data | `src/app/(site)/products/[category]/[slug]/page.tsx` → `generateMetadata()` |
| Global site metadata | `src/app/layout.tsx` |
| Sitemap + priority weights | `src/app/sitemap.ts` |
| Robots.txt rules | `src/app/robots.ts` |
| Canonical redirects (www→non-www, trailing slashes) | `src/middleware.ts` |

> **SEO enrichment flags on a product:**
> - `searchKeywords: string[]` — sitemap priority 0.9, metadata keywords, JSON-LD keywords, sr-only block
> - `longDescription: string` — renders FAQ schema + "About" section on product page
> - `nsn: string` — sitemap priority 0.8, dashless variant auto-added to all keyword fields

### Product Pages (frontend)
| Task | File |
|---|---|
| Product list by category | `src/app/(site)/products/[category]/page.tsx` |
| Product detail page (renders specs, SEO, structured data) | `src/app/(site)/products/[category]/[slug]/page.tsx` |
| Static fallback — Metals | `src/app/(site)/products/metals/page.tsx` |
| Static fallback — Chemicals | `src/app/(site)/products/chemicals/page.tsx` |
| Static fallback — Parachutes | `src/app/(site)/products/parachutes/page.tsx` |
| Static fallback — DualMirror II | `src/app/(site)/products/dual-mirror-ii/page.tsx` |
| Static fallback — Sale Items | `src/app/(site)/products/sale-items/page.tsx` |

### Data Fetching
| Task | File |
|---|---|
| Sanity client singleton + GROQ queries | `src/lib/sanity.ts` |
| `getAllCategories()` | `src/lib/sanity.ts` |
| `getProductsByCategory(slug)` | `src/lib/sanity.ts` |
| `getProductBySlugFromSanity(category, slug)` | `src/lib/sanity.ts` |
| Static fallback data + `getProductBySlug()` | `src/lib/data.ts` |
| Sanity → ProductDetailed converter | `src/lib/data.ts` → `sanityProductToDetailed()` |

> **Data resolution order:** Sanity first → static `data.ts` fallback (if Sanity is down or unconfigured).

### UI Components
| Task | File |
|---|---|
| Top navigation bar | `src/components/Navbar.tsx`, `NavbarWrapper.tsx` |
| Home page (hero, about, products grid) | `src/app/(site)/page.tsx` |
| Contact form (Resend email) | `src/components/ContactForm.tsx` |
| Email server action | `src/app/(site)/actions/sendEmail.ts` |

### Sanity Studio
| Task | File |
|---|---|
| Studio sidebar structure, document ordering | `sanity/sanity.config.ts` |
| Soft-delete + restore document actions | `sanity/documentActions/softDelete.ts` |
| Studio Next.js mount point | `src/app/studio/[[...tool]]/page.tsx` |
| Schema registry | `sanity/schemaTypes/index.ts` |

### Infrastructure & Config
| Task | File |
|---|---|
| On-demand cache revalidation webhook | `src/app/api/revalidate/route.ts` |
| Next.js config (Turbopack, redirects) | `next.config.ts` |
| Environment variables | `.env.local` (not checked in — needs `NEXT_PUBLIC_SANITY_PROJECT_ID`, `SANITY_API_READ_TOKEN`) |
| Backup generator | `scripts/generate-backup.ts` → `scripts/backup/products-backup.json` |
| TailwindCSS 4 config | `postcss.config.mjs` |
| TypeScript config (path alias `@/*` → `./src/*`) | `tsconfig.json` |
