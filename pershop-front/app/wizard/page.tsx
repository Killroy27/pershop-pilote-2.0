
"use client"

import { OnboardingProvider, useOnboarding } from "@/components/onboarding/OnboardingContext"
import Wizard from "@/components/onboarding/Wizard"
import PremiumLoader from "@/components/PremiumLoader"
import ResultsView from "@/components/ResultsView"
import { analyzeAndMatch } from "@/lib/api"
import { useState } from "react"

function WizardPageContent() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState<any>(null)
  const { data, reset } = useOnboarding()

  const handleComplete = async () => {
    setIsAnalyzing(true)

    try {
      // Construire le texte pour l'analyse backend
      const analysisText = `
        Je cherche un personal shopper pour l'occasion suivante : ${data.occasion}.
        Mon niveau d'urgence est de ${data.urgency}%.
        Mon budget est : ${data.budget}.
        Mes sentiments et attentes : ${data.feelings}.
        Je suis situé(e) à : ${data.city}.
      `.trim()

      // Appeler le backend
      const response = await analyzeAndMatch(analysisText)
      
      // Stocker les résultats
      setResults(response)
    } catch (error) {
      console.error("Erreur lors de l'analyse:", error)
      alert("Une erreur est survenue lors de l'analyse. Veuillez réessayer.")
      setIsAnalyzing(false)
    } finally {
      // setIsAnalyzing(false) // This was moved into the catch block for error cases
    }
  }

  const handleRetry = () => {
    setResults(null)
    reset()
  }

  if (results) {
    return <ResultsView results={results} onRetry={handleRetry} />
  }

  if (isAnalyzing) {
    return <PremiumLoader />
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Wizard onComplete={handleComplete} />
    </div>
  )
}

export default function WizardPage() {
  return (
    <OnboardingProvider>
      <WizardPageContent />
    </OnboardingProvider>
  )
}
