"use client";

import { useState, KeyboardEvent } from "react";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const popularBrands = ["Zara", "H&M", "COS", "Sandro", "Maje", "Massimo Dutti"];

interface BrandSelectorProps {
    selectedBrands: string[];
    onAddBrand: (brand: string) => void;
    onRemoveBrand: (brand: string) => void;
}

export function BrandSelector({ selectedBrands, onAddBrand, onRemoveBrand }: BrandSelectorProps) {
    const [inputValue, setInputValue] = useState("");

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && inputValue.trim()) {
            e.preventDefault();
            onAddBrand(inputValue.trim());
            setInputValue("");
        }
    };

    const handleSuggestionClick = (brand: string) => {
        onAddBrand(brand);
    };

    return (
        <div className="space-y-8">
            <label className="block text-lg font-semibold text-foreground mb-4">Marques favorites</label>

            <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Rechercher une marque..."
                className="w-full max-w-sm rounded-[30px] border-muted-foreground/30 focus-visible:ring-[#D4AF37]"
            />

            <div className="flex flex-wrap gap-2">
                {/* Selected Brands */}
                {selectedBrands.map((brand) => (
                    <Badge
                        key={brand}
                        variant="outline"
                        className="bg-[#D4AF37]/10 border-[#D4AF37] text-foreground hover:bg-[#D4AF37]/20 px-3 py-1 text-sm rounded-full gap-2 cursor-pointer transition-colors"
                        onClick={() => onRemoveBrand(brand)}
                    >
                        {brand}
                        <X className="h-3 w-3 hover:text-destructive" />
                    </Badge>
                ))}

                {/* Suggestions (only if list is empty or few items, or matching input) */}
                {selectedBrands.length === 0 && !inputValue && (
                    <>
                        <span className="text-sm text-muted-foreground self-center ml-2">Suggestions :</span>
                        {popularBrands.map((brand) => (
                            <Badge
                                key={brand}
                                variant="outline"
                                className="border-dashed border-muted-foreground/40 text-muted-foreground bg-transparent hover:bg-muted/50 cursor-pointer px-3 py-1 text-sm rounded-full"
                                onClick={() => handleSuggestionClick(brand)}
                            >
                                + {brand}
                            </Badge>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
}
