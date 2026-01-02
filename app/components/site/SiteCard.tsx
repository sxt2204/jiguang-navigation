import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';


import NextImage from 'next/image';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Globe, MoreHorizontal, ExternalLink, Folder } from 'lucide-react';
import { hexToRgb, getAccessibleTextColor, shouldUseTextShadow, FAVICON_PROVIDERS } from '@/lib/utils';
import { ICON_MAP, FONTS } from '@/lib/constants';
import { useFonts } from '@/app/hooks/useFonts';
import { useOnlineStatus } from '@/app/hooks/useOnlineStatus';

interface SiteCardProps {
    site: any;
    isLoggedIn: boolean;
    isDarkMode: boolean;
    settings: any;
    onEdit?: () => void;
    onDelete?: () => void;
    onContextMenu?: (e: React.MouseEvent, id: any) => void;
    isOverlay?: boolean;
    onFolderClick?: (folder: any) => void;
    isDropTarget?: boolean; // Visual feedback for folder drop target
}

export const SiteCard = React.memo(function SiteCard({
    site,
    isLoggedIn,
    isDarkMode,
    settings,
    onEdit,
    onDelete,
    onContextMenu,
    isOverlay,
    onFolderClick,
    childCount, // New Prop
    isDropTarget, // Visual feedback for folder drop target
}: SiteCardProps & { childCount?: number }) {
    const isOnline = useOnlineStatus();
    const [iconState, setIconState] = useState(0);
    const [imgSrc, setImgSrc] = useState<string | null>(null);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        setIconState(0);
        setHasError(false);
    }, [site.url, site.iconType, isOnline]);

    useEffect(() => {
        if (site.iconType === 'upload' && site.customIconUrl) {
            setImgSrc(site.customIconUrl);
            setHasError(false);
        } else if (site.iconType === 'auto' && site.icon && (site.icon.startsWith('/') || site.icon.startsWith('http'))) {
            // Priority 1: Local Cache
            setImgSrc(site.icon);
            setHasError(false);
        }
    }, [site.customIconUrl, site.iconType, site.icon]);

    const handleClick = (e: React.MouseEvent) => {
        // Assuming isDragging is defined elsewhere or will be added.
        // For now, it will be undefined if not provided by useSortable or similar.
        // if (isDragging) return; 

        if (site.type === 'folder') {
            e.preventDefault();
            onFolderClick?.(site);
            return;
        }

        e.preventDefault();
        window.open(site.url, '_blank');
    };

    const handleImageError = () => {
        if (hasError) return;
        setHasError(true);
        // Fallback logic handled in render
    };

    const Icon = site.type === 'folder' ? Folder : (ICON_MAP[site.icon] || Globe);
    const brandRgb = hexToRgb(site.color || '#6366f1');
    const bgBase = isDarkMode ? [30, 41, 59] : [255, 255, 255];
    const isWallpaperMode = settings.bgEnabled && (settings.bgType === 'bing' || settings.bgType === 'custom');
    const safeOpacity = settings.glassOpacity / 100;

    // --- Shadow Calculation ---
    const shadowLevel = settings.shadowIntensity ?? 4;
    const isFlat = shadowLevel === 0;
    const shadowMultiplier = shadowLevel / 4;
    const hoverMultiplier = Math.min((shadowMultiplier * 1.5) + 0.2, 2.5);

    let bgColor, borderColor, boxShadow, hoverBoxShadow;

    if (settings.colorfulCards) {
        // Configurable Mix Ratio & Opacity
        const mixPercent = settings.colorfulMixRatio ?? 40;
        const opacityPercent = settings.colorfulOpacity ?? 60;
        const mixRatio = mixPercent / 100;
        const overlayOpacity = opacityPercent / 100;
        // Make gradient alpha proportional to overlay opacity but slightly lower
        const gradientAlpha = Math.max(0.1, overlayOpacity - 0.2);

        if (isWallpaperMode) {
            // Mix Brand color with Base color
            const r = Math.round(bgBase[0] * (1 - mixRatio) + brandRgb.r * mixRatio);
            const g = Math.round(bgBase[1] * (1 - mixRatio) + brandRgb.g * mixRatio);
            const b = Math.round(bgBase[2] * (1 - mixRatio) + brandRgb.b * mixRatio);

            bgColor = `rgba(${r}, ${g}, ${b}, ${safeOpacity})`;
            borderColor = `rgba(${brandRgb.r}, ${brandRgb.g}, ${brandRgb.b}, ${isDarkMode ? 0.6 : 0.5})`;
            boxShadow = isFlat ? 'none' : `0 ${8 * shadowMultiplier}px ${32 * shadowMultiplier}px -${8 * shadowMultiplier}px rgba(${brandRgb.r}, ${brandRgb.g}, ${brandRgb.b}, ${0.4 * Math.min(shadowMultiplier, 1.2)})`;
            hoverBoxShadow = isFlat ? 'none' : `0 ${12 * hoverMultiplier}px ${40 * hoverMultiplier}px -${10 * hoverMultiplier}px rgba(${brandRgb.r}, ${brandRgb.g}, ${brandRgb.b}, ${0.5 * Math.min(hoverMultiplier, 1.2)})`;
        } else {
            // Mode: Colorful (Pure)
            bgColor = `rgba(${brandRgb.r}, ${brandRgb.g}, ${brandRgb.b}, ${safeOpacity})`;
            borderColor = `rgba(${brandRgb.r}, ${brandRgb.g}, ${brandRgb.b}, ${Math.min(safeOpacity + 0.3, 1)})`;
            boxShadow = isFlat ? 'none' : `0 ${8 * shadowMultiplier}px ${32 * shadowMultiplier}px -${8 * shadowMultiplier}px rgba(${brandRgb.r}, ${brandRgb.g}, ${brandRgb.b}, ${0.25 * Math.min(shadowMultiplier, 1.2)})`;
            hoverBoxShadow = isFlat ? 'none' : `0 ${12 * hoverMultiplier}px ${40 * hoverMultiplier}px -${10 * hoverMultiplier}px rgba(${brandRgb.r}, ${brandRgb.g}, ${brandRgb.b}, ${0.35 * Math.min(hoverMultiplier, 1.2)})`;
        }

        // Overlay element injection happens in the render loop below using calculated values
    } else {
        // Mode: Default Glassmorphism
        bgColor = `rgba(${bgBase[0]}, ${bgBase[1]}, ${bgBase[2]}, ${safeOpacity})`;
        borderColor = `rgba(${isDarkMode ? '255,255,255' : '0,0,0'}, ${isDarkMode ? 0.1 : 0.05})`;
        boxShadow = isFlat ? 'none' : (isDarkMode
            ? `0 ${8 * shadowMultiplier}px ${32 * shadowMultiplier}px -${8 * shadowMultiplier}px rgba(0,0,0,${0.5 * Math.min(shadowMultiplier, 1)})`
            : `0 ${8 * shadowMultiplier}px ${32 * shadowMultiplier}px -${8 * shadowMultiplier}px rgba(0,0,0,${0.1 * Math.min(shadowMultiplier, 1.5)})`);
        hoverBoxShadow = isFlat ? 'none' : (isDarkMode
            ? `0 ${12 * hoverMultiplier}px ${40 * hoverMultiplier}px -${10 * hoverMultiplier}px rgba(0,0,0,${0.6 * Math.min(hoverMultiplier, 1)})`
            : `0 ${12 * hoverMultiplier}px ${40 * hoverMultiplier}px -${10 * hoverMultiplier}px rgba(0,0,0,${0.15 * Math.min(hoverMultiplier, 1.5)})`);
    }

    // Determine contrast
    let perceivedBg = isDarkMode ? '#1e293b' : '#ffffff';
    let forceWhiteText = false;

    if (isWallpaperMode && settings.glassOpacity < 60) {
        forceWhiteText = true;
    } else if (settings.colorfulCards && (settings.glassOpacity >= 60)) {
        perceivedBg = site.color || '#6366f1';
    }

    const [realWidth, setRealWidth] = useState(settings.cardWidth || 260);
    const cardRef = React.useRef<HTMLAnchorElement>(null);

    useEffect(() => {
        if (!cardRef.current) return;
        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                if (entry.contentBoxSize) {
                    setRealWidth(entry.contentBoxSize[0].inlineSize);
                } else {
                    setRealWidth(entry.contentRect.width);
                }
            }
        });
        resizeObserver.observe(cardRef.current);
        // Initial set
        setRealWidth(cardRef.current.offsetWidth);
        return () => resizeObserver.disconnect();
    }, []);

    const textColor = forceWhiteText ? '#ffffff' : getAccessibleTextColor(perceivedBg);
    const hasShadow = forceWhiteText || shouldUseTextShadow(textColor);

    // Dynamic Sizing based on Real Dimensions
    const height = settings.cardHeight;
    const width = realWidth;

    const isTinyHeight = height < 85;
    const isSmallHeight = height < 110;
    const isTinyWidth = width < 140;
    const isSmallWidth = width < 200;

    const isMicroHeight = height < 60;
    const isMicroWidth = width < 110;

    let iconSizePx = 40;
    let paddingClass = 'p-4';
    let gapClass = 'gap-3';
    let titleSizeBonus = 0;

    // --- Icon Size Logic ---
    // User Request: Height > 60 -> Original (40).
    if (isMicroHeight || isMicroWidth) {
        iconSizePx = 30;
    } else if (height < 60 || width < 140) {
        iconSizePx = 24;
    } else if (width < 200) {
        iconSizePx = 32; // Constrained by width only
    } else {
        iconSizePx = 40;
    }

    // --- Padding/Gap Logic ---
    if (isMicroHeight || isMicroWidth) {
        paddingClass = 'p-1.5 px-2';
        gapClass = 'gap-2';
        titleSizeBonus = -3;
    } else if (height < 85 || width < 140) { // < 85px: Compact Vertical
        paddingClass = 'p-2.5';
        gapClass = 'gap-2';
        titleSizeBonus = -2;
    } else if (height < 110 || width < 200) { // < 110px: Small
        paddingClass = 'p-3';
        gapClass = 'gap-2.5';
        titleSizeBonus = -1;
    } else {
        paddingClass = 'p-4';
        gapClass = 'gap-3';
        titleSizeBonus = 0;
    }
    const iconSizeClass = `w-[${iconSizePx}px] h-[${iconSizePx}px]`;
    const { allFonts } = useFonts();
    const resolveFont = (id: string) => {
        if (id === 'system') return undefined;
        return allFonts.find(f => f.id === id)?.family || undefined;
    };

    // DEBUG LOG
    if (site.name === 'Google') {
        console.log('[SiteCard Debug]', {
            siteName: site.name,
            siteTitleFont: site.titleFont,
            globalTitleFont: settings.globalTitleFont,
            resolvedSite: resolveFont(site.titleFont),
            resolvedGlobal: resolveFont(settings.globalTitleFont),
            finalTitleFont: resolveFont(site.titleFont) || resolveFont(settings.globalTitleFont)
        });
    }

    // Priority: Site Specific > Global Setting > Global App Font > Inherit
    const titleFontFamily = resolveFont(site.titleFont) || resolveFont(settings.globalTitleFont);
    const descFontFamily = resolveFont(site.descFont) || resolveFont(settings.globalDescFont);

    const titleColorStyle = site.titleColor || settings.globalTitleColor || textColor;
    const descColorStyle = site.descColor || settings.globalDescColor || textColor;
    const titleFontSize = site.titleSize || settings.globalTitleSize;
    const descFontSize = site.descSize || settings.globalDescSize;

    // Icon Rendering
    // Unified Logic for both Upload and Auto (with Cache)
    // Unified Logic for both Upload and Auto (with Cache)
    let renderIcon;
    let showImage = false;
    let currentSrc = '';

    // STRICT Logic Implementation:
    // 1. Auto: Local Cache -> Online Fetch
    // 2. Upload: Uploaded File -> First Char (Fallback)
    // 3. Gallery: Icon (Handled by else block via iconType check)

    if (site.iconType === 'auto') {
        // Auto Mode
        const hasLocalCache = site.icon && (site.icon.startsWith('/') || site.icon.startsWith('http'));

        if (!hasError && hasLocalCache) {
            // Priority 1: Local Cache
            // We use site.icon directly. If it fails, onError will trigger and we switch to providers.
            currentSrc = site.icon;
            showImage = true;
        } else {
            // Priority 2: Online Fetch (Providers) - ONLY if Online
            if (isOnline) {
                let providerIndex = iconState;
                if (hasLocalCache) {
                    providerIndex = iconState - 1;
                }

                if (providerIndex >= 0 && providerIndex < FAVICON_PROVIDERS.length) {
                    try {
                        const domain = new URL(site.url).hostname;
                        currentSrc = FAVICON_PROVIDERS[providerIndex](domain);
                        showImage = true;
                    } catch (e) {
                        // Invalid URL, let it fail to text
                    }
                }
            }
        }
    } else if (site.iconType === 'upload') {
        // Upload Mode
        if (site.customIconUrl && !hasError) {
            // Priority 1: Uploaded File
            currentSrc = site.customIconUrl;
            showImage = true;
        }
        // Priority 2: Fallback to Text (First Char) comes naturally if showImage is false.
        // We DO NOT fallback to online providers for Upload mode.
    }

    // Child Count Badge Logic
    const showCount = site.type === 'folder' && childCount !== undefined && childCount > 0;

    if (showImage) {
        renderIcon = (
            <div className="w-full h-full rounded-xl shrink-0 overflow-hidden relative">
                <NextImage
                    key={currentSrc}
                    src={currentSrc}
                    alt={site.name}
                    width={40}
                    height={40}
                    className="object-contain w-full h-full"
                    onError={() => {
                        setHasError(true);
                        setIconState(prev => prev + 1);
                    }}
                    unoptimized={true}
                />
            </div>
        );
    } else {
        const firstLetter = site.name ? site.name.charAt(0).toUpperCase() : '?';
        renderIcon = (
            <div
                className="w-full h-full rounded-xl flex items-center justify-center text-white shadow-md font-bold relative"
                style={{ backgroundColor: site.color, fontSize: iconSizePx * 0.5 }}
            >
                {(site.type === 'folder' || site.iconType === 'library') && Icon ? <Icon size={iconSizePx * 0.6} /> : firstLetter}
            </div>
        );
    }

    // Layout Modes
    const isRowLayout = height < 75;
    const isTightLayout = height >= 75 && height <= 90;
    const isStandardLayout = height > 90;

    // Description Limit
    const showDesc = height > 24; // Minimal threshold

    // Shared Description Component
    const Description = ({ className = '' }: { className?: string }) => (
        <span
            className={`opacity-70 ${hasShadow ? 'text-shadow-sm' : ''} ${className}`}
            style={{
                color: descColorStyle,
                fontFamily: descFontFamily,
                fontSize: descFontSize ? `${descFontSize}px` : undefined,
                maxWidth: isRowLayout ? '50%' : undefined
            }}
        >
            {site.desc}
        </span>
    );

    return (
        <motion.div
            className={`spotlight-card relative h-full overflow-hidden ${isOverlay ? 'shadow-2xl scale-105 cursor-grabbing' : ''}`}
            style={{
                borderRadius: settings.cardRadius ?? 16,
                ...(isDropTarget && site.type === 'folder' ? {
                    transform: 'scale(1.05)',
                    boxShadow: '0 0 20px rgba(34, 197, 94, 0.5), 0 0 40px rgba(34, 197, 94, 0.3)',
                    transition: 'all 0.2s ease-in-out'
                } : {})
            }}
            whileHover={!isOverlay && (settings.enableHover ?? true) ? {
                scale: 1.02,
                y: -4 * (settings.hoverIntensity ?? 1),
                boxShadow: hoverBoxShadow
            } : {}}
            whileTap={!isOverlay && (settings.enableClick ?? true) ? { scale: 1 - (0.02 * (settings.clickIntensity ?? 1)) } : {}}
            transition={{
                type: "spring",
                stiffness: 400 * (settings.hoverIntensity ?? 1),
                damping: 17
            }}
        >
            <a
                ref={cardRef}
                href={isLoggedIn || isOverlay || site.type === 'folder' ? undefined : site.url} target="_blank" rel="noopener noreferrer"
                onClick={handleClick}
                onContextMenu={(e) => onContextMenu && onContextMenu(e, site.id)}
                className={`group relative block h-full border transition-all duration-300 overflow-hidden isolate z-10 ${isLoggedIn ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer'} ${site.isHidden && isLoggedIn ? 'opacity-50 grayscale' : ''}`}
                style={{
                    height: `var(--mobile-card-height, ${settings.cardHeight}px)`,
                    borderRadius: settings.cardRadius ?? 16,
                    backgroundColor: bgColor,
                    borderColor: borderColor,
                    boxShadow: boxShadow,
                    backdropFilter: `blur(${(settings.cardBlur ?? 12) * 0.5}px)`,
                    WebkitBackdropFilter: `blur(${(settings.cardBlur ?? 12) * 0.5}px)`
                }}
            >
                {settings.colorfulCards && (
                    <div className="absolute inset-0 pointer-events-none"
                        style={{
                            opacity: (settings.colorfulOpacity ?? 60) / 100,
                            background: `linear-gradient(to bottom right, transparent, rgba(${brandRgb.r}, ${brandRgb.g}, ${brandRgb.b}, ${Math.max(0.1, ((settings.colorfulOpacity ?? 60) / 100) - 0.2)}))`
                        }}
                    />
                )}

                <div className={`relative z-10 h-full flex flex-col ${paddingClass} ${isStandardLayout ? 'justify-between' : 'justify-center'}`}>
                    <div className={`flex ${isStandardLayout ? 'items-start' : 'items-center'} justify-between w-full ${gapClass}`}>
                        {/* 左侧：图标和名称 */}
                        <div className={`flex items-center ${gapClass} min-w-0 flex-1 overflow-hidden`}>
                            {/* Icon Wrapper with Badge */}
                            <div className="relative shrink-0" style={{ width: iconSizePx, height: iconSizePx }}>
                                {site.iconType === 'library' ? (
                                    <div className={`w-full h-full rounded-xl flex items-center justify-center text-white shadow-md`} style={{ backgroundColor: site.color }}>
                                        <Icon size={iconSizePx * 0.6} />
                                    </div>
                                ) : (
                                    <div className="w-full h-full rounded-xl overflow-hidden">
                                        {renderIcon}
                                    </div>
                                )}


                            </div>

                            <div className={`flex min-w-0 overflow-hidden ${isRowLayout ? 'flex-row items-baseline gap-1 sm:gap-2 flex-1' : 'flex-col'}`}>
                                <span
                                    className={`font-bold truncate text-xs sm:text-sm md:text-base leading-tight ${hasShadow ? 'text-shadow-sm' : ''}`}
                                    style={{ color: titleColorStyle, fontFamily: titleFontFamily, fontSize: titleFontSize ? `${titleFontSize}px` : undefined }}>
                                    {site.name}
                                </span>

                                {showDesc && !isStandardLayout && site.desc && (
                                    <Description className={`truncate text-xs ${isRowLayout ? 'flex-1' : 'mt-0.5'}`} />
                                )}
                            </div>
                        </div>

                        {/* 右侧：统计数字和操作按钮 - 始终靠右 */}
                        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
                            {showCount && (
                                <div
                                    className="flex items-center justify-center min-w-[22px] h-[22px] px-1.5 rounded-full text-[11px] font-bold text-white shadow-lg leading-none transform scale-100"
                                    style={{
                                        backgroundColor: site.color || '#6366f1',
                                        boxShadow: `0 2px 10px -1px rgba(${brandRgb.r}, ${brandRgb.g}, ${brandRgb.b}, 0.5)`
                                    }}
                                >
                                    {childCount}
                                </div>
                            )}
                            {isLoggedIn ? (<button onClick={(e) => {
                                e.stopPropagation();
                                onEdit && onEdit();
                            }}
                                className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-all active:scale-95 shrink-0">
                                <MoreHorizontal size={16} style={{ color: textColor }} /></button>) : (<ExternalLink size={14}
                                    className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                                    style={{ color: textColor }} />)}
                        </div>
                    </div>

                    {/* Footer Description for Standard Layout */}
                    {showDesc && isStandardLayout && site.desc && (
                        <p className={`text-xs leading-relaxed line-clamp-2 opacity-70 mt-2 ${hasShadow ? 'text-shadow-sm' : ''}`}
                            style={{ color: descColorStyle, fontFamily: descFontFamily, fontSize: descFontSize ? `${descFontSize}px` : undefined }}>
                            {site.desc}
                        </p>
                    )}
                </div >
            </a >
        </motion.div >
    );
});

