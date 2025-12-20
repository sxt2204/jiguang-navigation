'use client';

import { useFonts } from '@/app/hooks/useFonts';
import { memo } from 'react';

export const CustomFontLoader = memo(function CustomFontLoader() {
    const { allFonts } = useFonts();

    // Filter out fonts without URLs (like system fonts)
    const fontsToLoad = allFonts.filter(f => f.url && f.url.length > 0);

    // console.log('[CustomFontLoader] Loading fonts:', fontsToLoad.map(f => f.name));

    return (
        <>
            {fontsToLoad.map(font => (
                <link
                    key={font.id}
                    rel="stylesheet"
                    href={font.url}
                    media="print"
                    onLoad={(e) => { e.currentTarget.media = 'all'; }}
                />
            ))}
        </>
    );
});
