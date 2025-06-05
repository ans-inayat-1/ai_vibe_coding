import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

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

interface ChatMessageProps {
  message: Message
  isCurrentUser: boolean
}

export function ChatMessage({ message, isCurrentUser }: ChatMessageProps) {
  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
    }).format(date)
  }

  return (
    <div className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}>
      <div className={`flex ${isCurrentUser ? "flex-row-reverse" : "flex-row"} items-start gap-2 max-w-[80%]`}>
        {!isCurrentUser && (
          <Avatar className="h-8 w-8">
            <AvatarImage src={message.sender.avatar || "/placeholder.svg"} />
            <AvatarFallback>{message.sender.name.charAt(0)}</AvatarFallback>
          </Avatar>
        )}
        <div>
          <div className={`flex items-center gap-2 ${isCurrentUser ? "justify-end" : "justify-start"} mb-1`}>
            <span className="text-xs text-muted-foreground">{formatTime(message.timestamp)}</span>
            <span className="text-sm font-medium">{message.sender.name}</span>
          </div>
          <div
            className={`rounded-lg px-4 py-2 text-sm ${
              isCurrentUser
                ? "bg-blue-500 text-white dark:bg-blue-600"
                : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
            }`}
          >
            {message.content}
          </div>
        </div>
      </div>
    </div>
  )
}
