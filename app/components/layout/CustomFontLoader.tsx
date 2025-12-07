'use client';

import { useFonts } from '@/app/hooks/useFonts';
import { useEffect } from 'react';

export function CustomFontLoader() {
    const { allFonts } = useFonts();

    // Since we are inside the client component, we can render links into head or just return them
    // Next.js 13+ head management is flexible. We can just return links.

    // Filter out fonts without URLs (like system fonts)
    const fontsToLoad = allFonts.filter(f => f.url && f.url.length > 0);

    console.log('[CustomFontLoader] Loading fonts:', fontsToLoad.map(f => f.name));

    return (
        <>
            {fontsToLoad.map(font => (
                <link key={font.id} rel="stylesheet" href={font.url} />
            ))}
        </>
    );
}
