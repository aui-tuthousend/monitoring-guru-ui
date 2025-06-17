import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/admin/mapel')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_auth/admin/mapel"!</div>
}
