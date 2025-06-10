"use client"

import { useState } from "react"
import {
  FolderOpen,
  FileText,
  Plus,
  Save,
  Share2,
  Download,
  Settings,
  Terminal,
  Sparkles,
  MessageSquare,
  Eye,
  EyeOff,
  Smartphone,
  Tablet,
  Monitor,
  RefreshCw,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable"
import { EnhancedMonacoEditor } from "@/components/editor/enhanced-monaco-editor"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface EditorFile {
  id: string
  name: string
  language: string
  content: string
}

interface ConsoleMessage {
  id: string
  type: "log" | "error" | "warn" | "info"
  message: string
  timestamp: Date
}

export function PlaygroundInterface() {
  const [files, setFiles] = useState<EditorFile[]>([
    {
      id: "index.html",
      name: "index.html",
      language: "html",
      content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Playground</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <header class="hero">
            <div class="glow-orb"></div>
            <h1 class="title">
                <span class="gradient-text">AI Playground</span>
            </h1>
            <p class="subtitle">Build amazing things with AI assistance</p>
            <button class="cta-button" onclick="handleClick()">
                <span>Get Started</span>
                <div class="button-glow"></div>
            </button>
        </header>
        
        <section class="features">
            <div class="feature-card">
                <div class="feature-icon">🚀</div>
                <h3>Fast Development</h3>
                <p>Build and iterate quickly with AI-powered tools</p>
            </div>
            <div class="feature-card">
                <div class="feature-icon">🎨</div>
                <h3>Beautiful Design</h3>
                <p>Create stunning interfaces with modern aesthetics</p>
            </div>
            <div class="feature-card">
                <div class="feature-icon">⚡</div>
                <h3>Smart Suggestions</h3>
                <p>Get intelligent code suggestions and improvements</p>
            </div>
        </section>
    </div>
    <script src="script.js"></script>
</body>
</html>`,
    },
    {
      id: "style.css",
      name: "style.css",
      language: "css",
      content: `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    background: linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #16213e 100%);
    color: #ffffff;
    min-height: 100vh;
    overflow-x: hidden;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
}

.hero {
    text-align: center;
    padding: 4rem 0;
    position: relative;
}

.glow-orb {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(124, 58, 237, 0.3) 0%, transparent 70%);
    border-radius: 50%;
    animation: pulse 4s ease-in-out infinite;
    z-index: -1;
}

@keyframes pulse {
    0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
    50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.8; }
}

.title {
    font-size: 4rem;
    font-weight: 800;
    margin-bottom: 1rem;
    line-height: 1.1;
}

.gradient-text {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.subtitle {
    font-size: 1.5rem;
    color: #a0a0a0;
    margin-bottom: 3rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
}

.cta-button {
    position: relative;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: none;
    padding: 1rem 2rem;
    border-radius: 12px;
    color: white;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    overflow: hidden;
}

.cta-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(124, 58, 237, 0.4);
}

.button-glow {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%);
    opacity: 0;
    transition: opacity 0.3s ease;
}

.cta-button:hover .button-glow {
    opacity: 1;
}

.features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 4rem;
}

.feature-card {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    padding: 2rem;
    text-align: center;
    transition: all 0.3s ease;
}

.feature-card:hover {
    transform: translateY(-5px);
    border-color: rgba(124, 58, 237, 0.5);
    box-shadow: 0 20px 40px rgba(124, 58, 237, 0.1);
}

.feature-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.feature-card h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #ffffff;
}

.feature-card p {
    color: #a0a0a0;
    line-height: 1.6;
}

@media (max-width: 768px) {
    .title {
        font-size: 2.5rem;
    }
    
    .subtitle {
        font-size: 1.2rem;
    }
    
    .container {
        padding: 1rem;
    }
}`,
    },
    {
      id: "script.js",
      name: "script.js",
      language: "javascript",
      content: `// AI Playground JavaScript

function handleClick() {
    console.log('🚀 Welcome to AI Playground!');
    
    // Add some interactive magic
    const button = document.querySelector('.cta-button');
    const originalText = button.innerHTML;
    
    button.innerHTML = '<span>✨ Activated!</span>';
    button.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
    
    // Create floating particles
    createParticles();
    
    setTimeout(() => {
        button.innerHTML = originalText;
        button.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }, 2000);
}

