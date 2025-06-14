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
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Plus, Search } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { DataTable } from '@/components/data-table/table'
import { useGuruStore } from '@/store/guru/useGuru'
import { DefineColumns } from '@/components/data-table/columns'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import PasswordInput from '@/components/ui/input-password'
import { toast } from 'sonner'

export const Route = createFileRoute('/admin/guru')({
  component: RouteComponent,
});


function RouteComponent() {

  const store = useGuruStore()
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false)
  const guruColumns = DefineColumns(store.tableAttributes)

  const validation = () => {
    if (!store.model.nip || !store.model.name || !store.model.password || !store.model.jabatan) {
      toast.error('Please fill all fields')
      return false
    } else if (store.model.nip.length < 8) {
      toast.error('NIP must be at least 8 characters')
      return false
    } else if (store.model.password.length < 8) {
      toast.error('Password must be at least 8 characters')
      return false
    }
    return true
  }

  const handleSubmit = () => {

    if (!validation()) return
    // store.RegisterGuru(store.model)
    console.log(store.model)
    store.setModel()
    setIsAddDialogOpen(false)
  }

  return (
    <>
      <main className="flex-1 overflow-y-auto p-6">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold gradient-text">Guru</h1>
              <p className="text-muted-foreground">Manage Guru information</p>
            </div>


            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-90 transition-opacity">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Guru
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] border border-primary/20 shadow-lg">
                <DialogHeader className="bg-gradient-to-r from-primary/10 to-accent/10 -mx-6 -mt-6 px-6 pt-6 pb-4 border-b">
                  <DialogTitle>Add New Guru</DialogTitle>
                  <DialogDescription>Input data Guru</DialogDescription>
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
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label>Password</Label>
                    <PasswordInput 
                      value={store.model.password}
                      onChange={(e) => store.setModel({ ...store.model, password: e.target.value })}
                      required className="col-span-3 border-primary/20 focus:border-primary" 
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label>Jabatan</Label>
                    <Select onValueChange={(value) => store.setModel({ ...store.model, jabatan: value })} defaultValue={store.model.jabatan}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih Jabatan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Guru">Guru</SelectItem>
                        <SelectItem value="Kepala Lab">Kepala Lab</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="button"
                    onClick={handleSubmit}
                    disabled={store.loading}
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-90 transition-opacity"
                  >
                    Add Guru
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            
          </div>


          <DataTable columns={guruColumns} data={store.list} searchKey='Name' searchPlaceholder='Cari nama guru' />
        </div>
      </main>
    </>
  )
}
