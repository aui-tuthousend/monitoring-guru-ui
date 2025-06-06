import { Button } from "~/components/ui/button";
import { CardContent, CardHeader } from "~/components/ui/card";
import QRScanner from "~/components/ui/qrScan";
import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { toast } from "sonner";

export async function clientLoader() {
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
};

export default function GuruScan() {
  // const loaderData = useLoaderData<typeof clientLoader>();
  const { date, time } = useLoaderData<typeof clientLoader>();
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
      navigate("/guru/home", { 
        replace: true,  // Prevent going back to scan page
        state: { checkInTime: new Date().toISOString() }  // Optional: pass data
      });
    } catch (error) {
      toast.error("Check-in failed. Please try again.");
      console.error("Check-in error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <CardHeader className="flex flex-col items-center space-y-4 py-6">
        <h1 className="text-6xl font-bold">{time}</h1>
        <h2 className="text-xl text-muted-foreground">{date}</h2>
      </CardHeader>
      
      <CardContent className="flex flex-col items-center flex-grow">
        <div className="w-full max-w-md mb-6">
          <QRScanner
            onScanSuccess={(text) => setResult(text)}
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