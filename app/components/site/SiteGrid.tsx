import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
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
    onContextMenu: (e: React.MouseEvent, siteId: number) => void;
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
    getCategoryColor
}: SiteGridProps) {

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
        <SortableContext items={sortableItems} strategy={rectSortingStrategy}>
            {activeTab === '全部' && !isSearching ? (
                categories.filter(cat => !hiddenCategories.includes(cat)).map(cat => {
                    const catSites = visibleSites.filter(s => s.category === cat);
                    if (catSites.length === 0) return null;
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

                            <div className="grid dynamic-grid gap-[var(--grid-gap)]" style={{
                                '--grid-cols': layoutSettings.gridCols,
                                '--grid-gap': `${layoutSettings.gap * (layoutSettings.compactMode ? 2.5 : 4)}px`
                            } as any}>
                                <AnimatePresence mode="popLayout" initial={false}>
                                    {catSites.map(site => (
                                        <SortableSiteCard
                                            key={site.id} site={site} isLoggedIn={isLoggedIn}
                                            isDarkMode={isDarkMode} settings={layoutSettings}
                                            onEdit={() => onEdit(site)}
                                            onDelete={() => onDelete(site)}
                                            onContextMenu={onContextMenu}
                                        />
                                    ))}
                                </AnimatePresence>
                            </div>
                        </section>
                    )
                })
            ) : (
                <div className="grid dynamic-grid gap-[var(--grid-gap)]" style={{
                    '--grid-cols': layoutSettings.gridCols,
                    '--grid-gap': `${layoutSettings.gap * (layoutSettings.compactMode ? 2.5 : 4)}px`
                } as any}>
                    {/* Disable Exit animation if drag enabled to avoid conflict?? No, popLayout handles it. 
                        We just need to disable Layout animation if drag is disabled in SortableSiteCard? 
                        No, dnd-kit handles drag. Layout prop in motion is for reordering.
                    */}
                    <AnimatePresence mode="popLayout" initial={false}>
                        {visibleSites.map((site, index) => (
                            <SortableSiteCard
                                key={site.id} site={site} isLoggedIn={isLoggedIn}
                                isDarkMode={isDarkMode} settings={layoutSettings}
                                onEdit={() => onEdit(site)}
                                onDelete={() => onDelete(site)}
                                onContextMenu={onContextMenu}
                            />
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </SortableContext>
    );
}
