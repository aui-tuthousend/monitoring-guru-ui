import type { AuthContext } from '@/auth'
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { CookiesProvider } from 'react-cookie'

// import Header from '../components/Header'

interface MyRouterContext {
  auth: AuthContext
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      {/* <Header /> */}
      <CookiesProvider>
        <Outlet />
      </CookiesProvider>
      <TanStackRouterDevtools />
    </>
  ),
})
