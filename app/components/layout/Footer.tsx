import React, { useState, useEffect } from 'react';
import { LayoutGrid, Globe } from 'lucide-react';
import { SOCIAL_ICONS } from '@/lib/constants';

interface FooterProps {
    isDarkMode: boolean;
    appConfig: any;
    isSticky: boolean;
}

export function Footer({ isDarkMode, appConfig, isSticky }: FooterProps) {
    // Fix hydration: only set year after mount
    const [currentYear, setCurrentYear] = useState<number | null>(null);

    useEffect(() => {
        setCurrentYear(new Date().getFullYear());
    }, []);

    const displayYear = currentYear || new Date().getFullYear();
    const footerText = appConfig.footerText || `© ${displayYear} JiGuang. Build your own start page.`;
    const footerLinks = appConfig.footerLinks || [];

    return (
        <footer
            className={`w-full transition-all duration-300 border-t ${isSticky ? 'fixed bottom-0 left-0 right-0 z-50 backdrop-blur-xl shadow-[0_-4px_20px_-4px_rgba(0,0,0,0.05)]' : 'relative mt-auto'} ${isDarkMode ? 'bg-slate-900/90 border-white/5 text-slate-400' : 'bg-white/90 border-slate-100 text-slate-500'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-8">
                    <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6 text-center md:text-left">
                        <div className="flex items-center gap-2 select-none opacity-80 hover:opacity-100 transition-opacity">
                            {appConfig.logoImage ? (
                                <img src={appConfig.logoImage} className="h-5 w-auto object-contain" alt="Logo" />
                            ) : (
                                <div
                                    className={`w-5 h-5 rounded-md flex items-center justify-center text-white shadow-sm ${isDarkMode ? 'bg-indigo-500' : 'bg-slate-800'}`}>
                                    <LayoutGrid size={12} />
                                </div>
                            )}
                            {(appConfig.logoText || appConfig.logoHighlight) && (
                                <span
                                    className={`text-sm font-bold tracking-tight ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>
                                    {appConfig.logoText}<span className="text-indigo-500">{appConfig.logoHighlight}</span>
                                </span>
                            )}
                        </div>
                        <div className="hidden md:block w-px h-4 bg-current opacity-20"></div>
                        <div
                            className="text-xs font-medium opacity-60 hover:opacity-100 transition-opacity">{footerText.replace('{year}', String(displayYear))}</div>
                    </div>
                    {footerLinks.length > 0 && (<div
                        className="flex flex-wrap justify-center gap-4 md:gap-6">{footerLinks.map((link: any, i: number) => (
                            <a key={i} href={link.url} target="_blank" rel="noopener noreferrer"
                                className={`text-xs font-medium transition-colors hover:underline underline-offset-4 ${isDarkMode ? 'hover:text-indigo-400' : 'hover:text-indigo-600'}`}>{link.name}</a>))}</div>)}

                    {/* Social Icons */}
                    {(appConfig.socialLinks || []).length > 0 && (
                        <div className="flex items-center gap-2">
                            {(appConfig.socialLinks || []).map((link: any, i: number) => {
                                const socialDef = SOCIAL_ICONS.find((s: any) => s.id === link.icon);
                                const Icon = socialDef?.icon || Globe;
                                // Brand colors for each social platform
                                const brandColors: Record<string, string> = {
                                    github: 'hover:text-[#333] dark:hover:text-white',
                                    twitter: 'hover:text-[#1DA1F2]',
                                    youtube: 'hover:text-[#FF0000]',
                                    linkedin: 'hover:text-[#0A66C2]',
                                    instagram: 'hover:text-[#E4405F]',
                                    facebook: 'hover:text-[#1877F2]',
                                    twitch: 'hover:text-[#9146FF]',
                                    mail: 'hover:text-[#EA4335]',
                                    rss: 'hover:text-[#FFA500]',
                                    wechat: 'hover:text-[#07C160]',
                                    globe: 'hover:text-indigo-500',
                                };
                                const colorClass = brandColors[link.icon] || 'hover:text-indigo-500';
                                return (
                                    <a
                                        key={i}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title={socialDef?.name || 'Link'}
                                        className={`p-2.5 rounded-xl transition-all duration-300 hover:scale-125 hover:shadow-lg hover:-translate-y-0.5 ${colorClass} ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-slate-100'}`}
                                    >
                                        <Icon size={20} />
                                    </a>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </footer>
    );
}
