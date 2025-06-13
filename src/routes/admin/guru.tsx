// import { DataTable } from '@/components/data-table-guru'
import { createFileRoute } from '@tanstack/react-router'
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from '@/components/ui/separator'
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
// import { useQuery } from '@tanstack/react-query'

export const Route = createFileRoute('/admin/guru')({
  component: RouteComponent,
});


function RouteComponent() {

  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false)

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
                  <DialogDescription>Enter the student's information to add them to the system.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input id="name" className="col-span-3 border-primary/20 focus:border-primary" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input id="email" type="email" className="col-span-3 border-primary/20 focus:border-primary" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="grade" className="text-right">
                      Grade
                    </Label>
                    <Input id="grade" className="col-span-3 border-primary/20 focus:border-primary" />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-90 transition-opacity"
                  >
                    Add Student
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search guru..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background/50 backdrop-blur-sm border-emerald-200 dark:border-emerald-800 focus:border-emerald-500 transition-all"
              />
            </div>
            {/* <Button variant="outline" className="border-primary/20 hover:border-primary/50 transition-all">
              
            </Button> */}
          </div>


          {/* <DataTable data={data} /> */}
        </div>
      </main>
    </>
  )
}
