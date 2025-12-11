"use client";

import { Button } from "@/components/ui/button";

export function PreBriefHeader({ clientName }: { clientName: string }) {
    const today = new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });

    return (
        <div className="bg-black text-white px-8 py-6 flex flex-col md:flex-row justify-between items-start md:items-center border-b border-[#D4AF37]/30">
            <div>
                <h1 className="font-serif text-3xl font-bold tracking-tight">
                    Pre-Brief Augmenté – {clientName}
                </h1>
                <p className="text-gray-400 text-sm mt-1">
                    Généré par IA le {today}
                </p>
            </div>
            <Button variant="outline" className="mt-4 md:mt-0 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black">
                Télécharger PDF
            </Button>
        </div>
    );
}
