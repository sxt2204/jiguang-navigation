"use client";
import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { NoiseOverlay } from './components/ui/NoiseOverlay';
import {
  Search, Settings, Plus, LogIn, LogOut, LayoutGrid, Edit3, Trash2,
  ExternalLink, Globe, Github, Youtube, Twitter, Code, Briefcase, Coffee,
  Image as ImageIcon, X, Moon, Sun, ChevronDown, Monitor, EyeOff, Eye,
  Palette, List, Music, MessageSquare, Gamepad, BookOpen, Zap, Cloud,
  Activity, MoreHorizontal, Download, UploadCloud, Copy, ArrowUp, ArrowDown,
  Type, Link as LinkIcon, Layout, HardDrive, Lock, User, Users, Clock, RefreshCw, // Added Users icon
  AlertTriangle, CheckCircle2, XCircle, CloudRain, CloudSnow, CloudLightning,
  SunMedium, Wind, Image as WallpaperIcon, ImagePlus, Hash, MapPin, Sparkles, Check, Command,
  Move, Terminal, Droplet, PaintBucket, ZoomIn, GripVertical, ChevronRight
} from 'lucide-react';
import { AuroraBackground } from '@/app/components/AuroraBackground';
import { FontManager } from '@/app/components/layout/FontManager';
import { ActionButton } from '@/app/components/ui/ActionButton';
import { ThemeToggle } from '@/app/components/layout/ThemeToggle';
import { Header } from '@/app/components/layout/Header';
import { Footer } from '@/app/components/layout/Footer';
import { SiteCard } from '@/app/components/site/SiteCard';
import { WidgetDashboard } from '@/app/components/widgets/WidgetDashboard';
import { PrivateModeScreen } from '@/app/components/auth/PrivateModeScreen';
import { RangeControl } from '@/app/components/ui/RangeControl';
import { NewCategoryInput } from '@/app/components/settings/NewCategoryInput';
import { BackgroundPositionPreview } from '@/app/components/settings/BackgroundPositionPreview';
import { WallpaperManager } from '@/app/components/settings/WallpaperManager';
import { SettingsPanel } from '@/app/components/settings/SettingsPanel';
import { HtmlSectionContent } from '@/app/components/html-content/HtmlSectionContent';
import { SortableHtmlSection } from '@/app/components/html-content/SortableHtmlSection';
import { SiteGrid } from '@/app/components/site/SiteGrid';
import { ConfirmationModal } from '@/app/components/modals/ConfirmationModal';
import { LoginModal } from '@/app/components/modals/LoginModal';
import { EditModal } from '@/app/components/modals/EditModal';
import { HtmlEditModal } from '@/app/components/modals/HtmlEditModal';
import { AccountSettingsModal } from '@/app/components/modals/AccountSettingsModal';
import { CategoryPill } from '@/app/components/ui/CategoryPill';
import { useFonts } from '@/app/hooks/useFonts';

// --- dnd-kit Imports ---
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  MouseSensor,
  useSensor,
  useSensors,
  DragOverlay,
  DragStartEvent,
  DragEndEvent,
  useDroppable
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// --- shadcn/ui Imports ---
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import {
  getAccessibleTextColor, shouldUseTextShadow, hexToRgb, generateId, translateCity, FAVICON_PROVIDERS, getSimpleFaviconUrl, formatDate,
  NOISE_BASE64, HARMONIOUS_COLORS, getRandomColor, SEARCH_ENGINES
} from '@/lib/utils';


import {
  FONTS, DEFAULT_APP_CONFIG, FRESH_BACKGROUND_COLORS, FRESH_NAV_COLORS, ICON_MAP, DEFAULT_LAYOUT_SETTINGS
} from '@/lib/constants';

// --- IMPORTED DATA FROM JSON ---
const INITIAL_SITES: any[] = [];
const INITIAL_CATEGORIES: string[] = [];

function DroppableHomeBreadcrumb({ onClick, isDarkMode, children }: any) {
  const { setNodeRef, isOver } = useDroppable({
    id: 'breadcrumb-home',
  });

  return (
    <div
      ref={setNodeRef}
      onClick={onClick}
      className={`
        flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 border cursor-pointer select-none
        ${isOver
          ? 'bg-green-100 border-green-300 text-green-700 shadow-md scale-105 ring-2 ring-green-200'
          : (isDarkMode
            ? 'bg-indigo-500/20 border-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30 hover:border-indigo-500/40'
            : 'bg-white border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 hover:shadow-sm')
        }
      `}
    >
      {children}
    </div>
  );
}


