import React, { useRef } from 'react';
import { Search, LayoutGrid, X, ChevronDown, Plus, Settings, User, LogOut, LogIn, Command } from 'lucide-react';
import { SEARCH_ENGINES } from '@/lib/utils';
import { ThemeToggle } from './ThemeToggle';
import { ActionButton } from '@/app/components/ui/ActionButton';

interface HeaderProps {
    isDarkMode: boolean;
    setIsDarkMode: (val: boolean) => void;
    layoutSettings: any;
    isScrolled: boolean;
    appConfig: any;
    searchQuery: string;
    setSearchQuery: (val: string) => void;
    isSearchFocused: boolean;
    setIsSearchFocused: (val: boolean) => void;
    searchInputRef: React.RefObject<HTMLInputElement | null>;
    handleSearchChange: (val: string) => void;
    currentEngineId: string;
    setCurrentEngineId: (val: string) => void;
    isEngineMenuOpen: boolean;
    setIsEngineMenuOpen: (val: boolean) => void;
    searchSuggestions: string[];
    setSearchSuggestions: (val: string[]) => void;
    isLoggedIn: boolean;
    setIsLoggedIn: (val: boolean) => void;
    setEditingSite: (val: any) => void;
    setIsModalOpen: (val: boolean) => void;
    isSettingsOpen: boolean;
    setIsSettingsOpen: (val: boolean) => void;
    setIsAccountSettingsModalOpen: (val: boolean) => void;
    setIsLoginModalOpen: (val: boolean) => void;
}

