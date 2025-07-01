import { Separator } from '@/components/ui/separator';
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { ClockArrowDown, ClockArrowUp, ClockFading } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import QRCode from "react-qr-code";
import { HashString } from '@/lib/utils';
import { toast } from 'sonner';
import { useJadwalajarStore } from '@/store/jadwalAjar/useJadwalAjar';
import { Button } from '@/components/ui/button';
import { useWebsocket } from '@/store/websocket/useWebsocket';

export const Route = createFileRoute('/_auth_siswa/siswa/generate')({
  component: RouteComponent,
})

interface QrValueIn {
  type: "clock-in"
  mapel_id: string
  jadwalajar_id: string
  time: string
  date: string
  kelas_id: string
  ruangan_id: string
}

interface QrValueOut {
  type: "clock-out"
  kelas_id: string
  // jadwalajar_id: string
  absen_masuk_id: string
  time: string
  date: string
}

type QrPayload = { payload: QrValueIn | QrValueOut; signature: string }

export default function RouteComponent() {
  const navigate = useNavigate()
  const [cookies] = useCookies(["userData"])
  const userData = cookies.userData
  const { internalNav } = useJadwalajarStore()

  const [qrCode, setQrCode] = useState<React.ReactNode>("")
  const [currentTime, setCurrentTime] = useState({ date: "", time: "" })

  const {
    loading,
    addMessageListener,
    removeMessageListener,
    isConnected,
  } = useWebsocket();


  useEffect(() => {
    const handleMessage = (data: string) => {
      const payload = JSON.parse(data);
      if (payload) {
        toast.success("Absen berhasil!")
        navigate({ to: "/siswa" })
      }
    }

    addMessageListener(handleMessage);

    return () => {
      removeMessageListener(handleMessage);
    };
  }, [])

  // Blokir manual routing
  useEffect(() => {
    if (!internalNav) {
      toast.error("Manual Routing tidak diizinkan!")
      navigate({ to: "/siswa" })
    }
  }, [])
  
  // Update waktu tiap menit
  useEffect(() => {
    const now = new Date()
    updateTime(now)

    const interval = setInterval(() => {
      updateTime(new Date())
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  const updateTime = (now: Date) => {
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

    setCurrentTime({ date: dateString, time: timeString })
  }

  // Generate QR saat jam berubah
  useEffect(() => {
    if (!internalNav) return

    const now = new Date()
    const isoDate = now.toISOString().slice(0, 10)
    const shortTime = now.toTimeString().slice(0, 5)

    const payload: QrValueIn | QrValueOut = internalNav.absen_masuk?.id
      ? {
          type: "clock-out",
          absen_masuk_id: internalNav.absen_masuk.id,
          // jadwalajar_id: internalNav.id,
          kelas_id: userData.kelas_id,
          time: shortTime,
          date: isoDate,
        }
      : {
          type: "clock-in",
          mapel_id: internalNav.mapel.id,
          jadwalajar_id: internalNav.id,
          kelas_id: userData.kelas_id,
          ruangan_id: internalNav.ruangan.id,
          time: shortTime,
          date: isoDate,
        }

    const signature = HashString(JSON.stringify(payload))
    const qrContent: QrPayload = { payload, signature }

    generateQrCode(qrContent)
  }, [currentTime.time, internalNav, userData.kelas_id])

  const generateQrCode = (value: QrPayload) => {
    setQrCode(
      <QRCode
        size={1000}
        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
        value={JSON.stringify(value)}
        viewBox="0 0 1000 1000"
      />
    )
  }


  return (
    <main className='px-6'>
      <div className='flex flex-col gap-6 items-center'>
        <h1 className="scroll-m-20 text-center text-5xl font-extrabold tracking-tight text-balance">
          {/* {currentTime.time} */}
          {internalNav.absen_masuk?.id ? "Absen Keluar" : "Absen Masuk"}
        </h1>
        {/* {currentTime.date} */}
        don't refresh
        <div style={{ height: "auto", margin: "0 auto", maxWidth: "50%", width: "50%" }}>
          {qrCode}
        </div>
        <Separator />
        <div className='w-full flex justify-around items-center'>
          <div className='flex flex-col gap-1 items-center'>
            <ClockArrowUp size={40} strokeWidth={2.75} />
            <p>Clock In</p>
            <h1 className='text-lg font-bold font-mono'>{internalNav?.absen_masuk?.jam_masuk! || "00:00"}</h1>
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