export default function AuroraNav() {
  // --- State ---
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoggedInLoading] = useState(true);
  const [sites, setSites] = useState(INITIAL_SITES);
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [hiddenCategories, setHiddenCategories] = useState<string[]>([]);
  const [categoryColors, setCategoryColors] = useState<Record<string, string>>({});
  const [layoutSettings, setLayoutSettings] = useState(DEFAULT_LAYOUT_SETTINGS);
  const [editingHtmlSection, setEditingHtmlSection] = useState<any>(null);
  const [htmlContextMenu, setHtmlContextMenu] = useState({ visible: false, x: 0, y: 0, section: null as any });
  const [appConfig, setAppConfig] = useState(DEFAULT_APP_CONFIG);
  const [toast, setToast] = useState<{ show: boolean, message: string, type: 'success' | 'error' | 'info' | 'loading' }>({
    show: false,
    message: '',
    type: 'success'
  });
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const [deleteContents, setDeleteContents] = useState(false);
  const [deleteSite, setDeleteSite] = useState<any>(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [bingQuality, setBingQuality] = useState('uhd');
  const { allFonts } = useFonts();

  // Interaction States
  const [activeTab, setActiveTab] = useState('全部');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [currentEngineId, setCurrentEngineId] = useState('local');

  const fetchSites = useCallback(async () => {
    try {
      const res = await fetch('/api/sites');
      if (res.ok) {
        const data = await res.json();
        setSites(data);
      }
    } catch (e) {
      console.error('Failed to fetch sites');
    }
  }, []);
  const [isEngineMenuOpen, setIsEngineMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Context Menu State
  const [searchEngine, setSearchEngine] = useState('Google');
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, siteId: null, alignRight: false });

  // Modal States
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAccountSettingsModalOpen, setIsAccountSettingsModalOpen] = useState(false);
  const [isWallpaperManagerOpen, setIsWallpaperManagerOpen] = useState(false);
  const [editingSite, setEditingSite] = useState<any>(null);
  const [confirmingDeleteCategory, setConfirmingDeleteCategory] = useState<string | null>(null);
  const [confirmingDeleteHtmlSection, setConfirmingDeleteHtmlSection] = useState<any>(null);
  const [activeSettingTab, setActiveSettingTab] = useState('layout');
  const [isGuestVerified, setIsGuestVerified] = useState(false); // 访客是否已验证密码

  // dnd-kit Sensors - Optimized for Mobile
  const [activeDragId, setActiveDragId] = useState<number | string | null>(null);
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 250, tolerance: 5 }
    }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const syncLockRef = useRef(false); // 同步锁，防止并发写入
  const isInitializedRef = useRef(false); // 初始化标记，避免首次加载触发同步
  const dragOriginRef = useRef<any>(null); // Track original state for drag restoration

  // --- Scroll Detection (Throttled) ---
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- Global Keyboard Shortcuts ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Command/Ctrl + K to Focus Search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
        setIsSearchFocused(true);
      }
      // Esc to Clear/Close
      if (e.key === 'Escape') {
        if (isSearchFocused) {
          setSearchQuery('');
          setIsSearchFocused(false);
          searchInputRef.current?.blur();
        } else if (currentFolderId) {
          setCurrentFolderId(null); // Exit folder
        }
        setIsSettingsOpen(false);
        setIsModalOpen(false);
        setIsLoginModalOpen(false);
        setIsAccountSettingsModalOpen(false); // Close account settings
        setIsEngineMenuOpen(false);
        setContextMenu({ ...contextMenu, visible: false });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchFocused, contextMenu, currentFolderId]);

  // --- Init & Persistence ---
  // --- Init & Persistence ---
  // --- Init & Persistence ---
  useEffect(() => {
    const initData = async () => {
      // Optimistic Load from LocalStorage
      if (typeof window !== 'undefined') {
        const cached = localStorage.getItem('aurora_cache');
        if (cached) {
          try {
            const data = JSON.parse(cached);
            if (data.sites) setSites(data.sites);
            if (data.categories) {
              setCategories(data.categories.map((c: any) => c.name));
              const colors: Record<string, string> = {};
              const hidden: string[] = [];
              data.categories.forEach((c: any) => {
                if (c.color) colors[c.name] = c.color;
                if (c.isHidden) hidden.push(c.name);
              });
              setCategoryColors(colors);
              setHiddenCategories(hidden);
            }
            if (data.settings) {
              if (data.settings.layout) setLayoutSettings(data.settings.layout);
              if (data.settings.config) setAppConfig(data.settings.config);
              if (data.settings.theme) setIsDarkMode(data.settings.theme.isDarkMode);
              if (data.settings.searchEngine) setSearchEngine(data.settings.searchEngine);
            }
            setIsLoggedInLoading(false); // Show content immediately
          } catch (e) { console.error('Cache parse error', e); }
        }
      }

      try {
        const res = await fetch('/api/init');
        if (res.ok) {
          const data = await res.json();

          // Save to cache
          localStorage.setItem('aurora_cache', JSON.stringify(data));

          if (data.sites) setSites(data.sites);
          if (data.categories) {
            setCategories(data.categories.map((c: any) => c.name));
            const colors: Record<string, string> = {};
            const hidden: string[] = [];
            data.categories.forEach((c: any) => {
              if (c.color) colors[c.name] = c.color;
              if (c.isHidden) hidden.push(c.name);
            });
            setCategoryColors(colors);
            setHiddenCategories(hidden);
          }
          if (data.settings) {
            if (data.settings.layout) setLayoutSettings(data.settings.layout);
            if (data.settings.config) {
              const loadedConfig = data.settings.config;
              // Migration: Ensure htmlConfig uses arrays
              if (loadedConfig.htmlConfig) {
                if (!Array.isArray(loadedConfig.htmlConfig.header)) {
                  const oldHeader = loadedConfig.htmlConfig.header;
                  loadedConfig.htmlConfig.header = (oldHeader && typeof oldHeader === 'object' && oldHeader.content) ? [oldHeader] : [];
                }
                if (!Array.isArray(loadedConfig.htmlConfig.footer)) {
                  const oldFooter = loadedConfig.htmlConfig.footer;
                  loadedConfig.htmlConfig.footer = (oldFooter && typeof oldFooter === 'object' && oldFooter.content) ? [oldFooter] : [];
                }
                if (!loadedConfig.htmlConfig.headerLayout) loadedConfig.htmlConfig.headerLayout = 'column';
                if (!loadedConfig.htmlConfig.footerLayout) loadedConfig.htmlConfig.footerLayout = 'column';
              }
              setAppConfig(loadedConfig);
            }
            if (data.settings.theme) setIsDarkMode(data.settings.theme.isDarkMode);
            if (data.settings.searchEngine) setSearchEngine(data.settings.searchEngine);
          }
        }
      } catch (error) {
        console.error('Failed to fetch initial data:', error);
      } finally {
        setIsLoggedInLoading(false);
        // 延迟设置初始化完成，避免状态变化立即触发同步
        setTimeout(() => { isInitializedRef.current = true; }, 1000);
      }
    };

    initData();

    if (typeof window !== 'undefined') {
      const savedLogin = localStorage.getItem('aurora_is_logged_in');
      setIsLoggedIn(savedLogin !== null ? JSON.parse(savedLogin) : false);

      // Restore Guest Verification State (Session persistence)
      const savedGuest = sessionStorage.getItem('aurora_guest_verified');
      if (savedGuest === 'true') setIsGuestVerified(true);
    }
  }, []);

  // Ensure colors are assigned when categories change
  useEffect(() => {
    const newColors = { ...categoryColors };
    let colorChanged = false;
    categories.forEach((cat, index) => {
      if (!newColors[cat]) {
        newColors[cat] = FRESH_NAV_COLORS[index % FRESH_NAV_COLORS.length];
        colorChanged = true;
      }
    });
    if (colorChanged) {
      setCategoryColors(newColors);
    }
  }, [categories]);

  // Dynamic Font Loading
  useEffect(() => {
    const selectedFont = FONTS.find(f => f.id === layoutSettings.fontFamily);
    if (selectedFont && selectedFont.url) {
      const linkId = 'aurora-custom-font';
      if (!document.getElementById(linkId)) {
        const link = document.createElement('link');
        link.id = linkId;
        link.href = selectedFont.url;
        link.rel = 'stylesheet';
        document.head.appendChild(link);
      } else {
        const link = document.getElementById(linkId) as HTMLLinkElement;
        if (link.href !== selectedFont.url) link.href = selectedFont.url;
      }
    }
  }, [layoutSettings.fontFamily]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('aurora_theme', isDarkMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  useEffect(() => localStorage.setItem('aurora_is_logged_in', JSON.stringify(isLoggedIn)), [isLoggedIn]);
  useEffect(() => {
    document.title = appConfig.siteTitle;
  }, [appConfig.siteTitle]);

  // --- Sync Settings & Categories to DB ---
  useEffect(() => {
    // 检查：必须登录且初始化完成
    if (!isLoggedIn || !isInitializedRef.current) return;

    const timer = setTimeout(async () => {
      // 同步锁检查，防止并发执行
      if (syncLockRef.current) {
        console.log('[Sync] Skipped - already syncing');
        return;
      }
      syncLockRef.current = true;

      try {
        console.log('[Sync] Starting...');
        // 串行执行，避免SQLite并发写入冲突
        // 1. Sync Settings
        console.log('[Sync] Saving layoutSettings:', layoutSettings);
        await fetch('/api/settings', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            layout: layoutSettings,
            config: appConfig,
            theme: { isDarkMode },
            searchEngine: searchEngine
          })
        });

        // 2. Sync Categories (Order + Colors + Hidden)
        const categoryPayload = categories.map((name, index) => ({
          name,
          order: index,
          color: categoryColors[name],
          isHidden: hiddenCategories.includes(name)
        }));

        await fetch('/api/categories', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(categoryPayload)
        });

        // 3. Sync Sites Order
        const sitePayload = sites.map((s, index) => ({ id: s.id, order: index, isHidden: s.isHidden }));
        await fetch('/api/sites', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(sitePayload)
        });

        console.log('[Sync] Completed');
        showToast('配置已自动保存', 'success');
      } catch (error) {
        console.error('[Sync] Error:', error);
        showToast('配置保存失败', 'error');
      } finally {
        syncLockRef.current = false;
      }
    }, 500); // Reduce debounce to 500ms for faster save on refresh
    return () => clearTimeout(timer);
  }, [layoutSettings, appConfig, isDarkMode, categories, sites, isLoggedIn]);


  // --- Wallpaper Logic ---
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

  const setBingWallpaper = async (quality = bingQuality) => {
    try {
      const res = await fetch('/api/wallpapers?type=bing');
      if (res.ok) {
        const wallpapers = await res.json();
        if (wallpapers.length > 0) {
          const latest = wallpapers[0];
          const now = new Date();
          const todayStr = now.getFullYear() + String(now.getMonth() + 1).padStart(2, '0') + String(now.getDate()).padStart(2, '0');
          if (latest.filename.includes(todayStr)) {
            setLayoutSettings((prev: any) => ({ ...prev, bgEnabled: true, bgType: 'bing', bgUrl: latest.url }));
            setBingQuality(quality);
            showToast('已应用今日 Bing 壁纸 (本地缓存)', 'info');
            return;
          }
        }
      }
    } catch (e) {
      console.error('Failed to check local bing cache', e);
    }

    const url = `https://bing.img.run/${quality}.php`;
    setLayoutSettings((prev: any) => ({ ...prev, bgEnabled: true, bgType: 'bing', bgUrl: url }));
    setBingQuality(quality);
    const label = quality === 'uhd' ? '4K 超清' : (quality === '1920x1080' ? '1080P 高清' : '手机版');
    showToast(`已应用 Bing 每日一图 (${label})`, 'success');
  };

  // Auto-Sync Bing Wallpaper Check
  useEffect(() => {
    const checkBingSync = async () => {
      if (layoutSettings.bgType !== 'bing') return;

      const now = new Date();
      const todayStr = now.getFullYear() + String(now.getMonth() + 1).padStart(2, '0') + String(now.getDate()).padStart(2, '0');

      const lastSync = localStorage.getItem('lastBingSync');
      if (lastSync === todayStr) return;

      try {
        const res = await fetch('/api/wallpapers?type=bing');
        if (res.ok) {
          const wallpapers = await res.json();
          if (wallpapers.length > 0) {
            const latest = wallpapers[0];
            if (latest.filename.includes(todayStr)) {
              if (layoutSettings.bgUrl !== latest.url) {
                setLayoutSettings((prev: any) => ({ ...prev, bgUrl: latest.url }));
              }
              localStorage.setItem('lastBingSync', todayStr);
              return;
            }
          }
        }

        const hours = now.getHours();
        const minutes = now.getMinutes();

        if (hours > 0 || (hours === 0 && minutes >= 10)) {
          console.log('Auto-syncing Bing wallpaper...');
          await handleSyncBing();
          localStorage.setItem('lastBingSync', todayStr);
        }
      } catch (e) {
        console.error('Auto-sync check failed', e);
      }
    };

    checkBingSync();
  }, [layoutSettings.bgType]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' | 'loading' = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3000);
  };

  // --- Event Handlers ---
  useEffect(() => {
    const handleClick = () => setContextMenu({ ...contextMenu, visible: false });
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [contextMenu]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { left, top } = containerRef.current.getBoundingClientRect();
    containerRef.current.style.setProperty("--mouse-x", `${e.clientX - left}px`);
    containerRef.current.style.setProperty("--mouse-y", `${e.clientY - top}px`);
  };

  // --- HTML5 Content Handlers ---
  const handleHtmlContextMenu = (e: React.MouseEvent, section: any) => {
    e.preventDefault();
    if (!isLoggedIn) return;
    setHtmlContextMenu({ visible: true, x: e.clientX, y: e.clientY, section });
  };

  const handleHtmlSave = async (newSection: any) => {
    const isHeader = appConfig.htmlConfig.header.some((s: any) => s.id === newSection.id);
    const listName = isHeader ? 'header' : 'footer';
    const newList = appConfig.htmlConfig[listName].map((s: any) => s.id === newSection.id ? newSection : s);

    const newConfig = { ...appConfig, htmlConfig: { ...appConfig.htmlConfig, [listName]: newList } };
    setAppConfig(newConfig);
    setEditingHtmlSection(null);

    // Persist
    try {
      await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ config: newConfig })
      });
      showToast('HTML 内容已更新');
    } catch (e) {
      showToast('保存失败', 'error');
    }
  };

  const handleDeleteHtmlSection = async (section: any) => {
    setConfirmingDeleteHtmlSection(section);
    setHtmlContextMenu({ ...htmlContextMenu, visible: false });
  };

  const confirmDeleteHtmlSection = async () => {
    const section = confirmingDeleteHtmlSection;
    if (!section) return;
    const isHeader = appConfig.htmlConfig.header.some((s: any) => s.id === section.id);
    const listName = isHeader ? 'header' : 'footer';
    const newList = appConfig.htmlConfig[listName].filter((s: any) => s.id !== section.id);

    const newConfig = { ...appConfig, htmlConfig: { ...appConfig.htmlConfig, [listName]: newList } };
    setAppConfig(newConfig);
    setConfirmingDeleteHtmlSection(null);

    // Persist
    try {
      await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ config: newConfig })
      });
      showToast('已删除');
    } catch (e) {
      showToast('删除失败', 'error');
    }
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    if (val.trim() && currentEngineId === 'local') {
      const matches = sites.filter(s => s.name.toLowerCase().includes(val.toLowerCase())).map(s => s.name).slice(0, 5);
      setSearchSuggestions(matches);
    } else setSearchSuggestions([]);
  };

  // --- DnD Handlers ---
  const handleDragStart = (event: DragStartEvent) => {
    if (!isLoggedIn) return;
    setActiveDragId(event.active.id);
    const item = sites.find(s => s.id === event.active.id);
    if (item) dragOriginRef.current = { ...item };
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    setActiveDragId(null);
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    // --- HTML Section Reordering ---
    const headerSections = appConfig.htmlConfig?.header || [];
    const footerSections = appConfig.htmlConfig?.footer || [];
    const isHeader = headerSections.some((s: any) => s.id === active.id);
    const isFooter = footerSections.some((s: any) => s.id === active.id);

    if (isHeader || isFooter) {
      const listName = isHeader ? 'header' : 'footer';
      const list = isHeader ? headerSections : footerSections;
      const oldIndex = list.findIndex((s: any) => s.id === active.id);
      const newIndex = list.findIndex((s: any) => s.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        const newList = arrayMove(list, oldIndex, newIndex);
        const newConfig = { ...appConfig, htmlConfig: { ...appConfig.htmlConfig, [listName]: newList } };
        setAppConfig(newConfig);

        // Persist
        try {
          await fetch('/api/settings', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ config: newConfig })
          });
        } catch (e) {
          console.error('Failed to save HTML order', e);
        }
      }
      return;
    }

    // --- Site Reordering (Existing Logic) ---
    // 1. Construct Visual List (Same logic as render)
    let visualSites = [...sites];
    if (activeTab === '全部') {
      visualSites = categories
        .filter(c => !hiddenCategories.includes(c))
        .flatMap(cat => sites.filter(s => s.category === cat));
    }

    // 2. Find Indices in Visual List
    const oldIndex = visualSites.findIndex((item) => String(item.id) === String(active.id));
    const newIndex = visualSites.findIndex((item) => String(item.id) === String(over.id));

    // --- BREADCRUMB DROP LOGIC (Move Out) ---
    // Note: over.id for breadcrumb is 'breadcrumb-home'. Not an index in visualSites.
    // If over.id === 'breadcrumb-home'
    if (over.id === 'breadcrumb-home' && currentFolderId) {
      // Need to look up active from sites
      const realActive = sites.find(s => s.id === active.id);
      if (!realActive) return;

      const newSites = sites.map(s => s.id === active.id ? { ...s, parentId: null } : s);
      setSites(newSites);
      showToast('已移出文件夹', 'success');

      try {
        await fetch('/api/sites', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...realActive, parentId: null })
        });
      } catch (e) {
        showToast('移动失败', 'error');
      }
      return;
    }

    // --- Category Drop Logic (New) ---
    // --- Category Drop Logic (New) ---
    // If over is a Category (from CategoryHeader droppable)
    if (over.data.current?.type === 'category' || categories.includes(over.id as string)) {
      const categoryId = over.id as string;
      const activeSite = sites.find(s => s.id === active.id);

      if (activeSite) {
        // If not already in category (DragOver didn't fire or failed?), move it.
        // If already in category (DragOver worked), just persist.
        let newSites = sites;
        if (activeSite.category !== categoryId) {
          newSites = sites.map(s => {
            if (s.id === active.id) {
              return { ...s, category: categoryId, parentId: null, order: 9999 }; // Append
            }
            return s;
          });
          setSites(newSites);
        } else {
          // Already moved by DragOver, use current sites
          newSites = sites;
        }

        // Persist immediately
        try {
          await fetch('/api/sites', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newSites)
          });
          showToast(`已移动到 "${categoryId}"`, 'success');
        } catch (e) {
          showToast('保存失败', 'error');
        }
        return;
      }
    }

    if (oldIndex === -1 || newIndex === -1) return;

    const activeItem = visualSites[oldIndex];
    const overItem = visualSites[newIndex];

    // --- FOLDER DROP LOGIC ---
    if (overItem.type === 'folder' && activeItem.id !== overItem.id && activeItem.type !== 'folder') {
      const isAlreadyChild = activeItem.parentId === overItem.id;
      if (!isAlreadyChild) {
        // Adopt the folder's category when dropped into it
        const updatedActive = { ...activeItem, parentId: overItem.id, category: overItem.category };
        const newSites = sites.map(s => s.id === activeItem.id ? updatedActive : s);
        setSites(newSites);
        showToast(`已移动到 "${overItem.name}"`, 'success');

        try {
          await fetch('/api/sites', {
            method: 'PUT', // Updated method per logic (assuming PUT handles updates)
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedActive)
          });
        } catch (e) {
          console.error("Failed to move to folder", e);
          showToast("移动失败", "error");
        }
        return;
      }
    }

    // 3. Handle Category Change (Standard Item-to-Item Drag)
    let newItem = { ...activeItem };
    if (activeTab === '全部' && activeItem.category !== overItem.category) {
      newItem.category = overItem.category;
      // Also clear parentId if moving to a different category via item sort
      if (newItem.parentId) newItem.parentId = null;
    }

    // 4. Move in Visual List
    const newVisualSites = [...visualSites];
    newVisualSites[oldIndex] = newItem;

    const reorderedSites = arrayMove(newVisualSites, oldIndex, newIndex).map((item, index) => ({
      ...item,
      order: index
    }));

    // 5. Update State & Persist
    let finalSites = reorderedSites;
    if (activeTab === '全部' && hiddenCategories.length > 0) {
      const hiddenSites = sites.filter(s => hiddenCategories.includes(s.category));
      finalSites = [...reorderedSites, ...hiddenSites];
    }

    setSites(finalSites);

    try {
      const res = await fetch('/api/sites', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalSites)
      });
      if (!res.ok) showToast('保存排序失败', 'error');
    } catch (error) {
      showToast('保存排序出错', 'error');
    }
  };

  /* DragOver Handler for Multi-Container Sorting */
  const handleDragOver = (event: any) => {
    const { active, over } = event;
    if (!over) return;
    if (active.id === over.id) return;

    // 1. Handle Category Header Hover -> Optimistic Move
    if (over.data.current?.type === 'category') {
      const categoryId = over.id as string;
      const activeSite = sites.find(s => s.id === active.id);
      if (activeSite && activeSite.category !== categoryId) {
        setSites(prev => prev.map(s =>
          s.id === active.id
            ? { ...s, category: categoryId, parentId: null, order: 9999 }
            : s
        ));
      }
      return;
    }

    // 2. Handle Cross-Container Sortable Item Drag
    const activeSite = sites.find(s => s.id === active.id);
    const overSite = sites.find(s => s.id === over.id);

    if (!activeSite || !overSite) return;

    // If moving between different categories (containers)
    if (activeSite.category !== overSite.category) {
      setSites(prev => {
        const activeIndex = prev.findIndex(s => s.id === active.id);
        const overIndex = prev.findIndex(s => s.id === over.id);

        return prev.map(s =>
          s.id === active.id
            ? { ...s, category: overSite.category, parentId: null } // Adopt new category
            : s
        );
      });
    }
  };

  const handleContextMenu = (e: React.MouseEvent, siteId: number) => {
    e.preventDefault();
    if (!isLoggedIn) return;
    const menuWidth = 160;
    const windowWidth = window.innerWidth;
    const clickX = e.clientX;
    const alignRight = (clickX + menuWidth) > windowWidth;
    setContextMenu({ visible: true, x: clickX, y: e.clientY, siteId: siteId as any, alignRight: alignRight });
  };

  const moveCategory = (oldIndex: number, newIndex: number) => {
    setCategories((items: string[]) => arrayMove(items, oldIndex, newIndex));
  };

  const handleImportData = async (data: any) => {
    try {
      showToast('正在导入配置...', 'loading');

      // 1. Update Local State
      if (data.sites) setSites(data.sites);
      if (data.categories) setCategories(data.categories);
      if (data.layout) setLayoutSettings(data.layout);
      if (data.config) setAppConfig(data.config);
      if (data.categoryColors) setCategoryColors(data.categoryColors);

      // New Fields
      if (data.hiddenCategories) setHiddenCategories(data.hiddenCategories);
      if (data.theme && typeof data.theme.isDarkMode === 'boolean') setIsDarkMode(data.theme.isDarkMode);
      if (data.searchEngine) setSearchEngine(data.searchEngine); // Restore Search Engine

      // Restore Custom Fonts
      if (data.customFonts && Array.isArray(data.customFonts)) {
        for (const font of data.customFonts) {
          try {
            // Persist to DB directly via API
            await fetch('/api/admin/fonts', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(font)
            });
          } catch (e) {
            console.error('Failed to restore font:', font.name);
          }
        }
        // Trigger global font refresh if possible, or reload page.
        // FontManager will pick up changes on next mount or via context refresh.
      }

      // 2. Persist to Database
      const res = await fetch('/api/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (res.ok) {
        showToast('配置导入成功', 'success');
        setIsSettingsOpen(false);
        // Force a reload to ensure all settings (fonts, theme) apply cleanly if needed
        setTimeout(() => window.location.reload(), 1000);
      } else {
        showToast('保存到数据库失败', 'error');
      }
    } catch (e) {
      console.error(e);
      showToast('数据格式错误', 'error');
    }
  };

  const filteredSites = useMemo(() => {
    let result = sites;

    if (searchQuery) {
      result = sites.filter((site: any) =>
        site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        site.url?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        site.desc?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else {
      // If not searching, filter by folder level
      result = result.filter((s: any) => {
        if (currentFolderId) {
          return s.parentId === currentFolderId;
        } else {
          return !s.parentId;
        }
      });

      if (activeTab !== '全部' && !currentFolderId) {
        result = result.filter((site: any) => site.category === activeTab);
      }
    }

    if (!appConfig.privateMode) return result;
    if (isGuestVerified) return result;
    return result.filter((site: any) => !site.isHidden);
  }, [sites, searchQuery, activeTab, appConfig.privateMode, isGuestVerified, currentFolderId]);

  const activeDragSite = activeDragId ? sites.find(s => s.id === activeDragId) : null;
  const containerClass = layoutSettings.isWideMode ? 'max-w-[98%] px-6' : 'max-w-7xl px-4';
  const currentEngine = SEARCH_ENGINES.find(e => e.id === currentEngineId) || SEARCH_ENGINES[0];
  const isSearching = !!searchQuery.trim() && currentEngineId === 'local';
  // Fix: Use allFonts (including custom) to find the family
  const currentFontFamily = allFonts.find(f => f.id === layoutSettings.fontFamily)?.family || 'sans-serif';

  // Get color for category pill
  const getCategoryColor = (cat: string) => {
    if (cat === '全部') return '#6366F1'; // Default Indigo
    return categoryColors[cat] || '#6366F1';
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart}
      onDragEnd={handleDragEnd} onDragOver={handleDragOver}>
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className={`min-h-screen transition-colors duration-500 selection:bg-indigo-500/30 selection:text-indigo-500 ${isDarkMode ? 'bg-[#0B1121] text-slate-200' : 'bg-[#F8FAFC] text-slate-700'} overflow-x-hidden flex flex-col relative group/spotlight`}
        style={{ fontFamily: currentFontFamily }}
      >
        {/* Dynamic Font Size Injection */}
        <style>{`
                    :root {
                        font-size: ${layoutSettings.fontSizeScale || 100}%;
                    }
                `}</style>
        <FontManager fontFamilyId={layoutSettings.fontFamily} />

        <AuroraBackground isDarkMode={isDarkMode} layoutSettings={layoutSettings} />
        <NoiseOverlay />
        <Toast notification={toast} onClose={() => setToast(prev => ({ ...prev, show: false }))}
          isDarkMode={isDarkMode} />

        {/* 私有模式锁定界面 - Prevent Flash: Show if configured OR if loading (security first) ?? No, if loading, we don't know configuration.
            If we show lock on loading, it flashes lock for everyone.
            Solution: If isLoading, show specific Loading State.
            If !isLoading && privateMode, show Lock.
            If !isLoading && !privateMode, show Content.
         */}
        {isLoading ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-50 dark:bg-slate-900 transition-opacity">
            <div className="flex flex-col items-center gap-4 animate-in fade-in duration-700">
              <div className="w-12 h-12 rounded-full border-4 border-indigo-500/30 border-t-indigo-500 animate-spin" />
              <p className="text-sm font-medium opacity-50 animate-pulse">正在加载配置...</p>
            </div>
          </div>
        ) : (
          <>
            {appConfig.privateMode && !isLoggedIn && !isGuestVerified ? (
              <PrivateModeScreen
                isDarkMode={isDarkMode}
                onVerify={async (password: string) => {
                  try {
                    const res = await fetch('/api/auth/private/verify', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ password })
                    });
                    if (res.ok) {
                      const data = await res.json();
                      if (data.success) {
                        setIsGuestVerified(true);
                        if (typeof window !== 'undefined') {
                          sessionStorage.setItem('aurora_guest_verified', 'true');
                        }
                        return true;
                      }
                    }
                    return false;
                  } catch {
                    return false;
                  }
                }}
                appConfig={appConfig}
              />
            ) : (
              <>
                {/* Overlay */}
                <div
                  className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px] transition-all duration-300 ease-out ${isSearchFocused ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
                  onClick={() => setIsSearchFocused(false)} />

                {/* Header */}
                <Header
                  isDarkMode={isDarkMode}
                  setIsDarkMode={setIsDarkMode}
                  layoutSettings={layoutSettings}
                  isScrolled={isScrolled}
                  appConfig={appConfig}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  isSearchFocused={isSearchFocused}
                  setIsSearchFocused={setIsSearchFocused}
                  searchInputRef={searchInputRef}
                  handleSearchChange={handleSearchChange}
                  currentEngineId={currentEngineId}
                  setCurrentEngineId={setCurrentEngineId}
                  isEngineMenuOpen={isEngineMenuOpen}
                  setIsEngineMenuOpen={setIsEngineMenuOpen}
                  searchSuggestions={searchSuggestions}
                  setSearchSuggestions={setSearchSuggestions}
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
                  setEditingSite={setEditingSite}
                  setIsModalOpen={setIsModalOpen}
                  isSettingsOpen={isSettingsOpen}
                  setIsSettingsOpen={setIsSettingsOpen}
                  setIsAccountSettingsModalOpen={setIsAccountSettingsModalOpen}
                  setIsLoginModalOpen={setIsLoginModalOpen}
                />

                {/* Content Container */}
                <div
                  className={`mx-auto w-full transition-all duration-300 flex-1 ${containerClass} ${layoutSettings.stickyHeader ? 'pt-28' : ''} ${layoutSettings.stickyFooter ? 'pb-28' : ''}`}>
                  {!isLoading && layoutSettings.showWidgets && !isSearching && (
                    <div className={layoutSettings.compactMode ? 'mb-4 mt-2' : 'mb-8 mt-4'}>
                      <WidgetDashboard isDarkMode={isDarkMode} sitesCount={sites.length} widgetStyle={layoutSettings.widgetStyle as "A" | "B" | "C"} widgetConfig={appConfig.widgetConfig} />
                    </div>
                  )}

                  {/* HTML5 Content Section - Header Bottom */}
                  <div className={`w-full ${layoutSettings.compactMode ? 'mb-4' : 'mb-8'} flex ${appConfig.htmlConfig?.headerLayout === 'row' ? 'flex-row flex-wrap justify-center gap-4' : 'flex-col items-center gap-4'}`}>
                    <SortableContext items={(appConfig.htmlConfig?.header || []).map((s: any) => s.id)} strategy={verticalListSortingStrategy}>
                      {(appConfig.htmlConfig?.header || []).map((section: any, idx: number) => (
                        <SortableHtmlSection key={section.id || `header-${idx}`} config={section} isDarkMode={isDarkMode} isLoggedIn={isLoggedIn} onContextMenu={handleHtmlContextMenu} />
                      ))}
                    </SortableContext>
                  </div>

                  {/* Category Tabs */}
                  {!isLoading && (layoutSettings.showNavBar ?? true) && (
                    <nav
                      className={`sticky z-30 w-full ${layoutSettings.compactMode ? 'mb-4' : 'mb-8'} transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isScrolled ? 'top-[4.5rem]' : 'top-[5.5rem]'}`}>
                      <div className="flex justify-center">
                        <div
                          onMouseMove={(e) => {
                            const bounds = e.currentTarget.getBoundingClientRect();
                            e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - bounds.left}px`);
                            e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - bounds.top}px`);
                          }}
                          className={`group/nav relative flex items-center gap-4 p-2 rounded-full overflow-hidden custom-scrollbar max-w-full backdrop-blur-2xl shadow-2xl shadow-indigo-500/10 ${isDarkMode ? 'bg-slate-900/60 ring-1 ring-white/10' : 'bg-white/60 ring-1 ring-white/60'}`}>

                          {/* Spotlight Effect */}
                          <div className={`pointer-events-none absolute -inset-px rounded-full opacity-0 transition-opacity duration-300 group-hover/nav:opacity-100 ${isDarkMode ? 'mix-blend-overlay' : 'mix-blend-multiply'}`}
                            style={{
                              background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(99,102,241,0.05)'}, transparent 40%)`
                            }}
                          />

                          <CategoryPill
                            label="全部"
                            active={activeTab === '全部'}
                            onClick={() => setActiveTab('全部')}
                            isDarkMode={isDarkMode}
                            color={getCategoryColor('全部')}
                            navColorMode={layoutSettings.navColorMode}
                          />
                          <div
                            className={`w-px h-5 shrink-0 ${isDarkMode ? 'bg-white/10' : 'bg-slate-400/20'}`}></div>
                          {categories.filter(cat => !hiddenCategories.includes(cat)).map(cat => (
                            <CategoryPill
                              key={cat}
                              label={cat}
                              active={activeTab === cat}
                              onClick={() => setActiveTab(cat)}
                              isDarkMode={isDarkMode}
                              color={getCategoryColor(cat)}
                              navColorMode={layoutSettings.navColorMode}
                              settings={layoutSettings}
                            />
                          ))}
                        </div>
                      </div>
                    </nav>
                  )}

                  {/* Main Grid */}
                  <main className="relative min-h-[40vh] pb-10">
                    {isLoggedIn && isSettingsOpen && (
                      <SettingsPanel
                        isDarkMode={isDarkMode}
                        onClose={() => setIsSettingsOpen(false)}
                        isWallpaperManagerOpen={isWallpaperManagerOpen}
                        setIsWallpaperManagerOpen={setIsWallpaperManagerOpen}
                        activeTab={activeSettingTab}
                        setActiveTab={setActiveSettingTab}
                        searchEngine={searchEngine} // [NEW] Pass searchEngine
                        layoutSettings={layoutSettings}
                        setLayoutSettings={setLayoutSettings}
                        categories={categories}
                        categoryColors={categoryColors}
                        setCategoryColors={setCategoryColors}
                        hiddenCategories={hiddenCategories}
                        toggleCategoryVisibility={(c: string) => setHiddenCategories(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c])}
                        handleDeleteCategory={(c: string) => setConfirmingDeleteCategory(c)}
                        handleAddCategory={async (n: string) => {
                          const name = n.trim();
                          if (!name) return;
                          if (categories.includes(name)) {
                            showToast('分类已存在', 'error');
                            return;
                          }
                          try {
                            const res = await fetch('/api/categories', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({ name, order: categories.length })
                            });
                            if (res.ok) {
                              setCategories([...categories, name]);
                              showToast('分类添加成功');
                            } else {
                              showToast('添加失败', 'error');
                            }
                          } catch (e) {
                            showToast('添加失败', 'error');
                          }
                        }}
                        sites={sites}
                        setSites={setSites}
                        setCategories={setCategories}
                        moveCategory={moveCategory}
                        handleImportData={handleImportData}
                        appConfig={appConfig}
                        setAppConfig={setAppConfig}
                        showToast={showToast}
                        setBingWallpaper={setBingWallpaper}
                        setIsModalOpen={setIsModalOpen}
                        setEditingSite={setEditingSite}
                        onDeleteSite={(site: any) => {
                          setDeleteSite(site);
                          setDeleteContents(false);
                          setIsConfirmationOpen(true);
                        }}
                      />
                    )}

                    {/* Site Grid */}
                    <div className={layoutSettings.compactMode ? 'space-y-4' : 'space-y-10'}>
                      {/* Breadcrumbs for Folder Navigation */}
                      {currentFolderId && (
                        <div className="mb-4 flex items-center gap-2 text-sm animate-in slide-in-from-left-2 fade-in duration-300">

                          <DroppableHomeBreadcrumb
                            onClick={() => setCurrentFolderId(null)}
                            isDarkMode={isDarkMode}
                          >
                            <HardDrive size={14} className="mr-1.5" /> 首页
                          </DroppableHomeBreadcrumb>

                          {(() => {
                            // Simple breadcrumb for 1 level deep for now
                            const currentFolder = sites.find(s => s.id === currentFolderId);
                            return (
                              <>
                                <ChevronRight size={14} className="text-slate-400 opacity-60" />
                                <div className={`px-3 py-1.5 rounded-full text-xs font-bold border select-none transition-colors
                                    ${isDarkMode
                                    ? 'bg-white/5 border-white/5 text-slate-200 shadow-sm'
                                    : 'bg-white border-slate-200 text-slate-700 shadow-sm'
                                  }`}>
                                  {currentFolder?.name || 'Folder'}
                                </div>
                              </>
                            );
                          })()}
                        </div>
                      )}

                      <SiteGrid
                        isLoading={isLoading}
                        filteredSites={filteredSites}
                        isSearching={!!searchQuery}
                        activeTab={activeTab}
                        categories={categories}
                        hiddenCategories={hiddenCategories}
                        layoutSettings={layoutSettings}
                        isDarkMode={isDarkMode}
                        isLoggedIn={isLoggedIn}
                        onEdit={(site: any) => {
                          setEditingSite(site);
                          setIsModalOpen(true);
                        }}
                        onDelete={(site: any) => {
                          setDeleteSite(site);
                          setDeleteContents(false);
                          setIsConfirmationOpen(true);
                        }}
                        onContextMenu={handleContextMenu}
                        getCategoryColor={getCategoryColor}
                        onFolderClick={(folder: any) => setCurrentFolderId(folder.id)}
                        sites={sites} // Pass sites for folder count
                      />
                    </div>
                  </main>

                  {/* HTML5 Content Section - Footer Top */}
                  <div className={`w-full mb-8 flex ${appConfig.htmlConfig?.footerLayout === 'row' ? 'flex-row flex-wrap justify-center gap-4' : 'flex-col items-center gap-4'}`}>
                    <SortableContext items={(appConfig.htmlConfig?.footer || []).map((s: any) => s.id)} strategy={verticalListSortingStrategy}>
                      {(appConfig.htmlConfig?.footer || []).map((section: any, idx: number) => (
                        <SortableHtmlSection key={section.id || `footer-${idx}`} config={section} isDarkMode={isDarkMode} isLoggedIn={isLoggedIn} onContextMenu={handleHtmlContextMenu} />
                      ))}
                    </SortableContext>
                  </div>
                </div>

                <Footer isDarkMode={isDarkMode} appConfig={appConfig} isSticky={layoutSettings.stickyFooter} />
              </>
            )}
          </>
        )}

        <DragOverlay style={{ transformOrigin: '0 0 ' }}>
          {activeDragSite ? (
            <div style={{ width: parseInt(String(layoutSettings.cardWidth || 260)), height: layoutSettings.cardHeight }}>
              <SiteCard site={activeDragSite} isLoggedIn={false} isDarkMode={isDarkMode}
                settings={layoutSettings} isOverlay />
            </div>
          ) : null}
          {(() => {
            const headerSection = appConfig.htmlConfig?.header?.find((s: any) => s.id === activeDragId);
            const footerSection = appConfig.htmlConfig?.footer?.find((s: any) => s.id === activeDragId);
            const activeSection = (headerSection || footerSection) as any;

            if (activeSection) {
              return (
                <div style={{ width: activeSection.width || '100%' }}>
                  <HtmlSectionContent config={activeSection} isDarkMode={isDarkMode} isLoggedIn={false} isOverlay />
                </div>
              )
            }
            return null;
          })()}
        </DragOverlay>

        {/* HTML Context Menu */}
        {htmlContextMenu.visible && (
          <div className="fixed z-[200] w-40 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
            style={{ top: htmlContextMenu.y, left: htmlContextMenu.x }}>
            <div className="p-1.5 flex flex-col gap-1">
              <button onClick={() => {
                setEditingHtmlSection(htmlContextMenu.section);
                setHtmlContextMenu({ ...htmlContextMenu, visible: false });
              }} className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-indigo-50 dark:hover:bg-white/10 text-slate-700 dark:text-slate-200 transition-colors">
                <Edit3 size={14} /> 编辑内容
              </button>
              <button onClick={() => handleDeleteHtmlSection(htmlContextMenu.section)}
                className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-red-50 dark:hover:bg-red-500/20 text-red-600 dark:text-red-400 transition-colors">
                <Trash2 size={14} /> 删除区域
              </button>
            </div>
          </div>
        )}

        {/* HTML Edit Modal */}
        {editingHtmlSection && (
          <HtmlEditModal
            section={editingHtmlSection}
            isDarkMode={isDarkMode}
            onClose={() => setEditingHtmlSection(null)}
            onSave={handleHtmlSave}
          />
        )}

        {/* Context Menu & Modals */}
        {contextMenu.visible && (
          <div
            className={`fixed z-[100] w-40 rounded-xl shadow-xl border py-1.5 animate-in fade-in zoom-in-95 duration-200 backdrop-blur-md ${isDarkMode ? 'bg-slate-800/90 border-white/10' : 'bg-white/90 border-slate-100'}`}
            style={{
              top: contextMenu.y,
              left: contextMenu.alignRight ? undefined : contextMenu.x,
              right: contextMenu.alignRight ? (window.innerWidth - contextMenu.x) : undefined
            }}
          >
            <button onClick={() => {
              setEditingSite(sites.find(s => s.id === contextMenu.siteId));
              setContextMenu({ ...contextMenu, visible: false });
              setIsModalOpen(true);
            }}
              className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-2 active:scale-95 transition-transform ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-slate-50'}`}>
              <Edit3 size={14} />编辑
            </button>
            <button onClick={() => {
              const site = sites.find(s => s.id === contextMenu.siteId);
              if (site) navigator.clipboard.writeText(site.url);
              setContextMenu({ ...contextMenu, visible: false });
            }}
              className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-2 active:scale-95 transition-transform ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-slate-50'}`}>
              <Copy size={14} />复制链接
            </button>
            {currentFolderId && (
              <button onClick={async () => {
                const siteId = contextMenu.siteId;
                if (!siteId) return;
                const site = sites.find(s => s.id === siteId);
                // Optimistic
                setSites(prev => prev.map(s => s.id === siteId ? { ...s, parentId: null } : s));
                setContextMenu({ ...contextMenu, visible: false });
                showToast('已移出文件夹', 'success');
                try {
                  await fetch('/api/sites', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ...site, parentId: null })
                  });
                } catch (e) { showToast('移动失败', 'error'); }
              }}
                className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-2 active:scale-95 transition-transform ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-slate-50'}`}>
                <ArrowUp size={14} />移出文件夹
              </button>
            )}
            <div className={`h-px my-1 ${isDarkMode ? 'bg-white/10' : 'bg-slate-100'}`}></div>
            <button onClick={() => {
              setDeleteSite(sites.find(s => s.id === contextMenu.siteId));
              setDeleteContents(false);
              setIsConfirmationOpen(true);
              setContextMenu({ ...contextMenu, visible: false });
            }}
              className="w-full text-left px-4 py-2.5 text-sm flex items-center gap-2 text-red-500 hover:bg-red-500/10 active:scale-95 transition-transform">
              <Trash2 size={14} />删除
            </button>
          </div>
        )}
        <AnimatePresence>
          {isModalOpen && <EditModal key="edit-modal" site={editingSite} categories={categories} sites={sites} isDarkMode={isDarkMode} settings={layoutSettings}
            onClose={() => setIsModalOpen(false)} onSave={async (data: any) => {

              try {
                if (editingSite) {
                  const res = await fetch('/api/sites', {
                    method: 'PUT',
                    body: JSON.stringify({ ...data, id: editingSite.id })
                  });
                  if (res.ok) {
                    const updated = await res.json();
                    setSites(sites.map(s => s.id === editingSite.id ? updated : s));
                    setIsModalOpen(false);
                    showToast('站点已更新', 'success');
                  } else showToast('更新失败', 'error');
                } else {
                  const res = await fetch('/api/sites', {
                    method: 'POST',
                    body: JSON.stringify({ ...data })
                  });
                  if (res.ok) {
                    const created = await res.json();
                    setSites([...sites, created]);
                    setIsModalOpen(false);
                    showToast('站点已添加', 'success');
                  } else showToast('添加失败', 'error');
                }
              } catch (e) {
                showToast('保存失败', 'error');
              }
            }} />}
        </AnimatePresence>
        {confirmingDeleteCategory && <ConfirmationModal isOpen={true} title="删除分类"
          message="确定删除该分类及其下所有站点吗？操作无法撤销。"
          isDarkMode={isDarkMode}
          onCancel={() => setConfirmingDeleteCategory(null)}
          onConfirm={async () => {
            try {
              const res = await fetch(`/api/categories?name=${encodeURIComponent(confirmingDeleteCategory)}`, { method: 'DELETE' });
              const data = await res.json();
              if (res.ok) {
                setCategories(prev => prev.filter(c => c !== confirmingDeleteCategory));
                setSites(prev => prev.filter(s => s.category !== confirmingDeleteCategory));
                setConfirmingDeleteCategory(null);
                showToast('分类已删除', 'success');
              } else {
                console.error('Delete failed:', data);
                showToast(data.error || '删除失败', 'error');
              }
            } catch (e) {
              console.error('Delete error:', e);
              showToast('删除请求失败', 'error');
            }
          }} />}

        <ConfirmationModal
          isOpen={isConfirmationOpen}
          onCancel={() => setIsConfirmationOpen(false)}
          onConfirm={async () => {
            if (deleteSite) {
              try {
                const res = await fetch(`/api/sites?id=${deleteSite.id}&deleteContents=${deleteContents}`, { method: 'DELETE' });
                if (res.ok) {
                  // Optimistic update:
                  // 1. Remove the deleted site/folder
                  // 2. If it was a folder and we kept contents, move children to root (parentId = null)
                  setSites(prev => {
                    const filtered = prev.filter(s => s.id !== deleteSite.id);
                    if (deleteSite.type === 'folder' && !deleteContents) {
                      return filtered.map(s => s.parentId === deleteSite.id ? { ...s, parentId: null } : s);
                    }
                    return filtered;
                  });
                  await fetchSites();
                  showToast('已删除', 'success');
                } else {
                  showToast('删除失败', 'error');
                }
              } catch (error) {
                console.error('Delete failed', error);
                showToast('请求出错', 'error');
              }
            }
            setIsConfirmationOpen(false);
            setDeleteSite(null);
          }}
          isDarkMode={isDarkMode}
          isDeletingFolder={deleteSite?.type === 'folder'}
          deleteContents={deleteContents}
          setDeleteContents={setDeleteContents}
          title={deleteSite?.type === 'folder' ? '删除文件夹' : undefined}
          message={deleteSite?.type === 'folder' ? '要删除这个文件夹吗？' : undefined}
          confirmText={deleteSite?.type === 'folder' ? '确定删除' : undefined}
        />
        {confirmingDeleteHtmlSection && <ConfirmationModal isOpen={true} title="删除区域"
          message="确定要删除此 HTML 内容区域吗？操作无法撤销。"
          isDarkMode={isDarkMode}
          onCancel={() => setConfirmingDeleteHtmlSection(null)}
          onConfirm={confirmDeleteHtmlSection} />}
        {isLoginModalOpen &&
          <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} onLogin={async (u: string, p: string) => {
            try {
              const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: u, password: p })
              });
              if (res.ok) {
                setIsLoggedIn(true);
                setIsLoginModalOpen(false);
                showToast('登录成功', 'success');
              } else {
                showToast('账号或密码错误', 'error');
              }
            } catch (e) {
              showToast('登录失败', 'error');
            }
          }} isDarkMode={isDarkMode} />}


        {isLoggedIn && isAccountSettingsModalOpen &&
          <AccountSettingsModal
            isOpen={isAccountSettingsModalOpen}
            onClose={() => setIsAccountSettingsModalOpen(false)}
            isDarkMode={isDarkMode}
            showToast={showToast}
            onLogout={() => {
              setIsLoggedIn(false);
              localStorage.removeItem('aurora_is_logged_in');
              setIsAccountSettingsModalOpen(false);
              // Clear guest verification too as security measure
              setIsGuestVerified(false);
              sessionStorage.removeItem('aurora_guest_verified');
              setTimeout(() => setIsLoginModalOpen(true), 500);
            }}
          />
        }

        <style>{`
                    :root { --mouse-x: 0px; --mouse-y: 0px; }
                    .group\\/spotlight:hover .spotlight-card::before { opacity: 1; }
                    .spotlight-card::before { background: radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), rgba(99, 102, 241, 0.15), transparent 40%); content: ""; display: block; height: 100%; left: 0; opacity: 0; position: absolute; top: 0; width: 100%; z-index: 2; pointer-events: none; transition: opacity 0.5s; }
                    .text-shadow-sm { text-shadow: 0 1px 2px rgba(0,0,0,0.15), 0 0 1px rgba(0,0,0,0.1); }
                    @keyframes slow-spin { from { transform: rotate(0deg) scale(1); } to { transform: rotate(360deg) scale(1); } }
                    @keyframes gradient-move { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
                    .animate-slow-spin { animation: slow-spin 60s linear infinite; }
                    .animate-gradient-move { animation: gradient-move 3s ease infinite; }
                    .custom-scrollbar::-webkit-scrollbar { height: 0px; width: 0px; }
                    .dynamic-grid { grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); }
                    @media (min-width: 640px) { .dynamic-grid { grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); } }
                    @media (min-width: 1024px) { .dynamic-grid { grid-template-columns: repeat(var(--grid-cols, 5), minmax(0, 1fr)); } }
                `}</style>
      </div>
    </DndContext>
  );
}

// --- Components ---





// 私有模式锁定界面

function Toast({ notification, onClose, isDarkMode }: any) {
  if (!notification.show) return null;
  return (<div
    className="fixed top-6 left-1/2 -translate-x-1/2 z-[300] animate-in slide-in-from-top-4 fade-in duration-300">
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-2xl shadow-2xl backdrop-blur-xl border ${isDarkMode ? 'bg-slate-800/90 border-white/10 text-white' : 'bg-white/90 border-white/60 text-slate-800'}`}>{notification.type === 'success' ?
        <CheckCircle2 className="text-emerald-500" size={20} /> : <XCircle className="text-red-500" size={20} />}<span
          className="text-sm font-medium">{notification.message}</span></div>
  </div>);
}











// Updated CategoryPill to support Custom Colors








