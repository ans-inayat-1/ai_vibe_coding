"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Download, Share2, Smartphone, Tablet, Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const generationSteps = [
  "Analyzing your request...",
  "Planning the architecture...",
  "Generating components...",
  "Styling the interface...",
  "Adding interactions...",
  "Optimizing performance...",
  "Finalizing the build...",
]

export default function GeneratePage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [previewMode, setPreviewMode] = useState<"desktop" | "tablet" | "mobile">("desktop")

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < generationSteps.length - 1) {
          return prev + 1
        } else {
          setIsComplete(true)
          clearInterval(interval)
          return prev
        }
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const getPreviewWidth = () => {
    switch (previewMode) {
      case "mobile":
        return "375px"
      case "tablet":
        return "768px"
      default:
        return "100%"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-orange-400">
      {/* Header */}
      <header className="relative z-10 flex items-center justify-between p-6">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" className="text-white hover:bg-white/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <div className="text-white">
            <h1 className="text-xl font-semibold">Generating your app...</h1>
            <p className="text-white/70 text-sm">SaaS Landing Page</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button className="bg-black text-white hover:bg-black/80">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 mx-6 mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Generation Progress */}
          <div className="lg:col-span-1">
            <Card className="bg-white/95 backdrop-blur-sm shadow-2xl h-full">
              <CardContent className="p-6">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-2">AI Generation</h2>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${((currentStep + 1) / generationSteps.length) * 100}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    {Math.round(((currentStep + 1) / generationSteps.length) * 100)}% complete
                  </p>
                </div>

                <div className="space-y-4">
                  {generationSteps.map((step, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          index < currentStep ? "bg-green-500" : index === currentStep ? "bg-blue-500" : "bg-gray-200"
                        }`}
                      >
                        {index < currentStep ? (
                          <div className="w-3 h-3 bg-white rounded-full" />
                        ) : index === currentStep ? (
                          <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                        ) : (
                          <div className="w-3 h-3 bg-gray-400 rounded-full" />
                        )}
                      </div>
                      <span className={`text-sm ${index <= currentStep ? "text-gray-900" : "text-gray-400"}`}>
                        {step}
                      </span>
                    </div>
                  ))}
                </div>

                {isComplete && (
                  <div className="mt-8 p-4 bg-green-50 rounded-lg border border-green-200">
                    <h3 className="font-semibold text-green-800 mb-2">Generation Complete! 🎉</h3>
                    <p className="text-sm text-green-700">Your app is ready for preview and deployment.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Preview */}
          <div className="lg:col-span-2">
            <Card className="bg-white/95 backdrop-blur-sm shadow-2xl h-full">
              <CardContent className="p-6 h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Live Preview</h2>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{previewMode}</Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPreviewMode("desktop")}
                      className={previewMode === "desktop" ? "bg-gray-100" : ""}
                    >
                      <Monitor className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPreviewMode("tablet")}
                      className={previewMode === "tablet" ? "bg-gray-100" : ""}
                    >
                      <Tablet className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPreviewMode("mobile")}
                      className={previewMode === "mobile" ? "bg-gray-100" : ""}
                    >
                      <Smartphone className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex-1 border rounded-lg overflow-hidden bg-white">
                  <div className="h-full mx-auto transition-all duration-300" style={{ width: getPreviewWidth() }}>
                    {isComplete ? (
                      <iframe
                        src="/preview/saas-landing"
                        className="w-full h-full border-0"
                        title="Generated App Preview"
                      />
                    ) : (
                      <div className="h-full flex items-center justify-center bg-gray-50">
                        <div className="text-center">
                          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                          <p className="text-gray-600">Generating your app...</p>
                          <p className="text-sm text-gray-400 mt-2">{generationSteps[currentStep]}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
