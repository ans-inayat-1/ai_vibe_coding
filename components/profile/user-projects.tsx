"use client"

import { useState } from "react"
import { Plus, Search, Filter, Grid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProjectCard } from "@/components/profile/project-card"
import type { Project, User } from "@/types/user"

interface UserProjectsProps {
  user: User
  projects: Project[]
  isOwner?: boolean
  onCreateProject?: () => void
  onVisibilityChange?: (projectId: string, visibility: "public" | "private") => void
  onRemix?: (project: Project) => void
  onLike?: (projectId: string) => void
  onDelete?: (projectId: string) => void
}

export function UserProjects({
  user,
  projects,
  isOwner = false,
  onCreateProject,
  onVisibilityChange,
  onRemix,
  onLike,
  onDelete,
}: UserProjectsProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("recent")
  const [filterBy, setFilterBy] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const filteredProjects = projects
    .filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesFilter =
        filterBy === "all" ||
        (filterBy === "public" && project.visibility === "public") ||
        (filterBy === "private" && project.visibility === "private") ||
        (filterBy === "remixed" && project.remixedFrom)

      return matchesSearch && matchesFilter
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "recent":
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        case "oldest":
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        case "popular":
          return b.likes - a.likes
        case "views":
          return b.views - a.views
        default:
          return 0
      }
    })

  const publicProjects = projects.filter((p) => p.visibility === "public")
  const privateProjects = projects.filter((p) => p.visibility === "private")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{isOwner ? "My Projects" : `${user.username}'s Projects`}</h2>
          <p className="text-muted-foreground">
            {isOwner
              ? `${projects.length} projects • ${publicProjects.length} public • ${privateProjects.length} private`
              : `${publicProjects.length} public projects`}
          </p>
        </div>
        {isOwner && onCreateProject && (
          <Button onClick={onCreateProject} className="bg-gradient-to-r from-blue-500 to-purple-600">
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Button>
        )}
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Recent</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="popular">Popular</SelectItem>
              <SelectItem value="views">Most Viewed</SelectItem>
            </SelectContent>
          </Select>

          {isOwner && (
            <Select value={filterBy} onValueChange={setFilterBy}>
              <SelectTrigger className="w-32">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="public">Public</SelectItem>
                <SelectItem value="private">Private</SelectItem>
                <SelectItem value="remixed">Remixed</SelectItem>
              </SelectContent>
            </Select>
          )}

          <div className="flex border rounded-md">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="icon"
              onClick={() => setViewMode("grid")}
              className="rounded-r-none"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="icon"
              onClick={() => setViewMode("list")}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Projects Grid/List */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No projects found</h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery
              ? "Try adjusting your search or filters"
              : isOwner
                ? "Create your first project to get started"
                : "This user hasn't created any public projects yet"}
          </p>
          {isOwner && onCreateProject && !searchQuery && (
            <Button onClick={onCreateProject} className="bg-gradient-to-r from-blue-500 to-purple-600">
              <Plus className="h-4 w-4 mr-2" />
              Create Project
            </Button>
          )}
        </div>
      ) : (
        <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              isOwner={isOwner}
              onVisibilityChange={onVisibilityChange}
              onRemix={onRemix}
              onLike={onLike}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  )
}
