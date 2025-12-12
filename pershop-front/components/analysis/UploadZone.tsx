"use client";

import { useState, useRef, ChangeEvent } from "react";
import { Upload, Lock, X, Image as ImageIcon } from "lucide-react";

interface UploadZoneProps {
    onFileSelect: (file: File | null) => void;
}

export function UploadZone({ onFileSelect }: UploadZoneProps) {
    const [preview, setPreview] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            processFile(file);
        }
    };

    const processFile = (file: File) => {
        // Check if it's an image
        if (!file.type.startsWith("image/")) {
            alert("Veuillez sélectionner une image");
            return;
        }

        // Create preview
        const reader = new FileReader();
        reader.onload = (e) => {
            setPreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);

        onFileSelect(file);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) {
            processFile(file);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const clearPreview = () => {
        setPreview(null);
        onFileSelect(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    if (preview) {
        return (
            <div className="relative rounded-3xl overflow-hidden min-h-[400px] group">
                <img
                    src={preview}
                    alt="Aperçu"
                    className="w-full h-full object-cover min-h-[400px]"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                        onClick={clearPreview}
                        className="bg-white/90 text-black p-3 rounded-full hover:bg-white transition-colors"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 text-white text-sm">
                    <ImageIcon className="h-4 w-4" />
                    <span>Photo prête pour l'analyse</span>
                </div>
            </div>
        );
    }

    return (
        <div
            onClick={handleClick}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`group relative border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-300 cursor-pointer flex flex-col items-center justify-center gap-6 min-h-[400px] ${isDragging
                    ? "border-[#D4AF37] bg-[#D4AF37]/10"
                    : "border-muted-foreground/20 hover:border-primary/50 bg-muted/20 hover:bg-muted/30"
                }`}
        >
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
            />

            <div className="p-6 rounded-full bg-background shadow-sm group-hover:shadow-md transition-all">
                <Upload className={`h-10 w-10 transition-colors ${isDragging ? "text-[#D4AF37]" : "text-muted-foreground group-hover:text-primary"}`} />
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
