"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Loader2 } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function LikedVideosPage() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [likedVideos, setLikedVideos] = useState<any[]>([])

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
      return
    }

    const fetchLikedVideos = async () => {
      if (!isAuthenticated) return

      try {
        // In a real app, this would fetch from your API
        // Simulating API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock data - In production, replace with actual API call
        setLikedVideos([
          {
            id: "1",
            title: "How to Create a Stunning Video Intro",
            thumbnail: "/placeholder.svg?height=120&width=200",
            duration: "12:34",
            views: "45.2K",
            likedAt: "2023-07-15",
            creator: {
              name: "VideoMaster",
              avatar: "/placeholder.svg?height=40&width=40",
            },
          },
          {
            id: "2",
            title: "Advanced Video Editing Techniques",
            thumbnail: "/placeholder.svg?height=120&width=200",
            duration: "18:24",
            views: "32.5K",
            likedAt: "2023-07-10",
            creator: {
              name: "EditPro",
              avatar: "/placeholder.svg?height=40&width=40",
            },
          },
          {
            id: "3",
            title: "Color Grading for Beginners",
            thumbnail: "/placeholder.svg?height=120&width=200",
            duration: "22:45",
            views: "41.2K",
            likedAt: "2023-07-05",
            creator: {
              name: "ColorCraft",
              avatar: "/placeholder.svg?height=40&width=40",
            },
          },
          {
            id: "4",
            title: "Sound Design Tips for Videos",
            thumbnail: "/placeholder.svg?height=120&width=200",
            duration: "15:30",
            views: "28.9K",
            likedAt: "2023-07-01",
            creator: {
              name: "AudioWizard",
              avatar: "/placeholder.svg?height=40&width=40",
            },
          },
          {
            id: "5",
            title: "Digital Marketing Strategies for 2024",
            thumbnail: "/placeholder.svg?height=120&width=200",
            duration: "32:15",
            views: "89.3K",
            likedAt: "2023-06-28",
            creator: {
              name: "MarketingPro",
              avatar: "/placeholder.svg?height=40&width=40",
            },
          },
          {
            id: "6",
            title: "Landscape Photography Tips",
            thumbnail: "/placeholder.svg?height=120&width=200",
            duration: "15:48",
            views: "54.7K",
            likedAt: "2023-06-25",
            creator: {
              name: "PhotoArtist",
              avatar: "/placeholder.svg?height=40&width=40",
            },
          },
        ])
      } catch (error) {
        console.error("Error fetching liked videos:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchLikedVideos()
  }, [isAuthenticated, isLoading, router])

  if (isLoading || loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (likedVideos.length === 0) {
    return (
      <div className="py-12 text-center">
        <div className="flex justify-center">
          <Heart className="h-12 w-12 text-muted-foreground mb-4" />
        </div>
        <h2 className="text-2xl font-bold mb-2">No liked videos yet</h2>
        <p className="text-muted-foreground max-w-md mx-auto mb-6">
          Videos you like will appear here. Start exploring content to find videos you enjoy.
        </p>
        <Link href="/browse" className="text-primary hover:underline">
          Browse videos
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Liked Videos</h2>
        <p className="text-muted-foreground">Videos you've enjoyed and liked</p>
      </div>

      <div className="space-y-4">
        {likedVideos.map((video) => (
          <Link key={video.id} href={`/video/${video.id}`}>
            <Card className="overflow-hidden hover:bg-accent">
              <CardContent className="p-3">
                <div className="flex gap-4">
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
                  <div className="flex flex-1 flex-col justify-between py-1">
                    <div>
                      <h3 className="font-medium line-clamp-2">{video.title}</h3>
                      <div className="mt-1 flex items-center gap-2">
                        <Avatar className="h-4 w-4">
                          <AvatarImage src={video.creator.avatar || "/placeholder.svg"} alt={video.creator.name} />
                          <AvatarFallback>{video.creator.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-muted-foreground">{video.creator.name}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
                      <span>{video.views} views</span>
                      <span>Liked on {new Date(video.likedAt).toLocaleDateString()}</span>
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
