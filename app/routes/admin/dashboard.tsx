
import DashboardPage from "~/admin/dashboard";
import type { Route } from "./+types/dashboard";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Dashboard" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export const clientLoader = async () => {
  return {
    classes: [
      { id: 1, name: "Matematika X IPA 1", schedule: "Senin 08:00-09:30", students: 32 },
      { id: 2, name: "Fisika X IPA 2", schedule: "Selasa 10:00-11:30", students: 28 },
    ]
  }
}

export default function AdminDashboard() {
  return <DashboardPage />;
  // return <Button className="to-blue-400">Test</Button>;
}