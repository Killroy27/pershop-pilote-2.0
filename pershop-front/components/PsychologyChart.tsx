"use client"

import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer } from "recharts"

type PsychologyChartProps = {
  data: {
    confiance: number
    style: number
    budget: number
    contexte: number
    affinite: number
    colorimetrie: number
    morphologie: number
  }
}

export default function PsychologyChart({ data }: PsychologyChartProps) {
  const chartData = [
    { subject: 'Confiance', A: data.confiance, fullMark: 100 },
    { subject: 'Style', A: data.style, fullMark: 100 },
    { subject: 'Budget', A: data.budget, fullMark: 100 },
    { subject: 'Morphologie', A: data.morphologie, fullMark: 100 },
    { subject: 'Colorimétrie', A: data.colorimetrie, fullMark: 100 },
    { subject: 'Contexte', A: data.contexte, fullMark: 100 },
    { subject: 'Affinité', A: data.affinite, fullMark: 100 },
  ]

  return (
    <div className="h-[300px] w-full flex items-center justify-center relative">
      <div className="absolute inset-0 bg-yellow-500/5 blur-[100px] rounded-full" />
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
          <PolarGrid stroke="rgba(255,255,255,0.1)" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#fbbf24', fontSize: 12, fontWeight: 'bold' }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          <Radar
            name="Votre Profil"
            dataKey="A"
            stroke="#fbbf24"
            fill="#fbbf24"
            fillOpacity={0.3}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
