"use client";

import { Briefcase, GlassWater, Coffee, Plane } from "lucide-react";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const occasions = [
    { id: "work", label: "Vie professionnelle", description: "Pour le bureau et les réunions.", icon: Briefcase },
    { id: "event", label: "Événement spécial", description: "Mariages, galas, fêtes.", icon: GlassWater },
    { id: "casual", label: "Détente & Loisirs", description: "Weekends, sorties décontractées.", icon: Coffee },
    { id: "travel", label: "Vacances & Voyage", description: "Plage, exploration, voyages.", icon: Plane },
];

interface OccasionSelectorProps {
    value: string;
    onValueChange: (value: string) => void;
}

export function OccasionSelector({ value, onValueChange }: OccasionSelectorProps) {
    return (
        <div className="space-y-4">
            <label className="text-lg font-semibold text-foreground">Occasion principale</label>

            <RadioGroup value={value} onValueChange={onValueChange} className="flex flex-col gap-3">
                {occasions.map((occasion) => {
                    const isSelected = value === occasion.id;
                    const Icon = occasion.icon;

                    return (
                        <div key={occasion.id}>
                            <RadioGroupItem value={occasion.id} id={occasion.id} className="peer sr-only" />
                            <Label
                                htmlFor={occasion.id}
                                className={cn(
                                    "flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:bg-muted/30",
                                    isSelected
                                        ? "border-[#D4AF37] bg-[#D4AF37]/5 shadow-sm"
                                        : "border-muted/40 hover:border-[#D4AF37]/30"
                                )}
                            >
                                {/* Custom Radio Circle */}
                                <div className={cn(
                                    "h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors",
                                    isSelected ? "border-[#D4AF37]" : "border-muted-foreground/40"
                                )}>
                                    {isSelected && <div className="h-2.5 w-2.5 rounded-full bg-[#D4AF37]" />}
                                </div>

                                {/* Icon Box */}
                                <div className="h-10 w-10 shrink-0 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
                                    <Icon className="h-5 w-5" />
                                </div>

                                <div className="flex flex-col">
                                    <span className={cn("font-medium text-base", isSelected ? "text-foreground" : "text-foreground/90")}>
                                        {occasion.label}
                                    </span>
                                    <span className="text-sm text-muted-foreground font-normal">
                                        {occasion.description}
                                    </span>
                                </div>
                            </Label>
                        </div>
                    );
                })}
            </RadioGroup>
        </div>
    );
}
