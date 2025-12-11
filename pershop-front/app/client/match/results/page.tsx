import { RecommendedShopperCard } from "@/components/dashboard/RecommendedShopperCard";
import { Button } from "@/components/ui/button";

export default function MatchingResultsPage() {
    const shoppers = [
        {
            id: "sophie",
            name: "Sophie Laurent",
            role: "Personal Shopper Elite",
            description: "Spécialiste du luxe et de l'élégance intemporelle, je sublime votre style avec une approche personnalisée.",
            tags: ["Luxe", "Colorimétrie", "Morphologie"],
            image: "/avatars/shopper.jpg"
        },
        {
            id: "marc",
            name: "Marc Dubois",
            role: "Personal Shopper Elite",
            description: "Créateur de looks sophistiqués et avant-gardistes, je vous accompagne dans l'affirmation de votre identité.",
            tags: ["Haute Couture", "Tendances", "Garde-robe Capsule"],
            image: "/avatars/marc.jpg"
        },
        {
            id: "clara",
            name: "Clara Moreau",
            role: "Personal Shopper Elite",
            description: "Experte en relooking et confiance en soi, je révèle votre potentiel à travers des tenues adaptées.",
            tags: ["Relooking", "Conseil Image", "Shopping Personnalisé"],
            image: "/avatars/clara.jpg"
        }
    ];

    return (
        <div className="container py-12 max-w-screen-2xl">
            <div className="text-center max-w-2xl mx-auto mb-16">
                <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-4">
                    Nous avons trouvé vos 3 Personal Shoppers idéaux
                </h1>
                <p className="text-muted-foreground text-lg">
                    Basé sur votre profil émotionnel, vos préférences colorimétriques et votre morphologie.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {shoppers.map(shopper => (
                    <div key={shopper.id} className="group cursor-pointer">
                        <RecommendedShopperCard {...shopper} />
                    </div>
                ))}
            </div>

            <div className="mt-16 flex justify-center">
                <Button variant="outline" className="border-primary/20 text-muted-foreground hover:text-primary">
                    Voir d'autres suggestions
                </Button>
            </div>
        </div>
    );
}
