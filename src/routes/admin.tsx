import { AppSidebar } from '@/components/app-sidebar'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/admin')({
  component: RouteComponent,
})

function RouteComponent() {
  // return <div>Hello "/admin"!</div>
  return (
    <>
    <AppSidebar />
    <SidebarInset >
      <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px]">
          <SidebarTrigger />
          <div className="flex-1">
            <h1 className="text-lg font-semibold">Dashboard</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              Settings
            </Button>
            <Button size="sm">View Profile</Button>
          </div>
        </header>
        <Outlet />
      </SidebarInset>
    </>
  )
}
