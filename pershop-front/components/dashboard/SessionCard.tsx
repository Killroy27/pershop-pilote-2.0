import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";


interface SessionCardProps {
    date: { day: string; month: string };
    time: string;
    shopper: { name: string; avatar: string; location: string };
    isUpcoming?: boolean;
    status?: string;
    details?: string;
    rating?: number;
}

export function SessionCard({ date, time, shopper, isUpcoming, status, details, rating }: SessionCardProps) {
    if (isUpcoming) {
        return (
            <Card className="border-none shadow-md bg-white">
                <CardContent className="p-6">
                    <h3 className="font-serif text-xl font-medium mb-4">Prochaine session</h3>

                    <div className="flex items-start gap-4">
                        <div className="flex flex-col items-center justify-center p-3 bg-secondary/50 rounded-lg min-w-[80px]">
                            <span className="text-4xl font-serif font-bold text-primary">{date.day}</span>
                            <span className="text-xs uppercase tracking-wide text-muted-foreground">{date.month}</span>
                        </div>

                        <div className="space-y-1">
                            <div className="text-2xl font-light">{time}</div>
                            <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Personal Shopper</div>

                            <div className="flex items-center gap-2 mt-2">
                                <Avatar className="h-10 w-10 border border-primary/20">
                                    <AvatarImage src={shopper.avatar} />
                                    <AvatarFallback>{shopper.name.substring(0, 2)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className="font-bold font-serif">{shopper.name}</div>
                                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                                        <MapPin className="h-3 w-3" /> {shopper.location}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 text-center text-lg font-serif italic text-muted-foreground">
                        Dans 7 jours
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-3">
                        <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                            Modifier
                        </Button>
                        <Button variant="ghost" className="text-muted-foreground underline">
                            Annuler
                        </Button>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="border-none shadow-sm hover:shadow-md transition-shadow bg-white mb-4">
            <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="text-sm font-medium text-muted-foreground w-24">
                        {date.day} {date.month} 2023 <br />
                        <span className="text-xs font-normal">| {time}</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={shopper.avatar} />
                            <AvatarFallback>{shopper.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <div className="font-medium text-sm">Personal Shopper</div>
                            <div className="text-xs text-muted-foreground flex items-center gap-1">
                                <span className="font-bold text-foreground">{shopper.name}</span>
                                <MapPin className="h-3 w-3" /> {shopper.location}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-end gap-1">
                    {status && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-secondary text-secondary-foreground">
                            {status}
                        </span>
                    )}
                    {details && <div className="text-xs text-muted-foreground">{details}</div>}
                    {rating && (
                        <div className="flex items-center text-xs font-bold text-primary">
                            ★ {rating}/5 étoiles
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
