import { Button } from '@/components/ui/button';
import { CardHeader, CardContent } from '@/components/ui/card';
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react';
import { toast } from 'sonner';
import QRScanner from "@/components/QrScan";
import { useWebsocket } from '@/store/websocket/useWebsocket';
import { useCookies } from 'react-cookie';
import { HashString } from '@/lib/utils';



export const Route = createFileRoute('/_auth_guru/guru/scan')({
  component: RouteComponent,
  loader: async () => {
    const now = new Date();
    return {
      date: now.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      }),
      time: now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit"
      }),
    };
  }
})

function RouteComponent() {
  const [cookies] = useCookies(['userData']);
  const userData = cookies.userData;

  // console.log(userData)

  const { date, time } = Route.useLoaderData();
  // const [result, setResult] = useState<string | null>(null);
  const [torchOn, setTorchOn] = useState(false);

  const navigate = useNavigate();

  const {
    sendMessage,
    isConnected,
  } = useWebsocket();

  const handleSendMessages = (data: any) => {
    const payload = data.type === 'clock-in'
    ? {
      type: data.type,
      payload: {
        id: data.kelas_id,
        jadwalajar_id: data.jadwalajar_id,
        is_active: true,
        mapel: data.mapel_id,
        pengajar: userData.id,
        ruangan: data.ruangan_id,
      }
    }
    : {
      type: data.type,
      payload: {
        id: data.kelas_id,
        is_active: false,
        // jadwalajar_id: data.jadwalajar_id,
        absen_masuk_id: data.absen_masuk_id,
      }
    };


    console.log(payload)
    if (isConnected && sendMessage) {
      sendMessage(JSON.stringify(payload));
    }
  };

  const handleScanSuccess = (text: string) => {
    console.log("Scan result:", text)

    let parsed: any

    try {
      parsed = JSON.parse(text)
    } catch (err) {
      toast.error("Invalid QR Code")
      return
    }

    console.log(parsed)
    const { payload, signature } = parsed;
    const expectedSignature = HashString(JSON.stringify(payload)) 

    if (signature !== expectedSignature) {
      toast.error("QR telah dimodifikasi atau tidak valid");
      return;
    }

    if (typeof payload !== 'object') {
      toast.error("QR Code tidak dikenali");
      return;
    }

    const { date, time } = payload
    const parsedDateTime = new Date(`${date}T${time}:00`)
    const now = new Date()

    const diffMinutes = (now.getTime() - parsedDateTime.getTime()) / 1000 / 60

    if (diffMinutes > 2) {
      toast.error("QR Code sudah kadaluarsa")
      return
    }

    handleSendMessages(payload);
    toast.success(payload.type === 'check-in' ? 'Check-in berhasil' : 'Check-out berhasil');
    navigate({ to: '/guru', from: '/guru/scan' });

  }


  const handleScanError = (err: any) => {
    console.log(err)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <CardHeader className="flex flex-col items-center space-y-4 py-6">
        <h1 className="text-6xl font-bold">{time}</h1>
        <h2 className="text-xl text-muted-foreground">{date}</h2>
      </CardHeader>

      <CardContent className="flex flex-col items-center flex-grow">
        <div className="w-full max-w-md mb-6">
          <QRScanner
            onScanSuccess={handleScanSuccess}
            onScanError={handleScanError}
            enableTorch={torchOn}
            scanDelay={200}
          />
        </div>

        <div className="flex gap-4 mb-6">
          <Button
            variant="secondary"
            onClick={() => setTorchOn(!torchOn)}
            className="px-4 py-2"
          >
            {torchOn ? 'Turn Flash Off' : 'Turn Flash On'}
          </Button>
        </div>

        <div className="flex flex-row gap-6 items-center justify-center mb-6">
          {['Clock In', 'Clock Out', 'Total Hours'].map((label, index) => (
            <div key={index} className="flex flex-col items-center">
              <h3 className="text-xl font-semibold">09:00</h3>
              <p className="text-sm text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>

      </CardContent>
    </div>
  );
}
