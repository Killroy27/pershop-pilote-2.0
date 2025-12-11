"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Loader2 } from "lucide-react";

export function AuthForm() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("client");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        if (activeTab === "client") {
            router.push("/client/dashboard");
        } else {
            router.push("/shopper/dashboard");
        }
    };

    return (
        <div className="w-full max-w-md bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-gray-100 p-8 relative overflow-hidden">
            {/* Top accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D4AF37] via-[#FCCA2E] to-[#D4AF37]" />

            <div className="text-center mb-8">
                <h1 className="font-serif text-3xl font-bold text-[#111111] mb-2">Bienvenue</h1>
                <p className="text-gray-500 text-sm">Connectez-vous à votre espace personnel</p>
            </div>

            <Tabs defaultValue="client" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2 mb-8 p-1 bg-gray-100 rounded-full h-12">
                    <TabsTrigger
                        value="client"
                        className="rounded-full text-sm font-medium transition-all data-[state=active]:bg-white data-[state=active]:text-[#D4AF37] data-[state=active]:shadow-sm h-10"
                    >
                        Je suis Client
                    </TabsTrigger>
                    <TabsTrigger
                        value="shopper"
                        className="rounded-full text-sm font-medium transition-all data-[state=active]:bg-[#111111] data-[state=active]:text-[#D4AF37] data-[state=active]:shadow-sm h-10"
                    >
                        Je suis Shopper
                    </TabsTrigger>
                </TabsList>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="exemple@email.com"
                            className="h-12 rounded-lg border-gray-200 focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password">Mot de passe</Label>
                            <a href="#" className="text-xs text-[#D4AF37] hover:underline">Oublié ?</a>
                        </div>
                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            className="h-12 rounded-lg border-gray-200 focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                            required
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full h-12 rounded-full bg-[#111111] hover:bg-[#D4AF37] text-white hover:text-black font-bold tracking-wide transition-all duration-300 shadow-md"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Connexion en cours...
                            </>
                        ) : (
                            "SE CONNECTER"
                        )}
                    </Button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-xs text-gray-400">
                        Pas encore de compte ?{" "}
                        <a href="/analysis/step1" className="text-[#D4AF37] font-bold hover:underline">
                            Commencer l&apos;analyse
                        </a>
                    </p>
                </div>
            </Tabs>
        </div>
    );
}
