// import { DashboardContent } from '@/components/app-sidebar-content'
import { ClassCard } from '@/components/class-card';
import { createFileRoute } from '@tanstack/react-router'
import { Cable, Loader, Unplug } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useWebsocket } from '@/store/websocket/useWebsocket';
import { useCookies } from 'react-cookie';
import { useKelasStore } from '@/store/kelas/useKelas';
import type { StatusKelas } from '@/store/kelas/types';
import { toast } from 'sonner';

export const Route = createFileRoute('/_auth_guru/admin/')({
  component: RouteComponent,
})


function RouteComponent() {
  const { GetAllClassStatus } = useKelasStore();

  const [cookies] = useCookies(['authToken']);
  const token = cookies.authToken;

  const [classStatus, setClassStatus] = useState<StatusKelas[]>([]);

  const {
    loading,
    sendMessage,
    addMessageListener,
    removeMessageListener,
    isConnected,
  } = useWebsocket();

  useEffect(() => {

    const handleMessage = (data: string) => {
      const { type, payload } = JSON.parse(data);

      if (type === 'update-kelas') {
        setClassStatus((prev) =>
          prev.map((kls) =>
            kls.kelas.id === payload.id
              ? {
                ...kls,
                is_active: payload.is_active,
                mapel: payload.mapel,
                pengajar: payload.pengajar,
                ruangan: payload.ruangan,
              }
              : kls
          )
        );
      }
    };

    addMessageListener(handleMessage);

    return () => {
      removeMessageListener(handleMessage);
    };
  }, []);

  const handleSendMessages = (kelasId: string, isActive: boolean) => {
    const payload = {
      type: "update-kelas",
      payload: {
        id: kelasId,
        is_active: isActive,
      },
    };

    if (isConnected && sendMessage) {
      sendMessage(JSON.stringify(payload));
    }
  };

  useEffect(() => {
    if (isConnected) {
      GetAllClassStatus(token).then(setClassStatus);
      toast.success("Connected to WebSocket");
    }
  }, [isConnected]);

  const [sortBy, setSortBy] = useState<string>("default")

  const sortedClasses = [...classStatus].sort((a, b) => {
    switch (sortBy) {
      case "default":
        return 0;
      case "major":
        return a.kelas.jurusan.localeCompare(b.kelas.jurusan);
      case "grade":
        return a.kelas.grade.localeCompare(b.kelas.grade);
      case "name":
        return a.kelas.name.localeCompare(b.kelas.name);
      case "status":
        return a.is_active === b.is_active ? 0 : a.is_active ? -1 : 1;
      default:
        return 0;
    }
  });

  return (
    <main className="min-h-screen overflow-y-auto p-6">
      <div className="flex flex-col gap-2 max-w-7xl mx-auto">
        {isConnected ? (
          <div className="flex items-center gap-2">
            <Cable className="w-5 h-5" /> connected
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Unplug className="w-5 h-5" /> disconnected
          </div>
        )}

        <div className="mb-6 flex items-center gap-4">
          <label htmlFor="sort-select" className="text-sm font-medium text-gray-700">
            Sort by:
          </label>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select sorting option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default Order</SelectItem>
              <SelectItem value="major">Major</SelectItem>
              <SelectItem value="grade">Grade</SelectItem>
              <SelectItem value="teacher">Teacher</SelectItem>
              <SelectItem value="className">Class Name</SelectItem>
              <SelectItem value="status">Status (Active First)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {loading && (
          <div className="flex items-center gap-2">
            <Loader className="w-5 h-5 animate-spin" /> Fetching data...
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedClasses.map((classData, index) => (
            <div key={index} onClick={() => handleSendMessages(classData.kelas.id, !classData.is_active)}>
              <ClassCard
                className={classData.kelas.name}
                grade={classData.kelas.grade}
                isActive={classData.is_active}
                teacher={classData.pengajar}
                major={classData.kelas.jurusan}
                subject={classData.mapel}
                room={classData.ruangan}
              />
            </div>
          ))}
        </div>
      </div>

      {/* <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-xl font-bold mb-4">Kontrol Aktivasi Kelas</h1>

        <div className="flex items-center gap-4 mb-4">
          <input
            type="text"
            value={serverUrl}
            onChange={(e) => setServerUrl(e.target.value)}
            disabled={isConnected}
            className="flex-1 px-3 py-2 border rounded-md"
            placeholder="ws://localhost:3000/ws/user-123"
          />
        <button
          onClick={connectWebSocket}
          disabled={isConnected}
          className="px-4 py-2 bg-green-500 text-white rounded-md"
        >
          Connect
        </button>
        <button
          onClick={closeConnection}
          disabled={!isConnected}
          className="px-4 py-2 bg-red-500 text-white rounded-md"
        >
          Disconnect
        </button>
      </div>

        <p className="text-sm text-gray-700 mb-6">
          Status: <span className={`font-medium ${isConnected ? 'text-green-600' : 'text-red-600'}`}>{connectionStatus}</span>
        </p>

        <ul className="space-y-2">
          {kelasList.map((kelas) => (
            <li key={kelas.id} className="flex justify-between items-center p-3 bg-gray-100 rounded-md">
              <span>
                {kelas.nama}
                {kelas.isActive ? <ScreenShare className="w-5 h-5" /> : <ScreenShareOff className="w-5 h-5" />}
              </span>
              <button
                onClick={() => sendToggleKelas(kelas.id, !kelas.isActive)}
                className={`px-3 py-1 rounded-md text-white text-sm font-medium ${
                  kelas.isActive ? 'bg-red-500' : 'bg-green-500'
                }`}
              >
                {kelas.isActive ? 'Nonaktifkan' : 'Aktifkan'}
              </button>
            </li>
          ))}
        </ul>
      </div> */}
    </main>
  )
}
