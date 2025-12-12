import React from 'react';
import { useDroppable } from '@dnd-kit/core';

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
    const { setNodeRef } = useDroppable({
        id: category,
        data: { type: 'category', category }
    });

    return (
        <div ref={setNodeRef} className={`relative flex items-center ${compactMode ? 'py-3 mb-3' : 'py-6 mb-6'}`}>
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className={`w-full h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent ${isDarkMode ? 'via-white/5' : 'via-slate-200'} ${bgEnabled ? '!via-white/10' : ''}`}></div>
            </div>
            <div className="relative flex justify-start w-full px-4 sm:px-0">
                <span
                    className={`
                        pl-3 pr-5 py-2 rounded-2xl text-sm font-bold tracking-wide
                        backdrop-blur-xl border-0 ring-1 ring-white/20 shadow-lg flex items-center gap-3 transition-all select-none group
                        ${bgEnabled
                            ? 'bg-black/20 text-white'
                            : (isDarkMode ? 'bg-slate-900/40 text-slate-200' : 'bg-white/60 text-slate-700')
                        }
                    `}
                    style={{
                        boxShadow: `0 8px 32px -4px ${color}33, 0 4px 8px -2px ${color}11, inset 0 0 0 1px ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.5)'}`
                    }}
                >
                    <span
                        className={`w-1.5 h-1.5 rounded-full shadow-[0_0_8px_currentColor] animate-pulse`}
                        style={{ backgroundColor: color }}
                    ></span>
                    {category}
                </span>
            </div>
        </div>
    );
}
