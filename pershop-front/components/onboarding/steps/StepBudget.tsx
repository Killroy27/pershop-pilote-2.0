"use client"

import { useOnboarding } from "../OnboardingContext"

const budgets = [
  { value: "Low", label: "Petit Budget", desc: "< 200€" },
  { value: "Medium", label: "Confortable", desc: "200€ - 800€" },
  { value: "High", label: "Premium", desc: "800€ - 2000€" },
  { value: "Luxury", label: "Luxe / Illimité", desc: "> 2000€" },
]

export default function StepBudget() {
  const { data, updateData } = useOnboarding()

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Quel est votre budget ?</h2>
        <p className="text-muted-foreground">Pour l'ensemble de la tenue (hors honoraires shopper)</p>
      </div>

      <div className="space-y-3">
        {budgets.map((item) => {
          const isSelected = data.budget === item.value
          return (
            <div
              key={item.value}
              onClick={() => updateData("budget", item.value)}
              className={`
                cursor-pointer p-4 rounded-lg border-2 flex justify-between items-center transition-all
                ${isSelected 
                  ? "border-amber-500 bg-amber-500/10 shadow-[0_0_15px_-5px_rgba(251,191,36,0.3)]" 
                  : "border-muted bg-card hover:bg-secondary"}
              `}
            >
              <div className="flex flex-col">
                <span className={`font-semibold text-lg ${isSelected ? "text-amber-500" : ""}`}>{item.label}</span>
                <span className="text-sm text-muted-foreground">{item.desc}</span>
              </div>
              
              <div className={`
                h-6 w-6 rounded-full border-2 flex items-center justify-center
                ${isSelected ? "border-amber-500" : "border-gray-400"}
              `}>
                {isSelected && <div className="h-3 w-3 rounded-full bg-amber-500" />}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
