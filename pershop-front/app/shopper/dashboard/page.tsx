"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { apiClient } from "@/lib/api-client";
import { Loader2, TrendingUp, Users, Star, Euro, Calendar, Clock, ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ShopperDashboardPage() {
    const [dashboardData, setDashboardData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await apiClient.getShopperDashboard();
                setDashboardData(data);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch dashboard:", err);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#FDFBF7] dark:bg-background flex items-center justify-center">
                <Loader2 className="h-12 w-12 animate-spin text-[#D4AF37]" />
            </div>
        );
    }

    const kpis = dashboardData?.kpis || { new_matchings: 12, satisfaction_rate: 4.8, revenue: "3,200€" };
    const matchings = dashboardData?.recent_matchings || [];
    const agenda = dashboardData?.agenda || [];

    return (
        <div className="min-h-screen bg-[#FDFBF7] dark:bg-background text-foreground pb-20 transition-colors duration-500">
            {/* Header */}
            <div className="border-b border-border bg-card">
                <div className="container max-w-screen-xl mx-auto px-6 py-6 flex items-center justify-between">
                    <div>
                        <p className="text-muted-foreground text-sm">Bienvenue,</p>
                        <h1 className="text-2xl font-serif font-bold">Sophie Laurent</h1>
                    </div>
                    <Link href="/" className="font-serif text-xl font-bold text-[#D4AF37] hover:opacity-80 transition-opacity">
                        PERSHOP
                    </Link>
                </div>
            </div>

            <div className="container max-w-screen-xl mx-auto px-6 py-8">

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-muted-foreground text-sm">Nouveaux matchings</span>
                            <Users className="h-5 w-5 text-[#D4AF37]" />
                        </div>
                        <p className="text-3xl font-bold">{kpis.new_matchings}</p>
                        <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                            <TrendingUp className="h-3 w-3" /> +23% ce mois
                        </p>
                    </div>

                    <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-muted-foreground text-sm">Satisfaction</span>
                            <Star className="h-5 w-5 text-[#D4AF37]" />
                        </div>
                        <p className="text-3xl font-bold">{kpis.satisfaction_rate}/5</p>
                        <div className="flex gap-1 mt-1">
                            {[1, 2, 3, 4, 5].map(i => (
                                <Star key={i} className={`h-3 w-3 ${i <= Math.floor(kpis.satisfaction_rate) ? 'fill-[#D4AF37] text-[#D4AF37]' : 'text-muted'}`} />
                            ))}
                        </div>
                    </div>

                    <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-muted-foreground text-sm">Revenus du mois</span>
                            <Euro className="h-5 w-5 text-[#D4AF37]" />
                        </div>
                        <p className="text-3xl font-bold">{kpis.revenue}</p>
                        <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                            <TrendingUp className="h-3 w-3" /> +15% vs mois dernier
                        </p>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Recent Matchings - 2/3 */}
                    <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="font-serif text-xl font-medium">Derniers matchings</h2>
                            <Link href="/shopper/clients" className="text-[#D4AF37] text-sm hover:underline flex items-center gap-1">
                                Voir tous <ArrowRight className="h-3 w-3" />
                            </Link>
                        </div>
                        <div className="space-y-4">
                            {matchings.map((match: any, i: number) => (
                                <Link
                                    key={match.id || i}
                                    href={`/shopper/clients/${match.id || i + 1}`}
                                    className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors group"
                                >
                                    <img
                                        src={`https://i.pravatar.cc/100?u=client${match.id || i}`}
                                        alt={match.client_name}
                                        className="w-12 h-12 rounded-full object-cover border-2 border-transparent group-hover:border-[#D4AF37] transition-colors"
                                    />
                                    <div className="flex-1">
                                        <p className="font-medium">{match.client_name}</p>
                                        <p className="text-sm text-muted-foreground">{match.need}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-muted-foreground">{match.date}</p>
                                        <span className={`text-xs px-2 py-0.5 rounded ${match.status === "confirmed"
                                                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                                : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                                            }`}>
                                            {match.status === "confirmed" ? "Confirmé" : "En attente"}
                                        </span>
                                    </div>
                                    <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-[#D4AF37] transition-colors" />
                                </Link>
                            ))}

                            {matchings.length === 0 && (
                                <p className="text-center text-muted-foreground py-8">Aucun matching récent</p>
                            )}
                        </div>
                    </div>

                    {/* Agenda - 1/3 */}
                    <div className="bg-card border border-border rounded-xl p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="font-serif text-xl font-medium">Agenda du jour</h2>
                            <Calendar className="h-5 w-5 text-[#D4AF37]" />
                        </div>
                        <div className="space-y-4">
                            {agenda.map((event: any, i: number) => (
                                <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                                    <div className="bg-[#D4AF37]/10 rounded-lg p-2">
                                        <Clock className="h-4 w-4 text-[#D4AF37]" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-sm">{event.time}</p>
                                        <p className="text-sm text-muted-foreground">{event.event}</p>
                                    </div>
                                </div>
                            ))}

                            {agenda.length === 0 && (
                                <p className="text-center text-muted-foreground py-8">Aucun événement</p>
                            )}
                        </div>

                        <Button
                            variant="outline"
                            className="w-full mt-6 border-[#D4AF37]/30 hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]"
                        >
                            <Calendar className="h-4 w-4 mr-2" />
                            Gérer l'agenda
                        </Button>
                    </div>

                </div>

                {/* Quick Actions */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Link href="/shopper/clients" className="block">
                        <Button variant="outline" className="w-full h-14 justify-start border-border hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/5">
                            <Users className="h-5 w-5 mr-3 text-[#D4AF37]" />
                            Voir tous mes clients
                        </Button>
                    </Link>
                    <Button variant="outline" className="h-14 justify-start border-border hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/5">
                        <Star className="h-5 w-5 mr-3 text-[#D4AF37]" />
                        Mes avis clients
                    </Button>
                    <Button variant="outline" className="h-14 justify-start border-border hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/5">
                        <Euro className="h-5 w-5 mr-3 text-[#D4AF37]" />
                        Mes revenus
                    </Button>
                </div>
            </div>
        </div>
    );
}
