import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SortableContext } from '@dnd-kit/sortable';
import { createSmartSortingStrategy } from '../dnd/SmartSortingStrategy';
import { SortableSiteCard } from './SiteCard';
import { CategoryHeader } from '../ui/CategoryHeader';
import { EmptyState } from '../ui/EmptyState';
import { SiteSkeleton } from '../ui/SiteSkeleton';

interface SiteGridProps {
    isLoading: boolean;
    filteredSites: any[];
    isSearching: boolean;
    activeTab: string;
    categories: string[];
    hiddenCategories: string[];
    layoutSettings: any;
    isDarkMode: boolean;
    isLoggedIn: boolean;
    onEdit: (site: any) => void;
    onDelete: (site: any) => void;
    onContextMenu: (e: any, id: any) => void;
    onFolderClick?: (folder: any) => void;
    getCategoryColor: (cat: string) => string;
}

export function SiteGrid({
    isLoading,
    filteredSites,
    isSearching,
    activeTab,
    categories,
    hiddenCategories,
    layoutSettings,
    isDarkMode,
    isLoggedIn,
    onEdit,
    onDelete,
    onContextMenu,
    onFolderClick,
    getCategoryColor,
    sites // New Prop
}: SiteGridProps & { sites?: any[] }) {

    if (isLoading) {
        return (
            <div className="grid dynamic-grid gap-[var(--grid-gap)]" style={{
                '--grid-cols': layoutSettings.gridCols,
                '--grid-gap': `${layoutSettings.gap * (layoutSettings.compactMode ? 2.5 : 4)}px`
            } as any}>
                <SiteSkeleton isDarkMode={isDarkMode} settings={layoutSettings} count={layoutSettings.gridCols * 3} />
            </div>
        );
    }

    const visibleSites = filteredSites.filter(s => isLoggedIn || !s.isHidden);

    if (visibleSites.length === 0) {
        return <EmptyState isDarkMode={isDarkMode} mode={isSearching ? 'search' : 'filter'} />;
    }

    const sortableItems = activeTab === '全部'
        ? categories
            .filter(c => !hiddenCategories.includes(c))
            .flatMap(cat => visibleSites.filter(s => s.category === cat).map(s => s.id))
        : visibleSites.map(s => s.id);

    return (
        <div className="w-full">
            {activeTab === '全部' && !isSearching ? (
                categories.filter(cat => !hiddenCategories.includes(cat)).map(cat => {
                    const catSites = visibleSites.filter(s => s.category === cat);
                    const catSiteIds = catSites.map(s => s.id);
                    // Ensure we render empty categories if logged in, for drop targets
                    if (catSites.length === 0 && !isLoggedIn) return null;

                    return (
                        <section key={cat}
                            className={`animate-in slide-in-from-bottom-4 duration-500 ${layoutSettings.compactMode ? 'mb-4' : 'mb-10'}`}>
                            <CategoryHeader
                                category={cat}
                                color={getCategoryColor(cat)}
                                isDarkMode={isDarkMode}
                                bgEnabled={layoutSettings.bgEnabled}
                                compactMode={layoutSettings.compactMode}
                            />

                            <div className="grid transition-all duration-300 ease-in-out" style={{
                                gap: `${layoutSettings.gap * (layoutSettings.compactMode ? 2.5 : 4)}px`,
                                gridTemplateColumns: (!layoutSettings.gridMode || layoutSettings.gridMode === 'auto')
                                    ? `repeat(auto-fill, minmax(${parseInt(String(layoutSettings.cardWidth || 260))}px, 1fr))`
                                    : `repeat(${layoutSettings.gridCols || 6}, minmax(0, 1fr))`
                            }}>
                                <SortableContext items={catSiteIds} strategy={createSmartSortingStrategy(visibleSites, catSiteIds)}>
                                    <AnimatePresence mode="popLayout" initial={false}>
                                        {catSites.map(site => {
                                            const childCount = sites ? sites.filter(s => s.parentId === site.id).length : 0;
                                            return (
                                                <SortableSiteCard
                                                    key={site.id} site={site} isLoggedIn={isLoggedIn}
                                                    isDarkMode={isDarkMode} settings={layoutSettings}
                                                    onEdit={() => onEdit(site)}
                                                    onDelete={() => onDelete(site)}
                                                    onContextMenu={onContextMenu}
                                                    onFolderClick={onFolderClick}
                                                    childCount={childCount}
                                                />
                                            );
                                        })}
                                        {catSites.length === 0 && (
                                            <div className="col-span-full h-8 flex items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-lg opacity-50 text-xs text-center w-full">
                                                从其他分类拖拽至此
                                            </div>
                                        )}
                                    </AnimatePresence>
                                </SortableContext>
                            </div>
                        </section>
                    );
                })
            ) : (
                <SortableContext items={sortableItems} strategy={createSmartSortingStrategy(visibleSites, sortableItems)}>
                    <div className="grid dynamic-grid" style={{
                        gap: `${layoutSettings.gap * (layoutSettings.compactMode ? 2.5 : 4)}px`,
                        gridTemplateColumns: (!layoutSettings.gridMode || layoutSettings.gridMode === 'auto')
                            ? `repeat(auto-fill, minmax(${layoutSettings.cardWidth || 260}px, 1fr))`
                            : `repeat(${layoutSettings.gridCols || 6}, minmax(0, 1fr))`
                    }}>
                        <AnimatePresence mode="popLayout" initial={false}>
                            {visibleSites.map(site => {
                                const childCount = sites ? sites.filter(s => s.parentId === site.id).length : 0;
                                return (
                                    <SortableSiteCard
                                        key={site.id} site={site} isLoggedIn={isLoggedIn}
                                        isDarkMode={isDarkMode} settings={layoutSettings}
                                        onEdit={() => onEdit(site)}
                                        onDelete={() => onDelete(site)}
                                        onContextMenu={onContextMenu}
                                        onFolderClick={onFolderClick}
                                        childCount={childCount}
                                    />
                                )
                            })}
                        </AnimatePresence>
                    </div>
                </SortableContext>
            )}
        </div>
    );
}
