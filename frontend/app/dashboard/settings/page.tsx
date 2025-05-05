"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTheme } from "next-themes"
import { MainNav } from "@/components/main-nav"
import { DashboardSidebar } from "@/components/dashboard/sidebar"

export default function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false)
  const { theme, setTheme } = useTheme()

  const handleSave = () => {
    setIsSaving(true)
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <MainNav />

      <div className="flex flex-1 mt-16">
        <DashboardSidebar />

        <main className="flex-1 p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">Settings</h1>
            <p className="text-white/70">Manage your account settings and preferences</p>
          </div>

          <Tabs defaultValue="appearance">
            <TabsList className="bg-white/10 text-white">
              <TabsTrigger value="appearance" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
                Appearance
              </TabsTrigger>
              <TabsTrigger value="account" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
                Account
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
              >
                Notifications
              </TabsTrigger>
              <TabsTrigger value="privacy" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
                Privacy
              </TabsTrigger>
            </TabsList>

            <TabsContent value="appearance" className="mt-6">
              <Card className="bg-black/60 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Appearance</CardTitle>
                  <CardDescription className="text-white/70">
                    Customize how Innovati looks on your device
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="theme" className="text-white">
                      Theme
                    </Label>
                    <div className="flex items-center justify-between">
                      <span className="text-white/70">Dark Mode</span>
                      <Switch
                        id="theme"
                        checked={theme === "dark"}
                        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="autoplay" className="text-white">
                      Autoplay
                    </Label>
                    <div className="flex items-center justify-between">
                      <span className="text-white/70">Autoplay videos</span>
                      <Switch id="autoplay" defaultChecked />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="quality" className="text-white">
                      Video Quality
                    </Label>
                    <div className="flex items-center justify-between">
                      <span className="text-white/70">Auto (recommended)</span>
                      <Switch id="quality" defaultChecked />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={handleSave} disabled={isSaving}>
                    {isSaving ? "Saving..." : "Save Changes"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="account" className="mt-6">
              <Card className="bg-black/60 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Account Settings</CardTitle>
                  <CardDescription className="text-white/70">Update your account information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-white/70">Account settings content goes here</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="mt-6">
              <Card className="bg-black/60 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Notification Preferences</CardTitle>
                  <CardDescription className="text-white/70">
                    Control how and when you receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-white/70">Notification settings content goes here</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="privacy" className="mt-6">
              <Card className="bg-black/60 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Privacy Settings</CardTitle>
                  <CardDescription className="text-white/70">Manage your privacy preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-white/70">Privacy settings content goes here</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
