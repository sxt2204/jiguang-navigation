import fs from 'fs';
import path from 'path';
import { prisma } from './prisma';
import { Readable } from 'stream';
import { finished } from 'stream/promises';
import { mkdir } from 'fs/promises';

const ICONS_DIR = path.join(process.cwd(), 'public', 'uploads', 'icons');

// Ensure upload directory exists
if (!fs.existsSync(ICONS_DIR)) {
    fs.mkdirSync(ICONS_DIR, { recursive: true });
}

export async function downloadAndSaveIcon(siteId: string, iconUrl: string): Promise<string | null> {
    try {
        console.log(`[Icon Downloader] Starting download for site ${siteId} from ${iconUrl}`);

        // 1. Check if URL is valid
        new URL(iconUrl);

        // 2. Prepare directory
        if (!fs.existsSync(ICONS_DIR)) {
            await mkdir(ICONS_DIR, { recursive: true });
        }

        // Optimization: Check if we already have this icon for this site
        // Actually, for "Sync" action, we likely WANT to overwrite. 
        // But if just creating, maybe not. 
        // Given the function is called "downloadAndSave", strictly doing so is correct.
        // If we want optimization, caller should decide. 
        // But for safety/consistency with previous logic, let's just download.

        // 3. Download
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

        try {
            const response = await fetch(iconUrl, {
                signal: controller.signal,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
                }
            });
            clearTimeout(timeoutId);

            if (!response.ok) {
                console.error(`[Icon Downloader] Failed to fetch icon: ${response.status} ${response.statusText}`);
                return null;
            }

            if (!response.body) {
                console.error('[Icon Downloader] No response body');
                return null;
            }

            // 4. Save file using Stream (Original Logic)
            const filename = `site-${siteId}.png`;
            const filepath = path.join(ICONS_DIR, filename);

            const fileStream = fs.createWriteStream(filepath);

            // Use Readable.fromWeb if node env supports it (Node 16+), or cast response.body
            // The original code uses Readable.fromWeb.
            await finished(Readable.fromWeb(response.body as any).pipe(fileStream));

            console.log(`[Icon Downloader] Icon saved to ${filepath}`);

            // Add cache busting param for DB url
            const publicUrl = `/uploads/icons/${filename}?v=${Date.now()}`;

            // 5. Update DB
            await prisma.site.update({
                where: { id: siteId },
                data: { icon: publicUrl }
            });

            return publicUrl;
        } catch (error) {
            clearTimeout(timeoutId);
            throw error;
        }
    } catch (error) {
        console.error('[Icon Downloader] Error:', error);
        return null;
    }
}

export async function deleteIcon(customIconUrl: string) {
    if (!customIconUrl || !customIconUrl.startsWith('/uploads/')) return;

    try {
        // Remove query parameters if present
        const urlWithoutQuery = customIconUrl.split('?')[0];
        const filename = urlWithoutQuery.split('/').pop();
        if (!filename) return;

        const filepath = path.join(ICONS_DIR, filename);
        if (fs.existsSync(filepath)) {
            fs.unlinkSync(filepath);
            console.log(`Deleted local icon: ${filepath}`);
        }
    } catch (error) {
        console.error('Error deleting icon:', error);
    }
}

export async function saveBase64Icon(siteId: string, base64String: string) {
    try {
        // Extract content type and data
        const matches = base64String.match(/^data:image\/([a-zA-Z+]+);base64,(.+)$/);
        if (!matches || matches.length !== 3) {
            return null;
        }

        const ext = matches[1] === 'jpeg' ? 'jpg' : matches[1];
        const data = matches[2];
        const buffer = Buffer.from(data, 'base64');

        const filename = `site-${siteId}.${ext}`;
        const filepath = path.join(ICONS_DIR, filename);
        // Add timestamp as query param for cache busting
        const publicPath = `/uploads/icons/${filename}?v=${Date.now()}`;

        fs.writeFileSync(filepath, buffer);
        console.log(`Base64 icon saved for site ${siteId}: ${publicPath}`);

        return publicPath;
    } catch (error) {
        console.error(`Error saving base64 icon for site ${siteId}:`, error);
        return null;
    }
}
