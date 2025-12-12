"use client";

import Link from "next/link";
import { Search, Heart, MessageSquare } from "lucide-react";

const actions = [
    { label: "Nouvelle recherche", icon: Search, href: "/analysis/step1" },
    { label: "Mes favoris", icon: Heart, href: "/client/match" },
    { label: "Messagerie", icon: MessageSquare, href: "#", badge: 2 },
];

export function QuickActions() {
    return (
        <div className="grid grid-cols-1 gap-3">
            {actions.map((action) => (
                <Link key={action.label} href={action.href}>
                    <button className="flex items-center justify-between w-full p-4 bg-card rounded-xl border border-border hover:border-[#D4AF37]/50 hover:shadow-lg transition-all duration-300 group">
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-muted rounded-full group-hover:bg-[#D4AF37]/10 transition-colors">
                                <action.icon className="h-5 w-5 text-muted-foreground group-hover:text-[#D4AF37]" />
                            </div>
                            <span className="font-medium text-foreground text-sm">{action.label}</span>
                        </div>

                        {action.badge && (
                            <span className="bg-[#D4AF37] text-black text-[10px] font-bold px-2 py-0.5 rounded-full">
                                {action.badge}
                            </span>
                        )}
                    </button>
                </Link>
            ))}
        </div>
    );
}
