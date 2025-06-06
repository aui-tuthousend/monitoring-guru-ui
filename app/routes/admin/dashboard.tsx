import { SectionCards } from "~/components/section-cards"
import type { Route } from "./+types/dashboard";
import data from "./data-guru.json"
import { ChartAreaInteractive } from "~/components/chart-area-interactive"
import { DataTable } from "~/components/data-table-guru"

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Dashboard" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function clientLoader() {
  return {
    classes: [
      { id: 1, name: "Matematika X IPA 1", schedule: "Senin 08:00-09:30", students: 32 },
      { id: 2, name: "Fisika X IPA 2", schedule: "Selasa 10:00-11:30", students: 28 },
    ]
  }
}

export default function AdminDashboard() {
  return (
    <>
      <SectionCards />
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive />
      </div>
      <DataTable data={data} />
    </>
  )
}