import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function FeaturedVideos() {
  // This would normally fetch from your API
  const featuredVideos = [
    {
      id: "1",
      title: "Ultimate Guide to Video Production",
      thumbnail: "/placeholder.svg?height=400&width=600",
      duration: "12:34",
      views: "45.2K",
      category: "Education",
      creator: "VideoMaster",
    },
    {
      id: "2",
      title: "Top 10 Travel Destinations 2024",
      thumbnail: "/placeholder.svg?height=400&width=600",
      duration: "18:21",
      views: "102K",
      category: "Travel",
      creator: "GlobeTrotter",
    },
    {
      id: "3",
      title: "Easy Homemade Pizza Recipe",
      thumbnail: "/placeholder.svg?height=400&width=600",
      duration: "8:45",
      views: "76.5K",
      category: "Cooking",
      creator: "ChefDelights",
    },
    {
      id: "4",
      title: "Morning Yoga Routine for Beginners",
      thumbnail: "/placeholder.svg?height=400&width=600",
      duration: "22:10",
      views: "33.8K",
      category: "Fitness",
      creator: "YogaLife",
    },
    {
      id: "5",
      title: "How to Build a Website from Scratch",
      thumbnail: "/placeholder.svg?height=400&width=600",
      duration: "45:22",
      views: "128K",
      category: "Technology",
      creator: "CodeMaster",
    },
    {
      id: "6",
      title: "Digital Marketing Strategies for 2024",
      thumbnail: "/placeholder.svg?height=400&width=600",
      duration: "32:15",
      views: "89.3K",
      category: "Business",
      creator: "MarketingPro",
    },
    {
      id: "7",
      title: "Landscape Photography Tips",
      thumbnail: "/placeholder.svg?height=400&width=600",
      duration: "15:48",
      views: "54.7K",
      category: "Photography",
      creator: "PhotoArtist",
    },
    {
      id: "8",
      title: "Home Workout - No Equipment Needed",
      thumbnail: "/placeholder.svg?height=400&width=600",
      duration: "28:35",
      views: "112K",
      category: "Fitness",
      creator: "FitLife",
    },
  ]

  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Featured Videos</h2>
            <p className="text-muted-foreground">Handpicked content you don't want to miss</p>
          </div>
          <Link href="/browse" className="text-sm font-medium text-primary">
            View all videos
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredVideos.slice(0, 4).map((video) => (
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
                    <Badge variant="secondary" className="text-xs">
                      {video.category}
                    </Badge>
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
