import React from 'react';
import { Moon, Sun } from 'lucide-react';

interface ThemeToggleProps {
    isDarkMode: boolean;
    toggleTheme: () => void;
}

export function ThemeToggle({ isDarkMode, toggleTheme }: ThemeToggleProps) {
    return (
        <button
            onClick={toggleTheme}
            className={`p-2.5 rounded-xl transition-all duration-300 active:scale-95 overflow-hidden relative ${isDarkMode ? 'bg-white/5 text-yellow-300 hover:bg-white/10' : 'bg-slate-100 text-orange-500 hover:bg-slate-200'
                }`}
        >
            <div className="relative z-10">
                {isDarkMode ? (
                    <Moon size={20} className="fill-current" />
                ) : (
                    <Sun size={20} className="fill-current" />
                )}
            </div>
        </button>
    );
}
