"use client"

import { Input } from "@/components/ui/input"
import { MapPin } from "lucide-react"
import { useOnboarding } from "../OnboardingContext"

export default function StepLocation() {
  const { data, updateData } = useOnboarding()

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Où êtes-vous ?</h2>
        <p className="text-muted-foreground">Pour trouver les meilleurs experts près de chez vous.</p>
      </div>

      <div className="max-w-xs mx-auto relative">
        <div className="absolute left-3 top-3 text-muted-foreground">
          <MapPin className="h-5 w-5" />
        </div>
        <Input
          placeholder="Ville ou Code Postal"
          className="pl-10 h-12 text-lg"
          value={data.city}
          onChange={(e) => updateData("city", e.target.value)}
        />
      </div>

      <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-lg text-sm text-amber-400 text-center">
        💡 Notre agent "Geo-Sync" calculera la distance optimale avec les shoppers.
      </div>
    </div>
  )
}
