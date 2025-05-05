"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Radio, Mic, MicOff, VideoIcon, VideoOff, Users, Settings } from "lucide-react"
import { MainNav } from "@/components/main-nav"
import { DashboardSidebar } from "@/components/dashboard/sidebar"

export default function LivestreamPage() {
  const [isStreaming, setIsStreaming] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [visibility, setVisibility] = useState("public")
  const [hasCamera, setHasCamera] = useState(false)
  const [hasMic, setHasMic] = useState(false)
  const [cameraEnabled, setCameraEnabled] = useState(true)
  const [micEnabled, setMicEnabled] = useState(true)
  const [viewerCount, setViewerCount] = useState(0)
  const [chatMessages, setChatMessages] = useState<{ user: string; message: string; time: string }[]>([])
  const [chatInput, setChatInput] = useState("")
  const [permissionError, setPermissionError] = useState<string | null>(null)

  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  // Check for camera and microphone permissions
  useEffect(() => {
    const checkDevices = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices()
        const hasVideoInput = devices.some((device) => device.kind === "videoinput")
        const hasAudioInput = devices.some((device) => device.kind === "audioinput")

        setHasCamera(hasVideoInput)
        setHasMic(hasAudioInput)

        if (!hasVideoInput && !hasAudioInput) {
          setPermissionError("No camera or microphone detected")
        }
      } catch (err) {
        console.error("Error checking devices:", err)
        setPermissionError("Could not access media devices")
      }
    }

    checkDevices()
  }, [])

  // Start camera preview
  useEffect(() => {
    const startPreview = async () => {
      try {
        if (permissionError) return

        const constraints = {
          video: cameraEnabled && hasCamera,
          audio: micEnabled && hasMic,
        }

        if (!constraints.video && !constraints.audio) {
          return
        }

        const stream = await navigator.mediaDevices.getUserMedia(constraints)
        streamRef.current = stream

        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }

        setPermissionError(null)
      } catch (err) {
        console.error("Error accessing media devices:", err)
        setPermissionError("Could not access camera or microphone. Please check permissions.")
      }
    }

    startPreview()

    return () => {
      // Clean up stream when component unmounts
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }
    }
  }, [cameraEnabled, micEnabled, hasCamera, hasMic, permissionError])

  const toggleCamera = () => {
    if (streamRef.current && hasCamera) {
      streamRef.current.getVideoTracks().forEach((track) => {
        track.enabled = !cameraEnabled
      })
      setCameraEnabled(!cameraEnabled)
    }
  }

  const toggleMic = () => {
    if (streamRef.current && hasMic) {
      streamRef.current.getAudioTracks().forEach((track) => {
        track.enabled = !micEnabled
      })
      setMicEnabled(!micEnabled)
    }
  }

  const startStream = () => {
    if (!title || !category) {
      setPermissionError("Please fill in required fields")
      return
    }

    setIsStreaming(true)

    // Simulate viewers joining
    const viewerInterval = setInterval(() => {
      setViewerCount((prev) => Math.min(prev + Math.floor(Math.random() * 3), 500))
    }, 5000)

    // Simulate chat messages
    const chatInterval = setInterval(() => {
      const users = ["JohnDoe", "StreamFan42", "VideoLover", "ContentCreator", "TechGuru"]
      const messages = [
        "Great stream!",
        "Love the content!",
        "Can you explain that again?",
        "First time here, this is awesome!",
        "Hello from Germany!",
        "What camera are you using?",
        "The audio quality is amazing",
        "Will you be streaming tomorrow too?",
      ]

      const randomUser = users[Math.floor(Math.random() * users.length)]
      const randomMessage = messages[Math.floor(Math.random() * messages.length)]
      const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

      setChatMessages((prev) => [...prev, { user: randomUser, message: randomMessage, time }])
    }, 8000)

    return () => {
      clearInterval(viewerInterval)
      clearInterval(chatInterval)
    }
  }

  const endStream = () => {
    setIsStreaming(false)
    setViewerCount(0)
    setChatMessages([])
  }

  const sendChatMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatInput.trim()) return

    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    setChatMessages((prev) => [...prev, { user: "You (Host)", message: chatInput, time }])
    setChatInput("")
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <MainNav />

      <div className="flex flex-1 mt-16">
        <DashboardSidebar />

        <main className="flex-1 p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">Go Live</h1>
            <p className="text-white/70">Stream your content to your audience in real-time</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card className="bg-black/60 backdrop-blur-sm border-white/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white">
                    {isStreaming ? title || "Live Stream" : "Stream Preview"}
                  </CardTitle>
                  {isStreaming && (
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></div>
                        <span className="text-red-500 text-sm font-medium">LIVE</span>
                      </span>
                      <span className="text-white/70 text-sm">•</span>
                      <span className="flex items-center gap-1 text-white/70 text-sm">
                        <Users className="h-3 w-3" /> {viewerCount} viewers
                      </span>
                    </div>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="relative aspect-video bg-black/50 rounded-md overflow-hidden">
                    {permissionError ? (
                      <div className="absolute inset-0 flex items-center justify-center flex-col gap-2 p-4 text-center">
                        <VideoOff className="h-10 w-10 text-white/50 mb-2" />
                        <p className="text-white/70">{permissionError}</p>
                        <Button
                          variant="outline"
                          className="mt-2 border-white/20 text-white hover:bg-white/10"
                          onClick={() => setPermissionError(null)}
                        >
                          Retry
                        </Button>
                      </div>
                    ) : (
                      <>
                        <video
                          ref={videoRef}
                          autoPlay
                          playsInline
                          muted
                          className={`w-full h-full object-cover ${!cameraEnabled ? "hidden" : ""}`}
                        />
                        {!cameraEnabled && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <VideoOff className="h-16 w-16 text-white/30" />
                          </div>
                        )}
                      </>
                    )}

                    {isStreaming && (
                      <div className="absolute bottom-4 right-4 flex gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className={`rounded-full backdrop-blur-sm ${micEnabled ? "bg-white/20 hover:bg-white/30" : "bg-red-600/80 hover:bg-red-700/80"}`}
                          onClick={toggleMic}
                        >
                          {micEnabled ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className={`rounded-full backdrop-blur-sm ${cameraEnabled ? "bg-white/20 hover:bg-white/30" : "bg-red-600/80 hover:bg-red-700/80"}`}
                          onClick={toggleCamera}
                        >
                          {cameraEnabled ? <VideoIcon className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className={`rounded-full ${micEnabled ? "bg-transparent border-white/20" : "bg-red-600/80"}`}
                      onClick={toggleMic}
                      disabled={isStreaming}
                    >
                      {micEnabled ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className={`rounded-full ${cameraEnabled ? "bg-transparent border-white/20" : "bg-red-600/80"}`}
                      onClick={toggleCamera}
                      disabled={isStreaming}
                    >
                      {cameraEnabled ? <VideoIcon className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                    </Button>
                  </div>

                  {isStreaming ? (
                    <Button variant="destructive" className="bg-red-600 hover:bg-red-700" onClick={endStream}>
                      End Stream
                    </Button>
                  ) : (
                    <Button
                      className="bg-red-600 hover:bg-red-700 text-white"
                      onClick={startStream}
                      disabled={!hasCamera && !hasMic}
                    >
                      <Radio className="mr-2 h-4 w-4" />
                      Go Live
                    </Button>
                  )}
                </CardFooter>
              </Card>

              {isStreaming && (
                <Card className="bg-black/60 backdrop-blur-sm border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">Live Chat</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80 overflow-y-auto mb-4 space-y-2 pr-2">
                      {chatMessages.length === 0 ? (
                        <div className="flex items-center justify-center h-full text-white/50">
                          <p>Chat messages will appear here</p>
                        </div>
                      ) : (
                        chatMessages.map((msg, index) => (
                          <div key={index} className="flex gap-2">
                            <span className="font-medium text-sm">{msg.user}:</span>
                            <span className="text-white/80 text-sm flex-1">{msg.message}</span>
                            <span className="text-white/50 text-xs">{msg.time}</span>
                          </div>
                        ))
                      )}
                    </div>
                    <form onSubmit={sendChatMessage} className="flex gap-2">
                      <Input
                        placeholder="Type a message..."
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        className="bg-white/10 border-white/20 text-white"
                      />
                      <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white">
                        Send
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="space-y-6">
              <Card className="bg-black/60 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Stream Settings</CardTitle>
                  <CardDescription className="text-white/70">Configure your livestream details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-white">
                      Stream Title*
                    </Label>
                    <Input
                      id="title"
                      placeholder="Enter a descriptive title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      disabled={isStreaming}
                      required
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-white">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Tell viewers about your stream"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      disabled={isStreaming}
                      className="min-h-24 bg-white/10 border-white/20 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-white">
                      Category*
                    </Label>
                    <Select value={category} onValueChange={setCategory} disabled={isStreaming}>
                      <SelectTrigger id="category" className="bg-white/10 border-white/20 text-white">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent className="bg-black/90 border-white/20 text-white">
                        <SelectItem value="gaming" className="text-white hover:bg-white/10">
                          Gaming
                        </SelectItem>
                        <SelectItem value="music" className="text-white hover:bg-white/10">
                          Music
                        </SelectItem>
                        <SelectItem value="tech" className="text-white hover:bg-white/10">
                          Technology
                        </SelectItem>
                        <SelectItem value="creative" className="text-white hover:bg-white/10">
                          Creative
                        </SelectItem>
                        <SelectItem value="irl" className="text-white hover:bg-white/10">
                          Just Chatting
                        </SelectItem>
                        <SelectItem value="education" className="text-white hover:bg-white/10">
                          Education
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="visibility" className="text-white">
                      Visibility
                    </Label>
                    <Select value={visibility} onValueChange={setVisibility} disabled={isStreaming}>
                      <SelectTrigger id="visibility" className="bg-white/10 border-white/20 text-white">
                        <SelectValue placeholder="Select visibility" />
                      </SelectTrigger>
                      <SelectContent className="bg-black/90 border-white/20 text-white">
                        <SelectItem value="public" className="text-white hover:bg-white/10">
                          Public
                        </SelectItem>
                        <SelectItem value="unlisted" className="text-white hover:bg-white/10">
                          Unlisted
                        </SelectItem>
                        <SelectItem value="private" className="text-white hover:bg-white/10">
                          Private
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 pt-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="chat" className="text-white">
                        Enable Chat
                      </Label>
                      <Switch id="chat" defaultChecked disabled={isStreaming} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="dvr" className="text-white">
                        DVR (Allow Rewind)
                      </Label>
                      <Switch id="dvr" defaultChecked disabled={isStreaming} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="record" className="text-white">
                        Record Stream
                      </Label>
                      <Switch id="record" defaultChecked disabled={isStreaming} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/60 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Advanced Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                    <Settings className="mr-2 h-4 w-4" />
                    Configure Advanced Settings
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
