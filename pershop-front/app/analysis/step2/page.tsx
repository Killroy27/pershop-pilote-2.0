"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AnalysisProgressBar } from "@/components/analysis/AnalysisProgressBar";
import { UploadZone } from "@/components/analysis/UploadZone";
import { AIIllustration } from "@/components/analysis/AIIllustration";
import { AlternativeDescription } from "@/components/analysis/AlternativeDescription";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, Loader2, CheckCircle, MapPin } from "lucide-react";

// Liste des villes principales
const CITIES = [
    "Paris 8e",
    "Paris Le Marais",
    "Lyon Confluence",
    "Marseille Vieux-Port",
    "Bordeaux Centre",
    "Lille Centre",
    "Toulouse Capitole",
    "Nice Promenade",
    "Nantes Centre",
    "Strasbourg Centre"
];

export default function AnalysisStep2Page() {
    const router = useRouter();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [userDescription, setUserDescription] = useState("");
    const [location, setLocation] = useState("");
    const [showCitySuggestions, setShowCitySuggestions] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisComplete, setAnalysisComplete] = useState(false);

    // Filter cities based on input
    const filteredCities = CITIES.filter(city =>
        city.toLowerCase().includes(location.toLowerCase())
    );

    const handleFileSelect = (file: File | null) => {
        setSelectedFile(file);
        if (file) {
            setAnalysisComplete(true);
        } else {
            setAnalysisComplete(false);
        }
    };

    const handleTextSubmit = async (text: string) => {
        setUserDescription(text);
        setIsAnalyzing(true);

        try {
            localStorage.setItem("pershop_user_description", text);
            await new Promise(resolve => setTimeout(resolve, 1500));
            setAnalysisComplete(true);
            setIsAnalyzing(false);
        } catch (error) {
            console.error("Analysis failed:", error);
            setIsAnalyzing(false);
        }
    };

    const handleCitySelect = (city: string) => {
        setLocation(city);
        setShowCitySuggestions(false);
    };

    const handleContinue = async () => {
        setIsAnalyzing(true);

        // Store analysis data for the matching step
        const analysisData = {
            hasPhoto: !!selectedFile,
            description: userDescription,
            location: location,
            timestamp: new Date().toISOString()
        };
        localStorage.setItem("pershop_analysis_step2", JSON.stringify(analysisData));

        // Navigate to next step
        router.push("/analysis/step3");
    };

    // Can proceed if has location AND (photo OR description)
    const canProceed = location && (selectedFile || userDescription);

    return (
        <div className="min-h-screen w-full bg-[#FDFBF7] dark:bg-background text-foreground transition-colors duration-500">
            {/* Header Bar */}
            <div className="border-b border-border bg-card">
                <div className="container max-w-screen-xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/analysis/step1" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                        <ChevronLeft className="h-5 w-5" />
                        <span className="text-sm">Retour</span>
                    </Link>

                    <AnalysisProgressBar currentStep={2} totalSteps={3} />

                    <Link href="/" className="font-serif text-xl font-bold text-[#D4AF37] hover:opacity-80 transition-opacity">
                        PERSHOP
                    </Link>
                </div>
            </div>

            <div className="container max-w-screen-xl mx-auto py-8 px-6">
                <div className="flex flex-col items-center">
                    <h1 className="font-serif text-3xl md:text-4xl mb-4 text-center">
                        Aidez-nous à mieux vous connaître
                    </h1>
                    <p className="text-muted-foreground text-center mb-10 max-w-xl">
                        Uploadez une photo, décrivez-vous et indiquez votre localisation pour des recommandations personnalisées
                    </p>

                    {/* Location Input Section */}
                    <div className="w-full max-w-md mb-10 animate-in slide-in-from-top-4 duration-500">
                        <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
                            <label className="flex items-center gap-2 text-sm font-medium mb-3">
                                <MapPin className="h-4 w-4 text-[#D4AF37]" />
                                Votre localisation
                            </label>
                            <div className="relative">
                                <Input
                                    type="text"
                                    placeholder="Ex: Paris 8e, Lyon Confluence..."
                                    value={location}
                                    onChange={(e) => {
                                        setLocation(e.target.value);
                                        setShowCitySuggestions(true);
                                    }}
                                    onFocus={() => setShowCitySuggestions(true)}
                                    onBlur={() => setTimeout(() => setShowCitySuggestions(false), 200)}
                                    className="w-full h-12 bg-background border-border focus:border-[#D4AF37] rounded-lg"
                                />

                                {/* City Suggestions Dropdown */}
                                {showCitySuggestions && filteredCities.length > 0 && (
                                    <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-xl shadow-lg z-50 max-h-48 overflow-auto">
                                        {filteredCities.map((city) => (
                                            <button
                                                key={city}
                                                onClick={() => handleCitySelect(city)}
                                                className="w-full px-4 py-3 text-left hover:bg-muted/50 transition-colors flex items-center gap-2"
                                            >
                                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                                {city}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                            {location && (
                                <p className="text-sm text-[#D4AF37] mt-3 flex items-center gap-1">
                                    <CheckCircle className="h-4 w-4" />
                                    Nous trouverons des shoppers proches de {location}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start w-full max-w-5xl">
                        {/* Left: Upload */}
                        <div className="space-y-6 animate-in slide-in-from-left-6 duration-700">
                            <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
                                <UploadZone onFileSelect={handleFileSelect} />
                            </div>

                            <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
                                <AlternativeDescription
                                    onTextSubmit={handleTextSubmit}
                                    isLoading={isAnalyzing}
                                />
                            </div>

                            {/* Status message */}
                            {analysisComplete && (
                                <div className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400 animate-in fade-in duration-300 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
                                    <CheckCircle className="h-5 w-5" />
                                    <span className="text-sm font-medium">
                                        {selectedFile ? "Photo prête pour l'analyse" : "Description enregistrée"}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Right: Illustration */}
                        <div className="hidden lg:block animate-in slide-in-from-right-6 duration-700 delay-200">
                            <div className="bg-card border border-border rounded-xl p-8 hover:shadow-lg transition-shadow">
                                <AIIllustration />
                            </div>
                        </div>
                    </div>

                    <div className="pt-12 pb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                        <Button
                            onClick={handleContinue}
                            disabled={isAnalyzing || !canProceed}
                            className="bg-[#D4AF37] text-black hover:bg-[#FCCA2E] text-lg px-12 py-6 rounded-full font-medium transition-all duration-300 shadow-lg shadow-[#D4AF37]/20 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isAnalyzing ? (
                                <>
                                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                                    Analyse en cours...
                                </>
                            ) : (
                                "Continuer"
                            )}
                        </Button>

                        {!canProceed && (
                            <p className="text-center text-sm text-muted-foreground mt-4">
                                Renseignez votre localisation et une photo ou description pour continuer
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
