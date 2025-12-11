"use client";

import { Camera } from "lucide-react";

export function ProfileAvatar() {
    return (
        <div className="flex flex-col items-center">
            <div className="relative group cursor-pointer">
                <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-[#FDFBF7] shadow-xl">
                    <img
                        src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop"
                        alt="Profile"
                        className="h-full w-full object-cover"
                    />
                </div>
                <div className="absolute bottom-0 right-0 bg-[#D4AF37] text-white p-2 rounded-full shadow-md hover:bg-[#b5952f] transition-colors">
                    <Camera className="h-4 w-4" />
                </div>
            </div>
            <button className="mt-2 text-sm text-[#D4AF37] font-medium hover:underline opacity-0 group-hover:opacity-100 transition-opacity">
                Modifier
            </button>
        </div>
    );
}
