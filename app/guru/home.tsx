import { ChevronRight } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader } from "~/components/ui/card";

function ButtonEvent(navigate: ReturnType<typeof useNavigate>) {
    console.log("testing")
    navigate("/guru/scan");
}

export default function GuruHomePage() {
    const navigate = useNavigate();

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
        <>
            <CardHeader className="flex flex-row items-center space-x-4 space-y-0 justify-end">
                <h1 className="text-2xl font-semibold">{dateFormatted}</h1>
            </CardHeader>
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
                                <Button onClick={() => ButtonEvent(navigate)} variant="link">
                                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                                </Button>
                            </div>
                        </CardContent>
                        {/* <QRCodeSVG value={`https://example.com/${item.subject}`} /> */}
                        {/* <QRCodeSVG value={`https://youtube.com`} /> */}
                    </Card>
                ))}
            </CardContent>
        </>
    )
}
