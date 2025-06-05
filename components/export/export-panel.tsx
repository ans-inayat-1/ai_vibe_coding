"use client"

import { useState } from "react"
import { Download, FileCode, FileJson, FileText, Package, Check, Loader2 } from "lucide-react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

const exportSchema = z.object({
  format: z.enum(["react", "vue", "angular", "html", "json"]),
  includeAssets: z.boolean().default(true),
  includeDependencies: z.boolean().default(true),
  includeComments: z.boolean().default(true),
  projectName: z.string().min(1, "Project name is required"),
})

type ExportFormValues = z.infer<typeof exportSchema>

export function ExportPanel() {
  const [isExporting, setIsExporting] = useState(false)
  const [exportComplete, setExportComplete] = useState(false)

  const form = useForm<ExportFormValues>({
    resolver: zodResolver(exportSchema),
    defaultValues: {
      format: "react",
      includeAssets: true,
      includeDependencies: true,
      includeComments: true,
      projectName: "my-ai-vibe-project",
    },
  })

  async function onSubmit(data: ExportFormValues) {
    setIsExporting(true)

    // Simulate export process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log("Export data:", data)

    setIsExporting(false)
    setExportComplete(true)

    // Reset export complete status after 3 seconds
    setTimeout(() => {
      setExportComplete(false)
    }, 3000)
  }

  const getFormatIcon = (format: string) => {
    switch (format) {
      case "react":
      case "vue":
      case "angular":
        return <FileCode className="h-4 w-4" />
      case "html":
        return <FileText className="h-4 w-4" />
      case "json":
        return <FileJson className="h-4 w-4" />
      default:
        return <FileCode className="h-4 w-4" />
    }
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          Export Project
        </CardTitle>
        <CardDescription>Export your project in various formats</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="projectName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>This will be used as the folder and package name</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="format"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Export Format</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-2 gap-4"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="react" />
                        </FormControl>
                        <FormLabel className="font-normal flex items-center gap-2">
                          <FileCode className="h-4 w-4 text-blue-500" />
                          React
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="vue" />
                        </FormControl>
                        <FormLabel className="font-normal flex items-center gap-2">
                          <FileCode className="h-4 w-4 text-green-500" />
                          Vue
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="angular" />
                        </FormControl>
                        <FormLabel className="font-normal flex items-center gap-2">
                          <FileCode className="h-4 w-4 text-red-500" />
                          Angular
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="html" />
                        </FormControl>
                        <FormLabel className="font-normal flex items-center gap-2">
                          <FileText className="h-4 w-4 text-orange-500" />
                          HTML/CSS/JS
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="json" />
                        </FormControl>
                        <FormLabel className="font-normal flex items-center gap-2">
                          <FileJson className="h-4 w-4 text-purple-500" />
                          JSON
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-3">
              <Label>Export Options</Label>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="includeAssets"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Include Assets</FormLabel>
                        <FormDescription>Export images, icons, and other assets</FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="includeDependencies"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Include Dependencies</FormLabel>
                        <FormDescription>Generate package.json with required dependencies</FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="includeComments"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Include Comments</FormLabel>
                        <FormDescription>Add helpful comments to the generated code</FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isExporting}>
              {isExporting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Exporting...
                </>
              ) : exportComplete ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Export Complete
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Export Project
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
