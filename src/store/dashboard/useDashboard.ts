import { create } from 'zustand';
import type { DashboardState } from './types';
import { urlBuilder } from '@/lib/utils';
import { fetchServer } from '@/lib/fetchServer';

export const useDashboard = create<DashboardState>((set, get) => {
    let ws: WebSocket | null = null;
    let randomId = Math.floor(Math.random() * 100000);
  
    const receiveMessage = (data: string) => {
      const parsed = JSON.parse(data);
      set((state) => ({
        kelasList: state.kelasList.map((kls) =>
          kls.id === parsed.id ? { ...kls, isActive: parsed.isActive, mapel: parsed.mapel, pengajar: parsed.pengajar, ruangan: parsed.ruangan } : kls
        ),
      }));
    };
  
    const connectWebSocket = () => {
      const { serverUrl } = get();
      ws = new WebSocket(serverUrl);
  
      ws.onopen = () => {
        set({ isConnected: true, connectionStatus: 'Connected' });
      };
  
      ws.onmessage = (event) => {
        receiveMessage(event.data);
      };
  
      ws.onclose = () => {
        set({ isConnected: false, connectionStatus: 'Disconnected' });
      };
  
      ws.onerror = (err) => {
        console.error('WebSocket error:', err);
      };
    };
  
    const closeConnection = () => {
      ws?.close();
    };
  
    const sendToggleKelas = (kelasId: string, isActive: boolean) => {
      const payload = JSON.stringify({ id: kelasId, isActive, mapel: "Basis Data", pengajar: "Aui", ruangan: "Lab Komputer" });
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(payload);
      }
    };

    const GetAllClass = async (token: string) => {
        set({ loading: true });
        try {
            const response = await fetchServer(token, urlBuilder('/statuskelas'), {
                method: 'GET',
            });

            const data = await response.data;
            set({ kelasList: data.data });

            return data;
        } catch (error) {
            console.error('Error getting list of jurusan:', error);
            return error;
        } finally {
            set({ loading: false });
        }
    };
  
    return {
      loading: false,
      serverUrl: 'ws://localhost:8080/ws/user-' + randomId,
      isConnected: false,
      connectionStatus: 'Disconnected',
      kelasList: [],
      GetAllClass,
      connectWebSocket,
      closeConnection,
      sendToggleKelas,
    };
  });
  
