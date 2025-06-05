"use client"

import { useState } from "react"
import { Code, Sparkles, Download, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThemeToggle } from "@/components/theme-toggle"
import { TemplateGallery, type Template } from "@/components/template-gallery"
import { SettingsPanel, type UserSettings } from "@/components/settings-panel"
import { FileStatusList, type FileStatus } from "@/components/file-status"
import { AIModelSelector, aiModels } from "@/components/ai-integration/ai-model-selector"
import { ProjectHistory, type ProjectHistoryItem } from "@/components/project-history"
import { CreditTracker, type CreditInfo } from "@/components/credit-tracker"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { RealTimeAI } from "@/components/ai-integration/real-time-ai"
import { CollaborationPanel } from "@/components/collaboration/collaboration-panel"
import { ExportPanel } from "@/components/export/export-panel"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useRouter } from "next/navigation"

export default function AIVibeBuilder() {
  const [prompt, setPrompt] = useState("")
  const [selectedModel, setSelectedModel] = useState("vizcode-1-free")
  const [credits, setCredits] = useState<CreditInfo>({
    used: 12,
    total: 50,
    plan: "free",
  })
  const [code, setCode] = useState(`// Welcome to AI Vibe Builder
// Your generated code will appear here

import React from 'react';
import { Sparkles } from 'lucide-react';

function WelcomeComponent() {
  return (
    <div className="flex items-center justify-center min-h-[400px] p-8 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-950">
      <div className="text-center space-y-6 max-w-2xl">
        <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mx-auto flex items-center justify-center shadow-lg">
          <Sparkles className="w-10 h-10 text-white" />
        </div>
        <div className="space-y-3">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
            AI Vibe Builder
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            Transform your ideas into beautiful, functional UI components with the power of AI. 
            Describe your vision and watch it come to life.
          </p>
        </div>
        <div className="flex gap-3 justify-center flex-wrap">
          <button className="px-8 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
            Get Started
          </button>
          <button className="px-8 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 font-medium">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}

export default WelcomeComponent;`)
  const [isGenerating, setIsGenerating] = useState(false)
  const [showPreviewUpdate, setShowPreviewUpdate] = useState(false)
  const [fileStatuses, setFileStatuses] = useState<FileStatus[]>([])
  const [projectHistory, setProjectHistory] = useState<ProjectHistoryItem[]>([])
  const [settings, setSettings] = useState<UserSettings>({
    fontSize: 14,
    autoComplete: true,
    livePreview: true,
    editorTheme: "vs-dark",
    indentSize: 2,
  })
  const [showCollaboration, setShowCollaboration] = useState(false)
  const [showExport, setShowExport] = useState(false)

  const router = useRouter()

  const handleTemplateSelect = (template: Template) => {
    setPrompt(template.prompt)
  }

  const handleRestoreProject = (item: ProjectHistoryItem) => {
    setPrompt(item.prompt)
    setSelectedModel(item.model)
    setCode(item.code)
  }

  const handleDeleteProject = (id: string) => {
    setProjectHistory((prev) => prev.filter((item) => item.id !== id))
  }

  const handleGenerationStart = () => {
    setIsGenerating(true)

    // Set up initial file statuses
    const files: FileStatus[] = [
      { name: "component.jsx", status: "pending" },
      { name: "styles.css", status: "pending" },
      { name: "utils.js", status: "pending" },
    ]
    setFileStatuses(files)

    // Simulate file generation with delays
    setTimeout(() => {
      setFileStatuses((prev) =>
        prev.map((file) => (file.name === "component.jsx" ? { ...file, status: "generating" } : file)),
      )

      setTimeout(() => {
        setFileStatuses((prev) =>
          prev.map((file) => (file.name === "component.jsx" ? { ...file, status: "completed" } : file)),
        )

        setFileStatuses((prev) =>
          prev.map((file) => (file.name === "styles.css" ? { ...file, status: "generating" } : file)),
        )

        setTimeout(() => {
          setFileStatuses((prev) =>
            prev.map((file) => (file.name === "styles.css" ? { ...file, status: "completed" } : file)),
          )

          setFileStatuses((prev) =>
            prev.map((file) => (file.name === "utils.js" ? { ...file, status: "generating" } : file)),
          )

          setTimeout(() => {
            setFileStatuses((prev) =>
              prev.map((file) => (file.name === "utils.js" ? { ...file, status: "completed" } : file)),
            )
          }, 800)
        }, 1200)
      }, 1500)
    }, 500)
  }

  const handleCodeGenerated = (generatedCode: string) => {
    setCode(generatedCode)
    setShowPreviewUpdate(true)

    // Add to project history
    const historyItem: ProjectHistoryItem = {
      id: Date.now().toString(),
      prompt,
      model: selectedModel,
      timestamp: new Date(),
      code: generatedCode,
    }
    setProjectHistory((prev) => [historyItem, ...prev.slice(0, 9)]) // Keep last 10 items

    setTimeout(() => setShowPreviewUpdate(false), 1000)
  }

  const handleGenerationComplete = () => {
    setIsGenerating(false)

    // Deduct credits
    const selectedModelData = aiModels.find((model) => model.id === selectedModel)
    const requiredCredits = selectedModelData?.credits || 1

    setCredits((prev) => ({
      ...prev,
      used: prev.used + requiredCredits,
    }))
  }

  const availableCredits = credits.total - credits.used

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-950">
      {/* Navbar */}
      <header className="flex items-center h-16 px-6 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
            <Code className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">AI Vibe Builder</h1>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <TemplateGallery onSelectTemplate={handleTemplateSelect} />
          <ProjectHistory
            history={projectHistory}
            onRestoreProject={handleRestoreProject}
            onDeleteProject={handleDeleteProject}
          />

          <Dialog open={showCollaboration} onOpenChange={setShowCollaboration}>
            <DialogTrigger asChild>
              <Button variant="outline" className="shadow-sm">
                <Share2 className="h-4 w-4 mr-2" />
                Collaborate
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px]">
              <DialogHeader>
                <DialogTitle>Collaboration</DialogTitle>
                <DialogDescription>Work together with your team in real-time</DialogDescription>
              </DialogHeader>
              <div className="mt-4">
                <CollaborationPanel />
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={showExport} onOpenChange={setShowExport}>
            <DialogTrigger asChild>
              <Button variant="outline" className="shadow-sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Export Project</DialogTitle>
                <DialogDescription>Export your project in various formats</DialogDescription>
              </DialogHeader>
              <div className="mt-4">
                <ExportPanel />
              </div>
            </DialogContent>
          </Dialog>

          <SettingsPanel settings={settings} onSettingsChange={setSettings} />
          <ThemeToggle />

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" alt="User" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">John Doe</p>
                  <p className="text-xs leading-none text-muted-foreground">john@example.com</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push("/profile")}>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-950">
        {/* Navbar */}
        {/* Main Content */}
        {/* Left Sidebar */}
        <div className="w-full md:w-80 lg:w-96 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col">
          <div className="p-6 flex flex-col h-full space-y-6">
            {/* Credit Tracker */}
            <CreditTracker credits={credits} />

            {/* AI Model Selection */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">AI Model</h2>
              <AIModelSelector
                selectedModel={selectedModel}
                onModelChange={setSelectedModel}
                availableCredits={availableCredits}
              />
            </div>

            {/* Prompt Input */}
            <div className="flex-1 flex flex-col">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Describe Your UI</h2>
              <Textarea
                placeholder="Describe the UI component you want to create. Be specific about layout, styling, functionality, and any special features..."
                className="flex-1 resize-none min-h-[200px] border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                style={{ fontSize: `${settings.fontSize}px` }}
              />

              <RealTimeAI
                prompt={prompt}
                selectedModel={selectedModel}
                onCodeGenerated={handleCodeGenerated}
                onGenerationStart={handleGenerationStart}
                onGenerationComplete={handleGenerationComplete}
              />
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="hidden md:flex flex-col flex-1 bg-white dark:bg-gray-900">
          <Tabs defaultValue="preview" className="flex flex-col flex-1">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
              <TabsList className="bg-white dark:bg-gray-800 shadow-sm">
                <TabsTrigger value="preview" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                  Live Preview
                </TabsTrigger>
                <TabsTrigger value="code" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                  Code Editor
                </TabsTrigger>
                <TabsTrigger value="status" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                  Generation Status
                </TabsTrigger>
              </TabsList>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="shadow-sm">
                  Copy Code
                </Button>
                <Button variant="outline" size="sm" className="shadow-sm" onClick={() => setShowExport(true)}>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            <TabsContent value="preview" className="flex-1 p-0 m-0">
              <div
                className={`flex-1 bg-gray-50 dark:bg-gray-950 p-8 overflow-auto transition-opacity duration-500 ${
                  showPreviewUpdate ? "animate-fade-in" : ""
                }`}
              >
                <div className="flex items-center justify-center min-h-[400px] p-8 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-950 rounded-2xl">
                  <div className="text-center space-y-6 max-w-2xl">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mx-auto flex items-center justify-center shadow-lg">
                      <Sparkles className="w-10 h-10 text-white" />
                    </div>
                    <div className="space-y-3">
                      <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">AI Vibe Builder</h1>
                      <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                        Transform your ideas into beautiful, functional UI components with the power of AI. Describe
                        your vision and watch it come to life.
                      </p>
                    </div>
                    <div className="flex gap-3 justify-center flex-wrap">
                      <button className="px-8 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                        Get Started
                      </button>
                      <button className="px-8 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 font-medium">
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="code" className="flex-1 p-0 m-0">
              <div
                className="flex-1 overflow-auto p-6 font-mono text-sm whitespace-pre-wrap"
                style={{
                  fontSize: `${settings.fontSize}px`,
                  backgroundColor: settings.editorTheme === "vs-dark" ? "#1e1e1e" : "#ffffff",
                  color: settings.editorTheme === "vs-dark" ? "#d4d4d4" : "#000000",
                }}
              >
                <pre>{code}</pre>
              </div>
            </TabsContent>

            <TabsContent value="status" className="flex-1 p-6 m-0">
              <div className="space-y-6">
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5" />
                      File Generation Status
                    </CardTitle>
                    <CardDescription>Track the progress of your AI-generated files</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <FileStatusList files={fileStatuses} />
                  </CardContent>
                </Card>

                {fileStatuses.some((file) => file.status === "completed") && (
                  <div className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950 dark:to-emerald-950 rounded-2xl p-8 shadow-lg border border-green-200 dark:border-green-800">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                        <Sparkles className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Generation Complete!</h2>
                        <p className="text-gray-600 dark:text-gray-400">Your component is ready for use</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Mobile Tabs (visible on small screens) */}
        <div className="flex flex-col flex-1 md:hidden bg-white dark:bg-gray-900">
          <Tabs defaultValue="prompt" className="flex flex-col flex-1">
            <TabsList className="grid grid-cols-3 m-2">
              <TabsTrigger value="prompt">Prompt</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
            <TabsContent value="prompt" className="flex-1 p-4 flex flex-col space-y-4">
              <CreditTracker credits={credits} />
              <AIModelSelector
                selectedModel={selectedModel}
                onModelChange={setSelectedModel}
                availableCredits={availableCredits}
              />
              <Textarea
                placeholder="Describe your UI here..."
                className="flex-1 resize-none min-h-[200px]"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                style={{ fontSize: `${settings.fontSize}px` }}
              />
              <RealTimeAI
                prompt={prompt}
                selectedModel={selectedModel}
                onCodeGenerated={handleCodeGenerated}
                onGenerationStart={handleGenerationStart}
                onGenerationComplete={handleGenerationComplete}
              />
            </TabsContent>
            <TabsContent value="code" className="flex-1 flex flex-col p-0 m-0">
              <div
                className="flex-1 overflow-auto p-4 font-mono text-sm whitespace-pre-wrap"
                style={{
                  fontSize: `${settings.fontSize}px`,
                  backgroundColor: settings.editorTheme === "vs-dark" ? "#1e1e1e" : "#ffffff",
                  color: settings.editorTheme === "vs-dark" ? "#d4d4d4" : "#000000",
                }}
              >
                <pre>{code}</pre>
              </div>
            </TabsContent>
            <TabsContent value="preview" className="flex-1 p-4 m-0 bg-gray-50 dark:bg-gray-950">
              <div className="flex items-center justify-center min-h-[300px] p-6 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-950 rounded-xl">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl mx-auto flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">AI Generated</h2>
                    <p className="text-gray-600 dark:text-gray-400">Mobile Preview</p>
                  </div>
                  <div className="flex gap-2 justify-center">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm">Primary</button>
                    <button className="px-4 py-2 border border-blue-500 text-blue-500 rounded-lg text-sm">
                      Secondary
                    </button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
