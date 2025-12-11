"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ShopperCardProps {
    name: string;
    title: string;
    description: string;
    imageUrl: string;
    tags: string[];
    onClick?: () => void;
}

export function ShopperCard({ name, title, description, imageUrl, tags, onClick }: ShopperCardProps) {
    return (
        <Card
            onClick={onClick}
            className="group relative overflow-hidden border border-border/40 hover:border-[#D4AF37]/50 shadow-lg hover:shadow-[#D4AF37]/10 transition-all duration-500 cursor-pointer bg-card flex flex-col h-full"
        >
            {/* Image Section */}
            <div className="relative aspect-[3/4] overflow-hidden w-full">
                <img
                    src={imageUrl}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
            </div>

            {/* Content Section */}
            <CardContent className="flex flex-col items-center text-center pt-6 px-6 space-y-3 grow">
                <h3 className="font-serif text-2xl font-bold text-foreground group-hover:text-[#D4AF37] transition-colors">
                    {name}
                </h3>
                <p className="text-[#D4AF37] font-medium uppercase tracking-wide text-xs">
                    {title}
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-4">
                    {description}
                </p>
            </CardContent>

            {/* Footer Tags */}
            <CardFooter className="flex justify-center flex-wrap gap-2 pb-6 px-6">
                {tags.map((tag) => (
                    <Badge
                        key={tag}
                        variant="outline"
                        className="border-[#D4AF37]/40 bg-[#D4AF37]/5 text-foreground/80 hover:bg-[#D4AF37] hover:text-black transition-colors rounded-full font-normal px-3"
                    >
                        {tag}
                    </Badge>
                ))}
            </CardFooter>
        </Card>
    );
}
