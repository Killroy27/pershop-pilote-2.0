"use client";

import { AnalysisProvider } from "@/contexts/AnalysisContext";

export default function AnalysisLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AnalysisProvider>
            <div className="min-h-screen w-full bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
                {/* Texture Overlay */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none fixed"></div>

                <div className="relative z-10">
                    {children}
                </div>
            </div>
        </AnalysisProvider>
    );
}
