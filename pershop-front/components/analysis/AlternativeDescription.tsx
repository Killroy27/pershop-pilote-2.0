"use client";

import { useState } from "react";
import { Mic, Send, X, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function AlternativeDescription() {
    const [isOpen, setIsOpen] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [text, setText] = useState("");

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
                    <MessageSquare className="h-4 w-4" /> Décrivez votre style
                </span>
                <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="h-6 w-6 p-0 rounded-full hover:bg-destructive/10 hover:text-destructive">
                    <X className="h-3 w-3" />
                </Button>
            </div>

            <Textarea
                placeholder="Je suis plutôt grand(e), j'aime les couleurs vives..."
                className="min-h-[100px] resize-none bg-background/80"
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

                <Button size="sm" className="gap-2" disabled={!text && !isRecording}>
                    Valider <Send className="h-3 w-3" />
                </Button>
            </div>
        </div>
    );
}
