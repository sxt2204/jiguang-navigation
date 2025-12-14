import React, { useState } from 'react';
import { useSortable, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2, Edit3, Eye, EyeOff, ChevronRight, ChevronDown, FolderOpen, Folder } from 'lucide-react';
import NextImage from 'next/image';
import { FAVICON_PROVIDERS } from '@/lib/utils';
import { ICON_MAP } from '@/lib/constants';
// SiteCard imports: import { hexToRgb, getAccessibleTextColor, shouldUseTextShadow, FAVICON_PROVIDERS } from '@/lib/utils';
// SiteCard imports: import { ICON_MAP, FONTS } from '@/lib/constants';
import { Globe } from 'lucide-react';

interface SortableSiteItemProps {
    site: any;
    sites?: any[]; // Full list to find children
    isDarkMode: boolean;
    onEdit: (site: any) => void;
    onDelete: (site: any) => void;
    onToggleHidden: (site: any) => void;
}

export function SortableSiteItem({ site, sites, isDarkMode, onEdit, onDelete, onToggleHidden }: SortableSiteItemProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: site.id, data: { text: site.name, type: site.type } }); // Add data for drag helpers

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    const isFolder = site.type === 'folder';
    const childrenSites = isFolder && sites ? sites.filter(s => s.parentId === site.id).sort((a, b) => a.order - b.order) : [];

    // Icon Logic (Simplified from SiteCard)
    // Icon Logic (Standardized with SiteCard)
    const Icon = ICON_MAP[site.icon] || Globe;
    const [iconState, setIconState] = useState(0);
    const [hasError, setHasError] = useState(false);

    // Reset state when icon config changes
    React.useEffect(() => {
        setIconState(0);
        setHasError(false);
    }, [site.url, site.iconType, site.customIconUrl]);

    let renderIcon;
    let showImage = false;
    let currentSrc = '';

    if ((site.iconType === 'auto' || site.iconType === 'upload') && site.type !== 'folder') {
        // Determine if we have a local/custom image to try first
        let localImageCandidate = null;
        if (site.iconType === 'upload') {
            localImageCandidate = site.customIconUrl;
        } else if (site.iconType === 'auto' && site.icon && (site.icon.startsWith('/') || site.icon.startsWith('http'))) {
            // Check if site.icon looks like a URL/Path (not a library icon name)
            localImageCandidate = site.icon;
        }

        if (localImageCandidate && !hasError) {
            currentSrc = localImageCandidate;
            showImage = true;
        } else {
            try {
                const domain = new URL(site.url || 'http://localhost').hostname;
                // For auto mode, try providers in order. For upload mode fallback, also try providers.
                // Logic Update:
                // 1. Upload Mode:
                //    - Initial (no error): Expect localCandidate. If missing, providerIndex = -1 (Text).
                //    - Error (hasError): fallback to Providers (index 0+).
                // 2. Auto Mode:
                //    - Initial (no error):
                //      - If has localCandidate (Cache): We tried it above. If we are here, it means we don't have it (or logic flow skpped).
                //      - actually if localCandidate existed and !hasError, we are in the TRUE block above.
                //      - So if we are HERE in ELSE, it means either:
                //        a) No localCandidate
                //        b) hasError is true (Local candidate failed)
                //    - If hasError is true (Cache failed), we want to start with provider 0. (iconState resets on type change, but onError increments it).
                //      - If cache failed, onError ran, iconState becomes 1.
                //      - We want providerIndex 0. So (iconState - 1).
                //    - If NO localCandidate (Normal Auto):
                //      - iconState is 0. We want providerIndex 0.

                // Unified Logic attempt:
                // If we HAD a local candidate but failed, iconState > 0. We want to start providers.
                // If we DID NOT have a local candidate, iconState is 0. 
                //   - Upload: index = -1.
                //   - Auto: index = 0.

                let providerIndex = iconState; // Default for normal auto

                // Adjust for scenarios where we attempted a local image first
                const hadLocalCandidate = (site.iconType === 'upload' && site.customIconUrl) ||
                    (site.iconType === 'auto' && site.icon && (site.icon.startsWith('/') || site.icon.startsWith('http')));

                if (hadLocalCandidate) {
                    // We attempted local. If we are here, it failed (hasError=true, iconState>=1).
                    // We want to try provider 0 when iconState is 1.
                    providerIndex = iconState - 1;
                } else {
                    // No local candidate.
                    if (site.iconType === 'upload') {
                        providerIndex = -1; // Fallback to text directly
                    }
                    // Auto: providerIndex = iconState (starts at 0).
                }

                if (providerIndex >= 0 && providerIndex < FAVICON_PROVIDERS.length) {
                    currentSrc = FAVICON_PROVIDERS[providerIndex](domain);
                    showImage = true;
                }
            } catch (e) { }
        }
    }

    if (showImage && !isFolder) {
        renderIcon = (
            <div className="w-6 h-6 rounded-md overflow-hidden shrink-0 bg-white/10 flex items-center justify-center relative">
                <NextImage
                    key={currentSrc} // Force re-render on src change
                    src={currentSrc}
                    alt={site.name}
                    width={24}
                    height={24}
                    className="object-contain w-full h-full"
                    unoptimized
                    onError={() => {
                        // Logic from SiteCard: Always increment state to cycle providers or fail to text
                        // If it was a local image attempt (upload OR auto-cache) that failed, mark hasError.
                        // We check the SAME condition as the render logic to know if we were trying a local image.
                        const isLocalAttempt = (site.iconType === 'upload' && !hasError) || // Upload attempt
                            (site.iconType === 'auto' && !hasError && site.icon && (site.icon.startsWith('/') || site.icon.startsWith('http'))); // Cache attempt

                        if (isLocalAttempt) {
                            setHasError(true);
                        }
                        // Always increment to move to next provider or exhaust list
                        setIconState(prev => prev + 1);
                    }}
                />
            </div>
        );
    } else {
        const firstLetter = site.name ? site.name.charAt(0).toUpperCase() : '?';
        // SiteCard logic: const brandRgb = hexToRgb(site.color || '#6366f1');
        // SiteCard internal logic: style={{ backgroundColor: site.color }}. 
        // Wait, SiteCard Icon Wrapper: style={{ backgroundColor: site.color }} for library.
        // SiteCard Default Icon Wrapper: style={{ backgroundColor: site.color, fontSize: iconSizePx * 0.5 }}.
        // But in SiteCard render: const brandRgb = hexToRgb(site.color || '#6366f1'); is used for CARD background, not ICON background?
        // Let's look at SiteCard's icon rendering block:
        // {site.iconType === 'library' ? (...) style={{ backgroundColor: site.color }}
        // So if site.color is missing, it is transparent? No, undefined bg.
        // But SiteCard usually has site.color set from the palette?
        // Let's assume site.color might be empty. SiteCard uses site.color.
        // SortableSiteItem uses site.color || '#6366f1'.
        // If SiteCard has site.color as undefined, it renders transparent?
        // Let's standardize to use site.color || '#6366f1' to be safe and consistent with visual expectation (blue default).

        renderIcon = (
            <div
                className="w-6 h-6 rounded-md flex items-center justify-center text-white text-xs font-bold"
                style={{ backgroundColor: site.color || '#6366f1' }}
            >
                {isFolder ? (isExpanded ? <FolderOpen size={14} /> : <Folder size={14} />) : (site.iconType === 'library' ? (Icon ? <Icon size={14} /> : <Globe size={14} />) : firstLetter)}
            </div>
        );
    }

    return (
        <div ref={setNodeRef} style={style} className={`flex flex-col mb-2 ${site.parentId ? 'ml-6' : ''}`}>
            {/* Main Item Row */}
            <div className={`flex items-center justify-between p-2 rounded-lg border ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-white border-slate-100'} ${site.isHidden ? 'opacity-60' : ''}`}>
                <div className="flex items-center gap-3 overflow-hidden">
                    <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing text-slate-400 hover:text-indigo-500">
                        <GripVertical size={14} />
                    </div>
                    {isFolder && (
                        <button onClick={() => setIsExpanded(!isExpanded)} className="p-0.5 rounded hover:bg-black/10 dark:hover:bg-white/10">
                            {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                        </button>
                    )}
                    {renderIcon}
                    <div className="flex flex-col min-w-0">
                        <span className={`text-sm font-medium truncate ${site.isHidden ? 'line-through decoration-2 decoration-slate-400/50' : ''}`}>{site.name}</span>
                        {!isFolder && <span className="text-[10px] text-slate-400 truncate max-w-[150px]">{site.url}</span>}
                    </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                    <button
                        onClick={() => onToggleHidden(site)}
                        className="p-1.5 rounded-md text-slate-400 hover:bg-black/5 dark:hover:bg-white/10 hover:text-indigo-500 transition-colors"
                    >
                        {site.isHidden ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                    <button
                        onClick={() => onEdit(site)}
                        className="p-1.5 rounded-md text-slate-400 hover:bg-black/5 dark:hover:bg-white/10 hover:text-indigo-500 transition-colors"
                    >
                        <Edit3 size={14} />
                    </button>
                    <button
                        onClick={() => onDelete(site)}
                        className="p-1.5 rounded-md text-slate-400 hover:bg-red-500/10 hover:text-red-500 transition-colors"
                    >
                        <Trash2 size={14} />
                    </button>
                </div>
            </div>

            {/* Nested List for Folder */}
            {isFolder && isExpanded && sites && (
                <div className="mt-1 flex flex-col gap-1 border-l-2 border-indigo-500/10 pl-2">
                    <SortableContext items={childrenSites.map(s => s.id)} strategy={verticalListSortingStrategy}>
                        {childrenSites.map(child => (
                            <SortableSiteItem
                                key={child.id}
                                site={child}
                                sites={sites}
                                isDarkMode={isDarkMode}
                                onEdit={onEdit}
                                onDelete={onDelete}
                                onToggleHidden={onToggleHidden}
                            />
                        ))}
                    </SortableContext>
                    {childrenSites.length === 0 && (
                        <div className="text-[10px] opacity-50 py-2 pl-4">空文件夹</div>
                    )}
                </div>
            )}
        </div>
    );
}
