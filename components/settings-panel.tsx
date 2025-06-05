"use client"

import { useState } from "react"
import { Settings } from "lucide-react"

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export interface UserSettings {
  fontSize: number
  autoComplete: boolean
  livePreview: boolean
  editorTheme: "vs-dark" | "vs-light"
  indentSize: number
}

interface SettingsPanelProps {
  settings: UserSettings
  onSettingsChange: (settings: UserSettings) => void
}

export function SettingsPanel({ settings, onSettingsChange }: SettingsPanelProps) {
  const [localSettings, setLocalSettings] = useState<UserSettings>(settings)

  const updateSetting = <K extends keyof UserSettings>(key: K, value: UserSettings[K]) => {
    const newSettings = { ...localSettings, [key]: value }
    setLocalSettings(newSettings)
    onSettingsChange(newSettings)
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shadow-sm">
          <Settings className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Settings</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Settings</SheetTitle>
          <SheetDescription>Customize your AI Vibe Builder experience</SheetDescription>
        </SheetHeader>
        <Tabs defaultValue="editor" className="mt-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
          </TabsList>
          <TabsContent value="editor" className="space-y-6 pt-6">
            <div className="space-y-2">
              <Label htmlFor="font-size">Font Size ({localSettings.fontSize}px)</Label>
              <Slider
                id="font-size"
                min={12}
                max={24}
                step={1}
                value={[localSettings.fontSize]}
                onValueChange={(value) => updateSetting("fontSize", value[0])}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="indent-size">Indent Size ({localSettings.indentSize} spaces)</Label>
              <Slider
                id="indent-size"
                min={2}
                max={8}
                step={2}
                value={[localSettings.indentSize]}
                onValueChange={(value) => updateSetting("indentSize", value[0])}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-complete">Auto Complete</Label>
              <Switch
                id="auto-complete"
                checked={localSettings.autoComplete}
                onCheckedChange={(checked) => updateSetting("autoComplete", checked)}
              />
            </div>
          </TabsContent>
          <TabsContent value="appearance" className="space-y-6 pt-6">
            <div className="space-y-2">
              <Label>Editor Theme</Label>
              <RadioGroup
                value={localSettings.editorTheme}
                onValueChange={(value) => updateSetting("editorTheme", value as "vs-dark" | "vs-light")}
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="vs-dark" id="vs-dark" />
                  <Label htmlFor="vs-dark">Dark</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="vs-light" id="vs-light" />
                  <Label htmlFor="vs-light">Light</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="live-preview">Live Preview</Label>
              <Switch
                id="live-preview"
                checked={localSettings.livePreview}
                onCheckedChange={(checked) => updateSetting("livePreview", checked)}
              />
            </div>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  )
}
