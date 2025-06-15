import { DashboardContent } from '@/components/app-sidebar-content'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/admin/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <DashboardContent />
  )
}
