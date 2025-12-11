"use client";

import Link from "next/link";
import { Bell } from "lucide-react";

export function DashboardHeader({ userName, avatarUrl }: { userName: string, avatarUrl: string }) {
    return (
        <div className="flex items-center justify-between py-8">
            <div>
                <span className="text-xs font-bold tracking-[0.2em] text-[#D4AF37] uppercase mb-1 block">Espace Personnel</span>
                <h1 className="text-4xl font-serif text-[#111111] leading-tight">Bonjour, <span className="italic text-gray-600">Marie</span>.</h1>
            </div>

            <div className="flex items-center gap-6">
                <Link href="/client/profile/settings">
                    <div className="relative h-12 w-12 rounded-full overflow-hidden border border-gray-200 hover:border-[#D4AF37] transition-all duration-300 hover:shadow-md cursor-pointer">
                        <img src={avatarUrl} alt={userName} className="w-full h-full object-cover" />
                    </div>
                </Link>
                <div className="relative p-2.5 cursor-pointer hover:bg-[#D4AF37]/10 rounded-full transition-colors group">
                    <Bell className="h-5 w-5 text-gray-400 group-hover:text-[#D4AF37] transition-colors" />
                    <span className="absolute top-2 right-2.5 h-1.5 w-1.5 bg-[#D4AF37] rounded-full" />
                </div>
            </div>
        </div>
    );
}
