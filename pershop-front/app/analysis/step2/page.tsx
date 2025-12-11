"use client";

import { AnalysisProgressBar } from "@/components/analysis/AnalysisProgressBar";
import { UploadZone } from "@/components/analysis/UploadZone";
import { AIIllustration } from "@/components/analysis/AIIllustration";
import { AlternativeDescription } from "@/components/analysis/AlternativeDescription";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function AnalysisStep2Page() {
    return (
        <div className="min-h-screen w-full bg-background text-foreground transition-colors duration-500">
            <div className="container max-w-screen-xl mx-auto py-8 px-4 flex flex-col min-h-screen">

                {/* Header */}
                <div className="flex items-center justify-between mb-12">
                    <Link href="/analysis/step1" className="text-muted-foreground hover:text-foreground transition-colors">
                        <ChevronLeft className="h-6 w-6" />
                        <span className="sr-only">Retour</span>
                    </Link>

                    <AnalysisProgressBar currentStep={2} totalSteps={3} />

                    <div className="w-6" /> {/* Spacer */}
                </div>

                <div className="flex-1 flex flex-col items-center">
                    <h1 className="font-serif text-3xl md:text-5xl mb-16 text-center">
                        Aidez-nous à mieux vous connaître
                    </h1>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full max-w-5xl">
                        {/* Left: Upload */}
                        <div className="space-y-8 animate-in slide-in-from-left-6 duration-700">
                            <UploadZone />

                            <div className="flex justify-center w-full">
                                <AlternativeDescription />
                            </div>
                        </div>

                        {/* Right: Illustration */}
                        <div className="hidden lg:block animate-in slide-in-from-right-6 duration-700 delay-200">
                            <AIIllustration />
                        </div>
                    </div>

                    <div className="pt-16 pb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                        <Link href="/analysis/step3">
                            <Button className="bg-[#D4AF37] text-black hover:bg-[#FCCA2E] text-lg px-12 py-6 rounded-full font-medium transition-all duration-300 shadow-lg shadow-[#D4AF37]/20">
                                Continuer
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
