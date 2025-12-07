import React, { useState, useEffect, useRef } from 'react';
import { ImagePlus, X, RefreshCw, UploadCloud, Trash2 } from 'lucide-react';

interface WallpaperManagerProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (url: string) => void;
    isDarkMode: boolean;
    showToast: (message: string, type?: 'success' | 'error' | 'loading' | 'info') => void;
}

export function WallpaperManager({ isOpen, onClose, onSelect, isDarkMode, showToast }: WallpaperManagerProps) {
    const [activeTab, setActiveTab] = useState('bing'); // 'bing' | 'custom'
    const [wallpapers, setWallpapers] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const fetchWallpapers = async (type: string) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/wallpapers?type=${type}`);
            if (res.ok) {
                setWallpapers(await res.json());
            }
        } catch (e) {
            showToast('获取壁纸失败', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isOpen) fetchWallpapers(activeTab);
    }, [isOpen, activeTab]);

    const handleUpload = async (e: any) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            showToast('正在上传...', 'loading');
            const res = await fetch('/api/wallpapers', {
                method: 'POST',
                body: formData
            });
            if (res.ok) {
                showToast('上传成功', 'success');
                fetchWallpapers('custom');
            } else {
                showToast('上传失败', 'error');
            }
        } catch (e) {
            showToast('上传出错', 'error');
        }
    };

    const handleSyncBing = async () => {
        try {
            showToast('正在同步 Bing 壁纸...', 'loading');
            const res = await fetch('/api/wallpapers/bing', { method: 'POST' });
            if (res.ok) {
                showToast('同步成功', 'success');
                fetchWallpapers('bing');
            } else {
                showToast('同步失败', 'error');
            }
        } catch (e) {
            showToast('同步出错', 'error');
        }
    };

    const handleDelete = async () => {
        if (selectedIds.length === 0) return;
        if (!confirm(`确定删除选中的 ${selectedIds.length} 张壁纸吗？`)) return;

        try {
            for (const id of selectedIds) {
                await fetch(`/api/wallpapers?id=${id}`, { method: 'DELETE' });
            }
            showToast('删除成功', 'success');
            setSelectedIds([]);
            fetchWallpapers(activeTab);
        } catch (e) {
            showToast('删除失败', 'error');
        }
    };

    const toggleSelect = (id: string) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter(i => i !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
            <div className={`relative w-full max-w-5xl max-h-[85vh] h-full rounded-3xl shadow-2xl border backdrop-blur-xl flex flex-col overflow-hidden animate-in zoom-in-95 fade-in duration-300 ${isDarkMode ? 'bg-slate-900/95 border-white/10' : 'bg-white/95 border-white/60'}`}>

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-white/5">
                    <h2 className="text-lg font-bold flex items-center gap-2">
                        <ImagePlus size={20} className="text-indigo-500" /> 壁纸管理
                    </h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                        <X size={20} className="opacity-50" />
                    </button>
                </div>

                {/* Toolbar */}
                <div className="px-6 py-3 flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/5 shrink-0">
                    <div className="flex bg-slate-200/50 dark:bg-white/10 p-1 rounded-xl">
                        <button onClick={() => setActiveTab('bing')}
                            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'bing' ? 'bg-white dark:bg-slate-800 shadow-sm text-indigo-500' : 'opacity-60 hover:opacity-100'}`}>
                            Bing 壁纸
                        </button>
                        <button onClick={() => setActiveTab('custom')}
                            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'custom' ? 'bg-white dark:bg-slate-800 shadow-sm text-indigo-500' : 'opacity-60 hover:opacity-100'}`}>
                            自定义上传
                        </button>
                    </div>

                    <div className="flex gap-2 items-center flex-wrap">
                        <button onClick={() => {
                            if (selectedIds.length === wallpapers.length) {
                                setSelectedIds([]);
                            } else {
                                setSelectedIds(wallpapers.map(w => w.id));
                            }
                        }} className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 text-sm font-medium hover:bg-slate-200 dark:hover:bg-white/20 transition-colors">
                            {selectedIds.length === wallpapers.length ? '取消全选' : '全选'}
                        </button>
                        {selectedIds.length > 0 && (
                            <button onClick={handleDelete} className="px-3 py-1.5 rounded-lg bg-red-500/10 text-red-500 text-sm font-medium hover:bg-red-500/20 transition-colors flex items-center gap-1">
                                <Trash2 size={14} /> 删除 ({selectedIds.length})
                            </button>
                        )}
                        {activeTab === 'bing' ? (
                            <button onClick={handleSyncBing} className="px-3 py-1.5 rounded-lg bg-indigo-500 text-white text-sm font-medium hover:bg-indigo-600 transition-colors flex items-center gap-1 shadow-lg shadow-indigo-500/20">
                                <RefreshCw size={14} /> 同步今日壁纸
                            </button>
                        ) : (
                            <button onClick={() => fileInputRef.current?.click()} className="px-3 py-1.5 rounded-lg bg-indigo-500 text-white text-sm font-medium hover:bg-indigo-600 transition-colors flex items-center gap-1 shadow-lg shadow-indigo-500/20">
                                <UploadCloud size={14} /> 上传图片
                            </button>
                        )}
                        <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleUpload} />
                    </div>
                </div>

                {/* Grid */}
                <div className="flex-1 overflow-y-auto p-6 custom-scrollbar min-h-0">
                    {loading ? (
                        <div className="flex items-center justify-center h-full opacity-50">
                            <RefreshCw size={32} className="animate-spin" />
                        </div>
                    ) : wallpapers.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full opacity-50 gap-2">
                            <ImagePlus size={48} />
                            <p>暂无壁纸</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 pb-20">
                            {wallpapers.map((w) => (
                                <div key={w.id} className={`group relative aspect-video rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${selectedIds.includes(w.id) ? 'border-indigo-500 ring-2 ring-indigo-500/20' : 'border-transparent hover:border-indigo-500/50'}`}
                                    onClick={() => onSelect(w.url)}>
                                    <img src={w.url} className="w-full h-full object-cover" loading="lazy" />
                                    <div className="absolute top-2 right-2 z-20 p-2"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleSelect(w.id);
                                        }}>
                                        <input type="checkbox" checked={selectedIds.includes(w.id)}
                                            readOnly
                                            className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer shadow-sm" />
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[10px] p-1.5 truncate">
                                        {w.filename}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
