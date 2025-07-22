import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import { DataTable } from '@/components/data-table/table'
import { useIzinStore } from '@/store/izin/useIzin'
import { DefineColumns } from '@/components/data-table/columns'

import { useCookies } from 'react-cookie'

export const Route = createFileRoute('/_auth_guru/admin/izin')({
  component: RouteComponent,
});


function RouteComponent() {

  const [cookies] = useCookies(['authToken']);
  const token = cookies.authToken;

  const store = useIzinStore()
  const izinColumns = DefineColumns(store.tableAttributes)

  useEffect(() => {
    const fetchData = async () => {
      await store.GetAllIzinWeekly(token)
    }
    fetchData()
  }, [token])

  return (
    <>
      <main className="flex-1 overflow-y-auto p-6">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold gradient-text">List Izin</h1>
              <p className="text-muted-foreground">View All Teacher's Izin</p>
            </div>

            <div className="flex gap-1 items-center">
            </div>
          </div>

          <DataTable 
            columns={izinColumns} 
            data={store?.list!} 
            searchKey='Judul'
            searchPlaceholder='Cari izin' 
          />
        </div>
      </main>
    </>
  )
}
