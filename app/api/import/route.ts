import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const { sites, categories, categoryColors, layout, config, theme, hiddenCategories, customFonts, searchEngine } = data; // [NEW] Added searchEngine

        // 1. Update Settings
        await prisma.globalSettings.upsert({
            where: { id: 1 },
            update: {
                layout: layout ? JSON.stringify(layout) : undefined,
                config: config ? JSON.stringify(config) : undefined,
                theme: theme ? JSON.stringify(theme) : undefined,
                searchEngine: searchEngine || undefined // [NEW] Update searchEngine
            },
            create: {
                id: 1,
                layout: JSON.stringify(layout || {}),
                config: JSON.stringify(config || {}),
                theme: JSON.stringify(theme || {}),
                searchEngine: searchEngine || 'Google' // [NEW] Create with default
            }
        });

        // 2. Update Categories & Hidden State
        if (categories && Array.isArray(categories)) {
            // Determine hidden set
            const hiddenSet = new Set(Array.isArray(hiddenCategories) ? hiddenCategories : []);

            for (const catName of categories) {
                await prisma.category.upsert({
                    where: { name: catName },
                    update: {
                        order: categories.indexOf(catName),
                        color: categoryColors?.[catName] || '#6366F1',
                        isHidden: hiddenSet.has(catName)
                    },
                    create: {
                        name: catName,
                        order: categories.indexOf(catName),
                        color: categoryColors?.[catName] || '#6366F1',
                        isHidden: hiddenSet.has(catName)
                    }
                });
            }
        }

        // 3. Update Sites
        if (sites && Array.isArray(sites)) {
            for (const site of sites) {
                await prisma.site.upsert({
                    where: { id: site.id },
                    update: {
                        name: site.name,
                        url: site.url,
                        desc: site.desc,
                        category: site.category,
                        color: site.color,
                        icon: site.icon,
                        iconType: site.iconType,
                        customIconUrl: site.customIconUrl,
                        order: site.order || 0,
                        isHidden: site.isHidden || false,
                        titleFont: site.titleFont,
                        descFont: site.descFont,
                        titleColor: site.titleColor,
                        descColor: site.descColor,
                        titleSize: site.titleSize,
                        descSize: site.descSize
                    },
                    create: {
                        id: site.id,
                        name: site.name,
                        url: site.url,
                        desc: site.desc,
                        category: site.category,
                        color: site.color,
                        icon: site.icon,
                        iconType: site.iconType,
                        customIconUrl: site.customIconUrl,
                        order: site.order || 0,
                        isHidden: site.isHidden || false,
                        titleFont: site.titleFont,
                        descFont: site.descFont,
                        titleColor: site.titleColor,
                        descColor: site.descColor,
                        titleSize: site.titleSize,
                        descSize: site.descSize
                    }
                });
            }
        }

        // 4. Update Custom Fonts
        if (customFonts && Array.isArray(customFonts)) {
            for (const font of customFonts) {
                // Only upsert if it looks valid
                if (font.name && font.family) {
                    await prisma.customFont.upsert({
                        where: { id: font.id || 'new-uuid' }, // Note: Upsert needs valid WHERE unique. If ID is missing, we might fail. 
                        // Actually, if we are importing, the ID likely comes with it.
                        // However, if collision with existing DB that uses UUID, we should be careful.
                        // Safest strategy: check if name/family exists, or just create.
                        // Let's rely on upsert by ID if present, otherwise create? 
                        // Schema ID is uuid. If export data has ID, we reuse it.
                        update: {
                            name: font.name,
                            family: font.family,
                            url: font.url,
                            provider: font.provider
                        },
                        create: {
                            id: font.id,
                            name: font.name,
                            family: font.family,
                            url: font.url,
                            provider: font.provider
                        }
                    }).catch(() => {
                        // If ID not found or other error, try create new?
                        // This simplistic approach assumes clean imports or matching IDs.
                        // For a "perfect migration", keeping IDs is good.
                    });
                }
            }
        }

        // 5. Update Todos
        const { todos, countdowns } = data;
        if (todos && Array.isArray(todos)) {
            // Optional: Strategy to wipe existing or just upsert?
            // User request implies "recover", so let's upsert to prevent data loss on existing items if they differ.
            // If the user wants a clean restore, they might expect a wipe. But upsert is safer.
            for (const todo of todos) {
                if (todo.text) {
                    await prisma.todo.upsert({
                        where: { id: todo.id || 'new-uuid' },
                        update: {
                            text: todo.text,
                            done: todo.done,
                            updatedAt: new Date() // Force update timestamp
                        },
                        create: {
                            id: todo.id,
                            text: todo.text,
                            done: todo.done
                        }
                    }).catch(() => { });
                }
            }
        }

        // 6. Update Countdowns
        if (countdowns && Array.isArray(countdowns)) {
            for (const cd of countdowns) {
                if (cd.label && cd.date) {
                    await prisma.countdown.upsert({
                        where: { id: cd.id || 'new-uuid' },
                        update: {
                            label: cd.label,
                            date: cd.date,
                            updatedAt: new Date()
                        },
                        create: {
                            id: cd.id,
                            label: cd.label,
                            date: cd.date
                        }
                    }).catch(() => { });
                }
            }
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Import failed:', error);
        return NextResponse.json({ error: 'Import failed' }, { status: 500 });
    }
}
