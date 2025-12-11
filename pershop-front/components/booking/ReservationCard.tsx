"use client";

import { Calendar, Clock, MapPin, Phone, MessageSquare } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function ReservationCard() {
    return (
        <div className="bg-card w-full max-w-md rounded-2xl shadow-xl border border-border overflow-hidden">

            {/* Session Details */}
            <div className="p-6 space-y-4">
                <h3 className="font-bold text-lg flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-[#D4AF37]" />
                    Détails de la session
                </h3>
                <div className="space-y-3 pl-7 text-sm">
                    <div className="flex items-center gap-3 text-foreground/80">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Samedi 16 Décembre 2025</span>
                    </div>
                    <div className="flex items-center gap-3 text-foreground/80">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>14:00 - 16:00 (2 heures)</span>
                    </div>
                    <div className="flex items-center gap-3 text-foreground/80">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>Galeries Lafayette Haussmann, Paris 9ème</span>
                    </div>
                </div>
            </div>

            <Separator />

            {/* Shopper Info */}
            <div className="p-6 space-y-4">
                <h3 className="font-bold text-lg">Personal Shopper</h3>
                <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-full overflow-hidden border border-border">
                        <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop" alt="Sophie" className="h-full w-full object-cover" />
                    </div>
                    <div className="space-y-1">
                        <p className="font-bold text-foreground">Sophie Laurent</p>
                        <p className="text-xs text-muted-foreground uppercase tracking-wide">Personal Shopper Elite</p>
                        <div className="flex gap-4 text-xs font-medium text-[#D4AF37] mt-1">
                            <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> +33 6 12 34 56 78</span>
                            <span className="flex items-center gap-1 underline cursor-pointer hover:text-[#D4AF37]/80"><MessageSquare className="h-3 w-3" /> Envoyer un message</span>
                        </div>
                    </div>
                </div>
            </div>

            <Separator />

            {/* Summary */}
            <div className="p-6 bg-muted/20 space-y-3">
                <h3 className="font-bold text-lg mb-4">Récapitulatif</h3>
                <div className="flex justify-between text-sm text-foreground/80">
                    <span>Session Personal Shopper (2 heures)</span>
                    <span>250,00€</span>
                </div>
                <div className="flex justify-between text-sm text-foreground/80">
                    <span>Frais de service</span>
                    <span>10,00€</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between text-lg font-bold text-foreground">
                    <span>Total payé</span>
                    <span>260,00€</span>
                </div>
            </div>

        </div>
    );
}
