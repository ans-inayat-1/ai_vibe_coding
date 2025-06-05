"use client"

import { useState } from "react"
import { Share2, Copy, Check, Twitter, Facebook, Linkedin, Mail, Link2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

interface ShareProjectProps {
  projectId: string
  projectTitle: string
  projectDescription: string
  projectUrl: string
  previewImage?: string
}

export function ShareProject({
  projectId,
  projectTitle,
  projectDescription,
  projectUrl,
  previewImage,
}: ShareProjectProps) {
  const [copied, setCopied] = useState(false)
  const [customMessage, setCustomMessage] = useState(`Check out my project "${projectTitle}" on AI Vibe Builder!`)

  const handleCopyLink = () => {
    navigator.clipboard.writeText(projectUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareToTwitter = () => {
    const text = encodeURIComponent(customMessage)
    const url = encodeURIComponent(projectUrl)
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank")
  }

  const shareToFacebook = () => {
    const url = encodeURIComponent(projectUrl)
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank")
  }

  const shareToLinkedIn = () => {
    const title = encodeURIComponent(projectTitle)
    const summary = encodeURIComponent(projectDescription)
    const url = encodeURIComponent(projectUrl)
    window.open(
      `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}&summary=${summary}`,
      "_blank",
    )
  }

  const shareByEmail = () => {
    const subject = encodeURIComponent(`Check out my project: ${projectTitle}`)
    const body = encodeURIComponent(`${customMessage}\n\n${projectUrl}`)
    window.open(`mailto:?subject=${subject}&body=${body}`, "_blank")
  }

  const generateEmbedCode = () => {
    return `<iframe 
  src="${projectUrl}/embed" 
  width="100%" 
  height="500" 
  style="border:none;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.1)" 
  title="${projectTitle}" 
  allow="accelerometer; camera; encrypted-media; gyroscope; picture-in-picture" 
  allowfullscreen>
</iframe>`
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Share Project</DialogTitle>
          <DialogDescription>Share your project with others or embed it on your website</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="social" className="mt-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="social">Social Media</TabsTrigger>
            <TabsTrigger value="link">Direct Link</TabsTrigger>
            <TabsTrigger value="embed">Embed</TabsTrigger>
          </TabsList>

          <TabsContent value="social" className="space-y-4 pt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Customize your message</label>
              <Textarea
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                placeholder="Write a message to share with your project..."
                className="min-h-[100px]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button onClick={shareToTwitter} className="bg-[#1DA1F2] hover:bg-[#1a94df] text-white">
                <Twitter className="h-4 w-4 mr-2" />
                Share on Twitter
              </Button>
              <Button onClick={shareToFacebook} className="bg-[#4267B2] hover:bg-[#375695] text-white">
                <Facebook className="h-4 w-4 mr-2" />
                Share on Facebook
              </Button>
              <Button onClick={shareToLinkedIn} className="bg-[#0077B5] hover:bg-[#006396] text-white">
                <Linkedin className="h-4 w-4 mr-2" />
                Share on LinkedIn
              </Button>
              <Button onClick={shareByEmail} variant="outline">
                <Mail className="h-4 w-4 mr-2" />
                Share via Email
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="link" className="space-y-4 pt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Project Link</label>
              <div className="flex">
                <Input value={projectUrl} readOnly className="rounded-r-none" />
                <Button
                  onClick={handleCopyLink}
                  className={`rounded-l-none ${copied ? "bg-green-500 hover:bg-green-600" : ""}`}
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <Link2 className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-sm">Direct Link</h4>
                  <p className="text-sm text-muted-foreground">
                    Anyone with this link can view your project{" "}
                    {previewImage && "and see the preview image when shared on social media."}
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="embed" className="space-y-4 pt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Embed Code</label>
              <Textarea
                value={generateEmbedCode()}
                readOnly
                className="min-h-[120px] font-mono text-sm"
                onClick={(e) => (e.target as HTMLTextAreaElement).select()}
              />
              <p className="text-xs text-muted-foreground">
                Copy and paste this code into your website to embed this project.
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h4 className="text-sm font-medium mb-2">Preview</h4>
              <div className="bg-gray-100 dark:bg-gray-800 rounded border border-dashed border-gray-300 dark:border-gray-700 h-[200px] flex items-center justify-center">
                <div className="text-center">
                  <h3 className="font-medium">{projectTitle}</h3>
                  <p className="text-sm text-muted-foreground">Embedded AI Vibe Builder Project</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={handleCopyLink}>
            {copied ? (
              <>
                <Check className="h-4 w-4 mr-2" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-2" />
                Copy Link
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
