import React from 'react';
import { ShadowDOM } from './ShadowDOM';

// --- HTML5 Content Section with DnD & Context Menu ---
export function HtmlSectionContent({ config, isDarkMode, isLoggedIn, onContextMenu, isOverlay }: any) {
    if (!config || !config.show || !config.content) return null;

    return (
        <div
            className={`flex justify-center duration-500 group relative ${isLoggedIn && !isOverlay ? 'cursor-grab active:cursor-grabbing' : ''} ${isOverlay ? 'cursor-grabbing scale-105' : 'animate-in fade-in slide-in-from-top-4'}`}
        >
            <ShadowDOM
                className={`w-full overflow-hidden rounded-2xl backdrop-blur-md border transition-all
           ${isDarkMode ? 'bg-slate-900/60 border-white/10 text-slate-200' : 'bg-white/60 border-white/40 text-slate-700'}
           ${isOverlay ? 'shadow-2xl ring-2 ring-indigo-500/50' : 'shadow-sm'}
         `}
                style={{
                    height: config.height || 'auto'
                }}
                content={config.content}
            />
            {/* Clickable overlay to capture right-click events (iframe blocks them otherwise) */}
            {isLoggedIn && !isOverlay && (
                <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center bg-indigo-500/10 border-2 border-indigo-500/50"
                    onContextMenu={(e) => {
                        e.preventDefault();
                        onContextMenu && onContextMenu(e, config);
                    }}
                >
                    <span className="bg-indigo-500 text-white text-xs px-2 py-1 rounded-md shadow-sm">右键编辑</span>
                </div>
            )}
        </div>
    );
}
