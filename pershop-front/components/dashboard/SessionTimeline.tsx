"use client";

import { MapPin, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const historyData = [
    {
        date: "16 marcs 2023 | 14:00",
        shopper: "Sophie Laurent",
        location: "Galeries Lafayette",
        details: "Achat: 3 articles, 450€",
        rating: "5/5 étoiles",
        img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100&auto=format&fit=crop"
    },
    {
        date: "20 marcs 2023 | 14:00",
        shopper: "Sophie Laurent",
        location: "Galeries Lafayette",
        details: "Séance stylisme: 2h, 5 tenues",
        tag: "Très satisfaite",
        img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100&auto=format&fit=crop"
    },
    {
        date: "13 marcs 2023 | 14:00",
        shopper: "Sophie Laurent",
        location: "Galeries Lafayette",
        details: "Séance stylisme: 2h, 5 tenues",
        tag: "Très satisfaite",
        img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100&auto=format&fit=crop"
    }
];

export function SessionTimeline() {
    return (
        <div className="space-y-6 relative pl-4">
            {/* Vertical Line */}
            <div className="absolute left-[23px] top-6 bottom-6 w-[2px] bg-[#D4AF37]/30" />

            {historyData.map((session, idx) => (
                <div key={idx} className="relative flex items-start gap-6 group">
                    {/* Dot */}
                    <div className="absolute left-[18px] top-8 h-3 w-3 rounded-full bg-[#D4AF37] border-2 border-background ring-4 ring-background z-10" />

                    <div className="flex-1 bg-white dark:bg-card rounded-2xl p-5 border border-border/50 shadow-sm hover:shadow-md transition-shadow ml-6">
                        <p className="text-sm font-medium text-muted-foreground mb-3">{session.date}</p>

                        <div className="flex items-start gap-4 mb-4">
                            <img src={session.img} alt={session.shopper} className="h-12 w-12 rounded-full object-cover" />
                            <div>
                                <p className="font-bold text-foreground">Personal Shopper</p>
                                <p className="text-lg font-serif font-bold text-foreground">{session.shopper}</p>
                                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                                    <MapPin className="h-3 w-3" /> {session.location}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-border/40">
                            <span className="text-sm font-medium">{session.details}</span>
                            {session.rating && (
                                <Badge variant="secondary" className="bg-[#D4AF37]/10 text-black dark:text-[#D4AF37] hover:bg-[#D4AF37]/20 border-0 flex gap-1">
                                    <Star className="h-3 w-3 fill-[#D4AF37] text-[#D4AF37]" /> {session.rating}
                                </Badge>
                            )}
                            {session.tag && (
                                <Badge variant="secondary" className="bg-green-500/10 text-green-700 dark:text-green-400 border-0">
                                    {session.tag}
                                </Badge>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
