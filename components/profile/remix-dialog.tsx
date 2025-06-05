"use client"

import { useState } from "react"
import { GitBranch, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import type { Project } from "@/types/user"

interface RemixDialogProps {
  project: Project | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onRemix: (remixData: {
    title: string
    description: string
    originalProjectId: string
  }) => void
}

export function RemixDialog({ project, open, onOpenChange, onRemix }: RemixDialogProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const handleRemix = () => {
    if (!project || !title.trim()) return

    onRemix({
      title: title.trim(),
      description: description.trim(),
      originalProjectId: project.id,
    })

    // Reset form
    setTitle("")
    setDescription("")
    onOpenChange(false)
  }

  if (!project) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <GitBranch className="h-5 w-5" />
            Remix Project
          </DialogTitle>
          <DialogDescription>
            Create your own version of this project. You'll start with a copy of the original code that you can modify.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Original Project Info */}
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={project.author.avatar || "/placeholder.svg"} />
                <AvatarFallback>{project.author.username.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-semibold">{project.title}</h4>
                <p className="text-sm text-muted-foreground">by {project.author.username}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{project.description}</p>
            <div className="flex flex-wrap gap-1">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Remix Form */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="remix-title">Project Title</Label>
              <Input
                id="remix-title"
                placeholder={`${project.title} (Remix)`}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="remix-description">Description</Label>
              <Textarea
                id="remix-description"
                placeholder="Describe what you plan to change or improve..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>
          </div>

          {/* Preview of what will happen */}
          <div className="bg-blue-50 dark:bg-blue-950 rounded-lg p-4 space-y-2">
            <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
              <Sparkles className="h-4 w-4" />
              <span className="font-medium">What happens when you remix:</span>
            </div>
            <ul className="text-sm text-blue-600 dark:text-blue-400 space-y-1 ml-6">
              <li>• A new project will be created in your account</li>
              <li>• You'll get a copy of the original code to modify</li>
              <li>• The original project remains unchanged</li>
              <li>• Your remix will credit the original author</li>
            </ul>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleRemix}
            disabled={!title.trim()}
            className="bg-gradient-to-r from-blue-500 to-purple-600"
          >
            <GitBranch className="h-4 w-4 mr-2" />
            Create Remix
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
