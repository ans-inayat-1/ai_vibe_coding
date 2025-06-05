"use client"

import { useState } from "react"
import { Calendar, MapPin, LinkIcon, Edit, Settings, Share2, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserProjects } from "@/components/profile/user-projects"
import { CommunityProjects } from "@/components/profile/community-projects"
import { RemixDialog } from "@/components/profile/remix-dialog"
import type { User, Project, ProjectStats } from "@/types/user"

// Mock data - in a real app, this would come from your API
const mockUser: User = {
  id: "1",
  username: "johndoe",
  email: "john@example.com",
  avatar: "/placeholder.svg?height=120&width=120",
  bio: "Full-stack developer passionate about creating beautiful user interfaces with AI. Love experimenting with new technologies and sharing knowledge with the community.",
  location: "San Francisco, CA",
  website: "https://johndoe.dev",
  joinDate: new Date("2023-01-15"),
  plan: "pro",
  followers: 1234,
  following: 567,
  totalProjects: 42,
  totalLikes: 8901,
}

const mockUserProjects: Project[] = [
  {
    id: "1",
    title: "Modern Dashboard",
    description: "A sleek and responsive dashboard with dark mode support and real-time data visualization.",
    previewImage: "/placeholder.svg?height=200&width=300",
    code: "// Dashboard component code here...",
    prompt: "Create a modern dashboard with charts and data tables",
    model: "chatgpt-4",
    visibility: "public",
    createdAt: new Date("2023-12-01"),
    updatedAt: new Date("2023-12-01"),
    author: mockUser,
    likes: 156,
    views: 2341,
    isLiked: false,
    tags: ["dashboard", "charts", "react", "tailwind"],
  },
  {
    id: "2",
    title: "E-commerce Product Card",
    description: "Beautiful product card component with hover effects and add to cart functionality.",
    previewImage: "/placeholder.svg?height=200&width=300",
    code: "// Product card component code here...",
    prompt: "Design an e-commerce product card with animations",
    model: "claude-3.5-sonnet",
    visibility: "private",
    createdAt: new Date("2023-11-28"),
    updatedAt: new Date("2023-11-28"),
    author: mockUser,
    likes: 89,
    views: 1567,
    isLiked: true,
    tags: ["ecommerce", "card", "animation", "vue"],
  },
  // Add more mock projects...
]

const mockCommunityProjects: Project[] = [
  {
    id: "c1",
    title: "AI Chat Interface",
    description: "Modern chat interface with typing indicators and message bubbles.",
    previewImage: "/placeholder.svg?height=200&width=300",
    code: "// Chat interface code here...",
    prompt: "Create a chat interface like ChatGPT",
    model: "vizcode-1.5-booster",
    visibility: "public",
    createdAt: new Date("2023-12-02"),
    updatedAt: new Date("2023-12-02"),
    author: {
      id: "2",
      username: "aidesigner",
      email: "ai@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      bio: "",
      joinDate: new Date("2023-01-01"),
      plan: "pro",
      followers: 890,
      following: 234,
      totalProjects: 28,
      totalLikes: 5432,
    },
    likes: 234,
    views: 3456,
    isLiked: false,
    tags: ["chat", "ai", "interface", "react"],
  },
  // Add more mock community projects...
]

interface UserProfilePageProps {
  userId?: string
  isOwner?: boolean
}

