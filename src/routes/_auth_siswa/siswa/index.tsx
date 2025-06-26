import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Clock, AlertCircle, CheckCircle, TrendingUp } from "lucide-react"
import { useJadwalajarStore } from '@/store/jadwalAjar/useJadwalAjar'
import { useCookies } from 'react-cookie'
import { useEffect } from 'react'
import { timeStringToDate } from '@/lib/utils'
import { toast } from 'sonner'

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
  const [cookies] = useCookies(['userData', 'authToken'])
  const userData = cookies.userData
  const token = cookies.authToken

  const store = useJadwalajarStore()
  const navigate = useNavigate()

  const stats = {
    completedAssignments: 12,
    pendingAssignments: 3,
    averageGrade: 87,
    attendanceRate: 96,
  }

  useEffect(() => {
    const fetchData = async () => {
      await store.GetListJadwalajarKelas(token, { id: userData.kelas_id, hari: "senin" })
    }
    fetchData()
  }, [])

  const isOnTime = (jam_mulai: string, jam_selesai: string) => {
    const now = new Date()
    const start = timeStringToDate(jam_mulai)
    const end = timeStringToDate(jam_selesai)
    return now >= start && now <= end
  }

  const handleNavigate = (mapel: any) => {
    console.log(mapel)
    if (!isOnTime(mapel.jam_mulai, mapel.jam_selesai)) {
      toast.error('Kelas belum dimulai!')
      return
    }
    navigate({ 
      to: `/siswa/${mapel.id}` 
    })
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
          <div className="space-y-3 flex flex-col gap-2">
            {store.list.map((item, index) => (
              <div key={index} onClick={() => handleNavigate(item)} className="cursor-pointer">
                <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium">{item.mapel.name}</h4>
                      <p className="text-sm text-gray-600">{item.guru.name}</p>
                      <p className="text-xs text-gray-500">{item.ruangan.name}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant={isOnTime(item.jam_mulai, item.jam_selesai) ? "default" : "destructive"}>{item.jam_mulai} - {item.jam_selesai}</Badge>
                    </div>
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
