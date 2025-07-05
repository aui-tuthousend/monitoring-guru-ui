import { Link, Outlet, createFileRoute, useNavigate } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect } from "react"
import { Bell, LogOut, GraduationCap } from "lucide-react"
import Kawai from '/IMG_3661.jpeg';
import { useAuth } from '@/auth'
import { useCookies } from 'react-cookie'
import { useWebsocket } from '@/store/websocket/useWebsocket'
import { useIzinStore } from '@/store/izin/useIzin'
import { useSuspenseQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import NotifUser from '@/components/notif-user'

export const Route = createFileRoute('/_auth_siswa/siswa')({
  component: RouteComponent,
})

// interface StudentProfile {
//   id: string
//   name: string
//   grade: string
//   studentId: string
//   email: string
//   gpa: number
//   avatar: string
// }


function RouteComponent() {
  const auth = useAuth()
  const navigate = useNavigate()
  const [cookies] = useCookies(['userData', 'authToken'])
  const userData = cookies.userData
  const token = cookies.authToken

  // const [studentProfile] = useState<StudentProfile>({
  //   id: "student-001",
  //   name: "Alex Chen",
  //   grade: "Grade 11",
  //   studentId: "STU-2024-001",
  //   email: "alex.chen@school.edu",
  //   gpa: 3.85,
  //   avatar: "/placeholder.svg?height=80&width=80",
  // })

  const [studentProfile, setStudentProfile] = useState<{
    nama: string;
    // kelas: string;
    nisn: string;
    // attendanceMarked: boolean;
  }>({
    nama: "Loading...",
    // kelas: "Loading...",
    nisn: "Loading...",
    // attendanceMarked: false,
  });

  const {GetAllIzinKelas} = useIzinStore();
    const { data } = useSuspenseQuery({
        queryKey: ["get-izin-kelas"],
        queryFn: () => GetAllIzinKelas(token, userData.kelas_id),
      })
  
    const [izinList, setIzinList] = useState(data || [])

  const {
    setRole,
    connectWebSocket,
    closeConnection,
    addMessageListener,
    removeMessageListener
  } = useWebsocket();

  useEffect(() => {
    setRole('siswa', cookies.userData.kelas_id);
    connectWebSocket();

    const handleMessage = (data: string) => {
      const { type, payload } = JSON.parse(data);

      if (type === 'handle-izin') {
        toast.info("izin masuk dari kelas " + payload.mapel);
        setIzinList((prev) => [...prev, payload])
      }
    };

    addMessageListener(handleMessage);
    

    return () => {
      closeConnection();
      removeMessageListener(handleMessage)
    };
  }, []);

  const [currentTime, setCurrentTime] = useState<{
    date: string
    time: string
  }>({ date: "", time: "" })

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime({
        date: now.toLocaleDateString("id-ID", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        time: now.toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      })
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
      if (cookies.userData) {
        try {
          const dataSiswa = cookies.userData;
          setStudentProfile({
            nama: dataSiswa.name,
            // kelas: dataSiswa.kelas_id,
            nisn: dataSiswa.nisn,
            // attendanceMarked: false, // add attendance logic if needed
          });
          console.log(dataSiswa)
        } catch (err) {
          console.error("Failed to parse userData cookie", err);
        }
      }
    }, [cookies.userData]);

  const handleLogout = async () => {
    try {
      const result = await auth.logout()
      console.log("Logout result:", result)
      if (result.success) {
        navigate({ to: '/login-siswa' })
      } else {
        console.error("Logout failed:", result.error)
      }
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

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
              <NotifUser data={izinList}/>
              <Button onClick={handleLogout} variant="ghost" size="sm">
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
              <CardTitle className="text-xl">{studentProfile.nama}</CardTitle>
              {/* <p className="text-green-100">{studentProfile.kelas}</p> */}
              <p className="text-xs text-green-200">NISN: {studentProfile.nisn}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-green-100">{currentTime.date}</p>
              {/* <div className="flex items-center gap-2 mt-2">
                <GraduationCap className="h-4 w-4" />
                <span className="text-sm">GPA: {studentProfile.gpa}</span>
              </div> */}
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
