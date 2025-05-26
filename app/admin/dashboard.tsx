import { useLoaderData } from "react-router";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import type { clientLoader } from "~/routes/admin/dashboard";

export default function DashboardPage() {
  const { classes } = useLoaderData<typeof clientLoader>();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Daftar Kelas</h1>
      
      {/* Responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
        {classes.map((classItem) => (
          <Card 
            key={classItem.id} 
            className="hover:shadow-lg transition-shadow min-h-[150px]"
          >
            <CardHeader className="pb-2">
              <h2 className="text-lg font-semibold line-clamp-1">{classItem.name}</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <p className="text-sm">
                  <span className="font-medium">Jadwal:</span> {classItem.schedule}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Siswa:</span> {classItem.students}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
