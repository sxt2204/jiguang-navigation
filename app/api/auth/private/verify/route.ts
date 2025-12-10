
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
    try {
        const { password } = await request.json();
        console.log('[Private Verify] Checking password...');

        const settings = await prisma.globalSettings.findUnique({ where: { id: 1 } });

        // If no private password is set, verify against Admin password (fallback)
        if (!settings?.privatePasswordHash) {
            console.log('[Private Verify] No private password set. Checking Admin fallback...');
            const admin = await prisma.user.findFirst();
            if (admin) {
                const isValid = await bcrypt.compare(password, admin.passwordHash);
                console.log('[Private Verify] Admin fallback result:', isValid);
                return NextResponse.json({ success: isValid });
            }
            return NextResponse.json({ success: false });
        }

        // Verify against Private Password
        console.log('[Private Verify] Verifying against custom private password...');
        const isValid = await bcrypt.compare(password, settings.privatePasswordHash);
        console.log('[Private Verify] Custom password result:', isValid);
        return NextResponse.json({ success: isValid });

    } catch (error) {
        console.error('[Private Verify] Error:', error);
        return NextResponse.json({ error: 'Verification failed' }, { status: 500 });
    }
}
