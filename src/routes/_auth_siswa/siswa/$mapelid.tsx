import { Separator } from '@/components/ui/separator';
import { createFileRoute } from '@tanstack/react-router'
import { ClockArrowDown, ClockArrowUp, ClockFading } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import QRCode from "react-qr-code";
import SHA256 from "crypto-js/sha256"
import { SECRET_KEY } from '@/lib/utils';




export const Route = createFileRoute('/_auth_siswa/siswa/$mapelid')({
  component: RouteComponent,

})

interface QrValue {
  type: string
  mapel_id: string
  time: string
  date: string
  kelas_id: string
}

function RouteComponent() {
  const { mapelid } = Route.useParams()
  const [cookies] = useCookies(['userData'])
  const userData = cookies.userData

  const [qrCode, setQrCode] = useState<React.ReactNode>("")

  const [currentTime, setCurrentTime] = useState<{
    date: string
    time: string
  }>({ date: "", time: "" })

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      const timeString = now.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      })
      const dateString = now.toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
      setCurrentTime({
        date: dateString,
        time: timeString,
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const now = new Date()

    const payload: QrValue = {
      type: "clock-in",
      mapel_id: mapelid,
      time: now.toTimeString().slice(0, 5),
      date: now.toISOString().slice(0, 10),
      kelas_id: userData.kelas_id,
    }
    
    const signature = SHA256(JSON.stringify(payload) + SECRET_KEY).toString()
    
    const qrContent = {
      payload,
      signature,
    }
    
    setQrCode(
      <QRCode
        size={1000}
        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
        value={JSON.stringify(qrContent)}
        viewBox={`0 0 1000 1000`}
      />
    )

  }, [currentTime.time])




  return (
    <main className='px-6'>
      <div className='flex flex-col gap-6 items-center'>
        <h1 className="scroll-m-20 text-center text-5xl font-extrabold tracking-tight text-balance">
          {currentTime.time}
        </h1>
        {currentTime.date}
        <div style={{ height: "auto", margin: "0 auto", maxWidth: "50%", width: "50%" }}>
          {qrCode}
        </div>
        <Separator />
        <div className='w-full flex justify-around items-center'>
          <div className='flex flex-col gap-1 items-center'>
            <ClockArrowUp size={40} strokeWidth={2.75} />
            <p>Clock In</p>
            <h1 className='text-lg font-bold font-mono'>00:00</h1>
          </div>
          <div className='flex flex-col gap-1 items-center'>
            <ClockArrowDown size={40} strokeWidth={2.75} />
            <p>Clock Out</p>
            <h1 className='text-lg font-bold font-mono'>00:00</h1>
          </div>
          <div className='flex flex-col gap-1 items-center'>
            <ClockFading size={40} strokeWidth={2.75} />
            <p>Acc Hours</p>
            <h1 className='text-lg font-bold font-mono'>00:00</h1>
          </div>
        </div>
      </div>
    </main>
  )
}
