"use client"

import { Slider } from "@/components/ui/slider"
import { AlarmClock, Calendar, Clock } from "lucide-react"
import { useOnboarding } from "../OnboardingContext"

export default function StepUrgency() {
  const { data, updateData } = useOnboarding()

  const getUrgencyLabel = (val: number) => {
    if (val < 30) return "J'ai le temps (Plusieurs semaines)"
    if (val < 70) return "Bientôt (Quelques jours)"
    return "URGENT ! (C'est pour demain/ce soir)"
  }

  const getUrgencyIcon = (val: number) => {
    if (val < 30) return Calendar
    if (val < 70) return Clock
    return AlarmClock
  }

  const Icon = getUrgencyIcon(data.urgency)

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">C'est pour quand ?</h2>
        <p className="text-muted-foreground">Quel est votre niveau d'urgence ?</p>
      </div>

      <div className="flex flex-col items-center justify-center space-y-6 py-8">
        <div className={`
          p-6 rounded-full bg-secondary transition-all duration-300
          ${data.urgency > 70 ? "text-red-500 animate-pulse bg-red-500/10" : "text-primary"}
        `}>
          <Icon className="h-16 w-16" />
        </div>

        <div className="text-xl font-medium text-center">
          {getUrgencyLabel(data.urgency)}
        </div>

        <Slider
          defaultValue={[data.urgency]}
          max={100}
          step={10}
          onValueChange={(vals) => updateData("urgency", vals[0])}
          className="w-[80%]"
        />
        
        <div className="flex justify-between w-[80%] text-xs text-muted-foreground">
          <span>Pas pressé</span>
          <span>Panique totale</span>
        </div>
      </div>
    </div>
  )
}
