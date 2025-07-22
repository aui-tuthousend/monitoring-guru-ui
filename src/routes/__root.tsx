import type { AuthContext } from '@/auth'
import Footer from '@/components/footer'
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
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
      <Footer />
    </>
  ),
})