export const SortableSiteCard = React.memo(function SortableSiteCard({ site, isLoggedIn, ...props }: any) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: site.id,
        disabled: !isLoggedIn
    });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 50 : 'auto',
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="h-full"
        >
            {/* Wrap SiteCard with motion.div for entry/exit animations if needed, 
                 but SiteCard already has motion.div internally for hover/tap. 
                 To handle AnimatePresence exit animations (filtering), we need the motion div here OR rely on SiteCard's internal motion.
                 However, dnd-kit moves the OUTER div.
                 If we want smooth reordering (squeeze), dnd-kit handles it via 'transition' on the outer div.
                 So a plain div is BEST for the outer wrapper.
             */}
            {/* Outer motion.div handles entry/exit/layout animations */}
            <motion.div
                layout={props.settings?.enableDrag ?? true} // Enable layout animation (smooth reordering) toggle
                initial={false} // Disable entry animation to prevent "jump" effect when switching folders
                animate={{ opacity: isDragging ? 0.5 : 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{
                    duration: 0.2,
                    layout: {
                        type: "spring",
                        damping: 20 * (props.settings?.dragIntensity ?? 1),
                        stiffness: 300 * (props.settings?.dragIntensity ?? 1)
                    }
                }}
                className="h-full"
            >
                <SiteCard site={site} isLoggedIn={isLoggedIn} {...props} />
            </motion.div>
        </div>
    );
});
