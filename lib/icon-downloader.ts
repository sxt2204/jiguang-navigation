import fs from 'fs';
import path from 'path';
import { prisma } from './prisma';
import { Readable } from 'stream';
import { finished } from 'stream/promises';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads', 'icons');

// Ensure upload directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

export async function downloadAndSaveIcon(siteId: string, iconUrl: string) {
    try {
        // Optimization: Check if we already have this icon for this site
        const existingSite = await prisma.site.findUnique({ where: { id: siteId } });
        if (existingSite?.customIconUrl?.startsWith('/uploads/') && existingSite.iconType === 'upload') {
            // Check if file actually exists
            const urlWithoutQuery = existingSite.customIconUrl.split('?')[0];
            const localPath = path.join(process.cwd(), 'public', urlWithoutQuery);

            if (fs.existsSync(localPath)) {
                console.log(`[Icon Downloader] Skipping download for site ${siteId}, already has local icon: ${existingSite.customIconUrl}`);
                return existingSite.customIconUrl;
            }
        }

        const filename = `site-${siteId}.png`;
        const filepath = path.join(UPLOAD_DIR, filename);
        // Add timestamp as query param for cache busting
        const publicPath = `/uploads/icons/${filename}?v=${Date.now()}`;

        const response = await fetch(iconUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to download icon: ${response.status} ${response.statusText}`);
        }

        if (!response.body) {
            throw new Error('No response body');
        }

        const fileStream = fs.createWriteStream(filepath, { flags: 'w' });
        // @ts-ignore - response.body is a ReadableStream, but we need to convert it for Node fs
        await finished(Readable.fromWeb(response.body).pipe(fileStream));

        // Update database with local path
        await prisma.site.update({
            where: { id: siteId },
            data: {
                iconType: 'upload',
                customIconUrl: publicPath
            }
        });

        console.log(`Icon downloaded and saved for site ${siteId}: ${publicPath}`);
        return publicPath;

    } catch (error) {
        console.error(`Error downloading icon for site ${siteId}:`, error);
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

        const filepath = path.join(UPLOAD_DIR, filename);
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
        const filepath = path.join(UPLOAD_DIR, filename);
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
