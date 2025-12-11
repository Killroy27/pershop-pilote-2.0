"use client";

import React, { useState } from "react";
import { Shield, CloudLightning, Star, HelpCircle, Scale, Flag } from "lucide-react";
import { cn } from "@/lib/utils";

const emotions = [
    { id: "confiants", label: "Confiant", icon: Shield, color: "#D4AF37", rotation: 0 },
    { id: "stresse", label: "Stressé", icon: CloudLightning, color: "#D4AF37", rotation: 60 },
    { id: "excite", label: "Excité", icon: Star, color: "#D4AF37", rotation: 120 },
    { id: "incertain", label: "Incertain", icon: HelpCircle, color: "#D4AF37", rotation: 180 },
    { id: "serein", label: "Serein", icon: Scale, color: "#D4AF37", rotation: 240 },
    { id: "motive", label: "Motivé", icon: Flag, color: "#D4AF37", rotation: 300 },
];

interface MoodWheelProps {
    onSelect: (emotionId: string) => void;
    selectedEmotion?: string | null;
}

export function MoodWheel({ onSelect, selectedEmotion }: MoodWheelProps) {
    const [hovered, setHovered] = useState<string | null>(null);

    // SVG configuration
    const center = 150;
    const labelRadius = 105; // Slightly pushed out for better centering in wider part of slice

    return (
        <div className="relative h-[320px] w-[320px] mx-auto animate-in zoom-in duration-700">

            {/* Center Glow */}
            <div className="absolute inset-0 bg-[#D4AF37]/5 rounded-full blur-3xl" />

            <svg viewBox="0 0 300 300" className="w-full h-full drop-shadow-2xl">
                <defs>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>

                {/* 1. SLICES LAYER */}
                {emotions.map((emotion, index) => {
                    const isSelected = selectedEmotion === emotion.id;
                    const isHovered = hovered === emotion.id;

                    return (
                        <g
                            key={emotion.id}
                            transform={`rotate(${emotion.rotation - 90}, 150, 150)`}
                            onClick={() => onSelect(emotion.id)}
                            onMouseEnter={() => setHovered(emotion.id)}
                            onMouseLeave={() => setHovered(null)}
                            className="cursor-pointer transition-all duration-300"
                            style={{ opacity: selectedEmotion ? (isSelected ? 1 : 0.4) : 1 }}
                        >
                            {/* Slice Path for visual segment */}
                            <path
                                d="M150,150 L275,77 A145,145 0 0,1 275,223 Z"
                                fill={isSelected || isHovered ? "rgba(212, 175, 55, 0.2)" : "rgba(255,255,255,0.03)"}
                                stroke={isSelected || isHovered ? "#D4AF37" : "rgba(255,255,255,0.1)"}
                                strokeWidth={isSelected ? 3 : 1}
                                className="transition-all duration-300 ease-out"
                            />
                        </g>
                    );
                })}

                {/* 2. LABELS LAYER (Independent of slice rotation to stay horizontal) */}
                {emotions.map((emotion) => {
                    const isSelected = selectedEmotion === emotion.id;
                    const isHovered = hovered === emotion.id;

                    // Calculate position
                    const angleRad = (emotion.rotation - 90) * (Math.PI / 180);
                    const x = center + labelRadius * Math.cos(angleRad);
                    const y = center + labelRadius * Math.sin(angleRad);

                    return (
                        <foreignObject
                            key={`label-${emotion.id}`}
                            x={x - 40} // Center the 80px width box
                            y={y - 30} // Center the 60px height box
                            width="80"
                            height="60"
                            className="pointer-events-none" // Events handled by slice underneath
                        >
                            <div className="flex flex-col items-center justify-center h-full text-center">
                                <p className={cn(
                                    "text-xs mb-1 font-medium transition-colors whitespace-nowrap",
                                    isSelected || isHovered ? "text-[#D4AF37]" : "text-muted-foreground"
                                )}>
                                    {emotion.label}
                                </p>
                                <emotion.icon
                                    className={cn(
                                        "h-5 w-5 transition-all text-[#D4AF37]",
                                        isSelected || isHovered ? "opacity-100 stroke-[2.5]" : "opacity-70"
                                    )}
                                />
                            </div>
                        </foreignObject>
                    );
                })}

                {/* Center Hub */}
                <circle cx="150" cy="150" r="25" className="fill-background stroke-[#D4AF37]" strokeWidth="2" strokeOpacity="0.5" />
            </svg>
        </div>
    );
}
