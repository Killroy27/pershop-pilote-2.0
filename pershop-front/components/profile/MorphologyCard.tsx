"use client";

import { Button } from "@/components/ui/button";

export function MorphologyCard() {
    return (
        <div className="space-y-6 pt-6 animate-in slide-in-from-bottom-4 duration-700 delay-200">
            <h3 className="font-bold text-lg text-foreground mb-4">Morphologie & Style</h3>

            <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#F3F1EB] dark:bg-muted p-4 rounded-lg">
                    <p className="text-xs text-muted-foreground uppercase">Haut</p>
                    <p className="font-medium text-foreground">Taille S</p>
                </div>
                <div className="bg-[#F3F1EB] dark:bg-muted p-4 rounded-lg">
                    <p className="text-xs text-muted-foreground uppercase">Bas</p>
                    <p className="font-medium text-foreground">Taille 36</p>
                </div>
                <div className="bg-[#F3F1EB] dark:bg-muted p-4 rounded-lg">
                    <p className="text-xs text-muted-foreground uppercase">Chaussures</p>
                    <p className="font-medium text-foreground">38</p>
                </div>
                <div className="bg-[#F3F1EB] dark:bg-muted p-4 rounded-lg">
                    <p className="text-xs text-muted-foreground uppercase">Taille</p>
                    <p className="font-medium text-foreground">168 cm</p>
                </div>
                <div className="col-span-2 bg-[#F3F1EB] dark:bg-muted p-4 rounded-lg">
                    <p className="text-xs text-muted-foreground uppercase">Forme</p>
                    <p className="font-medium text-foreground">Sablier (X)</p>
                </div>
            </div>

            <div className="pt-4">
                <Button className="bg-[#C5A047] hover:bg-[#b5952f] text-white font-medium shadow-md">
                    Modifier mes préférences
                </Button>
            </div>
        </div>
    );
}
