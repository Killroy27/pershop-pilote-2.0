"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react";

export function NextSessionCard() {
    return (
        <div className="bg-white p-8 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-[#D4AF37]/20 relative overflow-hidden group">
            {/* Decorative bg */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110 duration-700" />

            <span className="inline-block px-3 py-1 bg-[#D4AF37]/10 text-[#D4AF37] text-[10px] font-bold tracking-widest uppercase rounded-full mb-6">
                Prochaine Rencontre
            </span>

            <h3 className="font-serif text-2xl text-[#111111] mb-6 leading-snug">
                Essayage Exclusif<br />avec <span className="italic text-gray-500">Sophie M.</span>
            </h3>

            <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Calendar className="h-4 w-4 text-[#D4AF37]" />
                    <span>Mardi 12 Juin 2025</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Clock className="h-4 w-4 text-[#D4AF37]" />
                    <span>14:30 - 16:00</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                    <MapPin className="h-4 w-4 text-[#D4AF37]" />
                    <span>Showroom Privé, Paris 8ème</span>
                </div>
            </div>

            <div className="flex gap-3">
                <Link href="/client/shopper/sophie/booking" className="flex-1">
                    <Button variant="outline" className="w-full border-gray-200 hover:border-[#D4AF37] hover:bg-white hover:text-[#D4AF37] text-gray-600 rounded-full text-xs uppercase tracking-wider h-10 transition-all">
                        Modifier
                    </Button>
                </Link>
                <Button className="w-10 h-10 rounded-full bg-[#111111] hover:bg-[#D4AF37] text-white p-0 flex items-center justify-center transition-colors">
                    <ArrowRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
