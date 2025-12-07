import React, { useRef } from 'react';
import { Move } from 'lucide-react';

interface BackgroundPositionPreviewProps {
    imageUrl: string;
    x: number;
    y: number;
    scale: number;
    onChange: (x: number, y: number) => void;
}

export function BackgroundPositionPreview({ imageUrl, x, y, scale, onChange }: BackgroundPositionPreviewProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const lastPos = useRef<{ x: number, y: number } | null>(null);

    const handlePointerDown = (e: React.PointerEvent) => {
        e.currentTarget.setPointerCapture(e.pointerId);
        lastPos.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerMove = (e: React.PointerEvent) => {
        if (!lastPos.current) return;
        e.preventDefault();
        const dx = e.clientX - lastPos.current.x;
        const dy = e.clientY - lastPos.current.y;
        lastPos.current = { x: e.clientX, y: e.clientY };
        const factor = 0.4;
        let newX = x - (dx * factor);
        let newY = y - (dy * factor);
        newX = Math.max(0, Math.min(100, newX));
        newY = Math.max(0, Math.min(100, newY));
        onChange(newX, newY);
    };

    const handlePointerUp = (e: React.PointerEvent) => {
        lastPos.current = null;
        e.currentTarget.releasePointerCapture(e.pointerId);
    };

    return (
        <div className="space-y-2 select-none">
            <div className="flex justify-between items-center">
                <label className="text-xs font-bold opacity-70 flex items-center gap-1"><Move size={12} /> 拖动预览图调整位置</label>
                <div className="text-xs opacity-50 font-mono">{Math.round(x)}%, {Math.round(y)}%</div>
            </div>
            <div
                className="w-full h-48 rounded-xl border overflow-hidden cursor-move relative shadow-inner bg-black/10 dark:bg-black/50 touch-none group"
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
            >
                <div
                    className="absolute inset-0 bg-cover bg-no-repeat pointer-events-none"
                    style={{
                        backgroundImage: `url(${imageUrl})`,
                        backgroundPosition: `${x}% ${y}%`,
                        transform: `scale(${scale / 100})`,
                        transformOrigin: 'center center'
                    }}
                />
                <div
                    className="absolute inset-0 border-white/10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute top-1/2 left-0 w-full h-px bg-white/30"></div>
                    <div className="absolute left-1/2 top-0 h-full w-px bg-white/30"></div>
                </div>
                <div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 text-white text-xs font-medium backdrop-blur-[1px]">
                    按住拖动以平移
                </div>
            </div>
        </div>
    );
}
