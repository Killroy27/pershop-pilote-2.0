"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react"
import { useOnboarding } from "./OnboardingContext"

// Steps Components
import StepBudget from "./steps/StepBudget"
import StepLocation from "./steps/StepLocation"
import StepOccasion from "./steps/StepOccasion"
import StepPsychology from "./steps/StepPsychology"
import StepUrgency from "./steps/StepUrgency"

export default function Wizard({ onComplete }: { onComplete: () => void }) {
  const { step, setStep } = useOnboarding()
  
  const totalSteps = 5
  
  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1)
    else onComplete()
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      {/* Progress Bar */}
      <div className="mb-8 space-y-2">
        <div className="flex justify-between text-sm font-medium text-muted-foreground">
          <span>Étape {step} sur {totalSteps}</span>
          <span>{Math.round((step / totalSteps) * 100)}%</span>
        </div>
        <Progress value={(step / totalSteps) * 100} className="h-2" />
      </div>

      {/* Dynamic Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -20, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="border-none shadow-lg bg-card/50 backdrop-blur-sm border border-white/10">
            <CardContent className="p-6 min-h-[400px] flex flex-col justify-center">
              {step === 1 && <StepOccasion />}
              {step === 2 && <StepUrgency />}
              {step === 3 && <StepBudget />}
              {step === 4 && <StepPsychology />}
              {step === 5 && <StepLocation />}
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <Button 
          variant="outline" 
          onClick={prevStep} 
          disabled={step === 1}
          className="w-32"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Retour
        </Button>

        <Button 
          onClick={nextStep}
          className="w-32 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-black font-bold border-none"
        >
          {step === totalSteps ? (
            <>Terminer <CheckCircle2 className="ml-2 h-4 w-4" /></>
          ) : (
            <>Suivant <ArrowRight className="ml-2 h-4 w-4" /></>
          )}
        </Button>
      </div>
    </div>
  )
}
