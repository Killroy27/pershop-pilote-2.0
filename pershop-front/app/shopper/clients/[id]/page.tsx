"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Heart, Palette, Zap, Target, MapPin, Brain, MessageSquare, CheckCircle, AlertTriangle, Loader2, ArrowLeft } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:9000";

export default function ClientDetailPage() {
    const params = useParams();
    const clientId = params.id;
    const [clientData, setClientData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClientBrief = async () => {
            try {
                const response = await fetch(`${API_URL}/api/shopper/clients/${clientId}`);
                if (!response.ok) throw new Error("Failed to fetch");
                const data = await response.json();
                setClientData(data);
                setLoading(false);
            } catch (err) {
                console.error("Error:", err);
                setLoading(false);
            }
        };
        fetchClientBrief();
    }, [clientId]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#FDFBF7] dark:bg-background flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-[#D4AF37]" />
            </div>
        );
    }

    if (!clientData) {
        return (
            <div className="min-h-screen bg-[#FDFBF7] dark:bg-background flex items-center justify-center">
                <p className="text-foreground">Client non trouvé</p>
            </div>
        );
    }

    const { mirror_analysis, chromatic_analysis, morpho_analysis, context_analysis, geo_analysis, recommendations } = clientData;

    return (
        <div className="min-h-screen bg-[#FDFBF7] dark:bg-background text-foreground pb-20 transition-colors duration-500">
            {/* Header */}
            <div className="border-b border-border bg-card">
                <div className="container mx-auto max-w-6xl px-6 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            <Link href="/shopper/clients" className="text-muted-foreground hover:text-foreground transition-colors">
                                <ArrowLeft className="h-5 w-5" />
                            </Link>
                            <img
                                src={clientData.client_photo || "https://i.pravatar.cc/150?u=client"}
                                alt={clientData.client_name}
                                className="w-16 h-16 rounded-full border-4 border-[#D4AF37]/30"
                            />
                            <div>
                                <p className="text-[#D4AF37] text-sm uppercase tracking-wider">Brief Client</p>
                                <h1 className="text-2xl font-serif font-bold">{clientData.client_name}</h1>
                                <p className="text-muted-foreground text-sm">{clientData.request_date}</p>
                            </div>
                        </div>
                        <Link href="/" className="font-serif text-xl font-bold text-[#D4AF37] hover:opacity-80 transition-opacity">
                            PERSHOP
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto max-w-6xl px-6 py-8 space-y-8">

                {/* Urgency Alert */}
                {context_analysis?.urgency_score > 70 && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 flex items-center gap-3">
                        <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
                        <div>
                            <p className="font-medium text-red-700 dark:text-red-400">Urgence élevée : {context_analysis.urgency_score}/100</p>
                            <p className="text-sm text-red-600 dark:text-red-300">Ce client a besoin d'aide rapidement. Priorisez cette demande.</p>
                        </div>
                    </div>
                )}

                {/* 6 Agent Analysis Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {/* 🎭 Mirror Agent */}
                    <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
                        <h3 className="flex items-center gap-2 font-medium mb-4 text-purple-600 dark:text-purple-400">
                            <Heart className="h-5 w-5" />
                            🎭 Mirror - Profil Émotionnel
                        </h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">État émotionnel</span>
                                <span className="font-medium">{mirror_analysis?.emotional_state}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Confiance</span>
                                <div className="flex items-center gap-2">
                                    <div className="w-20 bg-muted rounded-full h-2">
                                        <div
                                            className="bg-purple-500 h-2 rounded-full"
                                            style={{ width: `${mirror_analysis?.confidence_score || 0}%` }}
                                        />
                                    </div>
                                    <span>{mirror_analysis?.confidence_score}%</span>
                                </div>
                            </div>
                            <div className="pt-3 border-t border-border">
                                <p className="text-muted-foreground text-xs mb-2">Besoin caché :</p>
                                <p className="text-purple-600 dark:text-purple-400 italic">"{mirror_analysis?.hidden_needs}"</p>
                            </div>
                            <div className="pt-3">
                                <p className="text-muted-foreground text-xs mb-2">Blocages psychologiques :</p>
                                <ul className="space-y-1">
                                    {mirror_analysis?.psychological_blocks?.map((block: string, i: number) => (
                                        <li key={i} className="flex items-start gap-2 text-xs">
                                            <span className="text-amber-500">⚠</span> {block}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* 🎨 Chromatic Agent */}
                    <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
                        <h3 className="flex items-center gap-2 font-medium mb-4 text-orange-600 dark:text-orange-400">
                            <Palette className="h-5 w-5" />
                            🎨 Chromatic - Colorimétrie
                        </h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Sous-ton</span>
                                <span>{chromatic_analysis?.skin_undertone}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Saison</span>
                                <span className="font-medium text-orange-600 dark:text-orange-400">{chromatic_analysis?.season}</span>
                            </div>
                            <div className="pt-3 border-t border-border">
                                <p className="text-muted-foreground text-xs mb-2">Couleurs Power :</p>
                                <div className="flex flex-wrap gap-2">
                                    {chromatic_analysis?.power_colors?.map((color: string, i: number) => (
                                        <span key={i} className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded text-xs">{color}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="pt-3">
                                <p className="text-muted-foreground text-xs mb-2">À éviter :</p>
                                <div className="flex flex-wrap gap-2">
                                    {chromatic_analysis?.colors_to_avoid?.map((color: string, i: number) => (
                                        <span key={i} className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded text-xs">{color}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 🧬 Morpho Agent */}
                    <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
                        <h3 className="flex items-center gap-2 font-medium mb-4 text-blue-600 dark:text-blue-400">
                            <Zap className="h-5 w-5" />
                            🧬 Morpho - Silhouette
                        </h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Type silhouette</span>
                                <span className="font-medium text-blue-600 dark:text-blue-400">{morpho_analysis?.silhouette_type}</span>
                            </div>
                            <div className="pt-3 border-t border-border">
                                <p className="text-muted-foreground text-xs mb-2">À valoriser :</p>
                                <ul className="space-y-1">
                                    {morpho_analysis?.zones_valoriser?.map((zone: string, i: number) => (
                                        <li key={i} className="flex items-center gap-2 text-xs text-green-600 dark:text-green-400">
                                            <CheckCircle className="h-3 w-3" /> {zone}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="pt-3">
                                <p className="text-muted-foreground text-xs mb-2">Coupes recommandées :</p>
                                <ul className="space-y-1">
                                    {morpho_analysis?.best_cuts?.map((cut: string, i: number) => (
                                        <li key={i} className="text-xs">• {cut}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* 🎯 Context Agent */}
                    <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
                        <h3 className="flex items-center gap-2 font-medium mb-4 text-green-600 dark:text-green-400">
                            <Target className="h-5 w-5" />
                            🎯 Context - Situation
                        </h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Secteur</span>
                                <span>{context_analysis?.professional_context?.sector}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Niveau</span>
                                <span>{context_analysis?.professional_context?.level}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Pression perçue</span>
                                <span className={context_analysis?.perceived_pressure === "Élevée" ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"}>
                                    {context_analysis?.perceived_pressure}
                                </span>
                            </div>
                            <div className="pt-3 border-t border-border">
                                <p className="text-muted-foreground text-xs mb-2">Déclencheurs :</p>
                                <ul className="space-y-1">
                                    {context_analysis?.emotional_triggers?.map((t: string, i: number) => (
                                        <li key={i} className="text-xs text-amber-600 dark:text-amber-400">⚡ {t}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="pt-3 grid grid-cols-2 gap-2 text-xs">
                                <div className="bg-muted rounded p-2 text-center">
                                    <p className="text-muted-foreground">Budget déclaré</p>
                                    <p className="font-medium">{context_analysis?.budget_declared}€</p>
                                </div>
                                <div className="bg-green-100 dark:bg-green-900/30 rounded p-2 text-center">
                                    <p className="text-muted-foreground">Budget psycho</p>
                                    <p className="font-medium text-green-600 dark:text-green-400">{context_analysis?.budget_psychological}€</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 🗺 Geo Agent */}
                    <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
                        <h3 className="flex items-center gap-2 font-medium mb-4 text-cyan-600 dark:text-cyan-400">
                            <MapPin className="h-5 w-5" />
                            🗺 Geo-Sync - Logistique
                        </h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Localisation</span>
                                <span>{geo_analysis?.client_location}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Trajet max</span>
                                <span>{geo_analysis?.max_travel_time}</span>
                            </div>
                            <div className="pt-3 border-t border-border">
                                <p className="text-muted-foreground text-xs mb-2">Boutiques suggérées :</p>
                                <ul className="space-y-1">
                                    {geo_analysis?.nearby_boutiques?.map((b: string, i: number) => (
                                        <li key={i} className="text-xs">📍 {b}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="pt-3">
                                <p className="text-muted-foreground text-xs mb-2">Itinéraire shopping :</p>
                                <p className="text-cyan-600 dark:text-cyan-400 text-xs">{geo_analysis?.suggested_itinerary?.join(" → ")}</p>
                            </div>
                        </div>
                    </div>

                    {/* 🎼 Harmony - Recommendations */}
                    <div className="bg-[#D4AF37]/5 border border-[#D4AF37]/30 rounded-xl p-6 hover:shadow-lg transition-shadow">
                        <h3 className="flex items-center gap-2 font-medium mb-4 text-[#D4AF37]">
                            <Brain className="h-5 w-5" />
                            🎼 Harmony - Stratégie
                        </h3>
                        <div className="space-y-3 text-sm">
                            <div className="bg-[#D4AF37]/10 rounded-lg p-3">
                                <p className="text-muted-foreground text-xs mb-1">Stratégie recommandée :</p>
                                <p className="font-medium text-[#D4AF37]">{recommendations?.shopping_strategy}</p>
                            </div>
                            <div className="pt-3">
                                <p className="text-muted-foreground text-xs mb-2">Pièces clés :</p>
                                <ul className="space-y-1">
                                    {recommendations?.key_pieces?.map((piece: string, i: number) => (
                                        <li key={i} className="text-xs flex items-center gap-2">
                                            <CheckCircle className="h-3 w-3 text-green-500" /> {piece}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tips for the Shopper */}
                <div className="bg-card border border-border rounded-xl p-6">
                    <h3 className="flex items-center gap-2 font-medium mb-4">
                        <MessageSquare className="h-5 w-5 text-[#D4AF37]" />
                        Conseils d'approche pour cette cliente
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <p className="text-muted-foreground text-xs mb-3">Tips de communication :</p>
                            <ul className="space-y-2">
                                {recommendations?.approach_tips?.map((tip: string, i: number) => (
                                    <li key={i} className="flex items-start gap-2 text-sm">
                                        <span className="text-[#D4AF37]">→</span> {tip}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <p className="text-muted-foreground text-xs mb-3">Questions d'amorce :</p>
                            <ul className="space-y-2">
                                {recommendations?.conversation_starters?.map((q: string, i: number) => (
                                    <li key={i} className="text-sm italic text-muted-foreground">"{q}"</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
