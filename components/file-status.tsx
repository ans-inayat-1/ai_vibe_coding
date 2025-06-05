import { CheckCircle, Loader2 } from "lucide-react"

export type FileStatus = {
  name: string
  status: "pending" | "generating" | "completed" | "error"
  content?: string
}

interface FileStatusProps {
  files: FileStatus[]
}

export function FileStatusList({ files }: FileStatusProps) {
  return (
    <div className="space-y-2 mb-4">
      {files.map((file) => (
        <div key={file.name} className="flex items-center gap-2 text-sm">
          {file.status === "generating" ? (
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
          ) : file.status === "completed" ? (
            <CheckCircle className="h-4 w-4 text-green-500" />
          ) : (
            <div className="h-4 w-4 rounded-full border border-muted-foreground" />
          )}
          <span className={file.status === "completed" ? "text-green-500" : ""}>
            {file.name}:{" "}
            {file.status === "pending"
              ? "Pending"
              : file.status === "generating"
                ? "Generating..."
                : file.status === "completed"
                  ? "Generated"
                  : "Error"}
          </span>
        </div>
      ))}
    </div>
  )
}
