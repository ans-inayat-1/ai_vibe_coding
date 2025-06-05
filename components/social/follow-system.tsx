"use client"

import { useState } from "react"
import { Users, UserPlus, UserMinus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { User } from "@/types/user"

interface FollowSystemProps {
  user: User
  followers: User[]
  following: User[]
  currentUser?: User
  onFollow: (userId: string) => void
  onUnfollow: (userId: string) => void
}

export function FollowSystem({ user, followers, following, currentUser, onFollow, onUnfollow }: FollowSystemProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("followers")

  const isCurrentUser = currentUser && currentUser.id === user.id
  const isFollowing = currentUser && user.isFollowing

  const filteredFollowers = followers.filter((follower) =>
    follower.username.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredFollowing = following.filter((followed) =>
    followed.username.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleFollowToggle = () => {
    if (isFollowing) {
      onUnfollow(user.id)
    } else {
      onFollow(user.id)
    }
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Users className="h-4 w-4 mr-2" />
              {user.followers} {user.followers === 1 ? "Follower" : "Followers"}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{user.username}'s Network</DialogTitle>
              <DialogDescription>People who follow and are followed by {user.username}</DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="followers" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="followers">Followers ({followers.length})</TabsTrigger>
                <TabsTrigger value="following">Following ({following.length})</TabsTrigger>
              </TabsList>

              <div className="my-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={`Search ${activeTab}...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <TabsContent value="followers" className="p-0 m-0">
                <ScrollArea className="h-[300px]">
                  {filteredFollowers.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
                      <Users className="h-10 w-10 text-muted-foreground mb-2" />
                      <h4 className="font-medium">No followers found</h4>
                      <p className="text-sm text-muted-foreground">
                        {searchQuery
                          ? "No followers match your search"
                          : `${user.username} doesn't have any followers yet`}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {filteredFollowers.map((follower) => (
                        <div
                          key={follower.id}
                          className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={follower.avatar || "/placeholder.svg"} />
                              <AvatarFallback>{follower.username.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{follower.username}</div>
                              <div className="text-xs text-muted-foreground">{follower.totalProjects} projects</div>
                            </div>
                          </div>
                          {currentUser && currentUser.id !== follower.id && (
                            <Button
                              variant={follower.isFollowing ? "outline" : "default"}
                              size="sm"
                              onClick={() => (follower.isFollowing ? onUnfollow(follower.id) : onFollow(follower.id))}
                            >
                              {follower.isFollowing ? (
                                <>
                                  <UserMinus className="h-3.5 w-3.5 mr-1" />
                                  Unfollow
                                </>
                              ) : (
                                <>
                                  <UserPlus className="h-3.5 w-3.5 mr-1" />
                                  Follow
                                </>
                              )}
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </TabsContent>

              <TabsContent value="following" className="p-0 m-0">
                <ScrollArea className="h-[300px]">
                  {filteredFollowing.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
                      <Users className="h-10 w-10 text-muted-foreground mb-2" />
                      <h4 className="font-medium">Not following anyone</h4>
                      <p className="text-sm text-muted-foreground">
                        {searchQuery
                          ? "No followed users match your search"
                          : `${user.username} isn't following anyone yet`}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {filteredFollowing.map((followed) => (
                        <div
                          key={followed.id}
                          className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={followed.avatar || "/placeholder.svg"} />
                              <AvatarFallback>{followed.username.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{followed.username}</div>
                              <div className="text-xs text-muted-foreground">{followed.totalProjects} projects</div>
                            </div>
                          </div>
                          {currentUser && currentUser.id !== followed.id && (
                            <Button variant="outline" size="sm" onClick={() => onUnfollow(followed.id)}>
                              <UserMinus className="h-3.5 w-3.5 mr-1" />
                              Unfollow
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Users className="h-4 w-4 mr-2" />
              {user.following} Following
            </Button>
          </DialogTrigger>
        </Dialog>

        {currentUser && currentUser.id !== user.id && (
          <Button variant={isFollowing ? "outline" : "default"} onClick={handleFollowToggle}>
            {isFollowing ? (
              <>
                <UserMinus className="h-4 w-4 mr-2" />
                Unfollow
              </>
            ) : (
              <>
                <UserPlus className="h-4 w-4 mr-2" />
                Follow
              </>
            )}
          </Button>
        )}
      </div>
    </>
  )
}
