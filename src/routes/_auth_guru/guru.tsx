import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Link, Outlet } from '@tanstack/react-router';
import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import KawaiGura from '/IMG_3167.jpeg';
import { Bell, LogOut, ScanQrCodeIcon, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/auth';
import { useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';
import { useWebsocket } from '@/store/websocket/useWebsocket';
import NotifUser from '@/components/notif-user';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useIzinStore } from '@/store/izin/useIzin';

// untuk masuk ke scan qr code guru tergantung jam, jadi nanti kalau jamnya sesuai bakalan bisa di klik

const navigationData = {
  navMain: [
    {
      title: "Dashboard",
      url: "/admin",
      // icon: <CircleGauge />
    },]
}

export const Route = createFileRoute('/_auth_guru/guru')({
  component: RouteComponent,
});

function RouteComponent() {
  const auth = useAuth()
  const navigate = useNavigate()

  const [cookies] = useCookies(['userData', 'authToken'])
  const userData = cookies.userData
  const token = cookies.authToken

  const [teacherProfile, setTeacherProfile] = useState<{
    name: string;
    jabatan: string;
    npsn?: string;
    attendanceMarked: boolean;
  }>({
    name: "Loading...",
    jabatan: "Loading...",
    attendanceMarked: false,
  });
  const [currentTime, setCurrentTime] = useState<{
    date: string
    time: string
  }>({ date: "", time: "" })
  
  const {GetAllIzinGuru} = useIzinStore();
  const { data } = useSuspenseQuery({
      queryKey: ["get-izin-guru"],
      queryFn: () => GetAllIzinGuru(token, userData.nip),
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
    setRole('guru', cookies.userData.nip);
    connectWebSocket();

    const handleMessage = (data: string) => {
      const { type, payload } = JSON.parse(data);

      if (type === 'handle-izin') {
        toast.info(`izin telah ${payload.approval ? 'disetujui' : 'ditolak'}`);
        setIzinList((prev) => [...prev, payload])
      }
    };

    addMessageListener(handleMessage);
    

    return () => {
      closeConnection();
      removeMessageListener(handleMessage)
    };
  }, []);

  useEffect(() => {
    if (cookies.userData) {
      try {
        const guruData = cookies.userData;
        setTeacherProfile({
          name: guruData.name,
          jabatan: guruData.jabatan,
          npsn: guruData.npsn,
          attendanceMarked: false,
        });
      } catch (err) {
        console.error("Failed to parse userData cookie", err);
      }
    }
  }, [cookies.userData]);

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

  const handleLogout = async () => {
    try {
      const result = await auth.logout()
      console.log("Logout result:", result)
      if (result.success) {
        navigate({ to: '/login-guru' })
      } else {
        console.error("Logout failed:", result.error)
      }
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  const handleScan = async () => {
    navigate({ to: '/guru/scan', from: '/guru' });
    toast.success(`Membuka scanner`);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link to={'/'} className="text-xl font-bold text-blue-600">
                EduPortal
              </Link>
              <Badge>Teacher</Badge>
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
        <Card className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg mb-6">
          <CardHeader className="flex flex-row items-center space-x-4 space-y-0">
            <div className="relative">
              <img
                src={KawaiGura}
                alt="Teacher Profile"
                className="h-20 w-20 rounded-full object-cover border-4 border-white/20"
              />
              {!teacherProfile.attendanceMarked && (
                <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-red-500 border-2 border-white animate-pulse"></div>
              )}
            </div>
            <div className="flex-1">
              <CardTitle className="text-xl">{teacherProfile.name}</CardTitle>
              {/* <p className="text-blue-100">{teacherProfile.subject} Teacher</p> */}
              {/* <p className="text-xs text-blue-200">ID: {teacherProfile.employeeId}</p> */}
              {!teacherProfile.attendanceMarked && (
                <Button onClick={handleScan} variant="secondary" size="sm" className="mt-2">
                  <ScanQrCodeIcon />
                  Mark Attendance
                </Button>
              )}
            </div>
            <div className="text-right">
              <p className="text-sm text-blue-100">{currentTime.date}</p>
              <div className="flex items-center gap-2 mt-2">
                <User className="h-4 w-4" />
                {/* <span className="text-sm">{teacherProfile.totalClasses} Classes</span> */}
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Navigation */}
        <div className="flex gap-2 mb-6">
          <Link to={'/guru'}>
            <Button variant="outline" size="sm">
              Dashboard
            </Button>
          </Link>
          {/* <Link to={'/guru/jadwal'}>
            <Button variant="outline" size="sm">
              Schedule
            </Button>
          </Link> */}
          {/* <Link href="/teacher/classes">
            <Button variant="outline" size="sm">
              Classes
            </Button>
          </Link>
          <Link href="/teacher/students">
            <Button variant="outline" size="sm">
              Students
            </Button>
          </Link> */}
        </div>

        {/* Content Area */}
        <Card className="shadow-md">
          <Outlet />
        </Card>
      </div>
    </div>
  )
}
