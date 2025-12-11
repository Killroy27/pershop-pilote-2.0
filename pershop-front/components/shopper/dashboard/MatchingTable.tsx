"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

const matchings = [
    {
        id: 1,
        name: "Marie L.",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
        need: "Robe de soirée gala",
        date: "25 Mai 2024",
        status: "En cours",
        statusColor: "bg-yellow-400"
    },
    {
        id: 2,
        name: "Thomas B.",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
        need: "Costume sur mesure",
        date: "24 Mai 2024",
        status: "Confirmé",
        statusColor: "bg-green-500"
    },
    {
        id: 3,
        name: "Claire D.",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop",
        need: "Garde-robe été",
        date: "23 Mai 2024",
        status: "En attente",
        statusColor: "bg-orange-400"
    }
];

export function MatchingTable() {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex-1">
            <h2 className="font-serif text-2xl font-bold mb-6 text-[#111111]">Matchings Récents</h2>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="text-gray-400 text-sm border-b border-gray-100">
                            <th className="font-medium bg-gray-50/50 p-4 rounded-tl-lg">Client</th>
                            <th className="font-medium bg-gray-50/50 p-4">Besoin</th>
                            <th className="font-medium bg-gray-50/50 p-4">Date</th>
                            <th className="font-medium bg-gray-50/50 p-4">Statut</th>
                            <th className="font-medium bg-gray-50/50 p-4 rounded-tr-lg">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {matchings.map((mp, idx) => (
                            <tr key={mp.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full overflow-hidden border border-gray-100">
                                            <img src={mp.avatar} alt={mp.name} className="h-full w-full object-cover" />
                                        </div>
                                        <span className="font-serif font-semibold text-[#111111] text-base">{mp.name}</span>
                                    </div>
                                </td>
                                <td className="p-4 text-gray-600 font-medium">{mp.need}</td>
                                <td className="p-4 text-gray-500 font-light">{mp.date}</td>
                                <td className="p-4">
                                    <div className="flex items-center gap-2 bg-gray-50 w-fit px-3 py-1.5 rounded-full border border-gray-100">
                                        <span className={`h-2 w-2 rounded-full ${mp.statusColor} shadow-sm`} />
                                        <span className="text-[#111111] font-medium text-xs uppercase tracking-wide">{mp.status}</span>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <Link href={`/shopper/clients/${mp.id}`}>
                                        <Button variant="outline" size="sm" className="text-[#D4AF37] border-[#D4AF37] hover:bg-[#D4AF37] hover:text-white rounded-full text-xs h-8 px-6 font-medium transition-all duration-300">
                                            Voir Détails
                                        </Button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
