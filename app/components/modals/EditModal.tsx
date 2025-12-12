import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Edit3, Plus, X, Link as LinkIcon, Sparkles, UploadCloud, LayoutGrid,
    RefreshCw, ChevronDown, Check, CheckCircle2, Type, Search, Eye, EyeOff
} from 'lucide-react';
import { SiteCard } from '@/app/components/site/SiteCard';
import { NOISE_BASE64, getRandomColor } from '@/lib/utils';
import { ICON_MAP, FONTS } from '@/lib/constants';
import { useFonts } from '@/app/hooks/useFonts';
import { FontPickerModal } from '@/app/components/modals/FontPickerModal';

export function EditModal({ site, categories, sites, isDarkMode, onClose, onSave, settings }: any) {
    const [f, setF] = useState({
        name: '',
        url: '',
        desc: '',
        category: categories[0] || '',
        color: getRandomColor(),
        icon: 'Globe',
        iconType: 'auto',
        customIconUrl: '',
        titleColor: '',
        descColor: '',
        titleFont: '',
        descFont: '',
        titleSize: '',
        descSize: '',
        isHidden: false,
        type: 'site',
        parentId: ''
    });
    const [isCatOpen, setIsCatOpen] = useState(false);
    const [isFontPickerOpen, setIsFontPickerOpen] = useState(false);
    const { allFonts } = useFonts();
    const iconInputRef = useRef<HTMLInputElement>(null);
    const lastFetchedUrl = useRef<string>('');

    useEffect(() => {
        if (site) setF({ ...site, iconType: site.iconType || 'auto', isHidden: site.isHidden || false, type: site.type || 'site', parentId: site.parentId || '' });
    }, [site]);

    const inputClass = `w-full rounded-xl px-3 py-2.5 text-sm border transition-all focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none ${isDarkMode ? 'bg-slate-800/50 border-white/10 placeholder:text-slate-500' : 'bg-slate-50 border-slate-200 placeholder:text-slate-400'}`;
    const labelClass = "text-xs font-medium opacity-70 ml-1 mb-1.5 block";

    const handleIconUpload = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev: any) => setF({ ...f, customIconUrl: ev.target.result, iconType: 'upload' });
            reader.readAsDataURL(file);
        }
    };

    // Construct a preview site object
    const previewSite = {
        ...f,
        id: -1, // Dummy ID
    };

    // Mock settings for preview if not provided (fallback)
    const previewSettings = settings || {
        cardHeight: 180,
        glassOpacity: 70,
        colorfulCards: false,
        bgEnabled: false
    };

    // Use the actual settings for the preview to ensure consistency
    const displaySettings = {
        ...previewSettings,
        // cardHeight: 160 // REMOVED: Do not override height
    };

    return (
        <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className="absolute inset-0 bg-black/30 transition-opacity"
                style={{ backdropFilter: `blur(${settings?.dialogBlur ?? 12}px)` }}
                onClick={onClose}
                initial={(settings?.enableModalAnim ?? true) ? { opacity: 0 } : { opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={(settings?.enableModalAnim ?? true) ? { opacity: 0 } : { opacity: 0 }}
            />

            <motion.div
                className={`relative w-full max-w-3xl rounded-3xl shadow-2xl border flex flex-col max-h-[90vh] ${isDarkMode ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-100'}`}
                initial={(settings?.enableModalAnim ?? true) ? { scale: 0.95, opacity: 0, y: 20 } : { opacity: 1, scale: 1, y: 0 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={(settings?.enableModalAnim ?? true) ? { scale: 0.95, opacity: 0, y: 20 } : { opacity: 0 }}
                transition={{
                    type: "spring",
                    stiffness: 300 * (settings?.modalIntensity ?? 1),
                    damping: 25
                }}
            >

                {/* Header */}
                <div
                    className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-white/5">
                    <h2 className="text-lg font-bold flex items-center gap-2.5">
                        <div
                            className={`p-2 rounded-xl ${isDarkMode ? 'bg-indigo-500/20 text-indigo-400' : 'bg-indigo-50 text-indigo-600'}`}>
                            {site ? <Edit3 size={18} /> : <Plus size={18} />}
                        </div>
                        {site ? '编辑站点' : '添加新站点'}
                    </h2>
                    <button onClick={onClose}
                        className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors active:scale-90">
                        <X size={20} className="opacity-50" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-6 sm:p-8">
                    <form id="site-form" onSubmit={e => {
                        e.preventDefault();
                        onSave(f);
                    }} className="flex flex-col gap-8">

                        {/* Type Selection */}
                        <div className={`p-1 rounded-xl flex ${isDarkMode ? 'bg-slate-800' : 'bg-slate-100'}`}>
                            {[
                                { id: 'site', label: '普通站点' },
                                { id: 'folder', label: '文件夹' }
                            ].map(t => (
                                <button
                                    key={t.id}
                                    type="button"
                                    onClick={() => setF({ ...f, type: t.id })}
                                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${f.type === t.id ? 'bg-white dark:bg-slate-700 shadow-sm text-indigo-600 dark:text-indigo-400' : 'opacity-60 hover:opacity-100'}`}
                                >
                                    {t.label}
                                </button>
                            ))}
                        </div>

                        {/* 1. URL Section - Only for Sites */}
                        {f.type === 'site' && (
                            <div className="relative group">
                                <div
                                    className={`absolute left-3 top-3.5 transition-colors ${isDarkMode ? 'text-slate-500 group-focus-within:text-indigo-400' : 'text-slate-400 group-focus-within:text-indigo-500'}`}>
                                    <LinkIcon size={18} /></div>
                                <input
                                    required={f.type === 'site'}
                                    autoFocus={!site}
                                    className={`w-full pl-10 pr-4 py-3 rounded-xl text-base border-2 outline-none transition-all ${isDarkMode ? 'bg-slate-800/50 border-white/5 focus:border-indigo-500/50' : 'bg-slate-50 border-slate-100 focus:border-indigo-500/30'} focus:ring-4 focus:ring-indigo-500/10`}
                                    value={f.url}
                                    onChange={e => setF({ ...f, url: e.target.value })}
                                    onKeyDown={async (e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            let val = f.url.trim();
                                            if (!val) return;

                                            // Auto-prepend https://
                                            if (!/^https?:\/\//i.test(val)) {
                                                val = 'https://' + val;
                                                setF(prev => ({ ...prev, url: val }));
                                            }

                                            // Fetch metadata on Enter key
                                            try {
                                                const urlChanged = val !== lastFetchedUrl.current;
                                                lastFetchedUrl.current = val;
                                                const res = await fetch(`/api/metadata?url=${encodeURIComponent(val)}`);
                                                if (res.ok) {
                                                    const data = await res.json();
                                                    setF(prev => ({
                                                        ...prev,
                                                        name: data.title || prev.name,
                                                        desc: (urlChanged || data.description) ? data.description : prev.desc
                                                    }));
                                                }
                                            } catch (e) {
                                                console.error('Failed to fetch title', e);
                                            }
                                        }
                                    }}
                                    onBlur={async () => {
                                        let val = f.url.trim();
                                        if (f.type === 'site' && !val) return; // Only return early for missing URL if type is 'site'.
                                        if (!/^https?:\/\//i.test(val)) {
                                            val = 'https://' + val;
                                            setF(prev => ({ ...prev, url: val }));
                                        }
                                        if (!site) {
                                            try {
                                                const urlChanged = val !== lastFetchedUrl.current;
                                                lastFetchedUrl.current = val;
                                                const res = await fetch(`/api/metadata?url=${encodeURIComponent(val)}`);
                                                if (res.ok) {
                                                    const data = await res.json();
                                                    setF(prev => ({
                                                        ...prev,
                                                        name: data.title || prev.name,
                                                        desc: (urlChanged || data.description) ? data.description : prev.desc
                                                    }));
                                                }
                                            } catch (e) {
                                                console.error('Failed to fetch title', e);
                                            }
                                        }
                                    }}
                                    placeholder="输入网站链接 (例如 google.com)"
                                />
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                            {/* Left Column: Visuals & Style (5 cols) */}
                            <div className="md:col-span-5 flex flex-col gap-6">
                                <div className="space-y-2">
                                    <label className={labelClass}>卡片预览</label>
                                    <div className={`w-full pointer-events-none select-none p-6 rounded-2xl border ${isDarkMode ? 'bg-slate-900 border-white/5' : 'bg-slate-50 border-slate-100'}`}
                                        style={{ backgroundImage: `url("${NOISE_BASE64}")` }}>
                                        <SiteCard
                                            site={previewSite}
                                            isLoggedIn={true}
                                            isDarkMode={isDarkMode}
                                            settings={displaySettings}
                                            isOverlay={false}
                                        />
                                    </div>
                                </div>

                                <div className={`p-1 rounded-xl flex ${isDarkMode ? 'bg-slate-800' : 'bg-slate-100'}`}>
                                    {[
                                        { id: 'auto', label: '自动', icon: Sparkles },
                                        { id: 'upload', label: '上传', icon: UploadCloud },
                                        { id: 'library', label: '图库', icon: LayoutGrid }
                                    ].map(tab => (
                                        <button
                                            key={tab.id}
                                            type="button"
                                            onClick={() => setF({ ...f, iconType: tab.id })}
                                            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-all ${f.iconType === tab.id ? 'bg-white dark:bg-slate-700 shadow-sm text-indigo-600 dark:text-indigo-400' : 'opacity-60 hover:opacity-100'}`}
                                        >
                                            <tab.icon size={14} />
                                            {tab.label}
                                        </button>
                                    ))}
                                </div>

                                <div
                                    className={`rounded-xl border p-4 min-h-[120px] flex flex-col items-center justify-center text-center transition-all ${isDarkMode ? 'bg-slate-800/30 border-white/5' : 'bg-slate-50/50 border-slate-100'}`}>
                                    {f.iconType === 'auto' && (
                                        <div className="space-y-2 animate-in fade-in">
                                            <div
                                                className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
                                                <Sparkles size={20} /></div>
                                            <p className="text-xs opacity-60">根据网址自动抓取图标</p>
                                        </div>
                                    )}
                                    {f.iconType === 'upload' && (
                                        <div onClick={() => iconInputRef.current?.click()}
                                            className="w-full h-full flex flex-col items-center justify-center cursor-pointer hover:opacity-70 transition-opacity animate-in fade-in">
                                            <UploadCloud size={24} className="mb-2 opacity-40" />
                                            <p className="text-xs opacity-60">点击上传 (PNG/SVG)</p>
                                            <input type="file" ref={iconInputRef} className="hidden" accept="image/*"
                                                onChange={handleIconUpload} />
                                        </div>
                                    )}
                                    {f.iconType === 'library' && (
                                        <div
                                            className="grid grid-cols-5 gap-2 w-full max-h-[120px] overflow-y-auto custom-scrollbar animate-in fade-in">
                                            {Object.keys(ICON_MAP).map(iconName => {
                                                const I = ICON_MAP[iconName];
                                                return (
                                                    <button type="button" key={iconName}
                                                        onClick={() => setF({ ...f, icon: iconName })}
                                                        className={`aspect-square rounded-lg flex items-center justify-center transition-all ${f.icon === iconName ? 'bg-indigo-500 text-white shadow-md' : 'hover:bg-black/5 dark:hover:bg-white/10 text-slate-400'}`}>
                                                        <I size={18} />
                                                    </button>
                                                )
                                            })}
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className={labelClass}>主题色</label>
                                    <div className="flex flex-wrap gap-2">
                                        {['#3B82F6', '#8B5CF6', '#EC4899', '#F97316', '#10B981', '#64748B'].map(c => (
                                            <button key={c} type="button" onClick={() => setF({ ...f, color: c })}
                                                className={`w-6 h-6 rounded-full transition-transform hover:scale-110 ring-2 ring-offset-2 dark:ring-offset-slate-900 ${f.color === c ? 'ring-indigo-500 scale-110' : 'ring-transparent'}`}
                                                style={{ backgroundColor: c }}
                                            />
                                        ))}
                                        <div className="w-px h-6 bg-slate-200 dark:bg-white/10 mx-1"></div>
                                        <div className="relative group">
                                            <div
                                                className="w-6 h-6 rounded-full bg-gradient-to-br from-red-400 to-blue-400 cursor-pointer ring-2 ring-offset-2 dark:ring-offset-slate-900 ring-transparent group-hover:scale-110 transition-transform"></div>
                                            <input type="color" value={f.color}
                                                onChange={e => setF({ ...f, color: e.target.value })}
                                                className="absolute inset-0 opacity-0 cursor-pointer" />
                                        </div>
                                        <button type="button" onClick={() => setF({ ...f, color: getRandomColor() })}
                                            className="ml-auto text-xs text-indigo-500 hover:underline flex items-center gap-1">
                                            <RefreshCw size={12} /> 随机
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Details (7 cols) */}
                            <div className="md:col-span-7 flex flex-col gap-5">
                                <input required className={inputClass} value={f.name}
                                    onChange={e => setF({ ...f, name: e.target.value })}
                                    placeholder="例如: Google" />

                                {/* Visibility Toggle */}
                                <div className="flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/5">
                                    <div className="flex items-center gap-2.5">
                                        <div className={`p-2 rounded-lg ${f.isHidden ? 'bg-indigo-500/10 text-indigo-500' : 'bg-slate-200 dark:bg-white/10 text-slate-500'}`}>
                                            {f.isHidden ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium">隐藏此站点</span>
                                            <span className="text-[10px] opacity-50">开启后仅对管理员可见 (变暗显示)</span>
                                        </div>
                                    </div>
                                    <div
                                        onClick={() => setF({ ...f, isHidden: !f.isHidden })}
                                        className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors duration-300 ${f.isHidden ? 'bg-indigo-500' : 'bg-slate-300 dark:bg-slate-600'}`}
                                    >
                                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-all duration-300 ${f.isHidden ? 'left-7' : 'left-1'}`} />
                                    </div>
                                </div>

                                <div className="relative">
                                    <label className={labelClass}>所属分类</label>
                                    <div className="relative">
                                        <button type="button" onClick={() => setIsCatOpen(!isCatOpen)}
                                            className={`${inputClass} flex items-center justify-between text-left active:scale-[0.99]`}>
                                            <span
                                                className={!f.category ? 'opacity-50' : ''}>{f.category || '选择分类'}</span>
                                            <ChevronDown size={16}
                                                className={`opacity-50 transition-transform duration-200 ${isCatOpen ? 'rotate-180' : ''}`} />
                                        </button>
                                        {isCatOpen && (
                                            <>
                                                <div className="fixed inset-0 z-10"
                                                    onClick={() => setIsCatOpen(false)} />
                                                <div
                                                    className={`absolute top-full left-0 right-0 mt-2 p-1.5 rounded-xl border shadow-xl z-20 max-h-60 overflow-y-auto custom-scrollbar animate-in fade-in zoom-in-95 duration-200 ${isDarkMode ? 'bg-slate-800 border-white/10' : 'bg-white border-slate-100'}`}>
                                                    {categories.map((c: string) => (
                                                        <button type="button" key={c} onClick={() => {
                                                            // If category changes, reset parentId because folders are category-specific
                                                            const newParentId = (f.category !== c) ? '' : f.parentId;
                                                            setF({ ...f, category: c, parentId: newParentId });
                                                            setIsCatOpen(false);
                                                        }}
                                                            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors flex items-center justify-between group ${f.category === c ? 'bg-indigo-500/10 text-indigo-500' : (isDarkMode ? 'hover:bg-white/5 text-slate-300' : 'hover:bg-slate-50 text-slate-600')}`}>
                                                            {c}
                                                            {f.category === c && <Check size={14} />}
                                                        </button>
                                                    ))}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Parent Folder Selection - Only for Sites */}
                                {f.type === 'site' && (
                                    <div className="relative">
                                        <label className={labelClass}>所属文件夹</label>
                                        <div className="relative">
                                            <select
                                                className={`${inputClass} appearance-none cursor-pointer`}
                                                value={f.parentId || ''}
                                                onChange={e => setF({ ...f, parentId: e.target.value })}
                                            >
                                                <option value="">(无 - 根目录)</option>
                                                {sites && sites
                                                    .filter((s: any) => s.type === 'folder' && s.id !== site?.id && s.category === f.category)
                                                    .map((folder: any) => (
                                                        <option key={folder.id} value={folder.id}>{folder.name}</option>
                                                    ))}
                                            </select>
                                            <ChevronDown size={16} className="absolute right-3 top-3.5 opacity-50 pointer-events-none" />
                                        </div>
                                    </div>
                                )}

                                <div className="flex-1">
                                    <label className={labelClass}>简介描述</label>
                                    <textarea rows={4}
                                        className={`${inputClass} resize-none h-full min-h-[100px] leading-relaxed`}
                                        value={f.desc} onChange={e => setF({ ...f, desc: e.target.value })}
                                        placeholder="简短的描述网站用途..." />
                                </div>



                                {/* Per-Site Typography Customization */}
                                <div className="pt-4 border-t border-slate-100 dark:border-white/5 space-y-3 animate-in slide-in-from-bottom-2 fade-in duration-500 delay-100">
                                    <label className="text-xs font-bold opacity-70 flex items-center gap-1.5"><Type size={12} /> 个性化样式 (可选)</label>
                                    <div className="grid grid-cols-1 gap-4">
                                        {/* Title Style */}
                                        <div>
                                            <label className="text-[10px] opacity-50 mb-1.5 block">标题样式</label>
                                            <div className="flex items-center gap-2">
                                                <select
                                                    className={`flex-1 h-9 text-xs rounded-lg px-2 border outline-none cursor-pointer ${isDarkMode ? 'bg-slate-800 border-white/10' : 'bg-slate-50 border-slate-200'}`}
                                                    value={f.titleFont || ''}
                                                    onChange={e => setF({ ...f, titleFont: e.target.value })}
                                                >
                                                    <option value="">默认字体</option>
                                                    {allFonts.map(font => <option key={font.id} value={font.id}>{font.name}</option>)}
                                                </select>
                                                <button type="button" onClick={() => setIsFontPickerOpen(true)} className={`h-9 w-9 flex items-center justify-center rounded-lg border transition-colors ${isDarkMode ? 'bg-slate-800 border-white/10 hover:bg-white/10' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'}`} title="添加更多字体">
                                                    <Search size={14} className="opacity-50" />
                                                </button>
                                                <input
                                                    type="number"
                                                    placeholder="15"
                                                    min={10} max={40}
                                                    className={`w-14 h-9 text-center text-xs rounded-lg border outline-none ${isDarkMode ? 'bg-slate-800 border-white/10' : 'bg-slate-50 border-slate-200'}`}
                                                    value={f.titleSize || ''}
                                                    onChange={e => setF({ ...f, titleSize: e.target.value })}
                                                    title="字体大小 (px)"
                                                />
                                                <div className="relative group/color">
                                                    <div className={`w-8 h-9 rounded-lg border flex items-center justify-center transition-all ${isDarkMode ? 'border-white/10' : 'border-slate-200'} ${!f.titleColor ? 'bg-transparent' : ''}`}
                                                        style={{ backgroundColor: f.titleColor || 'transparent' }}>
                                                        <Type size={14} className={f.titleColor ? 'text-white mix-blend-difference' : 'opacity-30'} />
                                                    </div>
                                                    <input type="color" className="absolute inset-0 opacity-0 cursor-pointer"
                                                        value={f.titleColor || '#000000'}
                                                        onChange={e => setF({ ...f, titleColor: e.target.value })} />
                                                    {f.titleColor && (
                                                        <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full cursor-pointer z-10 hover:scale-110"
                                                            onClick={(e) => { e.preventDefault(); setF({ ...f, titleColor: '' }); }} title="Reset Color">
                                                            <X size={8} className="text-white mx-auto mt-[1px]" />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Desc Style */}

                                        <div>
                                            <label className="text-[10px] opacity-50 mb-1.5 block">简介样式</label>
                                            <div className="flex items-center gap-2">
                                                <select
                                                    className={`flex-1 h-9 text-xs rounded-lg px-2 border outline-none cursor-pointer ${isDarkMode ? 'bg-slate-800 border-white/10' : 'bg-slate-50 border-slate-200'}`}
                                                    value={f.descFont || ''}
                                                    onChange={e => setF({ ...f, descFont: e.target.value })}
                                                >
                                                    <option value="">默认字体</option>
                                                    {allFonts.map(font => <option key={font.id} value={font.id}>{font.name}</option>)}
                                                </select>
                                                <button type="button" onClick={() => setIsFontPickerOpen(true)} className={`h-9 w-9 flex items-center justify-center rounded-lg border transition-colors ${isDarkMode ? 'bg-slate-800 border-white/10 hover:bg-white/10' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'}`} title="添加更多字体">
                                                    <Search size={14} className="opacity-50" />
                                                </button>
                                                <input
                                                    type="number"
                                                    placeholder="12"
                                                    min={10} max={40}
                                                    className={`w-14 h-9 text-center text-xs rounded-lg border outline-none ${isDarkMode ? 'bg-slate-800 border-white/10' : 'bg-slate-50 border-slate-200'}`}
                                                    value={f.descSize || ''}
                                                    onChange={e => setF({ ...f, descSize: e.target.value })}
                                                    title="字体大小 (px)"
                                                />
                                                <div className="relative group/color">
                                                    <div className={`w-8 h-9 rounded-lg border flex items-center justify-center transition-all ${isDarkMode ? 'border-white/10' : 'border-slate-200'} ${!f.descColor || 'bg-transparent'}`}
                                                        style={{ backgroundColor: f.descColor || 'transparent' }}>
                                                        <Type size={14} className={f.descColor ? 'text-white mix-blend-difference' : 'opacity-30'} />
                                                    </div>
                                                    <input type="color" className="absolute inset-0 opacity-0 cursor-pointer"
                                                        value={f.descColor || '#64748b'}
                                                        onChange={e => setF({ ...f, descColor: e.target.value })} />
                                                    {f.descColor && (
                                                        <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full cursor-pointer z-10 hover:scale-110"
                                                            onClick={(e) => { e.preventDefault(); setF({ ...f, descColor: '' }); }} title="Reset Color">
                                                            <X size={8} className="text-white mx-auto mt-[1px]" />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Footer Actions */}
                <div
                    className="px-6 py-4 border-t border-slate-100 dark:border-white/5 flex justify-end gap-3 bg-slate-50/50 dark:bg-white/5 rounded-b-3xl backdrop-blur-xl">
                    <button type="button" onClick={onClose}
                        className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-colors active:scale-95 ${isDarkMode ? 'text-slate-400 hover:bg-white/10' : 'text-slate-600 hover:bg-slate-200/50'}`}>取消
                    </button>
                    <button onClick={() => onSave(f)}
                        className="px-8 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/40 hover:scale-105 transition-all active:scale-95 flex items-center gap-2">
                        <CheckCircle2 size={16} /> 保存
                    </button>
                </div>
            </motion.div >

            <FontPickerModal
                isOpen={isFontPickerOpen}
                onClose={() => setIsFontPickerOpen(false)}
            />
        </motion.div >
    );
}
