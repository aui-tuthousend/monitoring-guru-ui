import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_lay')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_lay"!</div>
}
