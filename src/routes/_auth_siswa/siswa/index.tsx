import { createFileRoute } from '@tanstack/react-router'
import { CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Clock, AlertCircle, CheckCircle, TrendingUp } from "lucide-react"

interface Assignment {
  id: string
  title: string
  subject: string
  dueDate: string
  status: "pending" | "submitted" | "overdue"
  progress: number
}

interface UpcomingClass {
  id: string
  subject: string
  teacher: string
  time: string
  room: string
}

export const Route = createFileRoute('/_auth_siswa/siswa/')({
  component: RouteComponent,
})

function RouteComponent() {
  const assignments: Assignment[] = [
    {
      id: "1",
      title: "Calculus Problem Set 5",
      subject: "Mathematics",
      dueDate: "2024-12-20",
      status: "pending",
      progress: 60,
    },
    {
      id: "2",
      title: "Physics Lab Report",
      subject: "Physics",
      dueDate: "2024-12-18",
      status: "submitted",
      progress: 100,
    },
    {
      id: "3",
      title: "History Essay",
      subject: "History",
      dueDate: "2024-12-15",
      status: "overdue",
      progress: 30,
    },
  ]

  const upcomingClasses: UpcomingClass[] = [
    {
      id: "1",
      subject: "Advanced Mathematics",
      teacher: "Dr. Sarah Johnson",
      time: "10:00 - 11:30",
      room: "Room 201",
    },
    {
      id: "2",
      subject: "Physics",
      teacher: "Prof. Michael Brown",
      time: "13:00 - 14:30",
      room: "Lab 105",
    },
    {
      id: "3",
      subject: "English Literature",
      teacher: "Ms. Emily Davis",
      time: "15:00 - 16:30",
      room: "Room 301",
    },
  ]

  const stats = {
    completedAssignments: 12,
    pendingAssignments: 3,
    averageGrade: 87,
    attendanceRate: 96,
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "submitted":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "overdue":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "submitted":
        return <CheckCircle className="h-4 w-4" />
      case "pending":
        return <Clock className="h-4 w-4" />
      case "overdue":
        return <AlertCircle className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Student Dashboard
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-blue-600">Completed</span>
            </div>
            <p className="text-2xl font-bold text-blue-900">{stats.completedAssignments}</p>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-yellow-600" />
              <span className="text-sm font-medium text-yellow-600">Pending</span>
            </div>
            <p className="text-2xl font-bold text-yellow-900">{stats.pendingAssignments}</p>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-green-600">Avg Grade</span>
            </div>
            <p className="text-2xl font-bold text-green-900">{stats.averageGrade}%</p>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-purple-600" />
              <span className="text-sm font-medium text-purple-600">Attendance</span>
            </div>
            <p className="text-2xl font-bold text-purple-900">{stats.attendanceRate}%</p>
          </div>
        </div>

        {/* Recent Assignments */}
        {/* <div>
          <h3 className="text-lg font-semibold mb-4">Recent Assignments</h3>
          <div className="space-y-3">
            {assignments.map((assignment) => (
              <div key={assignment.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-medium">{assignment.title}</h4>
                    <p className="text-sm text-gray-600">{assignment.subject}</p>
                    <p className="text-xs text-gray-500">Due: {assignment.dueDate}</p>
                  </div>
                  <Badge className={getStatusColor(assignment.status)}>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(assignment.status)}
                      {assignment.status}
                    </div>
                  </Badge>
                </div>

                {assignment.status !== "submitted" && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{assignment.progress}%</span>
                    </div>
                    <Progress value={assignment.progress} className="h-2" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div> */}

        {/* Today's Classes */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Today's Classes</h3>
          <div className="space-y-3">
            {upcomingClasses.map((classItem) => (
              <div key={classItem.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium">{classItem.subject}</h4>
                    <p className="text-sm text-gray-600">{classItem.teacher}</p>
                    <p className="text-xs text-gray-500">{classItem.room}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline">{classItem.time}</Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </>
  )
}
