"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export function InspirationCarousel() {
    const images = [
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1548263594-a71c3f08d4fc?q=80&w=200&auto=format&fit=crop"
    ];

    return (
        <div className="relative group overflow-hidden rounded-3xl">
            <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar snap-x">
                {images.map((img, idx) => (
                    <div key={idx} className="min-w-[140px] aspect-[2/3] rounded-2xl overflow-hidden snap-center relative">
                        <img src={img} className="h-full w-full object-cover transition-transform hover:scale-105 duration-500" alt="Inspiration" />
                    </div>
                ))}
            </div>

            {/* Navigation Buttons (Mocked visually) */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-black/50 p-1 rounded-full shadow-md cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronLeft className="h-4 w-4" />
            </div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-black/50 p-1 rounded-full shadow-md cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronRight className="h-4 w-4" />
            </div>
        </div>
    );
}