export function UserProfilePage({ userId, isOwner = false }: UserProfilePageProps) {
  const [user] = useState<User>(mockUser)
  const [userProjects, setUserProjects] = useState<Project[]>(mockUserProjects)
  const [communityProjects] = useState<Project[]>(mockCommunityProjects)
  const [remixProject, setRemixProject] = useState<Project | null>(null)
  const [showRemixDialog, setShowRemixDialog] = useState(false)

  const stats: ProjectStats = {
    totalViews: userProjects.reduce((sum, project) => sum + project.views, 0),
    totalLikes: userProjects.reduce((sum, project) => sum + project.likes, 0),
    totalRemixes: userProjects.filter((project) => project.remixedFrom).length,
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      year: "numeric",
    }).format(date)
  }

  const handleVisibilityChange = (projectId: string, visibility: "public" | "private") => {
    setUserProjects((prev) => prev.map((project) => (project.id === projectId ? { ...project, visibility } : project)))
  }

  const handleRemix = (project: Project) => {
    setRemixProject(project)
    setShowRemixDialog(true)
  }

  const handleRemixConfirm = (remixData: {
    title: string
    description: string
    originalProjectId: string
  }) => {
    const originalProject = [...userProjects, ...communityProjects].find((p) => p.id === remixData.originalProjectId)

    if (!originalProject) return

    const newProject: Project = {
      id: `remix-${Date.now()}`,
      title: remixData.title,
      description: remixData.description,
      code: originalProject.code,
      prompt: originalProject.prompt,
      model: originalProject.model,
      visibility: "public",
      createdAt: new Date(),
      updatedAt: new Date(),
      author: user,
      likes: 0,
      views: 0,
      isLiked: false,
      tags: originalProject.tags,
      remixedFrom: {
        id: originalProject.id,
        title: originalProject.title,
        author: originalProject.author.username,
      },
    }

    setUserProjects((prev) => [newProject, ...prev])

    // In a real app, you would navigate to the editor with the remixed project
    console.log("Remixed project created:", newProject)
  }

  const handleLike = (projectId: string) => {
    setUserProjects((prev) =>
      prev.map((project) =>
        project.id === projectId
          ? {
              ...project,
              likes: project.isLiked ? project.likes - 1 : project.likes + 1,
              isLiked: !project.isLiked,
            }
          : project,
      ),
    )
  }

  const handleDelete = (projectId: string) => {
    setUserProjects((prev) => prev.filter((project) => project.id !== projectId))
  }

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case "free":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
      case "pro":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "enterprise":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <Card className="mb-8 shadow-lg">
          <CardContent className="p-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Avatar and Basic Info */}
              <div className="flex flex-col items-center lg:items-start">
                <Avatar className="h-32 w-32 mb-4">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-2xl">{user.username.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="text-center lg:text-left">
                  <h1 className="text-3xl font-bold mb-2">{user.username}</h1>
                  <Badge className={getPlanColor(user.plan)} variant="secondary">
                    {user.plan.charAt(0).toUpperCase() + user.plan.slice(1)} Plan
                  </Badge>
                </div>
              </div>

              {/* Profile Details */}
              <div className="flex-1 space-y-4">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="space-y-2">
                    {user.bio && <p className="text-muted-foreground max-w-2xl">{user.bio}</p>}
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      {user.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {user.location}
                        </div>
                      )}
                      {user.website && (
                        <div className="flex items-center gap-1">
                          <LinkIcon className="h-4 w-4" />
                          <a
                            href={user.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {user.website.replace(/^https?:\/\//, "")}
                          </a>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Joined {formatDate(user.joinDate)}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-4 lg:mt-0">
                    {isOwner ? (
                      <>
                        <Button variant="outline">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Profile
                        </Button>
                        <Button variant="outline">
                          <Settings className="h-4 w-4 mr-2" />
                          Settings
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button>
                          <Users className="h-4 w-4 mr-2" />
                          Follow
                        </Button>
                        <Button variant="outline">
                          <Share2 className="h-4 w-4 mr-2" />
                          Share
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 pt-4 border-t">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{user.totalProjects}</div>
                    <div className="text-sm text-muted-foreground">Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Views</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{stats.totalLikes.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Likes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{user.followers.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{user.following.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Following</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="projects" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="projects">{isOwner ? "My Projects" : "Projects"}</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
          </TabsList>

          <TabsContent value="projects">
            <UserProjects
              user={user}
              projects={userProjects}
              isOwner={isOwner}
              onVisibilityChange={handleVisibilityChange}
              onRemix={handleRemix}
              onLike={handleLike}
              onDelete={handleDelete}
            />
          </TabsContent>

          <TabsContent value="community">
            <CommunityProjects projects={communityProjects} onRemix={handleRemix} onLike={handleLike} />
          </TabsContent>
        </Tabs>

        {/* Remix Dialog */}
        <RemixDialog
          project={remixProject}
          open={showRemixDialog}
          onOpenChange={setShowRemixDialog}
          onRemix={handleRemixConfirm}
        />
      </div>
    </div>
  )
}
