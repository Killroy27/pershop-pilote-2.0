"use client";

import { Bell, Mail, ChevronDown } from "lucide-react";

export function ShopperHeader({ name }: { name: string }) {
    // Mock current date for display
    const formattedDate = new Date().toLocaleDateString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const currentTime = new Date().toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true // using AM/PM as per mockup
    });

    return (
        <header className="flex items-center justify-between px-8 py-6 mb-8">
            {/* Left: Greeting */}
            <div>
                <h1 className="font-serif text-3xl font-bold text-[#111111]">
                    Bonjour {name}
                </h1>
                <p className="text-gray-500 text-sm mt-1 capitalize">
                    {formattedDate} | {currentTime}
                </p>
            </div>

            {/* Right: Actions & User */}
            <div className="flex items-center gap-6">
                <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <Bell className="h-6 w-6 text-gray-700" />
                    <span className="absolute top-1.5 right-2 h-2 w-2 bg-red-500 rounded-full border border-white"></span>
                </button>
                <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <Mail className="h-6 w-6 text-gray-700" />
                </button>

                <div className="flex items-center gap-3 pl-4 border-l border-gray-200 cursor-pointer">
                    <div className="h-10 w-10 rounded-full overflow-hidden border border-gray-200">
                        <img
                            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop"
                            alt={name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <span className="font-medium text-[#111111]">{name}</span>
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                </div>
            </div>
        </header>
    );
}
