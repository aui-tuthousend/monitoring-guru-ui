import { QRCodeCanvas } from "qrcode.react";
import { Button } from "~/components/ui/button";
import { CardContent, CardHeader } from "~/components/ui/card";
import QRComponent from "../components/ui/qrScan";
import QRScanner from "../components/ui/qrScan";
import { useState } from "react";

export async function clientLoader() {

}

export default function GuruScanPage() {
    const [result, setResult] = useState<string | null>(null);
    const [torchOn, setTorchOn] = useState(false);
    return (
        <>
            <CardHeader className="flex flex-col items-center space-x-4 space-y-0 justify-center">
                <div className="relative m-2">
                    <h1 className="text-6xl">09:15 AM</h1>
                    <h2>June 18, 2025 - Monday</h2>
                </div>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
                {/* <QRCodeCanvas className="m-5" value={'https://google.com'} /> */}
                <QRScanner
                    onScanSuccess={(text) => setResult(text)}
                    enableTorch={torchOn}
                    scanDelay={200}
                />
                {result && <p className="text-center text-2xl my-5">{result}</p>}
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
    )
}