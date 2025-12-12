import React, { useState, useRef } from 'react';
import {
    Palette, ImageIcon, Layout, Globe, List, Settings, X, Type, ZoomIn, CheckCircle2,
    PaintBucket, ImagePlus, RefreshCw, UploadCloud, Move, Lock, Code, Plus, Trash2,
    HardDrive, Download, EyeOff, Eye, ArrowUp, ArrowDown, GripVertical, Image as WallpaperIcon,
    Sparkles, MousePointer2, Hand, LayoutList, Layers, ExternalLink, ChevronRight, ChevronDown, Share2,
    Edit3, Check
} from 'lucide-react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
    DragEndEvent
} from '@dnd-kit/core';
import {
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    arrayMove
} from '@dnd-kit/sortable';


import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import { FONTS, FRESH_BACKGROUND_COLORS, SOCIAL_ICONS } from '@/lib/constants';
import { RangeControl } from '@/app/components/ui/RangeControl';
import { NewCategoryInput } from '@/app/components/settings/NewCategoryInput';
import { BackgroundPositionPreview } from '@/app/components/settings/BackgroundPositionPreview';
import { WallpaperManager } from '@/app/components/settings/WallpaperManager';
import { SortableCategoryItem, SortableDragHandle } from '@/app/components/dnd/SortableItem';
import { SortableSiteItem } from '@/app/components/settings/SortableSiteItem';
import { AnimationControl } from '@/app/components/settings/AnimationControl';
import { useFonts } from '@/app/hooks/useFonts';
import { FontPickerModal } from '@/app/components/modals/FontPickerModal';
import { ConfirmationModal } from '@/app/components/modals/ConfirmationModal';

interface SettingsPanelProps {
    isDarkMode: boolean;
    onClose: () => void;
    activeTab: string;
    setActiveTab: (tab: string) => void;
    layoutSettings: any;
    setLayoutSettings: (settings: any) => void;
    categories: string[];
    categoryColors: Record<string, string>;
    setCategoryColors: (colors: Record<string, string>) => void;
    handleAddCategory: (category: string) => void;
    handleDeleteCategory: (category: string) => void;
    toggleCategoryVisibility: (category: string) => void;
    hiddenCategories: string[];
    sites: any[];
    setSites: (sites: any[]) => void;
    setCategories: (categories: string[]) => void;
    moveCategory: (oldIndex: number, newIndex: number) => void;
    handleImportData: (data: any) => void;
    appConfig: any;
    setAppConfig: (config: any) => void;
    showToast: (message: string, type?: 'success' | 'error' | 'loading' | 'info') => void;
    isWallpaperManagerOpen: boolean;
    setIsWallpaperManagerOpen: (isOpen: boolean) => void;
    setBingWallpaper: (quality: string) => void;
    setIsModalOpen: (isOpen: boolean) => void;
    setEditingSite: (site: any) => void;
    onDeleteSite: (site: any) => void;
    searchEngine: string; // [NEW] Added for export
}

