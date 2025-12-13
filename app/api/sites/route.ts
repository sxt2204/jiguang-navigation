import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { downloadAndSaveIcon, saveBase64Icon, deleteIcon } from '@/lib/icon-downloader';

const getFaviconUrl = (domain: string) => `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;

export async function POST(request: Request) {
    try {
        const body = await request.json();

        let initialIconType = body.iconType;
        let initialCustomIconUrl = body.customIconUrl;
        let shouldDownload = false;
        let downloadUrl = '';

        // Logic: If auto, use Google Favicon URL initially.
        // If custom URL (http), use it.
        // If Base64, save to disk.

        if (body.iconType === 'auto' && body.url) {
            try {
                const domain = new URL(body.url).hostname;
                downloadUrl = getFaviconUrl(domain);
                initialIconType = 'upload'; // Switch to upload so frontend uses the URL
                initialCustomIconUrl = downloadUrl; // Temporary remote URL
                shouldDownload = true;
            } catch (e) { }
        } else if (body.iconType === 'upload' && body.customIconUrl) {
            if (body.customIconUrl.startsWith('http')) {
                downloadUrl = body.customIconUrl;
                shouldDownload = true;
            } else if (body.customIconUrl.startsWith('data:image')) {
                // Handle Base64 Upload immediately
                const savedPath = await saveBase64Icon(body.id || 'temp', body.customIconUrl);
                if (savedPath) {
                    initialCustomIconUrl = savedPath;
                }
            }
        }

        const site = await prisma.site.create({

            data: {
                id: body.id,
                name: body.name || 'New Site', // Ensure string
                // url removed here, handled at bottom
                desc: body.desc,
                category: body.category || 'Other', // Ensure string
                color: body.color,
                icon: body.icon,
                iconType: initialIconType,
                customIconUrl: initialCustomIconUrl,
                titleFont: body.titleFont,
                descFont: body.descFont,
                titleColor: body.titleColor,
                descColor: body.descColor,
                descSize: body.descSize ? parseInt(String(body.descSize)) : null,
                titleSize: body.titleSize ? parseInt(String(body.titleSize)) : null,
                order: body.order ? parseInt(String(body.order)) : 0,
                isHidden: Boolean(body.isHidden),
                type: body.type || 'site',
                parentId: body.parentId || null,
                url: body.url || (body.type === 'folder' ? '#' : ''), // Ensure string
            }
        });

        console.log(`[Sites API] Created ${site.type}: ${site.id} (${site.name})`);

        // If we used a temp ID for filename, we might want to rename it, but it's fine for now.
        // Ideally we should use the real ID.
        // If we saved base64 with 'temp', we can't easily rename without FS ops.
        // Optimization: If we really want the ID in filename, we'd need to create site first then save file then update site.
        // But for now, let's just use the timestamp in filename which is unique enough.

        // Handle download - await it to ensure it completes, or log error
        // Note: In Vercel serverless this might still time out if too long, but for local/VPS it's better to await or use waitUntil
        if (shouldDownload && downloadUrl) {
            console.log(`[Sites API] Triggering icon download for ${site.id} from ${downloadUrl}`);
            await downloadAndSaveIcon(site.id, downloadUrl);
        }

        return NextResponse.json(site);
    } catch (error) {
        console.error('[Sites API] Create Site Error:', error);
        return NextResponse.json({
            error: 'Failed to create site',
            details: error instanceof Error ? error.message : String(error)
        }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        // Console log strictly limited
        if (!Array.isArray(body)) {
            console.log('[Sites API] Single PUT:', JSON.stringify(body).substring(0, 200));
        }

        if (Array.isArray(body)) {
            // 串行更新，避免SQLite锁冲突
            for (const site of body) {
                await prisma.site.update({
                    where: { id: site.id },
                    data: {
                        order: site.order,
                        category: site.category,
                        isHidden: site.isHidden,
                        parentId: site.parentId
                    }
                });
            }
            return NextResponse.json({ success: true });
        }

        let initialIconType = body.iconType;
        let initialCustomIconUrl = body.customIconUrl;
        let shouldDownload = false;
        let downloadUrl = '';

        if (body.iconType === 'auto' && body.url) {
            try {
                const domain = new URL(body.url).hostname;
                downloadUrl = getFaviconUrl(domain);
                initialIconType = 'upload';
                initialCustomIconUrl = downloadUrl;
                shouldDownload = true;
            } catch (e) { }
        } else if (body.iconType === 'upload' && body.customIconUrl) {
            if (body.customIconUrl.startsWith('http')) {
                if (!body.customIconUrl.startsWith('/uploads/')) {
                    downloadUrl = body.customIconUrl;
                    shouldDownload = true;
                }
            } else if (body.customIconUrl.startsWith('data:image')) {
                // Handle Base64 Upload
                const savedPath = await saveBase64Icon(body.id, body.customIconUrl);
                if (savedPath) {
                    initialCustomIconUrl = savedPath;
                }
            }
        }

        const site = await prisma.site.update({
            where: { id: body.id },
            data: {
                name: body.name,
                url: body.url,
                desc: body.desc,
                category: body.category,
                color: body.color,
                icon: body.icon,
                iconType: initialIconType,
                customIconUrl: initialCustomIconUrl,
                titleFont: body.titleFont,
                descFont: body.descFont,
                titleColor: body.titleColor,
                descColor: body.descColor,
                descSize: body.descSize ? parseInt(String(body.descSize)) : null,
                titleSize: body.titleSize ? parseInt(String(body.titleSize)) : null,
                order: body.order,
                isHidden: body.isHidden,
                type: body.type,
                parentId: body.parentId
            }
        });

        if (shouldDownload && downloadUrl) {
            console.log(`[Sites API] Triggering icon download for ${site.id} from ${downloadUrl}`);
            await downloadAndSaveIcon(site.id, downloadUrl);
        }

        return NextResponse.json(site);
    } catch (error) {
        console.error('[Sites API] Update Site Error:', error);
        return NextResponse.json({ error: 'Failed to update site', details: String(error) }, { status: 500 });
    }
}



export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

        const deleteContents = searchParams.get('deleteContents') === 'true';

        const site = await prisma.site.findUnique({ where: { id } });
        if (site) {
            if (site.customIconUrl) {
                await deleteIcon(site.customIconUrl);
            }

            // Handle folder contents
            if (deleteContents) {
                // Delete all children (recursively? for now just children)
                const children = await prisma.site.findMany({ where: { parentId: id } });
                for (const child of children) {
                    if (child.customIconUrl) await deleteIcon(child.customIconUrl);
                }
                await prisma.site.deleteMany({ where: { parentId: id } });
            } else {
                // Keep contents: Move to root (parentId = null)
                await prisma.site.updateMany({
                    where: { parentId: id },
                    data: { parentId: null }
                });
            }
        }

        await prisma.site.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete site' }, { status: 500 });
    }
}

export const dynamic = 'force-dynamic';
