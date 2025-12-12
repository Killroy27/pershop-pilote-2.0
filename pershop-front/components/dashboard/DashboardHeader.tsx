"use client";

import Link from "next/link";
import { Bell } from "lucide-react";

export function DashboardHeader({ userName, avatarUrl }: { userName: string, avatarUrl: string }) {
    return (
        <div className="border-b border-border bg-card -mx-4 md:-mx-8 px-4 md:px-8">
            <div className="flex items-center justify-between py-6">
                <div className="flex items-center gap-4">
                    <Link href="/client/profile/settings">
                        <div className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all duration-300 hover:shadow-md cursor-pointer">
                            <img src={avatarUrl} alt={userName} className="w-full h-full object-cover" />
                        </div>
                    </Link>
                    <div>
                        <p className="text-muted-foreground text-sm">Bienvenue,</p>
                        <h1 className="text-xl font-serif font-bold text-foreground">{userName}</h1>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative p-2.5 cursor-pointer hover:bg-[#D4AF37]/10 rounded-full transition-colors group">
                        <Bell className="h-5 w-5 text-muted-foreground group-hover:text-[#D4AF37] transition-colors" />
                        <span className="absolute top-2 right-2.5 h-1.5 w-1.5 bg-[#D4AF37] rounded-full" />
                    </div>
                    <Link href="/" className="font-serif text-xl font-bold text-[#D4AF37] hover:opacity-80 transition-opacity">
                        PERSHOP
                    </Link>
                </div>
            </div>
        </div>
    );
}
