"use client";

import { Brain, Lightbulb, Palette, ScanLine, Network, CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export type ProcessStepId = 'brain' | 'context' | 'color' | 'morpho' | 'harmony';

interface ProcessStep {
    id: ProcessStepId;
    label: string;
    subtext: string;
    icon: any;
}

const steps: ProcessStep[] = [
    { id: 'brain', label: 'Agent Mirror', subtext: 'Analyse émotionnelle terminée', icon: Brain },
    { id: 'context', label: 'Context Genius', subtext: 'Contexte situationnel...', icon: Lightbulb },
    { id: 'color', label: 'Chromatic AI', subtext: 'En attente...', icon: Palette },
    { id: 'morpho', label: 'Morpho-Match', subtext: 'En attente...', icon: ScanLine },
    { id: 'harmony', label: 'Harmony Engine', subtext: 'En attente...', icon: Network },
];

interface ProcessStepsProps {
    currentStepIndex: number; // 0 to 4 (or 5 for complete)
}

export function ProcessSteps({ currentStepIndex }: ProcessStepsProps) {
    return (
        <div className="w-full max-w-sm space-y-6">
            {steps.map((step, index) => {
                const isActive = index === currentStepIndex;
                const isCompleted = index < currentStepIndex;
                const isPending = index > currentStepIndex;

                return (
                    <motion.div
                        key={step.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={cn(
                            "flex items-center gap-4 p-3 rounded-lg transition-colors border",
                            isActive ? "bg-[#D4AF37]/5 border-[#D4AF37]/20" : "bg-transparent border-transparent"
                        )}
                    >
                        {/* Icon */}
                        <div className={cn(
                            "p-2 rounded-full",
                            isActive || isCompleted ? "text-[#D4AF37]" : "text-muted-foreground/40"
                        )}>
                            <step.icon className={cn("h-6 w-6", isActive && "animate-pulse")} />
                        </div>

                        {/* Text Info */}
                        <div className="flex-1">
                            <h4 className={cn(
                                "font-medium text-sm md:text-base transition-colors",
                                isActive || isCompleted ? "text-foreground" : "text-muted-foreground/60"
                            )}>
                                {step.label}
                            </h4>
                            <p className={cn(
                                "text-xs transition-colors",
                                isActive ? "text-[#D4AF37]" : "text-muted-foreground/50",
                                isCompleted && "text-green-500/80" // Greenish hint for done
                            )}>
                                {isCompleted ? "Terminé" : (isActive ? "Analyse en cours..." : "En attente")}
                            </p>
                        </div>

                        {/* Status Indicator */}
                        <div className="shrink-0">
                            {isCompleted ? (
                                <CheckCircle2 className="h-5 w-5 text-green-500" />
                            ) : isActive ? (
                                <div className="h-4 w-4 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <Circle className="h-4 w-4 text-muted-foreground/20" />
                            )}
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
}
