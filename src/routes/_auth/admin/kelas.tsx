// src/routes/_auth/admin/kelas.tsx
import { createFileRoute } from '@tanstack/react-router'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Plus, CircleX, Loader2 } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { DataTable } from '@/components/data-table/table'
import { DefineColumns } from '@/components/data-table/columns'
import { toast } from 'sonner'
import { useCookies } from 'react-cookie'

import { useKelasStore } from '@/store/kelas/useKelas'
import { useKetuaKelasStore } from '@/store/ketuaKelas/useKetuaKelas'
import { useJurusanStore } from '@/store/jurusan/useJurusan'

export const Route = createFileRoute('/_auth/admin/kelas')({
  component: RouteComponent,
})

function RouteComponent() {
  const [cookies] = useCookies(['authToken'])
  const token = cookies.authToken

  const kelasStore = useKelasStore()
  const ketuaStore = useKetuaKelasStore()
  const jurusanStore = useJurusanStore()

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const columns = DefineColumns(kelasStore.tableAttributes)

  // fetch awal
  useEffect(() => {

    const fetchData = async () => {
        await kelasStore.GetAllKelas(token)
        await ketuaStore.GetUnsignedKetuaKelas(token)
        await jurusanStore.GetAllJurusan(token)
    }
    fetchData()
    
  }, [token])

  const validate = () => {
    const m = kelasStore.model
    if (!m.name || !m.ketua_kelas || !m.jurusan) {
      toast.error('Nama, Ketua, dan Jurusan wajib diisi')
      return false
    }
    return true
  }

  const handleAdd = async () => {
    if (!validate()) return
    await kelasStore.RegisterKelas(token, kelasStore.model)
    await kelasStore.GetAllKelas(token)
    toast.success('Kelas berhasil ditambahkan')
    kelasStore.setModel()      // reset ke default
    setIsDialogOpen(false)
  }

  return (
    <main className="flex-1 overflow-y-auto p-6">
      <div className="space-y-6">
        {/* Header + tombol Add */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Kelas</h1>
            <p className="text-muted-foreground">Manage data Kelas</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                disabled={kelasStore.loading || ketuaStore.loading}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-90">
                  {kelasStore.loading || ketuaStore.loading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ):(
                    <Plus className="mr-2 h-4 w-4" />
                  )}
                Add Kelas
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] border border-primary/20 shadow-lg">
              <DialogHeader className="bg-gradient-to-r from-primary/10 to-accent/10 -mx-6 -mt-6 px-6 pt-6 pb-4 border-b">
                <DialogTitle>Tambah Kelas</DialogTitle>
                <DialogDescription>Isi data Kelas baru</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                {/* Nama */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Nama Kelas</Label>
                  <Input
                    value={kelasStore.model.name}
                    onChange={e =>
                      kelasStore.setModel({ ...kelasStore.model, name: e.target.value })
                    }
                    className="col-span-3 border-primary/20 focus:border-primary"
                  />
                </div>
                {/* Ketua */}
                <div className="grid grid-cols-4 items-center gap-4 overflow-x-hidden">
                  <Label>Ketua Kelas</Label>
                  <Select
                    value={kelasStore.model.ketua_kelas}
                    onValueChange={value =>
                      kelasStore.setModel({ ...kelasStore.model, ketua_kelas: value })
                    }
                  >
                    <SelectTrigger className="w-[16rem]">
                      <SelectValue placeholder="Pilih Ketua" />
                    </SelectTrigger>
                    <SelectContent>
                      {ketuaStore.unsignedList.length == 0 && (
                        <SelectItem disabled value="null">
                          {/* <Loader2 className="mr-2 h-4 w-4 animate-spin" /> */}
                          No data
                        </SelectItem>
                      )}
                      {ketuaStore.unsignedList.map(k => (
                        <SelectItem key={k.id} value={k.id!}>
                          {k.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {/* Jurusan */}
                <div className="grid grid-cols-4 items-center gap-4 overflow-x-hidden">
                  <Label>Jurusan</Label>
                  <Select
                    disabled={kelasStore.loading}
                    value={kelasStore.model.jurusan}
                    onValueChange={value =>
                      kelasStore.setModel({ ...kelasStore.model, jurusan: value })
                    }
                  >
                    <SelectTrigger className="w-[16rem]">
                      <SelectValue placeholder="Pilih Jurusan" />
                    </SelectTrigger>
                    <SelectContent>
                    {jurusanStore.list.length == 0 && (
                        <SelectItem disabled value="null">
                          {/* <Loader2 className="mr-2 h-4 w-4 animate-spin" /> */}
                          No data
                        </SelectItem>
                      )}
                      {jurusanStore.list.map(j => (
                        <SelectItem key={j.id} value={j.id!}>
                          {j.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button
                  onClick={() => {
                    kelasStore.setModel()
                  }}
                  disabled={kelasStore.loading}
                  size="icon"
                  className="bg-red-500 hover:bg-red-600"
                >
                  <CircleX />
                </Button>
                <Button
                  onClick={handleAdd}
                  disabled={kelasStore.loading}
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-90"
                >
                  {kelasStore.loading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Add Kelas
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* DataTable */}
        <DataTable
          columns={columns}
          data={kelasStore.list}
          searchKey="Nama Kelas"
          searchPlaceholder="Cari nama kelas"
        />
      </div>
    </main>
  )
}
