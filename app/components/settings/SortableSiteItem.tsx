import React, { useState } from 'react';
import { useSortable, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2, Edit3, Eye, EyeOff, ChevronRight, ChevronDown, FolderOpen, Folder, Plus } from 'lucide-react';
import NextImage from 'next/image';
import { FAVICON_PROVIDERS, hexToRgb } from '@/lib/utils';
import { ICON_MAP } from '@/lib/constants';
import { useOnlineStatus } from '@/app/hooks/useOnlineStatus';
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
    onAddToFolder?: (parentId: string, category: string) => void; // New: add site/folder to this folder
}

export function SortableSiteItem({ site, sites, isDarkMode, onEdit, onDelete, onToggleHidden, onAddToFolder }: SortableSiteItemProps) {
    const isOnline = useOnlineStatus();
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
    }, [site.url, site.iconType, site.customIconUrl, site.icon, isOnline]);

    let renderIcon;
    let showImage = false;
    let currentSrc = '';

    if (site.type !== 'folder') {
        if (site.iconType === 'auto') {
            // Auto: Cache -> Online
            const hasLocalCache = site.icon && (site.icon.startsWith('/') || site.icon.startsWith('http'));

            if (!hasError && hasLocalCache) {
                currentSrc = site.icon;
                showImage = true;
            } else {
                // Online Fetch (Providers) - only if URL is valid
                const hasValidUrl = site.url && site.url.trim() && site.url !== '#';
                if (isOnline && hasValidUrl) {
                    let providerIndex = iconState;
                    if (hasLocalCache) {
                        providerIndex = iconState - 1;
                    }

                    if (providerIndex >= 0 && providerIndex < FAVICON_PROVIDERS.length) {
                        try {
                            const domain = new URL(site.url).hostname;
                            // Don't fetch for localhost or invalid domains
                            if (domain && domain !== 'localhost' && domain.includes('.')) {
                                currentSrc = FAVICON_PROVIDERS[providerIndex](domain);
                                showImage = true;
                            }
                        } catch (e) { }
                    }
                }
            }
        } else if (site.iconType === 'upload') {
            // Upload: File -> Text
            if (site.customIconUrl && !hasError) {
                currentSrc = site.customIconUrl;
                showImage = true;
            }
        }
    }

    if (showImage && !isFolder) {
        renderIcon = (
            <div className="w-6 h-6 rounded-md overflow-hidden shrink-0 bg-white/10 flex items-center justify-center relative">
                <NextImage
                    key={currentSrc}
                    src={currentSrc}
                    alt={site.name}
                    width={24}
                    height={24}
                    className="object-contain w-full h-full"
                    unoptimized
                    onError={() => {
                        setHasError(true);
                        setIconState(prev => prev + 1);
                    }}
                />
            </div>
        );
    } else {
        const firstLetter = site.name ? site.name.charAt(0).toUpperCase() : '?';

        // Determine what to show inside the icon container
        let iconContent;
        if (isFolder) {
            iconContent = isExpanded ? <FolderOpen size={14} /> : <Folder size={14} />;
        } else if (site.iconType === 'library') {
            // Only use Icon from library if iconType is explicitly 'library'
            iconContent = Icon ? <Icon size={14} /> : <Globe size={14} />;
        } else {
            // For 'auto' and 'upload' fallback, show first letter
            iconContent = firstLetter;
        }

        renderIcon = (
            <div
                className="w-6 h-6 rounded-md flex items-center justify-center text-white text-xs font-bold"
                style={{ backgroundColor: site.color || '#6366f1' }}
            >
                {iconContent}
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
                        <div className="flex items-center gap-2">
                            <span className={`text-sm font-medium truncate ${site.isHidden ? 'line-through decoration-2 decoration-slate-400/50' : ''}`}>{site.name}</span>
                            {isFolder && childrenSites.length > 0 && (
                                <div
                                    className="flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full text-[9px] font-bold text-white shadow-sm leading-none"
                                    style={{
                                        backgroundColor: site.color || '#6366f1',
                                        boxShadow: `0 1px 6px -1px rgba(${hexToRgb(site.color || '#6366f1').r}, ${hexToRgb(site.color || '#6366f1').g}, ${hexToRgb(site.color || '#6366f1').b}, 0.5)`
                                    }}
                                >
                                    {childrenSites.length}
                                </div>
                            )}
                        </div>
                        {!isFolder && <span className="text-[10px] text-slate-400 truncate max-w-[150px]">{site.url}</span>}
                    </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                    {/* Add to folder button - only for folders */}
                    {isFolder && onAddToFolder && (
                        <button
                            onClick={() => onAddToFolder(site.id, site.category)}
                            className="p-1.5 rounded-md text-slate-400 hover:bg-indigo-500/10 hover:text-indigo-500 transition-colors"
                            title="添加站点到此文件夹"
                        >
                            <Plus size={14} />
                        </button>
                    )}
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
                                onAddToFolder={onAddToFolder}
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
