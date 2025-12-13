import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';


export async function GET() {
    try {
        const todos = await prisma.todo.findMany({
            orderBy: { createdAt: 'asc' }
        });
        return NextResponse.json(todos);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch todos' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { text } = await request.json();
        const todo = await prisma.todo.create({
            data: { text }
        });
        return NextResponse.json(todo);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create todo' }, { status: 500 });
    }
}

export const dynamic = 'force-dynamic';
