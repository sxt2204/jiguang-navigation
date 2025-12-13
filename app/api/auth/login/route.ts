import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
    try {
        const { username, password } = await request.json();
        const user = await prisma.user.findUnique({ where: { username } });

        if (!user) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        const isValid = await bcrypt.compare(password, user.passwordHash);
        if (!isValid) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        // In a real app, set a session cookie here.
        // For now, we return success and let frontend handle "isLoggedIn" state.
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Login failed' }, { status: 500 });
    }
}

export const dynamic = 'force-dynamic';
