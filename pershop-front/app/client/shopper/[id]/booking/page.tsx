"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function BookingPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [time, setTime] = useState<string | undefined>();

    const handleConfirm = () => {
        // In a real app, save booking to DB
        router.push("/client/booking/confirmation");
    };

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col items-center py-12 px-4">
            <div className="w-full max-w-lg space-y-8">

                <div className="flex items-center gap-4">
                    <Link href={`/client/shopper/${params.id}`} className="p-2 hover:bg-muted rounded-full transition-colors">
                        <ChevronLeft className="h-6 w-6" />
                    </Link>
                    <h1 className="text-2xl font-serif font-bold">Réserver une session</h1>
                </div>

                <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-6">

                    <div className="space-y-4">
                        <label className="text-sm font-medium uppercase tracking-wide text-muted-foreground">Choisir une date</label>
                        <div className="flex justify-center border rounded-xl p-4 bg-background">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                className="rounded-md"
                                classNames={{
                                    day_selected: "bg-[#D4AF37] text-primary-foreground hover:bg-[#D4AF37] hover:text-primary-foreground focus:bg-[#D4AF37] focus:text-primary-foreground",
                                    day_today: "bg-accent text-accent-foreground",
                                }}
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="text-sm font-medium uppercase tracking-wide text-muted-foreground">Choisir un horaire</label>
                        <Select onValueChange={setTime}>
                            <SelectTrigger className="w-full h-12 rounded-xl border-border bg-background">
                                <SelectValue placeholder="Sélectionner un créneau" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="10:00">10:00 - 12:00</SelectItem>
                                <SelectItem value="14:00">14:00 - 16:00</SelectItem>
                                <SelectItem value="16:30">16:30 - 18:30</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Button
                        onClick={handleConfirm}
                        disabled={!date || !time}
                        className="w-full h-12 text-lg bg-[#D4AF37] hover:bg-[#b5952f] text-black font-medium mt-4 shadow-lg shadow-[#D4AF37]/20"
                    >
                        Confirmer la réservation
                    </Button>

                </div>
            </div>
        </div>
    );
}
