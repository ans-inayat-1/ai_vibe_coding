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
    <div className="space-y-3">
      {files.map((file) => (
        <div key={file.name} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
          {file.status === "generating" ? (
            <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
          ) : file.status === "completed" ? (
            <CheckCircle className="h-5 w-5 text-green-500" />
          ) : (
            <div className="h-5 w-5 rounded-full border-2 border-gray-300 dark:border-gray-600" />
          )}
          <div className="flex-1">
            <span className={`font-medium ${file.status === "completed" ? "text-green-600 dark:text-green-400" : ""}`}>
              {file.name}
            </span>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {file.status === "pending"
                ? "Waiting to start..."
                : file.status === "generating"
                  ? "Generating..."
                  : file.status === "completed"
                    ? "Generated successfully"
                    : "Error occurred"}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
