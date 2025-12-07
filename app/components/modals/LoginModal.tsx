import React, { useState } from 'react';
import { User, AlertTriangle } from 'lucide-react';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLogin: (u: string, p: string) => void;
    isDarkMode: boolean;
}

export function LoginModal({ isOpen, onClose, onLogin, isDarkMode }: LoginModalProps) {
    const [u, setU] = useState('');
    const [p, setP] = useState('');
    const [err, setErr] = useState('');
    const inputClass = `w-full rounded-xl px-3 py-2.5 text-sm border transition-all focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none ${isDarkMode ? 'bg-slate-800/50 border-white/10' : 'bg-slate-50 border-slate-200'}`;

    if (!isOpen) return null;

    return (<div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
        <div
            className={`relative w-full max-w-sm rounded-3xl shadow-2xl p-8 border backdrop-blur-xl animate-in zoom-in-95 fade-in slide-in-from-bottom-4 duration-300 ease-out ${isDarkMode ? 'bg-slate-900/90 border-white/10' : 'bg-white/90 border-white/60'}`}>
            <div className="text-center mb-8">
                <div
                    className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white shadow-lg shadow-indigo-500/30 transform rotate-3">
                    <User size={32} /></div>
                <h2 className="text-2xl font-bold">欢迎回来</h2><p
                    className="text-sm opacity-50 mt-2">请登录以管理您的导航站</p></div>
            <form onSubmit={e => {
                e.preventDefault();
                onLogin(u, p);
            }} className="space-y-4">
                <div className="space-y-1"><label className="text-xs font-medium opacity-60 ml-1">用户名</label><input
                    className={inputClass} placeholder="admin" value={u} onChange={e => setU(e.target.value)} /></div>
                <div className="space-y-1"><label className="text-xs font-medium opacity-60 ml-1">密码</label><input
                    className={inputClass} type="password" placeholder="••••••" value={p}
                    onChange={e => setP(e.target.value)} /></div>
                {err && <div className="p-3 rounded-xl bg-red-500/10 text-red-500 text-xs flex items-center gap-2">
                    <AlertTriangle size={14} />{err}</div>}
                <button
                    className="w-full py-3 rounded-xl bg-indigo-600 text-white font-medium mt-2 shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 hover:scale-[1.02] active:scale-95 transition-all">立即登录
                </button>
            </form>
        </div>
    </div>)
}
