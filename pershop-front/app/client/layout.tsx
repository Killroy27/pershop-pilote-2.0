"use client";

import { Header } from "@/components/layout/Header";
import { AnalysisProvider } from "@/contexts/AnalysisContext";

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AnalysisProvider>
            <div className="min-h-screen bg-background font-sans text-foreground">
                <Header />
                <main className="relative flex min-h-[calc(100vh-4rem)] flex-col">
                    {children}
                </main>
            </div>
        </AnalysisProvider>
    );
}
