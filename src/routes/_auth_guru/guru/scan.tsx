import { Button } from '@/components/ui/button';
import { CardHeader, CardContent } from '@/components/ui/card';
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react';
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
  const [result, setResult] = useState<string | null>(null);
  const [torchOn, setTorchOn] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleDone = async () => {
    if (!result) {
      toast.warning("Please scan a QR code first");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call for check-in submission
      await new Promise(resolve => setTimeout(resolve, 500));

      // Only proceed if component is still mounted
      toast.success("Check-in Complete");
      // navigate("/guru", {
      //   replace: true,  // Prevent going back to scan page
      //   state: { checkInTime: new Date().toISOString() }  // Optional: pass data
      // });
      navigate({ to: '/guru', from: '/guru/scan' })
    } catch (error) {
      toast.error("Check-in failed. Please try again.");
      console.error("Check-in error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const {
    connectWebSocket,
    closeConnection,
    sendMessage,
    addMessageListener,
    removeMessageListener,
    isConnected,
  } = useWebsocket();

  useEffect(() => {
    connectWebSocket();

    return () => {
      closeConnection();
    };
  }, []);

  const handleSendMessages = (data: any) => {
    const payload = {
      type: "update-kelas",
      payload: {
        id: data.kelas_id,
        jadwalajar_id: data.jadwalajar_id,
        is_active: true,
        mapel: data.mapel_id,
        pengajar: userData.id,
        ruangan: data.ruangan_id,
      },
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

    if (
      typeof payload !== 'object' ||
      payload.type !== 'clock-in' ||
      !payload.kelas_id ||
      !payload.mapel_id
    ) {
      toast.error("QR Code tidak dikenali");
      return;
    }

    const { date, time } = payload
    const parsedDateTime = new Date(`${date}T${time}:00`)
    const now = new Date()

    const diffMinutes = (now.getTime() - parsedDateTime.getTime()) / 1000 / 60

    if (diffMinutes > 1) {
      toast.error("QR Code sudah kadaluarsa")
      return
    }

    handleSendMessages(payload);
    toast.success("Check-in berhasil");
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
            disabled={isSubmitting}
          >
            {torchOn ? 'Turn Flash Off' : 'Turn Flash On'}
          </Button>
        </div>

        {result && (
          <div className="mb-6 p-4 bg-muted rounded-lg w-full max-w-md">
            <p className="text-center break-words">{result}</p>
          </div>
        )}

        <div className="flex flex-row gap-6 items-center justify-center mb-6">
          {['Clock In', 'Clock Out', 'Total Hours'].map((label, index) => (
            <div key={index} className="flex flex-col items-center">
              <h3 className="text-xl font-semibold">09:00</h3>
              <p className="text-sm text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>

        <Button
          size="lg"
          onClick={handleDone}
          disabled={isSubmitting || !result}
          className="bg-blue-600 hover:bg-blue-700 mt-4 w-full max-w-xs"
        >
          {isSubmitting ? "Processing..." : "DONE"}
        </Button>
      </CardContent>
    </div>
  );
}
