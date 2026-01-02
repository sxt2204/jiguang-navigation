import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// POST: Reset all sites' custom font settings to use global defaults
export async function POST() {
    try {
        const result = await prisma.site.updateMany({
            data: {
                titleFont: null,
                descFont: null,
                titleColor: null,
                descColor: null,
                titleSize: null,
                descSize: null,
            }
        });

        console.log(`[Reset Fonts API] Reset ${result.count} sites to global defaults`);

        return NextResponse.json({
            success: true,
            count: result.count,
            message: `已将 ${result.count} 个站点的字体设置重置为全局默认`
        });
    } catch (error) {
        console.error('[Reset Fonts API] Error:', error);
        return NextResponse.json(
            { error: 'Failed to reset font settings', details: String(error) },
            { status: 500 }
        );
    }
}

export const dynamic = 'force-dynamic';
