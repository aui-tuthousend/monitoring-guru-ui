import { DefineColumns } from "@/components/data-table/columns";
import { DataTable } from "@/components/data-table/table";
import { useJadwalajarStore } from "@/store/jadwalAjar/useJadwalAjar";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

export const Route = createFileRoute('/_auth_guru/admin/jadwalajar')({
  component: RouteComponent,
});


function RouteComponent() {

  const [cookies] = useCookies(['authToken', 'userData']);
  const token = cookies.authToken;
  const userData = cookies.userData;

  const store = useJadwalajarStore()

  const jadwalajarColumns = DefineColumns(store.tableAttributes)

  useEffect(() => {
    store.GetAllJadwalajar(token)
    // store.GetListJadwalajarGuru(token, { uuid: userData?.id, hari: 'senin' })
  }, [token])

  return (
    <>
      <main className="flex-1 overflow-y-auto p-6">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold gradient-text">Jadwal Ajar</h1>
              <p className="text-muted-foreground">Manage Jadwalajar information</p>
            </div>
          </div>

          <DataTable columns={jadwalajarColumns} data={store.list} searchKey='Mapel' searchPlaceholder='Cari nama mata pelajaran' />
        </div>
      </main>
    </>
  )

}