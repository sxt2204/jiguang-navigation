"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { FONTS } from '@/lib/constants';

// Type definitions
export interface CustomFont {
    id: string;
    name: string;
    family: string;
    url: string;
    provider?: string;
    isCustom?: boolean;
}

interface FontContextType {
    allFonts: CustomFont[];
    customFonts: CustomFont[];
    isLoading: boolean;
    addFont: (font: { name: string, family: string }) => Promise<boolean>;
    removeFont: (id: string) => Promise<boolean>;
    refresh: () => Promise<void>;
}

const FontContext = createContext<FontContextType | undefined>(undefined);

export function FontProvider({ children }: { children: ReactNode }) {
    const [customFonts, setCustomFonts] = useState<CustomFont[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch custom fonts on mount
    const fetchFonts = useCallback(async () => {
        try {
            const res = await fetch('/api/admin/fonts');
            if (res.ok) {
                const data = await res.json();
                setCustomFonts(data.map((f: any) => ({ ...f, isCustom: true })));
            }
        } catch (error) {
            console.error('Failed to fetch custom fonts');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchFonts();
    }, [fetchFonts]);

    // Combine static fonts with custom fonts
    const allFonts = [...FONTS, ...customFonts];

    // Add a font to library
    const addFont = async (font: { name: string, family: string }) => {
        try {
            const res = await fetch('/api/admin/fonts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(font)
            });
            if (res.ok) {
                await fetchFonts(); // Refresh list globaly
                return true;
            }
            return false;
        } catch (e) {
            return false;
        }
    };

    // Remove a font
    const removeFont = async (id: string) => {
        try {
            const res = await fetch(`/api/admin/fonts/${id}`, { method: 'DELETE' });
            if (res.ok) {
                await fetchFonts(); // Refresh list globally
                return true;
            }
            return false;
        } catch (e) {
            return false;
        }
    };

    return (
        <FontContext.Provider value={{
            allFonts,
            customFonts,
            isLoading,
            addFont,
            removeFont,
            refresh: fetchFonts
        }}>
            {children}
        </FontContext.Provider>
    );
}

export function useFontContext() {
    const context = useContext(FontContext);
    if (context === undefined) {
        throw new Error('useFontContext must be used within a FontProvider');
    }
    return context;
}
