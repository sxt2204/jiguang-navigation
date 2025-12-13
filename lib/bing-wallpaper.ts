import fs from 'fs';
import path from 'path';
import https from 'https';
import { prisma } from './prisma';

const WALLPAPER_DIR = path.join(process.cwd(), 'public', 'uploads', 'wallpapers');
const BING_DIR = path.join(WALLPAPER_DIR, 'bing');

// Ensure directories exist
if (!fs.existsSync(BING_DIR)) {
    fs.mkdirSync(BING_DIR, { recursive: true });
}

export async function fetchAndCacheBingWallpaper() {
    try {
        // 0. Cache First Strategy: Check if we already have today's wallpaper
        const now = new Date();
        // Use local time for consistency with users expectation of "today"
        const offset = now.getTimezoneOffset() * 60000;
        const localDate = new Date(now.getTime() - offset);
        const yyyy = localDate.toISOString().slice(0, 4);
        const mm = localDate.toISOString().slice(5, 7);
        const dd = localDate.toISOString().slice(8, 10);

        // Bing API uses enddate usually for file naming in many tools, but startdate in JSON. 
        // We will use our own standardized format for local cache: bing-YYYYMMDD.jpg
        const todayStr = `${yyyy}${mm}${dd}`;
        const todayFilename = `bing-${todayStr}.jpg`;

        const cachedToday = await (prisma as any).wallpaper.findFirst({
            where: { filename: todayFilename, type: 'bing' }
        });

        if (cachedToday && fs.existsSync(path.join(process.cwd(), 'public', cachedToday.url))) {
            console.log('[Bing Sync] Using cached wallpaper for today:', cachedToday.filename);
            return cachedToday;
        }

        // 1. Fetch Bing JSON
        const bingJsonUrl = 'https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=zh-CN';
        const bingData: any = await new Promise((resolve, reject) => {
            const req = https.get(bingJsonUrl, (res) => {
                let data = '';
                res.on('data', (chunk) => data += chunk);
                res.on('end', () => {
                    try {
                        resolve(JSON.parse(data));
                    } catch (e) {
                        reject(e);
                    }
                });
            });
            req.on('error', (e) => reject(e));
            req.setTimeout(5000, () => {
                req.destroy();
                reject(new Error('Timeout'));
            });
        }).catch(async (e) => {
            console.warn('Bing API unreachable, falling back to cache:', e.message);
            return null;
        });

        if (!bingData?.images?.[0]) {
            // Fallback: Return latest cached wallpaper
            const latest = await (prisma as any).wallpaper.findFirst({
                where: { type: 'bing' },
                orderBy: { createdAt: 'desc' }
            });
            if (latest && fs.existsSync(path.join(process.cwd(), 'public', latest.url))) {
                return latest;
            }
            throw new Error('No wallpaper available (Offline & No Cache)');
        }

        if (!bingData?.images?.[0]) throw new Error('Invalid Bing API response');

        const image = bingData.images[0];
        // Try to get UHD, fallback to default if replacement fails
        let imageUrl = `https://www.bing.com${image.url}`;
        if (imageUrl.includes('1920x1080')) {
            imageUrl = imageUrl.replace('1920x1080', 'UHD');
        } else {
            // If URL doesn't have 1920x1080, try appending _UHD before extension (less reliable, but worth a try if base)
            // Actually, Bing JSON usually gives 1920x1080. Let's stick to replacement or appending _UHD if using urlbase.
            // Safer: Use urlbase + _UHD.jpg
            if (image.urlbase) {
                imageUrl = `https://www.bing.com${image.urlbase}_UHD.jpg`;
            }
        }
        const dateStr = image.startdate; // YYYYMMDD
        const filename = `bing-${dateStr}.jpg`;
        const filepath = path.join(BING_DIR, filename);
        const publicPath = `/uploads/wallpapers/bing/${filename}`;

        // 2. Check if already cached
        let wallpaper = await (prisma as any).wallpaper.findFirst({
            where: { filename, type: 'bing' }
        });

        if (!wallpaper || !fs.existsSync(filepath)) {
            // 3. Download if not exists
            await new Promise((resolve, reject) => {
                const file = fs.createWriteStream(filepath);
                https.get(imageUrl, (response) => {
                    if (response.statusCode !== 200) {
                        reject(new Error(`Failed to download wallpaper: ${response.statusCode}`));
                        return;
                    }
                    response.pipe(file);
                    file.on('finish', () => {
                        file.close();
                        resolve(true);
                    });
                }).on('error', (err) => {
                    fs.unlink(filepath, () => { });
                    reject(err);
                });
            });

            // 4. Save to DB
            // If it was in DB but file missing, update it? Or just create new if null.
            // Simplified: If we are here, we downloaded it.
            // If 'wallpaper' var was not null but file missing, we should update or delete/create.
            // Safest: upsert or delete then create.
            if (wallpaper) {
                await (prisma as any).wallpaper.delete({ where: { id: wallpaper.id } });
            }

            wallpaper = await (prisma as any).wallpaper.create({
                data: {
                    url: publicPath,
                    type: 'bing',
                    filename,
                    size: fs.statSync(filepath).size
                }
            });
        }

        // 5. Handle Cache Mode (Cleanup) - ALWAYS RUN
        const settings = await prisma.globalSettings.findUnique({ where: { id: 1 } });
        const cacheMode = settings?.bingCacheMode || 'keep-all';

        if (cacheMode === 'keep-daily') {
            // Delete all other Bing wallpapers
            /* 
            // DISABLED: User requested to keep all synced wallpapers
            const others = await (prisma as any).wallpaper.findMany({
                where: { type: 'bing', id: { not: wallpaper.id } }
            });

            for (const w of others) {
                // Delete file
                const p = path.join(process.cwd(), 'public', w.url);
                if (fs.existsSync(p)) fs.unlinkSync(p);
                // Delete DB record
                await (prisma as any).wallpaper.delete({ where: { id: w.id } });
            }
            */
        }

        return wallpaper;

    } catch (error) {
        console.error('Error fetching Bing wallpaper:', error);
        return null;
    }
}
