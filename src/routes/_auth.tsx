import { Outlet } from '@tanstack/react-router'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: '/login',
      })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      {/* <div>Hello "/_auth Appliasased Here"!</div> */}
      <Outlet />
    </>
  )
}
