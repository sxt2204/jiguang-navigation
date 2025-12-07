import React from 'react';
import { motion } from 'framer-motion';

export function SiteSkeleton({ isDarkMode, settings, count = 10 }: any) {
    // Generate an array for the skeleton items
    const items = Array.from({ length: count });

    return (
        <>
            {items.map((_, i) => (
                <div
                    key={i}
                    className={`relative overflow-hidden rounded-2xl border transition-all h-full ${isDarkMode ? 'bg-slate-800/40 border-white/5' : 'bg-white/40 border-slate-200/60'}`}
                    style={{
                        height: settings?.cardHeight || 160,
                        backdropFilter: 'blur(8px)'
                    }}
                >
                    {/* Shimmer Effect */}
                    <motion.div
                        className="absolute inset-0 -translate-x-full z-10"
                        animate={{ translateX: ['-100%', '100%'] }}
                        transition={{
                            repeat: Infinity,
                            duration: 1.5,
                            ease: "linear",
                            delay: i * 0.1 // Staggered delay for organic feel
                        }}
                        style={{
                            background: `linear-gradient(90deg, transparent 0%, ${isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.4)'} 50%, transparent 100%)`
                        }}
                    />

                    <div className="relative z-0 h-full flex flex-col p-4 justify-between opacity-50">
                        {/* Header: Icon + Title */}
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-3 w-full">
                                {/* Icon Placehoder */}
                                <div className={`w-10 h-10 rounded-xl flex-shrink-0 ${isDarkMode ? 'bg-slate-700' : 'bg-slate-200'}`} />

                                {/* Title Placeholder */}
                                <div className={`h-5 rounded-md w-24 ${isDarkMode ? 'bg-slate-700' : 'bg-slate-200'}`} />
                            </div>
                        </div>

                        {/* Description Lines */}
                        <div className="space-y-2 mt-4">
                            <div className={`h-3 rounded w-full ${isDarkMode ? 'bg-slate-700/50' : 'bg-slate-200/50'}`} />
                            <div className={`h-3 rounded w-2/3 ${isDarkMode ? 'bg-slate-700/50' : 'bg-slate-200/50'}`} />
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}
