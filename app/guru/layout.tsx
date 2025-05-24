import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { ChevronRight } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "~/components/ui/button";
import { Outlet } from "react-router";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import KawaiGura from "/IMG_3167.jpeg";

// Type definitions
type ScheduleItem = {
  id: number;
  subject: string;
  class: string;
  time: string;
  room: string;
};

type TeacherProfile = {
  name: string;
  role: string;
  npsn?: string;
  attendanceMarked: boolean;
};

export default function GuruLayout() {
  const [cookies] = useCookies(['user']);
  const [teacherProfile, setTeacherProfile] = useState<TeacherProfile>({
    name: "Loading...",
    role: "Loading...",
    attendanceMarked: false
  });
  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([]);

  // Get today's date
  const today = new Date();
  const dateFormatted = today.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric'
  });

  // Load teacher data from cookies
  useEffect(() => {
    if (cookies.user?.guru) {
      const guruData = cookies.user.guru;
      setTeacherProfile({
        name: guruData.nama,
        role: guruData.jabatan,
        npsn: guruData.npsn,
        attendanceMarked: false // You might want to load this from cookies too
      });

      // Mock schedule - replace with actual data fetching
      setScheduleItems([
        {
          id: 1,
          subject: guruData.jabatan.includes("Matematika") ? "Mathematics" : "General",
          class: "Grade 10-A",
          time: "08:00 - 10:00",
          room: "Room 302"
        },
        // Add more schedule items as needed
      ]);
    }
  }, [cookies.user]);

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
              <span>{scheduleItems.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Next Class</span>
              <span>{scheduleItems[0]?.subject || "None"}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Secondary card (content area) */}
      <Card className="relative -mt-8 z-20 w-full pt-5 pb-6 shadow-md">
        <Outlet />
      </Card>
    </div>
  );
}