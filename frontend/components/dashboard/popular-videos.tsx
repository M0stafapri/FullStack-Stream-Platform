import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Eye, Heart, MessageSquare, MoreVertical, Pencil, Trash } from "lucide-react"
import Image from "next/image"

interface PopularVideosProps {
  videos?: any[]
}

export function PopularVideos({ videos }: PopularVideosProps) {
  // Default videos if none provided
  const defaultVideos = [
    {
      id: "1",
      title: "How to Create a Stunning Video Intro",
      thumbnail: "/placeholder.svg?height=120&width=200",
      views: 1240,
      likes: 89,
      comments: 12,
      date: "2023-04-15",
      status: "published",
    },
    {
      id: "2",
      title: "Top 5 Camera Settings for Better Videos",
      thumbnail: "/placeholder.svg?height=120&width=200",
      views: 856,
      likes: 67,
      comments: 8,
      date: "2023-04-10",
      status: "published",
    },
    {
      id: "3",
      title: "Video Editing Tips for Beginners",
      thumbnail: "/placeholder.svg?height=120&width=200",
      views: 2103,
      likes: 145,
      comments: 23,
      date: "2023-04-05",
      status: "published",
    },
    {
      id: "4",
      title: "Lighting Techniques for Home Studios",
      thumbnail: "/placeholder.svg?height=120&width=200",
      views: 0,
      likes: 0,
      comments: 0,
      date: "2023-04-01",
      status: "draft",
    },
  ]

  const videoList = videos || defaultVideos

  return (
    <div className="space-y-4">
      {videoList.map((video) => (
        <div key={video.id} className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row">
          <div className="relative aspect-video h-24 w-full sm:w-40 overflow-hidden rounded-md">
            <Image src={video.thumbnail || "/placeholder.svg"} alt={video.title} fill className="object-cover" />
            {video.status === "draft" && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white">Draft</div>
            )}
          </div>
          <div className="flex flex-1 flex-col justify-between">
            <div>
              <h3 className="font-semibold">{video.title}</h3>
              <p className="text-xs text-muted-foreground">Uploaded on {new Date(video.date).toLocaleDateString()}</p>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
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
          <div className="flex items-start">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem>
                  <Pencil className="mr-2 h-4 w-4" /> Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  <Trash className="mr-2 h-4 w-4" /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ))}
    </div>
  )
}
