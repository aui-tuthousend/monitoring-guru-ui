import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, GraduationCap, User, Users } from "lucide-react"

interface ClassCardProps {
  className: string
  grade: string
  isActive: boolean
  teacher: string
  major: string
  subject: string
}

export function ClassCard({ className, grade, isActive, teacher, major, subject }: ClassCardProps) {
  return (
    <Card
      className={`w-full max-w-sm transition-all duration-200 hover:shadow-lg ${
        isActive ? "ring-2 ring-green-500 bg-green-50" : "hover:shadow-md"
      }`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900">{className}</CardTitle>
          <Badge
            variant={isActive ? "default" : "secondary"}
            className={isActive ? "bg-green-500 hover:bg-green-600" : ""}
          >
            {isActive ? "Active" : "Inactive"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <GraduationCap className="h-4 w-4" />
          <span className="font-medium">Grade:</span>
          <span>{grade}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <User className="h-4 w-4" />
          <span className="font-medium">Teacher:</span>
          <span>{teacher}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Users className="h-4 w-4" />
          <span className="font-medium">Major:</span>
          <span>{major}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <BookOpen className="h-4 w-4" />
          <span className="font-medium">Subject:</span>
          <span>{subject}</span>
        </div>
      </CardContent>
    </Card>
  )
}

