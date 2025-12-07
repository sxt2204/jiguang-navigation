import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ActionButtonProps {
    icon: LucideIcon;
    onClick: () => void;
    isDarkMode?: boolean;
    highlight?: boolean;
    active?: boolean;
    danger?: boolean;
    tooltip?: string;
}

export function ActionButton({ icon: Icon, onClick, isDarkMode, highlight, active, danger, tooltip }: ActionButtonProps) {
    return (
        <button
            onClick={onClick}
            title={tooltip}
            className={`p-2.5 rounded-xl transition-all duration-200 relative group active:scale-95 ${highlight
                    ? 'bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105'
                    : active
                        ? (isDarkMode ? 'bg-white/10 text-white' : 'bg-slate-100 text-slate-900')
                        : (isDarkMode ? 'text-slate-400 hover:text-white hover:bg-white/10' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100')
                } ${danger && !highlight ? 'hover:text-red-500 hover:bg-red-500/10' : ''}`}
        >
            <Icon size={20} strokeWidth={highlight ? 2.5 : 2} />
        </button>
    );
}
