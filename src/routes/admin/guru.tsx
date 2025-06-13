import { AppSidebar } from '@/components/app-sidebar'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/guru')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <p>guru</p>
    </>
    
  )
}
