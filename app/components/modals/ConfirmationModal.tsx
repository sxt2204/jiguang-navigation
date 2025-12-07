import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ConfirmationModalProps {
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
    isDarkMode: boolean;
}

export function ConfirmationModal({ isOpen, title, message, onConfirm, onCancel, isDarkMode }: ConfirmationModalProps) {
    return isOpen ? (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onCancel} />
            <div
                className={`relative w-full max-w-sm rounded-3xl p-6 shadow-2xl border backdrop-blur-xl animate-in zoom-in-95 fade-in slide-in-from-bottom-4 duration-300 ease-out ${isDarkMode ? 'bg-slate-900/90 border-white/10' : 'bg-white/90 border-white/60'}`}>
                <div className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center mb-4">
                    <AlertTriangle size={24} /></div>
                <h3 className="font-bold text-xl mb-2">{title}</h3><p
                    className="text-sm opacity-60 mb-6 leading-relaxed">{message}</p>
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
