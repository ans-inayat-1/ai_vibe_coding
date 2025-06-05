"use client"

import { useState, useEffect } from "react"
import { SearchIcon, X, User, Code, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import type { SearchResult } from "@/types/user"
import { useRouter } from "next/navigation"

interface SearchDialogProps {
  onSearch: (query: string) => Promise<SearchResult[]>
}

export function SearchDialog({ onSearch }: SearchDialogProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const router = useRouter()

  useEffect(() => {
    const handleSearch = async () => {
      if (query.trim().length < 2) {
        setResults([])
        return
      }

      setIsSearching(true)
      try {
        const searchResults = await onSearch(query)
        setResults(searchResults)
      } catch (error) {
        console.error("Search error:", error)
        setResults([])
      } finally {
        setIsSearching(false)
      }
    }

    const debounceTimer = setTimeout(handleSearch, 300)
    return () => clearTimeout(debounceTimer)
  }, [query, onSearch])

  const filteredResults = results.filter((result) => {
    if (activeTab === "all") return true
    return result.type === activeTab
  })

  const handleResultClick = (result: SearchResult) => {
    setOpen(false)

    if (result.type === "project") {
      router.push(`/project/${result.id}`)
    } else if (result.type === "user") {
      router.push(`/profile/${result.username}`)
    } else if (result.type === "comment") {
      router.push(`/project/${result.id}#comment-${result.id}`)
    }
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date)
  }

  const getResultIcon = (type: string) => {
    switch (type) {
      case "project":
        return <Code className="h-4 w-4 text-blue-500" />
      case "user":
        return <User className="h-4 w-4 text-green-500" />
      case "comment":
        return <MessageSquare className="h-4 w-4 text-purple-500" />
      default:
        return <SearchIcon className="h-4 w-4" />
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-[300px] justify-start text-muted-foreground">
          <SearchIcon className="h-4 w-4 mr-2" />
          Search projects, users, and more...
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] p-0">
        <DialogHeader className="p-4 border-b">
          <div className="flex items-center gap-2">
            <SearchIcon className="h-5 w-5 text-muted-foreground" />
            <DialogTitle>Search</DialogTitle>
          </div>
        </DialogHeader>

        <div className="p-4 border-b">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects, users, and more..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 pr-10"
              autoFocus
            />
            {query && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
                onClick={() => setQuery("")}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-4 bg-transparent p-0 border-b">
            <TabsTrigger
              value="all"
              className="flex-1 rounded-none border-b-2 border-transparent px-3 py-2 data-[state=active]:border-primary"
            >
              All ({results.length})
            </TabsTrigger>
            <TabsTrigger
              value="project"
              className="flex-1 rounded-none border-b-2 border-transparent px-3 py-2 data-[state=active]:border-primary"
            >
              Projects ({results.filter((r) => r.type === "project").length})
            </TabsTrigger>
            <TabsTrigger
              value="user"
              className="flex-1 rounded-none border-b-2 border-transparent px-3 py-2 data-[state=active]:border-primary"
            >
              Users ({results.filter((r) => r.type === "user").length})
            </TabsTrigger>
            <TabsTrigger
              value="comment"
              className="flex-1 rounded-none border-b-2 border-transparent px-3 py-2 data-[state=active]:border-primary"
            >
              Comments ({results.filter((r) => r.type === "comment").length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="p-0 m-0">
            <ScrollArea className="h-[400px]">
              {isSearching ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
              ) : filteredResults.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
                  <SearchIcon className="h-10 w-10 text-muted-foreground mb-2" />
                  <h4 className="font-medium">
                    {query.trim().length < 2 ? "Start typing to search" : "No results found"}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {query.trim().length < 2
                      ? "Search for projects, users, or comments"
                      : `No ${activeTab === "all" ? "results" : activeTab + "s"} found for "${query}"`}
                  </p>
                </div>
              ) : (
                <div className="space-y-1">
                  {filteredResults.map((result) => (
                    <div
                      key={`${result.type}-${result.id}`}
                      className="flex items-start gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-900 cursor-pointer"
                      onClick={() => handleResultClick(result)}
                    >
                      <div className="mt-1">{getResultIcon(result.type)}</div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {result.type === "user" && result.avatar && (
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={result.avatar || "/placeholder.svg"} />
                                <AvatarFallback>{result.username?.charAt(0)}</AvatarFallback>
                              </Avatar>
                            )}
                            <span className="font-medium">
                              {result.type === "user" ? result.username : result.title}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {result.type}
                            </Badge>
                          </div>
                          <span className="text-xs text-muted-foreground">{formatDate(result.createdAt)}</span>
                        </div>
                        {result.description && (
                          <p className="text-sm text-muted-foreground line-clamp-2">{result.description}</p>
                        )}
                        <div className="text-xs text-muted-foreground">Matched on: {result.matchedOn}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
