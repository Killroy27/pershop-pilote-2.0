"use client";

import { motion } from "framer-motion";

export function MatchingLoader() {
    return (
        <div className="relative w-64 h-64 flex items-center justify-center">
            {/* Background Circle */}
            <svg className="absolute w-full h-full transform -rotate-90">
                <circle
                    cx="128"
                    cy="128"
                    r="120"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    className="text-muted/20"
                />

                {/* Animated Gradient Circle */}
                <motion.circle
                    cx="128"
                    cy="128"
                    r="120"
                    fill="none"
                    stroke="url(#gold-gradient)"
                    strokeWidth="6" // Slightly thicker for the active part
                    strokeLinecap="round"
                    initial={{ pathLength: 0, rotate: 0 }}
                    animate={{
                        pathLength: [0.1, 0.6, 0.8, 1], // Variable length for "thinking" effect
                        rotate: 360
                    }}
                    transition={{
                        duration: 3,
                        ease: "linear",
                        repeat: Infinity,
                    }}
                />

                {/* Gradient Definition */}
                <defs>
                    <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FCCA2E" /> {/* Lighter Gold */}
                        <stop offset="100%" stopColor="#D4AF37" /> {/* Darker Gold */}
                    </linearGradient>
                </defs>
            </svg>

            {/* Inner Glow Pulse */}
            <div className="absolute inset-0 bg-[#D4AF37]/5 rounded-full blur-3xl animate-pulse" />

            {/* Center Text */}
            <div className="z-10 text-center space-y-2">
                <span className="text-xl font-serif font-medium text-foreground tracking-wide">
                    Analyse en cours...
                </span>
            </div>
        </div>
    );
}
