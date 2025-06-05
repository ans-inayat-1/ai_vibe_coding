"use client"
import { Bot, ChevronDown, Zap, Crown, Sparkles } from "lucide-react"
import type React from "react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export type AIModel = {
  id: string
  name: string
  description: string
  tier: "free" | "pro" | "enterprise"
  speed: "fast" | "medium" | "slow"
  quality: "high" | "medium" | "low"
  credits: number
  icon?: React.ReactNode
  capabilities: string[]
}

const aiModels: AIModel[] = [
  {
    id: "vizcode-1-free",
    name: "VizCode 1 Free",
    description: "Fast and efficient for basic UI components",
    tier: "free",
    speed: "fast",
    quality: "medium",
    credits: 1,
    icon: <Zap className="h-3 w-3" />,
    capabilities: ["Basic UI components", "Simple layouts", "Standard styling"],
  },
  {
    id: "vizcode-1.5-booster",
    name: "VizCode 1.5 Booster",
    description: "Enhanced model with better UI generation capabilities",
    tier: "pro",
    speed: "medium",
    quality: "high",
    credits: 3,
    icon: <Sparkles className="h-3 w-3" />,
    capabilities: ["Advanced UI components", "Complex layouts", "Custom animations", "Responsive design"],
  },
  {
    id: "chatgpt-4",
    name: "ChatGPT 4",
    description: "Most capable model for complex UI generation",
    tier: "pro",
    speed: "medium",
    quality: "high",
    credits: 5,
    icon: <Bot className="h-3 w-3" />,
    capabilities: [
      "Advanced UI components",
      "Complex layouts",
      "Custom animations",
      "Responsive design",
      "Accessibility features",
    ],
  },
  {
    id: "claude-4-opus",
    name: "Claude 4 Opus",
    description: "Premium model for sophisticated UI designs",
    tier: "enterprise",
    speed: "slow",
    quality: "high",
    credits: 8,
    icon: <Crown className="h-3 w-3" />,
    capabilities: [
      "Advanced UI components",
      "Complex layouts",
      "Custom animations",
      "Responsive design",
      "Accessibility features",
      "Advanced interactions",
      "State management",
    ],
  },
  {
    id: "claude-3.5-sonnet",
    name: "Claude 3.5 Sonnet",
    description: "Excellent for detailed UI specifications",
    tier: "pro",
    speed: "medium",
    quality: "high",
    credits: 4,
    icon: <Sparkles className="h-3 w-3" />,
    capabilities: [
      "Advanced UI components",
      "Complex layouts",
      "Custom animations",
      "Responsive design",
      "Accessibility features",
    ],
  },
]

interface AIModelSelectorProps {
  selectedModel: string
  onModelChange: (modelId: string) => void
  availableCredits: number
}

export function AIModelSelector({ selectedModel, onModelChange, availableCredits }: AIModelSelectorProps) {
  const currentModel = aiModels.find((model) => model.id === selectedModel) || aiModels[0]

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "free":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "pro":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "enterprise":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const canUseModel = (model: AIModel) => {
    return availableCredits >= model.credits
  }

  return (
    <TooltipProvider>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            <div className="flex items-center gap-2">
              {currentModel.icon}
              <span className="truncate">{currentModel.name}</span>
              <Badge className={getTierColor(currentModel.tier)} variant="secondary">
                {currentModel.credits}c
              </Badge>
            </div>
            <ChevronDown className="h-4 w-4 flex-shrink-0" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-80">
          <DropdownMenuLabel>Select AI Model</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {aiModels.map((model) => {
            const canUse = canUseModel(model)
            return (
              <Tooltip key={model.id}>
                <TooltipTrigger asChild>
                  <DropdownMenuItem
                    onClick={() => canUse && onModelChange(model.id)}
                    className={`flex flex-col items-start gap-1 p-3 ${!canUse ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={!canUse}
                  >
                    <div className="flex items-center gap-2 w-full">
                      {model.icon}
                      <span className="font-medium">{model.name}</span>
                      <div className="flex gap-1 ml-auto">
                        <Badge className={getTierColor(model.tier)} variant="secondary">
                          {model.tier}
                        </Badge>
                        <Badge variant="outline">{model.credits}c</Badge>
                        {model.id === selectedModel && <Badge variant="default">Selected</Badge>}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{model.description}</p>
                    <div className="flex gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        Speed: {model.speed}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        Quality: {model.quality}
                      </Badge>
                      {!canUse && (
                        <Badge variant="destructive" className="text-xs">
                          Insufficient credits
                        </Badge>
                      )}
                    </div>
                  </DropdownMenuItem>
                </TooltipTrigger>
                <TooltipContent side="right" className="w-64">
                  <div className="space-y-2">
                    <h4 className="font-semibold">Capabilities:</h4>
                    <ul className="text-sm space-y-1">
                      {model.capabilities.map((capability, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                          {capability}
                        </li>
                      ))}
                    </ul>
                  </div>
                </TooltipContent>
              </Tooltip>
            )
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </TooltipProvider>
  )
}

export { aiModels }
