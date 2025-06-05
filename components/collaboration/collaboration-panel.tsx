"use client"

import { useState, useEffect } from "react"
import { Users, UserPlus, MessageSquare, Share2, Globe, Lock, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChatMessage } from "@/components/collaboration/chat-message"

type Collaborator = {
  id: string
  name: string
  email: string
  avatar?: string
  status: "online" | "offline" | "away"
  role: "owner" | "editor" | "viewer"
  lastActive?: Date
}

type Message = {
  id: string
  sender: Collaborator
  content: string
  timestamp: Date
}

const collaborators: Collaborator[] = [
  {
    id: "1",
    name: "You",
    email: "you@example.com",
    status: "online",
    role: "owner",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    status: "online",
    role: "editor",
    lastActive: new Date(),
  },
  {
    id: "3",
    name: "Alex Johnson",
    email: "alex@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    status: "away",
    role: "editor",
    lastActive: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
  },
  {
    id: "4",
    name: "Sam Wilson",
    email: "sam@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    status: "offline",
    role: "viewer",
    lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
  },
]

const initialMessages: Message[] = [
  {
    id: "msg1",
    sender: collaborators[1],
    content: "I've updated the hero section with a new gradient background.",
    timestamp: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
  },
  {
    id: "msg2",
    sender: collaborators[0],
    content: "Looks great! Can we also adjust the button styling to match?",
    timestamp: new Date(Date.now() - 40 * 60 * 1000), // 40 minutes ago
  },
  {
    id: "msg3",
    sender: collaborators[2],
    content: "I'll work on the button styling. Should we use rounded corners or keep them square?",
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
  },
  {
    id: "msg4",
    sender: collaborators[0],
    content: "Let's go with slightly rounded corners to match the overall design.",
    timestamp: new Date(Date.now() - 25 * 60 * 1000), // 25 minutes ago
  },
]

export function CollaborationPanel() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [newMessage, setNewMessage] = useState("")
  const [projectVisibility, setProjectVisibility] = useState<"private" | "public">("private")

  const sendMessage = () => {
    if (!newMessage.trim()) return

    const message: Message = {
      id: `msg${Date.now()}`,
      sender: collaborators[0], // Current user
      content: newMessage,
      timestamp: new Date(),
    }

    setMessages([...messages, message])
    setNewMessage("")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "away":
        return "bg-yellow-500"
      case "offline":
        return "bg-gray-400"
      default:
        return "bg-gray-400"
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "owner":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      case "editor":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "viewer":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
    }).format(date)
  }

  const formatLastActive = (date?: Date) => {
    if (!date) return "Never"

    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)

    if (diffMins < 1) return "Just now"
    if (diffMins < 60) return `${diffMins}m ago`

    const diffHours = Math.floor(diffMins / 60)
    if (diffHours < 24) return `${diffHours}h ago`

    const diffDays = Math.floor(diffHours / 24)
    return `${diffDays}d ago`
  }

  // Auto-scroll to bottom of chat when new messages arrive
  useEffect(() => {
    const chatContainer = document.getElementById("chat-messages")
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight
    }
  }, [messages])

  return (
    <Card className="shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Users className="mr-2 h-5 w-5 text-muted-foreground" />
            <CardTitle>Collaboration</CardTitle>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Project Visibility</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setProjectVisibility("private")}
                className="flex items-center cursor-pointer"
              >
                <Lock className="mr-2 h-4 w-4" />
                <span>Private</span>
                {projectVisibility === "private" && <Badge className="ml-auto">Current</Badge>}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setProjectVisibility("public")}
                className="flex items-center cursor-pointer"
              >
                <Globe className="mr-2 h-4 w-4" />
                <span>Public</span>
                {projectVisibility === "public" && <Badge className="ml-auto">Current</Badge>}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <UserPlus className="mr-2 h-4 w-4" />
                <span>Invite People</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <CardDescription>Collaborate with team members in real-time</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="chat">
          <TabsList className="w-full rounded-none border-b bg-transparent p-0">
            <TabsTrigger
              value="chat"
              className="flex-1 rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary"
            >
              Chat
            </TabsTrigger>
            <TabsTrigger
              value="people"
              className="flex-1 rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary"
            >
              People
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="p-0">
            <div className="flex flex-col h-[400px]">
              <ScrollArea id="chat-messages" className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <ChatMessage key={message.id} message={message} isCurrentUser={message.sender.id === "1"} />
                  ))}
                </div>
              </ScrollArea>

              <div className="p-4 border-t">
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        sendMessage()
                      }
                    }}
                  />
                  <Button onClick={sendMessage}>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Send
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="people" className="p-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium">Collaborators ({collaborators.length})</h3>
                <Button size="sm" variant="outline">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Invite
                </Button>
              </div>

              <div className="space-y-3">
                {collaborators.map((user) => (
                  <div key={user.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={user.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span
                          className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white dark:border-gray-800 ${getStatusColor(user.status)}`}
                        />
                      </div>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-xs text-muted-foreground">{user.email}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getRoleColor(user.role)} variant="secondary">
                        {user.role}
                      </Badge>
                      {user.id !== "1" && (
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          {formatLastActive(user.lastActive)}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-medium mb-2">Project Visibility</h3>
                <div className="flex items-center gap-2">
                  {projectVisibility === "private" ? (
                    <>
                      <Lock className="h-4 w-4 text-muted-foreground" />
                      <span>Private - Only invited people can access</span>
                    </>
                  ) : (
                    <>
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <span>Public - Anyone with the link can view</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
