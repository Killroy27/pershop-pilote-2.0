"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { MapPin, RefreshCw, Star, Zap } from "lucide-react"
import PsychologyChart from "./PsychologyChart"

type ResultsViewProps = {
  results: any
  onRetry: () => void
}

export default function ResultsView({ results, onRetry }: ResultsViewProps) {
  const { profile_analysis, context_analysis, shoppers_found } = results
  const emotional = profile_analysis.emotional_profile

  // Helper to map urgency to score
  const getBudgetScore = (b: string) => {
    if (b === 'Low') return 30
    if (b === 'Medium') return 60
    if (b === 'High') return 85
    return 100
  }

  const chartData = {
    confiance: emotional.confidence_level,
    style: emotional.openness_to_change, // Proxy
    budget: getBudgetScore(context_analysis.constraints.budget_range),
    contexte: context_analysis.constraints.urgency_score,
    affinite: emotional.social_sensitivity, // Proxy
    colorimetrie: 50, // Placeholder
    morphologie: 50 // Placeholder
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      
      {/* HEADER ANALYSIS (Radar & Context) */}
      <div className="grid md:grid-cols-2 gap-6 items-center">
        {/* Mirror Agent VISUAL */}
        <div className="relative">
             <div className="text-center mb-2">
                <h3 className="text-xl font-bold text-primary font-serif tracking-wide">Votre Empreinte Stylistique</h3>
                <p className="text-sm text-muted-foreground">Analyse dimensionnelle par Mirror Agent</p>
             </div>
             <PsychologyChart data={chartData} />
        </div>

        {/* Context Genius Card */}
        <Card className="bg-card/50 backdrop-blur border-amber-500/20 h-full flex flex-col justify-center shadow-[0_0_20px_-10px_rgba(251,191,36,0.15)]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary font-serif">
              <Zap className="h-5 w-5" /> Context Genius
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center border-b border-border/50 pb-2">
              <span className="text-muted-foreground">Urgence détectée</span>
              <Badge variant="outline" className={`text-sm ${context_analysis.constraints.urgency_score > 70 ? "border-amber-500 text-amber-500" : "border-muted"}`}>
                {context_analysis.constraints.urgency_score}/100
              </Badge>
            </div>
            <div className="flex justify-between items-center border-b border-border/50 pb-2">
              <span className="text-muted-foreground">Occasion</span>
              <span className="font-medium text-foreground">{context_analysis.constraints.occasion}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Ville Cible</span>
              <span className="font-medium text-foreground">{context_analysis.constraints.location_city}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Separator className="my-8 bg-border/50" />

      {/* SHOPPERS GRID */}
      <h2 className="text-3xl font-serif font-bold text-center tracking-tight text-primary">Vos Matches Idéaux</h2>
      
      <div className="grid md:grid-cols-3 gap-6">
        {shoppers_found.map((shopper: any, i: number) => (
          <Card key={i} className="group hover:border-amber-500/50 transition-all duration-300 hover:-translate-y-2 overflow-hidden relative bg-secondary/20">
            {i === 0 && (
              <div className="absolute top-0 right-0 bg-primary text-black text-xs font-bold px-3 py-1 rounded-bl-lg z-10 shadow-lg">
                #1 TOP MATCH
              </div>
            )}
            
            <div className="h-24 bg-gradient-to-br from-neutral-900 to-neutral-800 group-hover:from-amber-900/20 group-hover:to-neutral-900 transition-colors" />
            
            <CardContent className="-mt-12 relative z-10">
              <div className="flex justify-center mb-4">
                <div className="h-24 w-24 rounded-full bg-neutral-200 border-4 border-card flex items-center justify-center text-3xl font-bold text-neutral-500">
                  {shopper.shopper_name.charAt(0)}
                </div>
              </div>
              
              <div className="text-center space-y-2 mb-6">
                <h3 className="text-xl font-bold font-serif">{shopper.shopper_name}</h3>
                <div className="flex items-center justify-center text-muted-foreground text-sm gap-1">
                  <MapPin className="h-3 w-3" /> {shopper.location}
                </div>
                <div className="flex items-center justify-center gap-1 text-primary font-bold text-lg">
                  <Star className="h-5 w-5 fill-current" /> {shopper.match_score}%
                </div>
              </div>

              <div className="bg-secondary/40 p-4 rounded-lg text-sm mb-4 min-h-[80px] italic text-muted-foreground border border-white/5">
                "{shopper.why_this_match}"
              </div>

              <div className="flex flex-wrap gap-2 justify-center">
                {shopper.tags.map((tag: string) => (
                  <Badge key={tag} variant="secondary" className="text-xs bg-neutral-800 hover:bg-neutral-700">{tag}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center pt-8 pb-16">
        <Button size="lg" variant="outline" onClick={onRetry} className="gap-2 border-primary/50 text-primary hover:bg-primary hover:text-black transition-colors">
          <RefreshCw className="h-4 w-4" /> Recommencer l'analyse
        </Button>
      </div>
    </div>
  )
}
