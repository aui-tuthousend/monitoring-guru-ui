import { ChartAreaInteractive } from '@/components/chart-area-interactive'
import { DataTable } from '@/components/data-table-guru'
import { SectionCards } from '@/components/section-cards'
import { createFileRoute } from '@tanstack/react-router'
import data from './data-guru.json'

export const Route = createFileRoute('/admin/guru')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
      <>
        {/* <SectionCards />
        <div className="px-4 lg:px-6">
          <ChartAreaInteractive />
        </div> */}
        <DataTable data={data} />
      </>
    )
}
