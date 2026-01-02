import { NextResponse } from 'next/server';
import { checkDatabaseConsistency } from '@/lib/db-consistency';

/**
 * GET /api/admin/db-check
 * Check database consistency without making changes
 */
export async function GET() {
    try {
        const report = await checkDatabaseConsistency(false);
        return NextResponse.json(report);
    } catch (error) {
        console.error('[DB Check API] Error:', error);
        return NextResponse.json({ error: 'Failed to check database consistency' }, { status: 500 });
    }
}

/**
 * POST /api/admin/db-check
 * Check and repair database consistency issues
 */
export async function POST() {
    try {
        const report = await checkDatabaseConsistency(true);
        return NextResponse.json(report);
    } catch (error) {
        console.error('[DB Check API] Error:', error);
        return NextResponse.json({ error: 'Failed to repair database' }, { status: 500 });
    }
}

export const dynamic = 'force-dynamic';
