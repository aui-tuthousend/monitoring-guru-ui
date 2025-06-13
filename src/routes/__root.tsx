import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import Header from '../components/Header'
import { SidebarProvider } from '@/components/ui/sidebar'

export const Route = createRootRoute({
  component: () => (
    <>
      <SidebarProvider>
        <Outlet />
      </SidebarProvider>
      <TanStackRouterDevtools />
    </>
  ),
})
