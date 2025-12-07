import { motion } from 'framer-motion';

// Updated CategoryPill to support Custom Colors
export function CategoryPill({ label, active, onClick, isDarkMode, color, navColorMode, settings }: any) {
    if (navColorMode) {
        // Colorful Mode: Premium Glassy Look
        const textStyle = active ? { color: '#ffffff', textShadow: '0 1px 2px rgba(0,0,0,0.2)' } : { color: color };

        return (
            <button
                onClick={onClick}
                style={textStyle}
                className={`
                    relative px-5 py-2 rounded-full text-sm font-bold tracking-wide shrink-0 isolate
                    transition-colors duration-300 active:scale-95 outline-none ring-0 focus-visible:ring-2 focus-visible:ring-indigo-500/50
                    ${!active ? 'hover:brightness-110' : ''}
                `}
            >
                {/* Background Layer */}
                {active && (settings?.enableTabSlide ?? true) ? (
                    <motion.span
                        layoutId="activePillColorful"
                        className="absolute inset-0 rounded-full -z-10"
                        style={{
                            background: `linear-gradient(135deg, ${color}, ${color}dd)`,
                            boxShadow: `0 4px 12px -2px ${color}60`
                        }}
                        transition={{
                            type: "spring",
                            bounce: 0.2,
                            duration: 0.6 / (settings?.tabIntensity ?? 1)
                        }}
                    />
                ) : (
                    <span
                        className="absolute inset-0 rounded-full -z-10"
                        style={{ backgroundColor: `${color}15` }}
                    />
                )}

                <span className="relative z-10">{label}</span>
            </button>
        );
    }

    // Classic Mode
    return (
        <button
            onClick={onClick}
            className={`
                relative px-5 py-2 rounded-full text-sm font-bold tracking-wide shrink-0
                transition-[color,background-color,transform] duration-300 active:scale-95
                outline-none ring-0 focus-visible:ring-2 focus-visible:ring-indigo-500/50
                ${active
                    ? 'text-white scale-105 text-shadow-sm'
                    : (isDarkMode ? 'text-slate-400 hover:text-slate-100 hover:bg-white/10' : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-500/10')
                }
            `}>

            {/* Active Tab Background (Animated) */}
            {active && (settings?.enableTabSlide ?? true) && (
                <motion.span
                    layoutId="activePillClassic"
                    className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 bg-[length:200%_auto] animate-gradient-move rounded-full"
                    style={{
                        boxShadow: '0 4px 20px -4px rgba(99,102,241,0.5)'
                    }}
                    transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6 / (settings?.tabIntensity ?? 1)
                    }}
                />
            )}

            <span className="relative z-10">{label}</span>
        </button>
    );
}

