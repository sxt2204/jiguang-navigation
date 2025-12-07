import React from 'react';
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

interface AnimationControlProps {
    label: string;
    description: string;
    enabled: boolean;
    setEnabled: (v: boolean) => void;
    intensity: number;
    setIntensity: (v: number) => void;
    icon?: React.ReactNode;
}

export function AnimationControl({
    label,
    description,
    enabled,
    setEnabled,
    intensity,
    setIntensity,
    icon
}: AnimationControlProps) {
    return (
        <div className="p-4 rounded-xl border bg-white/5 border-slate-200 dark:border-white/5 transition-all hover:border-indigo-500/20">
            <div className="flex items-center justify-between mb-3">
                <div className="space-y-0.5">
                    <Label className="text-sm font-bold flex items-center gap-2">
                        {icon}
                        {label}
                    </Label>
                    <p className="text-[10px] opacity-50">{description}</p>
                </div>
                <Switch checked={enabled} onCheckedChange={setEnabled} />
            </div>

            {enabled && (
                <div className="pt-2 animate-in fade-in slide-in-from-top-1">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-medium opacity-60">效果强度</span>
                        <span className="text-[10px] font-mono opacity-80">{intensity}x</span>
                    </div>
                    <Slider
                        value={[intensity]}
                        min={0.5}
                        max={2.0}
                        step={0.1}
                        onValueChange={([v]) => setIntensity(v)}
                        className="py-1"
                    />
                </div>
            )}
        </div>
    );
}
