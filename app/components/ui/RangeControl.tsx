import React from 'react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

interface RangeControlProps {
    label: string;
    value: number;
    min: number;
    max: number;
    unit?: string;
    onChange: (value: number) => void;
}

export function RangeControl({ label, value, min, max, unit, onChange }: RangeControlProps) {
    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <Label className="text-sm font-medium opacity-80">{label}</Label>
                <span className="text-xs font-mono tabular-nums px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/10 text-indigo-600 dark:text-indigo-400">
                    {value}{unit || ''}
                </span>
            </div>
            <Slider
                value={[value]}
                min={min}
                max={max}
                step={1}
                onValueChange={([v]) => onChange(v)}
                className="w-full"
            />
        </div>
    );
}
