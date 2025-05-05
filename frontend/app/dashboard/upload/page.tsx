"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, X } from "lucide-react"

export default function UploadPage() {
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0])
    }
  }

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setThumbnailFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!videoFile) return

    setIsUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval)
          return prev
        }
        return prev + 5
      })
    }, 500)

    // This would be replaced with your actual API call
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 5000))

      setUploadProgress(100)
      setTimeout(() => {
        setIsUploading(false)
        setVideoFile(null)
        setThumbnailFile(null)
        // Show success message or redirect
      }, 500)
    } catch (error) {
      console.error("Upload failed:", error)
      setIsUploading(false)
    } finally {
      clearInterval(interval)
    }
  }

  return (
    <div className="mx-auto max-w-3xl py-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Upload Video</h1>
        <p className="text-muted-foreground">Share your content with the world</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Video Details</CardTitle>
            <CardDescription>Provide information about your video</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="Enter a descriptive title" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Tell viewers about your video" className="min-h-32" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                    <SelectItem value="gaming">Gaming</SelectItem>
                    <SelectItem value="music">Music</SelectItem>
                    <SelectItem value="tech">Technology</SelectItem>
                    <SelectItem value="travel">Travel</SelectItem>
                    <SelectItem value="sports">Sports</SelectItem>
                    <SelectItem value="cooking">Cooking</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="visibility">Visibility</Label>
                <Select defaultValue="public">
                  <SelectTrigger id="visibility">
                    <SelectValue placeholder="Select visibility" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="unlisted">Unlisted</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              <Input id="tags" placeholder="Add tags separated by commas" />
              <p className="text-xs text-muted-foreground">Tags help viewers find your video</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Video File</Label>
                <div className="flex items-center gap-4">
                  {videoFile ? (
                    <div className="flex flex-1 items-center gap-2 rounded-md border p-2">
                      <div className="flex-1 truncate">
                        {videoFile.name} ({(videoFile.size / (1024 * 1024)).toFixed(2)} MB)
                      </div>
                      <Button type="button" variant="ghost" size="icon" onClick={() => setVideoFile(null)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex-1">
                      <Label
                        htmlFor="video-upload"
                        className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-md border border-dashed text-sm"
                      >
                        <Upload className="mb-2 h-6 w-6 text-muted-foreground" />
                        <span className="font-medium">Click to upload</span>
                        <span className="text-xs text-muted-foreground">MP4, MOV, or AVI (max. 2GB)</span>
                      </Label>
                      <Input
                        id="video-upload"
                        type="file"
                        accept="video/*"
                        className="sr-only"
                        onChange={handleVideoChange}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Thumbnail</Label>
                <div className="flex items-center gap-4">
                  {thumbnailFile ? (
                    <div className="flex flex-1 items-center gap-2 rounded-md border p-2">
                      <div className="flex-1 truncate">
                        {thumbnailFile.name} ({(thumbnailFile.size / (1024 * 1024)).toFixed(2)} MB)
                      </div>
                      <Button type="button" variant="ghost" size="icon" onClick={() => setThumbnailFile(null)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex-1">
                      <Label
                        htmlFor="thumbnail-upload"
                        className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-md border border-dashed text-sm"
                      >
                        <Upload className="mb-2 h-6 w-6 text-muted-foreground" />
                        <span className="font-medium">Click to upload thumbnail</span>
                        <span className="text-xs text-muted-foreground">JPG, PNG, or GIF (max. 5MB)</span>
                      </Label>
                      <Input
                        id="thumbnail-upload"
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={handleThumbnailChange}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Save as Draft</Button>
            <Button type="submit" disabled={!videoFile || isUploading}>
              {isUploading ? `Uploading ${uploadProgress}%` : "Upload Video"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}
