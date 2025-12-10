
import { SortingStrategy, rectSortingStrategy } from '@dnd-kit/sortable';
import { UniqueIdentifier } from '@dnd-kit/core';

export const createSmartSortingStrategy = (sites: any[], sortableItems: UniqueIdentifier[]): SortingStrategy => {
    return (args) => {
        const { activeIndex, overIndex } = args;

        // Default fast path
        if (activeIndex === -1 || overIndex === -1) return null;

        const activeId = sortableItems[activeIndex];
        const overId = sortableItems[overIndex];

        const activeSite = sites.find(s => s.id === activeId);
        const overSite = sites.find(s => s.id === overId);

        if (activeSite && overSite) {
            // If dragging a SITE over a FOLDER -> Prevent Reorder (Merge Intent)
            if (overSite.type === 'folder' && activeSite.type !== 'folder') {
                return null;
            }
        }

        return rectSortingStrategy(args);
    };
};
