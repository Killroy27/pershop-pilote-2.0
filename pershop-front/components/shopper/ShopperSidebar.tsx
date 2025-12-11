"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, UserCircle, Calendar, Settings, ArrowLeftRight } from "lucide-react";

const navigation = [
    { name: "Dashboard", href: "/shopper/dashboard", icon: LayoutDashboard },
    { name: "Matchings", href: "/shopper/matchings", icon: ArrowLeftRight }, // Using ArrowLeftRight for Matchings/Connections
    { name: "Clients", href: "/shopper/clients", icon: Users },
    { name: "Agenda", href: "/shopper/agenda", icon: Calendar },
    { name: "Profil", href: "/shopper/profile", icon: UserCircle },
    { name: "Paramètres", href: "/shopper/settings", icon: Settings },
];

export function ShopperSidebar() {
    const pathname = usePathname();

    return (
        <div className="flex flex-col w-64 bg-[#111111] border-r border-[#D4AF37]/20 min-h-screen text-white">
            {/* Logo Section */}
            <div className="flex flex-col items-center justify-center h-32 border-b border-[#D4AF37]/10">
                <div className="relative w-12 h-12 flex items-center justify-center border-2 border-[#D4AF37] rounded-full mb-2">
                    <span className="font-serif text-2xl text-[#D4AF37] italic">P</span>
                </div>
                <h1 className="font-serif text-xl tracking-widest text-[#D4AF37] font-semibold">
                    PERSHOP
                </h1>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-8 px-4 space-y-2">
                {navigation.map((item) => {
                    const isActive = pathname === item.href || (item.href !== "/shopper/dashboard" && pathname.startsWith(item.href));

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-4 px-6 py-3.5 text-sm font-medium transition-all duration-300 relative group my-1 rounded-r-full mr-4
                                ${isActive
                                    ? "text-[#D4AF37] bg-[#D4AF37]/10"
                                    : "text-gray-400 hover:text-white hover:bg-white/5"
                                }
                            `}
                        >
                            <item.icon className={`h-5 w-5 ${isActive ? "text-[#D4AF37]" : "text-gray-400 group-hover:text-white"}`} />
                            {item.name}
                            {isActive && (
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#D4AF37] rounded-r-full shadow-[0_0_10px_#D4AF37]" />
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer / Version if needed */}
            <div className="p-4 text-xs text-gray-600 text-center">
                v2.0
            </div>
        </div>
    );
}