function createParticles() {
    const container = document.querySelector('.hero');
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = \`
            position: absolute;
            width: 4px;
            height: 4px;
            background: linear-gradient(45deg, #667eea, #764ba2);
            border-radius: 50%;
            pointer-events: none;
            left: \${Math.random() * 100}%;
            top: \${Math.random() * 100}%;
            animation: float \${2 + Math.random() * 3}s ease-out forwards;
        \`;
        
        container.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 5000);
    }
}

// Add CSS animation for particles
const style = document.createElement('style');
style.textContent = \`
    @keyframes float {
        0% {
            transform: translateY(0) scale(0);
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) scale(1);
            opacity: 0;
        }
    }
\`;
document.head.appendChild(style);

// Console welcome message
console.log('%c🤖 AI Playground Console', 'color: #667eea; font-size: 16px; font-weight: bold;');
console.log('%cWelcome to the future of development!', 'color: #a0a0a0; font-size: 14px;');

// Add some interactivity to feature cards
document.addEventListener('DOMContentLoaded', () => {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach((card, index) => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) rotateX(5deg)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) rotateX(0deg)';
        });
    });
});`,
    },
  ])

  const [activeFileId, setActiveFileId] = useState("index.html")
  const [isRunning, setIsRunning] = useState(false)
  const [previewMode, setPreviewMode] = useState<"desktop" | "tablet" | "mobile">("desktop")
  const [showPreview, setShowPreview] = useState(true)
  const [consoleMessages, setConsoleMessages] = useState<ConsoleMessage[]>([
    {
      id: "1",
      type: "info",
      message: "AI Playground initialized successfully",
      timestamp: new Date(),
    },
    {
      id: "2",
      type: "log",
      message: "Ready to build amazing things!",
      timestamp: new Date(),
    },
  ])
  const [aiPrompt, setAiPrompt] = useState("")

  const updateFile = (fileId: string, content: string) => {
    setFiles(files.map((file) => (file.id === fileId ? { ...file, content } : file)))
  }

  const runCode = () => {
    setIsRunning(true)
    addConsoleMessage("info", "Running code...")

    setTimeout(() => {
      addConsoleMessage("log", "Code executed successfully")
      setIsRunning(false)
    }, 1500)
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

  const generatePreviewHTML = () => {
    const htmlFile = files.find((f) => f.language === "html")
    const cssFile = files.find((f) => f.language === "css")
    const jsFile = files.find((f) => f.language === "javascript")

    if (!htmlFile) return ""

    let html = htmlFile.content

    if (cssFile) {
      html = html.replace('<link rel="stylesheet" href="style.css">', `<style>${cssFile.content}</style>`)
    }

    if (jsFile) {
      html = html.replace('<script src="script.js"></script>', `<script>${jsFile.content}</script>`)
    }

    return html
  }

  return (
    <div className="h-screen bg-background flex flex-col">
      {/* Top Toolbar */}
      <div className="flex items-center justify-between p-4 border-b bg-muted/30 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-lg">AI Playground</span>
            <Badge variant="secondary" className="text-xs">
              Beta
            </Badge>
          </div>

          <Separator orientation="vertical" className="h-6" />

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              New File
            </Button>

            <Button variant="outline" size="sm">
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>

            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>

            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowPreview(!showPreview)}>
            {showPreview ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
            {showPreview ? "Hide" : "Show"} Preview
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                {previewMode === "desktop" && <Monitor className="w-4 h-4 mr-2" />}
                {previewMode === "tablet" && <Tablet className="w-4 h-4 mr-2" />}
                {previewMode === "mobile" && <Smartphone className="w-4 h-4 mr-2" />}
                {previewMode}
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

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal">
          {/* File Explorer */}
          <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
            <div className="h-full flex flex-col border-r">
              <div className="p-4 border-b">
                <h3 className="font-semibold text-sm flex items-center gap-2">
                  <FolderOpen className="w-4 h-4" />
                  Files
                </h3>
              </div>
              <ScrollArea className="flex-1">
                <div className="p-2 space-y-1">
                  {files.map((file) => (
                    <button
                      key={file.id}
                      onClick={() => setActiveFileId(file.id)}
                      className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-muted/50 transition-colors ${
                        activeFileId === file.id ? "bg-primary/10 text-primary" : ""
                      }`}
                    >
                      <FileText className="w-4 h-4" />
                      {file.name}
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Editor */}
          <ResizablePanel defaultSize={showPreview ? 50 : 80} minSize={30}>
            <EnhancedMonacoEditor
              files={files}
              activeFileId={activeFileId}
              onFileChange={updateFile}
              onActiveFileChange={setActiveFileId}
              onRun={runCode}
              isRunning={isRunning}
              className="h-full"
            />
          </ResizablePanel>

          {showPreview && (
            <>
              <ResizableHandle withHandle />

              {/* Preview & Console */}
              <ResizablePanel defaultSize={30} minSize={20}>
                <Tabs defaultValue="preview" className="h-full flex flex-col">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                    <TabsTrigger value="console">Console</TabsTrigger>
                    <TabsTrigger value="ai">AI Assistant</TabsTrigger>
                  </TabsList>

                  <TabsContent value="preview" className="flex-1 p-4">
                    <div className="h-full flex flex-col">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold">Live Preview</h3>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {previewMode}
                          </Badge>
                          <Button variant="ghost" size="sm" onClick={runCode}>
                            <RefreshCw className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex-1 border rounded-lg overflow-hidden bg-white">
                        <div className="h-full mx-auto" style={{ width: getPreviewWidth() }}>
                          <iframe srcDoc={generatePreviewHTML()} className="w-full h-full border-0" title="Preview" />
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="console" className="flex-1 p-4">
                    <div className="h-full flex flex-col">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold flex items-center gap-2">
                          <Terminal className="w-4 h-4" />
                          Console
                        </h3>
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

                  <TabsContent value="ai" className="flex-1 p-4">
                    <div className="h-full flex flex-col">
                      <div className="flex items-center gap-2 mb-4">
                        <Sparkles className="w-5 h-5 text-primary" />
                        <h3 className="font-semibold">AI Assistant</h3>
                      </div>

                      <ScrollArea className="flex-1 border rounded-lg p-4 mb-4">
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                              <Sparkles className="w-4 h-4 text-white" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm">Hello! I'm your AI coding assistant. I can help you:</p>
                              <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                                <li>• Generate code snippets</li>
                                <li>• Debug your code</li>
                                <li>• Optimize performance</li>
                                <li>• Explain complex concepts</li>
                                <li>• Suggest improvements</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </ScrollArea>

                      <div className="space-y-2">
                        <Textarea
                          placeholder="Ask me anything about your code or request help with development..."
                          value={aiPrompt}
                          onChange={(e) => setAiPrompt(e.target.value)}
                          className="min-h-[80px]"
                        />
                        <div className="flex gap-2">
                          <Button size="sm" className="flex-1">
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Send
                          </Button>
                          <Button variant="outline" size="sm">
                            <Sparkles className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>
      </div>
    </div>
  )
}
