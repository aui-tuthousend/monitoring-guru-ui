import { createFileRoute } from '@tanstack/react-router';
import { Outlet } from '@tanstack/react-router';
import { AppSidebar } from '@/components/app-sidebar'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Plus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';

export const Route = createFileRoute('/admin')({
  component: RouteComponent,
});


function RouteComponent() {

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  return (
    <SidebarProvider>
    <AppSidebar />
    <SidebarInset >
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold">Students</h1>
        </div>
      </header>
      <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold gradient-text">Students</h1>
                <p className="text-muted-foreground">Manage and monitor student information</p>
              </div>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-90 transition-opacity">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Student
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] border border-primary/20 shadow-lg">
                  <DialogHeader className="bg-gradient-to-r from-primary/10 to-accent/10 -mx-6 -mt-6 px-6 pt-6 pb-4 border-b">
                    <DialogTitle>Add New Student</DialogTitle>
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
          </div>
        </main>
    </SidebarInset>
    </SidebarProvider>
  )
}
