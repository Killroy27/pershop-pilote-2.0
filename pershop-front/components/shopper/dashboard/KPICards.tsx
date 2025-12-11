"use client";

import { Star, TrendingUp, TrendingDown } from "lucide-react";

export function KPICards() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

            {/* Card 1: Nouveaux Matchings */}
            <div className="bg-white p-6 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1">
                <h3 className="text-gray-500 font-medium mb-4 tracking-wide uppercase text-xs">Nouveaux Matchings</h3>
                <div className="flex items-end gap-3 mb-2">
                    <span className="text-5xl font-serif font-bold text-[#111111]">12</span>
                </div>
                <p className="text-sm text-[#D4AF37] flex items-center gap-1 font-medium bg-[#D4AF37]/10 w-fit px-2 py-1 rounded-full">
                    <TrendingUp className="h-3 w-3" /> +3 aujourd&apos;hui
                </p>
            </div>

            {/* Card 2: Satisfaction */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-gray-500 font-medium mb-4">Taux Satisfaction</h3>
                <div className="flex items-center gap-4 mb-2">
                    <span className="text-5xl font-serif font-bold text-[#111111]">4.9/5</span>
                    <div className="flex text-[#D4AF37]">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className="h-5 w-5 fill-current" />
                        ))}
                    </div>
                </div>
                <p className="text-sm text-gray-400">156 avis</p>
            </div>

            {/* Card 3: Revenus */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative overflow-hidden">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-gray-500 font-medium">Revenus ce mois</h3>
                    <span className="text-green-600 text-sm font-medium flex items-center gap-1">
                        <TrendingUp className="h-4 w-4" /> +15% vs Avril
                    </span>
                </div>
                <div className="mb-2">
                    <span className="text-5xl font-serif font-bold text-[#111111]">2,840€</span>
                </div>

                {/* Simplified SVG Curve */}
                <div className="absolute bottom-0 right-0 w-full h-16 opacity-20 pointer-events-none">
                    <svg viewBox="0 0 100 40" className="w-full h-full text-[#D4AF37] fill-none stroke-current stroke-2">
                        <path d="M0 35 C 20 35, 30 10, 50 20 C 70 30, 80 5, 100 15 L 100 40 L 0 40 Z" className="fill-[#D4AF37]/50 stroke-none" />
                        <path d="M0 35 C 20 35, 30 10, 50 20 C 70 30, 80 5, 100 15" />
                    </svg>
                </div>
            </div>

        </div>
    );
}
