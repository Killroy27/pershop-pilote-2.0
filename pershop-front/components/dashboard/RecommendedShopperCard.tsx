import Link from "next/link";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface RecommendedShopperCardProps {
    id: string;
    name: string;
    role: string;
    description: string;
    tags: string[];
    image: string;
}

export function RecommendedShopperCard({ id, name, role, description, tags, image }: RecommendedShopperCardProps) {
    return (
        <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="relative h-64 bg-secondary">
                {/* Placeholder for Shopper Image */}
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/20 text-4xl font-serif">
                    Photo
                </div>
                {/* <Image src={image} alt={name} fill className="object-cover" /> */}
                <Avatar className="absolute bottom-4 left-4 h-24 w-24 border-4 border-white shadow-lg">
                    <AvatarImage src={image} />
                    <AvatarFallback className="text-xl">{name.substring(0, 2)}</AvatarFallback>
                </Avatar>
            </div>

            <CardContent className="pt-16 pb-6 text-center px-6">
                <h3 className="font-serif text-2xl font-bold mb-1">{name}</h3>
                <p className="text-primary font-medium tracking-wide uppercase text-xs mb-4">{role}</p>

                <p className="text-muted-foreground text-sm leading-relaxed mb-6 h-20 overflow-hidden">
                    {description}
                </p>

                <div className="flex flex-wrap justify-center gap-2">
                    {tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="bg-secondary/50 text-foreground font-normal border border-border/50">
                            {tag}
                        </Badge>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
