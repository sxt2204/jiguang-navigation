import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const category = await prisma.category.create({
            data: {
                name: body.name,
                order: body.order || 0,
                color: body.color,
                isHidden: body.isHidden || false
            }
        });
        return NextResponse.json(category);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        // Handle bulk update for reordering or single update
        if (Array.isArray(body)) {
            // 串行更新，避免SQLite锁冲突
            for (const cat of body) {
                await prisma.category.update({
                    where: { name: cat.name },
                    data: {
                        order: cat.order,
                        color: cat.color,
                        isHidden: cat.isHidden
                    }
                });
            }
            return NextResponse.json({ success: true });
        } else if (body.oldName && body.newName) {
            // Rename Category
            // Transaction: Update Category Name + Update All Sites with this Category
            await prisma.$transaction([
                prisma.category.update({
                    where: { name: body.oldName },
                    data: { name: body.newName }
                }),
                prisma.site.updateMany({
                    where: { category: body.oldName },
                    data: { category: body.newName }
                })
            ]);
            return NextResponse.json({ success: true, name: body.newName });
        } else {
            const category = await prisma.category.update({
                where: { name: body.name },
                data: {
                    name: body.name,
                    color: body.color,
                    isHidden: body.isHidden,
                    order: body.order
                }
            });
            return NextResponse.json(category);
        }
    } catch (error) {
        console.error('[Categories API] Error:', error);
        return NextResponse.json({ error: 'Failed to update category', details: error instanceof Error ? error.message : String(error) }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const name = searchParams.get('name');
        if (!name) return NextResponse.json({ error: 'Name required' }, { status: 400 });

        await prisma.$transaction([
            prisma.site.deleteMany({ where: { category: name } }),
            prisma.category.deleteMany({ where: { name } })
        ]);

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('DELETE /api/categories error:', error);
        return NextResponse.json({
            error: error.message || 'Failed to delete category',
            details: error.code
        }, { status: 500 });
    }
}

export const dynamic = 'force-dynamic';
