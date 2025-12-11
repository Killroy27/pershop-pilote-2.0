"use client";

import { Badge } from "@/components/ui/badge";

interface ShopperHeroProps {
    name: string;
    title: string;
    location: string;
    matchScore: number;
    avatarUrl: string;
    bannerUrl: string;
}

export function ShopperHero({ name, title, location, matchScore, avatarUrl, bannerUrl }: ShopperHeroProps) {
    return (
        <div className="relative w-full h-[400px] rounded-b-[40px] md:rounded-[40px] overflow-hidden mb-12 shadow-2xl">
            {/* Background Banner */}
            <img src={bannerUrl} alt="Banner" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Content Container */}
            <div className="absolute inset-x-0 bottom-0 p-8 md:p-12 flex flex-col md:flex-row items-end md:items-center justify-between gap-6">

                {/* Avatar & Info */}
                <div className="flex items-center gap-6 md:gap-8">
                    <div className="relative h-28 w-28 md:h-40 md:w-40 rounded-full border-4 border-[#D4AF37] overflow-hidden shadow-xl shrink-0">
                        <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
                    </div>

                    <div className="text-white space-y-1 md:space-y-2 mb-2 md:mb-0">
                        <h1 className="text-3xl md:text-5xl font-serif font-bold tracking-tight">{name}</h1>
                        <div className="flex items-center gap-2 text-white/90 font-medium">
                            <span className="text-[#D4AF37]">{title}</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                            <span>{location}</span>
                        </div>
                    </div>
                </div>

                {/* Match Badge (Desktop: Top Right, Mobile: Absolute Top Right) */}
                <div className="absolute top-6 right-6 md:static">
                    <div className="relative h-24 w-24 md:h-32 md:w-32 rounded-full border-[3px] border-[#D4AF37] bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center text-center shadow-lg animate-in zoom-in duration-700">
                        <div className="absolute -inset-1 border border-[#D4AF37]/30 rounded-full animate-ping opacity-20" />
                        <span className="text-2xl md:text-4xl font-bold text-[#D4AF37]">{matchScore}%</span>
                        <span className="text-[10px] md:text-xs font-medium uppercase tracking-widest text-white/90">Match</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
