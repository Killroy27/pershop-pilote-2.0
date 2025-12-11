"use client"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Mic } from "lucide-react"
import { useOnboarding } from "../OnboardingContext"

export default function StepPsychology() {
  const { data, updateData } = useOnboarding()

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Comment vous sentez-vous ?</h2>
        <p className="text-muted-foreground">Dites-nous tout : vos doutes, vos envies, vos complexes...</p>
      </div>

      <div className="relative">
        <Textarea
          placeholder="Ex: Je ne me sens pas très à l'aise avec mon corps depuis ma grossesse, j'ai envie de cacher mes hanches mais d'être élégante..."
          className="min-h-[200px] resize-none text-lg p-6 bg-secondary/30 border-amber-500/20 focus:border-amber-500 transition-all font-light leading-relaxed"
          value={data.feelings}
          onChange={(e) => updateData("feelings", e.target.value)}
        />
        
        <div className="absolute bottom-4 right-4">
          <Button size="icon" variant="ghost" className="rounded-full hover:bg-amber-500/20 hover:text-amber-500">
            <Mic className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      <p className="text-xs text-center text-muted-foreground italic">
        Notre IA "Mirror Agent" analysera ce texte pour détecter votre état émotionnel.
      </p>
    </div>
  )
}
