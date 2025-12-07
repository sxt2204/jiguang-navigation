import React, { useContext, createContext } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const SortableItemContext = createContext<any>(null);

export function SortableDragHandle({ children, className }: any) {
    const { attributes, listeners } = useContext(SortableItemContext);
    return (
        <div {...attributes} {...listeners} className={className}>
            {children}
        </div>
    );
}

export function SortableCategoryItem({ id, children }: any) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 10 : 1,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <SortableItemContext.Provider value={{ attributes, listeners }}>
            <div ref={setNodeRef} style={style}>
                {children}
            </div>
        </SortableItemContext.Provider>
    );
}
