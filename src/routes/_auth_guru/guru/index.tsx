import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useQuery } from "@tanstack/react-query"

import { CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { Dialog, DialogTrigger, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogClose, } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import {
  BookOpen, Clock, Users,
  QrCode, CheckCircle, CalendarArrowUp,
} from "lucide-react"

import { useJadwalajarStore } from "@/store/jadwalAjar/useJadwalAjar"

export const Route = createFileRoute('/_auth_guru/guru/')({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate()
  const [cookies] = useCookies(['userData', 'authToken'])
  const userData = cookies.userData
  const token = cookies.authToken

  const { GetListJadwalajarGuru } = useJadwalajarStore()
  const [izinForm, setIzinForm] = useState({
    alasan: '',
    nama: '',
    npm: '',
  })

  const [timestamp, setTimestamp] = useState<{ date: string, time: string } | null>(null)

  const stats = {
    totalStudents: 109,
    classesCompleted: 1,
    classesRemaining: 3,
    attendanceRate: 94,
  }

  const { data, isPending, error } = useQuery({
    queryKey: ["jadwal-guru", userData.id],
    queryFn: () => GetListJadwalajarGuru(token, { id: userData.id, hari: "senin" }),
    enabled: !!userData.id && !!token,
  })

  useEffect(() => {
    const now = new Date()
    setTimestamp({
      date: now.toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      }),
      time: now.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit"
      }),
    })
  }, [])

  if (error) toast.error('Gagal mengambil data jadwal guru!')

  const timeStringToDate = (time: string): Date => {
    const [hours, minutes] = time.split(":").map(Number)
    const date = new Date()
    date.setHours(hours, minutes, 0, 0)
    return date
  }

  const getStatus = (jam_mulai: string, jam_selesai: string, now: Date): string => {
    const start = timeStringToDate(jam_mulai)
    const end = timeStringToDate(jam_selesai)
    if (now < start) return "upcoming"
    if (now >= start && now <= end) return "ongoing"
    return "completed"
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800"
      case "ongoing": return "bg-blue-100 text-blue-800"
      case "upcoming": return "bg-yellow-100 text-yellow-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="h-4 w-4" />
      case "ongoing": return <Clock className="h-4 w-4" />
      case "upcoming": return <CalendarArrowUp className="h-4 w-4" />
      default: return null
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!izinForm.alasan || !izinForm.nama || !izinForm.npm) {
      toast.error("Semua field wajib diisi.");
      return;
    }

    toast.success(`Izin diajukan oleh ${izinForm.nama}`);
    setIzinForm({ alasan: '', nama: '', npm: '' });

    // Programmatically close the dialog
    document.querySelector('[data-radix-dialog-content]')?.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape', code: 'Escape' })
    );
  };

  return (
    <>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Today's Dashboard
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-green-600">Completed</span>
            </div>
            <p className="text-2xl font-bold text-green-900">{stats.classesCompleted}</p>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-yellow-600" />
              <span className="text-sm font-medium text-yellow-600">Remaining</span>
            </div>
            <p className="text-2xl font-bold text-yellow-900">{stats.classesRemaining}</p>
          </div>
        </div>

        {/* Schedule */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Today's Classes</h3>
          <div className="space-y-3">
            {data?.map((jadwal: any, index: number) => {
              const now = new Date()
              const status = getStatus(jadwal.jam_mulai, jadwal.jam_selesai, now)

              return (
                <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-medium text-lg">{jadwal.mapel.name}</h4>
                        <Badge className={getStatusColor(status)}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(status)}
                            {status}
                          </div>
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {jadwal.jam_mulai} - {jadwal.jam_selesai}
                        </div>
                        <div className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4" />
                          Room {jadwal.ruangan?.name || 'N/A'}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {jadwal.hari}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button>Izin Matkul</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Formulir Pengajuan Izin</DialogTitle>
                          </DialogHeader>
                          <form onSubmit={handleSubmit}>
                            <div className="grid gap-4">
                              <div className="grid gap-3">
                                <Label>Alasan Izin</Label>
                                <Input
                                  name="alasan"
                                  value={izinForm.alasan}
                                  onChange={(e) => setIzinForm({ ...izinForm, alasan: e.target.value })}
                                />
                              </div>
                              <div className="grid gap-3">
                                <Label>Nama Guru Pengganti</Label>
                                <Input
                                  name="nama"
                                  value={izinForm.nama}
                                  onChange={(e) => setIzinForm({ ...izinForm, nama: e.target.value })}
                                />
                              </div>
                              <div className="grid gap-3">
                                <Label>NPM Guru Pengganti</Label>
                                <Input
                                  name="npm"
                                  value={izinForm.npm}
                                  onChange={(e) => setIzinForm({ ...izinForm, npm: e.target.value })}
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <DialogClose asChild>
                                <Button type="button" variant="outline">Cancel</Button>
                              </DialogClose>
                              <Button type="submit">Submit</Button>
                            </DialogFooter>
                          </form>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </CardContent>
    </>
  )
}
