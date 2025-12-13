import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { downloadAndSaveIcon } from '@/lib/icon-downloader';

const getFaviconUrl = (domain: string) => `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;

export async function POST(request: Request) {
    try {
        const { siteId } = await request.json();

        if (!siteId) {
            return NextResponse.json({ error: 'Site ID is required' }, { status: 400 });
        }

        const site = await prisma.site.findUnique({
            where: { id: siteId },
        });

        if (!site || !site.url) {
            return NextResponse.json({ error: 'Site not found or has no URL' }, { status: 404 });
        }

        let downloadUrl = '';
        try {
            const domain = new URL(site.url).hostname;
            downloadUrl = getFaviconUrl(domain);
        } catch (e) {
            return NextResponse.json({ error: 'Invalid Site URL' }, { status: 400 });
        }

        // Trigger download
        const result = await downloadAndSaveIcon(site.id, downloadUrl);

        if (!result) {
            console.error(`[Sync API] Failed to download icon for site ${site.id} from ${downloadUrl}`);
            return NextResponse.json({ error: 'Failed to download icon' }, { status: 500 });
        }

        return NextResponse.json({ success: true, url: result });
    } catch (error) {
        console.error('Sync icon error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export const dynamic = 'force-dynamic';
