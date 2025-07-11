import { DefineColumns } from "@/components/data-table/columns";
import { DataTable } from "@/components/data-table/table";
import { useJadwalajarStore } from "@/store/jadwalAjar/useJadwalAjar";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useMapelStore } from "@/store/mapel/useMapel";
import { useKelasStore } from "@/store/kelas/useKelas";
import { useGuruStore } from "@/store/guru/useGuru";
import { useRuanganStore } from "@/store/ruangan/useRuangan";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { Button } from '@/components/ui/button'
import { Plus, CircleX, Loader2 } from 'lucide-react'
import { Label } from '@/components/ui/label'

import TimeInput from "@/components/ui/time-input";
import { AutoComplete } from "@/components/autocomplete";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'

export const Route = createFileRoute('/_auth_guru/admin/jadwalajar')({
  component: RouteComponent,
});

function RouteComponent() {

  const [cookies] = useCookies(['authToken']);
  const token = cookies.authToken;

  const store = {
    jadwalajarStore: useJadwalajarStore(),
    mapelStore: useMapelStore(),
    kelasStore: useKelasStore(),
    guruStore: useGuruStore(),
    ruanganStore: useRuanganStore(),
  }

  const jadwalajarColumns = DefineColumns(store.jadwalajarStore.tableAttributes)

  const [guruValue, setGuruValue] = useState<string>("")
  const [kelasValue, setKelasValue] = useState<string>("")
  const [mapelValue, setMapelValue] = useState<string>("")
  const [ruanganValue, setRuanganValue] = useState<string>("")

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  useEffect(() => {

    const fetchData = async () => {
      await store.jadwalajarStore.GetAllJadwalajar(token)
      await store.mapelStore.GetAllMapel(token)
      await store.kelasStore.GetAllKelas(token)
      await store.guruStore.GetListGuru(token)
      await store.ruanganStore.GetAllRuangan(token)
    }
    fetchData()

  }, [])

  const reset = () => {
    store.jadwalajarStore.setModel()
    setGuruValue("")
    setKelasValue("")
    setMapelValue("")
    setRuanganValue("")
  }

  const validate = () => {
    const j = store.jadwalajarStore.model
    if (!j.guru_id || !j.kelas_id || !j.mapel_id || !j.ruangan_id || !j.hari || !j.jam_mulai || !j.jam_selesai) {
      toast.error('Guru, Kelas, Mapel, Ruangan, Hari, Jam Mulai, dan Jam Selesai wajib diisi')
      return false
    }
    return true
  }

  const handleAdd = async () => {
    if (!validate()) return
    console.log(store.jadwalajarStore.model)
    await store.jadwalajarStore.RegisterJadwalajar(token, store.jadwalajarStore.model)
    await store.jadwalajarStore.GetAllJadwalajar(token)
    toast.success('Jadwalajar berhasil ditambahkan')
    store.jadwalajarStore.setModel(
      {
        ...store.jadwalajarStore.model,
        kelas_id: "",
        mapel_id: "",
        ruangan_id: "",
        // hari: "",
        jam_mulai: "",
        jam_selesai: "",
      })

    // setGuruValue("")
    setKelasValue("")
    setMapelValue("")
    setRuanganValue("")
    // setIsDialogOpen(false)
  }

  const handleUpdate = async (data: any) => {
    setIsAddDialogOpen(true)
    store.jadwalajarStore.setModel(data)
  }

  return (
    <>
      <main className="flex-1 overflow-y-auto p-6">
        <div className="space-y-6">

          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold gradient-text">Jadwal Ajar</h1>
              <p className="text-muted-foreground">Manage Jadwalajar information</p>
            </div>

            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  disabled={store.jadwalajarStore.loading}
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-90">
                  {store.jadwalajarStore.loading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Plus className="mr-2 h-4 w-4" />
                  )}
                  Tambah Jadwalajar
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[725px] border border-primary/20 shadow-lg">
                <DialogHeader className="bg-gradient-to-r from-primary/10 to-accent/10 -mx-6 -mt-6 px-6 pt-6 pb-4 border-b">
                  {/* <DialogTitle>{store.model.id ? 'Update' : 'Tambah'} Jadwal Ajar</DialogTitle>
                  <DialogDescription>{store.model.id ? 'Update' : 'Tambah'} Data Jadwal Ajar</DialogDescription> */}
                  <DialogTitle>Tambah Jadwalajar</DialogTitle>
                  <DialogDescription>Isi data Jadwalajar baru</DialogDescription>
                </DialogHeader>

                <div className="flex gap-4">
                  <div className="flex flex-col gap-5">
                    <div className="">
                      {/* Guru */}
                      <div className="flex flex-col items-start gap-1 overflow-x-hidden">
                        <Label>Guru</Label>
                        <AutoComplete
                          data={store.guruStore.list}
                          value={guruValue}
                          placeholder="Cari Guru..."
                          onChange={(item) => {
                            setGuruValue(item?.name || "")
                            store.jadwalajarStore.setModel({ ...store.jadwalajarStore.model, guru_id: item?.id || "" })
                          }}
                        />
                      </div>
                    </div>

                    <div className="">
                      {/* Mapel */}
                      <div className="flex flex-col items-start gap-1 overflow-x-hidden">
                        <Label>Mata Pelajaran</Label>
                        <AutoComplete
                          data={store.mapelStore.list}
                          value={mapelValue}
                          placeholder="Cari Mapel..."
                          onChange={(item) => {
                            setMapelValue(item?.name || "")
                            store.jadwalajarStore.setModel({ ...store.jadwalajarStore.model, mapel_id: item?.id || "" })
                          }}
                        />
                      </div>
                    </div>

                    <div className="">
                      <div className="flex flex-col items-start gap-1 overflow-x-hidden">
                        <Label>Kelas</Label>
                        <AutoComplete
                          data={store.kelasStore.list}
                          value={kelasValue}
                          placeholder="Cari Kelas..."
                          onChange={(item) => {
                            setKelasValue(item?.name || "")
                            store.jadwalajarStore.setModel({ ...store.jadwalajarStore.model, kelas_id: item?.id || "" })
                          }}
                        />
                      </div>
                    </div>

                    <div className="">
                      <div className="flex flex-col items-start gap-1 overflow-x-hidden">
                        <Label>Ruangan</Label>
                        <AutoComplete
                          data={store.ruanganStore.list}
                          value={ruanganValue}
                          placeholder="Cari Ruangan..."
                          onChange={(item) => {
                            setRuanganValue(item?.name || "")
                            store.jadwalajarStore.setModel({ ...store.jadwalajarStore.model, ruangan_id: item?.id || "" })
                          }}
                        />
                      </div>

                    </div>
                  </div>
                  <div className="flex flex-col gap-4 pl-[2rem]">
                    <div className="flex flex-col gap-1">
                      <Label>Hari</Label>
                      <Select
                        disabled={store.jadwalajarStore.loading}
                        value={store.jadwalajarStore.model.hari}
                        onValueChange={value =>
                          store.jadwalajarStore.setModel({ ...store.jadwalajarStore.model, hari: value })
                        }
                      >
                        <SelectTrigger className="w-[16rem]">
                          <SelectValue placeholder="Pilih Hari" />
                        </SelectTrigger>
                        <SelectContent>
                          {store.jadwalajarStore.hari.length == 0 && (
                            <SelectItem disabled value="null">
                              {/* <Loader2 className="mr-2 h-4 w-4 animate-spin" /> */}
                              No data
                            </SelectItem>
                          )}
                          {store.jadwalajarStore.hari.map(j => (
                            <SelectItem key={j.value} value={j.value}>
                              {j.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex flex-col gap-1">
                      <Label>Jam Mulai</Label>
                      <TimeInput
                        value={store.jadwalajarStore.model.jam_mulai}
                        onChange={(e) => store.jadwalajarStore.setModel({ ...store.jadwalajarStore.model, jam_mulai: e })}
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <Label>Jam Selesai</Label>
                      <TimeInput
                        value={store.jadwalajarStore.model.jam_selesai}
                        onChange={(e) => store.jadwalajarStore.setModel({ ...store.jadwalajarStore.model, jam_selesai: e })}
                      />
                    </div>
                  </div>
                </div>

                <DialogFooter>
                  <Button
                    onClick={() => {
                      reset()
                    }}
                    disabled={store.jadwalajarStore.loading}
                    size="icon"
                    className="bg-red-500 hover:bg-red-600"
                  >
                    <CircleX />
                  </Button>
                  <Button
                    onClick={handleAdd}
                    disabled={store.jadwalajarStore.loading}
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-90"
                  >
                    {store.jadwalajarStore.loading && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Submit
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <DataTable 
            columns={jadwalajarColumns} 
            data={store.jadwalajarStore.list} 
            searchKey='Mapel' 
            searchPlaceholder='Cari nama mata pelajaran' 
            onUpdate={handleUpdate}
          />
        </div>
      </main>
    </>
  )

}