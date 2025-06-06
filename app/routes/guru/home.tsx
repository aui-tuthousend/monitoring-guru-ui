// import GuruHomePage from "~/guru/home";
import { ScanQrCode } from "lucide-react";
import { useLoaderData, useNavigate } from "react-router";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader } from "~/components/ui/card";

export function clientLoader() {
    const now = new Date();

    return {
        jadwalAjar: [
            {
                mataPelajaran: "Matematika",
                kelas: "X IPA 1",
                hari: "Senin",
                jamMulai: "08:00",
                jamAkhir: "09:30"
            },
            {
                mataPelajaran: "Fisika",
                kelas: "X IPA 2",
                hari: "Selasa",
                jamMulai: "10:00",
                jamAkhir: "11:30"
            }
        ],
        timestamp: {
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
        }
    };
};

export default function GuruHome() {
    const navigate = useNavigate();
    const { jadwalAjar, timestamp } = useLoaderData<typeof clientLoader>();

    const handleScanClick = (mataPelajaran: string) => {
        navigate("/guru/scan");
        toast.success(`Membuka scanner untuk ${mataPelajaran}`);
    };

    return (
        <>
            <CardHeader className="flex flex-row items-center space-x-4 space-y-0 justify-end">
                <h1 className="text-2xl font-semibold">{timestamp.date}</h1>
            </CardHeader>

            <CardContent className="space-y-4">
                {jadwalAjar.map((jadwal, index) => (
                    <Card key={index} className="hover:bg-accent transition-colors">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <h3 className="font-medium">{jadwal.mataPelajaran}</h3>
                                    <p className="text-sm text-muted-foreground">
                                        {jadwal.kelas} • Hari {jadwal.hari}
                                    </p>
                                    <p className="text-sm font-medium text-primary">
                                        {jadwal.jamMulai} - {jadwal.jamAkhir}
                                    </p>
                                </div>
                                <Button
                                    onClick={() => handleScanClick(jadwal.mataPelajaran)}
                                    variant="default"
                                    size="lg"
                                    className="bg-blue-500 hover:bg-blue-600"
                                >
                                    <ScanQrCode className="h-5 w-5 text-white" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </CardContent>
        </>
    );
}