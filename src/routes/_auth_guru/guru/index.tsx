import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { createFileRoute } from "@tanstack/react-router"
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
  CheckCircle,
} from "lucide-react"

import { useJadwalajarStore } from "@/store/jadwalAjar/useJadwalAjar"
import { useIzinStore } from "@/store/izin/useIzin"
import { useWebsocket } from "@/store/websocket/useWebsocket"

export const Route = createFileRoute('/_auth_guru/guru/')({
  component: RouteComponent,
});

function RouteComponent() {
  const now = new Date()
  const [cookies] = useCookies(['userData', 'authToken'])
  const userData = cookies.userData
  const token = cookies.authToken
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false)
  const [activeJadwal, setActiveJadwal] = useState<any | null>(null)

  const { GetListJadwalajarGuru } = useJadwalajarStore()
  const { model, setModel } = useIzinStore()

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

  const {
    sendMessage,
    isConnected,
  } = useWebsocket();


  const handleSubmit = () => {
    if (!model.judul || !model.pesan) {
      toast.error("Semua field wajib diisi.");
      return;
    }

    // console.log(activeJadwal)
    const payload = {
      type: 'create-izin',
      payload: {
        jadwalajar_id: activeJadwal.id,
        judul: model.judul,
        pesan: model.pesan,
      }
    }

    setModel()
    if (isConnected) {
      // console.log(payload)
      sendMessage(JSON.stringify(payload));
      setIsAddDialogOpen(false)
      setActiveJadwal(null)
      toast.success("Izin telah diajukan.")
    }

  };

  if (error) toast.error('Gagal mengambil data jadwal guru!')

  const timeStringToDate = (time: string): Date => {
    const [hours, minutes] = time.split(":").map(Number)
    const date = new Date()
    date.setHours(hours, minutes, 0, 0)
    return date
  }

  const getStatus = (jadwal: any) => {
    const start = timeStringToDate(jadwal.jam_mulai)
    const end = timeStringToDate(jadwal.jam_selesai)
    if (jadwal.izin.approval) return (
      <Badge variant="outline" className="bg-yellow-500 text-black">Izin</Badge>
    )
    if (now < start) return (
      <Badge variant="outline" className="bg-yellow-500 text-black">Akan datang</Badge>
    )
    if (now >= start && now <= end) return (
      <Badge variant="default" className="bg-green-500 text-black">Segera Absen</Badge>
    )
    if (now >= start && now <= end && jadwal.absen_masuk.id) return (
      <Badge variant="default" className="bg-green-500 text-black">Sedang berlangsung</Badge>
    )
    if (now >= start && now <= end && jadwal.absen_masuk.id && jadwal.absen_keluar.id) return (
      <Badge variant="default" className="bg-green-500 text-black">Sedang berlangsung</Badge>
    )
    if (now > end && !jadwal.absen_masuk.id) return (
      <Badge variant="outline" className="bg-red-500 text-white">Absen</Badge>
    )
    if (now > end && jadwal.absen_masuk.id) return (
      <Badge variant="outline" className="bg-green-500 text-black">Selesai</Badge>
    )
  }

  const getIzinStatus =(izin: any) => {
    if (izin.approval) return (
      <p>Izin disetujui</p>
    )
    if (izin.id) return (
      <p>Izin diajukan</p>
    )
    if (!izin.approval) return (
      <p>Ajukan izin</p>
    )
  }

  const getIzinStatusButton =(izin: any) => {
    if (izin.approval) return (
      true
    )
    if (izin.id && !izin.approval) return (
      true
    )
    if (!izin.id) return (
      false
    )
  }


  return (
    <>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Today's Dashboard
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6 overflow-y-auto">
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

              return (
                <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between overflow-x-hidden flex-wrap gap-5">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-medium text-lg">{jadwal.mapel.name}</h4>
                        {getStatus(jadwal)}
                        {jadwal.absen_masuk.id && <Badge className="text-white">{jadwal.absen_masuk.jam_masuk}</Badge>}
                        {jadwal.absen_keluar.id && <Badge variant="destructive" className="text-white">{jadwal.absen_keluar.jam_keluar}</Badge>}
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {jadwal.jam_mulai} - {jadwal.jam_selesai}
                        </div>
                        <div className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4" />
                          {jadwal.ruangan?.name || 'N/A'}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {jadwal.hari}
                        </div>
                      </div>
                    </div>

                    <div className="">
                      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                        <DialogTrigger asChild>
                        <Button
                          disabled={getIzinStatusButton(jadwal.izin)}
                          onClick={() => {
                            setActiveJadwal(jadwal)
                            setIsAddDialogOpen(true)
                          }}
                        >
                          {getIzinStatus(jadwal.izin)}
                        </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Formulir Pengajuan Izin</DialogTitle>
                          </DialogHeader>
                          <div className="grid gap-4 py-6">
                            <div className="grid gap-3">
                              <Label>Alasan Izin</Label>
                              <Input
                                name="judul"
                                value={model.judul}
                                onChange={(e) => setModel({ ...model, judul: e.target.value })}
                              />
                            </div>
                            <div className="grid gap-3">
                              <Label>Deskripsi</Label>
                              <Input
                                name="deskripsi"
                                value={model.pesan}
                                onChange={(e) => setModel({ ...model, pesan: e.target.value })}
                              />
                            </div>
                            {/* <div className="grid gap-3">
                              <Label>NPM Guru Pengganti</Label>
                              <Input
                                name="npm"
                              // value={izinForm.npm}
                              // onChange={(e) => setIzinForm({ ...izinForm, npm: e.target.value })}
                              />
                            </div> */}
                          </div>
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button type="button" variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit" onClick={handleSubmit}>Submit</Button>
                          </DialogFooter>
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
