import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileInput } from "./ui/file-input"
import { Badge } from "./ui/badge"
import { useState } from "react"
import { Loader2, Upload } from "lucide-react"
import { useImportStore } from "@/store/import/useImport"
import { toast } from "sonner"

export function ImportButton({ endpoint }: { endpoint: string }) {

    const store = useImportStore()
    const [documentFiles, setDocumentFiles] = useState<File[]>([])
    const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false)
  
    const handleFileUpload = (files: File[]) => {
      store.setData({ file: files[0], endpoint })
    }

    const handleSubmit = async () => {
      const response = await store.upload()
      console.log(response)

      if (response.error) {
        toast.error(response.error)
      } else {
        toast.success(response.message)
        setIsAddDialogOpen(false)
        clearAllFiles()
      }
    }
    
    const clearAllFiles = () => {
      setDocumentFiles([])
    }

  return (
    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="flex items-center gap-2">
          <Upload strokeWidth={3.75} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <Card className="mt-5">
            <CardHeader>
            <CardTitle>Document Upload</CardTitle>
            <CardDescription>
                Upload .xlsx files only with 20MB limit.
            </CardDescription>
            </CardHeader>
            <CardContent>
            <FileInput
              onFileSelect={(files) => {
              setDocumentFiles(files)
              handleFileUpload(files)
              }}
              accept=".xlsx"
              multiple={false}
              maxSize={20}
            />
            {documentFiles.length > 0 && (
              <div className="mt-4">
              <Badge variant="secondary">{documentFiles.length} document(s) selected</Badge>
              </div>
            )}
            </CardContent>
        </Card>
        <Button
              type="button"
              onClick={handleSubmit}
              disabled={documentFiles.length === 0 || store.loading}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-90 transition-opacity"
            >
              {store.loading && (
                <Loader2 className="h-4 w-4 animate-spin" />
              )}
              Submit
            </Button>
      </DialogContent>
    </Dialog>
  )
}
