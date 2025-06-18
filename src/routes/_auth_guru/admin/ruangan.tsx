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
import { Button } from '@/components/ui/button'
import { CircleX, Loader2, Plus } from 'lucide-react'
import { useCookies } from 'react-cookie'
import { useRuanganStore } from '@/store/ruangan/useRuangan'
import { useEffect, useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { DefineColumns } from '@/components/data-table/columns'
import { DataTable } from '@/components/data-table/table'
import { toast } from 'sonner'

export const Route = createFileRoute('/_auth_guru/admin/ruangan')({
  component: RouteComponent,
})

function RouteComponent() {

    const [cookies] = useCookies(['authToken']);
    const token = cookies.authToken;

    const store = useRuanganStore()
    const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false)
    const ruanganColumns = DefineColumns(store.tableAttributes)
    
    useEffect(() => {
        store.GetAllRuangan(token)
    }, [token])
    
    const validation = () => {
        if (!store.model.name) {
            toast.error('Please fill all fields')
            return false
        }
        return true
    }
    
    const handleAdd = async () => {
        if (!validation()) return
        await store.RegisterRuangan(token, store.model)
        await store.GetAllRuangan(token)

        toast.success('Ruangan berhasil ditambah')
        store.setModel()
        setIsAddDialogOpen(false)
    }

  const handleUpdate = async (data: any) => {
    setIsAddDialogOpen(true)
    store.setModel(data)
  }
    
  return (
    <main className="flex-1 overflow-y-auto p-6">
      <div className="space-y-6">
        {/* Header + tombol Add */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Ruangan</h1>
            <p className="text-muted-foreground">Manage data ruangan</p>
          </div>
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
                Tambah Ruangan
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] border border-primary/20 shadow-lg">
              <DialogHeader className="bg-gradient-to-r from-primary/10 to-accent/10 -mx-6 -mt-6 px-6 pt-6 pb-4 border-b">
                <DialogTitle>{store.model.id ? 'Update' : 'Tambah'} Ruangan</DialogTitle>
                <DialogDescription>{store.model.id ? 'Update' : 'Tambah'} Data </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                {/* Nama */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Nama Ruangan</Label>
                  <Input
                    value={store.model.name}
                    onChange={e =>
                      store.setModel({ ...store.model, name: e.target.value })
                    }
                    className="col-span-3 border-primary/20 focus:border-primary"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  onClick={() => {
                    store.setModel()
                  }}
                  disabled={store.loading}
                  size="icon"
                  className="bg-red-500 hover:bg-red-600"
                >
                  <CircleX />
                </Button>
                <Button
                  onClick={handleAdd}
                  disabled={store.loading}
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-90"
                >
                  {store.loading && (
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
          columns={ruanganColumns}
          data={store.list}
          searchKey="Nama Ruangan"
          searchPlaceholder="Cari nama ruangan"
          onUpdate={handleUpdate}
        />
      </div>
    </main>
  )
}
