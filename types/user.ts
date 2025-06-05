export interface User {
  id: string
  username: string
  email: string
  avatar?: string
  bio?: string
  location?: string
  website?: string
  joinDate: Date
  plan: "free" | "pro" | "enterprise"
  followers: number
  following: number
  totalProjects: number
  totalLikes: number
  isFollowing?: boolean
}

export interface ProjectVersion {
  id: string
  versionNumber: number
  createdAt: Date
  code: string
  prompt: string
  model: string
  description: string
  changes?: string
}

export interface Project {
  id: string
  title: string
  description: string
  previewImage?: string
  code: string
  prompt: string
  model: string
  visibility: "public" | "private"
  createdAt: Date
  updatedAt: Date
  author: User
  likes: number
  views: number
  isLiked?: boolean
  tags: string[]
  remixedFrom?: {
    id: string
    title: string
    author: string
  }
  versions?: ProjectVersion[]
  currentVersion?: number
  commentCount: number
}

export interface ProjectStats {
  totalViews: number
  totalLikes: number
  totalRemixes: number
  totalComments: number
}

export interface Comment {
  id: string
  projectId: string
  author: User
  content: string
  createdAt: Date
  updatedAt?: Date
  isEdited: boolean
  parentId?: string
  replies?: Comment[]
  replyCount: number
  likes: number
  isLiked?: boolean
}

export interface Notification {
  id: string
  type: "comment" | "like" | "follow" | "remix" | "mention"
  read: boolean
  createdAt: Date
  actor: User
  projectId?: string
  commentId?: string
  message: string
}

export interface SearchResult {
  type: "project" | "user" | "comment"
  id: string
  title?: string
  description?: string
  username?: string
  avatar?: string
  previewImage?: string
  matchedOn: string
  createdAt: Date
}
