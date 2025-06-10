"use client"

import { useEffect, useRef, useState } from "react"
import { Loader2, Settings, Maximize2, Minimize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface MonacoEditorProps {
  value: string
  onChange: (value: string) => void
  language: string
  theme?: "vs-dark" | "vs-light" | "hc-black"
  readOnly?: boolean
  minimap?: boolean
  fontSize?: number
  wordWrap?: "on" | "off" | "wordWrapColumn" | "bounded"
  lineNumbers?: "on" | "off" | "relative" | "interval"
  className?: string
}

export function MonacoEditor({
  value,
  onChange,
  language,
  theme = "vs-dark",
  readOnly = false,
  minimap = true,
  fontSize = 14,
  wordWrap = "on",
  lineNumbers = "on",
  className = "",
}: MonacoEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const monacoRef = useRef<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [editorSettings, setEditorSettings] = useState({
    minimap,
    fontSize,
    wordWrap,
    lineNumbers,
  })

  useEffect(() => {
    const loadMonaco = async () => {
      try {
        // Dynamically import Monaco Editor
        const monaco = await import("monaco-editor")

        // Configure Monaco
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
          ],
          colors: {
            "editor.background": "#0D1117",
            "editor.foreground": "#E6EDF3",
            "editorLineNumber.foreground": "#7D8590",
            "editor.selectionBackground": "#264F78",
            "editor.lineHighlightBackground": "#161B22",
            "editorCursor.foreground": "#E6EDF3",
            "editorWhitespace.foreground": "#484F58",
          },
        })

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
          ],
          colors: {
            "editor.background": "#FFFFFF",
            "editor.foreground": "#24292F",
            "editorLineNumber.foreground": "#656D76",
            "editor.selectionBackground": "#0969DA40",
            "editor.lineHighlightBackground": "#F6F8FA",
            "editorCursor.foreground": "#24292F",
          },
        })

        if (editorRef.current) {
          const editor = monaco.editor.create(editorRef.current, {
            value,
            language,
            theme: theme === "vs-dark" ? "ai-dark" : "ai-light",
            readOnly,
            minimap: { enabled: editorSettings.minimap },
            fontSize: editorSettings.fontSize,
            wordWrap: editorSettings.wordWrap,
            lineNumbers: editorSettings.lineNumbers,
            automaticLayout: true,
            scrollBeyondLastLine: false,
            smoothScrolling: true,
            cursorBlinking: "smooth",
            cursorSmoothCaretAnimation: "on",
            fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', Consolas, monospace",
            fontLigatures: true,
            renderWhitespace: "selection",
            bracketPairColorization: { enabled: true },
            guides: {
              bracketPairs: true,
              indentation: true,
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
          })

          editor.onDidChangeModelContent(() => {
            onChange(editor.getValue())
          })

          monacoRef.current = editor
        }

        setIsLoading(false)
      } catch (error) {
        console.error("Failed to load Monaco Editor:", error)
        setIsLoading(false)
      }
    }

    loadMonaco()

    return () => {
      if (monacoRef.current) {
        monacoRef.current.dispose()
      }
    }
  }, [])

  useEffect(() => {
    if (monacoRef.current && value !== monacoRef.current.getValue()) {
      monacoRef.current.setValue(value)
    }
  }, [value])

  useEffect(() => {
    if (monacoRef.current) {
      monacoRef.current.updateOptions({
        theme: theme === "vs-dark" ? "ai-dark" : "ai-light",
        minimap: { enabled: editorSettings.minimap },
        fontSize: editorSettings.fontSize,
        wordWrap: editorSettings.wordWrap,
        lineNumbers: editorSettings.lineNumbers,
      })
    }
  }, [theme, editorSettings])

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
    if (monacoRef.current) {
      setTimeout(() => monacoRef.current.layout(), 100)
    }
  }

  const updateSetting = (key: string, value: any) => {
    setEditorSettings((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className={`relative ${isFullscreen ? "fixed inset-0 z-50 bg-background" : ""} ${className}`}>
      {/* Editor Header */}
      <div className="flex items-center justify-between p-2 border-b bg-muted/30">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            {language.toUpperCase()}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {value.split("\n").length} lines • {value.length} chars
          </span>
        </div>
        <div className="flex items-center gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <Settings className="h-3.5 w-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Editor Settings</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => updateSetting("minimap", !editorSettings.minimap)}>
                {editorSettings.minimap ? "Hide" : "Show"} Minimap
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => updateSetting("wordWrap", editorSettings.wordWrap === "on" ? "off" : "on")}
              >
                {editorSettings.wordWrap === "on" ? "Disable" : "Enable"} Word Wrap
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => updateSetting("lineNumbers", editorSettings.lineNumbers === "on" ? "off" : "on")}
              >
                {editorSettings.lineNumbers === "on" ? "Hide" : "Show"} Line Numbers
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => updateSetting("fontSize", 12)}>Font Size: Small (12px)</DropdownMenuItem>
              <DropdownMenuItem onClick={() => updateSetting("fontSize", 14)}>
                Font Size: Medium (14px)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => updateSetting("fontSize", 16)}>Font Size: Large (16px)</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={toggleFullscreen}>
            {isFullscreen ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
          </Button>
        </div>
      </div>

      {/* Editor Container */}
      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-10">
            <div className="flex items-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="text-sm">Loading Monaco Editor...</span>
            </div>
          </div>
        )}
        <div
          ref={editorRef}
          className={`${isFullscreen ? "h-[calc(100vh-60px)]" : "h-[500px]"} w-full`}
          style={{ opacity: isLoading ? 0.5 : 1 }}
        />
      </div>
    </div>
  )
}
