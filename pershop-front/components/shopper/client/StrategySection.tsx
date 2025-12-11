"use client";

import { CheckCircle2, ChevronRight } from "lucide-react";

export function StrategySection() {
    return (
        <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-16">

            {/* Recommendations Column */}
            <div>
                <span className="text-[#D4AF37] text-xs font-bold tracking-[0.2em] uppercase mb-4 block">Strategic Advisor</span>
                <h2 className="font-serif text-4xl text-[#111111] mb-8">La Stratégie Gagnante</h2>

                <div className="space-y-8">
                    <div className="pl-6 border-l-2 border-[#D4AF37]">
                        <h3 className="font-bold text-lg text-[#111111] mb-2">Prouver la valeur</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Concentrez l&apos;argumentation sur la solidité du plan. Évitez l&apos;émotionnel pur, privilégiez le rationnel rassurant.
                        </p>
                    </div>

                    <div className="pl-6 border-l-2 border-gray-200 hover:border-[#D4AF37] transition-colors duration-300">
                        <h3 className="font-bold text-lg text-[#111111] mb-2">Anticiper les objections</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Question clé à préparer : "Quels sont les points spécifiques qui suscitent le plus d&apos;inquiétude ?"
                        </p>
                    </div>

                    <div className="pl-6 border-l-2 border-gray-200 hover:border-[#D4AF37] transition-colors duration-300">
                        <h3 className="font-bold text-lg text-[#111111] mb-2">Data-Driven</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Préparez des données chiffrées et des études de cas pertinentes pour étayer les arguments.
                        </p>
                    </div>
                </div>
            </div>

            {/* Actions / "Next Steps" Column */}
            <div className="bg-[#111111] text-white p-10 md:p-12 self-start relative overflow-hidden rounded-xl shadow-lg">
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#D4AF37] rounded-full blur-[80px] opacity-20"></div>

                <h3 className="font-serif text-2xl mb-8 relative z-10">Actions Recommandées</h3>

                <div className="space-y-4 relative z-10">
                    <button className="w-full group flex items-center justify-between bg-white text-[#111111] p-4 rounded-lg hover:bg-[#D4AF37] transition-all duration-300 shadow-sm">
                        <span className="font-medium">Planifier Réunion d&apos;Alignement</span>
                        <ChevronRight className="h-4 w-4 text-[#D4AF37] group-hover:text-[#111111]" />
                    </button>

                    <button className="w-full group flex items-center justify-between border border-white/20 p-4 rounded-lg hover:bg-white/10 transition-all duration-300">
                        <span className="font-medium">Générer Proposition sur Mesure</span>
                        <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                </div>

                <div className="mt-12 pt-8 border-t border-white/10 text-sm text-gray-500 font-light">
                    Analyse générée par PERSHOP AI Pilot v2.0
                </div>
            </div>

        </section>
    );
}
