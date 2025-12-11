import { ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function KPICard() {
    return (
        <div className="space-y-4">
            <h3 className="font-serif text-xl font-medium">Mes avantages</h3>
            <Card className="bg-white border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                <CardContent className="p-4 flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center font-bold text-lg text-primary">
                        10
                    </div>

                    <div className="flex-1">
                        <div className="font-bold">Points de loyauté</div>
                        <div className="text-sm text-muted-foreground text-xs">Points / spéciales & offres</div>
                    </div>

                    <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </CardContent>
            </Card>
        </div>
    );
}
