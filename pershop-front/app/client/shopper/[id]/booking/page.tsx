"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, User, Mail, Phone, MapPin, MessageSquare } from "lucide-react";

export default function BookingPage({ params }: { params: { id: string } }) {
    const router = useRouter();

    // Client info fields
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [notes, setNotes] = useState("");

    // Booking fields
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [time, setTime] = useState<string | undefined>();

    const handleConfirm = () => {
        // Collect all booking data
        const bookingData = {
            client: {
                firstName,
                lastName,
                email,
                phone,
                address
            },
            notes,
            date: date?.toISOString(),
            time,
            shopperId: params.id,
            createdAt: new Date().toISOString()
        };

        // Save to localStorage (in production, send to API)
        localStorage.setItem("pershop_last_booking", JSON.stringify(bookingData));

        router.push("/client/booking/confirmation");
    };

    // Validation
    const isClientInfoValid = firstName && lastName && email && phone;
    const isBookingValid = date && time && isClientInfoValid;

    return (
        <div className="min-h-screen bg-[#FDFBF7] dark:bg-background text-foreground transition-colors duration-500">

            {/* Header Bar */}
            <div className="border-b border-border bg-card">
                <div className="container max-w-screen-xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href={`/client/shopper/${params.id}`} className="flex items-center text-muted-foreground hover:text-foreground transition-colors gap-2 text-sm">
                        <ChevronLeft className="h-5 w-5" />
                        <span>Retour au profil</span>
                    </Link>

                    <Link href="/" className="font-serif text-xl font-bold text-[#D4AF37] hover:opacity-80 transition-opacity">
                        PERSHOP
                    </Link>
                </div>
            </div>

            <div className="container max-w-screen-lg mx-auto px-6 py-8">
                <h1 className="text-3xl font-serif font-bold mb-8 text-center">Réserver une session</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* Left: Client Information */}
                    <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
                        <h2 className="text-lg font-serif font-medium mb-6 flex items-center gap-2">
                            <User className="h-5 w-5 text-[#D4AF37]" />
                            Vos informations
                        </h2>

                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm text-muted-foreground">Prénom *</label>
                                    <Input
                                        placeholder="Prénom"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        className="h-12 bg-background border-border rounded-lg"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-muted-foreground">Nom *</label>
                                    <Input
                                        placeholder="Nom"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        className="h-12 bg-background border-border rounded-lg"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm text-muted-foreground flex items-center gap-2">
                                    <Mail className="h-4 w-4" /> Email *
                                </label>
                                <Input
                                    type="email"
                                    placeholder="votre@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="h-12 bg-background border-border rounded-lg"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm text-muted-foreground flex items-center gap-2">
                                    <Phone className="h-4 w-4" /> Téléphone *
                                </label>
                                <Input
                                    type="tel"
                                    placeholder="06 12 34 56 78"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="h-12 bg-background border-border rounded-lg"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm text-muted-foreground flex items-center gap-2">
                                    <MapPin className="h-4 w-4" /> Adresse (optionnel)
                                </label>
                                <Input
                                    placeholder="Votre adresse"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="h-12 bg-background border-border rounded-lg"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm text-muted-foreground flex items-center gap-2">
                                    <MessageSquare className="h-4 w-4" /> Message pour le Personal Shopper
                                </label>
                                <Textarea
                                    placeholder="Décrivez vos attentes, vos besoins spécifiques, etc."
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    className="bg-background border-border rounded-lg min-h-[100px]"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right: Date & Time Selection */}
                    <div className="space-y-6">
                        <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
                            <h2 className="text-lg font-serif font-medium mb-4">Choisir une date</h2>
                            <div className="flex justify-center border border-border rounded-xl p-4 bg-background">
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

                        <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
                            <h2 className="text-lg font-serif font-medium mb-4">Choisir un horaire</h2>
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
                            disabled={!isBookingValid}
                            className="w-full h-14 text-lg bg-[#D4AF37] hover:bg-[#FCCA2E] text-black font-medium shadow-lg shadow-[#D4AF37]/20 disabled:opacity-50"
                        >
                            Confirmer la réservation
                        </Button>

                        {!isClientInfoValid && (
                            <p className="text-center text-sm text-muted-foreground">
                                Remplissez vos informations pour continuer
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
