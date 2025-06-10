"use client"

import { useState } from "react"
import {
  Play,
  Square,
  Save,
  FolderOpen,
  FileText,
  Sparkles,
  Zap,
  Code2,
  Settings,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable"
import { MonacoEditor } from "@/components/editor/monaco-editor"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface FileTab {
  id: string
  name: string
  language: string
  content: string
  modified: boolean
}

interface ConsoleMessage {
  id: string
  type: "log" | "error" | "warn" | "info"
  message: string
  timestamp: Date
}

export function AIIDE() {
  const [activeTab, setActiveTab] = useState("component.tsx")
  const [isRunning, setIsRunning] = useState(false)
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [previewMode, setPreviewMode] = useState<"desktop" | "tablet" | "mobile">("desktop")
  const [consoleMessages, setConsoleMessages] = useState<ConsoleMessage[]>([
    {
      id: "1",
      type: "info",
      message: "AI IDE initialized successfully",
      timestamp: new Date(),
    },
    {
      id: "2",
      type: "log",
      message: "Ready to build amazing applications",
      timestamp: new Date(),
    },
  ])

  const [files, setFiles] = useState<FileTab[]>([
    {
      id: "component.tsx",
      name: "component.tsx",
      language: "typescript",
      content: `import React, { useState } from 'react';
import { Sparkles, Code2, Zap } from 'lucide-react';

interface AIComponentProps {
  title?: string;
  description?: string;
}

export default function AIComponent({ 
  title = "AI-Powered Component",
  description = "Built with the future in mind"
}: AIComponentProps) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-purple-300 text-sm font-medium">AI-Powered</span>
          </div>
          
          <h1 className="text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent mb-6">
            {title}
          </h1>
          
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {description}. Experience the next generation of development tools.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: <Code2 className="w-8 h-8" />,
              title: "Smart Coding",
              description: "AI-assisted development with intelligent suggestions"
            },
            {
              icon: <Zap className="w-8 h-8" />,
              title: "Lightning Fast",
              description: "Optimized performance for modern applications"
            },
            {
              icon: <Sparkles className="w-8 h-8" />,
              title: "Future Ready",
              description: "Built with tomorrow's technology today"
            }
          ].map((feature, index) => (
            <div 
              key={index}
              className="group relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300"
            >
              <div className="text-purple-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-slate-400">{feature.description}</p>
              
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-purple-500/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>

        {/* Interactive Button */}
        <div className="text-center">
          <button
            onClick={() => setIsActive(!isActive)}
            className={\`relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 \${
              isActive ? 'animate-pulse' : ''
            }\`}
          >
            <span className="relative z-10">
              {isActive ? 'Activated!' : 'Activate AI'}
            </span>
            
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300 animate-gradient-x" />
          </button>
        </div>
      </div>
    </div>
  );
}`,
      modified: false,
    },
    {
      id: "styles.css",
      name: "styles.css",
      language: "css",
      content: `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

/* Global Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  line-height: 1.6;
  color: #333;
  background: #f8fafc;
}

/* Gradient Animation */
@keyframes gradient-x {
  0%, 100% {
    background-size: 200% 200%;
    background-position: left center;
  }
  50% {
    background-size: 200% 200%;
    background-position: right center;
  }
}

.animate-gradient-x {
  animation: gradient-x 3s ease infinite;
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Glassmorphism Effect */
.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Neon Glow */
.neon-glow {
  box-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
}

/* Hover Effects */
.hover-lift {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hover-lift:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}`,
      modified: false,
    },
    {
      id: "utils.ts",
      name: "utils.ts",
      language: "typescript",
      content: `// Utility functions for AI IDE

export const formatCode = (code: string, language: string): string => {
  // Basic code formatting logic
  return code.trim();
};

export const validateCode = (code: string, language: string): boolean => {
  try {
    if (language === 'javascript' || language === 'typescript') {
      // Basic syntax validation
      new Function(code);
    }
    return true;
  } catch (error) {
    return false;
  }
};

export const generateAIPrompt = (description: string): string => {
  return \`Create a React component that \${description}. 
  Use modern TypeScript, Tailwind CSS for styling, and include proper accessibility features.
  Make it responsive and visually appealing with smooth animations.\`;
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
};

export const downloadFile = (content: string, filename: string, type: string = 'text/plain') => {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};`,
      modified: false,
    },
  ])

  const activeFile = files.find((f) => f.id === activeTab)

  const updateFileContent = (content: string) => {
    setFiles(files.map((file) => (file.id === activeTab ? { ...file, content, modified: true } : file)))
  }

  const runCode = () => {
    setIsRunning(true)
    addConsoleMessage("info", "Starting code execution...")

    setTimeout(() => {
      addConsoleMessage("log", "Code compiled successfully")
      addConsoleMessage("info", "Application running on preview")
      setIsRunning(false)
    }, 2000)
  }

  const stopCode = () => {
    setIsRunning(false)
    addConsoleMessage("warn", "Execution stopped")
  }

  const addConsoleMessage = (type: ConsoleMessage["type"], message: string) => {
    const newMessage: ConsoleMessage = {
      id: Date.now().toString(),
      type,
      message,
      timestamp: new Date(),
    }
    setConsoleMessages((prev) => [...prev, newMessage])
  }

  const generateWithAI = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)
    addConsoleMessage("info", `Generating code: ${prompt}`)

    // Simulate AI generation
    setTimeout(() => {
      const generatedCode = `// AI Generated Component
import React from 'react';

export default function GeneratedComponent() {
  return (
    <div className="p-8 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          AI Generated: ${prompt}
        </h1>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <p className="text-gray-600">
            This component was generated based on your prompt: "${prompt}"
          </p>
        </div>
      </div>
    </div>
  );
}`

      updateFileContent(generatedCode)
      addConsoleMessage("log", "AI generation completed successfully")
      setIsGenerating(false)
      setPrompt("")
    }, 3000)
  }

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
    <div className="h-screen bg-background flex flex-col">
      {/* Top Toolbar */}
      <div className="flex items-center justify-between p-4 border-b bg-muted/30">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-lg">AI IDE</span>
            <Badge variant="secondary" className="text-xs">
              v2.0
            </Badge>
          </div>

          <Separator orientation="vertical" className="h-6" />

          <div className="flex items-center gap-2">
            <Button
              variant={isRunning ? "destructive" : "default"}
              size="sm"
              onClick={isRunning ? stopCode : runCode}
              disabled={isGenerating}
            >
              {isRunning ? (
                <>
                  <Square className="w-4 h-4 mr-2" />
                  Stop
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Run
                </>
              )}
            </Button>

            <Button variant="outline" size="sm">
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>

            <Button variant="outline" size="sm">
              <FolderOpen className="w-4 h-4 mr-2" />
              Open
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Globe className="w-4 h-4 mr-2" />
                {previewMode === "desktop" && <Monitor className="w-4 h-4" />}
                {previewMode === "tablet" && <Tablet className="w-4 h-4" />}
                {previewMode === "mobile" && <Smartphone className="w-4 h-4" />}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Preview Mode</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setPreviewMode("desktop")}>
                <Monitor className="w-4 h-4 mr-2" />
                Desktop
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setPreviewMode("tablet")}>
                <Tablet className="w-4 h-4 mr-2" />
                Tablet
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setPreviewMode("mobile")}>
                <Smartphone className="w-4 h-4 mr-2" />
                Mobile
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* AI Prompt Bar */}
      <div className="p-4 border-b bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-500" />
            <span className="font-medium">AI Assistant</span>
          </div>
          <div className="flex-1 flex gap-2">
            <Input
              placeholder="Describe what you want to build... (e.g., 'a modern login form with animations')"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="flex-1"
              onKeyDown={(e) => e.key === "Enter" && generateWithAI()}
            />
            <Button
              onClick={generateWithAI}
              disabled={!prompt.trim() || isGenerating}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Generating...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 mr-2" />
                  Generate
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal">
          {/* File Explorer & Editor */}
          <ResizablePanel defaultSize={60} minSize={30}>
            <div className="h-full flex flex-col">
              {/* File Tabs */}
              <div className="flex items-center border-b bg-muted/20">
                {files.map((file) => (
                  <button
                    key={file.id}
                    onClick={() => setActiveTab(file.id)}
                    className={`flex items-center gap-2 px-4 py-2 text-sm border-r hover:bg-muted/50 transition-colors ${
                      activeTab === file.id ? "bg-background border-b-2 border-b-primary" : ""
                    }`}
                  >
                    <FileText className="w-4 h-4" />
                    {file.name}
                    {file.modified && <div className="w-2 h-2 bg-orange-500 rounded-full" />}
                  </button>
                ))}
              </div>

              {/* Monaco Editor */}
              {activeFile && (
                <MonacoEditor
                  value={activeFile.content}
                  onChange={updateFileContent}
                  language={activeFile.language}
                  className="flex-1"
                />
              )}
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Preview & Console */}
          <ResizablePanel defaultSize={40} minSize={20}>
            <Tabs defaultValue="preview" className="h-full flex flex-col">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="console">Console</TabsTrigger>
                <TabsTrigger value="ai-chat">AI Chat</TabsTrigger>
              </TabsList>

              <TabsContent value="preview" className="flex-1 p-4">
                <div className="h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Live Preview</h3>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {previewMode}
                      </Badge>
                      {isRunning && (
                        <Badge variant="default" className="text-xs bg-green-500">
                          Running
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex-1 border rounded-lg overflow-hidden bg-white">
                    <div className="h-full mx-auto bg-white" style={{ width: getPreviewWidth() }}>
                      {/* Preview iframe would go here */}
                      <div className="h-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
                        <div className="text-center text-white">
                          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                            <Sparkles className="w-8 h-8" />
                          </div>
                          <h2 className="text-2xl font-bold mb-2">AI-Powered Component</h2>
                          <p className="text-purple-200">Live preview will appear here</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="console" className="flex-1 p-4">
                <div className="h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Console</h3>
                    <Button variant="outline" size="sm" onClick={() => setConsoleMessages([])}>
                      Clear
                    </Button>
                  </div>

                  <ScrollArea className="flex-1 border rounded-lg bg-black text-green-400 font-mono text-sm">
                    <div className="p-4 space-y-2">
                      {consoleMessages.map((msg) => (
                        <div key={msg.id} className="flex items-start gap-2">
                          <span className="text-gray-500 text-xs">{msg.timestamp.toLocaleTimeString()}</span>
                          <span
                            className={`text-xs ${
                              msg.type === "error"
                                ? "text-red-400"
                                : msg.type === "warn"
                                  ? "text-yellow-400"
                                  : msg.type === "info"
                                    ? "text-blue-400"
                                    : "text-green-400"
                            }`}
                          >
                            [{msg.type.toUpperCase()}]
                          </span>
                          <span>{msg.message}</span>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </TabsContent>

              <TabsContent value="ai-chat" className="flex-1 p-4">
                <div className="h-full flex flex-col">
                  <h3 className="font-semibold mb-4">AI Assistant</h3>

                  <ScrollArea className="flex-1 border rounded-lg p-4 mb-4">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                          <Sparkles className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm">Hello! I'm your AI coding assistant. I can help you:</p>
                          <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                            <li>• Generate React components</li>
                            <li>• Debug your code</li>
                            <li>• Optimize performance</li>
                            <li>• Add new features</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </ScrollArea>

                  <div className="flex gap-2">
                    <Input placeholder="Ask me anything about your code..." />
                    <Button size="sm">
                      <Zap className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  )
}
