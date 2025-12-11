"use client";

import { ShopperHero } from "@/components/shopper/ShopperHero";
import { ShopperPortfolio } from "@/components/shopper/ShopperPortfolio";
import { ServiceList } from "@/components/shopper/ServiceList";

// Mock Data for "sophie"
const sophieData = {
    name: "Sophie Laurent",
    title: "Personal Shopper Elite",
    location: "Paris",
    matchScore: 94,
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
    bannerUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop", // Boutique/Luxury Store
    bio: "Expert in cultivating luxury wardrobes for discerning international clientele. With over a decade of experience in high-end fashion, Sophie blends Parisian elegance with personalized style strategies. She excels in curating pieces from top fashion houses, creating confident looks for business and events, and guiding clients to discover their perfect color palettes and silhouettes.",
    specialties: ["Mode Luxe", "Colorimétrie Expert", "Morphologie", "Business", "Événementiel", "Garde-robe capsule"],
    galleryImages: [
        "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=400&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1548624149-f3214c7c944a?q=80&w=400&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1589363359871-337d45766299?q=80&w=400&auto=format&fit=crop", // Accessories
        "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?q=80&w=400&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=400&auto=format&fit=crop", // Clothes rack
        "https://images.unsplash.com/photo-1550614000-4b9519e02a48?q=80&w=400&auto=format&fit=crop",
    ],
    services: [
        { title: "Séance Stylisme Personnalisée (2h)", price: "350 €", description: "Consultation colorimétrie, morphologie et conseils ciblés en boutique." },
        { title: "Forfait Shopping VIP (Demi-journée)", price: "1500 €", description: "Parcours shopping exclusif avec accès privé, essayages guidés." },
        { title: "Abonnement Annuel Elite", price: "Sur demande", description: "Accès privilégié, conciergerie de mode, gestion complète de garde-robe." },
    ]
};

export default function ShopperProfilePage({ params }: { params: { id: string } }) {
    // In a real app, fetch data based on params.id
    // const shopper = fetchShopper(params.id)
    const shopper = sophieData;

    return (
        <div className="min-h-screen bg-background text-foreground pb-20 transition-colors duration-500">
            <div className="container max-w-screen-xl mx-auto px-4 md:px-0">

                {/* Header Section */}
                <ShopperHero
                    name={shopper.name}
                    title={shopper.title}
                    location={shopper.location}
                    matchScore={shopper.matchScore}
                    avatarUrl={shopper.avatarUrl}
                    bannerUrl={shopper.bannerUrl}
                />

                {/* Main Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 px-4 md:px-8">

                    {/* Left Column: Bio & Portfolio (8 cols) */}
                    <div className="lg:col-span-8 animate-in slide-in-from-bottom-8 duration-700">
                        <ShopperPortfolio
                            bio={shopper.bio}
                            specialties={shopper.specialties}
                            galleryImages={shopper.galleryImages}
                        />
                    </div>

                    {/* Right Column: Services Sidebar (4 cols) */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-24 animate-in slide-in-from-right-8 duration-700 delay-200">
                            <ServiceList
                                services={shopper.services}
                                shopperName={shopper.name}
                            />
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
