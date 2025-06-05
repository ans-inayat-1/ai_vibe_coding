"use client"

import { useState } from "react"
import Image from "next/image"
import { Check } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

export type Template = {
  id: string
  name: string
  description: string
  image: string
  prompt: string
}

const templates: Template[] = [
  {
    id: "dashboard",
    name: "Admin Dashboard",
    description: "A modern admin dashboard with charts and data tables",
    image: "/placeholder.svg?height=200&width=300",
    prompt: "Create a responsive admin dashboard with a sidebar, charts, and data tables.",
  },
  {
    id: "landing",
    name: "Landing Page",
    description: "A marketing landing page with hero section and features",
    image: "/placeholder.svg?height=200&width=300",
    prompt: "Design a marketing landing page with a hero section, features grid, testimonials, and a call to action.",
  },
  {
    id: "ecommerce",
    name: "E-commerce Product Page",
    description: "A product page with image gallery and purchase options",
    image: "/placeholder.svg?height=200&width=300",
    prompt:
      "Build an e-commerce product page with image gallery, product details, variants selection, and add to cart functionality.",
  },
  {
    id: "blog",
    name: "Blog Layout",
    description: "A clean blog layout with featured posts and categories",
    image: "/placeholder.svg?height=200&width=300",
    prompt: "Create a blog layout with featured posts, categories sidebar, and a clean reading experience.",
  },
  {
    id: "auth",
    name: "Authentication Forms",
    description: "Sign in and sign up forms with validation",
    image: "/placeholder.svg?height=200&width=300",
    prompt: "Design authentication forms including sign in, sign up, and password reset with form validation.",
  },
]

interface TemplateGalleryProps {
  onSelectTemplate: (template: Template) => void
}

export function TemplateGallery({ onSelectTemplate }: TemplateGalleryProps) {
  const [open, setOpen] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)

  const handleSelectTemplate = (template: Template) => {
    setSelectedTemplate(template.id)
    onSelectTemplate(template)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Browse Templates</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Template Gallery</DialogTitle>
          <DialogDescription>Choose a template to get started quickly with your UI design.</DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[500px] pr-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            {templates.map((template) => (
              <div
                key={template.id}
                className={`relative rounded-lg border p-3 cursor-pointer transition-all hover:border-primary ${
                  selectedTemplate === template.id ? "border-primary ring-2 ring-primary ring-opacity-50" : ""
                }`}
                onClick={() => handleSelectTemplate(template)}
              >
                <div className="aspect-video relative rounded-md overflow-hidden mb-3 bg-muted">
                  <Image src={template.image || "/placeholder.svg"} alt={template.name} fill className="object-cover" />
                </div>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium">{template.name}</h3>
                    <p className="text-sm text-muted-foreground">{template.description}</p>
                  </div>
                  {selectedTemplate === template.id && (
                    <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                      <Check className="h-3 w-3 text-primary-foreground" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
