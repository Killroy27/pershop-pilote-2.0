"use client";

import { useId } from "react";
import { Camera, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ProfilePage() {
    const id = useId();

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-serif font-bold text-foreground">Mon profil</h1>
                <p className="text-muted-foreground">Gérez vos informations personnelles et vos préférences.</p>
            </div>

            <div className="flex flex-col items-center justify-center space-y-4">
                <h2 className="text-lg font-medium">Photo de profil</h2>
                <div className="relative group cursor-pointer">
                    <Avatar className="h-32 w-32 border-4 border-background shadow-xl">
                        <AvatarImage src="/avatars/01.png" />
                        <AvatarFallback className="text-2xl">MD</AvatarFallback>
                    </Avatar>
                    <div className="absolute bottom-0 right-0">
                        <Button size="sm" className="rounded-full h-8 px-3 bg-primary text-primary-foreground hover:bg-primary/90 shadow-md gap-1">
                            <Camera className="h-3 w-3" />
                            <span className="text-xs">Modifier</span>
                        </Button>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <h2 className="text-xl font-serif font-medium border-b border-border/50 pb-2">Informations personnelles</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor={`${id}-firstname`}>Prénom</Label>
                        <Input id={`${id}-firstname`} defaultValue="Marie" className="bg-secondary/20" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor={`${id}-lastname`}>Nom</Label>
                        <Input id={`${id}-lastname`} defaultValue="Dubois" className="bg-secondary/20" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor={`${id}-email`}>Email</Label>
                        <div className="relative">
                            <Input id={`${id}-email`} defaultValue="marie.dubois@example.com" className="bg-secondary/20 pr-20" />
                            <span className="absolute right-3 top-2.5 text-xs font-medium text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">Vérifié</span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor={`${id}-phone`}>Téléphone</Label>
                        <Input id={`${id}-phone`} defaultValue="+33 6 12 34 56 78" className="bg-secondary/20" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor={`${id}-city`}>Ville</Label>
                        <Select defaultValue="paris">
                            <SelectTrigger id={`${id}-city`} className="bg-secondary/20">
                                <SelectValue placeholder="Sélectionner une ville" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="paris">Paris</SelectItem>
                                <SelectItem value="lyon">Lyon</SelectItem>
                                <SelectItem value="marseille">Marseille</SelectItem>
                                <SelectItem value="bordeaux">Bordeaux</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor={`${id}-dob`}>Date de naissance</Label>
                        <div className="relative">
                            <Input id={`${id}-dob`} defaultValue="15/03/1993" className="bg-secondary/20 pr-10" />
                            <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <h2 className="text-xl font-serif font-medium border-b border-border/50 pb-2">Morphologie & Style</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-secondary/30 p-4 rounded-lg">
                        <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Haut</div>
                        <div className="font-medium">Taille S</div>
                    </div>
                    <div className="bg-secondary/30 p-4 rounded-lg">
                        <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Bas</div>
                        <div className="font-medium">Taille 36</div>
                    </div>
                    <div className="bg-secondary/30 p-4 rounded-lg">
                        <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Chaussures</div>
                        <div className="font-medium">38</div>
                    </div>
                    <div className="bg-secondary/30 p-4 rounded-lg">
                        <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Taille</div>
                        <div className="font-medium">168 cm</div>
                    </div>
                    <div className="bg-secondary/30 p-4 rounded-lg col-span-1 md:col-span-2">
                        <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Forme</div>
                        <div className="font-medium">Sablier</div>
                    </div>
                </div>

                <div className="pt-4">
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-8 w-full md:w-auto">
                        Modifier mes préférences
                    </Button>
                </div>
            </div>
        </div>
    );
}
