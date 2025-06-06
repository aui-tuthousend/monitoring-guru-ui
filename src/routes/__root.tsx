import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { CookiesProvider } from 'react-cookie'

// import Header from '../components/Header'

export const Route = createRootRoute({
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
