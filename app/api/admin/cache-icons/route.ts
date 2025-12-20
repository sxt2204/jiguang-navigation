import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { downloadAndSaveIcon } from '@/lib/icon-downloader';
import fs from 'fs';
import path from 'path';


const getFaviconUrl = (domain: string) => `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
    try {
        const body = await request.json().catch(() => ({}));
        const { siteIds, analyze } = body; // Add analyze flag

        const isAnalyzeMode = analyze === true;
        console.log(`[SyncAPI] Mode: ${isAnalyzeMode ? 'ANALYZE' : 'SYNC'}. Sites: ${siteIds?.length || 'ALL'}`);

        let sites;
        if (siteIds && Array.isArray(siteIds) && siteIds.length > 0) {
            sites = await prisma.site.findMany({
                where: { id: { in: siteIds } }
            });
        } else {
            sites = await prisma.site.findMany();
        }

        let successCount = 0;
        let failCount = 0;
        let skippedCount = 0;
        let toSyncCount = 0; // For analyze mode

        // Helper to check if file exists
        const publicDir = path.join(process.cwd(), 'public');

        // Process all sites (Batching mainly needed for downloads, but fine to keep for consistent logic)
        // If analyze mode, we can process faster, but keeping loop is simple.
        const BATCH_SIZE = analyze ? 50 : 5;

        for (let i = 0; i < sites.length; i += BATCH_SIZE) {
            const batch = sites.slice(i, i + BATCH_SIZE);
            await Promise.all(batch.map(async (site) => {
                let downloadUrl = '';
                let shouldDownload = false;

                const isAuto = site.iconType === 'auto' || !site.iconType;
                const isUpload = site.iconType === 'upload';
                const currentIcon = site.icon || ''; // Use site.icon, NOT customIconUrl

                if (site.url) {
                    try {
                        const domain = new URL(site.url).hostname;
                        const potentialDlUrl = getFaviconUrl(domain);

                        if (isAuto) {
                            // Logic: If isAuto, generally we sync. 
                            // Optimization: If local file already exists and looks valid?
                            // Current behavior: Auto always re-syncs to ensure freshness.
                            downloadUrl = potentialDlUrl;
                            shouldDownload = true;
                        } else if (isUpload) {
                            // Smart Repair Logic

                            // 1. If it's a remote Google URL (or other remote), we should cache it.
                            if (currentIcon.includes('google.com/s2/favicons') || currentIcon.startsWith('http')) {
                                downloadUrl = currentIcon.includes('google.com/s2/favicons') ? currentIcon : potentialDlUrl;
                                // Note: If it's a random http image, we might not be able to auto-download it easily without more logic.
                                // For safely, if it's google favicon, we know how to handle.
                                // If it's just http, we might want to leave it? 
                                // Let's stick to previous logic: if missing or google, fix it.
                                shouldDownload = true;
                            }
                            // 2. If it's a local file path, check if it exists
                            else if (currentIcon.startsWith('/uploads/')) {
                                // Remove query params for check
                                const cleanPath = currentIcon.split('?')[0];
                                const fullPath = path.join(publicDir, cleanPath);
                                if (!fs.existsSync(fullPath)) {
                                    // File missing, download it again
                                    // Fallback to auto-favicon
                                    downloadUrl = potentialDlUrl;
                                    shouldDownload = true;
                                }
                            }
                            // 3. If empty, download
                            else if (!currentIcon) {
                                downloadUrl = potentialDlUrl;
                                shouldDownload = true;
                            }
                        }
                    } catch (e) { }
                }

                if (shouldDownload) {
                    if (analyze) {
                        toSyncCount++;
                    } else if (downloadUrl) {
                        const result = await downloadAndSaveIcon(site.id, downloadUrl);
                        if (result) {
                            successCount++;
                        } else {
                            failCount++;
                        }
                    } else {
                        failCount++;
                    }
                } else {
                    skippedCount++;
                }
            }));
        }

        if (analyze) {
            return NextResponse.json({
                success: true,
                total: sites.length,
                skipped: skippedCount,
                toSync: toSyncCount
            });
        }

        return NextResponse.json({
            success: true,
            processed: successCount,
            successCount,
            failCount,
            skippedCount,
            total: sites.length
        });
    } catch (error) {
        console.error('Sync error:', error);
        return NextResponse.json({ error: 'Failed to sync icons' }, { status: 500 });
    }
}
