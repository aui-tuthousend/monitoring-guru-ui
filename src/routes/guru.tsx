import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Outlet } from '@tanstack/react-router'
import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import KawaiGura from "/IMG_3167.jpeg";

export const Route = createFileRoute('/guru')({
  component: RouteComponent,
})

function RouteComponent() {
  const [cookies] = useCookies(['userData']);
  const [teacherProfile, setTeacherProfile] = useState<any>({
    name: "Loading...",
    role: "Loading...",
    attendanceMarked: false
  });
  // const [scheduleItems, setScheduleItems] = useState<any[]>([]);

  // Get today's date
  // const today = new Date();
  
  // const data = useLoaderData() as { response: any };  // Type the response
  // console.log(data.response);  // Now this will log the actual response data

  // Load teacher data from cookies
  useEffect(() => {
    if (cookies.userData?.guru) {
      const guruData = cookies.userData.guru;
      setTeacherProfile({
        name: guruData.nama,
        role: guruData.jabatan,
        npsn: guruData.npsn,
        attendanceMarked: false // You might want to load this from cookies too
      });
    }
  }, [cookies.userData]);

  return (
    <div className="relative min-h-screen bg-gray-50 p-6">
      {/* Main overlapping card (profile overview) */}
      <Card className="relative z-10 w-full bg-blue-600 text-primary-foreground shadow-lg">
        <CardHeader className="flex flex-row items-center space-x-4 space-y-0">
          <div className="relative">
            <img 
              src={KawaiGura}
              alt="Teacher Profile" 
              className="h-20 w-20 rounded-full object-cover"
            />
            {!teacherProfile.attendanceMarked && (
              <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-red-500 border-2 border-white"></div>
            )}
          </div>
          <div className="flex-1">
            <CardTitle className="text-lg">{teacherProfile.name}</CardTitle>
            <p className="text-sm text-accent">{teacherProfile.role}</p>
            {teacherProfile.npsn && (
              <p className="text-xs text-accent/80">NPSN: {teacherProfile.npsn}</p>
            )}
            {!teacherProfile.attendanceMarked && (
              <p className="text-sm text-red-300 mt-1">Mark your attendance!</p>
            )}
          </div>
        </CardHeader>
        <CardContent className="pb-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">Total Classes</span>
              {/* <span>{scheduleItems.length}</span> */}
            </div>
           
          </div>
        </CardContent>
      </Card>

      {/* Secondary card (content area) */}
      <Card className="relative -mt-8 z-20 w-full pt-5 pb-6 shadow-md">
        <Outlet />
      </Card> {/* <div className="flex justify-between">
              <span className="font-medium">Next Class</span>
              <span>{scheduleItems[0]?.subject || "None"}</span>
            </div> */}
    </div>
  );
}
