// components/QRScanner.tsx
import React from 'react';
import { Scanner, type IDetectedBarcode } from '@yudiel/react-qr-scanner';

interface QRScannerProps {
  onScanSuccess: (result: string) => void;
  onScanError?: (error: unknown) => void;
  facingMode?: 'user' | 'environment';
  className?: string;
  scanDelay?: number;
  enableTorch?: boolean;
}

export default function QRScanner({
  onScanSuccess,
  onScanError = (error) => console.error('Scanner error:', error),
  facingMode = 'environment',
  className = 'rounded-xl overflow-hidden shadow-md max-w-[300px] mx-auto m-5',
  scanDelay = 200,
  enableTorch = false
}: QRScannerProps) {
  const handleScan = React.useCallback((detectedCodes: IDetectedBarcode[]) => {
    if (detectedCodes.length > 0 && detectedCodes[0].rawValue) {
      onScanSuccess(detectedCodes[0].rawValue);
      console.log("send api request")
    }
  }, [onScanSuccess]);

  return (
    <div className={className}>
      <Scanner
        onScan={handleScan}
        onError={onScanError}
        constraints={{ 
          facingMode,
          aspectRatio: 1
        }}
        scanDelay={scanDelay}
        components={{
          torch: enableTorch, // Only keep torch control
        }}
      />
    </div>
  );
}