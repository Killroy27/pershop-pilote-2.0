"use client";

import { Button } from "@/components/ui/button";
import { Download, ArrowLeft } from "lucide-react";
import Link from "next/link";

export function PreBriefHero({ clientName }: { clientName: string }) {
    const today = new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

    return (
        <div className="relative bg-[#111111] text-white pt-12 pb-24 overflow-hidden">
            {/* Background Texture/Gradient */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#D4AF37]/10 to-transparent pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex justify-between items-start mb-8">
                    <Link href="/shopper/dashboard" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm uppercase tracking-widest">
                        <ArrowLeft className="h-4 w-4" /> Retour
                    </Link>
                    <Button variant="outline" className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black rounded-full uppercase tracking-widest text-xs px-6 py-4 transition-all">
                        <Download className="h-4 w-4 mr-2" /> Export PDF
                    </Button>
                </div>

                <div className="max-w-4xl">
                    <span className="text-[#D4AF37] font-serif italic text-lg mb-2 block">Executive Brief</span>
                    <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6 leading-tight">
                        {clientName}
                    </h1>
                    <div className="flex flex-col md:flex-row gap-8 md:items-center text-gray-300 font-light">
                        <p>Généré le <span className="text-white font-normal">{today}</span></p>
                        <span className="hidden md:block w-px h-4 bg-gray-700" />
                        <p>Statut : <span className="text-white font-normal bg-red-500/20 text-red-400 px-2 py-0.5 text-sm uppercase tracking-wider">Urgent</span></p>
                        <span className="hidden md:block w-px h-4 bg-gray-700" />
                        <p>Profil : <span className="text-white font-normal">Professionnel / Luxe</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
}
