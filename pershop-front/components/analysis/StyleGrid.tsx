"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data with placeholders - in production these would be real assets
const styles = [
    { id: "classique", label: "Classique", image: "https://images.unsplash.com/photo-1548624149-f3214c7c944a?q=80&w=600&auto=format&fit=crop" }, // Beige Blazer
    { id: "moderne", label: "Moderne", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600&auto=format&fit=crop" }, // White Dress
    { id: "boheme", label: "Bohème", image: "https://images.unsplash.com/photo-1627931327118-2e0f0985223c?q=80&w=600&auto=format&fit=crop" }, // Floral Dress
    { id: "minimaliste", label: "Minimaliste", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop" }, // Simple outfit
    { id: "elegant", label: "Élégant", image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=600&auto=format&fit=crop" }, // Evening Gown
    { id: "casual-chic", label: "Casual Chic", image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=600&auto=format&fit=crop" }, // Sweater/Jeans
    { id: "avant-garde", label: "Avant-garde", image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=600&auto=format&fit=crop" }, // Fashion
    { id: "intemporel", label: "Intemporel", image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=600&auto=format&fit=crop" }, // Trench Coat
];

interface StyleGridProps {
    selectedStyles: string[];
    onToggleStyle: (styleId: string) => void;
}

export function StyleGrid({ selectedStyles, onToggleStyle }: StyleGridProps) {
    return (
        <div className="space-y-4">
            <label className="text-lg font-semibold text-foreground">Styles préférés</label>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {styles.map((style) => {
                    const isSelected = selectedStyles.includes(style.id);

                    return (
                        <div
                            key={style.id}
                            onClick={() => onToggleStyle(style.id)}
                            className={cn(
                                "group relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer transition-all duration-300",
                                isSelected ? "ring-4 ring-[#D4AF37] ring-offset-2 scale-[1.02]" : "hover:scale-[1.02] hover:shadow-lg"
                            )}
                        >
                            <img
                                src={style.image}
                                alt={style.label}
                                className={cn(
                                    "w-full h-full object-cover transition-transform duration-700",
                                    isSelected ? "scale-110" : "group-hover:scale-110"
                                )}
                            />

                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />

                            {/* Label */}
                            <div className="absolute bottom-4 left-0 right-0 text-center">
                                <span className="text-white font-serif tracking-wide text-lg">{style.label}</span>
                            </div>

                            {/* Checkbox Visual */}
                            {isSelected && (
                                <div className="absolute top-3 right-3 h-6 w-6 rounded-full bg-[#D4AF37] text-black flex items-center justify-center animate-in zoom-in duration-300">
                                    <Check className="h-4 w-4" />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
