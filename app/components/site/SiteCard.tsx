import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';


import NextImage from 'next/image';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Globe, MoreHorizontal, ExternalLink } from 'lucide-react';
import { hexToRgb, getAccessibleTextColor, shouldUseTextShadow, FAVICON_PROVIDERS } from '@/lib/utils';
import { ICON_MAP, FONTS } from '@/lib/constants';
import { useFonts } from '@/app/hooks/useFonts';

interface SiteCardProps {
    site: any;
    isLoggedIn: boolean;
    isDarkMode: boolean;
    settings: any;
    onEdit?: () => void;
    onDelete?: () => void;
    onContextMenu?: (e: React.MouseEvent, id: any) => void;
    isOverlay?: boolean;
}

export const SiteCard = React.memo(function SiteCard({
    site,
    isLoggedIn,
    isDarkMode,
    settings,
    onEdit,
    onDelete,
    onContextMenu,
    isOverlay
}: SiteCardProps) {
    const [iconState, setIconState] = useState(0);
    const [imgSrc, setImgSrc] = useState<string | null>(null);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        setIconState(0);
    }, [site.url, site.iconType]);

    useEffect(() => {
        if (site.iconType === 'upload' && site.customIconUrl) {
            setImgSrc(site.customIconUrl);
            setHasError(false);
        }
    }, [site.customIconUrl, site.iconType]);

    const handleImageError = () => {
        if (hasError) return;
        setHasError(true);

        if (site.url) {
            try {
                const domain = new URL(site.url).hostname;
                const fallbackUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
                setImgSrc(fallbackUrl);
            } catch (e) { }
        }
    };

    const Icon = ICON_MAP[site.icon] || Globe;
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

    const textColor = forceWhiteText ? '#ffffff' : getAccessibleTextColor(perceivedBg);
    const hasShadow = forceWhiteText || shouldUseTextShadow(textColor);

    // --- Typography Resolution ---
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
    let renderIcon;
    let showImage = false;
    let currentSrc = '';

    if (site.iconType === 'auto' || site.iconType === 'upload') {
        if (site.iconType === 'upload' && imgSrc && !hasError) {
            currentSrc = imgSrc;
        } else {
            try {
                const domain = new URL(site.url).hostname;
                const providerIndex = site.iconType === 'upload' ? (iconState - 1) : iconState;
                currentSrc = FAVICON_PROVIDERS[providerIndex % FAVICON_PROVIDERS.length](domain);
            } catch (e) {
                currentSrc = '';
            }
        }

        if (currentSrc && iconState < (FAVICON_PROVIDERS.length + 2)) {
            showImage = true;
        }
    }

    if (showImage) {
        renderIcon = (
            <div className="w-10 h-10 rounded-xl shrink-0 overflow-hidden">
                <NextImage
                    src={currentSrc}
                    alt={site.name}
                    width={40}
                    height={40}
                    className="object-contain w-full h-full"
                    onError={() => {
                        if (site.iconType === 'upload') {
                            setHasError(true);
                        }
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
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md font-bold text-lg"
                style={{ backgroundColor: site.color }}
            >
                {site.iconType === 'library' && Icon ? <Icon size={24} /> : firstLetter}
            </div>
        );
    }

    return (
        <motion.div
            className={`spotlight-card relative h-full rounded-2xl overflow-hidden ${isOverlay ? 'shadow-2xl scale-105 cursor-grabbing' : ''}`}
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
                href={isLoggedIn || isOverlay ? undefined : site.url} target="_blank" rel="noopener noreferrer"
                onClick={(e) => isLoggedIn && e.preventDefault()}
                onContextMenu={(e) => onContextMenu && onContextMenu(e, site.id)}
                className={`group relative block h-full rounded-2xl border transition-all duration-300 overflow-hidden isolate z-10 ${isLoggedIn ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer'} ${site.isHidden && isLoggedIn ? 'opacity-50 grayscale' : ''}`}
                style={{
                    height: settings.cardHeight,
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

                <div className="relative z-10 h-full flex flex-col p-4 justify-between">
                    <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3 overflow-hidden">
                            {site.iconType === 'library' ? (
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md" style={{ backgroundColor: site.color }}>
                                    <Icon size={20} />
                                </div>
                            ) : (
                                renderIcon
                            )}

                            <span
                                className={`font-bold truncate text-sm sm:text-base ${hasShadow ? 'text-shadow-sm' : ''}`}
                                style={{ color: titleColorStyle, fontFamily: titleFontFamily, fontSize: titleFontSize ? `${titleFontSize}px` : undefined }}>{site.name}</span></div>
                        {isLoggedIn ? (<button onClick={(e) => {
                            e.stopPropagation();
                            onEdit && onEdit();
                        }}
                            className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-all active:scale-95">
                            <MoreHorizontal size={16} style={{ color: textColor }} /></button>) : (<ExternalLink size={14}
                                className="opacity-0 group-hover:opacity-100 transition-opacity mt-1"
                                style={{ color: textColor }} />)}
                    </div>
                    {
                        settings.cardHeight > 90 && (
                            <p className={`text-xs leading-relaxed line-clamp-2 opacity-70 mt-2 ${hasShadow ? 'text-shadow-sm' : ''}`}
                                style={{ color: descColorStyle, fontFamily: descFontFamily, fontSize: descFontSize ? `${descFontSize}px` : undefined }}>{site.desc}</p>)
                    }
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
                initial={{ opacity: 0, scale: 0.9 }}
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