export function Header({
    isDarkMode, setIsDarkMode, layoutSettings, isScrolled, appConfig,
    searchQuery, setSearchQuery, isSearchFocused, setIsSearchFocused, searchInputRef, handleSearchChange,
    currentEngineId, setCurrentEngineId, isEngineMenuOpen, setIsEngineMenuOpen, searchSuggestions, setSearchSuggestions,
    isLoggedIn, setIsLoggedIn, setEditingSite, setIsModalOpen, isSettingsOpen, setIsSettingsOpen, setIsAccountSettingsModalOpen, setIsLoginModalOpen
}: HeaderProps) {

    const currentEngine = SEARCH_ENGINES.find(e => e.id === currentEngineId) || SEARCH_ENGINES[0];

    return (
        <header
            className={`${layoutSettings.stickyHeader ? 'fixed top-0 left-0 right-0 z-50' : 'relative z-40'} w-full transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isScrolled ? 'pt-2 pb-2 px-2 sm:px-4' : 'pt-6 pb-2 px-4'}`}>
            <div
                className={`mx-auto transition-all duration-300 ${layoutSettings.isWideMode ? 'max-w-[98%]' : 'max-w-7xl'}`}>
                <div className={`relative flex items-center justify-between px-2 sm:px-6 rounded-2xl backdrop-blur-2xl border shadow-xl shadow-indigo-500/5 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] 
                        ${isDarkMode ? 'bg-slate-900/80 border-white/10' : 'bg-white/80 border-white/40 ring-1 ring-white/50'}
                        ${isScrolled ? 'py-2 bg-opacity-90 shadow-lg' : 'py-3'}
                    `}>

                    {/* Logo */}
                    <div
                        className={`flex items-center gap-3 shrink-0 pl-2 select-none z-50 transition-all duration-500 ease-in-out ${isScrolled ? 'scale-90' : ''}`}>
                        <div
                            className="relative group cursor-pointer active:scale-95 transition-transform duration-200"
                            onClick={() => window.location.reload()}>
                            <div className="flex items-center gap-3">
                                {/* Logo Image or Default Icon */}
                                {appConfig.logoImage ? (
                                    <img src={appConfig.logoImage} alt="Logo"
                                        className="h-10 w-auto object-contain hover:opacity-80 transition-opacity" />
                                ) : (
                                    <div className="relative group">
                                        <div className="absolute inset-0 bg-indigo-500 blur-lg opacity-40 group-hover:opacity-60 transition-opacity"></div>
                                        <div className="relative w-10 h-10 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center shadow-inner text-white transform group-hover:scale-105 transition-transform">
                                            <LayoutGrid size={22} />
                                        </div>
                                    </div>
                                )}

                                {/* Logo Text */}
                                {(appConfig.logoText || appConfig.logoHighlight) && (
                                    <div
                                        className="grid transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] grid-rows-[1fr] opacity-100 ml-0">
                                        <span
                                            className={`text-xl font-bold tracking-tight overflow-hidden hidden sm:block ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                                            {appConfig.logoText}<span
                                                className="text-indigo-500">{appConfig.logoHighlight}</span>
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div
                        className={`flex-1 max-w-2xl mx-4 md:mx-8 relative group transition-all duration-500 ${isSearchFocused ? 'z-50 scale-[1.02]' : 'z-20'} ${isScrolled ? 'md:mx-12' : ''}`}>
                        <div
                            className={`relative flex items-center rounded-full transition-all duration-300 ${isSearchFocused ? (isDarkMode ? 'bg-slate-800 shadow-2xl shadow-indigo-500/20 border-indigo-500/50' : 'bg-white shadow-2xl shadow-indigo-500/20 border-indigo-500/50') : (isDarkMode ? 'bg-black/20 hover:bg-black/30 border border-white/5' : 'bg-slate-100/50 hover:bg-white/80 border border-transparent hover:shadow-lg hover:shadow-indigo-500/5')}`}>
                            <div className="relative shrink-0 pl-1">
                                <button onClick={() => setIsEngineMenuOpen(!isEngineMenuOpen)}
                                    className={`flex items-center gap-2 pl-3 pr-2 py-2.5 rounded-l-full text-sm font-medium transition-all active:scale-95 ${isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-indigo-600'}`}>
                                    {currentEngine.icon ? <currentEngine.icon size={16} /> : <Search size={16} />}
                                    <ChevronDown size={12} className="opacity-50" />
                                </button>
                                {isEngineMenuOpen && (
                                    <>
                                        <div className="fixed inset-0 z-10"
                                            onClick={() => setIsEngineMenuOpen(false)} />
                                        <div
                                            className={`absolute top-full left-0 mt-3 w-48 rounded-xl shadow-2xl border overflow-hidden py-1.5 z-30 animate-in fade-in zoom-in-95 duration-200 ${isDarkMode ? 'bg-slate-800 border-white/10' : 'bg-white border-slate-100'}`}>
                                            {SEARCH_ENGINES.map(eng => {
                                                // Note: lucide icons need to be handled if they are not LucideIcon type directly or if passed strangely.
                                                // But here we import them so it is fine.
                                                // Actually SEARCH_ENGINES in utils.tsx imports icons there.
                                                // But we need to make sure 'eng.icon' is usable as JSX tag.
                                                // It is, because utils.tsx imports them.
                                                const Icon = eng.icon;
                                                return (
                                                    <button key={eng.id} onClick={() => {
                                                        setCurrentEngineId(eng.id);
                                                        setIsEngineMenuOpen(false);
                                                    }}
                                                        className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-2 transition-colors active:bg-indigo-500/10 ${currentEngineId === eng.id ? 'bg-indigo-500/10 text-indigo-500' : 'hover:bg-slate-50 dark:hover:bg-white/5'}`}>
                                                        {Icon && <Icon size={14} />} {eng.name}
                                                    </button>
                                                )
                                            })}
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className={`w-px h-5 ${isDarkMode ? 'bg-white/10' : 'bg-slate-300/50'}`}></div>
                            <input
                                ref={searchInputRef}
                                type="text"
                                placeholder={currentEngine.placeholder}
                                value={searchQuery}
                                onFocus={() => setIsSearchFocused(true)}
                                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                                onKeyDown={(e) => e.key === 'Enter' && searchQuery.trim() && (currentEngineId === 'local' ? setSearchQuery('') : window.open(currentEngine.url + encodeURIComponent(searchQuery), '_blank'))}
                                onChange={(e) => handleSearchChange(e.target.value)}
                                className={`w-full bg-transparent border-none py-3 px-3 focus:outline-none text-sm sm:text-base truncate ${isDarkMode ? 'text-white placeholder:text-slate-500' : 'text-slate-800 placeholder:text-slate-400'}`}
                            />
                            <div className="pr-3 flex items-center gap-2">
                                {searchQuery ? (
                                    <button onClick={() => setSearchQuery('')}
                                        className="active:scale-90 transition-transform"><X size={16}
                                            className="text-slate-400 hover:text-slate-600" />
                                    </button>
                                ) : (
                                    <>
                                        {!isSearchFocused && <div
                                            className={`hidden sm:flex items-center gap-1 px-1.5 py-0.5 rounded border text-[10px] font-mono opacity-50 ${isDarkMode ? 'border-white/10 text-slate-400' : 'border-slate-200 text-slate-500'}`}>
                                            <Command size={10} />K</div>}
                                        <div
                                            className={`p-1.5 rounded-full ${isDarkMode ? 'bg-white/5 text-slate-500' : 'bg-indigo-50 text-indigo-400'}`}>
                                            <Search size={16} /></div>
                                    </>
                                )}
                            </div>
                            {searchSuggestions.length > 0 && (
                                <div
                                    className={`absolute top-full left-4 right-4 mt-2 rounded-xl border shadow-xl z-50 overflow-hidden animate-in slide-in-from-top-2 fade-in duration-200 ${isDarkMode ? 'bg-slate-800 border-white/10' : 'bg-white border-slate-100'}`}>
                                    {searchSuggestions.map((s, i) => (<div key={i} onClick={() => {
                                        setSearchQuery(s);
                                        setSearchSuggestions([]);
                                    }}
                                        className={`px-4 py-2 text-sm cursor-pointer transition-colors ${isDarkMode ? 'hover:bg-white/5 text-slate-300' : 'hover:bg-slate-50 text-slate-600'}`}>{s}</div>))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1 sm:gap-2 shrink-0 pr-1 z-50">
                        <ThemeToggle isDarkMode={isDarkMode} toggleTheme={() => setIsDarkMode(!isDarkMode)} />
                        {isLoggedIn && (
                            <>
                                <ActionButton icon={Plus} onClick={() => {
                                    setEditingSite(null);
                                    setIsModalOpen(true);
                                }} tooltip="添加" isDarkMode={isDarkMode} highlight />
                                <ActionButton icon={Settings} onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                                    tooltip="设置" active={isSettingsOpen} isDarkMode={isDarkMode} />
                                <ActionButton icon={User} onClick={() => setIsAccountSettingsModalOpen(true)}
                                    tooltip="账号设置" isDarkMode={isDarkMode} />
                            </>
                        )}
                        <ActionButton icon={isLoggedIn ? LogOut : LogIn}
                            onClick={() => isLoggedIn ? setIsLoggedIn(false) : setIsLoginModalOpen(true)}
                            tooltip={isLoggedIn ? "退出" : "登录"} isDarkMode={isDarkMode}
                            danger={isLoggedIn} />
                    </div>
                </div>
            </div>
        </header>
    );
}
