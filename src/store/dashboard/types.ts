
interface Kelas {
    id: string;
    name: string;
    grade: string;
    jurusan: string;
};

interface StatusKelas {
    id: string;
    kelas: Kelas;
    isActive: boolean;
    mapel: string;
    pengajar: string;
    ruangan: string;
};
  
export interface DashboardState {
    loading: boolean;
    serverUrl: string;
    isConnected: boolean;
    connectionStatus: string;
    kelasList: StatusKelas[];
    GetAllClass: (token: string) => Promise<void>;
    connectWebSocket: () => void;
    closeConnection: () => void;
    sendToggleKelas: (kelasId: string, isActive: boolean) => void;
};