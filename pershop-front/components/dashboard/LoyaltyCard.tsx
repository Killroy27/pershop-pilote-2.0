"use client";

import { Crown } from "lucide-react";

export function LoyaltyCard() {
    return (
        <div className="bg-[#111111] p-8 rounded-xl relative overflow-hidden text-white shadow-lg">
            {/* Gold Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#D4AF37] rounded-full blur-[60px] opacity-30" />

            <div className="relative z-10 flex flex-col justify-between h-full min-h-[140px]">
                <div className="flex justify-between items-start">
                    <div>
                        <span className="text-[#D4AF37] text-xs font-bold tracking-[0.2em] uppercase block mb-1">Status</span>
                        <span className="text-xl font-serif italic">Gold Member</span>
                    </div>
                    <Crown className="h-6 w-6 text-[#D4AF37]" />
                </div>

                <div>
                    <div className="flex items-end gap-2 mb-2">
                        <span className="text-4xl font-serif font-bold">1,250</span>
                        <span className="text-sm text-gray-400 mb-1">pts</span>
                    </div>
                    <div className="w-full bg-gray-800 h-1 rounded-full overflow-hidden">
                        <div className="bg-[#D4AF37] h-full w-[70%] shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
                    </div>
                    <p className="text-[10px] text-gray-500 mt-2 uppercase tracking-wide text-right">
                        250 pts avant Platinum
                    </p>
                </div>
            </div>
        </div>
    );
}
