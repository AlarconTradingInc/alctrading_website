PROJECT MISSION: Perfect SEO & Technical Excellence for Alarcon Trading
1. Context & Objective
The goal is to achieve "Perfect SEO" for alctrading.com. Currently, Google Search Console (GSC) shows significant indexing issues:

Total Pages: 18

Indexed: 2

Not Indexed: 16

We need to ensure that when searching site:alctrading.com, Google displays every single product and page with high-quality metadata and structured data.

2. Current Error Analysis (GSC Data)
Analyze the codebase to resolve these specific errors identified in Search Console:

Not Found (404) - 8 pages: Identify broken internal links. Implement 301 redirects for any legacy URLs to their modern equivalents or the homepage. Ensure a robust not-found.tsx exists.

Page with Redirect - 3 pages: Eliminate redirect chains. Ensure all internal links point directly to the final canonical URL (HTTPS, non-WWW/WWW consistency).

Discovered - Currently Not Indexed - 5 pages: These pages are found but ignored by Google. Improve their content quality, internal linking, and ensure they are not blocked by robots.txt.

3. Technical SEO Requirements
A. Dynamic Metadata API (Next.js)
Implement generateMetadata for all dynamic product routes.

Format: [Product Name] | Alarcon Trading - Aerospace & Military Supplies

Description: Craft unique, keyword-rich meta descriptions for every product.

OpenGraph: Include product images and titles for social media indexing. (İf there is an image)

B. Structured Data (JSON-LD)
Inject Product Schema (JSON-LD) into all product pages.

Must include: name, description, image(İf there is an image), brand, and availability.

This is critical for appearing in Google's "Rich Results" (Product snippets).

C. URL Architecture & Canonicalization
SEO Slugs: Ensure URLs are human-readable (e.g., /products/aviation-spare-parts instead of /products/123).

Canonical Tags: Add a self-referencing <link rel="canonical" href="..." /> to every page to prevent duplicate content issues.

D. Automated Indexing Assets
Setup next-sitemap or a custom script to generate a dynamic sitemap.xml and robots.txt on every build.

Ensure the sitemap includes all product URLs.

4. Performance & Core Web Vitals
Image Optimization: Enforce the use of next/image with proper alt text (using the product name).

Font Optimization: Use next/font to eliminate layout shifts.

CLS (Cumulative Layout Shift): Identify and fix any elements causing layout jumps during load.

5. Execution Instructions for the AI
Scan: Audit the entire repository for the issues mentioned above.

Fix: Apply the code changes sequentially (Start with Redirects/404s, then Metadata, then Schema).

Verify: Double-check that sitemap.xml will correctly reflect the product database.

Report: Provide a summary of every fix made and instructions on how to "Validate Fix" in Google Search Console.