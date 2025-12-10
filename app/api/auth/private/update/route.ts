
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const { password } = body;
        console.log('[Private Update] Request received');

        // Allow clearing the password (setting to null) if empty string provided
        if (password === "") {
            await prisma.globalSettings.update({
                where: { id: 1 },
                data: { privatePasswordHash: null }
            });
            console.log('[Private Update] Password cleared (Admin fallback enabled)');
            return NextResponse.json({ success: true });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await prisma.globalSettings.update({
            where: { id: 1 },
            data: { privatePasswordHash: hashedPassword }
        });
        console.log('[Private Update] Password updated successfully');

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('[Private Update] Error:', error);
        return NextResponse.json({ error: 'Update failed' }, { status: 500 });
    }
}
