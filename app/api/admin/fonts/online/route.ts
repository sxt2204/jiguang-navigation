import { NextResponse } from 'next/server';

// Simple in-memory cache
let cachedFonts: any[] | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 3600 * 1000; // 1 hour

async function getFullFontList() {
    const now = Date.now();
    if (cachedFonts && (now - lastFetchTime < CACHE_DURATION)) {
        return cachedFonts;
    }

    try {
        console.log('[Fonts] Fetching full list from Fontsource API...');
        const res = await fetch('https://api.fontsource.org/v1/fonts');
        if (!res.ok) throw new Error('Failed to fetch fonts');
        const data = await res.json();

        // Filter only Google Fonts to ensure compatibility with our Google Fonts mirror (loli.net)
        cachedFonts = data.filter((f: any) => f.type === 'google');
        lastFetchTime = now;
        console.log(`[Fonts] Cached ${cachedFonts?.length} fonts.`);
        return cachedFonts || [];
    } catch (error) {
        console.error('[Fonts] Error fetching fonts:', error);
        return cachedFonts || []; // Return stale cache or empty if failed
    }
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q')?.toLowerCase() || '';

    // 1. Get full list (cached)
    let results = await getFullFontList();

    // 2. Filter by query
    if (query) {
        results = results.filter((font: any) => font.family.toLowerCase().includes(query));
    }

    // 3. Pagination
    const page = parseInt(searchParams.get('page') || '1');
    const limit = 20;
    const start = (page - 1) * limit;
    const paginated = results.slice(start, start + limit);

    // 4. Map to our structure
    // We assume fonts.loli.net (Google Fonts mirror) supports these families.
    const data = paginated.map((font: any) => ({
        family: font.family,
        category: font.category || 'sans-serif',
        url: `https://fonts.loli.net/css2?family=${font.family.replace(/ /g, '+')}&display=swap`,
        previewUrl: `https://fonts.loli.net/css2?family=${font.family.replace(/ /g, '+')}&text=${encodeURIComponent(font.family)}`
    }));

    return NextResponse.json({
        fonts: data,
        total: results.length,
        hasMore: start + limit < results.length
    });
}
