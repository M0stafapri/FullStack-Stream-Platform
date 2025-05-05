"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, Loader2 } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"

export default function WatchHistoryPage() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [watchHistory, setWatchHistory] = useState<any[]>([])

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
      return
    }

    const fetchWatchHistory = async () => {
      if (!isAuthenticated) return

      try {
        // In a real app, this would fetch from your API
        // Simulating API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock data - In production, replace with actual API call
        setWatchHistory([
          {
            id: "1",
            title: "How to Create a Stunning Video Intro",
            thumbnail: "/placeholder.svg?height=120&width=200",
            duration: "12:34",
            progress: 80, // percentage watched
            watchedAt: "2023-07-15T15:30:00",
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
            progress: 45,
            watchedAt: "2023-07-14T20:15:00",
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
            progress: 100,
            watchedAt: "2023-07-13T18:45:00",
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
            progress: 65,
            watchedAt: "2023-07-12T14:20:00",
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
            progress: 25,
            watchedAt: "2023-07-11T10:45:00",
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
            progress: 90,
            watchedAt: "2023-07-10T16:30:00",
            creator: {
              name: "PhotoArtist",
              avatar: "/placeholder.svg?height=40&width=40",
            },
          },
        ])
      } catch (error) {
        console.error("Error fetching watch history:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchWatchHistory()
  }, [isAuthenticated, isLoading, router])

  const clearHistory = () => {
    // In a real app, this would make an API call
    setWatchHistory([])
  }

  const removeFromHistory = (videoId: string) => {
    setWatchHistory((prev) => prev.filter((video) => video.id !== videoId))
  }

  if (isLoading || loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (watchHistory.length === 0) {
    return (
      <div className="py-12 text-center">
        <div className="flex justify-center">
          <Clock className="h-12 w-12 text-muted-foreground mb-4" />
        </div>
        <h2 className="text-2xl font-bold mb-2">No watch history</h2>
        <p className="text-muted-foreground max-w-md mx-auto mb-6">
          Videos you watch will appear here. Start exploring content to build your watch history.
        </p>
        <Link href="/browse" className="text-primary hover:underline">
          Browse videos
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Watch History</h2>
          <p className="text-muted-foreground">Videos you've watched recently</p>
        </div>
        <Button variant="outline" onClick={clearHistory}>
          Clear History
        </Button>
      </div>

      <div className="space-y-4">
        {watchHistory.map((video) => (
          <Card key={video.id} className="overflow-hidden">
            <CardContent className="p-3">
              <div className="flex gap-4">
                <div className="relative h-24 w-40 flex-shrink-0 overflow-hidden rounded-md">
                  <Link href={`/video/${video.id}`}>
                    <Image
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={video.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-1 right-1 rounded bg-black/70 px-1 py-0.5 text-xs font-medium text-white">
                      {video.duration}
                    </div>
                    {video.progress < 100 && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
                        <div className="h-full bg-primary" style={{ width: `${video.progress}%` }} />
                      </div>
                    )}
                  </Link>
                </div>
                <div className="flex flex-1 flex-col justify-between py-1">
                  <div className="flex justify-between">
                    <div>
                      <Link href={`/video/${video.id}`}>
                        <h3 className="font-medium line-clamp-2 hover:underline">{video.title}</h3>
                      </Link>
                      <div className="mt-1 flex items-center gap-2">
                        <Avatar className="h-4 w-4">
                          <AvatarImage src={video.creator.avatar || "/placeholder.svg"} alt={video.creator.name} />
                          <AvatarFallback>{video.creator.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-muted-foreground">{video.creator.name}</span>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <span className="sr-only">Open menu</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4"
                          >
                            <circle cx="12" cy="12" r="1" />
                            <circle cx="12" cy="5" r="1" />
                            <circle cx="12" cy="19" r="1" />
                          </svg>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => removeFromHistory(video.id)}>
                          Remove from history
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">
                    <span>Watched {formatWatchedTime(video.watchedAt)}</span>
                    {video.progress < 100 ? (
                      <span className="ml-2">• {video.progress}% watched</span>
                    ) : (
                      <span className="ml-2">• Completed</span>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function formatWatchedTime(dateString: string): string {
  const watchedDate = new Date(dateString)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - watchedDate.getTime()) / 1000)

  if (diffInSeconds < 60) {
    return "just now"
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`
  }

  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`
  }

  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 7) {
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`
  }

  return watchedDate.toLocaleDateString()
}
