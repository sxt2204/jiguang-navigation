import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { downloadAndSaveIcon } from '@/lib/icon-downloader';


const getFaviconUrl = (domain: string) => `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
    try {
        const sites = await prisma.site.findMany();
        let successCount = 0;
        let failCount = 0;

        // Process in batches of 5
        const BATCH_SIZE = 5;
        // Helper to check if file exists (needs fs import)
        const fs = require('fs');
        const path = require('path');
        const publicDir = path.join(process.cwd(), 'public');

        for (let i = 0; i < sites.length; i += BATCH_SIZE) {
            const batch = sites.slice(i, i + BATCH_SIZE);
            await Promise.all(batch.map(async (site) => {
                let downloadUrl = '';
                let shouldDownload = false;

                const isAuto = site.iconType === 'auto' || !site.iconType;
                const isUpload = site.iconType === 'upload';

                if (site.url) {
                    try {
                        const domain = new URL(site.url).hostname;
                        const potentialDlUrl = getFaviconUrl(domain);

                        if (isAuto) {
                            downloadUrl = potentialDlUrl;
                            shouldDownload = true;
                        } else if (isUpload) {
                            // Smart Repair Logic
                            const customUrl = site.customIconUrl || '';

                            // 1. If it's still a remote Google URL, we should cache it.
                            if (customUrl.includes('google.com/s2/favicons')) {
                                downloadUrl = customUrl; // or potentialDlUrl, roughly same
                                shouldDownload = true;
                            }
                            // 2. If it's a local file path, check if it exists
                            else if (customUrl.startsWith('/uploads/')) {
                                // Remove query params for check
                                const cleanPath = customUrl.split('?')[0];
                                const fullPath = path.join(publicDir, cleanPath);
                                if (!fs.existsSync(fullPath)) {
                                    // File missing, download it again
                                    downloadUrl = potentialDlUrl;
                                    shouldDownload = true;
                                }
                            }
                        }
                    } catch (e) { }
                }

                if (shouldDownload && downloadUrl) {
                    const result = await downloadAndSaveIcon(site.id, downloadUrl);
                    if (result) {
                        successCount++;
                    } else {
                        failCount++;
                    }
                }
            }));
        }

        return NextResponse.json({
            success: true,
            processed: successCount,
            failed: failCount,
            total: sites.length
        });
    } catch (error) {
        console.error('Sync error:', error);
        return NextResponse.json({ error: 'Failed to sync icons' }, { status: 500 });
    }
}
