"use client";

import { Badge } from "@/components/ui/badge";

interface ShopperPortfolioProps {
    bio: string;
    specialties: string[];
    galleryImages: string[];
}

export function ShopperPortfolio({ bio, specialties, galleryImages }: ShopperPortfolioProps) {
    return (
        <div className="space-y-10">

            {/* About Section */}
            <section className="space-y-4">
                <h2 className="text-3xl font-serif font-bold text-foreground">À propos</h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                    {bio}
                </p>
            </section>

            {/* Specialties */}
            <section className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Spécialités</h3>
                <div className="flex flex-wrap gap-3">
                    {specialties.map(tag => (
                        <Badge
                            key={tag}
                            variant="outline"
                            className="py-2 px-4 rounded-full border-[#D4AF37] text-foreground font-medium text-sm hover:bg-[#D4AF37]/10 transition-colors"
                        >
                            {tag}
                        </Badge>
                    ))}
                </div>
            </section>

            {/* Gallery Grid */}
            <section className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Inspirations & Portfolio</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {galleryImages.map((img, idx) => (
                        <div key={idx} className="aspect-[3/4] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all group">
                            <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
}
