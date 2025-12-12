"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShopperCard } from "@/components/match/ShopperCard";
import { Loader2, Sparkles, Brain, Heart, Palette, MapPin, Target, Zap, ChevronDown, ChevronUp, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:9000";

export default function MatchResultsPage() {
    const router = useRouter();
    const [shoppers, setShoppers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [fullAnalysis, setFullAnalysis] = useState<any>(null);
    const [showFullReport, setShowFullReport] = useState(false);

    useEffect(() => {
        const runFullAnalysis = async () => {
            try {
                // Collect data from all steps
                const step1 = JSON.parse(localStorage.getItem("pershop_step1") || "{}");
                const step2 = JSON.parse(localStorage.getItem("pershop_analysis_step2") || "{}");
                const step3 = JSON.parse(localStorage.getItem("pershop_step3") || "{}");

                console.log("📊 Running full 6-agent analysis...");

                // Call the comprehensive analysis endpoint
                const response = await fetch(`${API_URL}/api/full-analysis`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        user_profile: { step1, step2, step3 }
                    })
                });

                if (!response.ok) throw new Error("Analysis failed");

                const result = await response.json();
                console.log("🧠 Full Analysis Result:", result);

                setFullAnalysis(result);
                setShoppers(result.matched_shoppers || []);
                setLoading(false);

            } catch (err) {
                console.error("Analysis error:", err);
                setError("Erreur lors de l'analyse. Réessayez.");
                setLoading(false);
            }
        };

        runFullAnalysis();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#FDFBF7] dark:bg-background flex items-center justify-center">
                <div className="text-center bg-card border border-border rounded-xl p-12">
                    <div className="relative">
                        <Loader2 className="h-16 w-16 animate-spin text-[#D4AF37] mx-auto mb-4" />
                        <Brain className="h-8 w-8 text-[#D4AF37] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                    </div>
                    <p className="text-lg font-medium mb-2">Analyse IA en cours...</p>
                    <p className="text-muted-foreground text-sm">6 agents analysent votre profil</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#FDFBF7] dark:bg-background flex items-center justify-center">
                <div className="text-center max-w-md p-8 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800">
                    <p className="text-red-600 dark:text-red-400 font-medium mb-4">{error}</p>
                    <Button onClick={() => router.push("/analysis/step1")}>
                        Recommencer l'analyse
                    </Button>
                </div>
            </div>
        );
    }

    const agents = fullAnalysis?.agents || {};

    return (
        <div className="min-h-screen bg-[#FDFBF7] dark:bg-background text-foreground pb-20 transition-colors duration-500">
            {/* Header Bar */}
            <div className="border-b border-border bg-card">
                <div className="container max-w-screen-xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/analysis/step3" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                        <ArrowLeft className="h-5 w-5" />
                        <span className="text-sm">Retour</span>
                    </Link>

                    <div className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-[#D4AF37]" />
                        <span className="text-sm text-[#D4AF37] uppercase tracking-wider font-medium">
                            Analyse complète • 6 agents
                        </span>
                    </div>

                    <Link href="/" className="font-serif text-xl font-bold text-[#D4AF37] hover:opacity-80 transition-opacity">
                        PERSHOP
                    </Link>
                </div>
            </div>

            <div className="container mx-auto px-6 py-8 max-w-7xl">

                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">
                        Votre <span className="text-[#D4AF37]">Rapport Personnalisé</span>
                    </h1>
                    <p className="text-muted-foreground">Résultats de l'analyse IA multi-agents</p>
                </div>

                {/* AI Report Summary Cards */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                    {/* Mirror */}
                    <div className="bg-card border border-border rounded-xl p-4 hover:shadow-lg transition-shadow">
                        <Heart className="h-5 w-5 text-purple-500 mb-2" />
                        <p className="text-xs text-muted-foreground">Mirror</p>
                        <p className="text-lg font-bold">{agents.mirror?.confidence_score || 50}/100</p>
                        <p className="text-xs text-purple-500">Confiance</p>
                    </div>

                    {/* Chromatic */}
                    <div className="bg-card border border-border rounded-xl p-4 hover:shadow-lg transition-shadow">
                        <Palette className="h-5 w-5 text-orange-500 mb-2" />
                        <p className="text-xs text-muted-foreground">Chromatic</p>
                        <p className="text-lg font-bold">{agents.chromatic?.season || "—"}</p>
                        <p className="text-xs text-orange-500">Saison</p>
                    </div>

                    {/* Morpho */}
                    <div className="bg-card border border-border rounded-xl p-4 hover:shadow-lg transition-shadow">
                        <Zap className="h-5 w-5 text-blue-500 mb-2" />
                        <p className="text-xs text-muted-foreground">Morpho</p>
                        <p className="text-lg font-bold text-sm">{agents.morpho?.silhouette_type?.split(" ")[0] || "—"}</p>
                        <p className="text-xs text-blue-500">Silhouette</p>
                    </div>

                    {/* Context */}
                    <div className="bg-card border border-border rounded-xl p-4 hover:shadow-lg transition-shadow">
                        <Target className="h-5 w-5 text-green-500 mb-2" />
                        <p className="text-xs text-muted-foreground">Context</p>
                        <p className="text-lg font-bold">{agents.context?.urgency_score || 50}/100</p>
                        <p className="text-xs text-green-500">Urgence</p>
                    </div>

                    {/* Geo */}
                    <div className="bg-card border border-border rounded-xl p-4 hover:shadow-lg transition-shadow">
                        <MapPin className="h-5 w-5 text-cyan-500 mb-2" />
                        <p className="text-xs text-muted-foreground">Geo-Sync</p>
                        <p className="text-lg font-bold text-xs">{agents.geo?.client_location || "—"}</p>
                        <p className="text-xs text-cyan-500">Zone</p>
                    </div>

                    {/* Harmony */}
                    <div className="bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-xl p-4 hover:shadow-lg transition-shadow">
                        <Brain className="h-5 w-5 text-[#D4AF37] mb-2" />
                        <p className="text-xs text-muted-foreground">Harmony</p>
                        <p className="text-lg font-bold">{shoppers.length}</p>
                        <p className="text-xs text-[#D4AF37]">Matches</p>
                    </div>
                </div>

                {/* Detailed Analysis Section */}
                <div className="mb-12">
                    <button
                        onClick={() => setShowFullReport(!showFullReport)}
                        className="w-full flex items-center justify-between p-4 bg-card border border-border hover:border-[#D4AF37]/30 rounded-xl transition-colors"
                    >
                        <span className="font-medium flex items-center gap-2">
                            <Brain className="h-5 w-5 text-[#D4AF37]" />
                            Voir le rapport détaillé
                        </span>
                        {showFullReport ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                    </button>

                    {showFullReport && (
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-top-4 duration-300">

                            {/* Mirror Agent */}
                            <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
                                <h3 className="font-medium flex items-center gap-2 mb-4">
                                    <Heart className="h-5 w-5 text-purple-500" />
                                    🎭 Agent Mirror - Analyse Émotionnelle
                                </h3>
                                <div className="space-y-3 text-sm">
                                    <p><span className="text-muted-foreground">État :</span> {agents.mirror?.emotional_state}</p>
                                    <p><span className="text-muted-foreground">Confiance :</span> {agents.mirror?.confidence_score}/100</p>
                                    <p><span className="text-muted-foreground">Besoin caché :</span> {agents.mirror?.hidden_needs}</p>
                                    <div>
                                        <span className="text-muted-foreground">Événements détectés :</span>
                                        <ul className="mt-1 ml-4 list-disc">
                                            {agents.mirror?.detected_life_events?.map((e: string, i: number) => (
                                                <li key={i}>{e}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">Blocages :</span>
                                        <ul className="mt-1 ml-4 list-disc">
                                            {agents.mirror?.psychological_blocks?.map((b: string, i: number) => (
                                                <li key={i}>{b}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Chromatic Agent */}
                            <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
                                <h3 className="font-medium flex items-center gap-2 mb-4">
                                    <Palette className="h-5 w-5 text-orange-500" />
                                    🎨 Agent Chromatic - Colorimétrie
                                </h3>
                                <div className="space-y-3 text-sm">
                                    <p><span className="text-muted-foreground">Saison :</span> {agents.chromatic?.season}</p>
                                    <div>
                                        <span className="text-muted-foreground">Couleurs Power :</span>
                                        <div className="flex gap-2 mt-2 flex-wrap">
                                            {agents.chromatic?.power_colors?.map((c: string, i: number) => (
                                                <span key={i} className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded text-xs">{c}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">Couleurs Challenge :</span>
                                        <div className="flex gap-2 mt-2 flex-wrap">
                                            {agents.chromatic?.challenge_colors?.map((c: string, i: number) => (
                                                <span key={i} className="px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 rounded text-xs">{c}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Context Agent */}
                            <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
                                <h3 className="font-medium flex items-center gap-2 mb-4">
                                    <Target className="h-5 w-5 text-green-500" />
                                    🎯 Agent Context - Analyse Situationnelle
                                </h3>
                                <div className="space-y-3 text-sm">
                                    <p><span className="text-muted-foreground">Urgence :</span> <span className={`font-bold ${agents.context?.urgency_score > 70 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>{agents.context?.urgency_level}</span></p>
                                    <p><span className="text-muted-foreground">Score urgence :</span> {agents.context?.urgency_score}/100</p>
                                    <p><span className="text-muted-foreground">Occasion :</span> {agents.context?.occasion}</p>
                                    <p><span className="text-muted-foreground">Budget déclaré :</span> {agents.context?.budget_declared}€</p>
                                    <p><span className="text-muted-foreground">Budget psychologique :</span> {agents.context?.budget_psychological}€</p>
                                </div>
                            </div>

                            {/* Geo Agent */}
                            <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
                                <h3 className="font-medium flex items-center gap-2 mb-4">
                                    <MapPin className="h-5 w-5 text-cyan-500" />
                                    🗺 Agent Geo-Sync - Logistique
                                </h3>
                                <div className="space-y-3 text-sm">
                                    <p><span className="text-muted-foreground">Localisation :</span> {agents.geo?.client_location}</p>
                                    <p><span className="text-muted-foreground">Rayon de recherche :</span> {agents.geo?.search_radius}</p>
                                    <p><span className="text-muted-foreground">Tolérance trajet :</span> {agents.geo?.travel_tolerance}</p>
                                    <div>
                                        <span className="text-muted-foreground">Zones proches :</span>
                                        <div className="flex gap-2 mt-2 flex-wrap">
                                            {agents.geo?.nearby_areas?.map((a: string, i: number) => (
                                                <span key={i} className="px-2 py-1 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400 rounded text-xs">{a}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Matched Shoppers */}
                <div className="mb-8">
                    <h2 className="text-2xl font-serif mb-6 flex items-center gap-3">
                        <Sparkles className="h-6 w-6 text-[#D4AF37]" />
                        Vos Personal Shoppers Recommandés
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {shoppers.slice(0, 3).map((shopper, index) => (
                            <div key={shopper.id} className="relative">
                                {index === 0 && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#D4AF37] text-black text-xs font-medium rounded-full z-10">
                                        ⭐ Match {shopper.match_score}%
                                    </div>
                                )}
                                <div className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                                    <ShopperCard
                                        name={shopper.name}
                                        title="Personal Shopper Elite"
                                        description={shopper.bio || "Expert en style personnalisé"}
                                        imageUrl={shopper.avatar_url}
                                        tags={shopper.specialties?.slice(0, 3) || []}
                                        onClick={() => router.push(`/client/shopper/${shopper.id}`)}
                                    />

                                    {/* Match Details */}
                                    {shopper.match_details && (
                                        <div className="px-4 pb-4 pt-2 border-t border-border bg-muted/20">
                                            <p className="text-xs text-muted-foreground mb-2">Détails du match :</p>
                                            <div className="grid grid-cols-2 gap-1 text-xs">
                                                <span>Émotionnel: {shopper.match_details.emotional_fit}%</span>
                                                <span>Spécialités: {shopper.match_details.specialty_match}%</span>
                                                <span>Contexte: {shopper.match_details.context_alignment}%</span>
                                                <span>Proximité: {shopper.match_details.convenience}%</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
