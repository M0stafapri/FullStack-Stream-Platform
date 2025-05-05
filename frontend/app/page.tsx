"use client"

import { Button } from "@/components/ui/button"
import { Play, Info, PlusCircle, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { useEffect, useState } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { MainNav } from "@/components/main-nav"
import { VideoCard } from "@/components/video-card"
import { CategoryCard } from "@/components/category-card"

export default function Home() {
  const { isAuthenticated, isLoading } = useAuth()
  const [authChecked, setAuthChecked] = useState(false)

  useEffect(() => {
    if (!isLoading) {
      setAuthChecked(true)
    }
  }, [isLoading])

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <MainNav />

      <main className="animate-fade-in">
        {/* Hero Section */}
        <section className="relative h-[85vh] flex items-end">
          <div className="absolute inset-0 z-0">
            <Image
              src="/placeholder.svg?height=1080&width=1920"
              alt="The Art of Visual Storytelling"
              fill
              className="object-cover brightness-50"
              priority
            />
          </div>
          <div className="absolute inset-0 hero-gradient"></div>
          <div className="container relative z-10 px-4 md:px-6 pb-20">
            <div className="max-w-2xl space-y-4">
              <div className="flex gap-2">
                <Badge className="bg-red-600 text-white border-none px-3 py-1">2025</Badge>
                <Badge className="bg-black/50 backdrop-blur-sm text-white border-white/20 px-3 py-1">45 min</Badge>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-balance">
                The Art of Visual Storytelling
              </h1>
              <p className="text-white/70 text-lg">
                An immersive journey through the evolution of visual storytelling techniques in modern cinema
              </p>
              <div className="flex flex-wrap gap-3 pt-4">
                <Button className="bg-red-600 hover:bg-red-700 text-white gap-2 btn-primary">
                  <Play className="h-4 w-4 fill-current" />
                  Play Now
                </Button>
                <Button
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 gap-2 transition-colors"
                >
                  <Info className="h-4 w-4" />
                  More Info
                </Button>
                <Button
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 gap-2 transition-colors"
                >
                  <PlusCircle className="h-4 w-4" />
                  Add to List
                </Button>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-1 pb-4">
            <div className="w-2 h-2 rounded-full bg-red-600"></div>
            <div className="w-2 h-2 rounded-full bg-white/30"></div>
            <div className="w-2 h-2 rounded-full bg-white/30"></div>
          </div>
        </section>

        {/* Categories Slider */}
        <section className="py-8">
          <div className="container px-4 md:px-6">
            <ScrollArea className="w-full whitespace-nowrap">
              <div className="flex w-max space-x-4 p-1">
                <Badge className="active-category py-1 px-4 rounded-full">All</Badge>
                <Badge className="category-pill bg-black/50 backdrop-blur-sm text-white border-white/20 py-1 px-4 rounded-full">
                  Trending
                </Badge>
                <Badge className="category-pill bg-black/50 backdrop-blur-sm text-white border-white/20 py-1 px-4 rounded-full">
                  Music
                </Badge>
                <Badge className="category-pill bg-black/50 backdrop-blur-sm text-white border-white/20 py-1 px-4 rounded-full">
                  Gaming
                </Badge>
                <Badge className="category-pill bg-black/50 backdrop-blur-sm text-white border-white/20 py-1 px-4 rounded-full">
                  Education
                </Badge>
                <Badge className="category-pill bg-black/50 backdrop-blur-sm text-white border-white/20 py-1 px-4 rounded-full">
                  Movies
                </Badge>
                <Badge className="category-pill bg-black/50 backdrop-blur-sm text-white border-white/20 py-1 px-4 rounded-full">
                  Series
                </Badge>
                <Badge className="category-pill bg-black/50 backdrop-blur-sm text-white border-white/20 py-1 px-4 rounded-full">
                  Documentaries
                </Badge>
                <Badge className="category-pill bg-black/50 backdrop-blur-sm text-white border-white/20 py-1 px-4 rounded-full">
                  Technology
                </Badge>
                <Badge className="category-pill bg-black/50 backdrop-blur-sm text-white border-white/20 py-1 px-4 rounded-full">
                  Fitness
                </Badge>
                <Badge className="category-pill bg-black/50 backdrop-blur-sm text-white border-white/20 py-1 px-4 rounded-full">
                  Cooking
                </Badge>
                <Badge className="category-pill bg-black/50 backdrop-blur-sm text-white border-white/20 py-1 px-4 rounded-full">
                  Travel
                </Badge>
                <Badge className="category-pill bg-black/50 backdrop-blur-sm text-white border-white/20 py-1 px-4 rounded-full">
                  Animation
                </Badge>
              </div>
              <ScrollBar orientation="horizontal" className="bg-white/10" />
            </ScrollArea>
          </div>
        </section>

        {/* Trending Now Section */}
        <section className="py-8">
          <div className="container px-4 md:px-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Trending Now</h2>
              <Link
                href="/trending"
                className="text-sm text-white/70 hover:text-white group flex items-center transition-colors"
              >
                See all
                <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {trendingVideos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </div>
        </section>

        {/* Popular Categories */}
        <section className="py-8">
          <div className="container px-4 md:px-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Popular Categories</h2>
              <Link
                href="/categories"
                className="text-sm text-white/70 hover:text-white group flex items-center transition-colors"
              >
                See all
                <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </div>
        </section>

        {/* Recently Added */}
        <section className="py-8">
          <div className="container px-4 md:px-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Recently Added</h2>
              <Link
                href="/recent"
                className="text-sm text-white/70 hover:text-white group flex items-center transition-colors"
              >
                See all
                <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {recentVideos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 py-8 mt-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold innovati-gradient-text">Innovati.</span>
              <p className="text-sm text-white/60">© 2025 Innovati. All rights reserved.</p>
            </div>
            <nav className="flex gap-6">
              <Link href="/terms" className="text-xs md:text-sm text-white/60 hover:text-white transition-colors">
                Terms
              </Link>
              <Link href="/privacy" className="text-xs md:text-sm text-white/60 hover:text-white transition-colors">
                Privacy
              </Link>
              <Link href="/contact" className="text-xs md:text-sm text-white/60 hover:text-white transition-colors">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Sample data for the trending videos
const trendingVideos = [
  {
    id: "1",
    title: "DIY Crafting Techniques for Beginners",
    thumbnail: "/placeholder.svg?height=200&width=350",
    creator: "CraftMaster",
    duration: "12:34",
  },
  {
    id: "2",
    title: "Mobile App Development Tutorial",
    thumbnail: "/placeholder.svg?height=200&width=350",
    creator: "CodeGenius",
    duration: "25:10",
  },
  {
    id: "3",
    title: "Advanced Programming Concepts",
    thumbnail: "/placeholder.svg?height=200&width=350",
    creator: "TechPro",
    duration: "18:45",
  },
  {
    id: "4",
    title: "Autumn Forest Photography Tips",
    thumbnail: "/placeholder.svg?height=200&width=350",
    creator: "NatureShots",
    duration: "14:22",
  },
  {
    id: "5",
    title: "Mountain Biking Essentials",
    thumbnail: "/placeholder.svg?height=200&width=350",
    creator: "AdventureTime",
    duration: "20:15",
  },
]

// Sample data for categories
const categories = [
  { id: "1", name: "Movies", icon: Play },
  { id: "2", name: "Music", icon: Info },
  { id: "3", name: "Gaming", icon: PlusCircle },
  { id: "4", name: "Education", icon: Info },
  { id: "5", name: "Technology", icon: Play },
  { id: "6", name: "Fitness", icon: PlusCircle },
]

// Sample data for recent videos
const recentVideos = [
  {
    id: "6",
    title: "The Future of AI in Healthcare",
    thumbnail: "/placeholder.svg?height=200&width=350",
    creator: "FutureTech",
    duration: "32:18",
  },
  {
    id: "7",
    title: "Beginner's Guide to Digital Art",
    thumbnail: "/placeholder.svg?height=200&width=350",
    creator: "ArtistPro",
    duration: "15:42",
  },
  {
    id: "8",
    title: "Healthy Meal Prep for the Week",
    thumbnail: "/placeholder.svg?height=200&width=350",
    creator: "HealthyEats",
    duration: "22:05",
  },
  {
    id: "9",
    title: "Home Office Setup Guide",
    thumbnail: "/placeholder.svg?height=200&width=350",
    creator: "WorkspacePro",
    duration: "17:30",
  },
  {
    id: "10",
    title: "Mindfulness Meditation for Beginners",
    thumbnail: "/placeholder.svg?height=200&width=350",
    creator: "ZenMaster",
    duration: "10:15",
  },
]
