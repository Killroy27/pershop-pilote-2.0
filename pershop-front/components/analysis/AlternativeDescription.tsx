"use client";

import { useState } from "react";
import { Mic, Send, X, MessageSquare, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface AlternativeDescriptionProps {
    onTextSubmit: (text: string) => void;
    isLoading?: boolean;
}

export function AlternativeDescription({ onTextSubmit, isLoading }: AlternativeDescriptionProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [text, setText] = useState("");

    const handleSubmit = () => {
        if (text.trim()) {
            onTextSubmit(text);
        }
    };

    if (!isOpen) {
        return (
            <Button
                variant="link"
                onClick={() => setIsOpen(true)}
                className="text-muted-foreground hover:text-primary underline-offset-4 decoration-primary/50 transition-colors"
            >
                Je préfère décrire (Texte ou Vocal)
            </Button>
        );
    }

    return (
        <div className="w-full max-w-md mx-auto space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300 bg-card/50 backdrop-blur-sm p-4 rounded-xl border border-border/50">
            <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground/80 flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" /> Décrivez votre style et vos besoins
                </span>
                <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="h-6 w-6 p-0 rounded-full hover:bg-destructive/10 hover:text-destructive">
                    <X className="h-3 w-3" />
                </Button>
            </div>

            <Textarea
                placeholder="Ex: Je suis avocate, j'ai une présentation importante dans 3 jours. Je cherche une tenue qui inspire confiance et autorité, mais qui reste féminine..."
                className="min-h-[120px] resize-none bg-background/80"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />

            <div className="flex items-center justify-between gap-2">
                {/* Voice Recorder Button */}
                <Button
                    variant={isRecording ? "destructive" : "outline"}
                    size="icon"
                    className={`rounded-full transition-all duration-300 ${isRecording ? "animate-pulse scale-110" : ""}`}
                    onClick={() => setIsRecording(!isRecording)}
                    title="Enregistrer un message vocal"
                >
                    <Mic className={`h-4 w-4 ${isRecording ? "fill-current" : ""}`} />
                </Button>

                {isRecording && (
                    <span className="text-xs text-destructive animate-pulse font-medium flex-1 pl-2">
                        Enregistrement...
                    </span>
                )}

                {!isRecording && <div className="flex-1" />}

                <Button
                    size="sm"
                    className="gap-2 bg-[#D4AF37] hover:bg-[#FCCA2E] text-black"
                    disabled={(!text.trim() && !isRecording) || isLoading}
                    onClick={handleSubmit}
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="h-3 w-3 animate-spin" />
                            Analyse...
                        </>
                    ) : (
                        <>
                            Valider <Send className="h-3 w-3" />
                        </>
                    )}
                </Button>
            </div>

            <p className="text-xs text-muted-foreground text-center">
                Notre IA analysera votre message pour mieux comprendre vos besoins
            </p>
        </div>
    );
}
