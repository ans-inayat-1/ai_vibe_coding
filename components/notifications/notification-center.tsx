"use client"

import { useState } from "react"
import { Bell, X, Check, User, Heart, GitBranch, MessageSquare, AtSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Notification } from "@/types/user"

interface NotificationCenterProps {
  notifications: Notification[]
  onMarkAsRead: (notificationId: string) => void
  onMarkAllAsRead: () => void
  onDeleteNotification: (notificationId: string) => void
}

export function NotificationCenter({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onDeleteNotification,
}: NotificationCenterProps) {
  const [open, setOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  const unreadCount = notifications.filter((notification) => !notification.read).length

  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === "all") return true
    if (activeTab === "unread") return !notification.read
    return notification.type === activeTab
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

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "comment":
        return <MessageSquare className="h-4 w-4 text-blue-500" />
      case "like":
        return <Heart className="h-4 w-4 text-red-500" />
      case "follow":
        return <User className="h-4 w-4 text-green-500" />
      case "remix":
        return <GitBranch className="h-4 w-4 text-purple-500" />
      case "mention":
        return <AtSign className="h-4 w-4 text-yellow-500" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-[1.2rem] w-[1.2rem]" />
          {unreadCount > 0 && (
            <Badge
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500"
              variant="destructive"
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[380px] p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold">Notifications</h3>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={onMarkAllAsRead}>
              <Check className="h-3.5 w-3.5 mr-1" />
              Mark all as read
            </Button>
          )}
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-5 bg-transparent p-0 border-b">
            <TabsTrigger
              value="all"
              className="flex-1 rounded-none border-b-2 border-transparent px-3 py-2 data-[state=active]:border-primary"
            >
              All
            </TabsTrigger>
            <TabsTrigger
              value="unread"
              className="flex-1 rounded-none border-b-2 border-transparent px-3 py-2 data-[state=active]:border-primary"
            >
              Unread
            </TabsTrigger>
            <TabsTrigger
              value="comment"
              className="flex-1 rounded-none border-b-2 border-transparent px-3 py-2 data-[state=active]:border-primary"
            >
              <MessageSquare className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger
              value="like"
              className="flex-1 rounded-none border-b-2 border-transparent px-3 py-2 data-[state=active]:border-primary"
            >
              <Heart className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger
              value="follow"
              className="flex-1 rounded-none border-b-2 border-transparent px-3 py-2 data-[state=active]:border-primary"
            >
              <User className="h-4 w-4" />
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="p-0 m-0">
            {filteredNotifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
                <Bell className="h-10 w-10 text-muted-foreground mb-2" />
                <h4 className="font-medium">No notifications</h4>
                <p className="text-sm text-muted-foreground">
                  {activeTab === "all"
                    ? "You don't have any notifications yet"
                    : activeTab === "unread"
                      ? "You don't have any unread notifications"
                      : `You don't have any ${activeTab} notifications`}
                </p>
              </div>
            ) : (
              <ScrollArea className="h-[300px]">
                {filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex items-start gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-900 ${
                      !notification.read ? "bg-blue-50 dark:bg-blue-950" : ""
                    }`}
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={notification.actor.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{notification.actor.username.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-1">
                            {getNotificationIcon(notification.type)}
                            <span className="text-xs font-medium">{notification.actor.username}</span>
                          </div>
                          <p className="text-sm">{notification.message}</p>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span className="text-xs text-muted-foreground">{formatDate(notification.createdAt)}</span>
                          {!notification.read && (
                            <Badge className="h-2 w-2 rounded-full p-0 bg-blue-500" variant="default" />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => onMarkAsRead(notification.id)}
                        >
                          <Check className="h-3.5 w-3.5" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => onDeleteNotification(notification.id)}
                      >
                        <X className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            )}
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  )
}
