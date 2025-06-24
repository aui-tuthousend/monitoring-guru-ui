// import { DashboardContent } from '@/components/app-sidebar-content'
import { createFileRoute } from '@tanstack/react-router'
import { ScreenShare, ScreenShareOff } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export const Route = createFileRoute('/_auth_guru/admin/')({
  component: RouteComponent,
})

interface Kelas {
  id: string;
  nama: string;
  isActive: boolean;
}

function RouteComponent() {

  const [serverUrl, setServerUrl] = useState('ws://localhost:8080/ws/user-123');
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('Disconnected');
  // const [waitingToReconnect, setWaitingToReconnect] = useState(null);
  const [kelasList, setKelasList] = useState<Kelas[]>([
    { id: 'kelas-1', nama: 'Kelas A', isActive: false },
    { id: 'kelas-2', nama: 'Kelas B', isActive: true },
    { id: 'kelas-3', nama: 'Kelas C', isActive: false },
  ]);

  const ws = useRef<WebSocket | null>(null);

  const connectWebSocket = () => {
    ws.current = new WebSocket(serverUrl);

    ws.current.onopen = () => {
      setIsConnected(true);
      setConnectionStatus('Connected');
    };

    ws.current.onmessage = (event) => {
      // console.log('Received message:', event.data);
      receiveMessage(event.data)
    };

    ws.current.onclose = () => {
      setIsConnected(false);
      setConnectionStatus('Disconnected');
    };

    ws.current.onerror = (err) => {
      console.error('WebSocket error:', err);
    };
  };

  const closeConnection = () => {
    ws.current?.close();
  };

  const sendToggleKelas = (kelasId: string, isActive: boolean) => {
    const payload = JSON.stringify({ id: kelasId, isActive });
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(payload);
    }
  };

  const receiveMessage = (data: any) => {
    const parsed = JSON.parse(data)
    console.log(parsed)
    setKelasList((prev) => {
      return prev.map((kelas) => {
        if (kelas.id === parsed.id) {
          return { ...kelas, isActive: parsed.isActive }
        }
        return kelas
      })
    })
  };

  useEffect(() => {
    connectWebSocket();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
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
    </div>
  )
}
