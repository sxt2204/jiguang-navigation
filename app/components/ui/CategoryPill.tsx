import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Hook to detect mobile for performance optimization
function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);
    return isMobile;
}

// Updated CategoryPill to support Custom Colors
export function CategoryPill({ label, active, onClick, isDarkMode, color, navColorMode, settings }: any) {
    const isMobile = useIsMobile();
    // 移动端禁用动画提升性能
    const enableAnimation = !isMobile && (settings?.enableTabSlide ?? true);

    if (navColorMode) {
        // Colorful Mode: Premium Glassy Look with Category Colors
        const textStyle = active ? { color: '#ffffff', textShadow: '0 1px 2px rgba(0,0,0,0.2)' } : { color: color };

        return (
            <button
                onClick={onClick}
                style={textStyle}
                className={`
                    relative px-3 md:px-6 py-1.5 md:py-2.5 rounded-full text-xs md:text-sm font-bold tracking-wide shrink-0 isolate
                    transition-all duration-300 active:scale-95 outline-none ring-0 focus-visible:ring-2 focus-visible:ring-indigo-500/50
                    ${!active ? 'hover:scale-105 opacity-80 hover:opacity-100' : ''}
                `}
            >
                {/* Background Layer */}
                {active && enableAnimation ? (
                    <motion.span
                        layoutId="activePillColorful"
                        className="absolute inset-0 rounded-full -z-10"
                        style={{
                            background: `linear-gradient(135deg, ${color}, ${color}dd)`,
                            boxShadow: `0 8px 20px -6px ${color}99`
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 350,
                            damping: 30
                        }}
                    />
                ) : (
                    <span
                        className="absolute inset-0 rounded-full -z-10 transition-colors"
                        style={{ backgroundColor: active ? color : 'transparent' }}
                    />
                )}

                <span className="relative z-10">{label}</span>
            </button>
        );
    }

    // Classic Mode: Standard Monochromatic / Brand Style
    return (
        <button
            onClick={onClick}
            className={`
                relative px-3 md:px-6 py-1.5 md:py-2.5 rounded-full text-xs md:text-sm font-bold tracking-wide shrink-0
                transition-all duration-300 active:scale-95
                outline-none ring-0 focus-visible:ring-2 focus-visible:ring-indigo-500/50
                ${active
                    ? 'text-white scale-105'
                    : (isDarkMode ? 'text-slate-400 hover:text-slate-100 hover:bg-white/10' : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-500/10')
                }
            `}>

            {/* Active Tab Background (Classic = Indigo Brand Color) */}
            {active && enableAnimation ? (
                <motion.span
                    layoutId="activePillClassic"
                    className="absolute inset-0 -z-10 bg-indigo-500 rounded-full"
                    style={{
                        boxShadow: '0 4px 12px -2px rgba(99,102,241,0.5)'
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 30
                    }}
                />
            ) : active && (
                <span className="absolute inset-0 -z-10 bg-indigo-500 rounded-full" />
            )}

            <span className="relative z-10">{label}</span>
        </button>
    );
}

