import React from 'react';
import { NOISE_BASE64 } from '@/lib/utils'; // Assuming this is where it is, based on previous file views

export function NoiseOverlay() {
    return (
        <div
            className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.03] dark:opacity-[0.04] mix-blend-overlay"
            style={{
                backgroundImage: `url("${NOISE_BASE64}")`,
                backgroundRepeat: 'repeat',
                backgroundSize: '128px'
            }}
        />
    );
}
