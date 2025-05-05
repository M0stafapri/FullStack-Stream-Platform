import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Eye, Heart, MessageSquare } from "lucide-react"

export function RecentVideos() {
  // This would normally be fetched from your API
  const recentVideos = [
    {
      id: "1",
      title: "How to Create a Stunning Video Intro",
      views: 1240,
      likes: 89,
      comments: 12,
      date: "2 days ago",
    },
    {
      id: "2",
      title: "Top 5 Camera Settings for Better Videos",
      views: 856,
      likes: 67,
      comments: 8,
      date: "5 days ago",
    },
    {
      id: "3",
      title: "Video Editing Tips for Beginners",
      views: 2103,
      likes: 145,
      comments: 23,
      date: "1 week ago",
    },
  ]

  return (
    <div className="space-y-4">
      {recentVideos.map((video) => (
        <div key={video.id} className="flex items-center gap-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={video.title} />
            <AvatarFallback>VD</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">{video.title}</p>
            <p className="text-xs text-muted-foreground">{video.date}</p>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Eye className="h-3.5 w-3.5" />
              <span>{video.views}</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className="h-3.5 w-3.5" />
              <span>{video.likes}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageSquare className="h-3.5 w-3.5" />
              <span>{video.comments}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
