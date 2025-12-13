import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';


export async function GET() {
    try {
        const countdowns = await prisma.countdown.findMany({
            orderBy: { date: 'asc' }
        });
        return NextResponse.json(countdowns);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch countdowns' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { label, date } = await request.json();
        const countdown = await prisma.countdown.create({
            data: { label, date }
        });
        return NextResponse.json(countdown);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create countdown' }, { status: 500 });
    }
}

export const dynamic = 'force-dynamic';
