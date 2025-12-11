"use client";

import { Calendar, MapPin, Video, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

const events = [
    {
        time: "11:00 AM - 12:00 PM",
        title: "Essayage avec Marie L.",
        location: "Showroom Paris",
        type: "in-person",
        icon: MapPin
    },
    {
        time: "2:30 PM - 3:30 PM",
        title: "Consultation vidéo avec Thomas B.",
        location: "Google Meet",
        type: "video",
        icon: Video
    },
    {
        time: "4:00 PM - 5:00 PM",
        title: "Préparation shopping Claire D.",
        location: "Bureau",
        type: "work",
        icon: ShoppingBag
    }
];

export function AgendaWidget() {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col h-full">
            <h2 className="font-serif text-2xl font-bold mb-6 text-[#111111]">Agenda du Jour</h2>

            <div className="flex-1 space-y-6 relative ml-2">
                {/* Vertical Line */}
                <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-gray-100"></div>

                {events.map((evt, idx) => (
                    <div key={idx} className="relative pl-8 group cursor-pointer">
                        {/* Dot */}
                        <div className="absolute left-[-6px] top-1.5 h-3.5 w-3.5 rounded-full bg-white border-[3px] border-gray-200 group-hover:border-[#D4AF37] group-hover:scale-110 transition-all z-10"></div>

                        <div className="space-y-1 p-3 rounded-lg group-hover:bg-gray-50 transition-colors">
                            <span className="text-sm font-medium text-gray-400 block">{evt.time}</span>
                            <h3 className="text-[#111111] font-semibold">{evt.title}</h3>
                            <div className="flex items-center gap-1.5 text-sm text-gray-500">
                                <evt.icon className="h-3.5 w-3.5" />
                                <span>{evt.location}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 pt-4 border-t border-gray-50">
                <Button variant="ghost" className="w-full text-[#D4AF37] hover:text-[#b5952f] hover:bg-[#D4AF37]/5 font-medium flex items-center gap-2">
                    <Calendar className="h-4 w-4" /> Voir Agenda Complet
                </Button>
            </div>
        </div>
    );
}
