"use client"

import { useState } from "react"
import Image from "next/image"
import { Check, Sparkles } from "lucide-react"

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
import { Badge } from "@/components/ui/badge"

export type Template = {
  id: string
  name: string
  description: string
  image: string
  prompt: string
  category: string
}

const templates: Template[] = [
  {
    id: "dashboard",
    name: "Admin Dashboard",
    description: "A modern admin dashboard with charts and data tables",
    image: "/placeholder.svg?height=200&width=300",
    prompt: "Create a responsive admin dashboard with a sidebar, charts, and data tables.",
    category: "Dashboard",
  },
  {
    id: "landing",
    name: "Landing Page",
    description: "A marketing landing page with hero section and features",
    image: "/placeholder.svg?height=200&width=300",
    prompt: "Design a marketing landing page with a hero section, features grid, testimonials, and a call to action.",
    category: "Marketing",
  },
  {
    id: "ecommerce",
    name: "E-commerce Product Page",
    description: "A product page with image gallery and purchase options",
    image: "/placeholder.svg?height=200&width=300",
    prompt:
      "Build an e-commerce product page with image gallery, product details, variants selection, and add to cart functionality.",
    category: "E-commerce",
  },
  {
    id: "blog",
    name: "Blog Layout",
    description: "A clean blog layout with featured posts and categories",
    image: "/placeholder.svg?height=200&width=300",
    prompt: "Create a blog layout with featured posts, categories sidebar, and a clean reading experience.",
    category: "Content",
  },
  {
    id: "auth",
    name: "Authentication Forms",
    description: "Sign in and sign up forms with validation",
    image: "/placeholder.svg?height=200&width=300",
    prompt: "Design authentication forms including sign in, sign up, and password reset with form validation.",
    category: "Forms",
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
        <Button variant="outline" className="shadow-sm">
          <Sparkles className="mr-2 h-4 w-4" />
          Templates
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[900px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Template Gallery
          </DialogTitle>
          <DialogDescription>Choose a template to get started quickly with your UI design.</DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[600px] pr-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
            {templates.map((template) => (
              <div
                key={template.id}
                className={`relative rounded-xl border p-4 cursor-pointer transition-all hover:border-blue-500 hover:shadow-lg ${
                  selectedTemplate === template.id ? "border-blue-500 ring-2 ring-blue-500 ring-opacity-50" : ""
                }`}
                onClick={() => handleSelectTemplate(template)}
              >
                <div className="aspect-video relative rounded-lg overflow-hidden mb-3 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700">
                  <Image src={template.image || "/placeholder.svg"} alt={template.name} fill className="object-cover" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">{template.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{template.description}</p>
                    </div>
                    {selectedTemplate === template.id && (
                      <div className="h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center ml-2">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {template.category}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
