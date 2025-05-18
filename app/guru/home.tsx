import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { ChevronRight } from "lucide-react";

export default function TeacherHome() {
  // Sample data
  const today = new Date();
  const dateFormatted = today.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric'
  });

  const teacherProfile = {
    name: "Dr. Sarah Johnson",
    role: "Mathematics Professor",
    attendanceMarked: false
  };

  const scheduleItems = [
    {
      id: 1,
      subject: "Mathematics",
      class: "Grade 10-A",
      time: "08:00 - 10:00",
      room: "Room 302"
    },
    {
      id: 2,
      subject: "Physics",
      class: "Grade 11-B",
      time: "10:30 - 12:00",
      room: "Lab 105"
    },
    {
      id: 3,
      subject: "Computer Science",
      class: "Grade 12-C",
      time: "13:00 - 15:00",
      room: "Lab 203"
    }
  ];

  return (
    <div className="relative min-h-screen bg-gray-50 p-6">
      {/* Main overlapping card (schedule overview) */}
      <Card className="relative z-10 w-full bg-blue-600 text-primary-foreground shadow-lg">
        <CardHeader className="flex flex-row items-center space-x-4 space-y-0">
          <div className="relative">
            <div className="h-16 w-16 rounded-full bg-orange-400 flex items-center justify-center text-white text-2xl font-bold">
              {teacherProfile.name.split(' ').map(n => n[0]).join('')}
            </div>
            {!teacherProfile.attendanceMarked && (
              <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-red-500 border-2 border-white"></div>
            )}
          </div>
          <div className="flex-1">
            <CardTitle className="text-lg">{teacherProfile.name}</CardTitle>
            <p className="text-sm text-accent">{teacherProfile.role}</p>
            {!teacherProfile.attendanceMarked && (
              <p className="text-sm text-red-500 mt-1">Mark your attendance!</p>
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

      {/* Secondary card (class details) */}
      <Card className="relative -mt-8 z-20 w-full pt-12 pb-6 shadow-md">
        <CardContent className="space-y-4">
          {scheduleItems.map((item) => (
            <Card key={item.id} className="hover:bg-accent transition-colors">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="font-medium">{item.subject}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.class} • {item.room}
                    </p>
                    <p className="text-sm font-medium text-primary">
                      {item.time}
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}