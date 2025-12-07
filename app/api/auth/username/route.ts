import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function PUT(request: Request) {
    try {
        const { oldUsername, password, newUsername } = await request.json();

        if (!oldUsername || !password || !newUsername) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { username: oldUsername }
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const isValid = await bcrypt.compare(password, user.passwordHash);

        if (!isValid) {
            return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
        }

        // Update username
        // Since username is the ID, we can update it directly with Prisma
        const updatedUser = await prisma.user.update({
            where: { username: oldUsername },
            data: { username: newUsername }
        });

        return NextResponse.json({ success: true, username: updatedUser.username });

    } catch (error) {
        console.error('Change username error:', error);
        // Handle unique constraint violation (if new username already exists)
        if ((error as any).code === 'P2002') {
            return NextResponse.json({ error: 'Username already exists' }, { status: 409 });
        }
        return NextResponse.json({ error: 'Failed to update username' }, { status: 500 });
    }
}