export function SettingsPanel({
    isDarkMode,
    onClose,
    activeTab,
    setActiveTab,
    layoutSettings,
    setLayoutSettings,
    categories,
    categoryColors,
    setCategoryColors,
    handleAddCategory,
    handleDeleteCategory,
    toggleCategoryVisibility,
    hiddenCategories,
    sites,
    setSites,
    setCategories,
    moveCategory,
    handleImportData,
    appConfig,
    setAppConfig,
    showToast,
    isWallpaperManagerOpen,
    searchEngine, // [NEW] Destructure prop
    setIsWallpaperManagerOpen,
    setBingWallpaper,
    setIsModalOpen,
    setEditingSite,
    onDeleteSite
}: SettingsPanelProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const logoInputRef = useRef<HTMLInputElement>(null);
    const wallpaperInputRef = useRef<HTMLInputElement>(null);
    const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

    const toggleCategoryExpand = (category: string) => {
        setExpandedCategories(prev =>
            prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
        );
    };
    const [bingQuality, setBingQuality] = useState('uhd');
    const { allFonts, removeFont } = useFonts();
    const [isFontPickerOpen, setIsFontPickerOpen] = useState(false);
    const [fontToDelete, setFontToDelete] = useState<any>(null);

    const [renamingCategory, setRenamingCategory] = useState<string | null>(null);
    const [renameValue, setRenameValue] = useState('');

    const handleRename = async () => {
        if (!renamingCategory || !renameValue.trim() || renamingCategory === renameValue.trim()) {
            setRenamingCategory(null);
            return;
        }
        const oldName = renamingCategory;
        const newName = renameValue.trim();

        if (categories.includes(newName)) {
            showToast('分类名称已存在', 'error');
            return;
        }

        try {
            const res = await fetch('/api/categories', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ oldName, newName })
            });

            if (res.ok) {
                // Update Categories List
                setCategories(categories.map(c => c === oldName ? newName : c));

                // Update Sites
                setSites(sites.map(s => s.category === oldName ? { ...s, category: newName } : s));

                // Update Colors
                if (categoryColors[oldName]) {
                    const newColors = { ...categoryColors };
                    newColors[newName] = newColors[oldName];
                    delete newColors[oldName];
                    setCategoryColors(newColors);
                }

                setRenamingCategory(null);
                showToast('分类重命名成功');
            } else {
                showToast('重命名失败', 'error');
            }
        } catch (e) {
            showToast('请求失败', 'error');
        }
    };

    const sensors = useSensors(
        useSensor(MouseSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 250,
                tolerance: 5,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragOver = (event: any) => {
        const { active, over } = event;
        if (!over) return;
        if (active.id === over.id) return;

        const isCategory = (id: any) => categories.includes(id);

        // Site sorting/nesting logic
        if (isCategory(over.id) && !isCategory(active.id)) {
            // Dragging a site over a Category Header -> Move to Root of that Category
            const activeSite = sites.find(s => s.id === active.id);
            // Allow moving ANY site to this category (unless it's already a root site there)
            if (activeSite && (activeSite.category !== over.id || activeSite.parentId)) {
                const newItems = sites.map(s => s.id === activeSite.id ? { ...s, parentId: null, category: over.id } : s);
                setSites(newItems);
            }
        }

        if (!isCategory(active.id) && !isCategory(over.id)) {
            const activeSite = sites.find(s => s.id === active.id);
            const overSite = sites.find(s => s.id === over.id);

            if (!activeSite || !overSite) return;

            // 1. Moving into a Folder
            if (overSite.type === 'folder' && activeSite.type !== 'folder') {
                // If hovering over a folder, move inside
                if (activeSite.parentId !== overSite.id) {
                    const newItems = sites.map(s => {
                        if (s.id === activeSite.id) {
                            return { ...s, parentId: overSite.id, category: overSite.category, order: 9999 }; // Append to end temporarily
                        }
                        return s;
                    });
                    setSites(newItems);
                }
            }

            // 2. Moving out of Folder (to Root of Category) logic is tricky in List view.

            // If overSite is Root and activeSite is Nested -> Move to Root (Same level as overSite).
            if (!overSite.parentId && activeSite.parentId) {
                // Move activeSite to Root (parentId: null)
                const newItems = sites.map(s => s.id === activeSite.id ? { ...s, parentId: null, category: overSite.category } : s);
                setSites(newItems);
            }

            // If overSite is Nested and activeSite is Root -> Move to Folder (Same level as overSite).
            if (overSite.parentId && !activeSite.parentId) {
                const newItems = sites.map(s => s.id === activeSite.id ? { ...s, parentId: overSite.parentId, category: overSite.category } : s);
                setSites(newItems);
            }

            // If both nested in different folders?
            if (activeSite.parentId && overSite.parentId && activeSite.parentId !== overSite.parentId) {
                const newItems = sites.map(s => s.id === activeSite.id ? { ...s, parentId: overSite.parentId, category: overSite.category } : s);
                setSites(newItems);
            }

            // [FIX] Cross-Category Drag (Root to Root)
            // If dragging from one category to another (and both are root items, or we decide to flatten)
            if (activeSite.category !== overSite.category) {
                // If overSite is in a folder, we already handled it above (Moving into Folder or Same Folder Level).
                // If overSite is Root, we just switch category.
                if (!overSite.parentId) {
                    const newItems = sites.map(s => s.id === activeSite.id ? { ...s, category: overSite.category, parentId: null } : s);
                    setSites(newItems);
                }
            }
        }
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over) return;

        const isCategory = (id: any) => categories.includes(id);

        if (active.id !== over.id) {
            // Category Reordering
            if (isCategory(active.id) && isCategory(over.id)) {
                const oldIndex = categories.indexOf(active.id as string);
                const newIndex = categories.indexOf(over.id as string);
                moveCategory(oldIndex, newIndex);
                // Note: Persistence for category order is handled by `moveCategory` if it updates a persistent state.
                // If categories are derived from sites, then site reordering will implicitly affect category order.
                return;
            }

            // Site Reordering
            if (!isCategory(active.id) && !isCategory(over.id)) {

                const oldIndex = sites.findIndex((item) => item.id === active.id);
                const newIndex = sites.findIndex((item) => item.id === over.id);

                if (oldIndex !== -1 && newIndex !== -1) {
                    const reordered = arrayMove(sites, oldIndex, newIndex).map((site: any, index: number) => ({
                        ...site,
                        order: index // Update order based on new position
                    }));

                    setSites(reordered);

                    // Persist immediately
                    fetch('/api/sites', {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(reordered)
                    }).catch(e => {
                        showToast('排序保存失败', 'error');
                        console.error(e);
                    });
                }
            }

            // Site dropped on Category (Persist the change made in handleDragOver)
            if (!isCategory(active.id) && isCategory(over.id)) {
                fetch('/api/sites', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(sites)
                }).catch(e => {
                    showToast('移动保存失败', 'error');
                    console.error(e);
                });
            }
        }
    };

    // ...



    const handleSyncBing = async () => {
        try {
            showToast('正在同步 Bing 壁纸...', 'loading');
            const res = await fetch('/api/wallpapers/bing', { method: 'POST' });
            if (res.ok) {
                showToast('同步成功', 'success');
            } else {
                showToast('同步失败', 'error');
            }
        } catch (e) {
            showToast('同步出错', 'error');
        }
    };

    const handleExport = async () => {
        let exportLayout = { ...layoutSettings };

        // Serialize Custom Wallpaper if exists
        if (layoutSettings.bgType === 'custom' && layoutSettings.bgColor && layoutSettings.bgColor.startsWith('/')) {
            try {
                showToast('正在打包壁纸...', 'loading');
                const res = await fetch(layoutSettings.bgColor);
                const blob = await res.blob();
                const base64 = await new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result);
                    reader.readAsDataURL(blob);
                });
                exportLayout.bgColor = base64; // Embed Base64
            } catch (e) {
                console.error('Failed to serialize wallpaper', e);
                showToast('壁纸打包失败，将仅导出引用', 'error');
            }
        }

        // Filter Custom Fonts
        const customFonts = allFonts.filter((f: any) => f.isCustom);

        // Fetch Todos and Countdowns
        let todos = [];
        let countdowns = [];
        try {
            const [todoRes, countdownRes] = await Promise.all([
                fetch('/api/todos'),
                fetch('/api/countdowns')
            ]);
            if (todoRes.ok) todos = await todoRes.json();
            if (countdownRes.ok) countdowns = await countdownRes.json();
        } catch (e) {
            console.error('Failed to fetch widget data', e);
            showToast('组件数据获取失败，将仅导出配置', 'error');
        }

        const data = JSON.stringify({
            sites,
            categories,
            categoryColors,
            layout: exportLayout,
            config: appConfig,
            hiddenCategories, // Export hidden state
            theme: { isDarkMode }, // Export theme
            searchEngine, // [NEW] Export Search Engine
            customFonts, // Export custom fonts
            todos, // Export todos
            countdowns // Export countdowns
        });

        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `jg_nav-backup-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        showToast('配置已导出', 'success');
    };

    const handleFileSelect = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e: any) => handleImportData(JSON.parse(e.target.result));
            reader.readAsText(file);
        }
    };

    const handleLogoUpload = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev: any) => setAppConfig({ ...appConfig, logoImage: ev.target.result });
            reader.readAsDataURL(file);
        }
    };

    const updateFooterLink = (index: number, field: string, value: string) => {
        const newLinks = [...(appConfig.footerLinks || [])];
        newLinks[index] = { ...newLinks[index], [field]: value };
        setAppConfig({ ...appConfig, footerLinks: newLinks });
    };

    const addFooterLink = () => {
        setAppConfig({ ...appConfig, footerLinks: [...(appConfig.footerLinks || []), { name: 'New Link', url: '#' }] });
    };

    const removeFooterLink = (index: number) => {
        const newLinks = [...(appConfig.footerLinks || [])];
        newLinks.splice(index, 1);
        setAppConfig({ ...appConfig, footerLinks: newLinks });
    };

    const tabs = [
        { id: 'appearance', label: '外观', icon: Palette },
        { id: 'animation', label: '动效', icon: Sparkles },
        { id: 'wallpaper', label: '壁纸', icon: ImageIcon },
        { id: 'layout', label: '布局', icon: Layout },
        { id: 'site', label: '网站', icon: Globe },
        { id: 'categories', label: '分类', icon: List },
        { id: 'advanced', label: '高级', icon: Settings }
    ];

    return (
        <TooltipProvider>
            <div
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 animate-in fade-in duration-300"
                style={{ backdropFilter: `blur(${layoutSettings.dialogBlur ?? 12}px)` }}
                onClick={onClose}>
                <div onClick={e => e.stopPropagation()}
                    className={`w-full max-w-4xl rounded-3xl shadow-2xl backdrop-blur-2xl border flex overflow-hidden h-[650px] max-h-[90vh] animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 ${isDarkMode ? 'bg-slate-900/95 border-white/10' : 'bg-white/95 border-slate-200/60'}`}>

                    {/* Enhanced Sidebar */}
                    <div
                        className={`w-64 flex-shrink-0 border-r p-5 flex flex-col gap-1.5 ${isDarkMode ? 'border-white/5 bg-gradient-to-b from-slate-800/50 to-slate-900/50' : 'border-slate-100 bg-gradient-to-b from-slate-50 to-white'}`}>

                        {/* Header with gradient icon */}
                        <div className="flex items-center gap-3 mb-5 px-2">
                            <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25">
                                <Settings size={18} />
                            </div>
                            <div>
                                <h3 className="text-base font-bold">控制中心</h3>
                                <p className="text-[10px] opacity-50">管理您的设置</p>
                            </div>
                        </div>

                        {/* Navigation Tabs */}
                        <div className="space-y-1">
                            {tabs.map(t => (
                                <Tooltip key={t.id}>
                                    <TooltipTrigger asChild>
                                        <button onClick={() => setActiveTab(t.id)}
                                            className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-3 transition-all duration-200 group
                        ${activeTab === t.id
                                                    ? (isDarkMode
                                                        ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/10 text-indigo-400 shadow-sm border border-indigo-500/20'
                                                        : 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-600 shadow-sm border border-indigo-100')
                                                    : (isDarkMode
                                                        ? 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                                                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900')
                                                }`}>
                                            <div className={`p-1.5 rounded-lg transition-all duration-200
                        ${activeTab === t.id
                                                    ? 'bg-indigo-500/20 text-indigo-500'
                                                    : 'bg-transparent group-hover:bg-slate-100 dark:group-hover:bg-white/10'}`}>
                                                <t.icon size={16} />
                                            </div>
                                            {t.label}
                                            {activeTab === t.id && (
                                                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                                            )}
                                        </button>
                                    </TooltipTrigger>
                                    <TooltipContent side="right" className="text-xs">
                                        {t.label}设置
                                    </TooltipContent>
                                </Tooltip>
                            ))}
                        </div>

                        <div className="flex-1" />

                        {/* Close Button */}
                        <Separator className="my-2 opacity-50" />
                        <button onClick={onClose}
                            className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-3 transition-all duration-200 hover:scale-[0.98] active:scale-95 ${isDarkMode ? 'text-slate-400 hover:bg-red-500/10 hover:text-red-400' : 'text-slate-500 hover:bg-red-50 hover:text-red-500'}`}>
                            <div className="p-1.5 rounded-lg">
                                <X size={16} />
                            </div>
                            关闭面板
                        </button>
                    </div>

                    {/* Content Area with ScrollArea */}
                    <ScrollArea className="flex-1">
                        <div className="p-6">

                            {/* 外观 Tab */}
                            {activeTab === 'appearance' && (<div className="space-y-5">
                                <div className="space-y-4">
                                    <h4 className="text-base font-bold opacity-80 flex items-center gap-2"><Type size={16} /> 全局字体</h4>
                                    <div className="p-3 rounded-xl border bg-indigo-500/5 border-indigo-500/10 mb-4">
                                        <div className="flex items-center gap-2 mb-3">
                                            <ZoomIn size={16} className="text-indigo-500" />
                                            <span className="text-sm font-bold text-indigo-500">界面缩放</span>
                                        </div>
                                        <RangeControl label="缩放比例" value={layoutSettings.fontSizeScale || 100} min={80} max={130}
                                            onChange={(v: number) => setLayoutSettings({ ...layoutSettings, fontSizeScale: v })} unit="%" />

                                        <div className="mt-4 pt-4 border-t border-indigo-500/10">
                                            <div className="flex items-center gap-2 mb-3">
                                                <Layers size={16} className="text-indigo-500" />
                                                <span className="text-sm font-bold text-indigo-500">卡片阴影</span>
                                            </div>
                                            <RangeControl label="投影强度" value={layoutSettings.shadowIntensity ?? 4} min={0} max={8}
                                                onChange={(v: number) => setLayoutSettings({ ...layoutSettings, shadowIntensity: v })} unit="级" />
                                            <p className="text-xs opacity-50 mt-2">增加数值以获得更强的立体投影效果，设置为 0 实现扁平化设计。</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        {allFonts.map(font => (
                                            <div key={font.id}
                                                className={`group p-3 rounded-xl border cursor-pointer transition-all active:scale-95 flex items-center justify-between ${layoutSettings.fontFamily === font.id ? 'bg-indigo-500/10 border-indigo-500 text-indigo-500' : (isDarkMode ? 'bg-white/5 border-white/5 hover:bg-white/10' : 'bg-slate-50 border-slate-100 hover:bg-slate-100')}`}>
                                                <div className="flex-1 flex items-center pr-2" onClick={() => setLayoutSettings({ ...layoutSettings, fontFamily: font.id })}>
                                                    <span className="text-sm font-medium truncate">{font.name}</span>
                                                    {layoutSettings.fontFamily === font.id && <CheckCircle2 size={16} className="ml-2 shrink-0" />}
                                                </div>

                                                {/* Delete button only for custom fonts */}
                                                {(font as any).isCustom && (
                                                    <button onClick={(e) => {
                                                        e.stopPropagation();
                                                        setFontToDelete(font);
                                                    }} className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-500 rounded-md transition-all">
                                                        <Trash2 size={14} />
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                        <button onClick={() => setIsFontPickerOpen(true)}
                                            className={`p-3 rounded-xl border border-dashed cursor-pointer transition-all active:scale-95 flex items-center justify-center gap-2 ${isDarkMode ? 'border-white/20 hover:bg-white/5 text-slate-400' : 'border-slate-300 hover:bg-slate-50 text-slate-500'}`}>
                                            <Plus size={16} /> <span className="text-sm font-medium">更多字体</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Typography Customization Section */}
                                <div className="mt-6 pt-6 border-t border-indigo-500/10 dark:border-white/5">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Type size={16} className="text-indigo-500" />
                                        <span className="text-sm font-bold text-indigo-500">卡片文字样式</span>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        {/* Title Settings */}
                                        <div className="space-y-3">
                                            <Label className="text-xs font-medium opacity-70">标题样式</Label>
                                            <div className="flex flex-col gap-2">
                                                <select
                                                    className={`w-full text-sm rounded-lg px-2 py-2 border outline-none cursor-pointer ${isDarkMode ? 'bg-slate-800 border-white/10' : 'bg-slate-50 border-slate-200'}`}
                                                    value={layoutSettings.globalTitleFont ?? 'system'}
                                                    onChange={(e) => {
                                                        console.log('[SettingsPanel] Changed globalTitleFont to:', e.target.value);
                                                        setLayoutSettings({ ...layoutSettings, globalTitleFont: e.target.value });
                                                    }}
                                                >
                                                    <option value="system">系统默认</option>
                                                    {allFonts.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
                                                </select>
                                                <div className="flex items-center gap-2">
                                                    <div className="relative w-full">
                                                        <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border w-full text-sm ${isDarkMode ? 'bg-slate-800 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
                                                            <div className="w-5 h-5 rounded-full shadow-sm shrink-0 border border-black/10"
                                                                style={{ backgroundColor: layoutSettings.globalTitleColor || 'transparent', backgroundImage: !layoutSettings.globalTitleColor ? 'linear-gradient(45deg, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%, #ddd), linear-gradient(45deg, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%, #ddd)' : 'none', backgroundSize: '8px 8px', backgroundPosition: '0 0, 4px 4px' }}
                                                            />
                                                            <span className="opacity-70 truncate">{layoutSettings.globalTitleColor || '自动颜色'}</span>
                                                            {/* Hidden Color Input */}
                                                            <input
                                                                type="color"
                                                                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                                                                value={layoutSettings.globalTitleColor || '#000000'}
                                                                onChange={(e) => setLayoutSettings({ ...layoutSettings, globalTitleColor: e.target.value })}
                                                            />
                                                        </div>
                                                    </div>
                                                    {layoutSettings.globalTitleColor && (
                                                        <Button variant="ghost" size="icon" className="h-9 w-9 shrink-0"
                                                            onClick={() => setLayoutSettings({ ...layoutSettings, globalTitleColor: '' })}>
                                                            <RefreshCw size={14} />
                                                        </Button>
                                                    )}
                                                </div>
                                                <div className="pt-2 px-1">
                                                    <div className="flex items-center justify-between text-[10px] opacity-60 mb-2">
                                                        <span>文字大小</span>
                                                        <span>{layoutSettings.globalTitleSize || 15}px</span>
                                                    </div>
                                                    <Slider
                                                        value={[layoutSettings.globalTitleSize || 15]}
                                                        min={12}
                                                        max={32}
                                                        step={1}
                                                        onValueChange={([v]) => setLayoutSettings({ ...layoutSettings, globalTitleSize: v })}
                                                        className="py-1"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Description Settings */}
                                        <div className="space-y-3">
                                            <Label className="text-xs font-medium opacity-70">简介样式</Label>
                                            <div className="flex flex-col gap-2">
                                                <select
                                                    className={`w-full text-sm rounded-lg px-2 py-2 border outline-none cursor-pointer ${isDarkMode ? 'bg-slate-800 border-white/10' : 'bg-slate-50 border-slate-200'}`}
                                                    value={layoutSettings.globalDescFont ?? 'system'}
                                                    onChange={(e) => setLayoutSettings({ ...layoutSettings, globalDescFont: e.target.value })}
                                                >
                                                    <option value="system">系统默认</option>
                                                    {allFonts.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
                                                </select>
                                                <div className="flex items-center gap-2">
                                                    <div className="relative w-full">
                                                        <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border w-full text-sm ${isDarkMode ? 'bg-slate-800 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
                                                            <div className="w-5 h-5 rounded-full shadow-sm shrink-0 border border-black/10"
                                                                style={{ backgroundColor: layoutSettings.globalDescColor || 'transparent', backgroundImage: !layoutSettings.globalDescColor ? 'linear-gradient(45deg, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%, #ddd), linear-gradient(45deg, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%, #ddd)' : 'none', backgroundSize: '8px 8px', backgroundPosition: '0 0, 4px 4px' }}
                                                            />
                                                            <span className="opacity-70 truncate">{layoutSettings.globalDescColor || '自动颜色'}</span>
                                                            <input
                                                                type="color"
                                                                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                                                                value={layoutSettings.globalDescColor || '#64748b'}
                                                                onChange={(e) => setLayoutSettings({ ...layoutSettings, globalDescColor: e.target.value })}
                                                            />
                                                        </div>
                                                    </div>
                                                    {layoutSettings.globalDescColor && (
                                                        <Button variant="ghost" size="icon" className="h-9 w-9 shrink-0"
                                                            onClick={() => setLayoutSettings({ ...layoutSettings, globalDescColor: '' })}>
                                                            <RefreshCw size={14} />
                                                        </Button>
                                                    )}
                                                </div>
                                                <div className="pt-2 px-1">
                                                    <div className="flex items-center justify-between text-[10px] opacity-60 mb-2">
                                                        <span>文字大小</span>
                                                        <span>{layoutSettings.globalDescSize || 12}px</span>
                                                    </div>
                                                    <Slider
                                                        value={[layoutSettings.globalDescSize || 12]}
                                                        min={10}
                                                        max={24}
                                                        step={1}
                                                        onValueChange={([v]) => setLayoutSettings({ ...layoutSettings, globalDescSize: v })}
                                                        className="py-1"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Separator className={isDarkMode ? 'bg-white/10' : 'bg-slate-200'} />
                                <div className="space-y-5">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="space-y-0.5">
                                                <h4 className="text-base font-bold opacity-80 flex items-center gap-2"><PaintBucket size={16} /> 多彩站点卡片</h4>
                                                <p className="text-xs opacity-50">为每个站点应用淡雅的背景色</p>
                                            </div>
                                            <Switch
                                                checked={layoutSettings.colorfulCards}
                                                onCheckedChange={(checked) => setLayoutSettings({ ...layoutSettings, colorfulCards: checked })}
                                            />
                                        </div>

                                        {layoutSettings.colorfulCards && (
                                            <div className="grid grid-cols-2 gap-3 animate-in fade-in slide-in-from-top-2 pt-2 pb-2">
                                                <div className={`p-3 rounded-xl border transition-all hover:border-indigo-500/50 ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
                                                    <RangeControl
                                                        label="色彩混合度"
                                                        value={layoutSettings.colorfulMixRatio ?? 40}
                                                        min={10} max={100} unit="%"
                                                        onChange={(v: number) => setLayoutSettings({ ...layoutSettings, colorfulMixRatio: v })}
                                                    />
                                                </div>
                                                <div className={`p-3 rounded-xl border transition-all hover:border-indigo-500/50 ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
                                                    <RangeControl
                                                        label="叠色透明度"
                                                        value={layoutSettings.colorfulOpacity ?? 60}
                                                        min={10} max={100} unit="%"
                                                        onChange={(v: number) => setLayoutSettings({ ...layoutSettings, colorfulOpacity: v })}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <h4 className="text-base font-bold opacity-80 flex items-center gap-2"><Palette size={16} /> 彩色导航条</h4>
                                            <p className="text-xs opacity-50">为分类标签启用多彩背景</p>
                                        </div>
                                        <Switch
                                            checked={layoutSettings.navColorMode}
                                            onCheckedChange={(checked) => setLayoutSettings({ ...layoutSettings, navColorMode: checked })}
                                        />
                                    </div>
                                </div>
                            </div>
                            )}


                            {/* 动效 Tab */}
                            {activeTab === 'animation' && (
                                <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2">
                                    <div className="space-y-4">
                                        <h4 className="text-base font-bold opacity-80 flex items-center gap-2">
                                            <Sparkles size={16} /> 交互动效
                                        </h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <AnimationControl
                                                label="悬停效果"
                                                description="卡片悬停时的上浮效果"
                                                enabled={layoutSettings.enableHover ?? true}
                                                setEnabled={(v) => setLayoutSettings({ ...layoutSettings, enableHover: v })}
                                                intensity={layoutSettings.hoverIntensity ?? 1}
                                                setIntensity={(v) => setLayoutSettings({ ...layoutSettings, hoverIntensity: v })}
                                                icon={<MousePointer2 size={14} className="text-indigo-500" />}
                                            />
                                            <AnimationControl
                                                label="点击反馈"
                                                description="点击卡片时的按压效果"
                                                enabled={layoutSettings.enableClick ?? true}
                                                setEnabled={(v) => setLayoutSettings({ ...layoutSettings, enableClick: v })}
                                                intensity={layoutSettings.clickIntensity ?? 1}
                                                setIntensity={(v) => setLayoutSettings({ ...layoutSettings, clickIntensity: v })}
                                                icon={<Hand size={14} className="text-emerald-500" />}
                                            />
                                            <AnimationControl
                                                label="拖拽平滑"
                                                description="拖拽排序时的过渡动画"
                                                enabled={layoutSettings.enableDrag ?? true}
                                                setEnabled={(v) => setLayoutSettings({ ...layoutSettings, enableDrag: v })}
                                                intensity={layoutSettings.dragIntensity ?? 1}
                                                setIntensity={(v) => setLayoutSettings({ ...layoutSettings, dragIntensity: v })}
                                                icon={<GripVertical size={14} className="text-amber-500" />}
                                            />
                                            <AnimationControl
                                                label="入场交错"
                                                description="分类切换时的瀑布流效果"
                                                enabled={layoutSettings.enableStagger ?? true}
                                                setEnabled={(v) => setLayoutSettings({ ...layoutSettings, enableStagger: v })}
                                                intensity={layoutSettings.staggerIntensity ?? 1}
                                                setIntensity={(v) => setLayoutSettings({ ...layoutSettings, staggerIntensity: v })}
                                                icon={<LayoutList size={14} className="text-pink-500" />}
                                            />
                                            <AnimationControl
                                                label="标签滑动"
                                                description="导航标签背景的滑动效果"
                                                enabled={layoutSettings.enableTabSlide ?? true}
                                                setEnabled={(v) => setLayoutSettings({ ...layoutSettings, enableTabSlide: v })}
                                                intensity={layoutSettings.tabIntensity ?? 1}
                                                setIntensity={(v) => setLayoutSettings({ ...layoutSettings, tabIntensity: v })}
                                                icon={<Move size={14} className="text-cyan-500" />}
                                            />
                                            <AnimationControl
                                                label="模态缩放"
                                                description="对话框的缩放进出动画"
                                                enabled={layoutSettings.enableModalAnim ?? true}
                                                setEnabled={(v) => setLayoutSettings({ ...layoutSettings, enableModalAnim: v })}
                                                intensity={layoutSettings.modalIntensity ?? 1}
                                                setIntensity={(v) => setLayoutSettings({ ...layoutSettings, modalIntensity: v })}
                                                icon={<Layers size={14} className="text-purple-500" />}
                                            />
                                        </div>
                                    </div>
                                    <div className="p-4 rounded-xl border bg-indigo-500/5 border-indigo-500/10 text-xs opacity-70">
                                        提示：减小强度值会使动画更慢/柔和，增加强度值会使动画更快/更Q弹。建议默认值为 1.0x。
                                    </div>
                                </div>
                            )}


                            {activeTab === 'wallpaper' && (
                                <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <h4 className="text-base font-bold opacity-80 flex items-center gap-2">
                                                <WallpaperIcon size={16} /> 背景壁纸</h4>
                                            <Switch
                                                checked={layoutSettings.bgEnabled}
                                                onCheckedChange={(checked) => setLayoutSettings({ ...layoutSettings, bgEnabled: checked })}
                                            />
                                        </div>

                                        {layoutSettings.bgEnabled && (
                                            <div className="space-y-5 animate-in fade-in slide-in-from-top-2">
                                                <ToggleGroup type="single" value={layoutSettings.bgType} onValueChange={(v) => v && setLayoutSettings({ ...layoutSettings, bgType: v, bgEnabled: true })} className="w-full justify-stretch bg-slate-100 dark:bg-white/5 p-1 rounded-xl">
                                                    <ToggleGroupItem value="bing" className="flex-1 data-[state=on]:bg-white dark:data-[state=on]:bg-slate-700 data-[state=on]:text-indigo-500 shadow-none rounded-lg">
                                                        <Globe size={16} className="mr-2" /> Bing
                                                    </ToggleGroupItem>
                                                    <ToggleGroupItem value="custom" className="flex-1 data-[state=on]:bg-white dark:data-[state=on]:bg-slate-700 data-[state=on]:text-indigo-500 shadow-none rounded-lg">
                                                        <ImagePlus size={16} className="mr-2" /> 自定义
                                                    </ToggleGroupItem>
                                                    <ToggleGroupItem value="color" className="flex-1 data-[state=on]:bg-white dark:data-[state=on]:bg-slate-700 data-[state=on]:text-indigo-500 shadow-none rounded-lg">
                                                        <Palette size={16} className="mr-2" /> 纯色
                                                    </ToggleGroupItem>
                                                </ToggleGroup>


                                                {/* Pure Color Settings */}
                                                {layoutSettings.bgType === 'color' && (
                                                    <div
                                                        className="space-y-4 p-3 rounded-xl border bg-slate-50 dark:bg-white/5 border-slate-100 dark:border-white/10 animate-in fade-in">
                                                        <div className="flex justify-between items-center">
                                                            <span className="text-sm font-medium opacity-70">清新淡雅配色</span>
                                                        </div>
                                                        <div className="grid grid-cols-5 gap-3">
                                                            {FRESH_BACKGROUND_COLORS.map(color => (
                                                                <button
                                                                    key={color}
                                                                    onClick={() => setLayoutSettings({
                                                                        ...layoutSettings,
                                                                        bgColor: color
                                                                    })}
                                                                    className={`h-10 rounded-lg border transition-transform hover:scale-105 active:scale-95 ${layoutSettings.bgColor === color ? 'ring-2 ring-indigo-500 ring-offset-2 dark:ring-offset-slate-900' : 'border-slate-200 dark:border-white/10'}`}
                                                                    style={{ backgroundColor: color }}
                                                                    title={color}
                                                                />
                                                            ))}
                                                        </div>

                                                        {/* Custom Color Picker */}
                                                        <div className="pt-2 border-t border-dashed border-slate-200 dark:border-white/10 flex items-center justify-between">
                                                            <span className="text-xs opacity-60">自定义颜色</span>
                                                            <div className="flex items-center gap-3 bg-white dark:bg-black/20 rounded-lg p-1 pr-3 border border-slate-100 dark:border-white/5">
                                                                <div className="relative w-8 h-8 rounded-md overflow-hidden ring-1 ring-black/5 cursor-pointer">
                                                                    <input
                                                                        type="color"
                                                                        value={layoutSettings.bgColor}
                                                                        onChange={(e) => setLayoutSettings({
                                                                            ...layoutSettings,
                                                                            bgColor: e.target.value
                                                                        })}
                                                                        className="absolute inset-0 w-full h-full p-0 border-0 opacity-0 cursor-pointer scale-150"
                                                                    />
                                                                    <div className="w-full h-full" style={{ backgroundColor: layoutSettings.bgColor }} />
                                                                </div>
                                                                <span className="text-xs font-mono opacity-80 uppercase">{layoutSettings.bgColor}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Bing Resolution Settings */}
                                                {layoutSettings.bgType === 'bing' && (
                                                    <div
                                                        className="p-3 rounded-xl border bg-indigo-500/5 border-indigo-500/20 text-center space-y-3">
                                                        <p className="text-sm text-indigo-500 font-medium">Bing
                                                            每日壁纸已启用，请选择清晰度：</p>
                                                        <div className="flex justify-center gap-2">
                                                            {[
                                                                { id: '1920x1080', label: '1080P 高清' },
                                                                { id: 'uhd', label: '4K 超清' },
                                                                { id: '1366x768', label: '手机版' }
                                                            ].map((opt) => (
                                                                <button
                                                                    key={opt.id}
                                                                    onClick={() => setBingWallpaper(opt.id)}
                                                                    className={`px-3 py-1.5 text-xs rounded-lg border transition-all active:scale-95 ${bingQuality === opt.id
                                                                        ? 'bg-indigo-500 text-white border-indigo-500'
                                                                        : 'bg-white/50 dark:bg-white/10 hover:bg-indigo-50 dark:hover:bg-white/20 border-transparent'}`}
                                                                >
                                                                    {opt.label}
                                                                </button>
                                                            ))}
                                                        </div>
                                                        <div className="pt-2 border-t border-indigo-500/10 mt-2 grid grid-cols-2 gap-2">
                                                            <button onClick={() => setIsWallpaperManagerOpen(true)}
                                                                className="py-2 rounded-lg text-sm font-medium text-indigo-600 hover:bg-indigo-500/10 transition-colors flex items-center justify-center gap-2">
                                                                <ImagePlus size={14} /> 管理壁纸
                                                            </button>
                                                            <button onClick={handleSyncBing}
                                                                className="py-2 rounded-lg text-sm font-medium text-indigo-600 hover:bg-indigo-500/10 transition-colors flex items-center justify-center gap-2">
                                                                <RefreshCw size={14} /> 同步壁纸
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}

                                                {layoutSettings.bgType === 'custom' && (
                                                    <>
                                                        {layoutSettings.bgUrl ? (
                                                            <div className="space-y-4 animate-in fade-in">
                                                                <BackgroundPositionPreview
                                                                    imageUrl={layoutSettings.bgUrl}
                                                                    x={layoutSettings.bgX ?? 50}
                                                                    y={layoutSettings.bgY ?? 50}
                                                                    scale={layoutSettings.bgScale ?? 100}
                                                                    onChange={(x: number, y: number) => setLayoutSettings({
                                                                        ...layoutSettings,
                                                                        bgX: x,
                                                                        bgY: y
                                                                    })}
                                                                />

                                                                <div className="flex gap-2">
                                                                    <button onClick={() => setIsWallpaperManagerOpen(true)}
                                                                        className={`flex-1 py-2 rounded-xl border text-sm font-medium transition-all active:scale-95 flex items-center justify-center gap-2 ${isDarkMode ? 'border-white/10 hover:bg-white/5' : 'border-slate-200 hover:bg-slate-50'}`}>
                                                                        <ImagePlus size={14} /> 管理壁纸库
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div onClick={() => setIsWallpaperManagerOpen(true)}
                                                                className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer hover:border-indigo-500 hover:bg-indigo-500/5 transition-all active:scale-95 group">
                                                                <div
                                                                    className="w-12 h-12 mx-auto bg-indigo-100 dark:bg-indigo-900/30 text-indigo-500 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                                                    <UploadCloud size={24} />
                                                                </div>
                                                                <h5 className="font-bold text-sm mb-1">选择或上传壁纸</h5>
                                                                <p className="text-xs opacity-50">支持 Bing 壁纸和自定义图片</p>
                                                            </div>
                                                        )}
                                                    </>
                                                )}

                                                {/* Shared Fine Tuning Grid for both Bing and Custom */}
                                                {layoutSettings.bgType !== 'color' && (
                                                    <div className="mt-6 pt-6 border-t border-dashed border-slate-200 dark:border-white/10 space-y-4">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <MousePointer2 size={16} className="text-indigo-500" />
                                                            <span className="text-sm font-bold opacity-80">精细调整</span>
                                                        </div>

                                                        <div className="grid grid-cols-2 gap-3">
                                                            <div className={`p-3 rounded-xl border transition-all hover:border-indigo-500/50 ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
                                                                <RangeControl label="缩放比例" value={layoutSettings.bgScale ?? 100}
                                                                    min={100} max={200} unit="%"
                                                                    onChange={(v: number) => setLayoutSettings({
                                                                        ...layoutSettings,
                                                                        bgScale: v
                                                                    })} />
                                                            </div>

                                                            <div className={`p-3 rounded-xl border transition-all hover:border-indigo-500/50 ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
                                                                <RangeControl label="遮罩浓度"
                                                                    value={layoutSettings.bgOpacity}
                                                                    min={0} max={90} unit="%"
                                                                    onChange={(v: number) => setLayoutSettings({
                                                                        ...layoutSettings,
                                                                        bgOpacity: v
                                                                    })}
                                                                />
                                                            </div>
                                                            <div className={`p-3 rounded-xl border transition-all hover:border-indigo-500/50 ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
                                                                <RangeControl label="水平位置" value={layoutSettings.bgX ?? 50}
                                                                    min={0} max={100} unit="%"
                                                                    onChange={(v: number) => setLayoutSettings({
                                                                        ...layoutSettings,
                                                                        bgX: v
                                                                    })} />
                                                            </div>
                                                            <div className={`p-3 rounded-xl border transition-all hover:border-indigo-500/50 ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
                                                                <RangeControl label="垂直位置" value={layoutSettings.bgY ?? 50}
                                                                    min={0} max={100} unit="%"
                                                                    onChange={(v: number) => setLayoutSettings({
                                                                        ...layoutSettings,
                                                                        bgY: v
                                                                    })} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    {isWallpaperManagerOpen && (
                                        <WallpaperManager
                                            isOpen={isWallpaperManagerOpen}
                                            onClose={() => setIsWallpaperManagerOpen(false)}
                                            onSelect={(url: string) => setLayoutSettings({ ...layoutSettings, bgUrl: url, bgType: 'custom' })}
                                            isDarkMode={isDarkMode}
                                            showToast={showToast}
                                        />
                                    )}
                                </div>
                            )}

                            {/* 布局 Tab */}
                            {activeTab === 'layout' && (<div className="space-y-6">
                                <div className="space-y-4"><h4 className="text-base font-bold opacity-80">界面选项</h4>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className={`flex items-center justify-between p-3 rounded-xl border transition-all hover:border-indigo-500/50 ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
                                            <Label htmlFor="wide-mode" className="cursor-pointer font-medium">宽屏模式</Label>
                                            <Switch id="wide-mode" checked={layoutSettings.isWideMode} onCheckedChange={(c) => setLayoutSettings({ ...layoutSettings, isWideMode: c })} />
                                        </div>
                                        <div className={`flex items-center justify-between p-3 rounded-xl border transition-all hover:border-indigo-500/50 ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
                                            <Label htmlFor="compact-mode" className="cursor-pointer font-medium">紧凑模式</Label>
                                            <Switch id="compact-mode" checked={layoutSettings.compactMode} onCheckedChange={(c) => setLayoutSettings({ ...layoutSettings, compactMode: c })} />
                                        </div>
                                        <div className={`flex items-center justify-between p-3 rounded-xl border transition-all hover:border-indigo-500/50 ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
                                            <Label htmlFor="show-widgets" className="cursor-pointer font-medium">显示仪表盘</Label>
                                            <Switch id="show-widgets" checked={layoutSettings.showWidgets} onCheckedChange={(c) => setLayoutSettings({ ...layoutSettings, showWidgets: c })} />
                                        </div>
                                        <div className={`flex items-center justify-between p-3 rounded-xl border transition-all hover:border-indigo-500/50 ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
                                            <Label htmlFor="show-navbar" className="cursor-pointer font-medium">显示导航条</Label>
                                            <Switch id="show-navbar" checked={layoutSettings.showNavBar ?? true} onCheckedChange={(c) => setLayoutSettings({ ...layoutSettings, showNavBar: c })} />
                                        </div>
                                        <div className={`flex items-center justify-between p-3 rounded-xl border transition-all hover:border-indigo-500/50 ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
                                            <Label htmlFor="sticky-header" className="cursor-pointer font-medium">固定页首</Label>
                                            <Switch id="sticky-header" checked={layoutSettings.stickyHeader} onCheckedChange={(c) => setLayoutSettings({ ...layoutSettings, stickyHeader: c })} />
                                        </div>
                                        <div className={`flex items-center justify-between p-3 rounded-xl border transition-all hover:border-indigo-500/50 ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
                                            <Label htmlFor="sticky-footer" className="cursor-pointer font-medium">固定页尾</Label>
                                            <Switch id="sticky-footer" checked={layoutSettings.stickyFooter} onCheckedChange={(c) => setLayoutSettings({ ...layoutSettings, stickyFooter: c })} />
                                        </div>

                                    </div>
                                </div>
                                <div className="space-y-4"><h4 className="text-base font-bold opacity-80">卡片样式</h4>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className={`p-3 rounded-xl border transition-all hover:border-indigo-500/50 ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
                                            <RangeControl label="卡片高度" value={layoutSettings.cardHeight} min={20} max={160}
                                                onChange={(v: number) => setLayoutSettings({ ...layoutSettings, cardHeight: v })} unit="px" />
                                        </div>
                                        <div className={`p-3 rounded-xl border transition-all hover:border-indigo-500/50 ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
                                            <RangeControl label="卡片圆角" value={layoutSettings.cardRadius ?? 16} min={0} max={32}
                                                onChange={(v: number) => setLayoutSettings({ ...layoutSettings, cardRadius: v })} unit="px" />
                                        </div>

                                        {/* Layout Mode Toggle */}
                                        <div className={`p-3 rounded-xl border transition-all hover:border-indigo-500/50 ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
                                            <div className="flex items-center justify-between mb-2">
                                                <Label className="cursor-pointer font-medium">布局模式</Label>
                                                <div className={`flex items-center p-1 rounded-lg ${isDarkMode ? 'bg-black/20' : 'bg-slate-200'}`}>
                                                    <button
                                                        onClick={() => setLayoutSettings({ ...layoutSettings, gridMode: 'auto' })}
                                                        className={`px-2 py-1 text-xs rounded-md transition-all ${(!layoutSettings.gridMode || layoutSettings.gridMode === 'auto') ? 'bg-white text-indigo-600 shadow-sm' : 'opacity-50'}`}
                                                    >自动宽度</button>
                                                    <button
                                                        onClick={() => setLayoutSettings({ ...layoutSettings, gridMode: 'fixed' })}
                                                        className={`px-2 py-1 text-xs rounded-md transition-all ${layoutSettings.gridMode === 'fixed' ? 'bg-white text-indigo-600 shadow-sm' : 'opacity-50'}`}
                                                    >固定列数</button>
                                                </div>
                                            </div>
                                            <p className="text-[10px] opacity-60">
                                                {(!layoutSettings.gridMode || layoutSettings.gridMode === 'auto')
                                                    ? '卡片保持设定宽度，自动计算每行数量'
                                                    : '每行固定显示指定数量的卡片，宽度自适应'}
                                            </p>
                                        </div>

                                        {/* Conditional Sliders based on Mode */}
                                        {(!layoutSettings.gridMode || layoutSettings.gridMode === 'auto') ? (
                                            <div className={`p-3 rounded-xl border transition-all hover:border-indigo-500/50 ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
                                                <RangeControl label="卡片宽度 (目标)" value={layoutSettings.cardWidth || 260} min={160} max={400}
                                                    onChange={(v: number) => setLayoutSettings({ ...layoutSettings, cardWidth: v })} unit="px" />
                                            </div>
                                        ) : (
                                            <div className={`p-3 rounded-xl border transition-all hover:border-indigo-500/50 ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
                                                <RangeControl label="每行数量" value={layoutSettings.gridCols} min={1} max={12}
                                                    onChange={(v: number) => setLayoutSettings({ ...layoutSettings, gridCols: v })} />
                                            </div>
                                        )}
                                        <div className={`p-3 rounded-xl border transition-all hover:border-indigo-500/50 ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
                                            <RangeControl label="网格间距" value={layoutSettings.gap} min={2} max={8}
                                                onChange={(v: number) => setLayoutSettings({ ...layoutSettings, gap: v })} />
                                        </div>
                                        <div className={`p-3 rounded-xl border transition-all hover:border-indigo-500/50 ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
                                            <RangeControl label="玻璃透明度" value={layoutSettings.glassOpacity} min={0} max={100}
                                                onChange={(v: number) => setLayoutSettings({ ...layoutSettings, glassOpacity: v })} unit="%" />
                                        </div>
                                        <div className={`p-3 rounded-xl border transition-all hover:border-indigo-500/50 ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
                                            <RangeControl label="磨砂模糊度" value={layoutSettings.cardBlur ?? 12} min={0} max={100}
                                                onChange={(v: number) => setLayoutSettings({ ...layoutSettings, cardBlur: v })} unit="%" />
                                        </div>
                                        <div className={`p-3 rounded-xl border transition-all hover:border-indigo-500/50 ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
                                            <RangeControl label="对话框模糊" value={layoutSettings.dialogBlur ?? 12} min={0} max={24}
                                                onChange={(v: number) => setLayoutSettings({ ...layoutSettings, dialogBlur: v })} unit="px" />
                                        </div>
                                    </div>
                                </div>
                            </div>)}

                            {/* 网站 Tab */}
                            {activeTab === 'site' && (
                                <div className="space-y-5">
                                    <div className="space-y-4">
                                        <h4 className="text-base font-bold opacity-80 flex items-center gap-2"><Type
                                            size={16} /> 网站标识</h4>
                                        <div className="space-y-4 animate-in fade-in">
                                            <div className="space-y-3">
                                                <Label>Logo 图片</Label>
                                                <div className="flex items-center gap-4">
                                                    <div
                                                        className={`w-24 h-24 rounded-xl border-2 border-dashed flex items-center justify-center overflow-hidden ${isDarkMode ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-slate-50'}`}>{appConfig.logoImage ?
                                                            <img src={appConfig.logoImage} className="w-full h-full object-contain" /> :
                                                            <ImageIcon className="opacity-30" />}</div>
                                                    <div className="flex-1">
                                                        <Button onClick={() => logoInputRef.current?.click()} variant="outline" className="w-full sm:w-auto">
                                                            上传 Logo 图片
                                                        </Button>

                                                        <p className="text-xs opacity-50 mt-2">建议尺寸: 高度 80px，文件小于 500KB</p>
                                                        <input type="file" ref={logoInputRef} className="hidden" accept="image/*"
                                                            onChange={handleLogoUpload} /></div>
                                                </div>
                                            </div>

                                            <Separator />

                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                                <div className={`rounded-xl border transition-colors focus-within:ring-1 focus-within:ring-indigo-500/50 ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-200'}`}>
                                                    <label className={`block text-xs font-bold px-3 py-2 opacity-60 text-center border-b ${isDarkMode ? 'border-white/5' : 'border-slate-200'}`}>网页标题</label>
                                                    <input
                                                        type="text"
                                                        className="w-full bg-transparent border-0 p-0 px-3 py-2 text-base focus:ring-0 outline-none placeholder:text-muted-foreground/30 text-center font-medium"
                                                        value={appConfig.siteTitle}
                                                        onChange={e => setAppConfig({ ...appConfig, siteTitle: e.target.value })}
                                                        placeholder="未命名站点"
                                                    />
                                                </div>
                                                <div className={`rounded-xl border transition-colors focus-within:ring-1 focus-within:ring-indigo-500/50 ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-200'}`}>
                                                    <label className={`block text-xs font-bold px-3 py-2 opacity-60 text-center border-b ${isDarkMode ? 'border-white/5' : 'border-slate-200'}`}>Logo 主文字</label>
                                                    <input
                                                        type="text"
                                                        className="w-full bg-transparent border-0 p-0 px-3 py-2 text-base focus:ring-0 outline-none placeholder:text-muted-foreground/30 text-center font-medium"
                                                        value={appConfig.logoText}
                                                        onChange={e => setAppConfig({ ...appConfig, logoText: e.target.value })}
                                                        placeholder="例如：极光"
                                                    />
                                                </div>
                                                <div className={`rounded-xl border transition-colors focus-within:ring-1 focus-within:ring-indigo-500/50 ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-200'}`}>
                                                    <label className={`block text-xs font-bold px-3 py-2 opacity-60 text-center border-b ${isDarkMode ? 'border-white/5' : 'border-slate-200'}`}>Logo 高亮文字</label>
                                                    <input
                                                        type="text"
                                                        className="w-full bg-transparent border-0 p-0 px-3 py-2 text-base focus:ring-0 outline-none placeholder:text-muted-foreground/30 text-center font-medium"
                                                        value={appConfig.logoHighlight}
                                                        onChange={e => setAppConfig({ ...appConfig, logoHighlight: e.target.value })}
                                                        placeholder="例如：导航"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                                        <h4 className="text-base font-bold opacity-80 flex items-center gap-2"><Layout
                                            size={16} /> 页脚设置</h4>
                                        <div className="space-y-1.5">
                                            <Label>底部文字</Label>
                                            <Input
                                                value={appConfig.footerText}
                                                onChange={e => setAppConfig({ ...appConfig, footerText: e.target.value })}
                                            />
                                        </div>

                                        {/* Footer Links Editor */}
                                        <div className="space-y-3 mt-4">
                                            <Label>底部链接管理</Label>
                                            {(appConfig.footerLinks || []).map((link: any, i: number) => (
                                                <div key={i}
                                                    className="flex gap-2 items-center animate-in fade-in slide-in-from-left-2"
                                                    style={{ animationDelay: `${i * 50}ms` }}>
                                                    <Input className="flex-[2]" value={link.name}
                                                        onChange={(e) => updateFooterLink(i, 'name', e.target.value)}
                                                        placeholder="链接名称" />
                                                    <Input className="flex-[3]" value={link.url}
                                                        onChange={(e) => updateFooterLink(i, 'url', e.target.value)}
                                                        placeholder="链接地址 (https://...)" />
                                                    <button onClick={() => removeFooterLink(i)}
                                                        className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-colors">
                                                        <Trash2 size={16} /></button>
                                                </div>
                                            ))}
                                            <Button variant="outline" onClick={addFooterLink} className="w-full border-dashed">
                                                <Plus size={14} className="mr-2" /> 添加新链接
                                            </Button>
                                        </div>

                                        {/* Social Icons Editor */}
                                        <div className="space-y-3 mt-6 pt-6 border-t border-dashed border-slate-200 dark:border-white/10">
                                            <Label className="flex items-center gap-2"><Share2 size={14} /> 社交图标</Label>

                                            {/* Available Icons Grid */}
                                            <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
                                                <p className="text-xs opacity-50 mb-2">点击添加图标：</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {SOCIAL_ICONS.map((social) => {
                                                        const Icon = social.icon;
                                                        const isAdded = (appConfig.socialLinks || []).some((s: any) => s.icon === social.id);
                                                        return (
                                                            <button
                                                                key={social.id}
                                                                onClick={() => {
                                                                    if (!isAdded) {
                                                                        setAppConfig({
                                                                            ...appConfig,
                                                                            socialLinks: [...(appConfig.socialLinks || []), { icon: social.id, url: '' }]
                                                                        });
                                                                    }
                                                                }}
                                                                disabled={isAdded}
                                                                title={social.name}
                                                                className={`p-2 rounded-lg border transition-all ${isAdded ? 'opacity-30 cursor-not-allowed border-transparent' : 'hover:bg-indigo-500/10 hover:border-indigo-500/50 border-transparent cursor-pointer'}`}
                                                            >
                                                                <Icon size={18} />
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </div>

                                            {/* Added Social Links */}
                                            {(appConfig.socialLinks || []).length > 0 && (
                                                <div className="space-y-2">
                                                    {(appConfig.socialLinks || []).map((link: any, i: number) => {
                                                        const socialDef = SOCIAL_ICONS.find(s => s.id === link.icon);
                                                        const Icon = socialDef?.icon || Globe;
                                                        return (
                                                            <div key={i} className="flex gap-2 items-center animate-in fade-in slide-in-from-left-2" style={{ animationDelay: `${i * 50}ms` }}>
                                                                <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-white/10' : 'bg-slate-100'}`}>
                                                                    <Icon size={16} />
                                                                </div>
                                                                <Input
                                                                    className="flex-1"
                                                                    value={link.url}
                                                                    onChange={(e) => {
                                                                        const newLinks = [...(appConfig.socialLinks || [])];
                                                                        newLinks[i] = { ...newLinks[i], url: e.target.value };
                                                                        setAppConfig({ ...appConfig, socialLinks: newLinks });
                                                                    }}
                                                                    placeholder={`${socialDef?.name || 'Link'} URL`}
                                                                />
                                                                <button
                                                                    onClick={() => {
                                                                        const newLinks = [...(appConfig.socialLinks || [])];
                                                                        newLinks.splice(i, 1);
                                                                        setAppConfig({ ...appConfig, socialLinks: newLinks });
                                                                    }}
                                                                    className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-colors"
                                                                >
                                                                    <Trash2 size={16} />
                                                                </button>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            )}

                                        </div>
                                    </div>

                                    {/* Widget Config Section */}
                                    <div className={`space-y-3 p-4 rounded-xl border transition-all ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
                                        <h4 className="text-base font-bold opacity-80 flex items-center gap-2">
                                            <Globe size={16} className="text-indigo-500" />
                                            组件设置
                                        </h4>

                                        {/* Pomodoro Duration */}
                                        <div className="space-y-2">
                                            <Label className="text-sm font-medium">番茄钟时长（分钟）</Label>
                                            <div className="flex items-center gap-3">
                                                <Input
                                                    type="number"
                                                    min={1}
                                                    max={120}
                                                    value={appConfig.widgetConfig?.pomodoroDuration || 25}
                                                    onChange={(e) => setAppConfig({
                                                        ...appConfig,
                                                        widgetConfig: {
                                                            ...appConfig.widgetConfig,
                                                            pomodoroDuration: parseInt(e.target.value) || 25
                                                        }
                                                    })}
                                                    className="w-24"
                                                />
                                                <span className="text-xs opacity-50">默认 25 分钟</span>
                                            </div>
                                        </div>

                                        {/* World Clocks */}
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <Label className="text-sm font-medium">世界时钟（最多6个）</Label>
                                                <button
                                                    onClick={() => {
                                                        const clocks = appConfig.widgetConfig?.worldClocks || [];
                                                        if (clocks.length < 6) {
                                                            setAppConfig({
                                                                ...appConfig,
                                                                widgetConfig: {
                                                                    ...appConfig.widgetConfig,
                                                                    worldClocks: [...clocks, { name: '新城市', timezone: 'UTC' }]
                                                                }
                                                            });
                                                        }
                                                    }}
                                                    disabled={(appConfig.widgetConfig?.worldClocks?.length || 0) >= 6}
                                                    className="flex items-center gap-1 px-2 py-1 text-xs bg-indigo-500/10 text-indigo-500 rounded-lg hover:bg-indigo-500/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                                >
                                                    <Plus size={14} /> 添加
                                                </button>
                                            </div>
                                            <div className="space-y-2">
                                                {(appConfig.widgetConfig?.worldClocks || []).map((clock: { name: string; timezone: string }, i: number) => (
                                                    <div key={i} className="flex items-center gap-2">
                                                        <Input
                                                            value={clock.name}
                                                            onChange={(e) => {
                                                                const clocks = [...(appConfig.widgetConfig?.worldClocks || [])];
                                                                clocks[i] = { ...clocks[i], name: e.target.value };
                                                                setAppConfig({
                                                                    ...appConfig,
                                                                    widgetConfig: { ...appConfig.widgetConfig, worldClocks: clocks }
                                                                });
                                                            }}
                                                            placeholder="城市名"
                                                            className="w-20"
                                                        />
                                                        <select
                                                            value={clock.timezone}
                                                            onChange={(e) => {
                                                                const clocks = [...(appConfig.widgetConfig?.worldClocks || [])];
                                                                clocks[i] = { ...clocks[i], timezone: e.target.value };
                                                                setAppConfig({
                                                                    ...appConfig,
                                                                    widgetConfig: { ...appConfig.widgetConfig, worldClocks: clocks }
                                                                });
                                                            }}
                                                            className={`flex-1 px-3 py-2 text-sm rounded-lg border transition-colors ${isDarkMode ? 'bg-slate-800 border-white/10' : 'bg-white border-slate-200'}`}
                                                        >
                                                            <option value="America/New_York">纽约 (UTC-5)</option>
                                                            <option value="America/Los_Angeles">洛杉矶 (UTC-8)</option>
                                                            <option value="America/Chicago">芝加哥 (UTC-6)</option>
                                                            <option value="Europe/London">伦敦 (UTC+0)</option>
                                                            <option value="Europe/Paris">巴黎 (UTC+1)</option>
                                                            <option value="Europe/Berlin">柏林 (UTC+1)</option>
                                                            <option value="Europe/Moscow">莫斯科 (UTC+3)</option>
                                                            <option value="Asia/Tokyo">东京 (UTC+9)</option>
                                                            <option value="Asia/Shanghai">上海 (UTC+8)</option>
                                                            <option value="Asia/Hong_Kong">香港 (UTC+8)</option>
                                                            <option value="Asia/Singapore">新加坡 (UTC+8)</option>
                                                            <option value="Asia/Seoul">首尔 (UTC+9)</option>
                                                            <option value="Asia/Dubai">迪拜 (UTC+4)</option>
                                                            <option value="Australia/Sydney">悉尼 (UTC+11)</option>
                                                            <option value="Pacific/Auckland">奥克兰 (UTC+13)</option>
                                                            <option value="UTC">UTC</option>
                                                        </select>
                                                        <button
                                                            onClick={() => {
                                                                const clocks = [...(appConfig.widgetConfig?.worldClocks || [])];
                                                                clocks.splice(i, 1);
                                                                setAppConfig({
                                                                    ...appConfig,
                                                                    widgetConfig: { ...appConfig.widgetConfig, worldClocks: clocks }
                                                                });
                                                            }}
                                                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                                                        >
                                                            <Trash2 size={14} />
                                                        </button>
                                                    </div>
                                                ))}
                                                {(appConfig.widgetConfig?.worldClocks?.length || 0) === 0 && (
                                                    <p className="text-xs opacity-50 text-center py-2">暂无世界时钟，点击添加</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {activeTab === 'categories' && (
                                <div className="space-y-4">
                                    <NewCategoryInput onAdd={handleAddCategory} isDarkMode={isDarkMode} />
                                    <div className="space-y-2">
                                        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
                                            <SortableContext items={categories} strategy={verticalListSortingStrategy}>
                                                {categories.map((cat: string, idx: number) => (
                                                    <SortableCategoryItem key={cat} id={cat}>
                                                        <div className={`group p-3 rounded-xl border transition-colors ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
                                                            <div className="flex items-center justify-between">
                                                                <div className="flex items-center gap-3">
                                                                    <SortableDragHandle className="cursor-grab active:cursor-grabbing text-slate-400 hover:text-indigo-500">
                                                                        <GripVertical size={16} />
                                                                    </SortableDragHandle>
                                                                    <button onClick={() => toggleCategoryExpand(cat)} className="p-1 rounded hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                                                                        {expandedCategories.includes(cat) ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                                                                    </button>

                                                                    <div
                                                                        className={`pl-2 pr-4 py-1.5 rounded-2xl text-sm font-bold tracking-wide backdrop-blur-xl border-0 ring-1 ring-white/20 flex items-center gap-3 transition-all select-none
                                                                        ${isDarkMode ? 'bg-slate-900/40 text-slate-200' : 'bg-white/60 text-slate-700'}`}
                                                                        style={{
                                                                            boxShadow: `0 4px 16px -4px ${categoryColors[cat] || '#6366F1'}33, inset 0 0 0 1px ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.5)'}`
                                                                        }}
                                                                    >
                                                                        <div className="relative w-4 h-4 rounded-full shadow-[0_0_8px_currentColor] animate-pulse shrink-0 cursor-pointer hover:scale-110 transition-transform"
                                                                            style={{ backgroundColor: categoryColors[cat] || '#6366F1' }}>
                                                                            <input
                                                                                type="color"
                                                                                value={categoryColors[cat] || '#6366F1'}
                                                                                onChange={(e) => setCategoryColors({ ...categoryColors, [cat]: e.target.value })}
                                                                                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                                                                            />
                                                                        </div>
                                                                        {renamingCategory === cat ? (
                                                                            <div className="flex items-center gap-1" onClick={e => e.stopPropagation()} onMouseDown={e => e.stopPropagation()}>
                                                                                <Input
                                                                                    value={renameValue}
                                                                                    onChange={(e) => setRenameValue(e.target.value)}
                                                                                    className="h-6 w-32 text-sm px-1 py-0 select-text bg-white dark:bg-slate-800"
                                                                                    autoFocus
                                                                                    onKeyDown={(e) => {
                                                                                        if (e.key === 'Enter') handleRename();
                                                                                        if (e.key === 'Escape') setRenamingCategory(null);
                                                                                        e.stopPropagation();
                                                                                    }}
                                                                                />
                                                                                <button onClick={handleRename} className="p-1 hover:text-green-500 rounded-full hover:bg-green-500/10 transition-colors"><Check size={14} /></button>
                                                                                <button onClick={() => setRenamingCategory(null)} className="p-1 hover:text-red-500 rounded-full hover:bg-red-500/10 transition-colors"><X size={14} /></button>
                                                                            </div>
                                                                        ) : (
                                                                            <>
                                                                                <span
                                                                                    className={`${hiddenCategories.includes(cat) ? 'opacity-50 line-through decoration-2' : ''} cursor-pointer hover:text-indigo-500 transition-colors`}
                                                                                    onClick={() => { setRenamingCategory(cat); setRenameValue(cat); }}
                                                                                    title="点击重命名"
                                                                                >
                                                                                    {cat}
                                                                                </span>
                                                                                <button onClick={() => { setRenamingCategory(cat); setRenameValue(cat); }} className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-slate-400 hover:text-indigo-500 rounded hover:bg-indigo-50 dark:hover:bg-white/10">
                                                                                    <Edit3 size={12} />
                                                                                </button>
                                                                                <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-black/5 dark:bg-white/10 opacity-70">
                                                                                    {sites.filter((s: any) => s.category === cat).length}
                                                                                </span>
                                                                            </>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                                <div className="flex gap-1">
                                                                    <button onClick={() => toggleCategoryVisibility(cat)}
                                                                        className="p-2 rounded hover:bg-black/5 dark:hover:bg-white/10 text-slate-400 active:scale-90">{hiddenCategories.includes(cat) ?
                                                                            <EyeOff size={16} /> : <Eye size={16} />}</button>
                                                                    <button onClick={() => handleDeleteCategory(cat)}
                                                                        className="p-2 rounded hover:bg-red-500/10 text-slate-400 hover:text-red-500 active:scale-90">
                                                                        <Trash2 size={16} /></button>
                                                                </div>
                                                            </div>

                                                            {/* Expanded Site List */}
                                                            {expandedCategories.includes(cat) && (
                                                                <div className="mt-3 pl-8 pr-2 animate-in slide-in-from-top-2 fade-in duration-200">
                                                                    {/* Only render Root sites here. Nested handled by SortableSiteItem */}
                                                                    <SortableContext
                                                                        items={sites.filter((s: any) => s.category === cat && !s.parentId).map((s: any) => s.id)}
                                                                        strategy={verticalListSortingStrategy}
                                                                    >
                                                                        <div className="space-y-1">
                                                                            {sites.filter((s: any) => s.category === cat && !s.parentId).map((site: any) => (
                                                                                <SortableSiteItem
                                                                                    key={site.id}
                                                                                    site={site}
                                                                                    sites={sites} /* PASS SITES HERE */
                                                                                    isDarkMode={isDarkMode}
                                                                                    onEdit={() => {
                                                                                        setEditingSite(site);
                                                                                        setIsModalOpen(true);
                                                                                    }}
                                                                                    onDelete={(siteOrEvent: any) => {
                                                                                        // If event or site is passed, handle correctly.
                                                                                        // SortableSiteItem passes the site object itself in my new implementation.
                                                                                        onDeleteSite(siteOrEvent);
                                                                                    }}
                                                                                    onToggleHidden={(s: any) => {
                                                                                        const target = s.id ? s : site;
                                                                                        const updated = { ...target, isHidden: !target.isHidden };
                                                                                        setSites(sites.map(s => s.id === target.id ? updated : s));
                                                                                    }}
                                                                                />
                                                                            ))}
                                                                            {sites.filter((s: any) => s.category === cat && !s.parentId).length === 0 && (
                                                                                <div className="text-xs text-center py-2 opacity-50 border border-dashed rounded-lg">暂无根站点</div>
                                                                            )}
                                                                        </div>
                                                                    </SortableContext>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </SortableCategoryItem>
                                                ))}
                                            </SortableContext>
                                        </DndContext>
                                    </div>
                                </div>
                            )}
                            {/* 高级 Tab */}
                            {activeTab === 'advanced' && (<div className="space-y-6">
                                {/* 访问控制 */}
                                <div className="space-y-4">
                                    <h4 className="text-base font-bold opacity-80 flex items-center gap-2"><Lock size={16} /> 访问控制</h4>
                                    <div className={`flex items-center justify-between p-3 rounded-xl border transition-all ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
                                        <div className="space-y-0.5">
                                            <Label htmlFor="private-mode" className="cursor-pointer font-medium">私有模式</Label>
                                            <p className="text-xs opacity-50">开启后访客需输入密码才能查看内容</p>
                                        </div>
                                        <Switch id="private-mode" checked={appConfig.privateMode || false} onCheckedChange={(c) => setAppConfig({ ...appConfig, privateMode: c })} />
                                    </div>

                                    {/* Private Password Setting */}
                                    {appConfig.privateMode && (
                                        <div className={`p-4 rounded-xl border animate-in slide-in-from-top-2 ${isDarkMode ? 'bg-indigo-500/10 border-indigo-500/20' : 'bg-indigo-50 border-indigo-100'}`}>
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-2">
                                                    <Lock size={16} className="text-indigo-500" />
                                                    <span className="text-sm font-bold text-indigo-500">访问密码</span>
                                                </div>
                                                <div className="flex gap-2">
                                                    <Input
                                                        type="password"
                                                        placeholder="设置独立访问密码 (留空则使用管理员密码)"
                                                        className="bg-white dark:bg-slate-900"
                                                        onChange={(e) => {
                                                            // Storing in a ref or local state would be better, but for simplicity:
                                                            // We'll use a local state or just fire immediately on blur / button click.
                                                            // Let's add a "Save" button for this specific field or use a local state.
                                                            // Since SettingsPanel is large, let's use a local variable inside the component logic above, but here I am inside JSX.
                                                            // I'll add a small inner form or just an input with a button.
                                                        }}
                                                        id="private-pwd-input"
                                                    />
                                                    <Button onClick={async () => {
                                                        const input = document.getElementById('private-pwd-input') as HTMLInputElement;
                                                        const val = input.value;
                                                        try {
                                                            showToast('正在更新密码...', 'loading');
                                                            const res = await fetch('/api/auth/private/update', {
                                                                method: 'PUT',
                                                                headers: { 'Content-Type': 'application/json' },
                                                                body: JSON.stringify({ password: val })
                                                            });
                                                            if (res.ok) {
                                                                showToast('访问密码已更新', 'success');
                                                                input.value = '';
                                                            } else {
                                                                showToast('更新失败', 'error');
                                                            }
                                                        } catch (e) { showToast('请求出错', 'error'); }
                                                    }}>更新</Button>
                                                </div>
                                                <p className="text-[10px] opacity-60">
                                                    注意：设置为空将清除独立密码，恢复使用管理员密码验证。
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <Separator className={isDarkMode ? 'bg-white/10' : 'bg-slate-200'} />

                                {/* HTML5 Content Section */}
                                <div className="space-y-6">
                                    <h4 className="text-base font-bold opacity-80 flex items-center gap-2"><Code size={16} /> HTML5 内容区域</h4>
                                    {[
                                        { id: 'header', label: '页首下方区域', layoutKey: 'headerLayout' },
                                        { id: 'footer', label: '页尾上方区域', layoutKey: 'footerLayout' }
                                    ].map(area => (
                                        <div key={area.id} className={`p-3 rounded-xl border ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center gap-4">
                                                    <span className="text-sm font-bold opacity-80">{area.label}</span>
                                                    <ToggleGroup type="single" value={appConfig.htmlConfig?.[area.layoutKey] || 'column'} onValueChange={(v) => v && setAppConfig({ ...appConfig, htmlConfig: { ...appConfig.htmlConfig, [area.layoutKey]: v } })} className="bg-slate-200/50 dark:bg-white/10 p-0.5 rounded-lg h-8">
                                                        <ToggleGroupItem value="column" className="h-7 px-2 text-[10px] data-[state=on]:bg-white dark:data-[state=on]:bg-slate-800 data-[state=on]:text-indigo-500 shadow-none rounded-md">垂直堆叠</ToggleGroupItem>
                                                        <ToggleGroupItem value="row" className="h-7 px-2 text-[10px] data-[state=on]:bg-white dark:data-[state=on]:bg-slate-800 data-[state=on]:text-indigo-500 shadow-none rounded-md">水平排列</ToggleGroupItem>
                                                    </ToggleGroup>
                                                </div>
                                                <Button size="sm" onClick={() => {
                                                    const newSection = { id: Date.now().toString(), show: true, content: '', width: '100%', height: 'auto' };
                                                    const currentList = appConfig.htmlConfig?.[area.id] || [];
                                                    setAppConfig({ ...appConfig, htmlConfig: { ...appConfig.htmlConfig, [area.id]: [...currentList, newSection] } });
                                                }} className="h-8 text-xs">
                                                    <Plus size={12} className="mr-1" /> 添加区域
                                                </Button>
                                            </div>
                                            <div className="space-y-3">
                                                {(appConfig.htmlConfig?.[area.id] || []).map((section: any, idx: number) => (
                                                    <div key={idx} className={`p-3 rounded-lg border ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-white border-slate-200'}`}>
                                                        <div className="flex items-center justify-between mb-2">
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-xs font-mono opacity-50">#{idx + 1}</span>
                                                                <Switch
                                                                    checked={section.show}
                                                                    onCheckedChange={(checked) => {
                                                                        const newList = [...(appConfig.htmlConfig?.[area.id] || [])];
                                                                        newList[idx] = { ...newList[idx], show: checked };
                                                                        setAppConfig({ ...appConfig, htmlConfig: { ...appConfig.htmlConfig, [area.id]: newList } });
                                                                    }}
                                                                    className="scale-75 origin-left"
                                                                />
                                                            </div>
                                                            <button onClick={() => {
                                                                const newList = [...(appConfig.htmlConfig?.[area.id] || [])];
                                                                newList.splice(idx, 1);
                                                                setAppConfig({ ...appConfig, htmlConfig: { ...appConfig.htmlConfig, [area.id]: newList } });
                                                            }} className="text-red-500 hover:bg-red-500/10 p-1 rounded transition-colors"><Trash2 size={14} /></button>
                                                        </div>
                                                        {section.show && (
                                                            <div className="space-y-2 animate-in fade-in">
                                                                <div className="grid grid-cols-2 gap-2">
                                                                    <div><label className="text-[10px] opacity-60 block mb-0.5">宽度</label>
                                                                        <Input className="h-7 text-xs" value={section.width || ''} placeholder="100%"
                                                                            onChange={e => {
                                                                                const newList = [...(appConfig.htmlConfig?.[area.id] || [])];
                                                                                newList[idx] = { ...newList[idx], width: e.target.value };
                                                                                setAppConfig({ ...appConfig, htmlConfig: { ...appConfig.htmlConfig, [area.id]: newList } });
                                                                            }} /></div>
                                                                    <div><label className="text-[10px] opacity-60 block mb-0.5">高度</label>
                                                                        <Input className="h-7 text-xs" value={section.height || ''} placeholder="auto"
                                                                            onChange={e => {
                                                                                const newList = [...(appConfig.htmlConfig?.[area.id] || [])];
                                                                                newList[idx] = { ...newList[idx], height: e.target.value };
                                                                                setAppConfig({ ...appConfig, htmlConfig: { ...appConfig.htmlConfig, [area.id]: newList } });
                                                                            }} /></div>
                                                                </div>
                                                                <div><label className="text-[10px] opacity-60 block mb-0.5">HTML 内容</label>
                                                                    <Textarea className="min-h-[60px] font-mono text-[10px] leading-relaxed" value={section.content || ''}
                                                                        onChange={e => {
                                                                            const newList = [...(appConfig.htmlConfig?.[area.id] || [])];
                                                                            newList[idx] = { ...newList[idx], content: e.target.value };
                                                                            setAppConfig({ ...appConfig, htmlConfig: { ...appConfig.htmlConfig, [area.id]: newList } });
                                                                        }} placeholder="<div>Content</div>" /></div>
                                                            </div>
                                                        )}

                                                    </div>
                                                ))}
                                                {(appConfig.htmlConfig?.[area.id] || []).length === 0 && (
                                                    <div className="text-center py-4 opacity-40 text-xs">暂无区域，点击上方添加</div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className={`h-px w-full ${isDarkMode ? 'bg-white/10' : 'bg-slate-200'}`}></div>
                                {/* Data Backup Section */}
                                <div className="space-y-4">
                                    <h4 className="text-base font-bold opacity-80 flex items-center gap-2"><HardDrive size={16} /> 数据备份</h4>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div onClick={handleExport}
                                            className={`p-5 rounded-2xl border cursor-pointer text-center transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-indigo-500/20' : 'bg-slate-50 border-slate-200 hover:bg-indigo-50'}`}>
                                            <Download size={32} className="mx-auto mb-3 text-indigo-500" /><h4
                                                className="font-bold mb-1">导出配置</h4><p className="text-xs opacity-60">保存所有数据为
                                                    JSON 文件</p></div>
                                        <div onClick={() => fileInputRef.current?.click()}
                                            className={`p-5 rounded-2xl border cursor-pointer text-center transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-emerald-500/20' : 'bg-slate-50 border-slate-200 hover:bg-emerald-50'}`}>
                                            <UploadCloud size={32} className="mx-auto mb-3 text-emerald-500" /><h4
                                                className="font-bold mb-1">导入配置</h4><p className="text-xs opacity-60">恢复 JSON
                                                    备份文件</p><input type="file" ref={fileInputRef} className="hidden" accept=".json"
                                                        onChange={handleFileSelect} /></div>

                                        {/* Sync Icons Button */}
                                        <div onClick={async () => {
                                            try {
                                                showToast('正在后台同步图标...', 'success');
                                                const res = await fetch('/api/admin/cache-icons', { method: 'POST' });
                                                if (res.ok) {
                                                    const data = await res.json();
                                                    showToast(`同步完成，处理了 ${data.processed} 个站点`, 'success');
                                                } else {
                                                    showToast('同步失败', 'error');
                                                }
                                            } catch (e) {
                                                showToast('请求失败', 'error');
                                            }
                                        }}
                                            className={`p-5 rounded-2xl border cursor-pointer text-center transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-blue-500/20' : 'bg-slate-50 border-slate-200 hover:bg-blue-50'}`}>
                                            <RefreshCw size={32} className="mx-auto mb-3 text-blue-500" /><h4
                                                className="font-bold mb-1">同步图标缓存</h4><p className="text-xs opacity-60">下载未缓存的
                                                    站点图标</p></div>
                                    </div>
                                </div>
                            </div>)}
                        </div>
                    </ScrollArea>
                    {/* Modals */}
                    <FontPickerModal
                        isOpen={isFontPickerOpen}
                        onClose={() => setIsFontPickerOpen(false)}
                    />

                    {fontToDelete && (
                        <ConfirmationModal
                            isOpen={true}
                            title="删除字体"
                            message={`确定要删除字体 "${fontToDelete.name}" 吗？此操作无法撤销。`}
                            isDarkMode={isDarkMode}
                            onCancel={() => setFontToDelete(null)}
                            onConfirm={async () => {
                                await removeFont(fontToDelete.id);
                                if (layoutSettings.fontFamily === fontToDelete.id) {
                                    setLayoutSettings({ ...layoutSettings, fontFamily: 'system' });
                                }
                                setFontToDelete(null);
                                showToast('字体已删除');
                            }}
                        />
                    )}
                </div>
            </div >
        </TooltipProvider >
    );
}
