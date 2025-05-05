"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreVertical, Reply, ThumbsUp } from "lucide-react"

interface CommentSectionProps {
  videoId: string
}

export default function CommentSection({ videoId }: CommentSectionProps) {
  const [commentText, setCommentText] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // This would normally be fetched from your API
  const comments = [
    {
      id: "1",
      text: "This is exactly what I needed! Your explanation of the intro creation process is so clear and easy to follow. I've been struggling with making professional-looking intros for my channel, but now I feel confident I can create something great. Thanks for sharing your expertise!",
      date: "2 days ago",
      likes: 45,
      user: {
        id: "user1",
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      replies: [
        {
          id: "reply1",
          text: "I'm glad you found it helpful! Let me know if you have any questions.",
          date: "1 day ago",
          likes: 12,
          user: {
            id: "creator1",
            name: "VideoMaster",
            avatar: "/placeholder.svg?height=40&width=40",
            isCreator: true,
          },
        },
      ],
    },
    {
      id: "2",
      text: "I've been using After Effects for years and still learned some new tricks from this video. The way you explained the text animations was particularly helpful. Would love to see a follow-up tutorial on advanced transitions!",
      date: "3 days ago",
      likes: 32,
      user: {
        id: "user2",
        name: "Michael Chen",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      replies: [],
    },
    {
      id: "3",
      text: "Great tutorial! I'm wondering what plugins you're using for those text effects at 2:45?",
      date: "1 week ago",
      likes: 18,
      user: {
        id: "user3",
        name: "Emma Wilson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      replies: [
        {
          id: "reply2",
          text: "I'm using the Animation Composer plugin for those effects. It's free and has tons of great presets!",
          date: "6 days ago",
          likes: 8,
          user: {
            id: "creator1",
            name: "VideoMaster",
            avatar: "/placeholder.svg?height=40&width=40",
            isCreator: true,
          },
        },
      ],
    },
  ]

  const handleSubmitComment = async () => {
    if (!commentText.trim()) return

    setIsSubmitting(true)

    // This would be replaced with your actual API call
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Reset form after successful submission
      setCommentText("")
      // You would typically refresh comments here
    } catch (error) {
      console.error("Failed to submit comment:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">{comments.length} Comments</h3>
        <Button variant="ghost" size="sm">
          Sort by
        </Button>
      </div>

      <div className="flex gap-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Your avatar" />
          <AvatarFallback>YA</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-2">
          <Textarea
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="min-h-20 resize-none"
          />
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setCommentText("")}>
              Cancel
            </Button>
            <Button onClick={handleSubmitComment} disabled={!commentText.trim() || isSubmitting}>
              {isSubmitting ? "Commenting..." : "Comment"}
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="space-y-4">
            <div className="flex gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={comment.user.avatar || "/placeholder.svg"} alt={comment.user.name} />
                <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{comment.user.name}</span>
                  <span className="text-xs text-muted-foreground">{comment.date}</span>
                </div>
                <p className="mt-1 text-sm">{comment.text}</p>
                <div className="mt-2 flex items-center gap-4">
                  <Button variant="ghost" size="sm" className="h-8 gap-1 px-2">
                    <ThumbsUp className="h-4 w-4" />
                    <span>{comment.likes}</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 gap-1 px-2">
                    <Reply className="h-4 w-4" />
                    <span>Reply</span>
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 px-2">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Report</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>

            {comment.replies.length > 0 && (
              <div className="ml-14 space-y-4">
                {comment.replies.map((reply) => (
                  <div key={reply.id} className="flex gap-4">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={reply.user.avatar || "/placeholder.svg"} alt={reply.user.name} />
                      <AvatarFallback>{reply.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{reply.user.name}</span>
                        {reply.user.isCreator && (
                          <span className="rounded bg-primary/10 px-1.5 py-0.5 text-xs font-medium text-primary">
                            Creator
                          </span>
                        )}
                        <span className="text-xs text-muted-foreground">{reply.date}</span>
                      </div>
                      <p className="mt-1 text-sm">{reply.text}</p>
                      <div className="mt-2 flex items-center gap-4">
                        <Button variant="ghost" size="sm" className="h-6 gap-1 px-2 text-xs">
                          <ThumbsUp className="h-3 w-3" />
                          <span>{reply.likes}</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="h-6 gap-1 px-2 text-xs">
                          <Reply className="h-3 w-3" />
                          <span>Reply</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
