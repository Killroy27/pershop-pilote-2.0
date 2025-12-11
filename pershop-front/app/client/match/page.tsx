"use client";

import { ShopperCard } from "@/components/match/ShopperCard";
import { useRouter } from "next/navigation";

// Mock Data matching the mockup
const matchedShoppers = [
    {
        id: "sophie",
        name: "Sophie Laurent",
        title: "Personal Shopper Elite",
        description: "Spécialiste du luxe et de l'élégance intemporelle, je sublime votre style avec une approche personnalisée.",
        imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop", // Professional Woman
        tags: ["Luxe", "Colorimétrie", "Morphologie"]
    },
    {
        id: "marc",
        name: "Marc Dubois",
        title: "Personal Shopper Elite",
        description: "Créateur de looks sophistiqués et avant-gardistes, je vous accompagne dans l'affirmation de votre identité.",
        imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop", // Professional Man
        tags: ["Haute Couture", "Tendances", "Garde-robe Capsule"]
    },
    {
        id: "clara",
        name: "Clara Moreau",
        title: "Personal Shopper Elite",
        description: "Experte en relooking et confiance en soi, je révèle votre potentiel à travers des tenues adaptées.",
        imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop", // Friendly Woman
        tags: ["Relooking", "Conseil Image", "Shopping Personnalisé"]
    }
];

export default function MatchResultsPage() {
    const router = useRouter();

    const handleSelectShopper = (id: string) => {
        // Navigate to shopper profile or dashboard with selection
        // For MVP, maybe go to their detailed profile?
        router.push(`/client/shopper/${id}`);
    };

    return (
        <div className="min-h-screen w-full bg-background text-foreground flex flex-col py-12 md:py-20 px-4 transition-colors duration-500">
            <div className="container max-w-screen-xl mx-auto space-y-16">

                <div className="text-center space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <h1 className="font-serif text-3xl md:text-5xl font-medium">
                        Nous avons trouvé vos 3 Personal Shoppers idéaux
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Basé sur votre analyse émotionnelle et vos préférences, voici les experts les plus compatibles avec votre profil.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-0">
                    {matchedShoppers.map((shopper, index) => (
                        <div
                            key={shopper.id}
                            className="animate-in fade-in slide-in-from-bottom-8 duration-700 hover:-translate-y-2 transition-transform"
                            style={{ animationDelay: `${index * 150}ms` }}
                        >
                            <ShopperCard
                                {...shopper}
                                onClick={() => handleSelectShopper(shopper.id)}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
