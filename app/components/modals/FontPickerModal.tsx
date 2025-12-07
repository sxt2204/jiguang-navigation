'use client';

import { useState, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Search, X, Loader2, Check, DownloadCloud, Type } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFonts } from '@/app/hooks/useFonts';

interface FontPickerModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function FontPickerModal({ isOpen, onClose }: FontPickerModalProps) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const { addFont } = useFonts();
    const [addingId, setAddingId] = useState<string | null>(null);
    const [previewText, setPreviewText] = useState('');

    // Search function
    const searchFonts = useCallback(async (q: string) => {
        setIsLoading(true);
        try {
            const res = await fetch(`/api/admin/fonts/online?q=${encodeURIComponent(q)}`);
            const data = await res.json();
            setResults(data.fonts || []);
        } catch (e) {
            console.error('Search failed', e);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Initial load
    useEffect(() => {
        if (isOpen && results.length === 0) {
            searchFonts('');
        }
    }, [isOpen, searchFonts, results.length]);

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            if (isOpen) searchFonts(query);
        }, 500);
        return () => clearTimeout(timer);
    }, [query, isOpen, searchFonts]);

    if (!isOpen) return null;

    // Use Portal to escape stacking contexts (fixing the clipping issue)
    return createPortal(
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 font-sans text-slate-900">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />

            <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 10 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 10 }}
                className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-white/10 overflow-hidden flex flex-col max-h-[85vh]"
            >
                {/* Header */}
                <div className="p-4 border-b border-slate-100 dark:border-white/5 flex flex-col gap-3 shrink-0">
                    <div className="flex items-center gap-3">
                        <Search className="text-slate-400" size={20} />
                        <input
                            className="flex-1 bg-transparent outline-none text-base text-slate-700 dark:text-white placeholder:text-slate-400"
                            placeholder="搜索 Google Fonts (例如: Roboto, Great Vibes)..."
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            autoFocus
                        />
                        <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-full transition-colors">
                            <X size={20} className="opacity-50" />
                        </button>
                    </div>
                    {/* Preview Text Input */}
                    <div className="flex items-center gap-2 px-1">
                        <Type size={16} className="text-slate-400" />
                        <input
                            className="flex-1 bg-slate-50 dark:bg-white/5 rounded-lg px-3 py-1.5 text-sm outline-none border border-transparent focus:border-indigo-500/50 transition-all text-slate-700 dark:text-slate-200 placeholder:text-slate-400/70"
                            placeholder="输入自定义预览文字..."
                            value={previewText}
                            onChange={e => setPreviewText(e.target.value)}
                        />
                    </div>
                </div>

                {/* List */}
                <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-20 opacity-50 gap-3">
                            <Loader2 className="animate-spin text-indigo-500" size={32} />
                            <p className="text-sm">正在搜索字体...</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {results.map((font: any) => (
                                <div key={font.family} className="group p-3 rounded-xl border border-slate-100 dark:border-white/5 hover:border-indigo-500/50 dark:hover:border-indigo-500/50 transition-all bg-slate-50 dark:bg-white/5 hover:bg-white dark:hover:bg-slate-800">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <h3 className="font-bold text-sm text-slate-700 dark:text-white">{font.family}</h3>
                                            <div className="flex items-center gap-2 mt-0.5">
                                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-200 dark:bg-white/10 opacity-70">{font.category}</span>
                                                <span className="text-[10px] opacity-40">{font.variants?.length || 1} variants</span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={async () => {
                                                setAddingId(font.family);
                                                const success = await addFont({ name: font.family, family: font.family });
                                                if (success) onClose(); // Optional: close on add or just show feedback
                                                setAddingId(null);
                                            }}
                                            disabled={addingId === font.family}
                                            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all disabled:opacity-50 disabled:scale-100 shadow-sm shadow-indigo-500/20"
                                        >
                                            {addingId === font.family ? <Loader2 size={12} className="animate-spin" /> : <DownloadCloud size={12} />}
                                            添加
                                        </button>
                                    </div>

                                    {/* Preview Area */}
                                    <div className="relative h-20 flex items-center justify-center text-2xl overflow-hidden rounded-lg bg-white dark:bg-black/20 border border-slate-100 dark:border-white/5"
                                        style={{ fontFamily: `"${font.family}", sans-serif` }}
                                    >
                                        {/* Use FULL FONT URL (not previewUrl) to allow custom text rendering */}
                                        <style dangerouslySetInnerHTML={{ __html: `@import url('${font.url}');` }} />

                                        <span className="truncate max-w-[90%] px-2 z-10 relative text-2xl">
                                            {previewText || font.family}
                                        </span>

                                        {/* Background pattern for transparency check */}
                                        <div className="absolute inset-0 opacity-5"
                                            style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    {!isLoading && results.length === 0 && (
                        <div className="text-center py-20 opacity-40">
                            <Type size={48} className="mx-auto mb-4 opacity-50" />
                            <p>未找到相关字体</p>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>,
        document.body
    );
}
