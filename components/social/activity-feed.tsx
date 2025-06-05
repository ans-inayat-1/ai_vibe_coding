"use client"

import { useState } from "react"
import { Heart, Eye, Clock, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProjectCard } from "@/components/profile/project-card"
import type { Project, User } from "@/types/user"

interface ActivityFeedProps {
  currentUser: User
  followingProjects: Project[]
  onRemix: (project: Project) => void
  onLike: (projectId: string) => void
}

export function ActivityFeed({ currentUser, followingProjects, onRemix, onLike }: ActivityFeedProps) {
  const [filterBy, setFilterBy] = useState("recent")

  const sortedProjects = [...followingProjects].sort((a, b) => {
    switch (filterBy) {
      case "recent":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case "popular":
        return b.likes - a.likes
      case "trending":
        return b.views + b.likes * 2 - a.views - a.likes * 2
      default:
        return 0
    }
  })

  const formatDate = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMins / 60)
    const diffDays = Math.floor(diffHours / 24)

    if (diffMins < 1) return "Just now"
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`

    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(date)
  }

  return (
    <Card className="shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Activity Feed</CardTitle>
            <CardDescription>Projects from people you follow</CardDescription>
          </div>
          <Select value={filterBy} onValueChange={setFilterBy}>
            <SelectTrigger className="w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  Most Recent
                </div>
              </SelectItem>
              <SelectItem value="popular">
                <div className="flex items-center">
                  <Heart className="h-4 w-4 mr-2" />
                  Most Popular
                </div>
              </SelectItem>
              <SelectItem value="trending">
                <div className="flex items-center">
                  <Eye className="h-4 w-4 mr-2" />
                  Trending
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {sortedProjects.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No activity yet</h3>
            <p className="text-muted-foreground mb-4">Follow more creators to see their projects in your feed</p>
            <Button>Discover Creators</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sortedProjects.map((project) => (
              <ProjectCard key={project.id} project={project} onRemix={onRemix} onLike={onLike} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
