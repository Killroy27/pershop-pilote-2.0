"use client"

import { OnboardingProvider, useOnboarding } from "@/components/onboarding/OnboardingContext"
import Wizard from "@/components/onboarding/Wizard"
import PremiumLoader from "@/components/PremiumLoader"
import ResultsView from "@/components/ResultsView"
import { Sparkles } from "lucide-react"
import { useState } from "react"

function MainContent() {
  const { data, reset } = useOnboarding()
  const [status, setStatus] = useState<"INTRO" | "WIZARD" | "ANALYZING" | "RESULTS">("INTRO")
  const [results, setResults] = useState(null)

  const handleStart = () => setStatus("WIZARD")

  const handleComplete = async () => {
    setStatus("ANALYZING")
    
    // Construct the narrative
    const textQuery = `Je cherche une tenue pour : ${data.occasion}. 
    Urgence : ${data.urgency}/100. 
    Budget : ${data.budget}. 
    Ma ville : ${data.city}. 
    Mon état d'esprit : ${data.feelings}`

    try {
      const response = await fetch("http://127.0.0.1:8000/api/analyze-and-match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: textQuery })
      })
      const jsonData = await response.json()
      setResults(jsonData)
      setStatus("RESULTS")
    } catch (e) {
      console.error("API Error", e)
      alert("Erreur de connexion avec l'IA")
      setStatus("WIZARD")
    }
  }

  const handleRetry = () => {
    reset()
    setResults(null)
    setStatus("INTRO")
  }

  if (status === "INTRO") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-8 animate-in zoom-in-50 duration-500">
        <div className="bg-amber-500/10 p-6 rounded-full animate-pulse border border-amber-500/20 shadow-[0_0_30px_-10px_rgba(251,191,36,0.2)]">
            <Sparkles className="h-16 w-16 text-amber-400" />
        </div>
        <h1 className="text-5xl md:text-7xl font-serif font-medium tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-600">
          Pershop Pilote
        </h1>
        <p className="text-xl text-muted-foreground/80 max-w-2xl mx-auto font-light">
          L'alliance de la psychologie et de l'IA pour trouver le personal shopper qui vous comprend vraiment.
        </p>
        <button 
          onClick={handleStart}
          className="px-8 py-4 rounded-full bg-gradient-to-r from-amber-400 to-yellow-600 text-black font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_40px_-10px_rgba(251,191,36,0.4)]"
        >
          Commencer l'expérience
        </button>
      </div>
    )
  }

  if (status === "ANALYZING") {
    return <PremiumLoader />
  }

  if (status === "RESULTS" && results) {
    return <ResultsView results={results} onRetry={handleRetry} />
  }

  return <Wizard onComplete={handleComplete} />
}

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-amber-500/30">
        <div className="fixed inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="relative z-10 container mx-auto px-4 py-8">
            <OnboardingProvider>
                <MainContent />
            </OnboardingProvider>
        </div>
    </main>
  )
}
