import { ScanQrCode } from "lucide-react";
import { useOutletContext } from "react-router";
import { useOutlet } from "react-router";
import { useLoaderData, useNavigate } from "react-router";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import type { clientLoader } from "~/routes/guru/home";

export default async function GuruHomePage() {
    const navigate = useNavigate();
    const {jadwalAjar, timestamp } = useLoaderData<typeof clientLoader>();

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
