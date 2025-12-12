"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut, Shield, Star, User, UserCheck } from "lucide-react";
import Link from "next/link";
import { PsychologyChart } from "./PsychologyChart";

export function LandingHero() {
    const { user, logout } = useAuth();

    return (
        <div className="min-h-screen w-full bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground overflow-hidden relative">

            {/* Texture Overlay */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>

            {/* Top Navigation */}
            <nav className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 md:px-12">
                <div className="font-serif text-2xl font-bold tracking-widest text-[#D4AF37]">
                    PERSHOP
                </div>
                <div className="flex items-center gap-4">
                    {user ? (
                        <>
                            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20">
                                <User className="h-4 w-4 text-[#D4AF37]" />
                                <span className="text-sm font-medium text-[#D4AF37]">{user.full_name}</span>
                            </div>
                            <Button
                                variant="ghost"
                                onClick={logout}
                                className="text-muted-foreground hover:text-[#D4AF37] hover:bg-transparent text-sm font-medium tracking-wide gap-2"
                            >
                                <LogOut className="h-4 w-4" />
                                DÉCONNEXION
                            </Button>
                        </>
                    ) : (
                        <>
                            <Link href="/auth/login">
                                <Button variant="ghost" className="text-muted-foreground hover:text-[#D4AF37] hover:bg-transparent text-sm font-medium tracking-wide">
                                    CONNEXION
                                </Button>
                            </Link>
                            <Link href="/auth/signup">
                                <Button className="bg-[#D4AF37] text-white hover:bg-[#b5952f] rounded-full px-6 text-xs font-bold tracking-widest shadow-md transition-all hover:scale-105">
                                    INSCRIPTION
                                </Button>
                            </Link>
                        </>
                    )}
                </div>
            </nav>

            {/* Main Content Container */}
            <div className="container relative z-10 flex flex-col items-center justify-center min-h-screen px-4 mx-auto max-w-screen-xl">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">

                    {/* Left Column: Text & CTA */}
                    <div className="space-y-8 text-center lg:text-left animate-in px-4 slide-in-from-left-10 duration-700">
                        <div className="space-y-4">
                            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-[1.1]">
                                Trouvez Votre <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FCCA2E] to-[#D4AF37]">
                                    Personal Shopper
                                </span>{" "}
                                Idéal
                            </h1>

                            <p className="text-lg md:text-xl text-[#F3F1EC]/60 font-light tracking-wide max-w-lg mx-auto lg:mx-0">
                                Intelligence Émotionnelle × Matching Premium
                            </p>
                        </div>

                        <div className="pt-4">
                            <Link href="/analysis/step1">
                                <Button
                                    size="lg"
                                    className="bg-transparent border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black h-14 px-8 text-lg rounded-full transition-all duration-500 shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_40px_rgba(212,175,55,0.4)]"
                                >
                                    Commencer Mon Analyse
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Right Column: Radar Chart */}
                    <div className="flex items-center justify-center relative">
                        <PsychologyChart />
                    </div>

                </div>

                {/* Footer Trust Signals */}
                <div className="absolute bottom-10 w-full px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center max-w-4xl mx-auto gap-6 text-[#F3F1EC]/40 text-sm font-light">
                        <div className="flex items-center gap-2">
                            <Shield className="h-5 w-5 text-[#D4AF37]" />
                            <span>100% Confidentiel</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <UserCheck className="h-5 w-5 text-[#D4AF37]" />
                            <span>Personal Shoppers Vérifiés</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Star className="h-5 w-5 text-[#D4AF37]" />
                            <span>Satisfaction Garantie</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
