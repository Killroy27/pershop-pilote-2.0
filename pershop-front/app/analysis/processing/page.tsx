"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MatchingLoader } from "@/components/analysis/MatchingLoader";
import { ProcessSteps } from "@/components/analysis/ProcessSteps";
import { Brain } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:9000";

export default function ProcessingPage() {
    const router = useRouter();
    const [step, setStep] = useState(0);
    const [analysisResult, setAnalysisResult] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    // Collect all analysis data and call AI
    useEffect(() => {
        const runAnalysis = async () => {
            try {
                // Collect data from all steps
                const step1 = JSON.parse(localStorage.getItem("pershop_step1") || "{}");
                const step2 = JSON.parse(localStorage.getItem("pershop_analysis_step2") || "{}");
                const step3 = JSON.parse(localStorage.getItem("pershop_step3") || "{}");

                // Build comprehensive user profile text for AI
                const userProfileText = buildUserProfileText(step1, step2, step3);
                console.log("📝 User Profile for AI:", userProfileText);

                // Step 1: Collecting data
                setStep(1);
                await delay(1000);

                // Step 2: Call AI for analysis
                setStep(2);
                const response = await fetch(`${API_URL}/api/analyze`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ text: userProfileText })
                });

                if (!response.ok) throw new Error("AI analysis failed");
                const aiResult = await response.json();
                console.log("🧠 AI Analysis Result:", aiResult);

                // Step 3: Processing results
                setStep(3);
                await delay(1000);

                // Step 4: Finding matches
                setStep(4);

                // Store AI results for match page
                localStorage.setItem("pershop_ai_analysis", JSON.stringify({
                    ...aiResult,
                    userProfile: { step1, step2, step3 }
                }));

                await delay(1000);

                // Step 5: Done
                setStep(5);

            } catch (err) {
                console.error("Analysis error:", err);
                setError("Erreur lors de l'analyse. Utilisation du mode standard.");
                // Still proceed to match page
                setStep(5);
            }
        };

        runAnalysis();
    }, []);

    // Redirect when done
    useEffect(() => {
        if (step >= 5) {
            const timeout = setTimeout(() => {
                router.push("/client/match");
            }, 1000);
            return () => clearTimeout(timeout);
        }
    }, [step, router]);

    return (
        <div className="min-h-screen w-full bg-[#FDFBF7] dark:bg-background text-foreground transition-colors duration-500">
            {/* Header Bar */}
            <div className="border-b border-border bg-card">
                <div className="container max-w-screen-xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Brain className="h-5 w-5 text-[#D4AF37] animate-pulse" />
                        <span className="text-sm text-muted-foreground">Analyse en cours...</span>
                    </div>

                    <Link href="/" className="font-serif text-xl font-bold text-[#D4AF37] hover:opacity-80 transition-opacity">
                        PERSHOP
                    </Link>
                </div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center p-8 min-h-[calc(100vh-65px)]">
                {/* Background Glows */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[100px] animate-pulse pointer-events-none" />

                <div className="relative z-10 flex flex-col items-center gap-12 max-w-2xl w-full">
                    <div className="bg-card border border-border rounded-xl p-8 text-center">
                        <h1 className="text-2xl md:text-3xl font-serif text-center mb-4">
                            {error ? "Analyse standard en cours..." : "🧠 IA Gemini en action..."}
                        </h1>

                        <p className="text-muted-foreground max-w-md mx-auto">
                            Nous analysons vos préférences pour trouver les Personal Shoppers parfaits pour vous
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full">
                        <div className="flex justify-center">
                            <div className="bg-card border border-border rounded-xl p-8">
                                <MatchingLoader />
                            </div>
                        </div>

                        <div className="flex justify-center md:justify-start">
                            <div className="bg-card border border-border rounded-xl p-6">
                                <ProcessSteps currentStepIndex={step} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function buildUserProfileText(step1: any, step2: any, step3: any): string {
    const parts: string[] = [];

    // Step 1 data
    if (step1.mood) {
        parts.push(`État émotionnel actuel : ${step1.mood}`);
    }
    if (step1.objectiveLabel) {
        parts.push(`Objectif principal : ${step1.objectiveLabel}`);
    }

    // Step 2 data (description + location)
    if (step2.location) {
        parts.push(`Localisation : ${step2.location}`);
    }
    if (step2.description) {
        parts.push(`Description personnelle : ${step2.description}`);
    }
    if (step2.hasPhoto) {
        parts.push(`Le client a fourni une photo pour l'analyse morphologique.`);
    }

    // Step 3 data
    if (step3.budget) {
        parts.push(`Budget : ${step3.budget}€`);
    }
    if (step3.occasion) {
        parts.push(`Occasion : ${step3.occasion}`);
    }
    if (step3.selectedStyles?.length > 0) {
        parts.push(`Styles préférés : ${step3.selectedStyles.join(", ")}`);
    }
    if (step3.selectedBrands?.length > 0) {
        parts.push(`Marques préférées : ${step3.selectedBrands.join(", ")}`);
    }

    return parts.length > 0
        ? parts.join("\n")
        : "Client cherchant un personal shopper pour améliorer son style.";
}

function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}
