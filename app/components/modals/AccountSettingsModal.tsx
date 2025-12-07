import React, { useState } from 'react';
import { User, AlertTriangle } from 'lucide-react';

export function AccountSettingsModal({ isOpen, onClose, isDarkMode, showToast, onLogout }: any) {
    const [currentUsername, setCurrentUsername] = useState('admin');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const inputClass = `w-full rounded-xl px-3 py-2.5 text-sm border transition-all focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none ${isDarkMode ? 'bg-slate-800/50 border-white/10' : 'bg-slate-50 border-slate-200'}`;

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
            <div className={`relative w-full max-w-sm rounded-3xl shadow-2xl p-8 border backdrop-blur-xl animate-in zoom-in-95 fade-in slide-in-from-bottom-4 duration-300 ease-out ${isDarkMode ? 'bg-slate-900/90 border-white/10' : 'bg-white/90 border-white/60'}`}>
                <div className="text-center mb-6">
                    <div className="w-12 h-12 bg-indigo-500/10 text-indigo-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <User size={24} />
                    </div>
                    <h2 className="text-xl font-bold">账号设置</h2>
                    <p className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>修改用户名或密码（留空保持不变）</p>
                </div>

                <form onSubmit={async (e) => {
                    e.preventDefault();
                    setLoading(true);
                    try {
                        const res = await fetch('/api/auth/account', {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                currentUsername,
                                currentPassword,
                                newUsername: newUsername || undefined,
                                newPassword: newPassword || undefined
                            })
                        });
                        const data = await res.json();

                        if (res.ok) {
                            if (data.usernameChanged || data.passwordChanged) {
                                showToast('修改成功，请重新登录', 'success');
                                onClose();
                                if (onLogout) onLogout();
                            } else {
                                showToast('未做任何修改', 'success');
                                onClose();
                            }
                        } else {
                            showToast(data.error || '修改失败', 'error');
                        }
                    } catch (err) {
                        showToast('请求失败', 'error');
                    } finally {
                        setLoading(false);
                    }
                }} className="space-y-4">

                    <div className="space-y-3">
                        <div className="pb-2 border-b border-slate-100 dark:border-white/5 space-y-3">
                            <div className="space-y-1">
                                <label className="text-xs font-medium opacity-60 ml-1">当前用户名</label>
                                <input className={inputClass} type="text" value={currentUsername} onChange={e => setCurrentUsername(e.target.value)} required placeholder="验证身份需输入" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-medium opacity-60 ml-1">当前密码</label>
                                <input className={inputClass} type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} required placeholder="验证身份需输入" />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-medium opacity-60 ml-1 text-indigo-500">新用户名 (选填)</label>
                            <input className={inputClass} type="text" value={newUsername} onChange={e => setNewUsername(e.target.value)} placeholder="留空保持不变" />
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-medium opacity-60 ml-1 text-indigo-500">新密码 (选填)</label>
                            <input className={inputClass} type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="留空保持不变" />
                        </div>
                    </div>

                    <div className="pt-2 flex gap-3">
                        <button type="button" onClick={onClose} className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors ${isDarkMode ? 'hover:bg-white/5 text-slate-400' : 'hover:bg-slate-100 text-slate-600'}`}>取消</button>
                        <button type="submit" disabled={loading} className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium shadow-lg shadow-indigo-500/20 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2">
                            {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : '保存更改'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
