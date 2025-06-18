import { Link, Outlet,createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect } from "react"
import { Bell, LogOut, GraduationCap } from "lucide-react"
import Kawai from '/IMG_3661.jpeg';

export const Route = createFileRoute('/_auth_guru/siswa')({
  component: RouteComponent,
})

interface StudentProfile {
  id: string
  name: string
  grade: string
  studentId: string
  email: string
  gpa: number
  avatar: string
}

function RouteComponent() {
  const [studentProfile] = useState<StudentProfile>({
    id: "student-001",
    name: "Alex Chen",
    grade: "Grade 11",
    studentId: "STU-2024-001",
    email: "alex.chen@school.edu",
    gpa: 3.85,
    avatar: "/placeholder.svg?height=80&width=80",
  })

  const [currentTime, setCurrentTime] = useState<{
    date: string
    time: string
  }>({ date: "", time: "" })

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime({
        date: now.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        time: now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      })
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link to="/" className="text-xl font-bold text-green-600">
                EduPortal
              </Link>
              <Badge variant="secondary">Student</Badge>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">{currentTime.time}</span>
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Profile Card */}
        <Card className="relative bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg mb-6">
          <CardHeader className="flex flex-row items-center space-x-4 space-y-0">
            <div className="relative">
              <img
                src={Kawai}
                alt="Student Profile"
                className="h-20 w-20 rounded-full object-cover border-4 border-white/20"
              />
            </div>
            <div className="flex-1">
              <CardTitle className="text-xl">{studentProfile.name}</CardTitle>
              <p className="text-green-100">{studentProfile.grade}</p>
              <p className="text-xs text-green-200">ID: {studentProfile.studentId}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-green-100">{currentTime.date}</p>
              <div className="flex items-center gap-2 mt-2">
                <GraduationCap className="h-4 w-4" />
                <span className="text-sm">GPA: {studentProfile.gpa}</span>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Navigation */}
        {/* <div className="flex gap-2 mb-6">
          <Link to="/student">
            <Button variant="outline" size="sm">
              Dashboard
            </Button>
          </Link>
          <Link to="/student/assignments">
            <Button variant="outline" size="sm">
              Assignments
            </Button>
          </Link>
          <Link to="/student/grades">
            <Button variant="outline" size="sm">
              Grades
            </Button>
          </Link>
          <Link to="/student/schedule">
            <Button variant="outline" size="sm">
              Schedule
            </Button>
          </Link>
        </div> */}

        {/* Content Area */}
        <Card className="shadow-md">
          <Outlet />
        </Card>
      </div>
    </div>
  )
}
