interface Izin {
    id?: string
    judul: string
    pesan: string
    tanggal_izin: string
    jam_izin: string
    read: boolean
    approval: boolean
    type: "info" | "success" | "warning" | "error"
}

export interface IzinStore {
    loading: boolean;
    list: Izin[];
    model: Izin;
    default: Izin;
    setModel: (model?: any) => void;
    // SubmitIzin: (token: string, payload: Izin) => Promise<void>;
    GetAllIzin: (token: string) => Promise<Izin[]>;
}
