import React from 'react';

interface CategoryHeaderProps {
    category: string;
    color: string;
    isDarkMode: boolean;
    bgEnabled: boolean;
    compactMode: boolean;
}

export function CategoryHeader({
    category,
    color,
    isDarkMode,
    bgEnabled,
    compactMode
}: CategoryHeaderProps) {
    return (
        <div className={`relative flex items-center ${compactMode ? 'py-3 mb-3' : 'py-6 mb-6'}`}>
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className={`w-full h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent ${isDarkMode ? 'via-white/20' : 'via-slate-300'} ${bgEnabled ? '!via-white/30' : ''}`}></div>
            </div>
            <div className="relative flex justify-start w-full px-4 sm:px-0">
                <span className={`
          pl-4 pr-6 py-2 rounded-full text-sm font-bold tracking-wide
          backdrop-blur-md border shadow-sm flex items-center gap-3 transition-all select-none group
          ${bgEnabled
                        ? 'bg-black/40 border-white/20 text-white shadow-md text-shadow-sm'
                        : (isDarkMode ? 'bg-slate-900/80 border-white/10 text-slate-200' : 'bg-white/80 border-slate-200 text-slate-600')
                    }
        `}>
                    <span
                        className={`w-2 h-2 rounded-full animate-pulse shadow-[0_0_8px_currentColor]`}
                        style={{ backgroundColor: color }}></span>
                    {category}
                </span>
            </div>
        </div>
    );
}
