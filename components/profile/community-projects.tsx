"use client"

import { useState } from "react"
import { Search, TrendingUp, Clock, Heart } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProjectCard } from "@/components/profile/project-card"
import type { Project } from "@/types/user"

interface CommunityProjectsProps {
  projects: Project[]
  onRemix?: (project: Project) => void
  onLike?: (projectId: string) => void
}

export function CommunityProjects({ projects, onRemix, onLike }: CommunityProjectsProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTag, setSelectedTag] = useState("all")

  // Get all unique tags from projects
  const allTags = Array.from(new Set(projects.flatMap((project) => project.tags))).sort()

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.author.username.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesTag = selectedTag === "all" || project.tags.includes(selectedTag)

    return matchesSearch && matchesTag
  })

  const trendingProjects = [...projects]
    .sort((a, b) => {
      // Simple trending algorithm: likes + views in last 7 days
      const aScore = a.likes * 2 + a.views
      const bScore = b.likes * 2 + b.views
      return bScore - aScore
    })
    .slice(0, 12)

  const recentProjects = [...projects]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 12)

  const popularProjects = [...projects].sort((a, b) => b.likes - a.likes).slice(0, 12)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Community Projects</h2>
        <p className="text-muted-foreground">Discover and remix amazing projects created by the community</p>
      </div>

      <Tabs defaultValue="trending" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="trending" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Trending
          </TabsTrigger>
          <TabsTrigger value="recent" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Recent
          </TabsTrigger>
          <TabsTrigger value="popular" className="flex items-center gap-2">
            <Heart className="h-4 w-4" />
            Popular
          </TabsTrigger>
          <TabsTrigger value="explore" className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            Explore
          </TabsTrigger>
        </TabsList>

        <TabsContent value="trending" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingProjects.map((project) => (
              <ProjectCard key={project.id} project={project} onRemix={onRemix} onLike={onLike} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recent" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentProjects.map((project) => (
              <ProjectCard key={project.id} project={project} onRemix={onRemix} onLike={onLike} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="popular" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularProjects.map((project) => (
              <ProjectCard key={project.id} project={project} onRemix={onRemix} onLike={onLike} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="explore" className="space-y-6">
          {/* Search and Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects, authors, or descriptions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedTag} onValueChange={setSelectedTag}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by tag" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tags</SelectItem>
                {allTags.map((tag) => (
                  <SelectItem key={tag} value={tag}>
                    {tag}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Filtered Results */}
          {filteredProjects.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No projects found</h3>
              <p className="text-muted-foreground">Try adjusting your search terms or filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} onRemix={onRemix} onLike={onLike} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
