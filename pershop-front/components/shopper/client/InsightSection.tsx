"use client";

import { Zap, Smile, Target, Clock, AlertCircle } from "lucide-react";

export function InsightSection() {
    return (
        <section className="bg-white relative -mt-16 mx-6 md:mx-auto max-w-7xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] border-t-4 border-[#D4AF37] rounded-xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-12">

                {/* Emotional Core (Left) */}
                <div className="md:col-span-5 bg-[#FDFBF7] p-10 md:p-12 border-r border-[#D4AF37]/10">
                    <h2 className="font-serif text-3xl text-[#111111] mb-8">L&apos;État d&apos;Esprit</h2>

                    <div className="flex items-center gap-6 mb-10">
                        <div className="relative">
                            <span className="text-6xl font-serif font-bold text-[#111111] block">67<span className="text-3xl text-[#D4AF37]">%</span></span>
                            <span className="text-xs uppercase tracking-widest text-gray-500 mt-1 block">Confiance</span>
                        </div>
                        <div className="h-12 w-px bg-gray-200" />
                        <div>
                            <p className="text-lg font-medium text-[#111111] leading-tight">Motivée mais<br />appréhensive</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="flex gap-4 group">
                            <div className="mt-1 p-2 bg-white shadow-sm rounded-full text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-white transition-colors">
                                <Target className="h-5 w-5" />
                            </div>
                            <div>
                                <h4 className="font-bold text-[#111111] uppercase text-xs tracking-widest mb-1">Objectif Principal</h4>
                                <p className="text-gray-600 font-serif leading-relaxed">Se sentir légitime et puissante pour son événement professionnel.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Context Intelligence (Right) */}
                <div className="md:col-span-7 p-10 md:p-12 bg-white">
                    <h2 className="font-serif text-3xl text-[#111111] mb-8">Le Contexte</h2>

                    <div className="mb-10">
                        <p className="text-xl text-gray-600 leading-relaxed font-light">
                            <strong className="text-[#111111] font-medium">Situation critique.</strong> Le lancement imminent et la présentation au comité définissent une pression maximale (8/10). Le client a besoin de solidité et de réassurance factuelle.
                        </p>
                    </div>

                    {/* Timeline Minimalist */}
                    <div className="relative pt-4 pb-2">
                        <div className="absolute top-6 left-0 right-0 h-px bg-gray-200" />
                        <div className="flex justify-between relative">
                            <div className="text-center group cursor-pointer">
                                <div className="w-3 h-3 bg-[#111111] rounded-full mx-auto mb-3 ring-4 ring-white group-hover:scale-125 transition-transform" />
                                <span className="block text-xs font-bold text-[#111111] mb-1">AUJOURD&apos;HUI</span>
                                <span className="text-xs text-gray-400">Brief</span>
                            </div>
                            <div className="text-center group cursor-pointer">
                                <div className="w-3 h-3 bg-[#D4AF37] rounded-full mx-auto mb-3 ring-4 ring-white group-hover:scale-125 transition-transform animate-pulse" />
                                <span className="block text-xs font-bold text-[#D4AF37] mb-1">J-3</span>
                                <span className="text-xs text-[#D4AF37]">Comité</span>
                            </div>
                            <div className="text-center group cursor-pointer">
                                <div className="w-3 h-3 bg-gray-300 rounded-full mx-auto mb-3 ring-4 ring-white group-hover:scale-125 transition-transform" />
                                <span className="block text-xs font-bold text-gray-400 mb-1">J+7</span>
                                <span className="text-xs text-gray-400">Lancement</span>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
}
