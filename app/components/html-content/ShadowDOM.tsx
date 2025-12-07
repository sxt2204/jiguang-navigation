import React, { useRef, useState, useEffect } from 'react';

// --- HTML5 Content Section with DnD & Context Menu ---
export function ShadowDOM({ content, className, style }: any) {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (iframeRef.current && isMounted) {
            const iframe = iframeRef.current;
            const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;

            if (iframeDoc) {
                iframeDoc.open();
                iframeDoc.write(content);
                iframeDoc.close();
            }
        }
    }, [content, isMounted]);

    // Only render iframe on client to prevent hydration mismatch
    if (!isMounted) {
        return (
            <div
                className={className}
                style={{ ...style, minHeight: style?.height || '400px' }}
            />
        );
    }

    return (
        <iframe
            ref={iframeRef}
            className={className}
            style={{
                ...style,
                border: 'none',
                width: '100%',
                minHeight: style?.height || '400px'
            }}
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            title="HTML5 Content"
        />
    );
}
