"use client"

import { useEffect, useRef, useState } from "react"
import { Loader2, Settings, Maximize2, Minimize2, Copy, Check, Play, Square } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "next-themes"

interface EditorFile {
  id: string
  name: string
  language: string
  content: string
}

interface EnhancedMonacoEditorProps {
  files: EditorFile[]
  activeFileId: string
  onFileChange: (fileId: string, content: string) => void
  onActiveFileChange: (fileId: string) => void
  onRun?: () => void
  isRunning?: boolean
  className?: string
}

export function EnhancedMonacoEditor({
  files,
  activeFileId,
  onFileChange,
  onActiveFileChange,
  onRun,
  isRunning = false,
  className = "",
}: EnhancedMonacoEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const monacoRef = useRef<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [copied, setCopied] = useState(false)
  const { theme } = useTheme()

  const activeFile = files.find((f) => f.id === activeFileId) || files[0]

  useEffect(() => {
    const loadMonaco = async () => {
      try {
        const monaco = await import("monaco-editor")

        // Define custom AI-themed dark theme
        monaco.editor.defineTheme("ai-dark", {
          base: "vs-dark",
          inherit: true,
          rules: [
            { token: "comment", foreground: "6A9955", fontStyle: "italic" },
            { token: "keyword", foreground: "569CD6" },
            { token: "string", foreground: "CE9178" },
            { token: "number", foreground: "B5CEA8" },
            { token: "type", foreground: "4EC9B0" },
            { token: "function", foreground: "DCDCAA" },
            { token: "variable", foreground: "9CDCFE" },
            { token: "tag", foreground: "569CD6" },
            { token: "attribute.name", foreground: "92C5F8" },
            { token: "attribute.value", foreground: "CE9178" },
          ],
          colors: {
            "editor.background": "#0A0A0F",
            "editor.foreground": "#E6EDF3",
            "editorLineNumber.foreground": "#7D8590",
            "editor.selectionBackground": "#264F78",
            "editor.lineHighlightBackground": "#161B22",
            "editorCursor.foreground": "#7C3AED",
            "editorWhitespace.foreground": "#484F58",
            "editorIndentGuide.background": "#21262D",
            "editorIndentGuide.activeBackground": "#30363D",
            "editor.selectionHighlightBackground": "#3FB95040",
            "editorBracketMatch.background": "#3FB95040",
            "editorBracketMatch.border": "#3FB950",
          },
        })

        // Define custom AI-themed light theme
        monaco.editor.defineTheme("ai-light", {
          base: "vs",
          inherit: true,
          rules: [
            { token: "comment", foreground: "008000", fontStyle: "italic" },
            { token: "keyword", foreground: "0000FF" },
            { token: "string", foreground: "A31515" },
            { token: "number", foreground: "098658" },
            { token: "type", foreground: "267F99" },
            { token: "function", foreground: "795E26" },
            { token: "variable", foreground: "001080" },
            { token: "tag", foreground: "800000" },
            { token: "attribute.name", foreground: "FF0000" },
            { token: "attribute.value", foreground: "0000FF" },
          ],
          colors: {
            "editor.background": "#FAFBFC",
            "editor.foreground": "#24292F",
            "editorLineNumber.foreground": "#656D76",
            "editor.selectionBackground": "#0969DA40",
            "editor.lineHighlightBackground": "#F6F8FA",
            "editorCursor.foreground": "#7C3AED",
            "editorWhitespace.foreground": "#AFBAC4",
            "editorIndentGuide.background": "#D1D9E0",
            "editorIndentGuide.activeBackground": "#8C959F",
            "editor.selectionHighlightBackground": "#0969DA20",
            "editorBracketMatch.background": "#0969DA20",
            "editorBracketMatch.border": "#0969DA",
          },
        })

        if (editorRef.current) {
          const editor = monaco.editor.create(editorRef.current, {
            value: activeFile?.content || "",
            language: activeFile?.language || "javascript",
            theme: theme === "dark" ? "ai-dark" : "ai-light",
            automaticLayout: true,
            scrollBeyondLastLine: false,
            smoothScrolling: true,
            cursorBlinking: "smooth",
            cursorSmoothCaretAnimation: "on",
            fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', Consolas, monospace",
            fontLigatures: true,
            fontSize: 14,
            lineHeight: 1.6,
            renderWhitespace: "selection",
            bracketPairColorization: { enabled: true },
            guides: {
              bracketPairs: true,
              indentation: true,
            },
            minimap: {
              enabled: true,
              scale: 1,
              showSlider: "mouseover",
            },
            suggest: {
              showKeywords: true,
              showSnippets: true,
              showFunctions: true,
              showConstructors: true,
              showFields: true,
              showVariables: true,
              showClasses: true,
              showStructs: true,
              showInterfaces: true,
              showModules: true,
              showProperties: true,
              showEvents: true,
              showOperators: true,
              showUnits: true,
              showValues: true,
              showConstants: true,
              showEnums: true,
              showEnumMembers: true,
              showColors: true,
              showFiles: true,
              showReferences: true,
              showFolders: true,
              showTypeParameters: true,
            },
            quickSuggestions: {
              other: true,
              comments: true,
              strings: true,
            },
            parameterHints: {
              enabled: true,
            },
            wordWrap: "on",
            wrappingIndent: "indent",
          })

          editor.onDidChangeModelContent(() => {
            if (activeFile) {
              onFileChange(activeFile.id, editor.getValue())
            }
          })

          monacoRef.current = { editor, monaco }
        }

        setIsLoading(false)
      } catch (error) {
        console.error("Failed to load Monaco Editor:", error)
        setIsLoading(false)
      }
    }

    loadMonaco()

    return () => {
      if (monacoRef.current?.editor) {
        monacoRef.current.editor.dispose()
      }
    }
  }, [])

  useEffect(() => {
    if (monacoRef.current?.editor && activeFile) {
      const currentValue = monacoRef.current.editor.getValue()
      if (currentValue !== activeFile.content) {
        monacoRef.current.editor.setValue(activeFile.content)
      }

      const model = monacoRef.current.editor.getModel()
      if (model && monacoRef.current.monaco) {
        monacoRef.current.monaco.editor.setModelLanguage(model, activeFile.language)
      }
    }
  }, [activeFile])

  useEffect(() => {
    if (monacoRef.current?.editor) {
      monacoRef.current.editor.updateOptions({
        theme: theme === "dark" ? "ai-dark" : "ai-light",
      })
    }
  }, [theme])

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
    if (monacoRef.current?.editor) {
      setTimeout(() => monacoRef.current.editor.layout(), 100)
    }
  }

  const copyCode = async () => {
    if (activeFile) {
      try {
        await navigator.clipboard.writeText(activeFile.content)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (error) {
        console.error("Failed to copy code:", error)
      }
    }
  }

  const getLanguageIcon = (language: string) => {
    switch (language) {
      case "html":
        return "🌐"
      case "css":
        return "🎨"
      case "javascript":
      case "typescript":
        return "⚡"
      case "json":
        return "📄"
      default:
        return "📝"
    }
  }

  return (
    <div className={`relative ${isFullscreen ? "fixed inset-0 z-50 bg-background" : ""} ${className}`}>
      {/* Editor Header */}
      <div className="flex items-center justify-between p-3 border-b bg-muted/30 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          {/* File Tabs */}
          <Tabs value={activeFileId} onValueChange={onActiveFileChange} className="w-auto">
            <TabsList className="h-8 bg-background/50 backdrop-blur-sm">
              {files.map((file) => (
                <TabsTrigger
                  key={file.id}
                  value={file.id}
                  className="text-xs px-3 py-1 data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
                >
                  <span className="mr-1">{getLanguageIcon(file.language)}</span>
                  {file.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Badge variant="outline" className="text-xs">
              {activeFile?.language.toUpperCase()}
            </Badge>
            <span>{activeFile?.content.split("\n").length} lines</span>
          </div>

          <Button variant="ghost" size="sm" onClick={copyCode} className="h-8 px-2">
            {copied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
          </Button>

          {onRun && (
            <Button variant={isRunning ? "destructive" : "default"} size="sm" onClick={onRun} className="h-8 px-3">
              {isRunning ? (
                <>
                  <Square className="h-3.5 w-3.5 mr-1" />
                  Stop
                </>
              ) : (
                <>
                  <Play className="h-3.5 w-3.5 mr-1" />
                  Run
                </>
              )}
            </Button>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 px-2">
                <Settings className="h-3.5 w-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Editor Settings</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Toggle Minimap</DropdownMenuItem>
              <DropdownMenuItem>Word Wrap</DropdownMenuItem>
              <DropdownMenuItem>Font Size</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Format Document</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="sm" onClick={toggleFullscreen} className="h-8 px-2">
            {isFullscreen ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
          </Button>
        </div>
      </div>

      {/* Editor Container */}
      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-10">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
                <div className="absolute inset-0 h-6 w-6 animate-ping rounded-full bg-primary/20" />
              </div>
              <span className="text-sm font-medium">Loading AI Editor...</span>
            </div>
          </div>
        )}
        <div
          ref={editorRef}
          className={`${isFullscreen ? "h-[calc(100vh-60px)]" : "h-[600px]"} w-full transition-opacity duration-300`}
          style={{ opacity: isLoading ? 0.5 : 1 }}
        />
      </div>
    </div>
  )
}
