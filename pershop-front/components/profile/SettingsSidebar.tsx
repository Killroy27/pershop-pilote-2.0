"use client";

import { User, Sliders, CreditCard, Bell, Lock, HelpCircle } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const menuItems = [
    { icon: User, label: "Profil", href: "/client/profile/settings", active: true },
    { icon: Sliders, label: "Préférences style", href: "/client/profile/preferences", active: false },
    { icon: CreditCard, label: "Paiement", href: "/client/profile/payment", active: false },
    { icon: Bell, label: "Notifications", href: "/client/profile/notifications", active: false },
    { icon: Lock, label: "Confidentialité", href: "/client/profile/privacy", active: false },
    { icon: HelpCircle, label: "Aide", href: "/client/profile/help", active: false },
];

export function SettingsSidebar() {
    return (
        <div className="w-full lg:w-64 flex flex-col gap-2 pt-20">

            <nav className="space-y-1">
                {menuItems.map((item) => (
                    <Link
                        key={item.label}
                        href={item.href}
                        className={cn(
                            "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                            item.active
                                ? "bg-[#D4AF37]/10 text-[#D4AF37] border-l-4 border-[#D4AF37]"
                                : "text-muted-foreground hover:text-foreground hover:bg-accent"
                        )}
                    >
                        <item.icon className="h-5 w-5" />
                        {item.label}
                    </Link>
                ))}
            </nav>
        </div>
    );
}
