"use client";

import { ShopperCard } from "@/components/match/ShopperCard";
import { useAnalysis } from "@/contexts/AnalysisContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MatchResultsPage() {
    const router = useRouter();
    const { results } = useAnalysis();
    const [matchedShoppers, setMatchedShoppers] = useState<any[]>([]);

    useEffect(() => {
        console.log("🔍 Match page - Results from context:", results);
        
        // Try to get results from context first, then localStorage
        let shoppers = results?.shoppers_found || [];
        
        if (shoppers.length === 0) {
            console.log("⚠️ No results in context, checking localStorage...");
            const savedResults = localStorage.getItem('pershop_analysis_results');
            if (savedResults) {
                try {
                    const parsed = JSON.parse(savedResults);
                    shoppers = parsed?.shoppers_found || [];
                    console.log("✅ Loaded from localStorage:", shoppers.length, "shoppers");
                } catch (e) {
                    console.error("❌ Error parsing localStorage:", e);
                }
            }
        }
        
        console.log("📊 Final shoppers to display:", shoppers.length);
        setMatchedShoppers(shoppers);
    }, [results]);

    const handleSelectShopper = (id: string) => {
        // Navigate to shopper profile or dashboard with selection
        router.push(`/client/shopper/${id}`);
    };

    return (
        <div className="min-h-screen w-full bg-background text-foreground flex flex-col py-12 md:py-20 px-4 transition-colors duration-500">
            <div className="container max-w-screen-xl mx-auto space-y-16">

                <div className="text-center space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <h1 className="font-serif text-3xl md:text-5xl font-medium">
                        Nous avons trouvé vos {matchedShoppers.length} Personal Shoppers idéaux
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Basé sur votre analyse émotionnelle et vos préférences, voici les experts les plus compatibles avec votre profil.
                    </p>
                </div>

                {matchedShoppers.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-0">
                        {matchedShoppers.map((shopper: any, index: number) => (
                            <div
                                key={shopper.id}
                                className="animate-in fade-in slide-in-from-bottom-8 duration-700 hover:-translate-y-2 transition-transform"
                                style={{ animationDelay: `${index * 150}ms` }}
                            >
                                <ShopperCard
                                    name={shopper.name}
                                    title={shopper.title || "Personal Shopper Elite"}
                                    description={shopper.description || shopper.bio}
                                    imageUrl={shopper.imageUrl || shopper.profile_image || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800"}
                                    tags={shopper.tags || shopper.specialties || []}
                                    onClick={() => handleSelectShopper(shopper.id)}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-muted-foreground">
                        <p>Aucun personal shopper trouvé. Veuillez réessayer l'analyse.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
