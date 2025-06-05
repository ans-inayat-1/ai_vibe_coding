"use client"

import { useState } from "react"
import { ReplyIcon as CommentIcon, Send, MoreHorizontal, Edit, Trash2, Reply, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Comment, User } from "@/types/user"

interface CommentListProps {
  projectId: string
  comments: Comment[]
  currentUser?: User
  onAddComment: (projectId: string, content: string, parentId?: string) => void
  onEditComment: (commentId: string, content: string) => void
  onDeleteComment: (commentId: string) => void
  onLikeComment: (commentId: string) => void
}

export function CommentList({
  projectId,
  comments,
  currentUser,
  onAddComment,
  onEditComment,
  onDeleteComment,
  onLikeComment,
}: CommentListProps) {
  const [newComment, setNewComment] = useState("")
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyContent, setReplyContent] = useState("")
  const [editingComment, setEditingComment] = useState<string | null>(null)
  const [editContent, setEditContent] = useState("")
  const [expandedReplies, setExpandedReplies] = useState<Record<string, boolean>>({})

  // Filter top-level comments
  const topLevelComments = comments.filter((comment) => !comment.parentId)

  // Group replies by parent comment
  const repliesByParent: Record<string, Comment[]> = {}
  comments
    .filter((comment) => comment.parentId)
    .forEach((reply) => {
      if (reply.parentId) {
        if (!repliesByParent[reply.parentId]) {
          repliesByParent[reply.parentId] = []
        }
        repliesByParent[reply.parentId].push(reply)
      }
    })

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      onAddComment(projectId, newComment)
      setNewComment("")
    }
  }

  const handleSubmitReply = (parentId: string) => {
    if (replyContent.trim()) {
      onAddComment(projectId, replyContent, parentId)
      setReplyingTo(null)
      setReplyContent("")
    }
  }

  const handleSubmitEdit = (commentId: string) => {
    if (editContent.trim()) {
      onEditComment(commentId, editContent)
      setEditingComment(null)
      setEditContent("")
    }
  }

  const handleStartEditing = (comment: Comment) => {
    setEditingComment(comment.id)
    setEditContent(comment.content)
  }

  const toggleReplies = (commentId: string) => {
    setExpandedReplies((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }))
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date)
  }

  const renderComment = (comment: Comment, isReply = false) => {
    const isAuthor = currentUser && currentUser.id === comment.author.id
    const isEditing = editingComment === comment.id
    const hasReplies = repliesByParent[comment.id] && repliesByParent[comment.id].length > 0
    const showReplies = expandedReplies[comment.id]

    return (
      <div key={comment.id} className={`${isReply ? "ml-8 mt-4" : "mt-6"}`}>
        <div className="flex gap-4">
          <Avatar className="h-8 w-8">
            <AvatarImage src={comment.author.avatar || "/placeholder.svg"} />
            <AvatarFallback>{comment.author.username.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-semibold">{comment.author.username}</span>
                <span className="text-xs text-muted-foreground">{formatDate(comment.createdAt)}</span>
                {comment.isEdited && <span className="text-xs text-muted-foreground">(edited)</span>}
              </div>
              {(isAuthor || (currentUser && currentUser.plan !== "free")) && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {isAuthor && (
                      <>
                        <DropdownMenuItem onClick={() => handleStartEditing(comment)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onDeleteComment(comment.id)} className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </>
                    )}
                    {!isAuthor && currentUser && currentUser.plan !== "free" && (
                      <DropdownMenuItem onClick={() => onDeleteComment(comment.id)} className="text-red-600">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Report
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>

            {isEditing ? (
              <div className="space-y-2">
                <Textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="min-h-[100px]"
                />
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm" onClick={() => setEditingComment(null)}>
                    Cancel
                  </Button>
                  <Button size="sm" onClick={() => handleSubmitEdit(comment.id)}>
                    Save
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-sm">{comment.content}</div>
            )}

            <div className="flex items-center gap-4 text-sm">
              <button
                onClick={() => onLikeComment(comment.id)}
                className={`flex items-center gap-1 hover:text-red-500 transition-colors ${
                  comment.isLiked ? "text-red-500" : ""
                }`}
              >
                <Heart className={`h-4 w-4 ${comment.isLiked ? "fill-current" : ""}`} />
                {comment.likes}
              </button>
              {currentUser && !isEditing && (
                <button
                  onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                  className="flex items-center gap-1 hover:text-blue-500 transition-colors"
                >
                  <Reply className="h-4 w-4" />
                  Reply
                </button>
              )}
              {hasReplies && (
                <button
                  onClick={() => toggleReplies(comment.id)}
                  className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <CommentIcon className="h-4 w-4" />
                  {showReplies ? "Hide" : "Show"} {comment.replyCount} {comment.replyCount === 1 ? "reply" : "replies"}
                </button>
              )}
            </div>

            {replyingTo === comment.id && (
              <div className="mt-4 space-y-2">
                <Textarea
                  placeholder={`Reply to ${comment.author.username}...`}
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  className="min-h-[80px]"
                />
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm" onClick={() => setReplyingTo(null)}>
                    Cancel
                  </Button>
                  <Button size="sm" onClick={() => handleSubmitReply(comment.id)}>
                    Reply
                  </Button>
                </div>
              </div>
            )}

            {hasReplies && showReplies && (
              <div className="mt-4 space-y-4">
                {repliesByParent[comment.id].map((reply) => renderComment(reply, true))}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          Comments <span className="text-muted-foreground">({comments.length})</span>
        </h3>
      </div>

      {currentUser && (
        <div className="flex gap-4">
          <Avatar className="h-8 w-8">
            <AvatarImage src={currentUser.avatar || "/placeholder.svg"} />
            <AvatarFallback>{currentUser.username.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <Textarea
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[100px]"
            />
            <div className="flex justify-end">
              <Button onClick={handleSubmitComment} disabled={!newComment.trim()}>
                <Send className="h-4 w-4 mr-2" />
                Comment
              </Button>
            </div>
          </div>
        </div>
      )}

      {comments.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <CommentIcon className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No comments yet</h3>
          <p className="text-muted-foreground mb-4">Be the first to share your thoughts!</p>
        </div>
      ) : (
        <div>{topLevelComments.map((comment) => renderComment(comment))}</div>
      )}
    </div>
  )
}
