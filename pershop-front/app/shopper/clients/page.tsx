"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { User, Calendar, MapPin, Target, Clock, ChevronRight, Search, Filter, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:9000";

// Mock clients data (in production, fetch from API)
const mockClients = [
    {
        id: 1,
        name: "Marie Dubois",
        photo: "https://i.pravatar.cc/150?u=client1",
        location: "Paris 8ème",
        urgency: "Élevée",
        urgencyScore: 87,
        objective: "Événement spécial",
        bookingDate: "12 Décembre 2024",
        status: "confirmed",
        mood: "Motivée"
    },
    {
        id: 2,
        name: "Sophie Martin",
        photo: "https://i.pravatar.cc/150?u=client2",
        location: "Lyon Confluence",
        urgency: "Normale",
        urgencyScore: 45,
        objective: "Renouveler garde-robe",
        bookingDate: "15 Décembre 2024",
        status: "pending",
        mood: "Curieuse"
    },
    {
        id: 3,
        name: "Claire Moreau",
        photo: "https://i.pravatar.cc/150?u=client3",
        location: "Paris Le Marais",
        urgency: "Normale",
        urgencyScore: 55,
        objective: "Découvrir mon style",
        bookingDate: "18 Décembre 2024",
        status: "confirmed",
        mood: "Enthousiaste"
    },
    {
        id: 4,
        name: "Emma Laurent",
        photo: "https://i.pravatar.cc/150?u=client4",
        location: "Bordeaux Centre",
        urgency: "Basse",
        urgencyScore: 30,
        objective: "Optimiser budget",
        bookingDate: "20 Décembre 2024",
        status: "pending",
        mood: "Réfléchie"
    },
];

export default function ShopperClientsPage() {
    const [clients, setClients] = useState(mockClients);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState<"all" | "confirmed" | "pending">("all");

    // Filter clients
    const filteredClients = clients.filter(client => {
        const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.location.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === "all" || client.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="min-h-screen bg-[#FDFBF7] dark:bg-background text-foreground pb-20 transition-colors duration-500">
            <div className="container max-w-screen-xl mx-auto px-6 py-8">

                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Link href="/shopper/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                        <div>
                            <h1 className="text-3xl font-serif font-bold">Mes Clients</h1>
                            <p className="text-muted-foreground">{filteredClients.length} client(s) avec rendez-vous</p>
                        </div>
                    </div>
                    <Link href="/" className="font-serif text-xl font-bold text-[#D4AF37] hover:opacity-80 transition-opacity">
                        PERSHOP
                    </Link>
                </div>

                {/* Search and Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Rechercher un client..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 h-12 bg-card border-border"
                        />
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant={filterStatus === "all" ? "default" : "outline"}
                            onClick={() => setFilterStatus("all")}
                            className={filterStatus === "all" ? "bg-[#D4AF37] text-black hover:bg-[#FCCA2E]" : ""}
                        >
                            Tous
                        </Button>
                        <Button
                            variant={filterStatus === "confirmed" ? "default" : "outline"}
                            onClick={() => setFilterStatus("confirmed")}
                            className={filterStatus === "confirmed" ? "bg-green-600 text-white hover:bg-green-700" : ""}
                        >
                            Confirmés
                        </Button>
                        <Button
                            variant={filterStatus === "pending" ? "default" : "outline"}
                            onClick={() => setFilterStatus("pending")}
                            className={filterStatus === "pending" ? "bg-amber-500 text-black hover:bg-amber-600" : ""}
                        >
                            En attente
                        </Button>
                    </div>
                </div>

                {/* Clients List */}
                <div className="space-y-4">
                    {filteredClients.map((client) => (
                        <Link
                            key={client.id}
                            href={`/shopper/clients/${client.id}`}
                            className="block"
                        >
                            <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg hover:border-[#D4AF37]/30 transition-all duration-300 group">
                                <div className="flex items-center gap-6">
                                    {/* Avatar */}
                                    <img
                                        src={client.photo}
                                        alt={client.name}
                                        className="w-16 h-16 rounded-full object-cover border-2 border-[#D4AF37]/30 group-hover:border-[#D4AF37] transition-colors"
                                    />

                                    {/* Main Info */}
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-1">
                                            <h3 className="text-lg font-medium">{client.name}</h3>
                                            <span className={`px-2 py-0.5 rounded text-xs font-medium ${client.status === "confirmed"
                                                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                                    : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                                                }`}>
                                                {client.status === "confirmed" ? "Confirmé" : "En attente"}
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                            <span className="flex items-center gap-1">
                                                <MapPin className="h-3.5 w-3.5" />
                                                {client.location}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Calendar className="h-3.5 w-3.5" />
                                                {client.bookingDate}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Target className="h-3.5 w-3.5" />
                                                {client.objective}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Urgency & Arrow */}
                                    <div className="flex items-center gap-4">
                                        <div className={`text-right ${client.urgencyScore > 70 ? "text-red-500" :
                                                client.urgencyScore > 50 ? "text-amber-500" : "text-green-500"
                                            }`}>
                                            <p className="text-xs text-muted-foreground">Urgence</p>
                                            <p className="font-bold">{client.urgency}</p>
                                        </div>
                                        <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-[#D4AF37] transition-colors" />
                                    </div>
                                </div>

                                {/* Quick insights */}
                                <div className="mt-4 pt-4 border-t border-border flex gap-4 text-xs">
                                    <span className="px-2 py-1 bg-muted rounded">Humeur: {client.mood}</span>
                                    <span className="px-2 py-1 bg-muted rounded">Score urgence: {client.urgencyScore}/100</span>
                                </div>
                            </div>
                        </Link>
                    ))}

                    {filteredClients.length === 0 && (
                        <div className="text-center py-12 bg-card border border-border rounded-xl">
                            <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                            <p className="text-muted-foreground">Aucun client trouvé</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
