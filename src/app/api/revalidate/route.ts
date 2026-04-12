import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

/**
 * On-demand revalidation endpoint called by Sanity webhooks.
 * POST /api/revalidate?secret=<REVALIDATE_SECRET>
 *
 * Purges the entire site cache so changes in Sanity (publish, soft-delete, restore)
 * appear on the website immediately.
 */
export async function POST(req: NextRequest) {
    const secret = req.nextUrl.searchParams.get('secret');

    if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
        return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
    }

    // Revalidate all pages (layout-level clears everything)
    revalidatePath('/', 'layout');

    return NextResponse.json({ revalidated: true, timestamp: new Date().toISOString() });
}
