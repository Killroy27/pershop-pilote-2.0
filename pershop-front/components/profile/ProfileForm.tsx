"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2, Calendar } from "lucide-react";

export function ProfileForm() {
    return (
        <div className="space-y-6">
            <h3 className="font-bold text-lg text-foreground mb-4">Informations personnelles</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="firstname" className="text-[#D4AF37] text-xs uppercase tracking-wide">Prénom</Label>
                    <Input id="firstname" defaultValue="Marie" className="bg-[#FDFBF7] border-[#D4AF37]/30 focus:border-[#D4AF37] h-12" />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="lastname" className="text-[#D4AF37] text-xs uppercase tracking-wide">Nom</Label>
                    <Input id="lastname" defaultValue="Dubois" className="bg-[#FDFBF7] border-[#D4AF37]/30 focus:border-[#D4AF37] h-12" />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email" className="text-[#D4AF37] text-xs uppercase tracking-wide">Email</Label>
                    <div className="relative">
                        <Input id="email" defaultValue="marie.dubois@example.com" className="bg-[#FDFBF7] border-[#D4AF37]/30 focus:border-[#D4AF37] h-12 pr-10" />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-green-600 text-xs font-medium">
                            <CheckCircle2 className="h-4 w-4" /> Vérifié
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="phone" className="text-[#D4AF37] text-xs uppercase tracking-wide">Téléphone</Label>
                    <Input id="phone" defaultValue="+33 6 12 34 56 78" className="bg-[#FDFBF7] border-[#D4AF37]/30 focus:border-[#D4AF37] h-12" />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="city" className="text-[#D4AF37] text-xs uppercase tracking-wide">Ville</Label>
                    <Select defaultValue="paris">
                        <SelectTrigger className="bg-[#FDFBF7] border-[#D4AF37]/30 h-12">
                            <SelectValue placeholder="Choisir une ville" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="paris">Paris</SelectItem>
                            <SelectItem value="lyon">Lyon</SelectItem>
                            <SelectItem value="bordeaux">Bordeaux</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="dob" className="text-[#D4AF37] text-xs uppercase tracking-wide">Date de naissance</Label>
                    <div className="relative">
                        <Input id="dob" defaultValue="15/03/1993" className="bg-[#FDFBF7] border-[#D4AF37]/30 focus:border-[#D4AF37] h-12" />
                        <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    </div>
                </div>
            </div>
        </div>
    );
}
