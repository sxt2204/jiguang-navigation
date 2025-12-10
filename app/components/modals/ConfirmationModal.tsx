import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ConfirmationModalProps {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    isDarkMode: boolean;
    title?: string;
    message?: string;
    confirmText?: string;
    cancelText?: string;
    isDeletingFolder?: boolean;
    deleteContents?: boolean;
    setDeleteContents?: (val: boolean) => void;
}

export function ConfirmationModal({
    isOpen,
    onConfirm,
    onCancel,
    isDarkMode,
    title = '也就是手滑了一下？',
    message = '确定要删除这个站点吗？删除后无法恢复哦。',
    confirmText = '确认删除',
    cancelText = '我再想想',
    isDeletingFolder,
    deleteContents,
    setDeleteContents
}: ConfirmationModalProps) {
    return isOpen ? (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onCancel} />
            <div
                className={`relative w-full max-w-sm rounded-3xl p-6 shadow-2xl border backdrop-blur-xl animate-in zoom-in-95 fade-in slide-in-from-bottom-4 duration-300 ease-out ${isDarkMode ? 'bg-slate-900/90 border-white/10' : 'bg-white/90 border-white/60'}`}>
                <div className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center mb-4">
                    <AlertTriangle size={24} /></div>
                <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{title}</h3>
                <p className={`mb-6 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{message}</p>

                {isDeletingFolder && setDeleteContents && (
                    <div className="flex items-center gap-2 mb-6 p-3 rounded-lg bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20">
                        <input
                            type="checkbox"
                            id="delete-contents"
                            className="w-4 h-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                            checked={deleteContents}
                            onChange={e => setDeleteContents(e.target.checked)}
                        />
                        <label htmlFor="delete-contents" className={`text-sm select-none cursor-pointer ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                            同时删除文件夹内的所有内容
                        </label>
                    </div>
                )}

                <div className="flex justify-end gap-3">
                    <button onClick={onCancel}
                        className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-colors active:scale-95 ${isDarkMode ? 'hover:bg-white/5 text-slate-400' : 'hover:bg-slate-100 text-slate-600'}`}>取消
                    </button>
                    <button onClick={onConfirm}
                        className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-medium shadow-lg shadow-red-600/20 transition-all hover:scale-105 active:scale-95">确认删除
                    </button>
                </div>
            </div>
        </div>
    ) : null;
}
