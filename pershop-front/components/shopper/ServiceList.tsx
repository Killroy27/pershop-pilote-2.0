"use client";

import { Button } from "@/components/ui/button";
import { Mail, ArrowRight } from "lucide-react";
import Link from "next/link";

interface Service {
    title: string;
    price: string;
    description: string;
}

interface ServiceListProps {
    services: Service[];
    shopperName: string;
}

export function ServiceList({ services, shopperName }: ServiceListProps) {
    return (
        <div className="bg-card w-full rounded-2xl p-6 md:p-8 space-y-8 border border-border shadow-lg">
            <h2 className="text-2xl font-serif font-bold text-foreground">Services & Tarifs</h2>

            <div className="space-y-8">
                {services.map((service, index) => (
                    <div key={index} className="space-y-2 pb-6 border-b border-border/50 last:border-0 last:pb-0">
                        <div className="flex justify-between items-start gap-4">
                            <h3 className="font-bold text-foreground text-lg">{service.title}</h3>
                            <span className="font-bold text-lg text-foreground shrink-0">{service.price}</span>
                        </div>
                        <p className="text-muted-foreground text-sm">
                            {service.description}
                        </p>
                    </div>
                ))}
            </div>

            <div className="pt-4 space-y-4">
                <Link href={`/client/shopper/${shopperName.toLowerCase().split(' ')[0]}/booking`} className="block w-full">
                    <Button className="w-full h-12 text-lg bg-[#D4AF37] hover:bg-[#b5952f] text-black shadow-lg shadow-[#D4AF37]/20 font-medium">
                        Contactez {shopperName.split(' ')[0]}
                    </Button>
                </Link>
                <div className="flex justify-center gap-6 text-muted-foreground text-sm">
                    <span className="hover:text-[#D4AF37] cursor-pointer flex items-center gap-2"><ArrowRight className="h-4 w-4" /> LinkedIn</span>
                    <span className="hover:text-[#D4AF37] cursor-pointer flex items-center gap-2"><ArrowRight className="h-4 w-4" /> Instagram</span>
                </div>
            </div>

        </div>
    );
}
