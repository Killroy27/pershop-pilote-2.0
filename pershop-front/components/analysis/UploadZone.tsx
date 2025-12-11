"use client";

import { Upload, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

export function UploadZone() {
    return (
        <div className="group relative border-2 border-dashed border-muted-foreground/20 hover:border-primary/50 bg-muted/20 hover:bg-muted/30 rounded-3xl p-12 text-center transition-all duration-300 cursor-pointer flex flex-col items-center justify-center gap-6 min-h-[400px]">

            <div className="p-6 rounded-full bg-background shadow-sm group-hover:shadow-md transition-all">
                <Upload className="h-10 w-10 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>

            <div className="space-y-2">
                <h3 className="text-xl font-medium">Ajoutez une photo de vous</h3>
                <p className="text-muted-foreground text-sm">ou glissez-déposez ici</p>
            </div>

            <div className="absolute bottom-6 left-0 right-0 flex justify-center">
                <div className="flex items-center gap-2 text-xs text-muted-foreground/60">
                    <Lock className="h-3 w-3" />
                    <span>Photo analysée uniquement pour morphologie/colorimétrie - Jamais partagée</span>
                </div>
            </div>

        </div>
    );
}
