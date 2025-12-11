"use client";

import { PreBriefHero } from "@/components/shopper/client/PreBriefHero";
import { InsightSection } from "@/components/shopper/client/InsightSection";
import { StrategySection } from "@/components/shopper/client/StrategySection";

export default function ClientDetailPage({ params }: { params: { id: string } }) {
    const clientName = "Marie Dubois";

    return (
        <div className="min-h-screen bg-[#F8F9FA] pb-20">
            {/* Hero Section */}
            <PreBriefHero clientName={clientName} />

            {/* Main Content - "Floating" above the hero */}
            <InsightSection />

            {/* Strategy Content */}
            <StrategySection />
        </div>
    );
}
