"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MoodWheel } from "@/components/analysis/MoodWheel";
import { ObjectiveCard } from "@/components/analysis/ObjectiveCard";
import { Shirt, Calendar, Search, TrendingUp, ChevronLeft } from "lucide-react";
import Link from "next/link";

const objectives = [
    { id: "wardrobe", label: "Renouveler ma garde-robe", icon: Shirt },
    { id: "event", label: "Événement spécial", icon: Calendar },
    { id: "style", label: "Découvrir mon style", icon: Search },
    { id: "budget", label: "Optimiser mon budget", icon: TrendingUp },
];

export default function AnalysisStep1Page() {
    const router = useRouter();
    const [mood, setMood] = useState<string | null>(null);
    const [objective, setObjective] = useState<string | null>(null);

    const canProceed = mood && objective;

    return (
        <div className="container max-w-screen-lg mx-auto py-8 px-4 flex flex-col min-h-screen">

            {/* Header / Nav */}
            <div className="flex items-center justify-between mb-8">
                <Link href="/" className="text-muted-foreground hover:text-white transition-colors">
                    <ChevronLeft className="h-6 w-6" />
                </Link>
                <span className="text-[#D4AF37] text-sm font-medium tracking-widest uppercase">1 / 3</span>
                <div className="w-6" /> {/* Spacer */}
            </div>

            <div className="flex-1 flex flex-col items-center justify-center space-y-12">

                {/* MOOD SECTION */}
                <div className="space-y-8 w-full text-center">
                    <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#F3F1EC]">
                        Comment vous sentez-vous aujourd&apos;hui ?
                    </h1>

                    <MoodWheel
                        selectedEmotion={mood}
                        onSelect={setMood}
                    />
                </div>

                {/* OBJECTIVE SECTION */}
                <div className="w-full max-w-4xl space-y-8 animate-in slide-in-from-bottom-10 fade-in duration-700 delay-300">
                    <h2 className="font-serif text-2xl md:text-3xl text-center text-[#F3F1EC]/80">
                        Quel est votre objectif aujourd&apos;hui ?
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {objectives.map((obj) => (
                            <ObjectiveCard
                                key={obj.id}
                                {...obj}
                                selected={objective === obj.id}
                                onSelect={setObjective}
                            />
                        ))}
                    </div>


                </div>

            </div>

            {/* Footer Action */}
            <div className="pt-12 pb-8 flex justify-center">
                <Button
                    disabled={!canProceed}
                    className="bg-[#D4AF37] text-black hover:bg-[#FCCA2E] text-lg px-12 py-6 rounded-full font-medium transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_40px_rgba(212,175,55,0.5)]"
                    onClick={() => router.push('/analysis/step2')}
                >
                    Continuer
                </Button>
            </div>

        </div>
    );
}
