"use client"

import { useState } from "react"
import { History, Clock, Code, Eye, Trash2 } from "lucide-react"

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export type ProjectHistoryItem = {
  id: string
  prompt: string
  model: string
  timestamp: Date
  code: string
  preview?: string
}

interface ProjectHistoryProps {
  history: ProjectHistoryItem[]
  onRestoreProject: (item: ProjectHistoryItem) => void
  onDeleteProject: (id: string) => void
}

export function ProjectHistory({ history, onRestoreProject, onDeleteProject }: ProjectHistoryProps) {
  const [open, setOpen] = useState(false)

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  const truncatePrompt = (prompt: string, maxLength = 100) => {
    return prompt.length > maxLength ? `${prompt.substring(0, maxLength)}...` : prompt
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shadow-sm">
          <History className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Project History</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Project History</SheetTitle>
          <SheetDescription>View and restore your previous AI-generated projects</SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-120px)] mt-6">
          <div className="space-y-4">
            {history.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <History className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No project history yet</p>
                <p className="text-sm">Generate your first project to see it here</p>
              </div>
            ) : (
              history.map((item, index) => (
                <div key={item.id} className="border rounded-lg p-4 space-y-3 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{formatDate(item.timestamp)}</span>
                    </div>
                    <Badge variant="outline">{item.model}</Badge>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-1">Prompt:</p>
                    <p className="text-sm text-muted-foreground">{truncatePrompt(item.prompt)}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      onClick={() => {
                        onRestoreProject(item)
                        setOpen(false)
                      }}
                      className="flex-1"
                    >
                      <Code className="h-4 w-4 mr-2" />
                      Restore
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        // Preview functionality could be implemented here
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => onDeleteProject(item.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  {index < history.length - 1 && <Separator className="mt-4" />}
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
