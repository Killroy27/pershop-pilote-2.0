"use client";

import * as React from "react";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface BudgetSliderProps {
    value: number[];
    onValueChange: (value: number[]) => void;
    min?: number;
    max?: number;
    step?: number;
}

export function BudgetSlider({
    value,
    onValueChange,
    min = 500,
    max = 2000,
    step = 50
}: BudgetSliderProps) {
    return (
        <div className="w-full space-y-4">
            <div className="flex justify-between items-end">
                <label className="text-lg font-semibold text-foreground">Budget session</label>
                <span className="text-2xl font-serif font-bold text-[#D4AF37]">
                    {value[0]}€
                </span>
            </div>

            <Slider
                defaultValue={[800]}
                value={value}
                min={min}
                max={max}
                step={step}
                onValueChange={onValueChange}
                className={cn("py-4")}
            // Custom styling via CSS classes in globals or inline if needed, 
            // but standard shadcn slider uses primary color which we mapped to gold/black correctly?
            // We need to ensure the track is correct.
            />

            <div className="flex justify-between text-xs text-muted-foreground font-medium uppercase tracking-wider">
                <span>{min}€</span>
                <span>{max}€+</span>
            </div>
        </div>
    );
}
