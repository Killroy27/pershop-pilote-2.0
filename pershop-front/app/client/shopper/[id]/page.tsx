"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { ShopperHero } from "@/components/shopper/ShopperHero";
import { ShopperPortfolio } from "@/components/shopper/ShopperPortfolio";
import { ServiceList } from "@/components/shopper/ServiceList";
import { Loader2 } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:9000";

// Default services (can be customized per shopper later)
const defaultServices = [
    { title: "Séance Stylisme Personnalisée (2h)", price: "350 €", description: "Consultation colorimétrie, morphologie et conseils ciblés en boutique." },
    { title: "Forfait Shopping VIP (Demi-journée)", price: "1500 €", description: "Parcours shopping exclusif avec accès privé, essayages guidés." },
    { title: "Abonnement Annuel Elite", price: "Sur demande", description: "Accès privilégié, conciergerie de mode, gestion complète de garde-robe." },
];

// Default gallery images
const defaultGallery = [
    "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1548624149-f3214c7c944a?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1589363359871-337d45766299?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1550614000-4b9519e02a48?q=80&w=400&auto=format&fit=crop",
];

export default function ShopperProfilePage() {
    const params = useParams();
    const shopperId = params.id;
    const [shopper, setShopper] = useState<any>(null);
    const [matchData, setMatchData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchShopper = async () => {
            try {
                // Get shopper from API
                const response = await fetch(`${API_URL}/api/shoppers/${shopperId}`);
                if (!response.ok) throw new Error("Shopper not found");
                const data = await response.json();

                // Get AI analysis from localStorage (for match score)
                const analysisJson = localStorage.getItem("pershop_ai_analysis");
                if (analysisJson) {
                    const analysis = JSON.parse(analysisJson);
                    setMatchData(analysis);
                }

                setShopper(data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching shopper:", err);
                setError("Shopper non trouvé");
                setLoading(false);
            }
        };

        if (shopperId) {
            fetchShopper();
        }
    }, [shopperId]);

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-[#D4AF37]" />
            </div>
        );
    }

    if (error || !shopper) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <p className="text-xl font-medium mb-2">Shopper non trouvé</p>
                    <p className="text-muted-foreground">ID: {shopperId}</p>
                </div>
            </div>
        );
    }

    // Calculate match score from stored analysis
    let matchScore = 85; // Default score
    if (matchData?.matched_shoppers) {
        const matchedShopper = matchData.matched_shoppers.find(
            (s: any) => s.id === parseInt(shopperId as string)
        );
        if (matchedShopper?.match_score) {
            matchScore = Math.round(matchedShopper.match_score);
        }
    }

    return (
        <div className="min-h-screen bg-background text-foreground pb-20 transition-colors duration-500">
            <div className="container max-w-screen-xl mx-auto px-4 md:px-0">

                {/* Header Section */}
                <ShopperHero
                    name={shopper.name}
                    title="Personal Shopper Elite"
                    location={shopper.location}
                    matchScore={matchScore}
                    avatarUrl={shopper.avatar_url || `https://i.pravatar.cc/400?u=${shopper.id}`}
                    bannerUrl="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop"
                />

                {/* Main Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 px-4 md:px-8">

                    {/* Left Column: Bio & Portfolio (8 cols) */}
                    <div className="lg:col-span-8 animate-in slide-in-from-bottom-8 duration-700">
                        <ShopperPortfolio
                            bio={shopper.bio || "Expert en style personnalisé avec des années d'expérience dans l'accompagnement de clients exigeants."}
                            specialties={shopper.specialties || ["Mode", "Conseil", "Style"]}
                            galleryImages={defaultGallery}
                        />
                    </div>

                    {/* Right Column: Services Sidebar (4 cols) */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-24 animate-in slide-in-from-right-8 duration-700 delay-200">
                            <ServiceList
                                services={defaultServices}
                                shopperName={shopper.name}
                            />
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
