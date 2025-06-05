"use client"
import { Bot, ChevronDown } from "lucide-react"

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

export type AIModel = {
  id: string
  name: string
  description: string
  tier: "free" | "pro" | "enterprise"
  speed: "fast" | "medium" | "slow"
  quality: "high" | "medium" | "low"
}

const aiModels: AIModel[] = [
  {
    id: "gpt-4",
    name: "GPT-4",
    description: "Most capable model for complex UI generation",
    tier: "pro",
    speed: "medium",
    quality: "high",
  },
  {
    id: "gpt-3.5-turbo",
    name: "GPT-3.5 Turbo",
    description: "Fast and efficient for standard UI components",
    tier: "free",
    speed: "fast",
    quality: "medium",
  },
  {
    id: "claude-3",
    name: "Claude 3",
    description: "Excellent for detailed UI specifications",
    tier: "pro",
    speed: "medium",
    quality: "high",
  },
  {
    id: "gemini-pro",
    name: "Gemini Pro",
    description: "Google's advanced model for UI generation",
    tier: "enterprise",
    speed: "slow",
    quality: "high",
  },
]

interface AIModelSelectorProps {
  selectedModel: string
  onModelChange: (modelId: string) => void
}

export function AIModelSelector({ selectedModel, onModelChange }: AIModelSelectorProps) {
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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          <div className="flex items-center gap-2">
            <Bot className="h-4 w-4" />
            <span>{currentModel.name}</span>
            <Badge className={getTierColor(currentModel.tier)}>{currentModel.tier}</Badge>
          </div>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80">
        <DropdownMenuLabel>Select AI Model</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {aiModels.map((model) => (
          <DropdownMenuItem
            key={model.id}
            onClick={() => onModelChange(model.id)}
            className="flex flex-col items-start gap-1 p-3"
          >
            <div className="flex items-center gap-2 w-full">
              <span className="font-medium">{model.name}</span>
              <Badge className={getTierColor(model.tier)}>{model.tier}</Badge>
              {model.id === selectedModel && <Badge variant="secondary">Selected</Badge>}
            </div>
            <p className="text-sm text-muted-foreground">{model.description}</p>
            <div className="flex gap-2 mt-1">
              <Badge variant="outline" className="text-xs">
                Speed: {model.speed}
              </Badge>
              <Badge variant="outline" className="text-xs">
                Quality: {model.quality}
              </Badge>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
