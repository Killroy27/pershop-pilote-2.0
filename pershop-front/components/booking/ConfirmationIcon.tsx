"use client";

import { Check } from "lucide-react";

export function ConfirmationIcon() {
    return (
        <div className="relative flex items-center justify-center w-24 h-24 mb-6">
            <div className="absolute inset-0 bg-[#D4AF37]/20 rounded-full animate-ping" />
            <div className="relative w-20 h-20 bg-[#D4AF37] rounded-full flex items-center justify-center shadow-lg shadow-[#D4AF37]/30">
                <Check className="h-10 w-10 text-white stroke-[3]" />
            </div>
        </div>
    );
}
