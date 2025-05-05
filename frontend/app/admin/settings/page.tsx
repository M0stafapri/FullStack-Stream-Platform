"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function PlatformSettingsPage() {
  const { isAdmin, isLoading } = useAuth()
  const router = useRouter()
  const [successMessage, setSuccessMessage] = useState("")

  useEffect(() => {
    if (!isLoading && !isAdmin) {
      router.push("/dashboard")
    }
  }, [isAdmin, isLoading, router])

  const [settings, setSettings] = useState({
    general: {
      siteName: "StreamVibe",
      siteDescription: "A modern video streaming platform",
      logo: "/logo.png",
      favicon: "/favicon.ico",
      contactEmail: "support@streamvibe.com",
    },
    uploads: {
      maxFileSize: "2GB",
      allowedFormats: "mp4,mov,avi,webm",
      enableTranscoding: true,
      defaultQuality: "720p",
      storageProvider: "local",
    },
    users: {
      allowRegistration: true,
      requireEmailVerification: true,
      defaultUserRole: "user",
      allowSocialLogin: true,
      maxLoginAttempts: "5",
    },
    moderation: {
      enableAutoModeration: true,
      moderationLevel: "medium",
      flaggedContentReview: "manual",
      allowAppeal: true,
      autoDeleteFlaggedContent: false,
    },
    notifications: {
      enableEmailNotifications: true,
      enablePushNotifications: true,
      adminAlertEmail: "admin@streamvibe.com",
      notificationFrequency: "immediate",
    },
  })

  const handleInputChange = (section: string, field: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value,
      },
    }))
  }

  const saveSettings = () => {
    // In a real app, this would save to API
    setSuccessMessage("Platform settings saved successfully!")
    setTimeout(() => {
      setSuccessMessage("")
    }, 3000)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Platform Settings</h2>
          <p className="text-muted-foreground">Configure global settings for the StreamVibe platform</p>
        </div>
        <Button onClick={saveSettings}>Save Settings</Button>
      </div>

      {successMessage && (
        <Alert className="bg-green-500/10 text-green-500 border-green-500/20">
          <AlertDescription>{successMessage}</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="uploads">Uploads</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="moderation">Moderation</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Basic platform configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="siteName">Site Name</Label>
                <Input
                  id="siteName"
                  value={settings.general.siteName}
                  onChange={(e) => handleInputChange("general", "siteName", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="siteDescription">Site Description</Label>
                <Textarea
                  id="siteDescription"
                  value={settings.general.siteDescription}
                  onChange={(e) => handleInputChange("general", "siteDescription", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactEmail">Contact Email</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={settings.general.contactEmail}
                  onChange={(e) => handleInputChange("general", "contactEmail", e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="logo">Logo</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="logo"
                      value={settings.general.logo}
                      onChange={(e) => handleInputChange("general", "logo", e.target.value)}
                    />
                    <Button variant="outline" size="sm">
                      Upload
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="favicon">Favicon</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="favicon"
                      value={settings.general.favicon}
                      onChange={(e) => handleInputChange("general", "favicon", e.target.value)}
                    />
                    <Button variant="outline" size="sm">
                      Upload
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="uploads" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upload Settings</CardTitle>
              <CardDescription>Configure video upload parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="maxFileSize">Maximum File Size</Label>
                  <Input
                    id="maxFileSize"
                    value={settings.uploads.maxFileSize}
                    onChange={(e) => handleInputChange("uploads", "maxFileSize", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="allowedFormats">Allowed Formats</Label>
                  <Input
                    id="allowedFormats"
                    value={settings.uploads.allowedFormats}
                    onChange={(e) => handleInputChange("uploads", "allowedFormats", e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">Comma-separated list of file extensions</p>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="defaultQuality">Default Quality</Label>
                <Select
                  value={settings.uploads.defaultQuality}
                  onValueChange={(value) => handleInputChange("uploads", "defaultQuality", value)}
                >
                  <SelectTrigger id="defaultQuality">
                    <SelectValue placeholder="Select quality" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="360p">360p</SelectItem>
                    <SelectItem value="480p">480p</SelectItem>
                    <SelectItem value="720p">720p</SelectItem>
                    <SelectItem value="1080p">1080p</SelectItem>
                    <SelectItem value="1440p">1440p</SelectItem>
                    <SelectItem value="2160p">2160p (4K)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="storageProvider">Storage Provider</Label>
                <Select
                  value={settings.uploads.storageProvider}
                  onValueChange={(value) => handleInputChange("uploads", "storageProvider", value)}
                >
                  <SelectTrigger id="storageProvider">
                    <SelectValue placeholder="Select provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="local">Local Storage</SelectItem>
                    <SelectItem value="s3">Amazon S3</SelectItem>
                    <SelectItem value="cloudinary">Cloudinary</SelectItem>
                    <SelectItem value="gcs">Google Cloud Storage</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="enableTranscoding">Enable Transcoding</Label>
                  <p className="text-sm text-muted-foreground">Automatically convert videos to different formats</p>
                </div>
                <Switch
                  id="enableTranscoding"
                  checked={settings.uploads.enableTranscoding}
                  onCheckedChange={(checked) => handleInputChange("uploads", "enableTranscoding", checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Settings</CardTitle>
              <CardDescription>Configure user account settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="allowRegistration">Allow Registration</Label>
                  <p className="text-sm text-muted-foreground">Allow new users to register</p>
                </div>
                <Switch
                  id="allowRegistration"
                  checked={settings.users.allowRegistration}
                  onCheckedChange={(checked) => handleInputChange("users", "allowRegistration", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="requireEmailVerification">Require Email Verification</Label>
                  <p className="text-sm text-muted-foreground">Users must verify email before accessing the platform</p>
                </div>
                <Switch
                  id="requireEmailVerification"
                  checked={settings.users.requireEmailVerification}
                  onCheckedChange={(checked) => handleInputChange("users", "requireEmailVerification", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="allowSocialLogin">Allow Social Login</Label>
                  <p className="text-sm text-muted-foreground">Enable login with social media accounts</p>
                </div>
                <Switch
                  id="allowSocialLogin"
                  checked={settings.users.allowSocialLogin}
                  onCheckedChange={(checked) => handleInputChange("users", "allowSocialLogin", checked)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="defaultUserRole">Default User Role</Label>
                <Select
                  value={settings.users.defaultUserRole}
                  onValueChange={(value) => handleInputChange("users", "defaultUserRole", value)}
                >
                  <SelectTrigger id="defaultUserRole">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="creator">Creator</SelectItem>
                    <SelectItem value="moderator">Moderator</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                <Input
                  id="maxLoginAttempts"
                  type="number"
                  value={settings.users.maxLoginAttempts}
                  onChange={(e) => handleInputChange("users", "maxLoginAttempts", e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Number of failed login attempts before temporary lockout
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="moderation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Moderation Settings</CardTitle>
              <CardDescription>Configure content moderation parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="enableAutoModeration">Enable Auto-Moderation</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically scan and flag potentially inappropriate content
                  </p>
                </div>
                <Switch
                  id="enableAutoModeration"
                  checked={settings.moderation.enableAutoModeration}
                  onCheckedChange={(checked) => handleInputChange("moderation", "enableAutoModeration", checked)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="moderationLevel">Moderation Level</Label>
                <Select
                  value={settings.moderation.moderationLevel}
                  onValueChange={(value) => handleInputChange("moderation", "moderationLevel", value)}
                >
                  <SelectTrigger id="moderationLevel">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low (Minimal filtering)</SelectItem>
                    <SelectItem value="medium">Medium (Standard filtering)</SelectItem>
                    <SelectItem value="high">High (Strict filtering)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="flaggedContentReview">Flagged Content Review</Label>
                <Select
                  value={settings.moderation.flaggedContentReview}
                  onValueChange={(value) => handleInputChange("moderation", "flaggedContentReview", value)}
                >
                  <SelectTrigger id="flaggedContentReview">
                    <SelectValue placeholder="Select review method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto">Automatic (AI-based)</SelectItem>
                    <SelectItem value="manual">Manual (Human review)</SelectItem>
                    <SelectItem value="hybrid">Hybrid (AI + Human)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="allowAppeal">Allow Appeals</Label>
                  <p className="text-sm text-muted-foreground">
                    Users can appeal content removal or account suspension
                  </p>
                </div>
                <Switch
                  id="allowAppeal"
                  checked={settings.moderation.allowAppeal}
                  onCheckedChange={(checked) => handleInputChange("moderation", "allowAppeal", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="autoDeleteFlaggedContent">Auto-Delete Flagged Content</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically delete content that violates community guidelines
                  </p>
                </div>
                <Switch
                  id="autoDeleteFlaggedContent"
                  checked={settings.moderation.autoDeleteFlaggedContent}
                  onCheckedChange={(checked) => handleInputChange("moderation", "autoDeleteFlaggedContent", checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure system notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="enableEmailNotifications">Enable Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Send system notifications via email</p>
                </div>
                <Switch
                  id="enableEmailNotifications"
                  checked={settings.notifications.enableEmailNotifications}
                  onCheckedChange={(checked) => handleInputChange("notifications", "enableEmailNotifications", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="enablePushNotifications">Enable Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Send system notifications via browser push</p>
                </div>
                <Switch
                  id="enablePushNotifications"
                  checked={settings.notifications.enablePushNotifications}
                  onCheckedChange={(checked) => handleInputChange("notifications", "enablePushNotifications", checked)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="adminAlertEmail">Admin Alert Email</Label>
                <Input
                  id="adminAlertEmail"
                  type="email"
                  value={settings.notifications.adminAlertEmail}
                  onChange={(e) => handleInputChange("notifications", "adminAlertEmail", e.target.value)}
                />
                <p className="text-xs text-muted-foreground">Email address for critical system alerts</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notificationFrequency">Notification Frequency</Label>
                <Select
                  value={settings.notifications.notificationFrequency}
                  onValueChange={(value) => handleInputChange("notifications", "notificationFrequency", value)}
                >
                  <SelectTrigger id="notificationFrequency">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">Immediate</SelectItem>
                    <SelectItem value="hourly">Hourly Digest</SelectItem>
                    <SelectItem value="daily">Daily Digest</SelectItem>
                    <SelectItem value="weekly">Weekly Digest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
