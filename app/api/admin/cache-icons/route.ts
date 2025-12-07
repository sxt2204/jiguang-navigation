import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { downloadAndSaveIcon } from '@/lib/icon-downloader';
import fs from 'fs';
import path from 'path';

const getFaviconUrl = (domain: string) => `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;

export async function POST(request: Request) {
    try {
        const sites = await prisma.site.findMany();
        let count = 0;

        for (const site of sites) {
            let downloadUrl = '';
            let shouldDownload = false;

            // Check if local file exists
            let localFileExists = false;
            let checkPath = '';
            if (site.iconType === 'upload' && site.customIconUrl && site.customIconUrl.startsWith('/uploads/')) {
                // Remove query parameters for file system check
                const urlWithoutQuery = site.customIconUrl.split('?')[0];
                const localPath = path.join(process.cwd(), 'public', urlWithoutQuery);
                checkPath = localPath;
                localFileExists = fs.existsSync(localPath);

                // Debug log for troubleshooting (will remove later)
                if (!localFileExists) {
                    console.log(`[Icon Sync Debug] File not found: ${localPath} (URL: ${site.customIconUrl})`);
                }
            }

            // Case 1: Icon Type is Auto (or null), OR it's 'upload' but the file is missing
            if ((site.iconType === 'auto' || !site.iconType) || (site.iconType === 'upload' && !localFileExists)) {
                if (site.url) {
                    try {
                        const domain = new URL(site.url).hostname;
                        downloadUrl = getFaviconUrl(domain);
                        shouldDownload = true;
                    } catch (e) { }
                }
            }
            // Case 2: Icon Type is Upload, but URL is remote (http...) - This might be a legacy case or user manually entered a URL
            else if (site.iconType === 'upload' && site.customIconUrl && site.customIconUrl.startsWith('http')) {
                downloadUrl = site.customIconUrl;
                shouldDownload = true;
            }

            if (shouldDownload && downloadUrl) {
                // We await here to avoid overwhelming the server/network with hundreds of requests at once
                await downloadAndSaveIcon(site.id, downloadUrl);
                count++;
            }
        }

        return NextResponse.json({ success: true, processed: count });
    } catch (error) {
        console.error('Sync error:', error);
        return NextResponse.json({ error: 'Failed to sync icons' }, { status: 500 });
    }
}
