"use client";

import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { NextSessionCard } from "@/components/dashboard/NextSessionCard";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { SessionTimeline } from "@/components/dashboard/SessionTimeline";
import { InspirationCarousel } from "@/components/dashboard/InspirationCarousel";
import { LoyaltyCard } from "@/components/dashboard/LoyaltyCard";

export default function ClientDashboardPage() {
    return (
        <div className="min-h-screen bg-[#FDFBF7] dark:bg-background text-foreground pb-20 transition-colors duration-500">
            <div className="container max-w-screen-xl mx-auto px-4 md:px-8">

                {/* Header */}
                <DashboardHeader
                    userName="Marie"
                    avatarUrl="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop"
                />

                {/* 3-Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">

                    {/* Left Column (30%) */}
                    <div className="lg:col-span-4 space-y-8 animate-in slide-in-from-left-4 duration-700">
                        <div className="space-y-4">
                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest pl-1">Left Column (30%)</p>
                            <NextSessionCard />
                        </div>
                        <div className="space-y-4">
                            <p className="font-serif text-xl font-medium pl-1">Quick Actions</p>
                            <QuickActions />
                        </div>
                    </div>

                    {/* Middle Column (45%) */}
                    <div className="lg:col-span-5 space-y-8 animate-in slide-in-from-bottom-4 duration-700 delay-100">
                        <div className="space-y-4">
                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest pl-1">Middle Column (45%)</p>
                            <h3 className="font-serif text-2xl font-medium pl-1">Historique sessions</h3>
                            <SessionTimeline />
                        </div>
                    </div>

                    {/* Right Column (25%) */}
                    <div className="lg:col-span-3 space-y-8 animate-in slide-in-from-right-4 duration-700 delay-200">
                        <div className="space-y-4">
                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest pl-1">Right Column (25%)</p>
                            <h3 className="font-serif text-xl font-medium pl-1">Inspiration & Recommandations</h3>
                            <InspirationCarousel />
                        </div>

                        <div className="space-y-4">
                            <h3 className="font-serif text-xl font-medium pl-1">Mes avantages</h3>
                            <LoyaltyCard />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
