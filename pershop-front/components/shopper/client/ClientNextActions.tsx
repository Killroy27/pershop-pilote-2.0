"use client";

import { Button } from "@/components/ui/button";

export function ClientNextActions() {
    return (
        <div className="bg-white p-6 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100">
            <h2 className="font-bold text-lg mb-4 text-[#111111] font-serif">Actions Suivantes</h2>
            <div className="space-y-3">
                <Button className="w-full bg-gradient-to-r from-[#D4AF37] to-[#FCCA2E] hover:from-[#b5952f] hover:to-[#eeb51d] text-black font-semibold h-12 shadow-md">
                    Planifier Réunion d&apos;Alignement
                </Button>
                <Button className="w-full bg-gradient-to-r from-[#D4AF37] to-[#FCCA2E] hover:from-[#b5952f] hover:to-[#eeb51d] text-black font-semibold h-12 shadow-md">
                    Générer Proposition sur Mesure
                </Button>
            </div>
        </div>
    );
}
