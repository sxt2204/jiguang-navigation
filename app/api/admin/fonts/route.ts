
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

// GET: List all saved custom fonts
export async function GET() {
    try {
        const fonts = await prisma.customFont.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json(fonts);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch fonts' }, { status: 500 });
    }
}

// POST: Add a new custom font (link to fonts.loli.net)
export async function POST(request: Request) {
    try {
        const body = await request.json();
        /* 
           Body: { name: "Open Sans", family: "Open Sans" } 
           We construct the URL automatically using fonts.loli.net mirror
        */

        if (!body.name || !body.family) {
            return NextResponse.json({ error: 'Missing name or family' }, { status: 400 });
        }

        // Construct Mirror URL (Google Fonts compatible)
        // e.g. https://fonts.loli.net/css2?family=Open+Sans:wght@400;500;700&display=swap
        const familyParam = body.family.replace(/ /g, '+');
        const url = `https://fonts.loli.net/css2?family=${familyParam}:wght@400;500;700&display=swap`;

        const newFont = await prisma.customFont.create({
            data: {
                name: body.name,
                family: body.family,
                url: url,
                provider: 'google'
            }
        });

        return NextResponse.json(newFont);
    } catch (error) {
        console.error('Error adding font:', error);
        return NextResponse.json({ error: 'Failed to add font' }, { status: 500 });
    }
}
