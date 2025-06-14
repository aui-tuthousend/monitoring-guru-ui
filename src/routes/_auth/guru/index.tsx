import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { CardHeader, CardContent, Card } from '@/components/ui/card';
import { useJadwalajarStore } from '@/store/jadwalAjar/useJadwalAjar';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { ScanQrCode } from 'lucide-react';
import { useCookies } from 'react-cookie';
import { toast } from 'sonner';

export const Route = createFileRoute('/_auth/guru/')({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const [cookies] = useCookies(['userData', 'authToken']);
  const jadwalStore = useJadwalajarStore();
  const [timestamp, setTimestamp] = useState<{ date: string, time: string } | null>(null);

  useEffect(() => {
    // const now = new Date();
    // setTimestamp({
    //   date: now.toLocaleDateString("id-ID", {
    //     weekday: "long",
    //     year: "numeric",
    //     month: "long",
    //     day: "numeric"
    //   }).replace("Minggu", "Senen"),
    //   time: now.toLocaleTimeString("id-ID", {
    //     hour: "2-digit",
    //     minute: "2-digit"
    //   }),
    // });

    if (cookies.authToken && cookies.userData?.id) {
      jadwalStore.GetListJadwalajarGuru(cookies.authToken, { uuid: cookies.userData.id, hari: 'senin' });
    }
  }, [cookies.authToken, cookies.userData?.id]);

  const handleScanClick = (mataPelajaran: string) => {
    navigate({ to: '/guru/scan', from: '/guru' });
    toast.success(`Membuka scanner untuk ${mataPelajaran}`);
  };

  return (
    <>
      {timestamp && (
        <CardHeader className="flex flex-row items-center space-x-4 space-y-0 justify-end">
          <h1 className="text-2xl font-semibold">{timestamp.date}</h1>
        </CardHeader>
      )}

      <CardContent className="space-y-4">
        {jadwalStore.list.map((jadwal, index) => (
          <Card key={index} className="hover:bg-accent transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-medium">{jadwal.mapel}</h3>
                  <p className="text-sm text-muted-foreground">
                    {jadwal.kelas} • Hari {jadwal.hari}
                  </p>
                  <p className="text-sm font-medium text-primary">
                    {jadwal.jam_mulai} - {jadwal.jam_selesai}
                  </p>
                </div>
                <Button
                  onClick={() => handleScanClick(jadwal.mapel)}
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
