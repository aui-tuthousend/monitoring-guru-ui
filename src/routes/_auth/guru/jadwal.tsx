import { createFileRoute } from '@tanstack/react-router'
import { CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Users } from "lucide-react"
import { useState } from "react"

interface WeeklySchedule {
    day: string
    classes: {
        id: string
        subject: string
        class: string
        time: string
        room: string
        students: number
    }[]
}

export const Route = createFileRoute('/_auth/guru/jadwal')({
    component: RouteComponent,
})

function RouteComponent() {
    const [selectedDay, setSelectedDay] = useState("Monday")

    const weeklySchedule: WeeklySchedule[] = [
        {
            day: "Monday",
            classes: [
                {
                    id: "1",
                    subject: "Advanced Mathematics",
                    class: "Grade 12A",
                    time: "08:00 - 09:30",
                    room: "Room 201",
                    students: 28,
                },
                { id: "2", subject: "Calculus", class: "Grade 11B", time: "10:00 - 11:30", room: "Room 203", students: 25 },
                { id: "3", subject: "Statistics", class: "Grade 10C", time: "13:00 - 14:30", room: "Room 201", students: 30 },
            ],
        },
        {
            day: "Tuesday",
            classes: [
                { id: "4", subject: "Algebra", class: "Grade 9A", time: "09:00 - 10:30", room: "Room 205", students: 26 },
                { id: "5", subject: "Geometry", class: "Grade 10A", time: "11:00 - 12:30", room: "Room 201", students: 24 },
            ],
        },
        {
            day: "Wednesday",
            classes: [
                {
                    id: "6",
                    subject: "Advanced Mathematics",
                    class: "Grade 12B",
                    time: "08:00 - 09:30",
                    room: "Room 203",
                    students: 27,
                },
                { id: "7", subject: "Calculus", class: "Grade 11A", time: "10:00 - 11:30", room: "Room 201", students: 29 },
                { id: "8", subject: "Statistics", class: "Grade 10B", time: "14:00 - 15:30", room: "Room 205", students: 25 },
            ],
        },
        {
            day: "Thursday",
            classes: [
                { id: "9", subject: "Algebra", class: "Grade 9B", time: "09:00 - 10:30", room: "Room 201", students: 28 },
                {
                    id: "10",
                    subject: "Trigonometry",
                    class: "Grade 11C",
                    time: "13:00 - 14:30",
                    room: "Room 203",
                    students: 23,
                },
            ],
        },
        {
            day: "Friday",
            classes: [
                {
                    id: "11",
                    subject: "Mathematics Review",
                    class: "Grade 12C",
                    time: "08:00 - 09:30",
                    room: "Room 201",
                    students: 26,
                },
                {
                    id: "12",
                    subject: "Problem Solving",
                    class: "Grade 10D",
                    time: "10:00 - 11:30",
                    room: "Room 205",
                    students: 22,
                },
            ],
        },
    ]

    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
    const currentSchedule = weeklySchedule.find((s) => s.day === selectedDay)

    return (
        <>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Weekly Schedule
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
                {/* Day Selector */}
                <div className="flex flex-wrap gap-2">
                    {days.map((day) => (
                        <Button
                            key={day}
                            onClick={() => setSelectedDay(day)}
                            variant={selectedDay === day ? "default" : "outline"}
                            size="sm"
                        >
                            {day}
                        </Button>
                    ))}
                </div>

                {/* Schedule for Selected Day */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">{selectedDay} Classes</h3>
                    {currentSchedule?.classes.length ? (
                        <div className="space-y-4">
                            {currentSchedule.classes.map((classItem) => (
                                <div key={classItem.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <h4 className="font-medium text-lg mb-2">{classItem.subject}</h4>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-gray-600">
                                                <div className="flex items-center gap-2">
                                                    <Users className="h-4 w-4" />
                                                    <span>
                                                        {classItem.class} ({classItem.students} students)
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Clock className="h-4 w-4" />
                                                    <span>{classItem.time}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="h-4 w-4" />
                                                    <span>{classItem.room}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <Badge variant="outline">{classItem.time.split(" - ")[0]}</Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                            <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p>No classes scheduled for {selectedDay}</p>
                        </div>
                    )}
                </div>

                {/* Weekly Summary */}
                <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Weekly Summary</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                            <span className="text-gray-600">Total Classes:</span>
                            <p className="font-semibold">{weeklySchedule.reduce((acc, day) => acc + day.classes.length, 0)}</p>
                        </div>
                        <div>
                            <span className="text-gray-600">Total Students:</span>
                            <p className="font-semibold">
                                {weeklySchedule.reduce(
                                    (acc, day) => acc + day.classes.reduce((classAcc, cls) => classAcc + cls.students, 0),
                                    0,
                                )}
                            </p>
                        </div>
                        <div>
                            <span className="text-gray-600">Busiest Day:</span>
                            <p className="font-semibold">Wednesday</p>
                        </div>
                        <div>
                            <span className="text-gray-600">Teaching Hours:</span>
                            <p className="font-semibold">18 hours</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </>
    )
}
