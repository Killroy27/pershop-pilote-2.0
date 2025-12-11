"use client"

import { motion } from "framer-motion"
import { Brain, Check, Combine, Lightbulb, Loader2, Palette, ScanFace } from "lucide-react"
import { useEffect, useState } from "react"

const agents = [
  { id: 1, name: "Agent Mirror", sub: "Analyse émotionnelle...", icon: Brain },
  { id: 2, name: "Context Genius", sub: "Contexte situationnel...", icon: Lightbulb },
  { id: 3, name: "Chromatic AI", sub: "Harmonie colorimétrique...", icon: Palette },
  { id: 4, name: "Morpho-Match", sub: "Analyse morphologique...", icon: ScanFace },
  { id: 5, name: "Harmony Engine", sub: "Matching final...", icon: Combine },
]

export default function PremiumLoader() {
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    // Simulation de la progression des agents (environ 800ms par agent)
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev < agents.length ? prev + 1 : prev))
    }, 800)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-[600px] w-full max-w-2xl mx-auto space-y-12">
      
      {/* HEADER */}
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl md:text-3xl font-serif text-center tracking-wide"
      >
        PERSHOP PILOTE 2.0 <span className="text-muted-foreground">matching engine.</span>
      </motion.h2>

      {/* GOLD CIRCULAR LOADER */}
      <div className="relative h-64 w-64 flex items-center justify-center">
        {/* Background Circle */}
        <svg className="absolute inset-0 h-full w-full rotate-[-90deg]">
          <circle
            cx="128"
            cy="128"
            r="120"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-white/5"
          />
          {/* Progress Circle (Gold) */}
          <motion.circle
            cx="128"
            cy="128"
            r="120"
            fill="none"
            stroke="#fbbf24" // Amber-400
            strokeWidth="4"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: (activeStep + 1) / agents.length }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{ filter: "drop-shadow(0 0 8px rgba(251, 191, 36, 0.5))" }}
          />
        </svg>

        {/* Center Text */}
        <div className="text-center space-y-2 z-10">
          <div className="text-amber-400 animate-pulse">
            <Loader2 className="h-8 w-8 mx-auto animate-spin" />
          </div>
          <p className="text-lg font-medium tracking-tight">Analyse en cours...</p>
        </div>
        
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-amber-400/10 blur-[60px] rounded-full" />
      </div>

      {/* AGENT CHECKLIST */}
      <div className="w-full max-w-sm space-y-6">
        {agents.map((agent, index) => {
          const isActive = index === activeStep
          const isDone = index < activeStep
          const isPending = index > activeStep

          return (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: isPending ? 0.3 : 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-4"
            >
              {/* STATUS ICON */}
              <div className="mt-1">
                {isDone ? (
                  <div className="h-5 w-5 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center border border-green-500/50">
                    <Check className="h-3 w-3" />
                  </div>
                ) : isActive ? (
                  <div className="h-5 w-5 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
                ) : (
                  <div className="h-5 w-5 rounded-full border border-white/20" />
                )}
              </div>

              {/* TEXT CONTENT */}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <agent.icon className={`h-4 w-4 ${isActive ? 'text-amber-400' : 'text-muted-foreground'}`} />
                  <h3 className={`font-semibold text-base ${isActive ? 'text-white' : 'text-muted-foreground'}`}>
                    {agent.name}
                  </h3>
                </div>
                <p className={`text-sm mt-1 ${isActive ? 'text-amber-400/80' : 'text-muted-foreground/50'}`}>
                  {isDone ? "Terminé" : agent.sub}
                </p>
              </div>
            </motion.div>
          )
        })}
      </div>

    </div>
  )
}
