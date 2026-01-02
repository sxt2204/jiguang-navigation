import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Serve static files from /uploads directory at runtime
// This is needed because Next.js standalone mode doesn't serve dynamic files from public/
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    try {
        const { path: pathSegments } = await params;
        const filePath = pathSegments.join('/');

        // Security: Only allow uploads directory
        if (!filePath || filePath.includes('..')) {
            return NextResponse.json({ error: 'Invalid path' }, { status: 400 });
        }

        const fullPath = path.join(process.cwd(), 'public', 'uploads', filePath);

        // Check if file exists
        if (!fs.existsSync(fullPath)) {
            return NextResponse.json({ error: 'File not found' }, { status: 404 });
        }

        // Get file stats
        const stats = fs.statSync(fullPath);
        if (!stats.isFile()) {
            return NextResponse.json({ error: 'Not a file' }, { status: 400 });
        }

        // Read file
        const fileBuffer = fs.readFileSync(fullPath);

        // Determine content type
        const ext = path.extname(fullPath).toLowerCase();
        const mimeTypes: Record<string, string> = {
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.png': 'image/png',
            '.gif': 'image/gif',
            '.webp': 'image/webp',
            '.svg': 'image/svg+xml',
            '.ico': 'image/x-icon',
        };
        const contentType = mimeTypes[ext] || 'application/octet-stream';

        // Return file with proper headers
        return new NextResponse(fileBuffer, {
            status: 200,
            headers: {
                'Content-Type': contentType,
                'Content-Length': stats.size.toString(),
                'Cache-Control': 'public, max-age=86400', // Cache for 1 day
            },
        });
    } catch (error) {
        console.error('Static file serve error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export const dynamic = 'force-dynamic';
