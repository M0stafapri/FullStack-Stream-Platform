"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Share2, ThumbsDown, ThumbsUp } from "lucide-react"
import Link from "next/link"
import VideoPlayer from "@/components/video-player"
import RelatedVideos from "@/components/related-videos"
import CommentSection from "@/components/comment-section"

export default function VideoPage({ params }: { params: { id: string } }) {
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [likeStatus, setLikeStatus] = useState<"like" | "dislike" | null>(null)

  // This would normally be fetched from your API
  const video = {
    id: params.id,
    title: "How to Create a Stunning Video Intro",
    description:
      "In this tutorial, I'll show you how to create a professional video intro using simple tools and techniques. Perfect for content creators looking to elevate their videos without spending a fortune on fancy software.",
    views: "45.2K",
    likes: "2.3K",
    dislikes: "45",
    uploadDate: "2023-04-15",
    creator: {
      id: "creator1",
      name: "VideoMaster",
      subscribers: "125K",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    tags: ["tutorial", "video editing", "intro design"],
    category: "Education",
  }

  const handleSubscribe = () => {
    setIsSubscribed(!isSubscribed)
  }

  const handleLike = () => {
    setLikeStatus(likeStatus === "like" ? null : "like")
  }

  const handleDislike = () => {
    setLikeStatus(likeStatus === "dislike" ? null : "dislike")
  }

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <VideoPlayer videoId={params.id} />

          <div className="space-y-4">
            <h1 className="text-2xl font-bold">{video.title}</h1>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={video.creator.avatar || "/placeholder.svg"} alt={video.creator.name} />
                  <AvatarFallback>{video.creator.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <Link href={`/channel/${video.creator.id}`} className="font-medium hover:underline">
                    {video.creator.name}
                  </Link>
                  <p className="text-xs text-muted-foreground">{video.creator.subscribers} subscribers</p>
                </div>
                <Button
                  variant={isSubscribed ? "default" : "outline"}
                  size="sm"
                  className="ml-4"
                  onClick={handleSubscribe}
                >
                  {isSubscribed ? "Subscribed" : "Subscribe"}
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center rounded-full border">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`rounded-l-full px-4 ${likeStatus === "like" ? "bg-primary/10" : ""}`}
                    onClick={handleLike}
                  >
                    <ThumbsUp className={`mr-1 h-4 w-4 ${likeStatus === "like" ? "text-primary" : ""}`} />
                    {video.likes}
                  </Button>
                  <Separator orientation="vertical" className="h-6" />
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`rounded-r-full px-4 ${likeStatus === "dislike" ? "bg-primary/10" : ""}`}
                    onClick={handleDislike}
                  >
                    <ThumbsDown className={`h-4 w-4 ${likeStatus === "dislike" ? "text-primary" : ""}`} />
                  </Button>
                </div>
                <Button variant="ghost" size="sm" className="rounded-full">
                  <Share2 className="mr-1 h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>

            <div className="rounded-lg bg-muted p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-sm">
                  <span>{video.views} views</span>
                  <span>•</span>
                  <span>{new Date(video.uploadDate).toLocaleDateString()}</span>
                </div>
                <Badge>{video.category}</Badge>
              </div>
              <p className="text-sm whitespace-pre-line">{video.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {video.tags.map((tag) => (
                  <Link href={`/tag/${tag}`} key={tag}>
                    <Badge variant="outline" className="cursor-pointer">
                      #{tag}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Tabs defaultValue="comments">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="comments">Comments</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
            </TabsList>
            <TabsContent value="comments" className="pt-4">
              <CommentSection videoId={params.id} />
            </TabsContent>
            <TabsContent value="details" className="pt-4">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Description</h3>
                  <p className="text-sm whitespace-pre-line">{video.description}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Category</h3>
                  <p className="text-sm">{video.category}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Upload Date</h3>
                  <p className="text-sm">{new Date(video.uploadDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Tags</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {video.tags.map((tag) => (
                      <Link href={`/tag/${tag}`} key={tag}>
                        <Badge variant="outline" className="cursor-pointer">
                          #{tag}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <RelatedVideos currentVideoId={params.id} />
        </div>
      </div>
    </div>
  )
}
