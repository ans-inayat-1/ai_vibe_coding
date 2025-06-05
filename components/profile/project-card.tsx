"use client"

import { useState } from "react"
import Image from "next/image"
import { Heart, Eye, Code, Globe, Lock, MoreHorizontal, GitBranch } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
import type { Project } from "@/types/user"

interface ProjectCardProps {
  project: Project
  isOwner?: boolean
  onVisibilityChange?: (projectId: string, visibility: "public" | "private") => void
  onRemix?: (project: Project) => void
  onLike?: (projectId: string) => void
  onDelete?: (projectId: string) => void
}

export function ProjectCard({
  project,
  isOwner = false,
  onVisibilityChange,
  onRemix,
  onLike,
  onDelete,
}: ProjectCardProps) {
  const [showPreview, setShowPreview] = useState(false)

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date)
  }

  const handleVisibilityToggle = () => {
    if (onVisibilityChange) {
      const newVisibility = project.visibility === "public" ? "private" : "public"
      onVisibilityChange(project.id, newVisibility)
    }
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-200 overflow-hidden">
      <div className="relative">
        <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 relative overflow-hidden">
          {project.previewImage ? (
            <Image
              src={project.previewImage || "/placeholder.svg"}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-200"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <Code className="h-12 w-12 text-gray-400" />
            </div>
          )}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200" />
        </div>

        {/* Visibility indicator */}
        <div className="absolute top-2 left-2">
          {project.visibility === "private" ? (
            <Badge variant="secondary" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
              <Lock className="h-3 w-3 mr-1" />
              Private
            </Badge>
          ) : (
            <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
              <Globe className="h-3 w-3 mr-1" />
              Public
            </Badge>
          )}
        </div>

        {/* Actions menu */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="h-8 w-8 bg-white/90 hover:bg-white">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Dialog open={showPreview} onOpenChange={setShowPreview}>
                <DialogTrigger asChild>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </DropdownMenuItem>
                </DialogTrigger>
              </Dialog>
              {!isOwner && onRemix && (
                <DropdownMenuItem onClick={() => onRemix(project)}>
                  <GitBranch className="h-4 w-4 mr-2" />
                  Remix
                </DropdownMenuItem>
              )}
              {isOwner && onVisibilityChange && (
                <DropdownMenuItem onClick={handleVisibilityToggle}>
                  {project.visibility === "public" ? (
                    <>
                      <Lock className="h-4 w-4 mr-2" />
                      Make Private
                    </>
                  ) : (
                    <>
                      <Globe className="h-4 w-4 mr-2" />
                      Make Public
                    </>
                  )}
                </DropdownMenuItem>
              )}
              {isOwner && onDelete && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => onDelete(project.id)} className="text-red-600">
                    Delete
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Preview Dialog */}
        <Dialog open={showPreview} onOpenChange={setShowPreview}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto">
            <DialogHeader>
              <DialogTitle>{project.title}</DialogTitle>
              <DialogDescription>{project.description}</DialogDescription>
            </DialogHeader>
            <div className="mt-4">
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 font-mono text-sm overflow-auto max-h-96">
                <pre>{project.code}</pre>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold text-lg line-clamp-1">{project.title}</h3>
            {project.remixedFrom && (
              <Badge variant="outline" className="text-xs">
                <GitBranch className="h-3 w-3 mr-1" />
                Remix
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>

          {project.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {project.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {project.tags.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{project.tags.length - 3}
                </Badge>
              )}
            </div>
          )}

          {project.remixedFrom && (
            <div className="text-xs text-muted-foreground">
              Remixed from <span className="font-medium">{project.remixedFrom.title}</span> by{" "}
              <span className="font-medium">{project.remixedFrom.author}</span>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="px-4 py-3 bg-gray-50 dark:bg-gray-900/50 flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            {project.views}
          </div>
          <button
            onClick={() => onLike?.(project.id)}
            className={`flex items-center gap-1 hover:text-red-500 transition-colors ${
              project.isLiked ? "text-red-500" : ""
            }`}
          >
            <Heart className={`h-4 w-4 ${project.isLiked ? "fill-current" : ""}`} />
            {project.likes}
          </button>
        </div>

        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={project.author.avatar || "/placeholder.svg"} />
            <AvatarFallback className="text-xs">{project.author.username.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground">{formatDate(project.createdAt)}</span>
        </div>
      </CardFooter>
    </Card>
  )
}
