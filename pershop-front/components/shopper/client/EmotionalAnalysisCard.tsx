"use client";

import { Zap, Smile, Target } from "lucide-react";

export function EmotionalAnalysisCard() {
    return (
        <div className="bg-white p-8 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100">
            <h2 className="text-[#D4AF37] font-bold text-lg mb-8 flex items-center gap-2 font-serif">
                Analyse Émotionnelle (Agent Mirror)
            </h2>

            <div className="flex flex-col md:flex-row items-center gap-12">
                {/* Circular Progress Mock */}
                <div className="relative h-40 w-40 shrink-0">
                    <svg className="h-full w-full" viewBox="0 0 100 100">
                        <circle
                            className="text-gray-200 stroke-current"
                            strokeWidth="8"
                            cx="50"
                            cy="50"
                            r="40"
                            fill="transparent"
                        ></circle>
                        <circle
                            className="text-[#D4AF37] progress-ring__circle stroke-current"
                            strokeWidth="8"
                            strokeLinecap="round"
                            cx="50"
                            cy="50"
                            r="40"
                            fill="transparent"
                            strokeDasharray="251.2"
                            strokeDashoffset="82.9" // ~67% 
                            transform="rotate(-90 50 50)"
                        ></circle>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-[#111111]">
                        <span className="text-4xl font-serif font-bold">67%</span>
                        <span className="text-xs font-medium uppercase tracking-wider mt-1">Confiance<br />Actuelle</span>
                    </div>
                </div>

                {/* Insights List */}
                <div className="space-y-6 flex-1">
                    <div className="flex items-start gap-3">
                        <div className="mt-1"><Zap className="h-5 w-5 text-[#D4AF37]" /></div>
                        <div>
                            <span className="font-bold text-[#111111]">Objectif:</span>
                            <span className="text-gray-700 ml-2">Événement professionnel important</span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <div className="mt-1"><Smile className="h-5 w-5 text-[#D4AF37]" /></div>
                        <div>
                            <span className="font-bold text-[#111111]">État émotionnel:</span>
                            <span className="text-gray-700 ml-2">Motivée mais légère appréhension</span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <div className="mt-1"><Target className="h-5 w-5 text-red-700" /></div> {/* Using red target icon for variety or standard gold */}
                        <div>
                            <span className="font-bold text-[#111111]">Attente principale:</span>
                            <span className="text-gray-700 ml-2">Se sentir légitime et puissante</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
