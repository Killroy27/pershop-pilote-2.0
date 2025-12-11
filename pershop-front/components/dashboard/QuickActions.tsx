"use client";

import Link from "next/link";
import { Search, Heart, MessageSquare } from "lucide-react";

const actions = [
    { label: "Nouvelle recherche", icon: Search, href: "/analysis/step1" },
    { label: "Mes favoris", icon: Heart, href: "/client/match" }, // Placeholder link
    { label: "Messagerie", icon: MessageSquare, href: "#", badge: 2 },
];

export function QuickActions() {
    return (
        <div className="grid grid-cols-1 gap-3">
            {actions.map((action) => (
                <Link key={action.label} href={action.href}>
                    <button className="flex items-center justify-between w-full p-4 bg-white rounded-xl border border-gray-100 hover:border-[#D4AF37] hover:shadow-[0_4px_15px_rgba(0,0,0,0.05)] transition-all duration-300 group">
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-gray-50 rounded-full group-hover:bg-[#D4AF37]/10 transition-colors">
                                <action.icon className="h-5 w-5 text-gray-500 group-hover:text-[#D4AF37]" />
                            </div>
                            <span className="font-medium text-[#111111] text-sm">{action.label}</span>
                        </div>

                        {action.badge && (
                            <span className="bg-[#D4AF37] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                {action.badge}
                            </span>
                        )}
                    </button>
                </Link>
            ))}
        </div>
    );
}
