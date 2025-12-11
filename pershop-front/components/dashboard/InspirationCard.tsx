import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface InspirationCardProps {
    items: Array<{ image: string; alt: string }>;
}

export function InspirationCard({ items }: InspirationCardProps) {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="font-serif text-xl font-medium">Inspiration & Recommandations</h3>
            </div>

            <div className="relative group">
                <div className="flex gap-4 overflow-hidden rounded-lg">
                    {items.slice(0, 3).map((item, i) => (
                        <div key={i} className="relative aspect-[3/4] w-1/3 bg-secondary rounded-lg overflow-hidden group/item cursor-pointer">
                            {/* Placeholder for image - using div bg for now to be safe with missing assets */}
                            <div className="absolute inset-0 bg-muted flex items-center justify-center text-muted-foreground/20">
                                Image {i + 1}
                            </div>
                            {/* Ideally use Next Image but we don't have assets yet */}
                            {/* <Image src={item.image} alt={item.alt} fill className="object-cover transition-transform group-hover/item:scale-105" /> */}
                        </div>
                    ))}
                </div>

                <Button size="icon" variant="outline" className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 border-none shadow-sm h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="outline" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 border-none shadow-sm h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>

            <div className="flex justify-center gap-2">
                {[0, 1, 2, 3].map(i => (
                    <div key={i} className={`h-2 w-2 rounded-full ${i === 0 ? "bg-primary" : "bg-muted-foreground/30"}`} />
                ))}
            </div>
        </div>
    );
}
