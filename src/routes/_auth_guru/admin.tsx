import { AppSidebar } from '@/components/app-sidebar'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import LogoutButton from '@/components/logout-button'
import { ViewProfile } from '@/components/view-profile'
import { useGuruStore } from '@/store/guru/useGuru'
import { useCookies } from 'react-cookie'
import { useEffect } from 'react'

export const Route = createFileRoute('/_auth_guru/admin')({
  component: RouteComponent,
})

function RouteComponent() {
  const [cookies] = useCookies(['authToken'])
  const token = cookies.authToken

  const store = useGuruStore()

  // useEffect(() => {
  //   store.GetProfileGuru(token)
  // }, [token])

  const profile = {
    name: store.model.name,
    nip: store.model.nip,
    jabatan: store.model.jabatan,
    avatarUrl: "https://i.pravatar.cc/150?u=budi.santoso"
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset >
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px]">
          <SidebarTrigger />
          <div className="flex-1">
            <h1 className="text-lg font-semibold">Dashboard</h1>
          </div>
          <div className="flex items-center gap-2">
            {/* <Button size="sm">View Profile</Button> */}
            <ViewProfile profile={profile} />
            <LogoutButton />
          </div>
        </header>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  )
}
