import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function PUT(request: Request) {
    try {
        const { currentUsername, currentPassword, newUsername, newPassword } = await request.json();

        if (!currentUsername || !currentPassword) {
            return NextResponse.json({ error: 'Missing current credentials' }, { status: 400 });
        }

        // 1. Find User
        const user = await prisma.user.findUnique({
            where: { username: currentUsername }
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // 2. Verify Current Password
        const isValid = await bcrypt.compare(currentPassword, user.passwordHash);
        if (!isValid) {
            return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
        }

        // 3. Prepare Updates
        const updates: any = {};

        // Update Password if provided
        if (newPassword && newPassword.trim() !== '') {
            updates.passwordHash = await bcrypt.hash(newPassword, 10);
        }

        // Update Username if provided and different
        if (newUsername && newUsername.trim() !== '' && newUsername !== currentUsername) {
            updates.username = newUsername;
        }

        if (Object.keys(updates).length === 0) {
            return NextResponse.json({ message: 'No changes made' });
        }

        // 4. Perform Update
        // Since we might update the ID (username), we use update
        const updatedUser = await prisma.user.update({
            where: { username: currentUsername },
            data: updates
        });

        return NextResponse.json({
            success: true,
            username: updatedUser.username,
            usernameChanged: !!updates.username,
            passwordChanged: !!updates.passwordHash
        });

    } catch (error) {
        console.error('Account update error:', error);
        if ((error as any).code === 'P2002') {
            return NextResponse.json({ error: 'Username already exists' }, { status: 409 });
        }
        return NextResponse.json({ error: 'Failed to update account' }, { status: 500 });
    }
}
