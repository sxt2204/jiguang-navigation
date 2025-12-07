'use client';

import { FONTS } from '@/lib/constants';
import { useEffect, useState } from 'react';

export function FontManager({ fontFamilyId }: { fontFamilyId: string }) {
    const [currentUrl, setCurrentUrl] = useState<string>('');

    useEffect(() => {
        const font = FONTS.find(f => f.id === fontFamilyId);
        if (font && font.url) {
            setCurrentUrl(font.url);
        } else {
            setCurrentUrl('');
        }
    }, [fontFamilyId]);

    if (!currentUrl) return null;

    return (
        <link rel="stylesheet" href={currentUrl} />
    );
}
