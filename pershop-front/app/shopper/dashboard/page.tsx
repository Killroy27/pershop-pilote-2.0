"use client";

import { ShopperHeader } from "@/components/shopper/ShopperHeader";
import { KPICards } from "@/components/shopper/dashboard/KPICards";
import { MatchingTable } from "@/components/shopper/dashboard/MatchingTable";
import { AgendaWidget } from "@/components/shopper/dashboard/AgendaWidget";

export default function ShopperDashboardPage() {
    return (
        <div className="min-h-screen pb-12">
            <ShopperHeader name="Sophie" />

            <div className="px-8 space-y-8">
                {/* KPI Section */}
                <KPICards />

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
                    {/* Table takes 2/3 */}
                    <div className="lg:col-span-2 flex">
                        <MatchingTable />
                    </div>

                    {/* Agenda takes 1/3 */}
                    <div className="lg:col-span-1 flex">
                        <AgendaWidget />
                    </div>
                </div>
            </div>
        </div>
    );
}
