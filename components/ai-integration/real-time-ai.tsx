"use client"

import { useState, useEffect } from "react"
import { Bot, Loader2, Sparkles, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { aiModels } from "@/components/ai-integration/ai-model-selector"

interface RealTimeAIProps {
  prompt: string
  selectedModel: string
  onCodeGenerated: (code: string) => void
  onGenerationStart: () => void
  onGenerationComplete: () => void
}

export function RealTimeAI({
  prompt,
  selectedModel,
  onCodeGenerated,
  onGenerationStart,
  onGenerationComplete,
}: RealTimeAIProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [generationSteps, setGenerationSteps] = useState<string[]>([])
  const [currentStep, setCurrentStep] = useState("")

  const model = aiModels.find((m) => m.id === selectedModel) || aiModels[0]

  useEffect(() => {
    if (!isGenerating) return

    const interval = setInterval(() => {
      setGenerationProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 1
      })
    }, 50)

    return () => clearInterval(interval)
  }, [isGenerating])

  useEffect(() => {
    if (generationProgress === 100) {
      setTimeout(() => {
        setIsGenerating(false)
        onGenerationComplete()
      }, 500)
    }
  }, [generationProgress, onGenerationComplete])

  useEffect(() => {
    if (!isGenerating) return

    const steps = [
      "Analyzing prompt...",
      "Identifying UI components...",
      "Generating component structure...",
      "Applying styling...",
      "Optimizing for responsiveness...",
      "Adding interactivity...",
      "Finalizing code...",
    ]

    setGenerationSteps(steps)

    let currentStepIndex = 0
    setCurrentStep(steps[currentStepIndex])

    const interval = setInterval(() => {
      currentStepIndex++
      if (currentStepIndex < steps.length) {
        setCurrentStep(steps[currentStepIndex])
      } else {
        clearInterval(interval)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [isGenerating])

  const generateCode = () => {
    if (!prompt.trim()) return

    setIsGenerating(true)
    setGenerationProgress(0)
    onGenerationStart()

    // In a real implementation, this would call an actual AI API
    // For now, we'll simulate the generation with a timeout
    setTimeout(() => {
      const generatedCode = `// Generated with ${model.name} from: ${prompt}
import React from 'react';
import { Sparkles, CheckCircle, Star } from 'lucide-react';

function GeneratedComponent() {
  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-blue-950 dark:via-gray-900 dark:to-purple-950 rounded-2xl p-8 shadow-2xl border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-6 mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              AI Generated Component
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Created with ${model.name} • Used ${model.credits} credits
            </p>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
              This component was generated based on your prompt: 
              <span className="font-medium text-blue-600 dark:text-blue-400">
                "${prompt.substring(0, 150)}${prompt.length > 150 ? "..." : ""}"
              </span>
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="h-6 w-6 text-green-500" />
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-lg">Features</h3>
              </div>
              <ul className="text-gray-600 dark:text-gray-400 space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  Responsive design
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  Dark mode support
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  Modern styling
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  Accessible components
                </li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <Star className="h-6 w-6 text-yellow-500" />
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-lg">Technologies</h3>
              </div>
              <ul className="text-gray-600 dark:text-gray-400 space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                  React
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                  Tailwind CSS
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                  TypeScript
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                  Lucide Icons
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="h-6 w-6 text-blue-500" />
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-lg">Model Info</h3>
              </div>
              <ul className="text-gray-600 dark:text-gray-400 space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  Speed: ${model.speed}
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  Quality: ${model.quality}
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  Credits: ${model.credits}
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  Tier: ${model.tier}
                </li>
              </ul>
            </div>
          </div>
          
          <div className="flex gap-4 pt-6 flex-wrap">
            <button className="px-8 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Primary Action
            </button>
            <button className="px-8 py-3 border-2 border-blue-500 text-blue-500 dark:text-blue-400 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all duration-200 font-medium">
              Secondary Action
            </button>
            <button className="px-8 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-all duration-200 font-medium hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GeneratedComponent;`

      onCodeGenerated(generatedCode)
    }, 5000)
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            AI Generation
          </CardTitle>
          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">{model.name}</Badge>
        </div>
        <CardDescription>Real-time AI code generation with {model.name}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isGenerating ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Generating code...</span>
                <span>{generationProgress}%</span>
              </div>
              <Progress value={generationProgress} className="h-2" />
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
                <span className="font-medium">{currentStep}</span>
              </div>

              <div className="space-y-2">
                {generationSteps.map((step, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-2 text-sm ${
                      step === currentStep
                        ? "text-blue-600 dark:text-blue-400"
                        : generationSteps.indexOf(step) < generationSteps.indexOf(currentStep)
                          ? "text-green-600 dark:text-green-400"
                          : "text-gray-400 dark:text-gray-600"
                    }`}
                  >
                    {generationSteps.indexOf(step) < generationSteps.indexOf(currentStep) ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : step === currentStep ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <div className="h-4 w-4 rounded-full border-2 border-gray-300 dark:border-gray-600" />
                    )}
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <Textarea
              placeholder="Your prompt is ready for generation..."
              value={prompt}
              readOnly
              className="min-h-[100px] resize-none"
            />

            <Button
              onClick={generateCode}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              disabled={!prompt.trim()}
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Generate with {model.name}
            </Button>

            <div className="text-sm text-muted-foreground">
              This will use {model.credits} credits from your account.
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
