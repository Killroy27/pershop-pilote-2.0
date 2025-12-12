"use client";

import { ServiceList } from "@/components/shopper/ServiceList";
import { ShopperHero } from "@/components/shopper/ShopperHero";
import { ShopperPortfolio } from "@/components/shopper/ShopperPortfolio";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ShopperProfilePage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [shopper, setShopper] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Load shopper data from localStorage
        console.log("🔍 Looking for shopper with ID:", params.id);
        const savedResults = localStorage.getItem('pershop_analysis_results');
        if (savedResults) {
            try {
                const parsed = JSON.parse(savedResults);
                const shoppers = parsed?.shoppers_found || [];
                console.log("📊 Available shoppers:", shoppers.map((s: any) => s.id));
                
                // Try exact match first
                let foundShopper = shoppers.find((s: any) => s.id === params.id);
                
                // If not found, try case-insensitive match
                if (!foundShopper) {
                    foundShopper = shoppers.find((s: any) => 
                        s.id?.toLowerCase() === params.id?.toLowerCase()
                    );
                }
                
                // If still not found, just use the first shopper as fallback
                if (!foundShopper && shoppers.length > 0) {
                    console.warn("⚠️ Exact match not found, using first shopper as fallback");
                    foundShopper = shoppers[0];
                }
                
                if (foundShopper) {
                    console.log("✅ Found shopper:", foundShopper.name);
                    setShopper(foundShopper);
                } else {
                    console.error("❌ No shoppers available");
                }
            } catch (e) {
                console.error("Error loading shopper:", e);
            }
        } else {
            console.error("❌ No results in localStorage");
        }
        setLoading(false);
    }, [params.id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <p className="text-muted-foreground">Chargement...</p>
            </div>
        );
    }

    if (!shopper) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <p className="text-muted-foreground mb-4">Personal shopper introuvable</p>
                    <button 
                        onClick={() => router.push('/client/match')}
                        className="text-[#D4AF37] hover:underline"
                    >
                        Retour aux résultats
                    </button>
                </div>
            </div>
        );
    }

    // Default services if not provided by backend
    const services = shopper.services || [
        { title: "Séance Stylisme Personnalisée (2h)", price: "350 €", description: "Consultation colorimétrie, morphologie et conseils ciblés." },
        { title: "Forfait Shopping VIP (Demi-journée)", price: "1500 €", description: "Parcours shopping exclusif avec accès privé." },
        { title: "Abonnement Elite", price: "Sur demande", description: "Accès privilégié et gestion complète de garde-robe." },
    ];

    // Default gallery if not provided
    const galleryImages = shopper.gallery || [
        "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=400",
        "https://images.unsplash.com/photo-1548624149-f3214c7c944a?q=80&w=400",
        "https://images.unsplash.com/photo-1589363359871-337d45766299?q=80&w=400",
    ];

    return (
        <div className="min-h-screen bg-background text-foreground pb-20 transition-colors duration-500">
            <div className="container max-w-screen-xl mx-auto px-4 md:px-0">

                {/* Header Section */}
                <ShopperHero
                    name={shopper.name}
                    title={shopper.title || "Personal Shopper Elite"}
                    location={shopper.location}
                    matchScore={shopper.match_score || 90}
                    avatarUrl={shopper.profile_image}
                    bannerUrl="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200"
                />

                {/* Main Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 px-4 md:px-8">

                    {/* Left Column: Bio & Portfolio (8 cols) */}
                    <div className="lg:col-span-8 animate-in slide-in-from-bottom-8 duration-700">
                        <ShopperPortfolio
                            bio={shopper.bio || shopper.why_this_match}
                            specialties={shopper.tags || []}
                            galleryImages={galleryImages}
                        />
                    </div>

                    {/* Right Column: Services Sidebar (4 cols) */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-24 animate-in slide-in-from-right-8 duration-700 delay-200">
                            <ServiceList
                                services={services}
                                shopperName={shopper.name}
                            />
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
