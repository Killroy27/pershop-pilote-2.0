"use client";

import { MatchingLoader } from "@/components/analysis/MatchingLoader";
import { ProcessSteps } from "@/components/analysis/ProcessSteps";
import { useAnalysis } from "@/contexts/AnalysisContext";
import { analyzeAndMatch } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProcessingPage() {
    const router = useRouter();
    const [step, setStep] = useState(0);
    const { analysisData, setResults } = useAnalysis();

    useEffect(() => {
        // Simulate step progression for UI
        const interval = setInterval(() => {
            setStep((prev) => {
                if (prev >= 5) {
                    clearInterval(interval);
                    return prev;
                }
                return prev + 1;
            });
        }, 1500); // 1.5s per step

        // Call backend API in parallel
        const callBackend = async () => {
            try {
                // Build analysis text from collected data
                const text = `
                    Mood: ${analysisData.mood || 'neutre'}
                    Objectif: ${analysisData.objective || 'découvrir mon style'}
                    Budget: ${analysisData.budget?.[0] || 800}€
                    Occasion: ${analysisData.occasion || 'quotidien'}
                    Styles préférés: ${analysisData.selectedStyles?.join(', ') || 'aucun'}
                    Marques préférées: ${analysisData.selectedBrands?.join(', ') || 'aucune'}
                    Description: ${analysisData.description || 'Pas de description'}
                `.trim();

                console.log("🚀 Calling backend API...");
                const response = await analyzeAndMatch(text);
                console.log("✅ Backend response:", response);
                console.log("📊 Shoppers found:", response?.shoppers_found?.length || 0);
                
                // Save to both context AND localStorage for persistence
                setResults(response);
                localStorage.setItem('pershop_analysis_results', JSON.stringify(response));
                console.log("💾 Results saved to localStorage");
            } catch (error) {
                console.error("❌ Erreur lors de l'analyse:", error);
            }
        };

        callBackend();

        return () => clearInterval(interval);
    }, [analysisData, setResults]);

    // Redirect when done
    useEffect(() => {
        if (step >= 5) {
            // Wait a small moment after last step finishes to redirect
            const timeout = setTimeout(() => {
                router.push("/client/match");
            }, 1000);
            return () => clearTimeout(timeout);
        }
    }, [step, router]);

    return (
        <div className="min-h-screen w-full bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background Glows for Ambience */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[100px] animate-pulse" />

            <div className="relative z-10 flex flex-col items-center gap-12 max-w-2xl w-full">
                <h1 className="text-2xl md:text-3xl font-serif text-center text-foreground/90">
                    PERSHOP PILOTE 2.0 matching engine.
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full">
                    <div className="flex justify-center">
                        <MatchingLoader />
                    </div>

                    <div className="flex justify-center md:justify-start">
                        <ProcessSteps currentStepIndex={step} />
                    </div>
                </div>
            </div>
        </div>
    );
}
