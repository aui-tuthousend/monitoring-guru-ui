import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"
import { Clock, Users, BookOpen, QrCode, CheckCircle } from "lucide-react"
import { useCookies } from "react-cookie"
import { useJadwalajarStore } from "@/store/jadwalAjar/useJadwalAjar"
import { toast } from "sonner"
import { useQuery } from "@tanstack/react-query"

export const Route = createFileRoute('/_auth_guru/guru/')({
  component: RouteComponent,
});

// untuk masuk ke scan qr code guru tergantung jam, jadi nanti kalau jamnya sesuai bakalan bisa di klik


function RouteComponent() {
  const navigate = useNavigate();
  const [cookies] = useCookies(['userData', 'authToken'])
  const userData = cookies.userData
  const token = cookies.authToken

  const {GetListJadwalajarGuru} = useJadwalajarStore();
  const [timestamp, setTimestamp] = useState<{ date: string, time: string } | null>(null);
  const stats = {
    totalStudents: 109,
    classesCompleted: 1,
    classesRemaining: 3,
    attendanceRate: 94,
  }

  const {data, isPending, error} = useQuery({
    queryKey: ["jadwal-guru", userData.id],
    queryFn: () => GetListJadwalajarGuru(token, { id: userData.id, hari: "senin" }),
    // enabled: !!userData.kelas_id && !!token,
  })

  // console.log(data)

  if (error){
    toast.error('Gagal mengambil data jadwal guru!')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "ongoing":
        return "bg-blue-100 text-blue-800"
      case "upcoming":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      case "ongoing":
        return <Clock className="h-4 w-4" />
      case "upcoming":
        return <BookOpen className="h-4 w-4" />
      default:
        return null
    }
  }

  // logic fetch data ke be
  useEffect(() => {
    const now = new Date();
    setTimestamp({
      date: now.toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      }),
      time: now.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit"
      }),
    });

  }, []);

  const handleScanClick = (mataPelajaran: string) => {
    navigate({ to: '/guru/scan', from: '/guru' });
    toast.success(`Membuka scanner untuk ${mataPelajaran}`);
  };

  const handleScanAttendance = (classId: string, subject: string) => {
    // Simulate attendance scanning
    console.log(`Scanning attendance for ${subject} (${classId})`)
    // In a real app, this would navigate to a QR scanner or attendance page
    navigate({ to: '/guru/scan', from: '/guru' });
    toast.success(`Membuka scanner untuk ${classId} ${subject}`);
  }

  return (
    <>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Today's Dashboard
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-blue-600">Students</span>
            </div>
            <p className="text-2xl font-bold text-blue-900">{stats.totalStudents}</p>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-green-600">Completed</span>
            </div>
            <p className="text-2xl font-bold text-green-900">{stats.classesCompleted}</p>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-yellow-600" />
              <span className="text-sm font-medium text-yellow-600">Remaining</span>
            </div>
            <p className="text-2xl font-bold text-yellow-900">{stats.classesRemaining}</p>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-purple-600" />
              <span className="text-sm font-medium text-purple-600">Attendance</span>
            </div>
            <p className="text-2xl font-bold text-purple-900">{stats.attendanceRate}%</p>
          </div>
        </div>

        {/* Today's Schedule */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Today's Classes</h3>
          <div className="space-y-3">
            {/* {todaySchedule.map((schedule) => (
              <div key={schedule.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-medium text-lg">{schedule.subject}</h4>
                      <Badge className={getStatusColor(schedule.status)}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(schedule.status)}
                          {schedule.status}
                        </div>
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {schedule.class}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {schedule.time}
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        {schedule.room}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {schedule.students} students
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {schedule.status !== "completed" && (
                      <Button
                        onClick={() => handleScanAttendance(schedule.id, schedule.subject)}
                        variant={schedule.status === "ongoing" ? "default" : "outline"}
                        size="sm"
                        className="flex items-center gap-2"
                      >
                        <QrCode className="h-4 w-4" />
                        {schedule.status === "ongoing" ? "Take Attendance" : "Prepare"}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))} */}
            {data?.map((jadwal: any, index: number) => (
              <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-medium text-lg">{jadwal.mapel.name}</h4>
                      <Badge className="bg-blue-100 text-blue-800">
                        <div className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4" />
                          {jadwal.kelas.name}
                        </div>
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {jadwal.jam_mulai} - {jadwal.jam_selesai}
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        Room {jadwal.ruangan.name || 'N/A'}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {jadwal.hari}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleScanClick(jadwal.mapel.name)}
                      variant="default"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <QrCode className="h-4 w-4" />
                      Take Attendance
                    </Button>
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
