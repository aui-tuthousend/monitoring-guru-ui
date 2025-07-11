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

import { useJurusanStore } from '@/store/jurusan/useJurusan'
import { useMapelStore } from '@/store/mapel/useMapel'

export const Route = createFileRoute('/_auth_guru/admin/mapel')({
  component: RouteComponent,
})

function RouteComponent() {
  const [cookies] = useCookies(['authToken'])
  const token = cookies.authToken

  const mapelStore = useMapelStore()
  const jurusanStore = useJurusanStore()

  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false)
  const columns = DefineColumns(mapelStore.tableAttributes)

  // fetch awal
  useEffect(() => {

    const fetchData = async () => {
        await mapelStore.GetAllMapel(token)
        await jurusanStore.GetAllJurusan(token)
    }
    fetchData()
    
  }, [token])

  useEffect(()=> {
    if (isAddDialogOpen === false && mapelStore.model.id) {
      mapelStore.setModel()
    }
  },[isAddDialogOpen])

  const validate = () => {
    const m = mapelStore.model
    if (!m.name || !m.jurusan_id) {
      toast.error('Nama Mapel dan Jurusan wajib diisi')
      return false
    }
    return true
  }

  const handleAdd = async () => {
    if (!validate()) return
    await mapelStore.RegisterMapel(token, mapelStore.model)
    await mapelStore.GetAllMapel(token)
    toast.success('Mapel berhasil ditambahkan')
    mapelStore.setModel({
      ...mapelStore.model,
      name: "",
      // jurusan_id: "",
    })
    // setIsDialogOpen(false)
  }

  const handleUpdate = async (data: any) => {
    setIsAddDialogOpen(true)
    mapelStore.setModel({
      id: data.id,
      name: data.name,
      jurusan_id: data.jurusan.id
    })
  }

  return (
    <main className="flex-1 overflow-y-auto p-6">
      <div className="space-y-6">
        {/* Header + tombol Add */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Mata Pelajaran</h1>
            <p className="text-muted-foreground">Manage data Mata Pelajaran</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                disabled={mapelStore.loading || jurusanStore.loading}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-90">
                  {mapelStore.loading || jurusanStore.loading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ):(
                    <Plus className="mr-2 h-4 w-4" />
                  )}
                Tambah Mapel
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] border border-primary/20 shadow-lg">
              <DialogHeader className="bg-gradient-to-r from-primary/10 to-accent/10 -mx-6 -mt-6 px-6 pt-6 pb-4 border-b">
                <DialogTitle>{mapelStore.model.id ? 'Update' : 'Tambah'} Mata Pelajaran</DialogTitle>
                <DialogDescription>{mapelStore.model.id ? 'Update' : 'Tambah'} Data Mata Pelajaran</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                
                {/* Jurusan */}
                <div className="grid grid-cols-4 items-center gap-4 overflow-x-hidden">
                  <Label>Jurusan</Label>
                  <Select
                    value={mapelStore.model.jurusan_id}
                    onValueChange={value =>
                      mapelStore.setModel({ ...mapelStore.model, jurusan_id: value })
                    }
                  >
                    <SelectTrigger className="w-[16rem]">
                      <SelectValue placeholder="Pilih Jurusan" />
                    </SelectTrigger>
                    <SelectContent>
                      {jurusanStore?.list?.length == 0 && (
                        <SelectItem disabled value="null">
                          {/* <Loader2 className="mr-2 h-4 w-4 animate-spin" /> */}
                          No data
                        </SelectItem>
                      )}
                      {jurusanStore?.list?.map(j => (
                        <SelectItem key={j.id} value={j.id!}>
                          {j.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {/* Nama */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Nama Mapel</Label>
                  <Input
                    value={mapelStore.model.name}
                    onChange={e =>
                      mapelStore.setModel({ ...mapelStore.model, name: e.target.value })
                    }
                    className="col-span-3 border-primary/20 focus:border-primary"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  onClick={() => {
                    mapelStore.setModel()
                  }}
                  disabled={mapelStore.loading}
                  size="icon"
                  className="bg-red-500 hover:bg-red-600"
                >
                  <CircleX />
                </Button>
                <Button
                  onClick={handleAdd}
                  disabled={mapelStore.loading}
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-90"
                >
                  {mapelStore.loading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Submit
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* DataTable */}
        <DataTable
          columns={columns}
          data={mapelStore?.list!}
          searchKey="Nama Mapel"
          searchPlaceholder="Cari nama mapel"
          onUpdate={handleUpdate}
        />
      </div>
    </main>
  )
}
