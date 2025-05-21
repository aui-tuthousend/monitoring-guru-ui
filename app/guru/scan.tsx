import { QRCodeCanvas } from "qrcode.react";
import { Button } from "~/components/ui/button";
import { CardContent, CardHeader } from "~/components/ui/card";
import QRScanner from "../components/ui/qrScan";
import { useState } from "react";
import { useLoaderData } from "react-router";

export const loader = async () => {
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

export default function GuruScanPage() {
  const loaderData = useLoaderData();
  const { date, time } = loaderData as { date: string; time: string };
  const [result, setResult] = useState<string | null>(null);
  const [torchOn, setTorchOn] = useState(false);

  return (
    <>
      <CardHeader className="flex flex-col items-center space-x-4 space-y-0 justify-center">
        <div className="relative m-2">
          <h1 className="text-6xl">{time}</h1>
          <h2 className="text-xl">{date}</h2>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <QRScanner
          onScanSuccess={(text) => setResult(text)}
          enableTorch={torchOn}
          scanDelay={200}
        />
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setTorchOn(!torchOn)}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            {torchOn ? 'Turn Flash Off' : 'Turn Flash On'}
          </button>
        </div>
        {result && <p className="text-center my-5">{result}</p>}
        <div className="flex flex-row gap-5 items-center justify-center">
          <div className="flex flex-col items-center">
            <h3 className="flex items-center justify-center">
              09:00
            </h3>
            <p className="text-center">clock in</p>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="flex items-center justify-center">
              09:00
            </h3>
            <p className="text-center">clock Out</p>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="flex items-center justify-center">
              09:00
            </h3>
            <p className="text-center">Total Hours</p>
          </div>
        </div>
        <Button size={"lg"} className="bg-blue-600 mt-5">DONE</Button>
      </CardContent>
    </>
  );
}