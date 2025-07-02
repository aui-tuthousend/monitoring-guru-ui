interface Izin {
    id?: string
    jadwalajar_id?: string
    judul: string
    pesan: string
    guru: string
    mapel: string
    jam_mulai: string
    jam_selesai: string
    tanggal_izin: string
    jam_izin: string
    read: boolean
    approval: boolean
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
