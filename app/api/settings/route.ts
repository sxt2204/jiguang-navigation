import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const { layout, config, theme } = body;

        console.log('[Settings API] Received update request');
        // console.log('[Settings API] Config keys:', config ? Object.keys(config) : 'none');
        // console.log('[Settings API] privateMode:', config?.privateMode);
        console.log('[Settings API] Layout update:', layout ? 'Present' : 'Missing');
        if (layout) {
            console.log('[Settings API] bgUrl:', layout.bgUrl);
            console.log('[Settings API] bgType:', layout.bgType);
        }

        const settings = await prisma.globalSettings.upsert({
            where: { id: 1 },
            update: {
                layout: layout ? JSON.stringify(layout) : undefined,
                config: config ? JSON.stringify(config) : undefined,
                theme: theme ? JSON.stringify(theme) : undefined,
                searchEngine: body.searchEngine
            } as any,
            create: {
                id: 1,
                layout: JSON.stringify(layout || {}),
                config: JSON.stringify(config || {}),
                theme: JSON.stringify(theme || {}),
                searchEngine: body.searchEngine || 'Google'
            } as any
        });

        console.log('[Settings API] Saved successfully, id:', settings.id);

        return NextResponse.json(settings);
    } catch (error) {
        console.error('[Settings API] Error:', error);
        return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
    }
}
