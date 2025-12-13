import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function PUT(request: Request) {
    try {
        const { username, oldPassword, newPassword } = await request.json();

        // Default to 'admin' if username not provided, or enforce it
        const targetUser = username || 'admin';

        const user = await prisma.user.findUnique({ where: { username: targetUser } });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const isValid = await bcrypt.compare(oldPassword, user.passwordHash);
        if (!isValid) {
            return NextResponse.json({ error: 'Invalid old password' }, { status: 401 });
        }

        const newHash = await bcrypt.hash(newPassword, 10);
        await prisma.user.update({
            where: { username: targetUser },
            data: { passwordHash: newHash }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update password' }, { status: 500 });
    }
}

export const dynamic = 'force-dynamic';
