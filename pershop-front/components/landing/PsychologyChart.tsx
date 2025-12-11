"use client";

import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer } from "recharts";

const data = [
    { subject: "Confiance", A: 120, fullMark: 150 },
    { subject: "Style", A: 98, fullMark: 150 },
    { subject: "Budget", A: 86, fullMark: 150 },
    { subject: "Morphologie", A: 99, fullMark: 150 },
    { subject: "Colorimétrie", A: 85, fullMark: 150 },
    { subject: "Contexte", A: 65, fullMark: 150 },
    { subject: "Affinité", A: 85, fullMark: 150 },
];

export function PsychologyChart() {
    return (
        <div className="h-[350px] w-full max-w-[500px] animate-in fade-in zoom-in duration-1000 delay-300 relative">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                    <PolarGrid stroke="rgba(212, 175, 55, 0.2)" />
                    <PolarAngleAxis
                        dataKey="subject"
                        tick={{ fill: "#D4AF37", fontSize: 13, fontFamily: "var(--font-sans)" }}
                    />
                    <Radar
                        name="Profil"
                        dataKey="A"
                        stroke="#D4AF37"
                        strokeWidth={2}
                        fill="#D4AF37"
                        fillOpacity={0.15}
                    />
                </RadarChart>
            </ResponsiveContainer>

            {/* Decorative center glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#D4AF37] rounded-full blur-[60px] opacity-20 pointer-events-none" />
        </div>
    );
}
