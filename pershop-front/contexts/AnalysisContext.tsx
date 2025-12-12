"use client"

import { createContext, ReactNode, useContext, useState } from 'react'

type AnalysisData = {
  mood?: string
  objective?: string
  budget?: number[]
  occasion?: string
  selectedStyles?: string[]
  selectedBrands?: string[]
  description?: string
  photos?: File[]
}

type AnalysisResults = {
  profile_analysis: any
  context_analysis: any
  shoppers_found: any[]
}

type AnalysisContextType = {
  analysisData: AnalysisData
  updateAnalysisData: (data: Partial<AnalysisData>) => void
  results: AnalysisResults | null
  setResults: (results: AnalysisResults | null) => void
  reset: () => void
}

const AnalysisContext = createContext<AnalysisContextType | undefined>(undefined)

export function AnalysisProvider({ children }: { children: ReactNode }) {
  const [analysisData, setAnalysisData] = useState<AnalysisData>({})
  const [results, setResults] = useState<AnalysisResults | null>(null)

  const updateAnalysisData = (data: Partial<AnalysisData>) => {
    setAnalysisData(prev => ({ ...prev, ...data }))
  }

  const reset = () => {
    setAnalysisData({})
    setResults(null)
  }

  return (
    <AnalysisContext.Provider value={{ analysisData, updateAnalysisData, results, setResults, reset }}>
      {children}
    </AnalysisContext.Provider>
  )
}

export function useAnalysis() {
  const context = useContext(AnalysisContext)
  if (!context) {
    throw new Error('useAnalysis must be used within an AnalysisProvider')
  }
  return context
}
