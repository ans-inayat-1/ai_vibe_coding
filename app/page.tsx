"use client"

import type React from "react"

import { useState } from "react"
import { ArrowUp, Plus, Globe, Sparkles, Heart, Code, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"

const categories = ["Discover", "Internal Tools", "Website", "Personal", "Consumer App", "B2B App", "Prototype"]

const communityProjects = [
  {
    id: 1,
    title: "AI Dashboard",
    description: "Modern analytics dashboard with AI insights",
    author: "Sarah Chen",
    avatar: "/placeholder.svg",
    category: "Internal Tools",
    likes: 124,
    isPublic: true,
  },
  {
    id: 2,
    title: "E-commerce Store",
    description: "Full-featured online store with payment integration",
    author: "Mike Johnson",
    avatar: "/placeholder.svg",
    category: "Website",
    likes: 89,
    isPublic: true,
  },
  {
    id: 3,
    title: "Task Manager",
    description: "Collaborative project management tool",
    author: "Alex Rivera",
    avatar: "/placeholder.svg",
    category: "B2B App",
    likes: 156,
    isPublic: true,
  },
  {
    id: 4,
    title: "Portfolio Site",
    description: "Creative portfolio with animations",
    author: "Emma Davis",
    avatar: "/placeholder.svg",
    category: "Personal",
    likes: 67,
    isPublic: true,
  },
]

export default function HomePage() {
  const [prompt, setPrompt] = useState("")
  const [isPublic, setIsPublic] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("Discover")
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = () => {
    if (!prompt.trim()) return

    setIsGenerating(true)
    // Simulate AI generation
    setTimeout(() => {
      setIsGenerating(false)
      // Navigate to generated project
    }, 3000)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      handleGenerate()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-orange-400">
      {/* Header */}
      <header className="relative z-10 flex items-center justify-between p-6">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-lg">
              <Heart className="w-5 h-5 text-red-500" />
            </div>
            <span className="text-xl font-bold text-white">Lovable</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/community" className="text-white/80 hover:text-white transition-colors">
              Community
            </Link>
            <Link href="/teams" className="text-white/80 hover:text-white transition-colors">
              Teams
            </Link>
            <Link href="/learn" className="text-white/80 hover:text-white transition-colors">
              Learn
            </Link>
            <Link href="/shipped" className="text-white/80 hover:text-white transition-colors">
              Shipped
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Button variant="ghost" className="text-white hover:bg-white/10">
            Log in
          </Button>
          <Button className="bg-black text-white hover:bg-black/80">Sign up</Button>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 py-20">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            Build something <Heart className="inline w-12 h-12 md:w-16 md:h-16 text-red-500 mx-2" />
            Lovable
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto">
            Create apps and websites by chatting with AI
          </p>
        </div>

        {/* Main Input */}
        <div className="w-full max-w-4xl mx-auto">
          <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <Textarea
                  placeholder="Ask Lovable to create a landing page for a SaaS startup..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="min-h-[120px] border-0 resize-none text-lg placeholder:text-gray-400 focus-visible:ring-0 bg-transparent"
                />

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-3">
                    <Button variant="ghost" size="sm" className="text-gray-600 hover:bg-gray-100">
                      <Plus className="w-4 h-4 mr-2" />
                      Add files
                    </Button>

                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-gray-600" />
                      <span className="text-sm text-gray-600">Public</span>
                      <Switch
                        checked={isPublic}
                        onCheckedChange={setIsPublic}
                        className="data-[state=checked]:bg-blue-500"
                      />
                    </div>
                  </div>

                  <Button
                    onClick={handleGenerate}
                    disabled={!prompt.trim() || isGenerating}
                    className="bg-gray-900 hover:bg-gray-800 text-white rounded-full w-12 h-12 p-0"
                  >
                    {isGenerating ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <ArrowUp className="w-5 h-5" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-3 mt-6 justify-center">
            {["Create a todo app", "Build a landing page", "Make a dashboard", "Design a portfolio"].map(
              (suggestion) => (
                <Button
                  key={suggestion}
                  variant="outline"
                  onClick={() => setPrompt(suggestion)}
                  className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm"
                >
                  {suggestion}
                </Button>
              ),
            )}
          </div>
        </div>
      </div>

      {/* Community Section */}
      <div className="relative z-10 mx-6 mb-12">
        <Card className="bg-white/95 backdrop-blur-sm shadow-2xl">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">From the Community</h2>
              <Button variant="outline" className="text-gray-600">
                View All
              </Button>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "bg-gray-900 text-white" : "text-gray-600"}
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Project Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {communityProjects.map((project) => (
                <Card
                  key={project.id}
                  className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-gray-200 hover:border-gray-300"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <Badge variant="secondary" className="text-xs">
                        {project.category}
                      </Badge>
                      <div className="flex items-center gap-1 text-gray-500">
                        <Heart className="w-4 h-4" />
                        <span className="text-sm">{project.likes}</span>
                      </div>
                    </div>

                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{project.description}</p>

                    <div className="flex items-center gap-2">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={project.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{project.author[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-gray-600">{project.author}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Features Section */}
      <div className="relative z-10 mx-6 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <Sparkles className="w-8 h-8 text-yellow-500" />,
              title: "AI-Powered Generation",
              description: "Describe your idea and watch AI build it in real-time",
            },
            {
              icon: <Code className="w-8 h-8 text-blue-500" />,
              title: "Production Ready",
              description: "Generate clean, deployable code with modern frameworks",
            },
            {
              icon: <Zap className="w-8 h-8 text-purple-500" />,
              title: "Instant Preview",
              description: "See your app come to life instantly with live preview",
            },
          ].map((feature, index) => (
            <Card key={index} className="bg-white/20 backdrop-blur-sm border-white/30 text-white">
              <CardContent className="p-6 text-center">
                <div className="mb-4 flex justify-center">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-white/80">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-500" />
      </div>
    </div>
  )
}
