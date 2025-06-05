"use client"

import { useState } from "react"
import { Code, Loader2, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThemeToggle } from "@/components/theme-toggle"
import { TemplateGallery, type Template } from "@/components/template-gallery"
import { SettingsPanel, type UserSettings } from "@/components/settings-panel"
import { FileStatusList, type FileStatus } from "@/components/file-status"
import { AIModelSelector } from "@/components/ai-model-selector"
import { ProjectHistory, type ProjectHistoryItem } from "@/components/project-history"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AIVibeBuilder() {
  const [prompt, setPrompt] = useState("")
  const [selectedModel, setSelectedModel] = useState("gpt-3.5-turbo")
  const [code, setCode] = useState(`// Welcome to AI Vibe Builder
// Your generated code will appear here

import React from 'react';

function WelcomeComponent() {
  return (
    <div className="flex items-center justify-center min-h-[400px] p-8">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto flex items-center justify-center">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          AI Vibe Builder
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-md">
          Describe your UI vision and watch as AI transforms your ideas into beautiful, functional components.
        </p>
        <div className="flex gap-2 justify-center">
          <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            Get Started
          </button>
          <button className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
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

  const handleGenerate = () => {
    if (!prompt.trim()) return

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

            const generatedCode = `// Generated with ${selectedModel} from: ${prompt}
import React from 'react';

function GeneratedComponent() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-8 shadow-lg">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              AI Generated Component
            </h2>
            <p className="text-gray-600 dark:text-gray-400">Created with {selectedModel}</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            This component was generated based on your prompt: "${prompt.substring(0, 100)}${prompt.length > 100 ? "..." : ""}"
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Features</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Responsive design</li>
                <li>• Dark mode support</li>
                <li>• Modern styling</li>
                <li>• Accessible components</li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Technologies</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• React</li>
                <li>• Tailwind CSS</li>
                <li>• TypeScript</li>
                <li>• Lucide Icons</li>
              </ul>
            </div>
          </div>
          
          <div className="flex gap-3 pt-4">
            <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium">
              Primary Action
            </button>
            <button className="px-6 py-2 border border-blue-500 text-blue-500 dark:text-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors font-medium">
              Secondary Action
            </button>
            <button className="px-6 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors font-medium">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GeneratedComponent;`

            setCode(generatedCode)
            setIsGenerating(false)
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
          }, 800)
        }, 1200)
      }, 1500)
    }, 500)
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navbar */}
      <header className="flex items-center h-16 px-6 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
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
          <SettingsPanel settings={settings} onSettingsChange={setSettings} />
          <ThemeToggle />
          <Button variant="outline" size="sm">
            Sign In
          </Button>
          <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
            Sign Up
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-full md:w-80 lg:w-96 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
          <div className="p-6 flex flex-col h-full">
            <div className="space-y-4 mb-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">AI Model</h2>
                <AIModelSelector selectedModel={selectedModel} onModelChange={setSelectedModel} />
              </div>
            </div>

            <div className="flex-1 flex flex-col">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Describe Your UI</h2>
              <Textarea
                placeholder="Describe the UI component you want to create. Be specific about layout, styling, functionality, and any special features..."
                className="flex-1 resize-none min-h-[200px] border-gray-200 dark:border-gray-600"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                style={{ fontSize: `${settings.fontSize}px` }}
              />
              <Button
                className="mt-4 w-full bg-blue-500 hover:bg-blue-600"
                onClick={handleGenerate}
                disabled={isGenerating || !prompt.trim()}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate UI
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="hidden md:flex flex-col flex-1 bg-white dark:bg-gray-800">
          <Tabs defaultValue="preview" className="flex flex-col flex-1">
            <div className="flex items-center justify-between px-6 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
              <TabsList className="bg-white dark:bg-gray-800">
                <TabsTrigger value="preview">Live Preview</TabsTrigger>
                <TabsTrigger value="code">Code Editor</TabsTrigger>
                <TabsTrigger value="status">Generation Status</TabsTrigger>
              </TabsList>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  Copy Code
                </Button>
                <Button variant="outline" size="sm">
                  Export
                </Button>
              </div>
            </div>

            <TabsContent value="preview" className="flex-1 p-0 m-0">
              <div
                className={`flex-1 bg-gray-50 dark:bg-gray-900 p-6 overflow-auto transition-opacity duration-500 ${
                  showPreviewUpdate ? "animate-fade-in" : ""
                }`}
              >
                <div className="max-w-4xl mx-auto p-6">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-8 shadow-lg">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                        <Sparkles className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">AI Generated Component</h2>
                        <p className="text-gray-600 dark:text-gray-400">Created with {selectedModel}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        This component was generated based on your prompt. Customize the design and functionality to
                        match your exact requirements.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
                          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Features</h3>
                          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                            <li>• Responsive design</li>
                            <li>• Dark mode support</li>
                            <li>• Modern styling</li>
                            <li>• Accessible components</li>
                          </ul>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
                          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Technologies</h3>
                          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                            <li>• React</li>
                            <li>• Tailwind CSS</li>
                            <li>• TypeScript</li>
                            <li>• Lucide Icons</li>
                          </ul>
                        </div>
                      </div>

                      <div className="flex gap-3 pt-4">
                        <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium">
                          Primary Action
                        </button>
                        <button className="px-6 py-2 border border-blue-500 text-blue-500 dark:text-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors font-medium">
                          Secondary Action
                        </button>
                        <button className="px-6 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors font-medium">
                          Learn More
                        </button>
                      </div>
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
                <Card>
                  <CardHeader>
                    <CardTitle>File Generation Status</CardTitle>
                    <CardDescription>Track the progress of your AI-generated files</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <FileStatusList files={fileStatuses} />
                  </CardContent>
                </Card>

                {fileStatuses.some((file) => file.status === "completed") && (
                  <div className="max-w-4xl mx-auto p-6">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-8 shadow-lg">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                          <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Generation Complete!</h2>
                          <p className="text-gray-600 dark:text-gray-400">Your component is ready</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Mobile Tabs (visible on small screens) */}
        <div className="flex flex-col flex-1 md:hidden bg-white dark:bg-gray-800">
          <Tabs defaultValue="prompt" className="flex flex-col flex-1">
            <TabsList className="grid grid-cols-3 m-2">
              <TabsTrigger value="prompt">Prompt</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
            <TabsContent value="prompt" className="flex-1 p-4 flex flex-col">
              <div className="space-y-4 mb-4">
                <AIModelSelector selectedModel={selectedModel} onModelChange={setSelectedModel} />
              </div>
              <Textarea
                placeholder="Describe your UI here..."
                className="flex-1 resize-none min-h-[200px]"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                style={{ fontSize: `${settings.fontSize}px` }}
              />
              <Button
                className="mt-4 w-full bg-blue-500 hover:bg-blue-600"
                onClick={handleGenerate}
                disabled={isGenerating || !prompt.trim()}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate UI
                  </>
                )}
              </Button>
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
            <TabsContent value="preview" className="flex-1 p-4 m-0 bg-gray-50 dark:bg-gray-900">
              <div className="max-w-4xl mx-auto">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">AI Generated</h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Mobile Preview</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
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
