"use client"

import { useState } from "react"
import { History, ArrowLeft, ArrowRight, RotateCcw, Check, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import type { ProjectVersion } from "@/types/user"

interface VersionHistoryProps {
  projectId: string
  versions: ProjectVersion[]
  currentVersion: number
  onRevertToVersion: (projectId: string, versionId: string) => void
  onViewVersion: (version: ProjectVersion) => void
}

export function VersionHistory({
  projectId,
  versions,
  currentVersion,
  onRevertToVersion,
  onViewVersion,
}: VersionHistoryProps) {
  const [selectedVersion, setSelectedVersion] = useState<ProjectVersion | null>(null)
  const [showRevertDialog, setShowRevertDialog] = useState(false)
  const [showDiffDialog, setShowDiffDialog] = useState(false)

  const sortedVersions = [...versions].sort((a, b) => b.versionNumber - a.versionNumber)

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date)
  }

  const handleRevert = () => {
    if (selectedVersion) {
      onRevertToVersion(projectId, selectedVersion.id)
      setShowRevertDialog(false)
    }
  }

  const handleCompare = (version: ProjectVersion) => {
    setSelectedVersion(version)
    setShowDiffDialog(true)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <History className="h-5 w-5 text-muted-foreground" />
          <h3 className="text-lg font-semibold">Version History</h3>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <Info className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">
                Version history allows you to track changes to your project over time and revert to previous versions if
                needed.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <Alert className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-900">
        <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        <AlertTitle className="text-blue-800 dark:text-blue-300">About Version History</AlertTitle>
        <AlertDescription className="text-blue-700 dark:text-blue-400">
          Each time you save significant changes to your project, a new version is created. You can view or restore any
          previous version.
        </AlertDescription>
      </Alert>

      <ScrollArea className="h-[300px] pr-4">
        <div className="space-y-2">
          {sortedVersions.map((version, index) => (
            <div
              key={version.id}
              className={`p-3 border rounded-lg ${
                version.versionNumber === currentVersion
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-950"
                  : "hover:border-gray-400 dark:hover:border-gray-600"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant={version.versionNumber === currentVersion ? "default" : "outline"}>
                    v{version.versionNumber}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{formatDate(version.createdAt)}</span>
                </div>
                <div className="flex items-center gap-2">
                  {version.versionNumber === currentVersion ? (
                    <Badge
                      variant="outline"
                      className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                    >
                      <Check className="h-3 w-3 mr-1" />
                      Current
                    </Badge>
                  ) : (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedVersion(version)
                          setShowRevertDialog(true)
                        }}
                      >
                        <RotateCcw className="h-3.5 w-3.5 mr-1" />
                        Restore
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => onViewVersion(version)}>
                        View
                      </Button>
                    </>
                  )}
                </div>
              </div>

              {version.description && <p className="text-sm mt-2 text-muted-foreground">{version.description}</p>}

              {version.changes && (
                <div className="mt-2 text-xs text-muted-foreground bg-gray-50 dark:bg-gray-900 p-2 rounded">
                  {version.changes}
                </div>
              )}

              {index < sortedVersions.length - 1 && (
                <div className="flex items-center gap-2 mt-2">
                  <Button variant="ghost" size="sm" className="text-xs h-7 px-2" onClick={() => handleCompare(version)}>
                    <ArrowLeft className="h-3 w-3 mr-1" />
                    Compare with previous
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Revert Dialog */}
      <Dialog open={showRevertDialog} onOpenChange={setShowRevertDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Restore Version</DialogTitle>
            <DialogDescription>
              Are you sure you want to restore version {selectedVersion?.versionNumber}? This will create a new version
              based on the selected one.
            </DialogDescription>
          </DialogHeader>
          <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-900 rounded-lg p-4 my-4">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
              <div>
                <h4 className="font-medium text-amber-800 dark:text-amber-300">Important Note</h4>
                <p className="text-sm text-amber-700 dark:text-amber-400">
                  Restoring a previous version will not delete your current version. Instead, it will create a new
                  version based on the selected one.
                </p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRevertDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleRevert}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Restore Version {selectedVersion?.versionNumber}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diff Dialog */}
      <Dialog open={showDiffDialog} onOpenChange={setShowDiffDialog}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Compare Versions</DialogTitle>
            <DialogDescription>
              Comparing version {selectedVersion?.versionNumber} with previous version
            </DialogDescription>
          </DialogHeader>

          {selectedVersion && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge>v{selectedVersion.versionNumber - 1}</Badge>
                  <ArrowRight className="h-4 w-4" />
                  <Badge>v{selectedVersion.versionNumber}</Badge>
                </div>
                <span className="text-sm text-muted-foreground">{formatDate(selectedVersion.createdAt)}</span>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium mb-2">
                    Previous Version (v{selectedVersion.versionNumber - 1})
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg h-[400px] overflow-auto">
                    <pre className="text-xs whitespace-pre-wrap">
                      {versions.find((v) => v.versionNumber === selectedVersion.versionNumber - 1)?.code ||
                        "No code available"}
                    </pre>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium mb-2">Current Version (v{selectedVersion.versionNumber})</div>
                  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg h-[400px] overflow-auto">
                    <pre className="text-xs whitespace-pre-wrap">{selectedVersion.code}</pre>
                  </div>
                </div>
              </div>

              <div>
                <div className="text-sm font-medium mb-2">Changes</div>
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                  <p className="text-sm">{selectedVersion.changes || "No change description available"}</p>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDiffDialog(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
