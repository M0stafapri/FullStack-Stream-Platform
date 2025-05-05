import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Eye, Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface RelatedVideosProps {
  currentVideoId: string
}

export default function RelatedVideos({ currentVideoId }: RelatedVideosProps) {
  // This would normally be fetched from your API
  const relatedVideos = [
    {
      id: "2",
      title: "Advanced Video Editing Techniques",
      thumbnail: "/placeholder.svg?height=120&width=200",
      duration: "18:24",
      views: "32.5K",
      uploadDate: "2 weeks ago",
      creator: {
        name: "EditPro",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    },
    {
      id: "3",
      title: "Create Professional Motion Graphics",
      thumbnail: "/placeholder.svg?height=120&width=200",
      duration: "12:10",
      views: "18.7K",
      uploadDate: "3 weeks ago",
      creator: {
        name: "MotionMaster",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    },
    {
      id: "4",
      title: "Color Grading for Beginners",
      thumbnail: "/placeholder.svg?height=120&width=200",
      duration: "22:45",
      views: "41.2K",
      uploadDate: "1 month ago",
      creator: {
        name: "ColorCraft",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    },
    {
      id: "5",
      title: "Sound Design Tips for Videos",
      thumbnail: "/placeholder.svg?height=120&width=200",
      duration: "15:30",
      views: "28.9K",
      uploadDate: "1 month ago",
      creator: {
        name: "AudioWizard",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    },
    {
      id: "6",
      title: "How to Script Engaging Videos",
      thumbnail: "/placeholder.svg?height=120&width=200",
      duration: "10:15",
      views: "22.3K",
      uploadDate: "2 months ago",
      creator: {
        name: "ScriptMaster",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    },
  ]

  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Related Videos</h3>
      <div className="space-y-4">
        {relatedVideos.map((video) => (
          <Link key={video.id} href={`/video/${video.id}`}>
            <Card className="overflow-hidden hover:bg-accent">
              <CardContent className="p-2">
                <div className="flex gap-3">
                  <div className="relative h-24 w-40 flex-shrink-0 overflow-hidden rounded-md">
                    <Image
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={video.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-1 right-1 rounded bg-black/70 px-1 py-0.5 text-xs font-medium text-white">
                      {video.duration}
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <h4 className="line-clamp-2 text-sm font-medium">{video.title}</h4>
                      <div className="mt-1 flex items-center gap-2">
                        <Avatar className="h-4 w-4">
                          <AvatarImage src={video.creator.avatar || "/placeholder.svg"} alt={video.creator.name} />
                          <AvatarFallback>{video.creator.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-muted-foreground">{video.creator.name}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" /> {video.views}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {video.uploadDate}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
