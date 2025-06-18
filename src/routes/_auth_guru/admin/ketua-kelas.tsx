import { DefineColumns } from '@/components/data-table/columns';
import { useKetuaKelasStore } from '@/store/ketuaKelas/useKetuaKelas';
import { createFileRoute } from '@tanstack/react-router'
import { CircleX, Loader2, Plus, } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
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
import { Label } from '@/components/ui/label'
import { DataTable } from '@/components/data-table/table';
import PasswordInput from '@/components/ui/input-password';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export const Route = createFileRoute('/_auth_guru/admin/ketua-kelas')({
  component: RouteComponent,
})

function RouteComponent() {

  const [cookies] = useCookies(['authToken']);
  const token = cookies.authToken;

  const store = useKetuaKelasStore()
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false)
  const ketuaKelasColumns = DefineColumns(store.tableAttributes)
  
  useEffect(() => {
    store.GetAllKetuaKelas(token)
  }, [token])

  useEffect(()=> {
    if (isAddDialogOpen === false && store.model.id) {
      store.setModel()
    }
  },[isAddDialogOpen])

  const validation = () => {
    if (!store.model.name || !store.model.nisn ) {
      toast.error('Please fill all fields')
      return false
    } else if (store.model.nisn.length < 5) {
      toast.error('NISN must be at least 6 characters')
      return false
    }

    if(!store.model.id){
      if(!store.model.password){
        toast.error('Please fill password')
        return false
      }
    }
    return true
  }

  const handleAdd = async () => {
    if (!validation()) return
    await store.RegisterKetuaKelas(token, store.model)
    await store.GetAllKetuaKelas(token)

    toast.success('Ketua Kelas berhasil ditambah')
    // console.log(store.model)
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
            <h1 className="text-3xl font-bold gradient-text">Ketua Kelas</h1>
            <p className="text-muted-foreground">Manage data Ketua Kelas</p>
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
                Tambah Ketua Kelas
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] border border-primary/20 shadow-lg">
              <DialogHeader className="bg-gradient-to-r from-primary/10 to-accent/10 -mx-6 -mt-6 px-6 pt-6 pb-4 border-b">
                <DialogTitle>{store.model.id ? 'Update' : 'Tambah'} Ketua Kelas</DialogTitle>
                <DialogDescription>{store.model.id ? 'Update' : 'Tambah'} Data Ketua Kelas</DialogDescription>
                {/* <DialogTitle>Tambah Ketua Kelas</DialogTitle>
                <DialogDescription>Isi Data Ketua Kelas</DialogDescription> */}
              </DialogHeader>
              <div className="grid gap-4 py-4">
                {/* Nama */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Nama Ketua</Label>
                  <Input
                    value={store.model.name}
                    onChange={e =>
                      store.setModel({ ...store.model, name: e.target.value })
                    }
                    className="col-span-3 border-primary/20 focus:border-primary"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>NISN</Label>
                  <Input
                    value={store.model.nisn}
                    onChange={e =>
                      store.setModel({ ...store.model, nisn: e.target.value })
                    }
                    className="col-span-3 border-primary/20 focus:border-primary"
                  />
                </div>
                {!store.model.id && (
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label>Password</Label>
                    <PasswordInput 
                      value={store.model.password}
                      onChange={(e) => store.setModel({ ...store.model, password: e.target.value })}
                      required className="col-span-3 border-primary/20 focus:border-primary" 
                    />
                  </div>
                )}
                
                {/* Ketua */}
                {/* <div className="grid grid-cols-4 items-center gap-4 overflow-x-hidden">
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
                </div> */}
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
          columns={ketuaKelasColumns}
          data={store.list}
          searchKey="Name"
          searchPlaceholder="Cari nama ketua kelas"
          onUpdate={handleUpdate}
        />
      </div>
    </main>
  )
}
