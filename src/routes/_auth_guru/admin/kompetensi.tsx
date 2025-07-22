import { createFileRoute } from '@tanstack/react-router'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { CircleX, Loader2, Plus } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { DataTable } from '@/components/data-table/table'
import { useJurusanStore } from '@/store/jurusan/useJurusan'
import { DefineColumns } from '@/components/data-table/columns'
import { toast } from 'sonner'
import { useCookies } from 'react-cookie'
import { ImportButton } from '@/components/import-button'

export const Route = createFileRoute('/_auth_guru/admin/kompetensi')({
  component: RouteComponent,
});


function RouteComponent() {

  const [cookies] = useCookies(['authToken']);
  const token = cookies.authToken;

  const store = useJurusanStore()
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false)
  const jurusanColumns = DefineColumns(store.tableAttributes)

  useEffect(() => {
    store.GetAllJurusan(token)
  }, [token])

  useEffect(()=> {
    if (isAddDialogOpen === false && store.model.id) {
      store.setModel()
    }
  },[isAddDialogOpen])

  const validation = () => {
    if (!store.model.name || !store.model.kode_jurusan) {
      toast.error('Please fill all fields')
      return false
    } else if (store.model.kode_jurusan.length < 3) {
      toast.error('Kode Kompetensi must be at least 3 characters')
      return false
    }

    return true
  }

  const handleSubmit = async () => {

    console.log(store.model)
    if (!validation()) return

    const response = await store.RegisterJurusan(token, store.model)
    console.log(response.success)
    if (response.code === 200) {
      await store.GetAllJurusan(token)
      toast.success(`Kompetensi berhasil ${store.model.id ? 'diperbarui' : 'ditambahkan'}`)
      store.setModel({...store.model, name: "", kode_jurusan: ""})
      setIsAddDialogOpen(false)
    } else {
      toast.error(response.status)
    }

  }

  const handleUpdate = async (data: any) => {
    setIsAddDialogOpen(true)
    store.setModel(data)
  }

  return (
    <>
      <main className="flex-1 overflow-y-auto p-6">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold gradient-text">Kompetensi</h1>
              <p className="text-muted-foreground">Manage data kompetensi</p>
            </div>

            <div className="flex gap-1 items-center">
              <ImportButton endpoint='jurusan'/>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  disabled={store.loading}
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-90">
                    {store.loading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ):(
                      <Plus className="mr-2 h-4 w-4" />
                    )}
                  Tambah Kompetensi
                </Button>
              </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] border border-primary/20 shadow-lg">
                  <DialogHeader className="bg-gradient-to-r from-primary/10 to-accent/10 -mx-6 -mt-6 px-6 pt-6 pb-4 border-b">
                    <DialogTitle>{store.model.id ? 'Update' : 'Tambah'} Kompetensi</DialogTitle>
                    <DialogDescription>{store.model.id ? 'Update' : 'Tambah'} Data Kompetensi</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label>Nama</Label>
                      <Input 
                        value={store.model.name}
                        onChange={(e) => store.setModel({ ...store.model, name: e.target.value })}
                        required className="col-span-3 border-primary/20 focus:border-primary" 
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label>Kode Kompetensi</Label>
                      <Input 
                        value={store.model.kode_jurusan}
                        onChange={(e) => store.setModel({ ...store.model, kode_jurusan: e.target.value })}
                        required className="col-span-3 border-primary/20 focus:border-primary" 
                      />
                    </div>
                  </div>
                  <DialogFooter>
                  <Button 
                      onClick={() => store.setModel()}
                      disabled={store.loading}
                      size="icon" 
                      className="bg-red-500 hover:bg-red-600">
                      <CircleX />
                    </Button>
                    <Button
                      type="button"
                      onClick={handleSubmit}
                      disabled={store.loading}
                      className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-90 transition-opacity"
                    >
                      Submit
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <DataTable 
            columns={jurusanColumns} 
            data={store?.list!} 
            searchKey='Nama Kompetensi' 
            searchPlaceholder='Cari nama kompetensi' 
            onUpdate={handleUpdate}
          />
        </div>
      </main>
    </>
  )
}
