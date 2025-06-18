import type { AuthContext } from '@/auth'
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { CookiesProvider } from 'react-cookie'
import { Toaster } from 'sonner'

// import Header from '../components/Header'

interface MyRouterContext {
  auth: AuthContext
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      {/* <Header /> */}
      {/* <CookiesProvider> */}
        <Toaster position='top-center'/>
        <Outlet />
      {/* </CookiesProvider> */}
      <TanStackRouterDevtools />
    </>
  ),
})