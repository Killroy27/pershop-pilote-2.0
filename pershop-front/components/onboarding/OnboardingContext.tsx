"use client"

import React, { createContext, useContext, useState } from "react"

type OnboardingData = {
  occasion: string
  urgency: number
  budget: string
  feelings: string
  city: string
}

type OnboardingContextType = {
  step: number
  setStep: (step: number) => void
  data: OnboardingData
  updateData: (key: keyof OnboardingData, value: any) => void
  reset: () => void
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined)

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [step, setStep] = useState(1)
  const [data, setData] = useState<OnboardingData>({
    occasion: "",
    urgency: 50,
    budget: "Medium",
    feelings: "",
    city: ""
  })

  const updateData = (key: keyof OnboardingData, value: any) => {
    setData((prev) => ({ ...prev, [key]: value }))
  }

  const reset = () => {
    setStep(1)
    setData({
      occasion: "",
      urgency: 50,
      budget: "Medium",
      feelings: "",
      city: ""
    })
  }

  return (
    <OnboardingContext.Provider value={{ step, setStep, data, updateData, reset }}>
      {children}
    </OnboardingContext.Provider>
  )
}

export function useOnboarding() {
  const context = useContext(OnboardingContext)
  if (!context) {
    throw new Error("useOnboarding must be used within an OnboardingProvider")
  }
  return context
}
