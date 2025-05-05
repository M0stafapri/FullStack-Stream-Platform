import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Clock, Heart, MessageSquare } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function TrendingVideos() {
  // This would normally fetch from your API
  const trendingVideos = [
    {
      id: "1",
      title: "How AI is Changing the Future of Work",
      thumbnail: "/placeholder.svg?height=400&width=600",
      duration: "15:42",
      views: "245K",
      likes: "18.2K",
      comments: 342,
      category: "Technology",
      creator: "TechInsider",
    },
    {
      id: "2",
      title: "The Most Beautiful Places in Iceland",
      thumbnail: "/placeholder.svg?height=400&width=600",
      duration: "21:08",
      views: "189K",
      likes: "15.7K",
      comments: 278,
      category: "Travel",
      creator: "AdventureTime",
    },
    {
      id: "3",
      title: "30-Minute Full Body Workout - No Equipment",
      thumbnail: "/placeholder.svg?height=400&width=600",
      duration: "32:15",
      views: "412K",
      likes: "32.9K",
      comments: 567,
      category: "Fitness",
      creator: "FitLife",
    },
  ]

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Trending Now</h2>
            <p className="text-muted-foreground">What everyone is watching this week</p>
          </div>
          <Link href="/trending" className="text-sm font-medium text-primary">
            See all trending
          </Link>
        </div>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {trendingVideos.map((video) => (
            <Link key={video.id} href={`/video/${video.id}`}>
              <Card className="overflow-hidden transition-all hover:shadow-md">
                <div className="relative aspect-video">
                  <Image src={video.thumbnail || "/placeholder.svg"} alt={video.title} fill className="object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity hover:bg-black/50 hover:opacity-100">
                    <Play className="h-12 w-12 text-white" />
                  </div>
                  <div className="absolute bottom-2 right-2 rounded bg-black/70 px-1.5 py-0.5 text-xs font-medium text-white">
                    {video.duration}
                  </div>
                  <Badge className="absolute top-2 left-2 bg-red-500 text-white">Trending</Badge>
                </div>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold line-clamp-2">{video.title}</h3>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{video.creator}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {video.views} views
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs">
                      <span className="flex items-center gap-1">
                        <Heart className="h-3 w-3" /> {video.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="h-3 w-3" /> {video.comments}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
