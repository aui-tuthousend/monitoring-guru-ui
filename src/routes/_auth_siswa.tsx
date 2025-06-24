import { Outlet } from '@tanstack/react-router'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth_siswa')({
  beforeLoad: ({ context }) => {
    // Wait for auth to initialize
    if (!context.auth.initialized) {
      throw new Error('Auth not initialized')
    }
    
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: '/login-siswa',
      })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <Outlet />
}