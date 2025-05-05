import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"

interface VideoCardProps {
  video: {
    id: string
    title: string
    thumbnail: string
    creator: string
    duration: string
  }
}

export function VideoCard({ video }: VideoCardProps) {
  return (
    <Link key={video.id} href={`/video/${video.id}`} className="group">
      <div className="relative aspect-video rounded-md overflow-hidden video-card-hover">
        <Image src={video.thumbnail || "/placeholder.svg"} alt={video.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Button size="icon" className="rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 video-play-button">
            <Play className="h-5 w-5 fill-white" />
          </Button>
        </div>
        <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
          {video.duration}
        </div>
      </div>
      <h3 className="mt-2 text-sm font-medium line-clamp-1 group-hover:text-red-500 transition-colors">
        {video.title}
      </h3>
      <p className="text-xs text-white/60">{video.creator}</p>
    </Link>
  )
}
