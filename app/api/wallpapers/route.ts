import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { writeFile, unlink, mkdir } from 'fs/promises';
import * as path from 'path';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads', 'wallpapers', 'custom');

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const type = searchParams.get('type');

        const where = type ? { type } : undefined;
        const wallpapers = await prisma.wallpaper.findMany({
            where,
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json(wallpapers);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch wallpapers' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as unknown as File;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Ensure directory exists
        await mkdir(UPLOAD_DIR, { recursive: true });

        const filename = `custom-${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;
        const filepath = path.join(UPLOAD_DIR, filename);
        const publicPath = `/uploads/wallpapers/custom/${filename}`;

        await writeFile(filepath, buffer);

        const wallpaper = await prisma.wallpaper.create({
            data: {
                url: publicPath,
                type: 'custom',
                filename,
                size: buffer.length
            }
        });

        return NextResponse.json(wallpaper);
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

        const wallpaper = await prisma.wallpaper.findUnique({ where: { id } });
        if (!wallpaper) return NextResponse.json({ error: 'Wallpaper not found' }, { status: 404 });

        // Delete file
        const filepath = path.join(process.cwd(), 'public', wallpaper.url);
        try {
            await unlink(filepath);
        } catch (e) {
            console.error('Failed to delete file:', e);
        }

        // Delete DB record
        await prisma.wallpaper.delete({ where: { id } });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
    }
}

export const dynamic = 'force-dynamic';
