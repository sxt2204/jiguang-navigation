import React, { useState, useEffect } from 'react';
import { X, Code } from 'lucide-react';

export function HtmlEditModal({ section, isDarkMode, onClose, onSave }: any) {
    const [content, setContent] = useState('');
    const [height, setHeight] = useState('');
    const [width, setWidth] = useState('');

    useEffect(() => {
        if (section) {
            setContent(section.content || '');
            setHeight(section.height || '');
            setWidth(section.width || '');
        }
    }, [section]);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity" onClick={onClose} />
            <div className={`relative w-full max-w-4xl rounded-3xl shadow-2xl border flex flex-col max-h-[90vh] animate-in zoom-in-95 fade-in duration-300 ${isDarkMode ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-100'}`}>

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-white/5">
                    <h2 className="text-lg font-bold flex items-center gap-2.5">
                        <div className={`p-2 rounded-xl ${isDarkMode ? 'bg-indigo-500/20 text-indigo-400' : 'bg-indigo-50 text-indigo-600'}`}>
                            <Code size={18} />
                        </div>
                        编辑 HTML 内容
                    </h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors active:scale-90">
                        <X size={20} className="opacity-50" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-6 sm:p-8 flex flex-col gap-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-medium opacity-70 ml-1 mb-1.5 block">高度 (如 200px, auto)</label>
                            <input
                                className={`w-full rounded-xl px-3 py-2.5 text-sm border outline-none ${isDarkMode ? 'bg-slate-800/50 border-white/10' : 'bg-slate-50 border-slate-200'}`}
                                value={height} onChange={e => setHeight(e.target.value)} placeholder="auto"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-medium opacity-70 ml-1 mb-1.5 block">宽度 (如 100%, 800px)</label>
                            <input
                                className={`w-full rounded-xl px-3 py-2.5 text-sm border outline-none ${isDarkMode ? 'bg-slate-800/50 border-white/10' : 'bg-slate-50 border-slate-200'}`}
                                value={width} onChange={e => setWidth(e.target.value)} placeholder="100%"
                            />
                        </div>
                    </div>
                    <div className="flex-1 min-h-[300px] flex flex-col">
                        <label className="text-xs font-medium opacity-70 ml-1 mb-1.5 block">HTML 代码</label>
                        <textarea
                            className={`flex-1 w-full rounded-xl p-4 text-sm font-mono border outline-none resize-none ${isDarkMode ? 'bg-slate-800/50 border-white/10 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'}`}
                            value={content} onChange={e => setContent(e.target.value)}
                            placeholder="<div>Your HTML content here...</div>"
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-slate-100 dark:border-white/5 flex justify-end gap-3">
                    <button onClick={onClose} className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-colors ${isDarkMode ? 'hover:bg-white/5 text-slate-400' : 'hover:bg-slate-100 text-slate-600'}`}>取消</button>
                    <button onClick={() => onSave({ ...section, content, height, width })} className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium shadow-lg shadow-indigo-500/20 transition-all hover:scale-105 active:scale-95">保存更改</button>
                </div>
            </div>
        </div>
    );
}
