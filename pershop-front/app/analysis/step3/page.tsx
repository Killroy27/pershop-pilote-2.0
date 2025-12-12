"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnalysisProgressBar } from "@/components/analysis/AnalysisProgressBar";
import { BudgetSlider } from "@/components/analysis/BudgetSlider";
import { OccasionSelector } from "@/components/analysis/OccasionSelector";
import { StyleGrid } from "@/components/analysis/StyleGrid";
import { BrandSelector } from "@/components/analysis/BrandSelector";

export default function AnalysisStep3Page() {
    const router = useRouter();

    // State management
    const [budget, setBudget] = useState([800]);
    const [occasion, setOccasion] = useState("work");
    const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

    // Handlers
    const handleToggleStyle = (styleId: string) => {
        setSelectedStyles(prev =>
            prev.includes(styleId)
                ? prev.filter(id => id !== styleId)
                : [...prev, styleId]
        );
    };

    const handleAddBrand = (brand: string) => {
        if (!selectedBrands.includes(brand)) {
            setSelectedBrands([...selectedBrands, brand]);
        }
    };

    const handleRemoveBrand = (brand: string) => {
        setSelectedBrands(selectedBrands.filter(b => b !== brand));
    };

    const handleFinish = () => {
        // Store step 3 data for AI analysis
        const step3Data = {
            budget: budget[0],
            occasion,
            selectedStyles,
            selectedBrands,
            timestamp: new Date().toISOString()
        };
        localStorage.setItem("pershop_step3", JSON.stringify(step3Data));
        router.push('/analysis/processing');
    };

    return (
        <div className="min-h-screen w-full bg-[#FDFBF7] dark:bg-background text-foreground transition-colors duration-500">
            {/* Header Bar */}
            <div className="border-b border-border bg-card">
                <div className="container max-w-screen-xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/analysis/step2" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                        <ChevronLeft className="h-5 w-5" />
                        <span className="text-sm">Retour</span>
                    </Link>

                    <AnalysisProgressBar currentStep={3} totalSteps={3} />

                    <Link href="/" className="font-serif text-xl font-bold text-[#D4AF37] hover:opacity-80 transition-opacity">
                        PERSHOP
                    </Link>
                </div>
            </div>

            <div className="container max-w-screen-xl mx-auto py-8 px-6">
                <div className="max-w-6xl mx-auto w-full">
                    <h1 className="font-serif text-3xl md:text-4xl mb-10 text-center">
                        Affinez vos préférences style
                    </h1>

                    {/* Main Layout Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

                        {/* Left Column (Budget, Styles, Brands) - Spans 8 cols */}
                        <div className="lg:col-span-8 space-y-8">

                            {/* 1. Budget */}
                            <section className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow animate-in slide-in-from-bottom-4 duration-700 delay-100">
                                <BudgetSlider value={budget} onValueChange={setBudget} />
                            </section>

                            {/* 2. Styles */}
                            <section className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow animate-in slide-in-from-bottom-4 duration-700 delay-200">
                                <StyleGrid selectedStyles={selectedStyles} onToggleStyle={handleToggleStyle} />
                            </section>

                            {/* 3. Brands */}
                            <section className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow animate-in slide-in-from-bottom-4 duration-700 delay-300">
                                <BrandSelector
                                    selectedBrands={selectedBrands}
                                    onAddBrand={handleAddBrand}
                                    onRemoveBrand={handleRemoveBrand}
                                />
                            </section>

                        </div>

                        {/* Right Column (Occasion) - Spans 4 cols - Sticky on Desktop */}
                        <div className="lg:col-span-4">
                            <div className="sticky top-24 space-y-8 animate-in slide-in-from-right-4 duration-700 delay-300">
                                <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
                                    <OccasionSelector value={occasion} onValueChange={setOccasion} />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Footer Actions */}
                <div className="mt-12 py-8 border-t border-border flex justify-end gap-4 animate-in fade-in duration-1000">
                    <Link href="/analysis/step2">
                        <Button variant="outline" size="lg" className="px-8 border-border hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/5 h-12 text-base">
                            Précédent
                        </Button>
                    </Link>

                    <Button
                        size="lg"
                        className="px-10 bg-[#D4AF37] hover:bg-[#FCCA2E] text-black h-12 text-base shadow-lg shadow-[#D4AF37]/20 hover:shadow-[#D4AF37]/40 transition-all font-medium"
                        onClick={handleFinish}
                    >
                        Terminer <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
