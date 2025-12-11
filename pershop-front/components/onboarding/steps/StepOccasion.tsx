"use client"

import { Input } from "@/components/ui/input"
import { AnimatePresence, motion } from "framer-motion"
import { Briefcase, GlassWater, Heart, PartyPopper, Plus, Shirt } from "lucide-react"
import { useOnboarding } from "../OnboardingContext"

const occasions = [
  { id: "travail", label: "Travail / Pro", icon: Briefcase },
  { id: "mariage", label: "Mariage", icon: Heart },
  { id: "gala", label: "Gala / Soirée", icon: GlassWater },
  { id: "quotidien", label: "Quotidien", icon: Shirt },
  { id: "date", label: "Date / RDV", icon: PartyPopper },
  { id: "autre", label: "Autre", icon: Plus },
]

export default function StepOccasion() {
  const { data, updateData } = useOnboarding()

  const predefinedLabels = occasions.filter(o => o.id !== "autre").map(o => o.label)
  const isCustom = !predefinedLabels.includes(data.occasion) && data.occasion !== ""
  const isOtherActive = isCustom || data.occasion === "Autre"

  const handleSelect = (label: string) => {
    if (label === "Autre") {
      updateData("occasion", "Autre")
    } else {
      updateData("occasion", label)
    }
  }

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateData("occasion", e.target.value)
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Quelle est l'occasion ?</h2>
        <p className="text-muted-foreground">Pour quel type d'événement cherchez-vous une tenue ?</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {occasions.map((item) => {
          const Icon = item.icon
          // If item is regular, simple check. If item is "Autre", check if custom.
          const isSelected = item.label === "Autre" 
            ? isOtherActive
            : data.occasion === item.label
          
          return (
            <div
              key={item.id}
              onClick={() => handleSelect(item.label)}
              className={`
                cursor-pointer rounded-xl border-2 p-4 flex flex-col items-center justify-center gap-3 transition-all hover:scale-105
                ${isSelected 
                  ? "border-amber-500 bg-amber-500/10 text-amber-500 shadow-[0_0_15px_-5px_rgba(251,191,36,0.3)]" 
                  : "border-muted bg-card hover:border-amber-500/50"}
              `}
            >
              <Icon className="h-8 w-8" />
              <span className="font-medium text-sm">{item.label}</span>
            </div>
          )
        })}
      </div>

      <AnimatePresence>
        {isOtherActive && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-2">
              <Input
                autoFocus
                placeholder="Précisez l'occasion (ex: Baptême, Entretien...)"
                value={data.occasion === "Autre" ? "" : data.occasion}
                onChange={handleCustomChange}
                className="text-lg py-6 border-amber-500/50 focus-visible:ring-amber-500"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
