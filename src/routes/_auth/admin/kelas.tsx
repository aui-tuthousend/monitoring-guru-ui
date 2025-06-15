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
import { Plus, CircleX } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
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
    if (token) {
      kelasStore.GetAllKelas(token)
      ketuaStore.GetAllKetuaKelas(token)
      jurusanStore.GetAllJurusan(token)
    }
  }, [token])

  const validate = () => {
    const m = kelasStore.model
    if (!m.name || !m.ketua_id || !m.jurusan_id) {
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
              <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-90">
                <Plus className="mr-2 h-4 w-4" />
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
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Ketua Kelas</Label>
                  <Select
                    value={kelasStore.model.ketua_id}
                    onValueChange={value =>
                      kelasStore.setModel({ ...kelasStore.model, ketua_id: value })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pilih Ketua" />
                    </SelectTrigger>
                    <SelectContent>
                      {ketuaStore.list.map(k => (
                        <SelectItem key={k.id} value={k.id!}>
                          {k.nama}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {/* Jurusan */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Jurusan</Label>
                  <Select
                    value={kelasStore.model.jurusan_id}
                    onValueChange={value =>
                      kelasStore.setModel({ ...kelasStore.model, jurusan_id: value })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pilih Jurusan" />
                    </SelectTrigger>
                    <SelectContent>
                      {jurusanStore.list.map(j => (
                        <SelectItem key={j.id} value={j.id!}>
                          {j.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {/* Aktif? */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Aktif?</Label>
                  <Checkbox
                    checked={kelasStore.model.is_active}
                    onCheckedChange={checked =>
                      kelasStore.setModel({ ...kelasStore.model, is_active: Boolean(checked) })
                    }
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  onClick={() => {
                    kelasStore.setModel()
                    setIsDialogOpen(false)
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
          searchKey="name"
          searchPlaceholder="Cari nama kelas"
        />
      </div>
    </main>
  )
}
