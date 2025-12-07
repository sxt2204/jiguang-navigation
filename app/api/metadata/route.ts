import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');

    if (!url) {
        return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    try {
        // Ensure URL has protocol
        const targetUrl = url.startsWith('http') ? url : `https://${url}`;

        const response = await fetch(targetUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            },
            signal: AbortSignal.timeout(5000) // 5s timeout
        });

        if (!response.ok) {
            return NextResponse.json({ error: 'Failed to fetch site' }, { status: response.status });
        }

        const html = await response.text();

        // Simple regex to extract title
        const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
        const title = titleMatch ? titleMatch[1].trim() : '';

        // Parse all meta tags to find description
        const metaTags = html.match(/<meta\s+[^>]*>/gi) || [];
        let description = '';

        for (const tag of metaTags) {
            // Extract attributes
            const nameMatch = tag.match(/\bname=["']?([^"'\s>]+)["']?/i);
            const propertyMatch = tag.match(/\bproperty=["']?([^"'\s>]+)["']?/i);
            const contentMatch = tag.match(/\bcontent=["']([^"']*)["']/i);

            const name = nameMatch ? nameMatch[1].toLowerCase() : '';
            const property = propertyMatch ? propertyMatch[1].toLowerCase() : '';
            const content = contentMatch ? contentMatch[1].trim() : '';

            if (name === 'description' && content) {
                description = content;
                break; // Found the best match, stop
            }

            // Fallback to og:description if we haven't found a standard description yet
            if (property === 'og:description' && content && !description) {
                description = content;
            }
        }

        return NextResponse.json({ title, description });
    } catch (error) {
        console.error('Metadata fetch error:', error);
        return NextResponse.json({ error: 'Failed to fetch metadata' }, { status: 500 });
    }
}
