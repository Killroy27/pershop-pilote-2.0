"use client";

import { ConfirmationIcon } from "@/components/booking/ConfirmationIcon";
import { ReservationCard } from "@/components/booking/ReservationCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function BookingConfirmationPage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center py-12 px-4 transition-colors duration-500">

            <div className="flex flex-col items-center text-center space-y-6 mb-10 max-w-lg">
                <ConfirmationIcon />
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground">Réservation confirmée !</h1>
                <p className="text-muted-foreground text-lg">
                    Votre session avec Sophie Laurent est programmée.
                </p>
            </div>

            <div className="w-full flex justify-center mb-10 animate-in slide-in-from-bottom-8 duration-700">
                <ReservationCard />
            </div>

            <div className="flex flex-col items-center gap-4 w-full max-w-xs">
                <Link href="/client/dashboard" className="w-full">
                    <Button className="w-full h-12 text-lg bg-[#D4AF37] hover:bg-[#b5952f] text-black shadow-lg shadow-[#D4AF37]/20 font-medium rounded-full">
                        Voir mon profil
                    </Button>
                </Link>
                <Link href="/" className="text-sm font-medium text-[#D4AF37] hover:underline underline-offset-4">
                    Retour à l&apos;accueil
                </Link>
            </div>

        </div>
    );
}
