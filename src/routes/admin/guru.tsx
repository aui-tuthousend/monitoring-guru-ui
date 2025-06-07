import { DataTable } from '@/components/data-table-guru'
import { createFileRoute } from '@tanstack/react-router'
import data from './data-guru.json'
import axios from 'axios'

export const Route = createFileRoute('/admin/guru')({
  component: RouteComponent,
  loader: async () => {
    try {
      const response = await axios.get('https://monitoring-guru-aui-tuthousend6429-iwkswixv.leapcell.dev/api/guru', {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NDk1NDEyNjAsInJvbGUiOiJrZXBhbGFfc2Vrb2xhaCIsInN1YiI6ImYyODM4ZjY5LTc5ZjktNDI4NS1iYTgzLTdmNDc0ODM4ODJlNiJ9.0KF9DrggQvN_CalKkfd5PK7EGz2x02eI8dwYpsd-aKA`
        }
      });
      return { data: response.data };
    } catch (error) {
      console.error(error);
      return { data: null };
    }
  }

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
