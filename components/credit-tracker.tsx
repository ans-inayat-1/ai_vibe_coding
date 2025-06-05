"use client"
import { Coins, Info, CreditCard } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useRouter } from "next/navigation"

export interface CreditInfo {
  used: number
  total: number
  plan: "free" | "pro" | "enterprise"
}

interface CreditTrackerProps {
  credits: CreditInfo
  onUpgrade?: () => void
}

export function CreditTracker({ credits, onUpgrade }: CreditTrackerProps) {
  const router = useRouter()
  const remaining = credits.total - credits.used
  const percentage = (credits.used / credits.total) * 100

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case "free":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
      case "pro":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "enterprise":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  const getProgressColor = () => {
    if (percentage >= 90) return "bg-red-500"
    if (percentage >= 70) return "bg-yellow-500"
    return "bg-green-500"
  }

  const handleUpgrade = () => {
    if (onUpgrade) {
      onUpgrade()
    } else {
      router.push("/billing/upgrade")
    }
  }

  const handleBuyCredits = () => {
    router.push("/billing/purchase")
  }

  return (
    <Card className="w-full shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Coins className="h-4 w-4" />
            <CardTitle className="text-sm font-medium">Credits</CardTitle>
            <Badge className={getPlanColor(credits.plan)} variant="secondary">
              {credits.plan}
            </Badge>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Credits are used for AI model requests</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Used</span>
          <span className="font-medium">
            {credits.used} / {credits.total}
          </span>
        </div>
        <Progress value={percentage} className={`h-2 ${getProgressColor()}`} />
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{remaining} credits remaining</span>
          <div className="flex gap-2">
            {credits.plan === "free" && remaining < 5 && (
              <Button size="sm" variant="outline" onClick={handleUpgrade}>
                Upgrade
              </Button>
            )}
            <Button size="sm" variant="outline" onClick={handleBuyCredits}>
              <CreditCard className="h-3 w-3 mr-1" />
              Buy Credits
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
