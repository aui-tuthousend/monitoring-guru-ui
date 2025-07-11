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
import { useGuruStore } from '@/store/guru/useGuru'
import { DefineColumns } from '@/components/data-table/columns'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import PasswordInput from '@/components/ui/input-password'
import { toast } from 'sonner'
import { useCookies } from 'react-cookie'
import { ImportButton } from '@/components/import-button'

export const Route = createFileRoute('/_auth_guru/admin/guru')({
  component: RouteComponent,
});


function RouteComponent() {

  const [cookies] = useCookies(['authToken']);
  const token = cookies.authToken;

  const store = useGuruStore()
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false)
  const guruColumns = DefineColumns(store.tableAttributes)

  useEffect(() => {
    store.GetListGuru(token)
  }, [token])

  useEffect(()=> {
    if (isAddDialogOpen === false && store.model.id) {
      store.setModel()
    }
  },[isAddDialogOpen])

  const validation = () => {
    if (!store.model.nip || !store.model.name || !store.model.jabatan) {
      toast.error('Please fill all fields')
      return false
    } else if (store.model.nip.length < 5) {
      toast.error('NIP must be at least 6 characters')
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

  const handleSubmit = async () => {
    if (!validation()) return

    const response = await store.RegisterGuru(token, store.model)
    console.log(response.success)
    if (response.success) {
      await store.GetListGuru(token)
      toast.success(`Guru berhasil ${store.model.id ? 'diperbarui' : 'ditambahkan'}`)
      store.setModel({...store.model, nip: "", name: ""})
      setIsAddDialogOpen(false)
    } else {
      toast.error(response.message)
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
              <h1 className="text-3xl font-bold gradient-text">Guru</h1>
              <p className="text-muted-foreground">Manage data guru</p>
            </div>

            <div className="flex gap-1 items-center">
              <ImportButton endpoint='guru'/>
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
                  Tambah Guru
                </Button>
              </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] border border-primary/20 shadow-lg">
                  <DialogHeader className="bg-gradient-to-r from-primary/10 to-accent/10 -mx-6 -mt-6 px-6 pt-6 pb-4 border-b">
                    <DialogTitle>{store.model.id ? 'Update' : 'Tambah'} Guru</DialogTitle>
                    <DialogDescription>{store.model.id ? 'Update' : 'Tambah'} Data Guru</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label>NIP</Label>
                      <Input 
                        value={store.model.nip}
                        onChange={(e) => store.setModel({ ...store.model, nip: e.target.value })}
                        required className="col-span-3 border-primary/20 focus:border-primary" 
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label>Nama</Label>
                      <Input 
                        value={store.model.name}
                        onChange={(e) => store.setModel({ ...store.model, name: e.target.value })}
                        required className="col-span-3 border-primary/20 focus:border-primary" 
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
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label>Jabatan</Label>
                      <Select onValueChange={(value) => store.setModel({ ...store.model, jabatan: value })} defaultValue={store.model.jabatan}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih Jabatan" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="guru">Guru</SelectItem>
                          <SelectItem value="kepala_sekolah">Kepala Sekolah</SelectItem>
                        </SelectContent>
                      </Select>
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
            columns={guruColumns} 
            data={store?.list!} 
            searchKey='Nama Guru' 
            searchPlaceholder='Cari nama guru' 
            onUpdate={handleUpdate}
          />
        </div>
      </main>
    </>
  )
}
