"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

interface AnalysisProgressBarProps {
    currentStep: number;
    totalSteps: number;
}

export function AnalysisProgressBar({ currentStep, totalSteps }: AnalysisProgressBarProps) {
    const percentage = (currentStep / totalSteps) * 100;

    return (
        <div className="w-full max-w-md mx-auto space-y-2">
            <div className="flex justify-between text-sm font-medium text-muted-foreground uppercase tracking-widest">
                <Link href="/" className="hover:text-[#D4AF37] transition-colors cursor-pointer">
                    PERSHOP PILOTE 2.0
                </Link>
                <span>{currentStep}/{totalSteps}</span>
            </div>
            <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                <div
                    className="h-full bg-primary transition-all duration-500 ease-out"
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
}

