import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { HtmlSectionContent } from './HtmlSectionContent';

export const SortableHtmlSection = React.memo(function SortableHtmlSection({ config, isDarkMode, isLoggedIn, onContextMenu }: any) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: config.id,
        disabled: !isLoggedIn
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 50 : 'auto',
        opacity: isDragging ? 0.3 : 1,
        width: config.width || '100%'
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <HtmlSectionContent config={config} isDarkMode={isDarkMode} isLoggedIn={isLoggedIn} onContextMenu={onContextMenu} />
        </div>
    );
});
