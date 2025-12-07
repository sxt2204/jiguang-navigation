import React from 'react';
import { Search } from 'lucide-react';

interface EmptyStateProps {
    isDarkMode: boolean;
    mode: string;
}

export function EmptyState({ isDarkMode, mode }: EmptyStateProps) {
    return (
        <div className="col-span-full py-20 text-center animate-in fade-in duration-500">
            <div
                className={`inline-flex p-6 rounded-full mb-4 ${isDarkMode ? 'bg-white/5 text-slate-600' : 'bg-slate-100 text-slate-300'}`}>
                <Search size={40} /></div>
            <p className="text-lg font-medium opacity-60">{mode === 'filter' ? '没有找到相关内容' : '输入关键词搜索'}</p>
        </div>
    );
}
